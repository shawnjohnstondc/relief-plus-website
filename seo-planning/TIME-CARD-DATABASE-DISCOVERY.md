# Native Time Card Database Discovery

Date: September 1, 2026  
Status: **CLOSED BY OWNER DECISION — HISTORICAL DATA WILL NOT BE MIGRATED**

## Owner decision superseding discovery

The owner confirmed that historical time-card/payroll data does not need to be preserved. Discovery or migration of the legacy Supabase database is no longer required. The legacy Squarespace/Supabase application must remain unchanged as a temporary rollback option while a new, independent native system is built and tested.

The clean-system design and remaining decisions are documented in `seo-planning/NATIVE-TIME-CARD-IMPLEMENTATION-PLAN.md`. Nothing in this earlier discovery record authorizes access to or modification of the legacy database.

## Purpose

This phase determines whether the existing Relief Plus Supabase PostgreSQL project can safely remain the source of truth for the native `/time-card` and `/time-card/admin` application. Discovery is read-only. It does not authorize schema changes, data migrations, credential resets, application implementation, deployment, DNS changes, or access to employee PINs.

## Local repository findings

- The current branch is `website-v1`, synchronized with `origin/website-v1` at the start of discovery.
- The repository contains no Supabase project directory, SQL schema, migration history, database dump, generated database types, seed data, or historical time-card source.
- No `.env` file is present in the repository. Environment files are ignored by Git.
- The current shell exposes no Supabase, PostgreSQL, database, Vercel, or legacy time-card environment-variable names.
- The Supabase CLI is not installed or available on `PATH`.
- `package.json` contains no Supabase client, PostgreSQL driver, ORM, Argon2 implementation, or rate-limit dependency.
- Git history contains only the current `/time-card` continuity route and its planning documents; it contains no earlier database or payroll implementation.
- The current `/time-card` route is an anonymous, environment-gated proxy. It does not authenticate staff or read payroll data itself.

No secrets were printed, no authentication was attempted, and no database request was made during this discovery.

## Evidence available from the legacy public client

Prior read-only inspection of the legacy Squarespace application found client references to:

- Supabase Auth session, password-login, and logout operations.
- Tables named `employees`, `employee_pay_rates`, and `time_entries`.
- Employee roles named `employee` and `admin`.
- Time-entry fields including employee, work date, entry type, clock-in, clock-out, hours, and note.
- Procedures for clock-in, clock-out, missed time, holidays, adjustments, rate changes, and entry deletion.
- A 14-day pay-period model and `America/Chicago` behavior.

This establishes a plausible continuity path but does not establish table contents, record counts, database ownership, backups, constraints, procedure safety, grants, or Row Level Security.

## Discovery questions that require authorized access

### Project and recovery

1. Which Supabase organization and project own the production time-card data?
2. Is the project active, and who has owner/admin authority?
3. What backup or point-in-time recovery coverage exists?
4. Has a restore been tested, and what is the rollback procedure?

### Schema and data continuity

5. What are the exact columns, data types, defaults, constraints, indexes, triggers, and relationships for `employees`, `employee_pay_rates`, and `time_entries`?
6. How are Supabase Auth users mapped to employee rows?
7. How many rows exist in each table, and what are the earliest/latest relevant dates?
8. Are there orphaned employee references, duplicate entries, open punches, impossible time ranges, or missing pay rates?
9. Does pay-rate history exist, or is only the current rate stored?
10. Are records soft-deleted, hard-deleted, or amended through adjustment entries?

### Authorization and database procedures

11. Is RLS enabled and forced where appropriate on every exposed table?
12. What policies apply to anonymous, authenticated, employee, admin, and service roles?
13. What are the complete definitions, owners, `SECURITY DEFINER` settings, `search_path` settings, and grants for every `relief_*` procedure?
14. Can an employee read or mutate another employee's records through direct table access or an RPC?
15. Can an unauthenticated user enumerate employees or invoke a clock/payroll function?
16. Are administrator permissions enforced in PostgreSQL/server code rather than only in the legacy browser UI?

### Payroll behavior

17. What is the authoritative 14-day pay-period anchor?
18. How are America/Chicago daylight-saving transitions handled?
19. What rounding, overtime, break, holiday, missed-punch, correction, deletion, and adjustment rules apply?
20. Which operations require an audit reason, second confirmation, or immutable audit record?

## Required read-only inventory

An authorized owner or database administrator should provide one of the following through an approved secure channel:

1. Temporary least-privilege access to a non-production clone or restored backup; or
2. A sanitized schema-only export plus a read-only inventory report generated inside Supabase.

The inventory should include:

- Project reference and environment designation, without secret keys in this repository.
- Table/view definitions, constraints, indexes, triggers, and relationships.
- RLS enabled/forced status and policy definitions.
- Procedure definitions, owners, security mode, configuration, and grants.
- Role and table privileges.
- Row counts and earliest/latest dates, using aggregate results rather than employee-level exports.
- Counts of open punches, orphaned references, invalid intervals, duplicate candidates, and missing rate mappings.
- Backup/PITR status and restore evidence.

Do not place database URLs, JWT secrets, service-role keys, access tokens, employee PINs, employee exports, pay rates, or time-entry records in Git, issue text, chat, or this planning directory.

## Secure access options

Preferred order:

1. Create or restore a non-production Supabase project containing a controlled copy of the schema and appropriately protected test data, then grant time-limited least-privilege access.
2. Configure secrets directly in the approved preview/deployment secret manager and expose only the minimum server-side variables required for the authorized task.
3. Have the Supabase owner run the read-only discovery inventory and provide sanitized aggregate/schema output.

Production service-role credentials should not be used for exploratory browser/client work. If temporary access is granted, it should be scoped, time-limited where possible, logged, and revoked after discovery.

## Preservation decision

The existing Supabase database remains the recommended source of truth **if** discovery confirms recoverable historical records and an authorization model that can be secured without destructive conversion. No evidence currently justifies creating an empty replacement database.

If security defects are found, the preferred response is an additive, reversible hardening migration after backup—not deleting or rewriting historical payroll data. Any data transformation, production migration, or credential change requires a separate owner approval.

## Exit criteria for database discovery

Discovery is complete only when all of the following are documented:

- Verified project ownership and environment.
- Restorable backup or rollback evidence.
- Schema, constraints, indexes, triggers, policies, grants, and procedure definitions.
- Aggregate historical inventory and integrity findings.
- Auth-user-to-employee mapping model.
- Confirmed payroll and pay-period rules.
- Explicit list of security gaps and proposed non-destructive remediation.
- A written decision to preserve the existing project or migrate from it, with owner approval.

Until then, native application implementation remains gated and the continuity proxy must not be removed.
