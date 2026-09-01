# Relief Plus Phase 8 Site Audit

Audit date: September 1, 2026  
Branch reviewed: `website-v1` at `8c72451`  
Scope: audit only; no website code, content, routes, redirects, or design were changed.

## Executive summary

The current rebuild has a strong technical foundation. A clean production webpack build generated 42 indexable content routes plus the expected metadata and error routes. The sampled local production pages scored 99–100 for mobile performance, 100 for desktop performance, 100 for Best Practices, and 100 for Lighthouse SEO. Every sitemap route has a unique title and description, a self-referencing canonical, one H1, crawlable server-rendered content, and syntactically valid JSON-LD.

The site is not launch-ready yet. The most important blockers are seven public internal links to routes that do not exist in this build, including `/blog` and `/time-card`; the latter also conflicts with the prior decision not to promote that private utility publicly. The HIPAA Notice and Good Faith Estimate are owner-approved source content and should be preserved faithfully. The Website Privacy Policy reflects the site’s current functionality and should be revisited if future data-collection integrations are added. The shared header produces two repeatable accessibility failures, and the shared footer does not show the verified clinic name, address, and phone.

There is no field Core Web Vitals data for this build. The excellent numbers below are controlled lab measurements and must not be represented as a real-user Core Web Vitals pass. The public Vercel preview URL was not available in the project, so this audit did not test a deployed preview, production redirects, TLS, host consolidation, edge caching, firewall rules, or live crawler access.

## Phase 8B remediation — September 1, 2026

The approved targeted remediation pass corrected the shared accessibility and local-entity issues without redesigning the site or changing medical content:

- Small functional gold text on cream/light gray now uses `#82601F`; decorative and logo gold remain unchanged. The computed contrast is approximately 5.29:1 on cream and 4.58:1 on the light-gray section.
- The header location line moved from navy at 55% opacity (3.56:1) to 70% opacity. Breadcrumb text made the same targeted change.
- The homepage evidence labels moved from navy at 60% to 70%; its small footer labels moved from white at 45% to 55%; copyright and Staff text moved from white at 40%/25% to 55%.
- The visible header wordmark now supplies the linked logo’s accessible name. The decorative R+ mark remains `aria-hidden`, preventing duplicate brand announcements.
- The shared footer and homepage footer now include the verified Relief Plus name, Lafayette address, click-to-call phone, email, and a natural Lafayette/Carencro/Acadiana service-area statement. MedicalBusiness JSON-LD remains consistent.
- Natural Carencro links were added from `/` and `/contact`; `/chiropractor-carencro-la` is no longer orphaned.
- Representative Home, Chiropractic, About, and Contact Lighthouse runs improved from 96 to 100 accessibility on both mobile and desktop. The prior contrast and label/name failures cleared. Performance remained 99–100; the mobile homepage varied from 100 to 99 with LCP still within the good lab threshold at 2.2 seconds. No meaningful regression was identified.

Intentionally deferred:

- `/blog` and five linked legacy article routes remain linked for Phase 9 restoration. Every exact destination is present in `migration-map.csv` as a preserved legacy URL.
- `/time-card` remains unbuilt and is linked only as the subtle “Staff” utility in the homepage footer. It is not in primary patient navigation; future work must restrict and noindex it.
- Live Vercel/CDN firewall checks, deployed host redirects, Search Console, and real-user Core Web Vitals remain post-deployment work.
- The HIPAA Notice and Good Faith Estimate are **OWNER-APPROVED SOURCE CONTENT; PRESERVE FAITHFULLY**. Phase 8B did not alter their substantive wording.
- The Website Privacy Policy is treated as the operational policy for the site’s current functionality. Review and update it if analytics, forms, cookies, embedded maps, advertising pixels, or other third-party data collection are added later; those absent future integrations do not block the current launch.

## Method and limitations

- Built with `npm run build -- --webpack`; build passed and emitted 49 static routes, including 42 sitemap content URLs.
- Crawled the generated HTML for all 42 sitemap URLs and inspected metadata, headings, links, robots directives, icons, and JSON-LD.
- Ran Lighthouse 13.4.1 against a local Next.js production server for 12 representative pages on both mobile and desktop (24 reports total).
- Inspected source and generated output for responsive images, shared client components, navigation, motion, structured data, NAP, and content patterns.
- Raw Lighthouse files were kept outside the repository in `/private/tmp/relief-plus-lighthouse/`; summarized results are in `site-audit-results.json`.
- The crawl treats routes in the generated sitemap as the indexable corpus. Hash links and telephone links are not broken-page errors.
- No Search Console, CrUX, analytics/RUM, Google Business Profile, backlink, CDN, firewall, or deployed Vercel data was available.
- Automated checks do not replace keyboard, screen-reader, real-device, legal, clinical, or rich-result validation.

## Scorecard (internal project scores)

These are planning scores, not Google/OpenAI ranking claims.

| Category | Score | Strong now | What lowers the score | Three highest-impact improvements |
|---|---:|---|---|---|
| Performance | 96/100 | 99–100 mobile and 100 desktop lab performance; zero CLS; very low TBT | No field data; about 52 KiB estimated unused shared JS on the sampled homepage; small render-blocking CSS | Collect field CWV; narrow client boundaries where practical; retest deployed pages and slower devices |
| Technical SEO | 87/100 | 42/42 sitemap routes have unique metadata, one H1, canonical, indexability, and sitemap inclusion | Seven broken internal destinations; live host/HTTPS behavior unverified; Carencro route is orphaned | Resolve all 404 links; verify one-hop redirects and host consolidation live; add a contextual Carencro link |
| Content Quality | 85/100 | Clear patient-facing purpose, conservative clinical language, useful condition depth | No visible page-level authors/reviewers or review dates; many pages share a strong but recognizable template; limited external clinical sourcing | Establish clinical reviewer workflow; add verified authorship/review signals; selectively deepen differentiating evidence and clinic-specific context |
| Local SEO | 82/100 | Verified NAP is consistent between contact content and MedicalBusiness schema; natural Lafayette/Carencro/Acadiana language | Shared footer omits NAP; Carencro page has no internal authority; live GBP/entity alignment unverified | Put verified NAP in shared footer; link naturally to Carencro page; reconcile site, GBP, citations, and `sameAs` after verification |
| Structured Data | 90/100 | Valid JSON syntax; coherent MedicalBusiness identity; relevant Service, MedicalWebPage, MedicalCondition, Breadcrumb, Person, FAQ, and Collection types; no fabricated ratings | No live Rich Results Test/Schema Validator run; entity could be enriched only after verified image/social/profile data; legal pages intentionally have only root entity | Validate deployed templates; add only verified `sameAs`/image/geo data; monitor Search Console rich-result reports |
| Accessibility | 88/100 | Lighthouse 96; semantic headings; reduced-motion handling; no automated tap-target failures | Shared low-contrast microcopy/eyebrows; logo link accessible name does not contain visible label; full manual keyboard/screen-reader testing outstanding | Correct contrast tokens; align logo accessible name with visible text; conduct manual keyboard, menu, carousel, and screen-reader QA |
| Google Search Readiness | 86/100 | Crawlable SSR HTML, clear purposes, preserved URLs, sitemap, canonical strategy, strong lab page experience | Broken links; missing page-level clinical attribution; field performance and Search Console unknown | Remove launch-blocking 404s; complete clinical review governance; launch verification in Search Console and field monitoring |
| ChatGPT Search Readiness | 88/100 | OAI-SearchBot is effectively allowed; clear clinic/practitioner/service/condition entities; semantic server-rendered text | Edge/firewall access unverified; broken links; limited source and reviewer attribution | Verify crawler access live; strengthen factual attribution and reviewer context; repair internal graph |

## 1. Lighthouse and performance

### Results

| Page | Mobile P/A/BP/SEO | Mobile FCP | Mobile LCP | Mobile TBT | Mobile CLS | Mobile SI | Desktop P/A/BP/SEO | Desktop FCP | Desktop LCP | Desktop TBT | Desktop CLS | Desktop SI |
|---|---|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|
| Home | 100/96/100/100 | 0.8s | 1.7s | 8ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Chiropractic | 100/96/100/100 | 0.8s | 1.5s | 8ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Physical Therapy | 100/96/100/100 | 0.8s | 1.9s | 9ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Regenerative Medicine | 99/96/100/100 | 0.9s | 2.0s | 7ms | 0 | 0.9s | 100/96/100/100 | 0.2s | 0.5s | 0ms | 0 | 0.2s |
| Dry Needling | 100/96/100/100 | 0.8s | 1.7s | 7ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Shockwave | 100/96/100/100 | 0.8s | 1.9s | 6ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Knee Osteoarthritis | 100/96/100/100 | 0.9s | 1.7s | 8ms | 0 | 0.9s | 100/96/100/100 | 0.2s | 0.5s | 0ms | 0 | 0.2s |
| TMJ | 100/96/100/100 | 0.9s | 1.8s | 7ms | 0 | 0.9s | 100/96/100/100 | 0.2s | 0.5s | 0ms | 0 | 0.2s |
| Car Accident Injuries | 99/96/100/100 | 0.9s | 2.0s | 6ms | 0 | 0.9s | 100/96/100/100 | 0.2s | 0.5s | 0ms | 0 | 0.2s |
| About | 100/96/100/100 | 0.8s | 1.7s | 5ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Contact | 100/96/100/100 | 0.8s | 1.7s | 5ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |
| Services | 100/96/100/100 | 0.8s | 1.9s | 7ms | 0 | 0.8s | 100/96/100/100 | 0.2s | 0.4s | 0ms | 0 | 0.2s |

Values are rounded from the JSON results. Lighthouse does not provide a meaningful lab INP measurement; TBT was 0–9 ms and is only a lab responsiveness proxy, not INP.

### Representative LCP elements

- Homepage: the hero introduction paragraph, not the hero image.
- Contact: the hero introduction paragraph.
- About, chiropractic, physical therapy, regenerative medicine, dry needling, shockwave, knee osteoarthritis, TMJ, car accident injuries, and services: the page H1.

### Asset and runtime findings

- The homepage keeps `relief-plus-hero-wide.webp`; it is about 40 KiB and is not the measured LCP element. It is delivered through `next/image` with responsive behavior. No image-related Lighthouse failure appeared.
- App icons are small local assets and are recognized in generated metadata.
- No remote webfont requests were observed. The system serif/sans stacks do not create font-download blocking.
- The shared reveal logic uses `IntersectionObserver`, honors reduced-motion preference, and caused no layout shift. It did not create meaningful TBT.
- The shared responsive navigation is a client component. Automated audits found no meaningful main-thread blocking or tap-target failure, but its accessible labeling needs repair.
- Lighthouse estimated about 52 KiB of unused JavaScript in two shared Next chunks on the mobile homepage and about 12 KiB of legacy-JavaScript savings. This is a P2 optimization, not a launch blocker, given the measured TBT and scores.
- One small Next CSS resource (about 7 KiB transferred) was identified as render-blocking, with an estimated 150 ms opportunity. It is not currently harming the measured LCP target.
- No evidence of excessive hydration, large media payloads, or layout instability was found in the local lab run.

## 2. Core Web Vitals

The lab sample is comfortably within the recommended LCP and CLS thresholds: mobile LCP ranged from 1.5–2.0 seconds and CLS was 0 on every run. INP cannot be established from Lighthouse. Google’s current thresholds are LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1 at the 75th percentile of real visits ([web.dev Core Web Vitals](https://web.dev/articles/vitals)).

Status: **strong lab indication, no field pass claim**. After deployment, collect CrUX/Search Console data and optionally first-party RUM for at least LCP, INP, CLS, page type, device class, and connection quality.

## 3. Full technical SEO crawl

### What passed across all 42 built content routes

- All are in the generated sitemap and emit index/follow behavior.
- All have a non-empty title, meta description, self-referencing absolute canonical, Open Graph title/description/url, and Twitter card/title/description.
- Titles and descriptions are unique across the corpus.
- Every route has exactly one H1; no heading-level skips were detected.
- Canonicals consistently use `https://www.myreliefplus.com` and no trailing slash, except the root canonical naturally resolves to the host root.
- Generated HTML contains crawlable links and primary content without requiring client interaction.
- `favicon.ico`, `icon.png`, and `apple-icon.png` are present in root App Router metadata and inherited by sampled routes.
- No duplicate canonical pages, redirect loops, or chains exist in the local route/config model.

### Problems by severity

#### CRITICAL

None detected in the generated corpus. This does not supersede the P0 launch blockers below, which are operational/content approval issues rather than a catastrophic crawl failure.

#### HIGH

| URL / source | Problem |
|---|---|
| `/` | Links to unbuilt `/blog` and `/time-card`. `/time-card` is explicitly not intended for public promotion and should eventually be noindexed/restricted. |
| `/tmj-treatment-lafayette` | Links to two unbuilt legacy articles: `/blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la` and `/blog/treating-temporomandibular-joint-dysfunction-with-conservative-care`. |
| `/frozen-shoulder-lafayette` | Links to unbuilt `/blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion`. |
| `/tennis-elbow-lafayette` | Links to unbuilt `/blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus` and `/blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1`. |

#### MEDIUM

| URL / source | Problem |
|---|---|
| `/chiropractor-carencro-la` | Orphaned in the crawl: sitemap-listed but receives zero internal links. This weakens discovery, authority flow, and the legitimacy of the Carencro strategy. |
| `/knee-osteoarthritis-lafayette`, `/tmj-treatment-lafayette`, `/tennis-elbow-lafayette`, `/si-joint-pain-lafayette` | Each receives only two internal links in the generated crawl. Add genuinely relevant contextual links rather than sitewide keyword links. |
| Sitewide metadata | Open Graph/Twitter text is complete, but no explicit social-sharing image is defined. Social platforms may choose an unpredictable preview image. |
| Deployed host, all URLs | HTTP→HTTPS, non-www→www, trailing-slash edge behavior, deployed status codes, cache headers, Vercel preview, and firewall behavior were not testable locally. |

#### LOW

| URL / source | Problem |
|---|---|
| All treatment/condition families | Layout and explanatory structure are intentionally reusable and recognizable. No duplicate titles/descriptions were found, but selective clinic-specific examples and reviewer attribution would reduce perceived templating. |

### Approved redirect registry

Source inspection confirms only the four approved permanent redirects are configured, each directly to its intended final route:

- `/hippa-privacy` → `/hipaa-notice-of-privacy-practices`
- `/privacy-policy-3` → `/good-faith-estimate`
- `/faqs-1` → `/faq-lafayette`
- `/new-dropdown` → `/chiropractic-adjustments-lafayette`

Because the deployed environment was unavailable, their live HTTP status and one-hop behavior require post-deployment confirmation.

## 4. Structured data

All JSON-LD blocks parsed successfully across the 42-route crawl. The implementation consistently anchors the clinic to `https://www.myreliefplus.com/#medical-business`, and page-specific entities refer back to that provider. No `aggregateRating`, invented review score, award, or unsupported medical credential was found.

Implemented types found:

- `MedicalBusiness`: sitewide clinic identity with verified project NAP, hours, and service areas.
- `Service`: pillars, treatments, and the Carencro service page.
- `MedicalWebPage` with `MedicalCondition`: condition pages.
- `BreadcrumbList`: information, service, treatment, condition, and collection pages.
- `Person`: three named team members and their currently supplied roles.
- `FAQPage`: visible FAQ content.
- `CollectionPage`: conditions hub.

The repeated sitewide MedicalBusiness node is not a conflict because every copy uses the same stable `@id`. Page-specific schema is additive. The visible content generally supports the marked-up entities. Google notes that valid structured data enables eligibility but does not guarantee a rich result, and markup must represent visible, non-misleading content ([Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)).

Recommendations:

- Validate representative deployed URLs with Google Rich Results Test and Schema.org Validator, then monitor Search Console.
- Add `image`, `logo`, `sameAs`, geo coordinates, and external profile identifiers only after the owner verifies exact URLs/assets/data.
- Keep ratings absent until a compliant, visible, source-backed implementation exists.
- Do not add schema solely to chase a rich result unsupported by Google.

## 5. Local SEO

Verified project NAP:

> Relief Plus  
> 112 Arabian Dr.  
> Lafayette, LA 70507  
> 337-565-4200

The contact page and MedicalBusiness schema use the legitimate Lafayette address and matching phone. Lafayette, Carencro, and Acadiana appear naturally in the clinic description, service-area schema, metadata, and relevant content. The Carencro page explicitly says it serves Carencro rather than pretending the clinic has a Carencro address; its content is distinct enough to function as a legitimate service-area page, not an address-spoofing doorway page.

Gaps:

- The shared footer shows the three pillars but not the verified address or phone. Add the verified NAP and a contact link without changing the Lafayette address.
- The Carencro page is orphaned. Add one or two natural links from the contact/about/appropriate location copy, and consider a restrained homepage service-area link.
- The Carencro page would benefit from practical, verified travel/service-area context; do not invent landmarks, travel times, or a Carencro office.
- After launch, reconcile exact name/address/phone/hours with Google Business Profile and major citations. Confirm the split lunch hours are correct before launch.
- Add verified Google Business Profile and official social URLs to `sameAs` only after the owner supplies them.

## 6. Google Search readiness and E-E-A-T review

The rebuild aligns well with Google’s technical baseline: crawlable links, semantic server-rendered content, descriptive titles/H1s, explicit canonicals, and a sitemap. Google’s published guidance prioritizes helpful, reliable, people-first material and does not guarantee crawl, indexing, or ranking simply because technical requirements are met ([Search Essentials](https://developers.google.com/search/docs/essentials), [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

Strengths:

- Clear clinic identity, purpose, three-pillar approach, location, contact information, and named practitioners.
- Condition pages explain examination, uncertainty, red flags, alternatives, and care pathways without guaranteed outcomes.
- Regenerative/cellular content is unusually transparent about evidence and regulatory uncertainty.
- Internal links create useful pillar→treatment→condition relationships, aside from the identified gaps.
- No obvious keyword stuffing or duplicate title/description cannibalization was detected.

Trust gaps:

- Clinical pages do not visibly identify an author, clinical reviewer, last-reviewed date, or editorial standard.
- Sources are present in treatment education, but source density and attribution vary across clinical pages.
- Practitioner pages identify roles, but future additions must remain grounded in verified biographies, licenses, scope, and credentials.
- The HIPAA Notice and Good Faith Estimate use owner-approved specialist source content and should not be casually rewritten. The Website Privacy Policy matches the current site’s limited data-collection functionality and needs revision if that functionality changes.
- The closely related broad pages (for example knee pain vs knee osteoarthritis, shoulder pain vs rotator cuff pain/frozen shoulder, hip pain vs hip bursitis, tendonitis vs named tendinopathies) need query and Search Console monitoring after migration. They have differentiated intent now, but could cannibalize if future copy becomes generic.

Recommended author/reviewer standard:

1. Assign every clinical page/article a verified named author and, where appropriate, a separate qualified clinical reviewer.
2. Display the person’s verified role and link to the team biography; never infer credentials or licensure.
3. Add “last clinically reviewed” only when a real review occurred, with an internal review record.
4. Cite primary guidelines, systematic reviews, government/regulatory sources, and professional bodies near material claims.
5. Separate general education from individualized medical advice and maintain calm escalation language.
6. Schedule review intervals by risk: regulatory/treatment content more frequently than stable anatomy/condition education.

## 7. ChatGPT Search and AI discoverability

The generated `robots.txt` uses `User-agent: *` with `Allow: /`; therefore OAI-SearchBot is effectively permitted without a separate rule. OpenAI’s current publisher guidance identifies OAI-SearchBot as the crawler used to surface sites in ChatGPT search, distinguishes it from GPTBot’s training purpose, and notes that inclusion is not guaranteed ([OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)).

Local application rules do not block OpenAI. The live Vercel/CDN firewall and host-level allowlist cannot be verified from this workspace; after deployment, confirm that OpenAI’s published search crawler IP ranges are not blocked and inspect logs for successful requests. Do not add `llms.txt` or claim ranking benefit without official evidence.

AI-readable strengths include semantic HTML, descriptive headings, server-rendered factual summaries, named practitioners, explicit clinic/service-area identity, clear service-condition relationships, conservative claims, and accessible link text. Broken links, uneven citations, absent page-level reviewers, and the header accessibility defect reduce machine and human clarity.

## 8. Internal-link authority flow

Current architecture is logically organized:

`Home → pillars/services/conditions → treatment and diagnosis pages → related services/conditions`

The services and conditions hubs provide broad discovery, and shared navigation keeps the three pillars prominent. There is no evidence of an excessive sitewide link count. The homepage contains many links, but they are grouped by user task and remain relevant.

Priority improvements:

- Remove or replace the public `/time-card` link; do not use the main site to confer authority on an internal utility.
- Build/restore approved blog URLs before retaining their contextual links, or temporarily remove links without redirecting valuable legacy URLs casually.
- Link `/chiropractor-carencro-la` naturally from `/contact`, `/about`, or verified service-area copy.
- Add relevant contextual links to the four low-inbound diagnosis pages; avoid stuffing every condition into global navigation.
- When the blog is rebuilt, link articles bidirectionally: article→relevant clinical page and clinical page→high-value educational article where it genuinely helps.

## 9. Mobile UX and accessibility

Lighthouse’s mobile emulation found no horizontal-overflow, viewport, tap-target, image-aspect-ratio, heading-order, or alt-text failure on the 12 sampled pages. Hero images did not cause CLS, and the text-based LCP indicates the current crop is not delaying primary content. Cards and long content reflow into single-column layouts; the mobile menu exposes the major desktop destinations.

The following still require manual checks on real/simulated 375, 390, and 430 px viewports: menu open/close and focus return; dropdown keyboard behavior; review carousel announcements and controls; legal-page reading flow; long H1 wrapping; telephone CTA reachability; focus visibility against navy/green/gold surfaces; VoiceOver/TalkBack landmarks; and zoom to 200–400%.

Automated accessibility defects repeated on all 24 Lighthouse runs:

1. **Contrast:** small header location text using navy at 55% opacity on cream measured about 3.56:1; gold eyebrow text on cream measured about 3.92:1; some muted copy was near 4.15:1. Normal small text needs at least 4.5:1 under WCAG AA.
2. **Accessible name:** the homepage/logo link visibly contains “R + Relief + Lafayette · Carencro,” while its `aria-label` is “Relief Plus home.” Because the accessible name does not contain the visible label, Lighthouse flags label-content-name mismatch sitewide.

Reduced motion is respected. No automated issue was found for missing alt text, heading order, or touch-target sizing. Automated success is not a substitute for the manual QA listed above.

## 10. Prioritized fix list

### P0 — must fix before launch

| Affected URL/file | Recommendation | Expected benefit | Risk | Difficulty |
|---|---|---|---|---|
| `/`, `/tmj-treatment-lafayette`, `/frozen-shoulder-lafayette`, `/tennis-elbow-lafayette`; source page/components and blog routes | Resolve all seven links to unbuilt destinations. Preserve valuable blog URLs by building them or making an approved migration decision; remove the public `/time-card` promotion and restrict/noindex that utility when built. | Eliminates user/crawler 404 paths and protects preserved URL strategy | Medium: careless URL changes can lose SEO equity | Medium |
| Deployed domain/Vercel | Verify every sitemap URL, four redirects, error routes, HTTPS, www consolidation, canonical response, robots, sitemap, icons, and CDN/firewall behavior on the actual deployment. | Prevents environment-only crawl/index failures | Low if audit-only; medium if edge config changes | Medium |

### P1 — high value before launch

| Affected URL/file | Recommendation | Expected benefit | Risk | Difficulty |
|---|---|---|---|---|
| `app/components/SiteHeader.tsx` and shared color tokens/classes | Fix low contrast and make the logo-link accessible name include the visible label; manually test keyboard/menu focus. | Raises accessibility, navigation clarity, and Lighthouse score | Low; preserve visual palette while adjusting contrast | Low–Medium |
| `app/components/SiteFooter.tsx` | Add verified clinic name, Lafayette address, and phone; keep Carencro as service area, not address. | Stronger NAP consistency, local trust, and conversion | Low if verified data is copied exactly | Low |
| `/chiropractor-carencro-la` plus contextually relevant pages | Add natural internal discovery and verified service-area context. | Removes orphan status and strengthens legitimate Carencro relevance | Medium if copy drifts toward doorway/location stuffing | Low–Medium |
| All clinical pages and `/team` | Implement verified author/clinical-review attribution and review governance. | Stronger health-content trust and accountability | Medium: incorrect credentials/dates would be harmful | Medium |
| Deployed site/Search Console/CrUX | Establish Search Console, submit sitemap, inspect priority URLs, and collect field CWV/RUM. | Confirms real indexability and user experience | Low | Medium |

### P2 — valuable refinement

| Affected URL/file | Recommendation | Expected benefit | Risk | Difficulty |
|---|---|---|---|---|
| Root/page metadata | Add one verified, appropriately sized default social-sharing image and page-specific images only where useful. | More predictable social previews and entity presentation | Low; image crop/claims must be accurate | Low–Medium |
| Shared client components/chunks | Profile the two shared chunks and narrow client boundaries if savings persist in deployed traces; preserve menu, carousel, and reveal behavior. | Modest transfer/parse reduction | Medium: over-optimization can break interaction | Medium |
| Clinical content families | Add selective primary-source citations, clinic-specific decision context, and clearly differentiated intent; monitor knee/shoulder/hip/tendinopathy query overlap. | Better trust, usefulness, and cannibalization control | Medium: medical/editorial review needed | Medium–High |
| Low-inbound condition pages | Add a few contextually relevant links to knee osteoarthritis, TMJ, tennis elbow, and SI joint pain. | Better crawl paths and authority distribution | Low | Low |
| MedicalBusiness entity | Add only owner-verified logo/image, GBP/social `sameAs`, and geo data after launch validation. | Stronger entity reconciliation | Medium if unverified or inconsistent | Low |

### P3 — optional polish

| Affected URL/file | Recommendation | Expected benefit | Risk | Difficulty |
|---|---|---|---|---|
| CSS delivery | Recheck the small render-blocking stylesheet after deployment before considering critical-CSS work. | Potential small paint improvement | Medium: complexity can outweigh ~150 ms lab opportunity | Medium |
| Mobile pages | Run a documented real-device matrix at 375/390/430 px, 200–400% zoom, VoiceOver, and TalkBack. | Finds interaction issues automation misses | None for testing | Medium |
| Analytics/editorial operations | Create dashboards for 404s, redirect hits, indexed pages, CWV, conversions, and page-level review dates. | Sustains quality after launch | Low; privacy/consent configuration must be correct | Medium |

## Launch verification checklist

1. Complete P0 items and rerun build, lint, `git diff --check`, full crawl, and the 24-page Lighthouse matrix.
2. Test the deployed canonical host with HTTP and non-www variants; confirm one redirect hop to HTTPS www.
3. Confirm all four approved legacy redirects return a permanent status and land on 200 indexable canonical pages.
4. Fetch `robots.txt` as Googlebot and OAI-SearchBot; verify CDN/firewall logs and published crawler IP access.
5. Submit the sitemap in Google Search Console and inspect the homepage, pillars, local page, hubs, representative treatments/conditions, and legal pages.
6. Run Google Rich Results Test and Schema.org Validator on each page template.
7. Verify icon/social previews, mobile menus, carousel, forms/phone links, and 404 behavior on the live deployment.
8. Begin field CWV and conversion monitoring; do not claim a field pass until representative 75th-percentile data exists.
