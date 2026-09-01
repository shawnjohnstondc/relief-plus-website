# Relief Plus SEO Migration Plan

## Purpose

Preserve the organic-search value of the existing Relief Plus site while rebuilding it in Next.js around Chiropractic, Physical Therapy, and Regenerative Medicine. Valuable URLs should remain unchanged whenever practical. Any approved URL change must use a relevant, single-hop 301 redirect.

## Source and scope

- Source crawl: `seo-planning/screaming-frog-current.csv` (local, gitignored)
- Crawl timestamp in source: August 30, 2026
- URLs inventoried: 117
- Indexable 200 responses: 105
- Temporary 302 redirects: 2
- Non-indexable 200 responses: 4
- Robots-blocked responses: 4
- 404 responses: 2
- `app/internal_all.csv` was referenced in the editor context but was not present when this plan was created.
- This is a planning artifact only. No routes or redirects are implemented by this document.

## Migration rules

1. Preserve every valuable indexable URL unless analytics, backlink data, content quality, and business intent support a different decision.
2. Keep the production hostname and HTTPS protocol consistent: `https://www.myreliefplus.com`.
3. Use a one-to-one 301 only when a page has a clearly equivalent replacement. Do not redirect unrelated retired content to the homepage.
4. Avoid redirect chains and loops. Every legacy URL should resolve in one hop.
5. Preserve or deliberately improve each retained page's search intent, primary headings, substantive copy, title, description, canonical, and internal-link context.
6. Keep query-string pagination/filter variants out of the XML sitemap and canonicalize them appropriately.
7. Keep staff and utility URLs out of the index; apply access controls where sensitive.
8. Do not launch until every row in `migration-map.csv` has an approved target and validation result.

## Priority model

- **P0:** launch-critical hubs and primary business/conversion pages.
- **P1:** core service, condition, legal, provider, and high-intent pages.
- **P2:** supporting pages and individual articles.
- **P3:** parameters, utilities, and taxonomy URLs requiring indexation review.

Priority is an implementation sequence, not permission to remove lower-priority URLs.

## Decisions requiring approval

- Rebuild `/conditions-we-treat` as an indexable hub instead of retaining its current temporary redirect to `/back-pain-lafayette`.
- Consolidate `/privacy-policy-3` into `/good-faith-estimate` after confirming the new legal-page naming.
- Consolidate the misspelled `/hippa-privacy` into `/hipaa-notice-of-privacy-practices`.
- Consolidate `/faqs-1` into `/faq-lafayette` only after comparing content, traffic, and backlinks.
- Review whether tag archives deserve preservation, noindexing, or consolidation.
- Determine whether `/cart` and the Invisa-RED content remain part of the future business offering.
- Preserve `/time-card` only as a restricted, noindex staff utility.

## Pre-build work

1. Export Google Search Console landing-page performance for at least the last 16 months.
2. Export GA4 landing-page traffic and conversions for the same period.
3. Export backlinks and referring domains from the available link index.
4. Join those datasets to `migration-map.csv`.
5. Assign an owner and final decision to every row.
6. Capture the current HTML, copy, metadata, structured data, and images for every retained page.
7. Resolve homepage-link slug differences such as `/physical-therapy` versus the existing `/physical-therapy-lafayette` before route creation.

## Build requirements

- Implement retained paths directly where possible.
- Add approved redirects centrally in Next.js configuration or the hosting layer.
- Give every indexable page a unique title, meta description, canonical, H1, and useful body content.
- Add Organization/LocalBusiness, provider, service, breadcrumb, and article schema only where supported by visible content.
- Generate XML sitemap entries only for canonical, indexable 200 URLs.
- Provide a production robots file that allows intended pages and excludes non-public utilities.
- Preserve internal links to canonical destinations rather than relying on redirects.
- Keep the three primary clinical pillars consistent without erasing established condition/service relevance.

## Approved future condition-page architecture

The following routes are **NEW / APPROVED FUTURE CONDITION PAGE** destinations. They were not found as legacy landing-page URLs in the August 30, 2026 crawl and must not receive redirects unless a later backlink, Search Console, or content audit identifies a genuinely equivalent legacy URL. Do not add them to the sitemap until substantive, indexable pages exist.

All eight pages must follow the established Relief Plus condition-page clinical standard: patient-friendly education; individualized examination; conservative functional reasoning about movement, muscular coordination, breathing and trunk control, three-dimensional regional interaction, load tolerance, and task-specific function; calm referral guidance; and treatment selected from findings rather than diagnosis alone. These concepts are clinical reasoning lenses, not proof of causation. Public copy must not imply certification by or affiliation with Janda, DNS, the Prague School, Gary Gray, Gray Institute, or Applied Functional Science without verified owner documentation.

| Recommended order | Approved route | Page role | Known crawl/content overlap | Cannibalization control |
|---:|---|---|---|---|
| 1 | `/knee-osteoarthritis-lafayette` | Diagnosis-specific knee osteoarthritis page | Preserved broad `/knee-pain-lafayette`; blog article `/blog/can-ozone-injections-help-your-knee-osteoarthritis-a-modern-approach-to-pain-management` | Keep the broad knee page symptom/region-led; make this page diagnosis-led and evidence-focused. Preserve the blog as an ozone-specific article and link it contextually rather than duplicating its angle. |
| 2 | `/rotator-cuff-pain-lafayette` | Rotator cuff tendinopathy/tear differential and load-tolerance page | Preserved broad `/shoulder-pain-lafayette`; preserved `/tendonitis-treatment-lafayette`; blog article `/blog/understanding-scapular-dyskinesis-the-hidden-culprit-behind-shoulder-pain` | Keep shoulder pain broad, this page cuff-specific, and the scapular article educational. Avoid claiming scapular movement is the singular cause. |
| 3 | `/tmj-treatment-lafayette` | TMJ/jaw-pain clinical landing page | Two indexable articles: `/blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la` and `/blog/treating-temporomandibular-joint-dysfunction-with-conservative-care`; secondary overlap with neck/headache content | Make the landing page the durable service/condition destination. Keep the articles informational and narrower; review titles, H1s, canonicals, and internal links so they support rather than compete with the landing page. |
| 4 | `/frozen-shoulder-lafayette` | Adhesive capsulitis diagnosis page | Preserved broad `/shoulder-pain-lafayette`; article `/blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion`; tag `/blog/tag/frozen+shoulder` pending taxonomy review | Keep the landing page diagnostic and comprehensive, the blog exercise-focused, and the broad shoulder page regional. Review the tag archive separately before deciding indexation. |
| 5 | `/hip-bursitis-lafayette` | Hip Bursitis / Greater Trochanteric Pain Syndrome page | Preserved broad `/hip-pain-lafayette`; no exact legacy landing page or directly titled blog article found | Explain GTPS and gluteal tendon involvement so the page is narrower than the broad hip page. Link both directions. |
| 6 | `/tennis-elbow-lafayette` | Lateral elbow tendinopathy page | Preserved `/tendonitis-treatment-lafayette`; two articles: `/blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus` and `/blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1` | Make the landing page diagnosis and progressive-loading focused. Keep each article modality-specific, soften outdated claims during rebuild, and point both to the canonical landing page. |
| 7 | `/achilles-tendinopathy-lafayette` | Midportion/insertional Achilles tendinopathy page | Preserved `/tendonitis-treatment-lafayette`; no exact legacy landing page or directly titled blog article found | Differentiate midportion and insertional presentations. Keep the general tendon page broad and link it to this lower-limb diagnosis page. |
| 8 | `/si-joint-pain-lafayette` | SI-region pain and SI-joint differential page | Preserved `/back-pain-lafayette` and `/hip-pain-lafayette`; no exact legacy landing page or directly titled blog article found | Lead with SI-region pain versus confirmed SI-joint pain. Avoid duplicating general back/hip content or claiming the pelvis is “out.” Link to both broad pages where clinically relevant. |

### Approved page-specific scope

- **TMJ / jaw pain:** jaw motion and muscular load, clenching, cervical/thoracic/rib-cage relationships where relevant, breathing and resting jaw position, headache overlap, chewing tolerance, and dental or oral-maxillofacial collaboration. Do not claim jaw realignment.
- **SI joint pain:** SI-region differential, gait, single-leg loading, hip/trunk contribution, rotation, force transfer, transitions, lifting, and conservative pregnancy/postpartum context when supported. Do not claim pelvic misalignment.
- **Frozen shoulder:** active and passive motion loss, movement compensation, daily function, variable natural history, relevant medical associations, and referral/imaging considerations. Do not claim manipulation instantly breaks adhesions.
- **Rotator cuff pain:** tendinopathy versus tear, traumatic versus gradual onset, shoulder/scapular/thoracic contribution, cervical screening, strength, endurance, overhead load, and referral criteria. PRP belongs only in a careful diagnosis/evidence/candidacy discussion.
- **Tennis elbow:** lateral elbow tendinopathy, grip and wrist-extensor demand, work/sport exposure, regional screening, and progressive loading rather than indefinite rest.
- **Achilles tendinopathy:** midportion versus insertional presentation, calf/ankle/foot contribution, gait and running load, load spikes, progressive loading, stretching limitations, and rupture warning signs.
- **Knee osteoarthritis:** imaging versus symptoms and function, strength, walking, stairs, sit-to-stand, hip/ankle contribution, nonjudgmental load management, movement confidence, flare planning, and appropriate orthopedic consultation. Do not promise cartilage regrowth or surgery avoidance.
- **Hip bursitis / GTPS:** explain why lateral hip pain is not always an isolated inflamed bursa; address gluteal tendon and compression sensitivity, walking, stairs, single-leg stance, sleep, lumbar screening, and progressive loading.

### Internal-link and launch requirements

1. Build or finalize the relevant broad regional page before, or in the same release as, its diagnosis-specific child page.
2. Link `/shoulder-pain-lafayette` to frozen shoulder and rotator cuff pain; link both diagnosis pages back to the shoulder page.
3. Link `/knee-pain-lafayette` to knee osteoarthritis and link the diagnosis page back.
4. Link `/hip-pain-lafayette` to Hip Bursitis / GTPS and link the diagnosis page back.
5. Link `/tendonitis-treatment-lafayette` contextually to rotator cuff, tennis elbow, and Achilles tendinopathy without making the broad tendon page a duplicate list of child-page copy.
6. Review every overlapping blog title, H1, primary intent, canonical, and internal-link target before publishing these pages. Preserve valuable articles; do not redirect them merely because a landing page now exists.
7. Use Lafayette in the canonical slug and natural copy; mention Carencro and Acadiana naturally. Do not create duplicate Carencro pages.
8. Add sitemap entries only when each page is complete, canonical, indexable, and returns 200.

No slug changes are recommended before implementation. `/hip-bursitis-lafayette` is concise and recognizable; the public H1 and copy should pair it with “Greater Trochanteric Pain Syndrome” for clinical accuracy.

## Pre-launch validation

- Crawl the staging build with JavaScript rendering enabled.
- Confirm every mapped retained URL returns 200 and the intended canonical.
- Confirm every approved legacy redirect returns one 301 hop to a relevant 200 page.
- Confirm there are no internal 3xx, 4xx, 5xx, orphan pages, redirect chains, or canonical conflicts.
- Compare titles, descriptions, H1s, word counts, indexability, structured data, and internal-link counts against the baseline.
- Validate sitemap and robots behavior.
- Run lint, production build, accessibility checks, Core Web Vitals checks, and structured-data validation.
- Keep staging blocked from indexing until production cutover.

## Launch and monitoring

1. Take a final production crawl immediately before cutover.
2. Deploy pages, redirects, sitemap, robots, and canonicals together.
3. Verify top P0/P1 URLs manually after launch.
4. Submit the new sitemap in Search Console.
5. Monitor indexing, clicks, impressions, rankings, conversions, crawl errors, and server logs daily for the first week and weekly for at least eight weeks.
6. Repair unexpected 404s with relevant direct mappings; do not use blanket homepage redirects.
7. Retain redirects for the long term.

## Working with the migration map

`migration-map.csv` is deliberately conservative. “Proposed” means the route decision still requires approval. Add analytics, backlink, owner, implementation, and validation columns when those datasets become available; do not treat this first-pass map as launch authorization.
