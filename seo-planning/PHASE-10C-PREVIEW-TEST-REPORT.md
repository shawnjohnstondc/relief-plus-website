# Phase 10C Preview and Exact-Path Continuity Test

Date: September 1, 2026  
Branch: `website-v1`  
Status: **LOCAL CONTINUITY VALIDATED IN PART; HOSTED/AUTHORIZED ACCEPTANCE PENDING**

## Scope and safeguards

Phase 10C prepared preview-only continuity without changing production DNS, attaching domains, logging into staff accounts, querying employee records, or deploying the uncommitted working tree.

No wildcard legacy fallback was created. Production remains disabled unless the two server variables are deliberately configured:

```text
LEGACY_PUBLIC_ORIGIN=https://harp-tangerine-s9zs.squarespace.com
LEGACY_TIMECARD_ORIGIN=https://harp-tangerine-s9zs.squarespace.com
```

Both values are loop-checked and must use HTTPS outside the public Relief Plus hostname.

## Exact-path registry

Twenty-three public URLs are eligible for temporary preview continuity:

- 11 data-gated consolidation candidates;
- 9 taxonomy/team paths awaiting data review;
- 2 approved future article restorations;
- `/invisared-weight-loss-lafayette`.

The registry excludes `/cart` and the three owner-rejected articles. An arbitrary `/blog/tag/...` URL is also rejected with `404` unless its tag is one of the eight exact legacy values.

## Local production results

| Check | Result |
|---|---|
| Lint | Passed |
| TypeScript | Passed |
| Production webpack build with both origins enabled | Passed |
| `git diff --check` | Passed |
| First ten public continuity paths | `200`, legacy content present, exact historical canonical |
| Plus-sign tag routes | `200` after explicit allowlisted handler fix |
| Unapproved tag | `404` |
| `/cart` | `404`; deliberately excluded |
| Three rejected articles | `404`; deliberately excluded |
| `/time-card` anonymous proxy | Previously validated `200`, robots header/meta, no-store, sitemap exclusion |

## Origin throttling finding

Squarespace began returning `429 Too Many Requests` after a burst of exact-path checks. The application correctly passed that failure through for public external rewrites and returns `429` from the allowlisted tag handler. This is not safe to ignore: a cutover continuity layer must not collapse during crawler bursts or validation crawls.

Required resolution options include obtaining a suitable Squarespace origin/rate-limit arrangement, confirming Vercel caching behavior with a hosted preview, or capturing approved content in the rebuild instead of depending on a long-lived proxy. Do not attempt to evade origin protections with rotating addresses or aggressive retries.

## Existing Vercel preview

GitHub deployment metadata shows a successful Vercel Preview deployment for commit `e23a6f9`:

```text
https://relief-plus-website-q4cph9urj-relief-plus.vercel.app
```

The preview is protected by Vercel SSO. Anonymous requests to `/`, `/time-card`, and a legacy path all return a `302` to Vercel authentication with `no-store` and `X-Robots-Tag: noindex`. This is appropriate preview protection, but it prevents unauthenticated application validation.

The Phase 10C changes are uncommitted, so they are not present in that deployment. The workspace has no `.vercel` project link, Vercel CLI installation, or local Vercel credentials; no new deployment was attempted.

## Authorized acceptance checklist

After a Phase 10C checkpoint creates a new protected preview and the two preview environment variables are set, an authorized owner should verify:

1. Homepage and representative public routes remain Next.js pages.
2. All 23 exact continuity URLs return their expected legacy pages and exact canonicals.
3. Excluded and arbitrary paths remain `404`.
4. Repeated crawl requests do not produce `429` or stale/error content.
5. `/time-card` returns `200`, exact public canonical, `noindex, nofollow`, and no-store headers.
6. Staff login, ordinary clock-in/out, refresh, sign-out, missed punches, holidays, adjustments, pay-rate permissions, and authorized deletion work through the preview.
7. An ordinary employee cannot view or modify another employee’s records or administrative data.
8. No employee clock records appear anonymously in HTML, API responses, logs, analytics, or shared caches.
9. Existing totals and recent records match the authoritative live system.
10. Removing either origin variable produces the documented fail-closed behavior.

## Verdict

- **Exact-path implementation:** ready for a protected preview checkpoint.
- **Hosted preview:** not yet tested for Phase 10C because the working tree is uncommitted and preview access/environment configuration requires the authorized Vercel project.
- **Time-card:** anonymous continuity is prepared; staff functional and authorization testing remains pending.
- **Production cutover:** not ready. Origin throttling and the remaining data/owner decisions must be resolved first.

