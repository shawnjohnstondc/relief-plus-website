# Native Relief Plus Time Card — Implementation Plan

Date: September 1, 2026  
Status: **FOUNDATION IMPLEMENTED — NEW PREVIEW SUPABASE PROJECT REQUIRED FOR DATABASE WORKFLOWS**

## Implementation progress

The first safe implementation increment is present in the repository but has not been deployed or connected to a database:

- Versioned clean PostgreSQL migration at `supabase/migrations/202609010001_native_time_card.sql`.
- Server-only environment and PostgreSQL connection boundary in `lib/time-card`.
- Argon2id PIN hashing/verification and opaque session-token primitives.
- Server-side role and employee-record scoping helpers.
- Database-backed lockout policy calculation and corresponding schema.
- Centralized America/Chicago pay-period and exact integer-minute payroll utilities.
- Input validation, clock-state invariants, audit-entry construction, and duplicate-holiday identity.
- Automated unit tests for the offline-verifiable authentication, authorization, clock, payroll, audit, holiday, and lockout rules.

The legacy `/time-card` proxy remains active. No migration has been applied, no native page or database mutation has replaced it, no employee has been initialized, and no legacy system has been changed.

## Owner decision and scope

Historical time-card and payroll data will not be migrated. Database discovery of the legacy Supabase project is closed. The legacy Squarespace/Supabase application must remain unchanged as a temporary rollback option until the native application passes testing and receives explicit cutover approval.

The native system will be built inside the existing `relief-plus-website` repository:

- `/time-card`: employee login, clock in/out, status, own current time card, and recent activity.
- `/time-card/admin`: Shawn Johnston's authenticated administrative payroll dashboard.

Shawn is an administrator, does not clock in/out, and must never be included in hourly payroll totals.

Both routes will use `noindex, nofollow`, remain excluded from the sitemap, contain no public SEO schema, and return no payroll information before server-side authentication and authorization.

## Current repository integration findings

- The public site is a Next.js 16.3.3 App Router application.
- `app/time-card/route.ts` is currently the legacy continuity proxy. It will remain until the native replacement is ready for an explicitly approved cutover.
- The discreet public Staff link already points to `/time-card` and requires no change.
- `/time-card` is not present in `app/sitemap.ts`.
- `next.config.ts` currently applies protected response headers to `/time-card`; the final rule must cover `/time-card/:path*` so the admin route receives the same protection.
- `app/layout.tsx` currently emits clinic `MedicalBusiness` JSON-LD globally. The native implementation must move public schema into a public-only route boundary so staff routes inherit no public structured data. This refactor must preserve public metadata, routes, and appearance.
- The repository currently has no Supabase, PostgreSQL, Argon2, session, rate-limit, or test dependencies.

## Proposed clean PostgreSQL schema

All identifiers use UUIDs. Timestamps are stored as `timestamptz` in UTC. Payroll dates are derived and interpreted in `America/Chicago`. Elapsed work and paid time are stored as integer minutes, not decimal floating-point hours, to avoid cumulative rounding errors.

### Enumerated values

```sql
create type time_card_role as enum ('ADMIN', 'EMPLOYEE');
create type paid_time_type as enum ('HOLIDAY', 'ADJUSTMENT');
create type time_entry_source as enum ('EMPLOYEE', 'ADMIN');
```

### `time_card_users`

```sql
create table time_card_users (
  id uuid primary key default gen_random_uuid(),
  login_identifier text not null unique,
  name text not null,
  pin_hash text not null,
  role time_card_role not null,
  active boolean not null default true,
  must_reset_pin boolean not null default false,
  locked_until timestamptz,
  failed_login_count integer not null default 0 check (failed_login_count >= 0),
  last_failed_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint time_card_users_login_not_blank check (btrim(login_identifier) <> ''),
  constraint time_card_users_name_not_blank check (btrim(name) <> '')
);
```

Names are displayed only after authentication or in the admin area. The login UI should use a non-sensitive staff identifier supplied through secure setup rather than publishing an employee directory. PIN hashes are Argon2id strings generated only on the server.

### `time_entries`

```sql
create table time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references time_card_users(id),
  clock_in timestamptz not null,
  clock_out timestamptz,
  source time_entry_source not null,
  note text,
  created_by uuid not null references time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references time_card_users(id),
  void_reason text,
  constraint time_entries_order check (clock_out is null or clock_out >= clock_in),
  constraint time_entries_void_reason check (
    (voided_at is null and voided_by is null and void_reason is null)
    or (voided_at is not null and voided_by is not null and void_reason is not null and btrim(void_reason) <> '')
  )
);

create unique index time_entries_one_open_punch_per_employee
  on time_entries (employee_id)
  where clock_out is null and voided_at is null;

create index time_entries_employee_clock_in
  on time_entries (employee_id, clock_in desc)
  where voided_at is null;
```

Corrections should preserve the previous value in the audit trail. Voiding is preferred to destructive deletion.

### `paid_time_entries`

```sql
create table paid_time_entries (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references time_card_users(id),
  type paid_time_type not null,
  payroll_date date not null,
  minutes integer not null check (minutes <> 0),
  note text not null,
  created_by uuid not null references time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid references time_card_users(id),
  void_reason text,
  constraint paid_time_entries_minutes_by_type check (
    (type = 'HOLIDAY' and minutes > 0)
    or (type = 'ADJUSTMENT' and minutes <> 0)
  ),
  constraint paid_time_entries_note_not_blank check (btrim(note) <> ''),
  constraint paid_time_entries_void_reason check (
    (voided_at is null and voided_by is null and void_reason is null)
    or (voided_at is not null and voided_by is not null and void_reason is not null and btrim(void_reason) <> '')
  )
);

create index paid_time_entries_employee_date
  on paid_time_entries (employee_id, payroll_date desc)
  where voided_at is null;
```

Holiday minutes must be positive. Adjustment minutes may be positive or negative. Both the database constraint and server validation enforce the rule by type.

### `time_card_sessions`

```sql
create table time_card_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references time_card_users(id) on delete cascade,
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
  on time_card_sessions (user_id, expires_at)
  where revoked_at is null;
```

Only an opaque random token is placed in the secure cookie. The database stores its SHA-256 hash, never the reusable token.

### `login_attempts`

```sql
create table login_attempts (
  id bigint generated always as identity primary key,
  login_key_hash text not null,
  ip_hash text not null,
  succeeded boolean not null,
  attempted_at timestamptz not null default now()
);

create index login_attempts_lookup
  on login_attempts (login_key_hash, ip_hash, attempted_at desc);
```

Entries require a defined short retention policy. Hashes should be generated with a server-only keyed HMAC so raw identifiers and IP addresses are not stored.

### `audit_logs`

```sql
create table audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references time_card_users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before_json jsonb,
  after_json jsonb,
  reason text,
  created_at timestamptz not null default now(),
  request_id uuid not null,
  constraint audit_logs_action_not_blank check (btrim(action) <> ''),
  constraint audit_logs_entity_type_not_blank check (btrim(entity_type) <> '')
);

create index audit_logs_entity
  on audit_logs (entity_type, entity_id, created_at desc);

create index audit_logs_actor
  on audit_logs (actor_id, created_at desc);
```

Application roles receive insert/select as specifically required but no update/delete permission on audit records.

### `app_settings`

```sql
create table app_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references time_card_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Required settings:

- `timezone`: initially `"America/Chicago"`.
- `pay_period`: object containing an explicitly confirmed local anchor date and `length_days: 14`.
- `login_policy`: attempt window, maximum attempts, and lockout duration.
- `session_policy`: idle and absolute expiration values.

Payroll settings are mandatory before production clocking is enabled. The application must fail closed if they are absent or invalid.

## Database access and transaction rules

- Use a new Supabase project or explicitly separate new schema/database approved for the native system. Do not reuse or modify the legacy project's objects.
- Revoke public access from time-card tables and functions. No payroll table is queried directly from browser code.
- Use server-only database credentials stored in the deployment secret manager.
- Prefer narrowly scoped transactional PostgreSQL functions for clock-in, clock-out, punch correction, paid-time creation/voiding, and lockout updates so validation, mutation, and audit logging commit atomically.
- Use database `now()` for clock timestamps. Client time is display-only and never authoritative.
- Enforce employee/admin roles inside every server operation. Database constraints remain a second line of protection.
- Use parameterized queries or the Supabase client; never concatenate request values into SQL.
- Do not expose the Supabase service-role key, database URL, PIN pepper, session secret, or initialization token to client bundles.

## Server and session architecture

### Authentication

1. Login form submits a staff login identifier and four-digit PIN to a server action or protected route handler.
2. The server normalizes and validates the request, applies database-backed attempt limits, retrieves the active user, and verifies the Argon2id hash.
3. A successful login clears/records failure state and creates an opaque high-entropy session.
4. The response sets a `HttpOnly`, `Secure`, `SameSite=Lax`, path `/time-card` cookie. Production cookies use the secure prefix where compatible with the required path behavior.
5. Authentication failures use the same response regardless of whether the identifier exists.

### Authorization

- Every page loader, server action, and route handler validates the session server-side.
- Employee queries derive `employee_id` from the authenticated session; they never accept another employee ID from the browser.
- `/time-card/admin` requires an active `ADMIN` role before payroll data is queried.
- Shawn's `ADMIN` record is excluded from clock mutations and payroll aggregates by role, not name.
- Session revocation, expiration, user deactivation, and role changes take effect server-side.

### Payroll calculations

- Store durations as elapsed integer minutes.
- Calculate a completed punch as the difference between authoritative UTC timestamps, then aggregate integer minutes.
- Convert for display only: `decimalHours = totalMinutes / 60`, so 15 minutes is `0.25`, 30 is `0.50`, and 45 is `0.75`.
- Do not round individual punches unless the owner explicitly approves a rounding rule. Format only the final displayed/exported value to the required precision.
- Determine payroll dates and period boundaries using the centralized `America/Chicago` setting and confirmed anchor.
- Total paid minutes equal completed worked minutes plus holiday minutes plus signed adjustment minutes. Open punches are alerts and are not included as completed paid time.

## Secure employee initialization

Create an idempotent, one-time server-side setup command or authenticated setup workflow that:

1. Requires a short-lived initialization secret supplied only through the secret manager or protected terminal input.
2. Accepts employee names/identifiers, roles, and PINs without writing plaintext PINs to disk or logs.
3. Validates PIN format, hashes with Argon2id, and inserts users in a transaction.
4. Creates Shawn as `ADMIN` and current hourly staff as `EMPLOYEE`.
5. Refuses to run after initialization is marked complete unless an explicit secure recovery procedure is used.
6. Removes or disables the initialization secret after successful setup.

No production employee or PIN seed file will exist in Git.

## Required environment variables

Names may be adjusted to match the approved Supabase connection method, but the contract is:

```text
TIME_CARD_DATABASE_URL
TIME_CARD_DATABASE_DIRECT_URL        # migrations/admin only, never runtime if unnecessary
TIME_CARD_SESSION_HMAC_SECRET
TIME_CARD_LOGIN_HMAC_SECRET
TIME_CARD_INITIALIZATION_SECRET      # temporary; remove after setup
```

If the Supabase server SDK is selected instead of a direct PostgreSQL runtime connection:

```text
TIME_CARD_SUPABASE_URL
TIME_CARD_SUPABASE_SERVICE_ROLE_KEY
```

Public `NEXT_PUBLIC_*` variables are not required for payroll access. Preview and production must use distinct databases and secrets. Values belong in the deployment secret manager and local ignored environment files only.

## Proposed maintained dependencies

Final selection occurs during implementation after compatibility checks:

- A server-only PostgreSQL/Supabase client appropriate for Supabase's Vercel connection method.
- `@node-rs/argon2` or another maintained Argon2id implementation compatible with the deployment runtime.
- A time-zone library only if the platform APIs cannot express and thoroughly test pay-period boundary calculations safely.
- Vitest or the repository-approved test runner for unit and server integration tests.
- Playwright for authenticated route and role-boundary tests if supported by the preview workflow.

No ORM is required for this small, explicit schema.

## Incremental implementation sequence

1. Owner confirms the remaining payroll/security decisions below.
2. Create the new Supabase project and configure separate preview secrets without touching legacy Supabase.
3. Add reviewed versioned SQL migrations and database tests.
4. Add server-only database, authentication, session, authorization, rate-limit, time-zone, pay-period, and duration modules with unit tests.
5. Refactor the layout boundary so public pages retain existing schema while staff routes receive none.
6. Build `/time-card` behind the existing proxy using a temporary development route or feature gate; do not remove rollback.
7. Build `/time-card/admin`, transactional audit operations, alerts, and CSV export.
8. Run the mandated authentication, role-isolation, punch, payroll, audit, accessibility, lint, type, build, and browser tests.
9. Conduct owner acceptance in preview with test employees and test records.
10. Only after explicit approval, switch `/time-card` from proxy to native and retain a documented rollback window. Production deployment and DNS remain separately authorized actions.

## Automated test minimum

- Employee login and invalid PIN behavior.
- Admin login.
- Rate-limit threshold, temporary lockout, and recovery.
- Employee blocked from admin.
- Employee blocked from another employee's records.
- Clock in and duplicate clock-in rejection.
- Clock out and no-open-punch rejection.
- Server timestamp authority.
- Decimal-hour conversion from integer minutes.
- Pay-period previous/current/next calculations across year and DST boundaries.
- Holiday totals, signed adjustments, and total paid hours.
- Admin-created missed punch and correction.
- Audit records for every admin payroll mutation.
- Voided entries excluded while audit history remains.
- Shawn excluded from clocking and hourly payroll totals.
- Anonymous responses contain no staff/payroll data or public schema.
- `/time-card` and `/time-card/admin` return noindex/nofollow headers and remain absent from the sitemap.

## Confirmed payroll decisions

The owner has confirmed:

- Repeating 14-calendar-day periods anchored Monday, August 10, 2026 through Sunday, August 23, 2026.
- America/Chicago calendar boundaries, with authoritative database/server timestamps stored in UTC where appropriate.
- Exact elapsed integer minutes with no punch rounding.
- Display totals formatted to exactly two decimal hours.
- No overtime calculation or regular/overtime labels.
- No automatic break deduction; employees clock out and back in.
- Worked, holiday, adjustment, and total-paid hours remain separate.
- CSV columns: Employee, Worked Hours, Holiday Hours, Adjustments, Total Paid Hours, Pay Period Start, Pay Period End.

## Owner/environment actions still required

1. Create a new non-production Supabase project for the native time card. Do not link or modify the legacy project.
2. Store `TIME_CARD_DATABASE_URL`, `TIME_CARD_SESSION_HMAC_SECRET`, and `TIME_CARD_LOGIN_HMAC_SECRET` in the approved preview secret manager. Do not send their values through chat.
3. Confirm the new Supabase project region, backup level, project owner, and eventual separation between preview and production.
4. Confirm session idle timeout and absolute lifetime. The unapplied migration currently proposes 30 minutes idle and 12 hours absolute.
5. Confirm maximum failed attempts, attempt window, and lockout duration. The unapplied migration currently proposes five failures in 15 minutes and a 15-minute lockout.
6. Confirm the secure employee login identifier format; publishing an employee-name directory is not recommended.
7. Confirm who besides Shawn, if anyone, may reset PINs, unlock users, correct/void records, change settings, or export payroll.
8. Confirm record-retention requirements for punches, paid entries, login attempts, sessions, exports, and audit logs.
9. Confirm how much historical time-card data employees may view after the new system begins collecting records.
10. Supply employee identities and initial PINs only through the future secure initialization process, never through Git or chat.

Database-backed authentication, sessions, clock mutations, employee pages, admin operations, CSV export, and integration testing begin only after the new preview Supabase environment is available. No production cutover is authorized by this plan.
