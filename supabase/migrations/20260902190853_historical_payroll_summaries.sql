begin;

create table public.historical_payroll_import_batches (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  source_file text not null,
  source_sha256 text not null,
  row_count integer not null check (row_count > 0),
  imported_by uuid not null references public.time_card_users(id),
  imported_at timestamptz not null default now(),
  constraint historical_payroll_import_source_not_blank check (btrim(source) <> ''),
  constraint historical_payroll_import_file_not_blank check (btrim(source_file) <> ''),
  constraint historical_payroll_import_sha256 check (source_sha256 ~ '^[0-9a-f]{64}$'),
  constraint historical_payroll_import_source_hash_unique unique (source, source_sha256)
);

create table public.historical_payroll_summaries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.time_card_users(id),
  pay_period_start date not null,
  pay_period_end date not null,
  worked_hundredths integer not null check (worked_hundredths >= 0),
  holiday_hundredths integer not null check (holiday_hundredths >= 0),
  adjustment_hundredths integer not null,
  total_paid_hundredths integer not null check (total_paid_hundredths >= 0),
  hourly_rate_cents integer not null check (hourly_rate_cents > 0 and hourly_rate_cents <= 100000),
  estimated_gross_cents integer not null check (estimated_gross_cents >= 0),
  source text not null,
  import_batch_id uuid not null references public.historical_payroll_import_batches(id),
  imported_at timestamptz not null default now(),
  created_by uuid not null references public.time_card_users(id),
  constraint historical_payroll_period_order check (pay_period_end >= pay_period_start),
  constraint historical_payroll_components_total check (
    total_paid_hundredths = worked_hundredths + holiday_hundredths + adjustment_hundredths
  ),
  constraint historical_payroll_source_not_blank check (btrim(source) <> ''),
  constraint historical_payroll_employee_period_unique unique (
    employee_id,
    pay_period_start,
    pay_period_end
  )
);

create index historical_payroll_period_lookup
  on public.historical_payroll_summaries (pay_period_start desc, pay_period_end desc);

create index historical_payroll_employee_lookup
  on public.historical_payroll_summaries (employee_id, pay_period_start desc);

alter table public.historical_payroll_import_batches enable row level security;
alter table public.historical_payroll_summaries enable row level security;

revoke all on table public.historical_payroll_import_batches from anon, authenticated;
revoke all on table public.historical_payroll_summaries from anon, authenticated;

commit;
