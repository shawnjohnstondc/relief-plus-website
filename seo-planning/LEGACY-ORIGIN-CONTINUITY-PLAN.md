# Legacy-Origin Continuity Plan

Date: September 1, 2026  
Phase: 10B  
Status: **TIME-CARD AND 23 EXACT PUBLIC PATHS PREPARED; HOSTED ACCEPTANCE NOT COMPLETE**

## Verified origin

The current Squarespace site publicly identifies `https://harp-tangerine-s9zs.squarespace.com` as its system hostname. Read-only checks confirmed that both `/` and `/time-card` return `200` from that hostname without redirecting to `myreliefplus.com`. This provides a technically viable, non-looping origin candidate after the public domain points to Vercel.

The Squarespace HTML still declares `https://www.myreliefplus.com` as its base URL. Every proxied path must therefore be tested for assets, scripts, canonicals, navigation, cookies, forms, and external services before use.

## `/time-card`

`app/time-card/route.ts` is the only continuity route implemented in Phase 10B. It:

- preserves the exact `/time-card` path;
- is enabled only by server environment variable `LEGACY_TIMECARD_ORIGIN`;
- rejects non-HTTPS origins and the public Relief Plus hostnames;
- proxies anonymous legacy HTML without accepting credentials or reading clock records;
- returns `X-Robots-Tag: noindex, nofollow` and injects matching robots meta;
- returns `Cache-Control: private, no-store, max-age=0`;
- remains absent from the sitemap and public schema;
- returns `503` without exposing configuration when the origin is absent;
- returns `502` when the upstream does not respond successfully.

Anonymous validation passed with the Squarespace system hostname. Production enablement remains prohibited until an authorized staff/admin test confirms authentication, permissions, all clock/admin actions, session behavior, RLS enforcement, and historical-record continuity.

## Exact-path public continuity registry

Phase 10C adds a disabled-by-default, explicit registry for 23 public legacy URLs. Set preview/server environment variable `LEGACY_PUBLIC_ORIGIN` to the approved HTTPS origin to enable it. There is no wildcard fallback.

The registry temporarily preserves:

- 11 require Search Console/backlink review before a consolidation redirect;
- 2 are approved future article restorations;
- `/invisared-weight-loss-lafayette` is an approved future service page requiring service/device verification;
- 7 tag archives plus `/blog/team` and `/blog/tag/team` require data review;

The 15 non-tag paths use exact `afterFiles` rewrites. The eight exact tag paths use an allowlisted route handler so legacy plus-sign paths work without a wildcard or runtime matcher error. An unapproved tag returns `404`.

Explicitly excluded:

- `/cart`, because the owner has not approved preservation or retirement;
- the prolozone/AC-joint article;
- the systemic-ozone/chiropractic article;
- the chiropractic/sleep article.

The three articles remain excluded because the owner rejected restoration and instructed the project not to preserve their old clinical/marketing claims elsewhere. They require a separate backlink-informed redirect-or-retirement decision.

A blanket fallback rewrite remains prohibited. It would keep rejected claims public, could mask typographical `404`s, and could send crawler authority to unreviewed legacy content.

## Phase 10C local results

- All 23 routes compile with the explicit registry enabled.
- The first ten public paths returned `200`, non-empty legacy pages, and exact `https://www.myreliefplus.com/...` historical canonicals.
- Squarespace then returned `429 Too Many Requests` during the burst test. This is a cutover risk: origin capacity/rate-limit behavior must be resolved or safely cached before production continuity is approved.
- The two literal plus-sign tag paths initially caused runtime matcher errors under direct rewrites. Moving all eight tag routes to an explicit allowlisted handler corrected the problem; `/blog/tag/frozen+shoulder` and `/blog/tag/range+of+motion` then returned `200`.
- An unapproved tag returned `404`.
- `/cart` and all three owner-rejected article paths returned `404` and were not proxied.

The existing GitHub/Vercel integration has a successful SSO-protected preview for checkpoint `e23a6f9`. Anonymous requests receive the expected Vercel authentication redirect and cannot test application routes. The Phase 10C working tree has not been committed or deployed, and no local Vercel project link or CLI credentials are present.

## Safe continuity choices

For each unresolved public URL, approve exactly one behavior before cutover:

1. Build and serve the preserved page from Next.js.
2. Add a reviewed one-hop `301` to a genuinely equivalent destination.
3. Temporarily proxy that exact path to the legacy origin while data review remains open.
4. Intentionally retire it only after traffic/backlink review supports a real `404` or `410` outcome.

Temporary proxy rules must be explicit path-by-path, not a wildcard. They should have an owner, expiration/review date, monitoring, and a tested rollback. Public legacy pages must retain appropriate canonical/indexation behavior; staff-only rules used for `/time-card` must not be copied onto public pages.

## Remaining inputs

- Authorized Search Console and backlink data for unresolved public URLs.
- Owner decision for `/cart` and each taxonomy/team route.
- Verified InvisaRED device/service details.
- Authorized staff/admin time-card acceptance test.
- Supabase project, RLS, procedure, role, backup, and audit-log review.
- A Vercel preview deployment where origin environment variables and proxy behavior can be tested without DNS changes.
- Authorized access through Vercel preview protection, or an owner-run acceptance session.
- Confirmation from Squarespace/Vercel that expected preview and crawler traffic will not trigger the observed legacy-origin `429` response.
