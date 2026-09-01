# Relief Plus `/time-card` Migration Plan

Date: September 1, 2026  
Status: **CONTINUITY ROUTE PREPARED — AUTHORIZATION/DATA REVIEW NOT COMPLETE**

## Owner requirement

Preserve `https://www.myreliefplus.com/time-card` as a staff-only clock-in/clock-out application. It is not a patient page. It must remain out of public navigation other than the existing discreet `Staff` footer link, emit `noindex, nofollow`, stay out of the XML sitemap, and carry no public medical/business schema.

## Read-only findings

- The live URL returns `200` directly from Squarespace; it does not redirect elsewhere and no iframe was found.
- The application is embedded as client-side JavaScript in the Squarespace page and creates a Supabase client in the browser.
- It uses Supabase password authentication and session lookup/sign-out behavior.
- The client references employee, pay-rate, and time-entry data plus database procedures for clock actions and administrative adjustments.
- The live HTML contains four staff account identifiers and public client configuration. No service-role marker was found in the inspected HTML. Public client configuration can be legitimate only when Row Level Security and authorization policies are correctly enforced; those policies could not be inspected from the public page.
- The current page has no robots meta directive. It is therefore not currently implementing the approved `noindex, nofollow` policy.
- At the start of Phase 10B, this repository contained no `/time-card` route. It still contains no replacement authentication implementation, Supabase schema/migrations, RLS policies, database procedures, employee credentials, or employee/time-entry data; the new route is a continuity proxy only.
- Squarespace exposes the same application at the stable system hostname `https://harp-tangerine-s9zs.squarespace.com/time-card`. A read-only request returned `200` and the same time-card form/application markers without redirecting to the public domain. The page configuration still declares `https://www.myreliefplus.com` as its base URL, so end-to-end proxy behavior must be tested before cutover.

No form was submitted, no login was attempted, and no employee records were queried during this review.

## Required backend and security inventory

Before any migration, an authorized owner must provide or verify:

1. Supabase project ownership and administrative access.
2. Authentication users, recovery process, MFA options, and staff/admin role model.
3. Database definitions for employee, pay-rate, and time-entry tables.
4. Definitions and privileges for all time-clock and adjustment procedures.
5. Row Level Security policies for every referenced table and procedure.
6. Whether browser clients can read any employee other than the authenticated user.
7. Which accounts may see payroll totals, rates, other employees, edit entries, or delete entries.
8. Audit logging, backup/restore, retention, and record-export requirements.
9. Time zone, daylight-saving, pay-period, rounding, missed-punch, holiday, and adjustment rules.
10. A reconciled export of historical records and a rollback snapshot.

Public source must not contain an employee directory. Supabase service-role keys or other privileged credentials must never be placed in client code or `NEXT_PUBLIC_*` variables.

## Recommended continuity architecture

### Safest immediate cutover option: path-specific legacy-origin proxy

Keep the public Next.js site on Vercel while proxying only `/time-card` to a stable, separately named legacy origin:

```text
myreliefplus.com/*          → Vercel public website
myreliefplus.com/time-card → stable staff-app origin through a Vercel external rewrite/proxy
```

Requirements:

- Establish a stable origin hostname that is **not** `myreliefplus.com`; rewriting back to the public hostname would loop.
- Confirm Squarespace can serve the page and required assets on that hostname after the main domain moves.
- Test authentication cookies, Supabase sessions, CSP, asset URLs, form behavior, and all clock/admin actions through the preserved public path.
- Add an `X-Robots-Tag: noindex, nofollow` response header at Vercel/edge level if the proxied HTML cannot be changed reliably. A page meta directive may be added as defense in depth.
- Do not add the route to the sitemap or public structured data.
- Restrict cache behavior so authenticated or personalized content is never stored in a shared public cache.
- Monitor the route independently from the marketing site.

Next.js supports external rewrites as a proxy while retaining the visible URL. Phase 10B tested that approach, then rejected it for this route because the upstream response did not retain the required indexing and cache headers in the local production test.

### Prepared Next.js continuity configuration

The first external-rewrite test returned the correct legacy page but did not retain the required indexing/cache headers. It was therefore replaced with a narrow server-side route proxy at `app/time-card/route.ts`:

- Set server environment variable `LEGACY_TIMECARD_ORIGIN` to the approved HTTPS legacy origin to enable the proxy.
- The value is normalized to its origin and must not point to `myreliefplus.com` or `www.myreliefplus.com`, preventing an obvious proxy loop.
- `/time-card` receives `X-Robots-Tag: noindex, nofollow`, a matching robots meta tag, `Cache-Control: private, no-store, max-age=0`, and `Referrer-Policy: same-origin` whether or not the proxy is enabled.
- If the environment variable is absent, the route returns `503` instead of presenting a fake time-clock interface. If the upstream fails, it returns `502`; neither response exposes configuration or staff data.
- The proxy retrieves only the anonymous legacy HTML. The existing browser application continues to authenticate directly with Supabase; the Next.js route does not accept staff credentials or query time records.
- The route remains absent from the sitemap and public structured data.

Candidate staging value:

```text
LEGACY_TIMECARD_ORIGIN=https://harp-tangerine-s9zs.squarespace.com
```

Do not add the variable to production until an authorized user validates login, ordinary clock-in/out, administrative permissions, sign-out, session behavior, and record continuity through a preview deployment. The origin is not a secret; staff credentials and privileged Supabase keys remain secret and must never be committed. The legacy anonymous HTML still exposes four staff account identifiers, so this proxy is continuity protection—not the final security remediation.

### Preferred long-term option: secured staff application

Migrate the interface only after the Supabase security model and data continuity are documented:

- Implement `/time-card` as a separate authenticated application boundary, even if it shares the Next.js deployment.
- Validate the session server-side for protected reads and mutations.
- Enforce staff/admin authorization in the database and server layer, not only by hiding UI controls.
- Keep privileged Supabase credentials server-only.
- Use least-privilege RLS and narrowly scoped server endpoints or database procedures.
- Return only the minimum records needed by the authenticated user.
- Add CSRF/replay protection where applicable, rate limiting for login/mutations, secure cookies, and audit logs.
- Provide an explicit sign-out and safe session-expiration behavior.
- Emit `robots: { index: false, follow: false }` and an `X-Robots-Tag` header.
- Do not attach LocalBusiness, MedicalWebPage, Service, Breadcrumb, or other public SEO JSON-LD.

## Data continuity and acceptance tests

Before switching the route:

1. Freeze or coordinate writes for the final export window.
2. Back up schema, procedures, auth mapping, policies, and all applicable records.
3. Reconcile employee identities and historical totals between old and new systems.
4. Test standard staff clock-in/out, refresh, sign-out, missed punches, holidays, adjustments, rate changes, and authorized deletion in a non-production environment.
5. Verify unauthorized and cross-employee access is denied at the data layer.
6. Verify no employee identifiers or records appear in anonymous HTML, API responses, logs, analytics, or shared caches.
7. Test 375, 390, and 430 px layouts and the discreet footer entry point.
8. Confirm `/time-card` returns `200`, preserves the exact URL, emits `noindex, nofollow`, and is absent from `sitemap.xml`.
9. Preserve a tested rollback route to the legacy origin.

## Current blockers and decision

The continuity route is prepared but the staff application is **not yet approved for cutover**. A public-site cutover is architecturally possible only after an authorized user proves the environment-gated proxy through a preview deployment, or a fully secured replacement passes the acceptance tests above. DNS must not be changed while `LEGACY_TIMECARD_ORIGIN` is unset or while the route has not passed functional and authorization testing.

## Native application owner override

The approved long-term route model is `/time-card` for employee login/clock functions and `/time-card/admin` for the authenticated administrative payroll dashboard. `/employee` is not the primary employee route. The existing Supabase PostgreSQL project is the presumptive source of truth and historical records must be preserved in place when its schema and security model are verified.

The detailed pre-implementation architecture, preservation assessment, security controls, migration sequence, and owner-information requirements are recorded in `seo-planning/NATIVE-TIME-CARD-MIGRATION-ARCHITECTURE.md`. Native implementation remains gated on authorized Supabase schema/RLS/procedure inspection, historical inventory, backup/rollback verification, payroll-rule confirmation, and a safe non-production test environment. Real PINs must never be committed or supplied through an insecure project artifact.
