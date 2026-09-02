# Native Time Card Supabase Setup

This directory contains the new Relief Plus native time-card schema. It is independent of the legacy Squarespace/Supabase application.

## Safety boundary

- Apply migrations only to a newly created, non-production Supabase project approved for the native time card.
- Do not link this repository to the legacy Supabase project.
- Do not paste database URLs, service-role keys, employee data, or PINs into Git or chat.
- Do not apply the migration to production until preview testing and owner acceptance are complete.

## Current migration

`migrations/202609010001_native_time_card.sql` creates:

- `time_card_users`
- `time_entries`
- `paid_time_entries`
- `time_card_sessions`
- `login_attempts`
- `audit_logs`
- `app_settings`
- enums, constraints, indexes, update triggers, initial confirmed payroll settings, and restrictive public grants/RLS defaults

The migration contains no employees, PINs, punches, or payroll data.

## Required preview configuration

Configure these as server-only preview environment variables:

```text
TIME_CARD_DATABASE_URL
TIME_CARD_SESSION_HMAC_SECRET
TIME_CARD_LOGIN_HMAC_SECRET
```

The database URL should use the Supabase connection method appropriate for the deployment runtime. The HMAC secrets must be independently generated high-entropy values. None belong in `NEXT_PUBLIC_*` variables.

## Not implemented yet

The migration has not been applied. Secure employee initialization, transactional clock/admin functions, session persistence, database-backed login attempt recording, native routes, and CSV export are intentionally deferred until the new preview project and secrets are configured.
