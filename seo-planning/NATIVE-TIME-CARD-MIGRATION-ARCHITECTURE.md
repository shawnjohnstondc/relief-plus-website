# Native Time-Card Migration Architecture

Date: September 1, 2026  
Status: **ARCHITECTURE COMPLETE — DATA AND SECURITY VERIFICATION REQUIRED BEFORE IMPLEMENTATION**

## Scope and fixed route requirements

The native staff application will live inside the existing Relief Plus Next.js repository. It will not replace, redesign, or create a separate version of the public website.

- `/time-card` is the employee login and clock interface.
- `/time-card/admin` is the authenticated administrative payroll dashboard.
- The existing discreet footer `Staff` link continues to point to `/time-card`.
- Neither route belongs in public primary navigation or the XML sitemap.
- Both routes must emit `noindex, nofollow`, contain no public SEO schema, and require server-verified authentication before protected information is returned.

The clinic identity remains Relief Plus, 112 Arabian Dr., Lafayette, LA 70507, serving Lafayette, Carencro, and Acadiana. The address must never be represented as a Carencro postal address.

## Existing-system findings

The legacy Squarespace application is a browser-based Supabase client. Read-only inspection found references to:

- Supabase Auth password login and session/logout operations.
- `employees`, `employee_pay_rates`, and `time_entries` tables.
- Employee roles named `employee` and `admin`.
- Clock-in, clock-out, missed-time, holiday, adjustment, rate-change, and entry-deletion database procedures.
- A 14-day pay-period model, `America/Chicago` time-zone behavior, and an August 13, 2026 report anchor in the current client.

No login was attempted, no form was submitted, and no employee or payroll record was queried. The repository contains no Supabase schema export, migrations, Row Level Security policies, function definitions, database backup, historical record export, or secure project access. The public application proves that persistent data structures are referenced; it does **not** prove record counts, date coverage, data integrity, policy safety, or project ownership.

### Preservation assessment

Historical continuity appears technically feasible and the existing Supabase PostgreSQL project should remain the presumptive source of truth. That conclusion is conditional. It cannot be verified until an authorized inventory confirms the tables, records, identity mappings, policies, procedures, and backups.

No new database, ORM, destructive migration, reset, overwrite, or production data copy is authorized. Prisma or Drizzle should not be introduced merely to wrap an already suitable Supabase PostgreSQL schema.

## Recommended architecture

### Data layer

Retain the existing Supabase PostgreSQL records in place if the authorized review passes. Access them from server-only code through audited, narrowly scoped database functions or a least-privilege server role. Never expose a service-role key in browser code or a `NEXT_PUBLIC_*` variable.

Existing procedures may be reused only after their definitions, grants, authorization checks, transaction behavior, and audit effects are reviewed. If changes are required, add reversible, versioned migrations; do not modify or delete production records in place without a backup and explicit owner approval.

### Authentication and PIN security

The native application must not retain the legacy public employee-name directory or use client-side role enforcement.

- Store only server-generated Argon2id PIN hashes, never PIN plaintext.
- Initialize PINs through a one-time authenticated process or secret setup input that is never committed, logged, rendered, or included in a seed file.
- Use generic authentication errors so account existence is not disclosed.
- Enforce atomic, database-backed rate limits and temporary lockouts. In-memory counters are insufficient for a serverless deployment.
- Track attempts using privacy-conscious identifiers, such as an employee identifier plus a keyed hash of network context, with defined retention.
- Issue short-lived opaque sessions in `HttpOnly`, `Secure`, appropriately scoped `SameSite` cookies. Store only session-token hashes server-side and support expiry, revocation, and rotation.
- Re-verify the administrator role on the server for every payroll read or mutation. UI visibility is not authorization.

Four-digit PINs remain low entropy even when securely hashed. Hashing, throttling, lockouts, generic responses, secure sessions, and server/database authorization are therefore a single mandatory control set.

### Application boundary

Implement the staff application as a distinct route boundary within this repository:

```text
/time-card        employee login and authenticated clock interface
/time-card/admin  authenticated, administrator-only payroll dashboard
```

Prefer server actions or narrow server endpoints that validate the session and authorization before every read or mutation. Anonymous HTML and responses must not include staff names, rates, entries, totals, or account identifiers. Sensitive responses must use private/no-store caching controls.

The current root layout injects `MedicalBusiness` JSON-LD into every route. Before native staff pages ship, public structured data must be moved to a public-only layout boundary (or another server-safe public-only mechanism) so both staff routes contain no public schema. The public site's metadata and schema must otherwise remain unchanged.

Both staff routes require page-level robots metadata and response-level `X-Robots-Tag: noindex, nofollow`. Neither route may be added to `app/sitemap.ts`.

### Authorization and audit trail

Employees may access only their own authorized clock state and entries. Administrators may access payroll information only after an active session and server-verified admin role. All privileged changes should record actor, timestamp, affected record, reason, and before/after values without logging credentials or session secrets.

Database policies must independently prevent anonymous access, cross-employee reads, role escalation, unauthorized changes, and direct calls to privileged procedures.

## Safe migration sequence

1. Obtain an authorized, secret-safe schema and security inventory.
2. Confirm ownership, backups or point-in-time recovery, and a tested restore path.
3. Reconcile employee/auth identity mappings and inventory historical rows without exporting sensitive data into Git.
4. Review RLS policies, procedure definitions, grants, constraints, indexes, triggers, and audit behavior.
5. Document exact payroll rules: time zone, pay-period anchor, rounding, overtime, open punches, edits, holidays, adjustments, rate history, and retention.
6. Implement additive security/schema changes in a non-production Supabase environment or restored test copy.
7. Build and test the native routes in an authorized preview environment.
8. Reconcile representative and full-period totals against the legacy application, including historical records.
9. Test employee isolation, admin authorization, rate limits, lockouts, session expiry/revocation, caching, metadata, sitemap exclusion, and mobile operation.
10. Schedule a controlled cutover with a final backup and rollback path. Remove the Squarespace proxy dependency only after owner acceptance of the native application.

The existing proxy remains the rollback/continuity mechanism until native verification is complete. Production DNS and production deployment are outside this phase.

## Owner-provided information required

Provide credentials only through the approved deployment secret manager or an authorized access channel—not chat, source files, or Git.

1. Supabase project ownership/access, project reference, and the approved preview/production secret-management path.
2. A schema-only export covering the three referenced tables, constraints, indexes, triggers, RLS policies, function definitions, ownership, and grants.
3. A sanitized inventory of row counts and earliest/latest relevant timestamps, plus the reconciliation method for totals. No employee records need to be pasted into the repository.
4. Backup/PITR status and an owner-approved restore/rollback procedure.
5. Current active employees, admin assignments, and Supabase Auth-to-employee identity mapping through a secure channel.
6. The approved secure PIN initialization method. Real PINs must not be supplied in chat or committed.
7. Final payroll rules, including the 14-day period anchor, America/Chicago handling, rounding, overtime, holidays, missed punches, adjustments, rate history, deletion/correction rules, and retention.
8. Desired failed-attempt threshold, lockout duration, session lifetime, recovery process, and who may unlock or reset an account.
9. Confirmation of which administrative operations must be preserved and which require a second confirmation or immutable audit entry.
10. Authorization for any additive database migration and any maintained Argon2id dependency selected during implementation.

## Implementation gate

The native application must **not** be implemented against production data yet. The minimum gate is an authorized schema/RLS/procedure review, verified historical inventory, backup/rollback confirmation, payroll-rule confirmation, and secure access to a non-production test environment. Until that gate is met, the correct action is to preserve the current continuity route and avoid changing the source of truth.

## Security references

- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase server-side authentication for Next.js: https://supabase.com/docs/guides/auth/server-side/nextjs
- Supabase authentication rate limits: https://supabase.com/docs/guides/auth/rate-limits
- OWASP Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
