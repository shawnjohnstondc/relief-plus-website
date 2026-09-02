# Relief Plus Phase 10 Pre-Launch Report

Audit date: September 1, 2026  
Branch: `website-v1` at `dcb1f10`  
Environment: local Next.js 16.3.3 production webpack build  

## A. Executive summary

The rebuilt public application is technically strong: the production build passes, all 90 intended sitemap URLs return `200`, metadata and structured data validate, every route has internal discovery, all 47 restored articles pass, all four approved redirects are one-hop `301 → 200`, mobile layouts pass automated checks, and Lighthouse remains excellent.

The migration as a whole is not ready for DNS cutover. Of the 117 original crawl URLs, 89 currently have launch-ready behavior and 27 public legacy URLs still require an approved response or legacy-origin preservation. Phase 10B prepared an environment-gated `/time-card` continuity proxy, but authorized functional, authorization, RLS, and record-continuity testing remains required.

Phase 10C prepared preview-only exact-path continuity for 23 of the 27 public unresolved URLs. The registry excludes `/cart` and the three owner-rejected articles, uses no wildcard, and remains disabled unless `LEGACY_PUBLIC_ORIGIN` is configured. Local testing found a Squarespace `429` burst limit, so this mechanism is not yet approved for production traffic.

## B. Public-website verdict

# **NOT READY FOR PUBLIC-SITE CUTOVER**

This verdict reflects unresolved legacy URL behavior and cutover routing—not a defect in the 90-page public application. Changing DNS now would implicitly retire unresolved legacy URLs and break the staff time clock.

## C. `/time-card` verdict

**SEPARATE STAFF APPLICATION — CONTINUITY PREPARED; AUTHORIZED ACCEPTANCE TEST PENDING.**

The live Squarespace page contains a client-side Supabase application with password authentication, time-entry/pay-rate data access, and administrative procedures. The rebuild now has a narrow server route that proxies anonymous legacy HTML from the verified Squarespace system origin only when `LEGACY_TIMECARD_ORIGIN` is configured. It contains no credentials, database access, backend schema, RLS policies, or historical data. See `TIME-CARD-MIGRATION-PLAN.md`.

## D. P0 launch blockers

1. **Legacy URL dispositions:** 27 public legacy URLs would currently return an unplanned `404` after cutover:
   - 11 data-gated consolidation candidates awaiting Search Console/backlink and owner approval.
   - 3 owner-rejected articles awaiting a data-informed redirect-or-retirement decision.
   - 2 approved potential future restorations: InvisaRED/LipoLaser education and acupuncture/vertigo education.
   - 1 preserved InvisaRED service URL, `/invisared-weight-loss-lafayette`, not yet built.
   - 7 blog tag archives plus `/blog/team` and `/blog/tag/team` awaiting data review.
   - `/cart`, whose retirement/noindex decision remains unapproved.
   Phase 10C can temporarily preserve 23 of these exact paths in a configured preview, but it does not resolve their final migration decisions and has not passed origin-capacity testing.
2. **Staff utility acceptance:** `/time-card` returns the legacy application with `200` when the verified origin is configured and fails closed with `503` when it is absent. Before DNS changes, an authorized user must validate authentication, ordinary and administrative actions, permissions/RLS, sessions, and record continuity through a preview deployment. The inherited legacy HTML still exposes four staff account identifiers anonymously.
3. **Cutover environment not verified:** the production Vercel project, environment configuration, stable legacy origin, domain attachment, HTTPS/canonical-host behavior, CDN/firewall behavior, and rollback controls have not been tested because deployment and DNS changes were out of scope.

Resolving P0 does not require implementing the 11 consolidation redirects prematurely. A stable legacy-origin fallback can preserve those responses until data decisions are approved.

## E. P1 fixes before launch

- Obtain Search Console landing-page and link data plus an external backlink export for all held URLs.
- Confirm whether `/cart` has any operational, traffic, or backlink value.
- Verify the InvisaRED device/service, intended offering, evidence language, and exact role before rebuilding its preserved service URL.
- Complete authorized Supabase/RLS/security and record-continuity review for `/time-card`.
- Conduct final manual keyboard, VoiceOver/TalkBack, and real-device checks. Automated accessibility passed, but automation cannot verify the full experience.
- Re-run the crawl and redirect matrix against the actual production deployment before DNS cutover.

## F. P2 and P3 improvements

### P2

- Add a verified default Open Graph sharing image if predictable social previews are desired.
- Establish verified clinical-review attribution and review-date governance for health content.
- Review small inline/footer links on real touch devices; Lighthouse reported no tap-target failure, but a conservative geometry heuristic found some text links under 24 px high.
- Collect real-user Core Web Vitals after launch; Lighthouse is lab data only.

### P3

- Consider further client-bundle narrowing only if field data identifies a real problem. Do not trade branding or functionality for a cosmetic Lighthouse 100.

## G. Full URL migration status

`FINAL-URL-VALIDATION.csv` contains exactly 117 rows—one for every original crawl URL.

| Classification | Count | Current launch state |
|---|---:|---|
| Validated preserved/parameter/redirect behavior | 89 | Ready |
| Data/owner-gated consolidations or rejected articles | 14 | Pending |
| Taxonomy/team routes awaiting data review | 9 | Pending |
| Required preserved/future-restored pages not built | 3 | Not ready |
| `/cart` owner decision | 1 | Pending |
| `/time-card` protected utility | 1 | Continuity prepared; authorized acceptance pending |

The four approved redirects passed:

| Source | Destination | Result |
|---|---|---|
| `/hippa-privacy` | `/hipaa-notice-of-privacy-practices` | `301 → 200`, one hop |
| `/privacy-policy-3` | `/good-faith-estimate` | `301 → 200`, one hop |
| `/faqs-1` | `/faq-lafayette` | `301 → 200`, one hop |
| `/new-dropdown` | `/chiropractic-adjustments-lafayette` | `301 → 200`, one hop |

## H. Production crawl and performance

### Crawl

- Sitemap URLs: 90
- Reachable public HTML pages: 90
- Public broken links: 0
- Separate utility route: `/time-card` returns `200` through the configured legacy proxy, or fail-closed `503` when unconfigured; it remains outside the public sitemap corpus.
- Orphan sitemap routes: 0
- Missing or duplicate required metadata detected: 0
- H1 or heading-hierarchy failures detected: 0
- Unexpected `noindex`: 0
- Schema parse errors: 0
- Icons: `favicon.ico`, `icon.png`, and `apple-icon.png` all return `200`

### Lighthouse

Ten representative page types were tested on mobile and desktop: homepage, Chiropractic, Physical Therapy, Regenerative Medicine, Dry Needling, Ozone, a long condition page, blog hub, article, and Contact.

| Device | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Mobile | 98–100 | 100 | 100 | 100 | 1.7–2.5 s | 10–20 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.4–0.6 s | 0 ms | 0 |

The small mobile performance variation is not a meaningful regression. No optimization is recommended solely to convert 98 or 99 to 100.

## I. SEO and search readiness

- All intended public pages return `200`, self-canonicalize to `https://www.myreliefplus.com`, are indexable, appear in the sitemap, and have internal links.
- Tag/archive pages and parameter URLs are absent from the sitemap. Blog parameter variants resolve through the canonical `/blog` hub.
- Titles, descriptions, H1s, Open Graph metadata, and semantic server-rendered content passed across the public corpus.
- JSON-LD parsed across the crawl. All 47 articles include `BlogPosting` and exact historical canonicals.
- `robots.txt` allows `User-agent: *`, which includes Googlebot and OAI-SearchBot, and declares the canonical sitemap and host.
- Critical content and links are present in generated HTML; they do not depend on client-side JavaScript for crawler discovery.
- Practitioner names, clinic NAP, service areas, clinical topics, and cited sources remain machine-readable.
- No speculative AI files or ranking hacks were added.

## J. Mobile, accessibility, and local SEO

Automated browser checks covered 375, 390, and 430 px on the homepage, About, Team, blog hub, article, long condition, regenerative, and all three legal templates:

- No horizontal overflow or clipped elements detected.
- Mobile primary menu and Treatments/Conditions submenus opened and exposed the intended links.
- Long headings, cards, footer, practitioner content, and legal content remained within the viewport.
- Scroll-reveal behavior did not create overflow; reduced-motion support remains present.
- Lighthouse accessibility remained 100 on all 20 runs.

NAP is consistent in shared/footer/contact content and MedicalBusiness schema:

```text
Relief Plus
112 Arabian Dr.
Lafayette, LA 70507
(337) 565-4200
```

Lafayette, Carencro, and Acadiana are used as service areas. `/chiropractor-carencro-la` has inbound links from the homepage and Contact page and is not orphaned. The content is framed as service-area access rather than a false Carencro location.

## K. Blog status

- 47 restored legacy articles: all return `200`, use exact historical canonicals, appear in the sitemap, include valid `BlogPosting` schema, and link to relevant landing pages.
- Potential future restores: `/blog/lipolaser-understanding-the-effectiveness-of-targeted-fat-loss` and `/blog/treating-vertigo-with-acupuncture-a-holistic-approach`.
- Data-gated consolidation candidates: 11, listed in `blog-consolidation-plan.csv`.
- Owner-rejected/data-gated articles: 3—prolozone/AC-joint, systemic ozone plus chiropractic, and chiropractic/sleep.

These decisions are not content-build blockers by themselves, but their legacy URLs need a preserved response, approved redirect, or approved retirement before DNS cutover.

## L. Security and privacy review

The public Next.js repository contains no public data APIs, committed environment files, obvious secret/key files, tracked crawl CSV, or detected credential patterns. The `/time-card` route retrieves anonymous legacy HTML only; it does not accept staff credentials or query employee/time records. No employee records or time-card backend code exist in the rebuild.

The live time-card HTML exposes staff account identifiers and a public Supabase client configuration. No privileged service-role marker was detected, but the actual RLS and database authorization model is unknown. This requires authorized review before preserving or migrating the application.

This was a non-intrusive review: no login, form submission, credential testing, record query, or attack testing was performed.

## M. Exact cutover sequence

Do not begin until every P0 item has an owner-approved disposition.

1. Export and review Search Console, analytics, and backlink data for all pending legacy URLs.
2. Approve each row in `FINAL-URL-VALIDATION.csv`.
3. Build the three approved missing preserved/restoration URLs or configure a tested legacy-origin fallback.
4. Decide `/cart` and taxonomy/team URL behavior.
5. Approve and configure any data-supported one-hop redirects; leave unapproved consolidations untouched.
6. Configure the verified stable staff-app origin in a non-production deployment or complete the secured `/time-card` replacement.
7. Verify `/time-card` authentication, authorization, record continuity, `noindex, nofollow`, cache behavior, sitemap exclusion, and rollback.
8. Create the final Git checkpoint; verify the intended commit and clean worktree.
9. Verify the Vercel production project, build command, Node version, environment settings, access controls, and deployment ownership.
10. Deploy to a non-production Vercel URL and repeat build, crawl, schema, redirect, mobile, security, and Lighthouse checks.
11. Configure and test the canonical `www` host, apex-to-`www` redirect, legacy fallback, approved redirects, and `/time-card` routing before public DNS changes.
12. Lower DNS TTL in advance where appropriate and record the existing DNS configuration.
13. Attach `myreliefplus.com` and `www.myreliefplus.com` to the verified Vercel project.
14. Change DNS only during an attended cutover window.
15. Confirm HTTPS certificates and one-hop HTTP/apex/noncanonical-host redirects.
16. Verify homepage, pillars, Contact, legal pages, icons, `robots.txt`, and `sitemap.xml` on the live domain.
17. Verify all 117 legacy rows, the four approved redirects, unresolved legacy fallback behavior, and `/time-card` end to end.
18. Verify canonical URLs and structured data use the public `www` host.
19. Verify Googlebot and OAI-SearchBot are not blocked by Vercel, CDN, or firewall controls.
20. Verify Search Console ownership, submit `https://www.myreliefplus.com/sitemap.xml`, and inspect priority URLs.
21. Monitor server/Vercel logs, Search Console crawl/indexing, `404`s, redirect hits, Core Web Vitals, and conversions daily during the initial launch period.

## N. Rollback plan

Before cutover, preserve the old DNS values, stable Squarespace origin, database backup/export, Vercel deployment identifier, and the last known-good Git commit.

If a major issue appears:

1. Stop content/config changes and record the failing URLs and timestamps.
2. If isolated, roll back the Vercel deployment or route only the affected path to the stable legacy origin.
3. For `/time-card`, immediately restore its tested legacy-origin proxy or prior deployment; do not attempt data repair in the public application.
4. If sitewide, restore the recorded DNS configuration to the old origin.
5. Purge or bypass affected caches and verify HTTPS/host behavior.
6. Re-crawl priority pages, all approved redirects, and `/time-card` after rollback.
7. Reconcile any time entries created during the incident window from authoritative database/audit records.
8. Document the cause and require a new acceptance test before attempting cutover again.
