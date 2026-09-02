begin;

create extension if not exists pgcrypto;

create type public.time_card_role as enum ('ADMIN', 'EMPLOYEE');
create type public.time_entry_source as enum ('EMPLOYEE', 'ADMIN');
create type public.paid_time_type as enum ('HOLIDAY', 'ADJUSTMENT');

create table public.time_card_users (
  id uuid primary key default gen_random_uuid(),
  login_identifier text not null,
  name text not null,
  pin_hash text not null,
  role public.time_card_role not null,
  active boolean not null default true,
  must_reset_pin boolean not null default false,
  locked_until timestamptz,
  failed_login_count integer not null default 0 check (failed_login_count >= 0),
  last_failed_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint time_card_users_login_not_blank check (btrim(login_identifier) <> ''),
  constraint time_card_users_name_not_blank check (btrim(name) <> ''),
  constraint time_card_users_login_normalized check (login_identifier = lower(btrim(login_identifier)))
);

create unique index time_card_users_login_unique
  on public.time_card_users (lower(login_identifier));

create table public.time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.time_card_users(id),
  clock_in timestamptz not null,
  clock_out timestamptz,
  source public.time_entry_source not null,
  note text,
  created_by uuid not null references public.time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references public.time_card_users(id),
  void_reason text,
  constraint time_entries_order check (clock_out is null or clock_out >= clock_in),
  constraint time_entries_void_state check (
    (voided_at is null and voided_by is null and void_reason is null)
    or (
      voided_at is not null
      and voided_by is not null
      and void_reason is not null
      and btrim(void_reason) <> ''
    )
  )
);

create unique index time_entries_one_open_punch_per_employee
  on public.time_entries (employee_id)
  where clock_out is null and voided_at is null;

create index time_entries_employee_clock_in
  on public.time_entries (employee_id, clock_in desc)
  where voided_at is null;

create table public.paid_time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.time_card_users(id),
  type public.paid_time_type not null,
  payroll_date date not null,
  minutes integer not null,
  note text not null,
  created_by uuid not null references public.time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references public.time_card_users(id),
  void_reason text,
  constraint paid_time_entries_minutes_by_type check (
    (type = 'HOLIDAY' and minutes > 0)
    or (type = 'ADJUSTMENT' and minutes <> 0)
  ),
  constraint paid_time_entries_note_not_blank check (btrim(note) <> ''),
  constraint paid_time_entries_void_state check (
    (voided_at is null and voided_by is null and void_reason is null)
    or (
      voided_at is not null
      and voided_by is not null
      and void_reason is not null
      and btrim(void_reason) <> ''
    )
  )
);

create index paid_time_entries_employee_date
  on public.paid_time_entries (employee_id, payroll_date desc)
  where voided_at is null;

create unique index paid_time_entries_unique_active_holiday
  on public.paid_time_entries (employee_id, payroll_date, lower(note))
  where type = 'HOLIDAY' and voided_at is null;

create table public.time_card_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.time_card_users(id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz,
  user_agent_hash text,
  ip_hash text,
  constraint time_card_sessions_expiry check (expires_at > created_at)
);

create index time_card_sessions_active_user
  on public.time_card_sessions (user_id, expires_at)
  where revoked_at is null;

create table public.login_attempts (
  id bigint generated always as identity primary key,
  login_key_hash text not null,
  ip_hash text not null,
  succeeded boolean not null,
  attempted_at timestamptz not null default now()
);

create index login_attempts_lookup
  on public.login_attempts (login_key_hash, ip_hash, attempted_at desc);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.time_card_users(id),
  employee_id uuid references public.time_card_users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before_json jsonb,
  after_json jsonb,
  reason text,
  request_id uuid not null,
  created_at timestamptz not null default now(),
  constraint audit_logs_action_not_blank check (btrim(action) <> ''),
  constraint audit_logs_entity_type_not_blank check (btrim(entity_type) <> '')
);

create index audit_logs_entity
  on public.audit_logs (entity_type, entity_id, created_at desc);

create index audit_logs_employee
  on public.audit_logs (employee_id, created_at desc);

create index audit_logs_actor
  on public.audit_logs (actor_id, created_at desc);

create table public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_settings_key_not_blank check (btrim(key) <> '')
);

create function public.set_time_card_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger time_card_users_updated_at
before update on public.time_card_users
for each row execute function public.set_time_card_updated_at();

create trigger time_entries_updated_at
before update on public.time_entries
for each row execute function public.set_time_card_updated_at();

create trigger paid_time_entries_updated_at
before update on public.paid_time_entries
for each row execute function public.set_time_card_updated_at();

create trigger app_settings_updated_at
before update on public.app_settings
for each row execute function public.set_time_card_updated_at();

insert into public.app_settings (key, value)
values
  ('timezone', '"America/Chicago"'::jsonb),
  ('pay_period', '{"anchor_start":"2026-08-10","length_days":14}'::jsonb),
  ('login_policy', '{"window_minutes":15,"maximum_attempts":5,"lockout_minutes":15}'::jsonb),
  ('session_policy', '{"idle_minutes":30,"absolute_hours":12}'::jsonb);

alter table public.time_card_users enable row level security;
alter table public.time_entries enable row level security;
alter table public.paid_time_entries enable row level security;
alter table public.time_card_sessions enable row level security;
alter table public.login_attempts enable row level security;
alter table public.audit_logs enable row level security;
alter table public.app_settings enable row level security;

revoke all on table public.time_card_users from anon, authenticated;
revoke all on table public.time_entries from anon, authenticated;
revoke all on table public.paid_time_entries from anon, authenticated;
revoke all on table public.time_card_sessions from anon, authenticated;
revoke all on table public.login_attempts from anon, authenticated;
revoke all on table public.audit_logs from anon, authenticated;
revoke all on table public.app_settings from anon, authenticated;
revoke all on sequence public.login_attempts_id_seq from anon, authenticated;
revoke all on sequence public.audit_logs_id_seq from anon, authenticated;
revoke execute on function public.set_time_card_updated_at() from public, anon, authenticated;

commit;
