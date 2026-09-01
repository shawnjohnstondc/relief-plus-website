# Legacy-Origin Continuity Plan

Date: September 1, 2026  
Phase: 10B  
Status: **TIME-CARD PATH PREPARED; PUBLIC LEGACY FALLBACK NOT YET APPROVED**

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

## Unresolved public legacy paths

The 27 unresolved public legacy URLs are listed individually in `FINAL-URL-VALIDATION.csv`. Phase 10B does **not** automatically proxy them because their intended outcomes differ:

- 11 require Search Console/backlink review before a consolidation redirect;
- 3 were rejected for restoration and require redirect-or-retirement review;
- 2 are approved future article restorations;
- `/invisared-weight-loss-lafayette` is an approved future service page requiring service/device verification;
- 7 tag archives plus `/blog/team` and `/blog/tag/team` require data review;
- `/cart` requires an owner decision.

A blanket fallback rewrite is intentionally prohibited. It would keep rejected claims public, could mask typographical `404`s, and could send crawler authority to unreviewed legacy content.

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

