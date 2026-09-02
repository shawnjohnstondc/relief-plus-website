begin;

create table public.employee_pay_rates (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.time_card_users(id),
  hourly_rate_cents integer not null,
  effective_date date not null,
  created_by uuid not null references public.time_card_users(id),
  created_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references public.time_card_users(id),
  void_reason text,
  constraint employee_pay_rates_positive_rate
    check (hourly_rate_cents > 0 and hourly_rate_cents <= 100000),
  constraint employee_pay_rates_void_state check (
    (voided_at is null and voided_by is null and void_reason is null)
    or (
      voided_at is not null
      and voided_by is not null
      and void_reason is not null
      and btrim(void_reason) <> ''
    )
  )
);

create unique index employee_pay_rates_one_active_date
  on public.employee_pay_rates (employee_id, effective_date)
  where voided_at is null;

create index employee_pay_rates_effective_lookup
  on public.employee_pay_rates (employee_id, effective_date desc)
  where voided_at is null;

alter table public.employee_pay_rates enable row level security;

revoke all on table public.employee_pay_rates from anon, authenticated;

commit;
