# Relief Plus Final Launch Readiness

Audit date: September 2, 2026  
Branch: `website-v1`  
Audited checkpoint: `1a9ced8aab59a220f7c91ec23d1a7d29d94b5c34`  
Stable Preview: `https://relief-plus-website-git-website-v1-relief-plus.vercel.app`

## A. Executive summary

The rebuilt public site is technically strong: the final local 92-URL sitemap returns 200, the internal crawl found no broken links or orphan pages, approved redirects are one-hop 301s, structured data parses, all requested photography placements pass mobile and desktop review, and representative Lighthouse results are 99–100. A small 320px long-word overflow found on the Class IV Laser page has been repaired locally without changing the design.

Production cutover should not occur yet. The owner-approved 11 redirects, `/cart` retirement, InvisaRED page, and 320px wrapping fix are implemented locally but have not been checkpointed or Preview-tested. Production time-card infrastructure and secrets do not exist, authenticated time-card acceptance remains outstanding, and domain/DNS evidence has not been reviewed.

**PUBLIC WEBSITE: NOT READY FOR CUTOVER**

**TIME CARD: NOT READY FOR CUTOVER**

These verdicts are cutover gates, not indications of broad rebuild problems.

## B. Public website verdict

### Verified

- All 91 pre-gate sitemap URLs returned HTTP 200 on the immutable Preview deployment; the final local sitemap contains 92 after adding InvisaRED, and all 92 return 200.
- Same-commit local HTML crawl found zero broken internal links, zero orphans, zero metadata defects, and valid JSON-LD on every sitemap page.
- Titles, descriptions, canonicals, Open Graph metadata, single H1s, icons, navigation, footer, and public indexability passed.
- Homepage, all three clinical pillars, supporting treatments, conditions, trust pages, and 47 restored blog articles are reachable.
- The homepage hero, founder content, call-to-schedule placement, condition links, footer, and discreet Staff link passed responsive review.

### Remaining cutover gates

1. Checkpoint and Preview-test the 11 redirects, `/cart` retirement, rebuilt InvisaRED page, and local 320px wrapping fix.
2. Supply current GoDaddy and Squarespace configuration evidence before any DNS plan is executed.

## C. Time-card verdict

### Verified without using private PINs

- Preview `/time-card` returns 200 and renders the initialized three employees plus the non-hourly administrator.
- Anonymous `/time-card/admin` returns 307 to `/time-card`.
- Anonymous `/time-card/admin/export` returns 401.
- Both metadata and `X-Robots-Tag` specify `noindex, nofollow`; responses are private/no-store.
- Staff routes are absent from the sitemap and contain no public MedicalBusiness schema.
- Browser bundles contain no time-card environment-variable names, PostgreSQL URLs, database credentials, PINs, or PIN hashes.
- Source and automated tests cover Argon2id PIN hashing, login throttling/lockout, signed server sessions, role enforcement, employee record scoping, duplicate/open-punch rules, payroll math, effective-dated rates, audit events, and CSV output.
- The session cookie is HttpOnly, Secure, SameSite=Lax, path-scoped to `/time-card`, database-backed, and subject to employee/admin absolute lifetimes plus idle timeout.
- Database migrations enable RLS and revoke table access from `anon` and `authenticated`; application access is server-only.
- Shawn is an `ADMIN`, not an hourly `EMPLOYEE`, and repository payroll queries select employees only.

### Required owner acceptance on Preview

Using private credentials, the owner must test one employee and the administrator: correct login; wrong PIN and lockout; clock in; blocked duplicate clock-in; clock out; blocked clock-out without an open punch; employee-only history; admin clock; rate and effective-date changes; missed time; correction; void with reason; positive and negative adjustments; holiday; period navigation; gross estimate; audit trail; CSV; Back to Relief Plus; separate Sign Out; and phone layouts. Clearly label and then void/remove test payroll records before Production initialization.

### Production gate

Create a separate Production Supabase project. Apply the two approved migrations and privately initialize staff from scratch. Do not promote Preview test data. Configure fresh Production-only database and HMAC secrets in Vercel only after owner acceptance.

## D. P0 blockers

- Final Preview verification of the locally implemented redirects, InvisaRED page, cart retirement, and mobile wrapping fix.
- Authenticated time-card acceptance has not been completed.
- Separate Production time-card database and Vercel Production secrets are not configured.
- Current DNS/nameserver/domain evidence has not been supplied; no safe record-level cutover can be prescribed without it.

## E. P1 fixes

- The 320px Class IV Laser page overflow caused by the long word “Photobiomodulation” is fixed locally with `min-width: 0` and word wrapping in the shared pillar shell. It must be checkpointed and verified on Preview.
- Retired tag/archive routes currently depend on the optional legacy-origin handler and can return 503 when that origin is absent. Replace this temporary continuity behavior with the approved final 410/404 behavior before cutover.
- Remove the public-content dependency on `LEGACY_PUBLIC_ORIGIN` after final redirect/retirement decisions are implemented.

## F. P2 items

- Run Google Rich Results Test and Schema Markup Validator on the final public domain after cutover.
- Validate the production time-card login and a harmless payroll calculation after Production initialization.
- Re-run Search Console coverage and backlink checks after launch; unexpected valuable 404s can be addressed with genuinely relevant redirects.

No P3 items are necessary for launch.

## G. Legacy URL disposition

The authoritative row-level table is `seo-planning/FINAL-LEGACY-DISPOSITION.csv`.

- Keep the 47 restored intentional articles at their exact paths.
- Eleven direct one-hop 301s are now implemented where a stronger retained page/article genuinely matches the old intent.
- Retire the three explicitly rejected articles with 410 (404 is acceptable if a dedicated 410 handler is not implemented); do not preserve their claims.
- Allow the de-prioritized LipoLaser and acupuncture/vertigo articles to return 404 for this launch; they do not block cutover.
- Retire `/blog/team` and eight thin tag archives; keep them out of the sitemap and do not proxy Squarespace.
- `/invisared-weight-loss-lafayette` is rebuilt conservatively at its exact URL; `/cart` is intentionally retired with 410.

Local post-implementation verification confirms all 15 configured redirects (the four earlier approvals plus the 11 final legacy consolidations) return 301, make one hop, and end at a 200 response. The complete new redirect list and destinations are recorded in `FINAL-LEGACY-DISPOSITION.csv`.

### Approved redirects already implemented and verified

| Source | Destination | Result |
|---|---|---|
| `/hippa-privacy` | `/hipaa-notice-of-privacy-practices` | 301, one hop, destination 200 |
| `/privacy-policy-3` | `/good-faith-estimate` | 301, one hop, destination 200 |
| `/faqs-1` | `/faq-lafayette` | 301, one hop, destination 200 |
| `/new-dropdown` | `/chiropractic-adjustments-lafayette` | 301, one hop, destination 200 |

No loop or chain was found.

## H. Performance

Twenty-four representative Lighthouse runs covered the homepage and 11 public page types on mobile and desktop.

| Profile | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile range | 99–100 | 100 | 100 | 100 | 1.65–2.25 s | 7–22 ms | 0 | 191–296 KB |
| Desktop range | 100 | 100 | 100 | 100 | 0.42–0.67 s | 0 ms | 0 | 229–343 KB |

The tested routes included Home, Chiropractic, Physical Therapy, Regenerative Medicine, Class IV Laser, Dry Needling, Ozone, Work Injury, Sports Injuries, Blog, one article, and Contact. The source PNGs are large, but Next Image delivered optimized responsive payloads; no launch-relevant regression or CLS was found. Authenticated time-card Lighthouse remains part of owner acceptance because private credentials were intentionally unavailable to the audit.

## I. SEO and local readiness

- `robots.txt` allows all user agents, including Googlebot and OAI-SearchBot; neither is blocked.
- Sitemap is valid and contains 92 unique canonical public URLs after adding InvisaRED. Staff routes and `/cart` are excluded.
- Canonicals and structured-data URLs consistently use `https://www.myreliefplus.com`.
- No public sitemap page has accidental noindex. Staff routes are explicitly noindexed.
- MedicalBusiness, Service/MedicalWebPage, Breadcrumb, FAQ, CollectionPage, Person, and BlogPosting data parsed during the crawl where applicable.
- Critical content and headings are server-rendered, not client-JavaScript-only.
- Practitioner names, evidence citations, care relationships, and Lafayette/Carencro/Acadiana context are machine-readable.
- NAP is consistent: Relief Plus, 112 Arabian Dr., Lafayette, LA 70507, (337) 565-4200.
- The Carencro page is linked contextually from Contact and the homepage and is not orphaned or repeated as doorway-style navigation.
- No speculative AI-search file or `llms.txt` was added.

## J. Security review

This was a non-intrusive source, configuration, response, and bundle review.

- No tracked `.env`, private key, Supabase credential, service-role key, database URL, PIN, or PIN hash was found.
- Time-card variables are server-only and were absent from `.next/static`.
- Anonymous HTML exposes only the staff names required by the approved name-selector login; it contains no payroll data.
- No public client API directly exposes payroll tables. Authorization is checked server-side for employee and administrator operations.
- Login throttling is 5 failed attempts within 15 minutes followed by a 15-minute lockout.
- Payroll-changing admin operations require a reason and create audit records.
- `npm audit --omit=dev` must remain clean in the final validation run.

## K. Photography QA

All seven approved filenames are used in the intended contexts; no chiropractic image or intermediate substitute is referenced.

| Placement | Result |
|---|---|
| Homepage active-clinic hallway | Correct, intentional section placement, responsive crop passes |
| Homepage consultation | Correct, supports individualized-care/founder story |
| Physical Therapy reformer athlete | Correct subject and equipment remain visible |
| Class IV Laser | Correct final table/eyewear version; treatment area and people remain visible |
| Dry Needling | Correct final shoulder close-up; site and clinician remain visible |
| Ozone and Regenerative Medicine | Correct equipment/preparation image; copy does not describe an injection in progress |
| Work Injury | Correct final construction-worker consultation and spine-model version |

Seventy-two placement/viewport checks (eight placements across nine widths) found no failed image loads, distortion, unsafe crop, inaccurate alt text, horizontal overflow, or CLS. Widths: 320, 375, 390, 393, 414, 430, 768, 1024, and 1440 pixels.

## L. Mobile and homepage QA

- The existing homepage hero remains intact.
- Call to Schedule is above the fold at all six required phone widths.
- Founder consultation and hallway visuals read as supporting content rather than decorative clutter.
- All 11 condition rows are semantic, full-row Next links with at least 44px tap height and destinations returning 200.
- Mobile menu opens without overflow and exposes the important public destinations.
- Footer contains NAP, legal links, email, service area, and discreet Staff → `/time-card`.
- The shared 320px long-word fix produces no layout/design regression across the tested pages and widths.

## M. Production environment requirements

### Recommended architecture

Use a separate Production Supabase project. Preview should remain disposable test infrastructure; historical records do not need migration, and Preview acceptance data should not become payroll history.

### Vercel Production variables (do not add yet)

- `TIME_CARD_DATABASE_URL`: complete Production Supabase Transaction Pooler URI, Production scope only.
- `TIME_CARD_SESSION_HMAC_SECRET`: newly generated Production-only high-entropy value.
- `TIME_CARD_LOGIN_HMAC_SECRET`: a different newly generated Production-only high-entropy value.

Do not copy Preview HMAC values into Production. Apply both migrations to the new Production project, privately initialize the same three hourly employees and non-hourly administrator, and validate RLS/revoked grants before attaching Production. `LEGACY_PUBLIC_ORIGIN` should not be required after the final public legacy dispositions are implemented.

## N. GoDaddy and Squarespace information needed

Before any domain change, the owner should provide screenshots (with account/customer identifiers redacted, but record names/types/targets visible) of:

### GoDaddy

- Domain nameservers.
- Complete DNS record list for `myreliefplus.com`.
- Apex (`@`) A/AAAA records.
- `www` CNAME/A records.
- All MX, TXT, CNAME, and email-verification records.
- Any forwarding configuration.

### Squarespace

- Connected Domains screen.
- Current primary domain.
- Domain forwarding/aliases.
- Any Squarespace-managed DNS or email integrations.

Do not delete or alter MX, TXT, DKIM, SPF, DMARC, or mail-related CNAME records merely because the website moves. Only Vercel-required website-routing records should change.

## O. Exact future cutover sequence

1. Review the locally implemented redirects, InvisaRED page, cart retirement, and 320px fix.
2. Create a clean `website-v1` checkpoint and obtain final Preview approval.
3. Complete private authenticated time-card acceptance on Preview and clean up test payroll records.
4. Create a separate Production Supabase project; apply both migrations and privately initialize staff.
5. Add the three fresh time-card variables to Vercel Production only.
6. Re-run tests, crawl, redirects, security checks, and representative Lighthouse on the final Preview.
7. Review GoDaddy/Squarespace evidence and record the current values for rollback.
8. Merge the approved `website-v1` commit into `main`.
9. Confirm the Vercel Production build succeeds before attaching traffic.
10. Add `myreliefplus.com` and `www.myreliefplus.com` to Vercel and obtain Vercel's current DNS instructions.
11. Update only required GoDaddy website-routing records; preserve all email records.
12. Verify HTTPS and the canonical `www.myreliefplus.com` host behavior.
13. Verify Home, three pillars, representative treatments/conditions, Blog, Contact, and legal pages.
14. Verify native `/time-card`, administrator access, CSV authorization, noindex, and sitemap exclusion.
15. Verify every approved redirect, `robots.txt`, `sitemap.xml`, icons, schema, and NAP on Production.
16. Verify Google Search Console ownership, submit the sitemap, and request indexing for critical URLs.
17. Monitor 404s, redirects, indexing, runtime errors, Core Web Vitals, and time-card operation closely.
18. Keep Squarespace and the legacy time card available during the agreed stabilization window.
19. Retire legacy services only after the owner confirms the new public site and native time card are stable.

## P. Rollback plan

- Preserve screenshots/exports of pre-cutover GoDaddy DNS and keep Squarespace active.
- If the public site has widespread 5xx errors, broken primary navigation, unavailable scheduling information, TLS/domain failure, or major SEO misrouting that cannot be corrected promptly, restore the previous apex/`www` website records to their exact recorded values.
- If a code-only regression occurs, use Vercel's instant rollback/promote function to restore the last verified Production deployment while leaving DNS unchanged.
- If the native time card has authentication, payroll-integrity, or availability problems, direct staff to the preserved legacy time-card process; do not attempt destructive database repair during payroll use.
- Roll back first when patient access, payroll integrity, or domain/email stability is at risk. Minor visual defects should be fixed forward.
- After rollback, verify public site, email DNS, HTTPS, and staff access, document the incident, and resume cutover only after a corrected Preview passes the full checklist.

## Exact next owner action

Review the rebuilt InvisaRED page and the final local validation results, then authorize a clean Preview checkpoint. After that, complete the private Preview time-card acceptance checklist and provide the requested GoDaddy/Squarespace screenshots. No Production, DNS, or Squarespace change should occur before those actions are complete.
