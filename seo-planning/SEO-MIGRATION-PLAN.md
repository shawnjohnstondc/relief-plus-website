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
