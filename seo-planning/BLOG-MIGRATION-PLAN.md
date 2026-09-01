# Relief Plus Blog Migration and Topical-Authority Plan

Plan date: September 1, 2026

Phase: 9A planning only

Sources: `migration-map.csv`, `SEO-MIGRATION-PLAN.md`, the August 30, 2026 Screaming Frog crawl, the accessible live Relief Plus blog, and the current 42-route rebuild.

## Phase 9E remaining-inventory triage

Phase 9E reconciled the 63 legacy article URLs against the 29 articles restored through Phase 9D. The remaining 34 articles are classified as eight high-priority restores, ten lower-priority restores, seven proposed landing-page consolidations, four proposed article-to-article consolidations, and five owner-review holds. No article is currently recommended for a 410.

The proposed consolidations are planning decisions only. No redirect should be implemented until Search Console landing-page performance, external backlinks, historical organic traffic, and unique source content have been reviewed. The four local-commercial articles remain strong consolidation candidates because their titles and core intent compete directly with current landing pages, but that evidence gate still applies.

Phase 9G owner decisions supersede the earlier hold language. InvisaRED/LipoLaser remains part of the future content strategy, and the acupuncture-for-vertigo article is approved for careful informational restoration. Prolozone for AC-joint injuries, systemic ozone plus chiropractic, and chiropractic-for-sleep are not approved for restoration. Their URLs remain data-gated redirect-versus-retirement decisions because no genuinely equivalent destination currently exists. Details are in `BLOG-REMAINING-TRIAGE.md` and `blog-consolidation-plan.csv`.

### Phase 9G owner decisions

- Preserve `/invisared-weight-loss-lafayette` as a distinct wellness/body-composition route after verifying the exact device, service, intended outcomes, and evidence. Do not force it into the three clinical pillars or characterize it as medical weight-loss treatment.
- Restore `/blog/lipolaser-understanding-the-effectiveness-of-targeted-fat-loss` only after the same device/service verification. Use realistic circumference/body-composition expectations and no guaranteed fat-loss or disease-treatment claims.
- Restore `/blog/treating-vertigo-with-acupuncture-a-holistic-approach` as diagnosis-aware education. Distinguish vertigo from nonspecific dizziness, include medical and neurological referral guidance, and do not claim Relief Plus provides acupuncture until verified.
- Do not restore the prolozone, systemic-ozone, or chiropractic-and-sleep articles. Do not carry their old claims into other pages.
- No automatic redirects are approved. The three rejected URLs require Search Console and backlink review before redirect or retirement.

## Executive summary

The crawl contains **80 blog-related URLs**: one blog hub, 63 article URLs, eight tag URLs, seven parameter/archive variants, and two direct 404 URLs. No blog redirect was present in the crawl.

The library has useful historical breadth, but it should not be bulk-rewritten. The new service and condition pages must own local commercial intent. Blog articles should answer narrower informational questions, demonstrate clinical reasoning, and pass relevant internal authority into those landing pages. Five exact article URLs already linked from rebuilt condition pages are live on the legacy site but absent from the Next.js build; restoring them is the first article priority.

Recommended actions:

| Action | Count |
|---|---:|
| RESTORE | 6 |
| KEEP / LIGHT POLISH | 17 |
| UPGRADE | 34 |
| CONSOLIDATE | 7 |
| NOINDEX / TAXONOMY REVIEW | 16 |
| RETIRE | 0 |
| **Total** | **80** |

Nothing is marked RETIRE yet. Search Console, backlink, traffic, and conversion evidence were not available, so low-relevance content remains an owner-review or upgrade decision rather than being discarded prematurely.

## Important inventory findings

- `/blog` returns 200 and canonicalizes correctly, but its crawl H1 is the newest article title, “Why Your Jaw Hurts,” rather than a stable hub heading. Rebuild it as a real content hub.
- The five condition-linked articles all return 200 on the legacy site with self-canonicals. They are broken only in the new Next.js build and should be restored at their exact URLs.
- Seven parameter URLs are non-indexable archive/filter variants. Some return 200 with `/blog` canonical; others were robots-blocked. They do not belong in the new XML sitemap.
- Eight tag URLs exist. Most contain only 31–34 words and do not justify indexation in their current form.
- `/blog/tag/accupunture` and `/blog/tag/dizzines` are misspelled.
- `/blog/team` and `/blog/tag/team` return 404. Consistent with prior owner direction, both require backlink/Search Console review before redirect or retirement.
- Article lengths are generally 451–811 crawl words, with several promotional or overly certain titles. Word count alone is not the quality criterion.
- All 63 article URLs have titles, H1s, and self-referencing canonicals, but **60 of 63 lack a crawl-visible meta description**. Phase 9B should write unique descriptions that accurately summarize each retained article without repeating landing-page commercial copy.
- Publication dates were not included in the crawl export, but live pages expose date metadata. Preserve those source dates during import and add an Updated date only after substantive revision.

The complete per-URL inventory—including status, indexability, title, H1, meta description, word count, canonical, topic, intent, risk, action, destination, supporting page, priority, and notes—is in `blog-migration-map.csv`.

## Ownership and cannibalization rules

Core landing pages own local commercial queries such as “back pain treatment Lafayette,” “sciatica treatment Lafayette,” and equivalent service or condition terms. Articles should own a distinct question, mechanism, comparison, symptom behavior, exercise, safety, or decision-support intent.

### Recommended consolidations

These are recommendations only. No content, redirect, or URL has been changed.

| Existing article | Proposed destination | Reason |
|---|---|---|
| `/blog/back-pain-treatment-in-lafayette-la-what-actually-works-and-why-most-treatments-fail` | `/back-pain-lafayette` | Directly competes for the local commercial intent owned by the back-pain landing page. Preserve useful material in the landing page before any redirect. |
| `/blog/sciatica-treatment-in-lafayette-la-how-to-get-relief-fast-and-what-actually-works` | `/sciatica-treatment-lafayette` | Direct local-commercial overlap and overpromising title language. |
| `/blog/shoulder-pain-treatment-in-lafayette-la-why-it-wont-go-away-and-what-actually-helps` | `/shoulder-pain-lafayette` | Direct local-commercial overlap with the broad shoulder-pain page. |
| `/blog/knee-pain-treatment-in-lafayette-la-causes-solutions-and-when-to-get-help` | `/knee-pain-lafayette` | Direct local-commercial overlap with the broad knee-pain page. |
| `/blog/treating-plantar-fasciitis-through-dry-needling-efficacy-and-mechanism` | `/blog/the-effectiveness-of-dry-needling-for-plantar-fasciitis-insights-by-dr-shawn-d-johnston-at-relief-plus` | Two articles cover substantially the same modality-condition question. Confirm original authorship before selecting the survivor. |
| `/blog/rediscovering-primal-movement-patterns-for-modern-wellness` | `/blog/unlocking-the-bodys-potential-the-science-of-natural-movement` | Substantial overlap in broad natural/primal movement education; the destination is the stronger base article by crawl depth and word count. |
| `/blog/beyond-the-adjustment-why-carencros-industrial-athletes-trust-relief-plus-for-total-recovery` | `/blog/the-carencro-commute-and-the-industrial-athlete-is-your-job-winning-the-war-on-your-spine` | Closely overlapping Carencro industrial-athlete positioning. Consolidate unique occupational guidance into one useful article. |

Before approving any consolidation, review Search Console queries, clicks, backlinks, referral traffic, original dates, and unique content. Future redirects should be direct one-hop 301s only after the destination contains the source’s useful information.

### Other cannibalization risks to monitor

- `/back-pain-lafayette` versus sitting, standing, disc, brace, facet, and exercise articles.
- `/shoulder-pain-lafayette`, `/rotator-cuff-pain-lafayette`, and `/frozen-shoulder-lafayette` versus shoulder/sleep/scapular/AC-joint articles.
- `/knee-pain-lafayette` versus `/knee-osteoarthritis-lafayette` and stair, runner’s-knee, and ozone articles.
- `/hip-pain-lafayette` versus `/hip-bursitis-lafayette` and walking-pain content.
- `/headache-treatment-lafayette` versus cervicogenic, persistent, tension, and migraine-comparison articles.
- Treatment pages versus PRP, ozone, dry needling, shockwave, and trigger-point articles.
- Local “treatment in Lafayette” article titles that resemble landing-page titles even when their body intent is narrower.

Titles using “recover faster,” “game-changer,” “safest approach,” “what actually works,” or broad Lafayette treatment wording need evidence and intent review. Preserve the URL when an article can be repositioned to a distinct informational purpose.

## Topical clusters

### Chiropractic / Spine

Use the spine cluster for symptom behavior, safety, differential considerations, examination, self-management, and treatment-decision education. Link primarily to back pain, neck pain, sciatica, herniated disc, pinched nerve, headache, and chiropractic pages. Avoid recreating commercial landing pages inside the blog.

### Shoulder / Upper Extremity

Separate shoulder-pain overview, frozen shoulder, rotator-cuff, scapular mechanics, tennis-elbow, arm-numbness, and De Quervain intent. The two tennis-elbow treatment articles remain distinct only if each transparently answers a modality-specific patient question.

### Knee / Hip / Lower Extremity

Differentiate broad knee or hip symptoms from osteoarthritis, bursitis/GTPS, plantar fascia, Morton’s neuroma, and tendon loading. The blog should explain behavior and decision-making while landing pages own Lafayette treatment intent.

### TMJ / Headache

Restore both linked TMJ articles: one explains why jaws hurt and the other explains conservative-care options. Keep headache classification careful, avoid self-diagnosis, and connect escalation guidance to the headache landing page.

### Regenerative / Advanced Treatments

This cluster requires the strongest evidence and claim review. PRP, ozone, prolozone, laser, shockwave, dry needling, trigger-point, systemic ozone, acupuncture, and LipoLaser topics must match services actually offered and the current conservative compliance standard. Do not infer product composition, candidacy, outcomes, or regulatory status.

### Injury / Function

Car-accident, whiplash, occupational, industrial-worker, musician, pregnancy, sleep, movement, posture, and rehabilitation topics should emphasize useful action and function. Avoid fear-based urgency, “waiting makes it worse,” or repetitive local phrasing.

### Local / Educational

Use Lafayette, Carencro, and Acadiana only where local context adds genuine value. Avoid repeating a generic “Lafayette guide” formula. Local articles should support the Carencro page, work-injury page, or relevant condition page naturally.

## Restoration priorities

### Broken in the new build but linked from condition pages

| Article | Recommendation | Supporting page |
|---|---|---|
| `/blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la` | RESTORE and upgrade references/internal links while preserving its narrower “why it hurts” purpose | `/tmj-treatment-lafayette` |
| `/blog/treating-temporomandibular-joint-dysfunction-with-conservative-care` | RESTORE and upgrade as the conservative-options companion article | `/tmj-treatment-lafayette` |
| `/blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion` | RESTORE; review exercise staging, irritability, contraindications, and escalation guidance | `/frozen-shoulder-lafayette` |
| `/blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus` | RESTORE and substantially temper the promotional title/claims; explain candidacy, uncertainty, alternatives, and evidence | `/tennis-elbow-lafayette` and `/prp-therapy-lafayette` |
| `/blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1` | RESTORE and remove “game-changer” framing during substantive upgrade; verify the named author attribution | `/tennis-elbow-lafayette` and `/dry-needling-lafayette` |

These five must not remain 404s at launch. Their exact legacy paths are preserved in both the site migration map and the blog inventory.

## Top 15 Phase 9B priorities

1. `/blog` — RESTORE as the real hub.
2. `/blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la` — RESTORE.
3. `/blog/treating-temporomandibular-joint-dysfunction-with-conservative-care` — RESTORE.
4. `/blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion` — RESTORE.
5. `/blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus` — RESTORE with evidence/claim upgrade.
6. `/blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1` — RESTORE with evidence/claim and attribution review.
7. `/blog/back-pain-treatment-in-lafayette-la-what-actually-works-and-why-most-treatments-fail` — CONSOLIDATE after data review.
8. `/blog/sciatica-treatment-in-lafayette-la-how-to-get-relief-fast-and-what-actually-works` — CONSOLIDATE after data review.
9. `/blog/shoulder-pain-treatment-in-lafayette-la-why-it-wont-go-away-and-what-actually-helps` — CONSOLIDATE after data review.
10. `/blog/knee-pain-treatment-in-lafayette-la-causes-solutions-and-when-to-get-help` — CONSOLIDATE after data review.
11. `/blog/car-accident-injury-treatment-in-lafayette-la-what-to-do-immediately-and-why-waiting-can-make-it-worse` — UPGRADE to calm, useful post-collision decision guidance.
12. `/blog/the-safest-approach-to-cervical-spine-manipulation-reducing-risks-and-enhancing-health` — UPGRADE safety language and sources.
13. `/blog/healing-your-shoulder-why-prolozone-is-a-game-changer-for-ac-joint-injuries` — DO NOT RESTORE; hold URL for backlink/Search Console review.
14. `/blog/unlocking-recovery-how-systemic-ozone-therapy-complements-chiropractic-care` — DO NOT RESTORE; hold URL for backlink/Search Console review.
15. `/blog/headache-relief-in-lafayette-la-when-its-coming-from-your-neck-and-what-actually-helps` — UPGRADE to narrower cervicogenic-headache education.

## Phase 9B build order

1. Build `/blog` with stable metadata, H1, canonical, cluster navigation, featured resources, latest articles, and links to core services and conditions.
2. Restore the five currently linked URLs, preserving original publication dates and importing unique legacy material.
3. Process the four direct commercial-intent consolidations: preserve useful information, review external data, and request redirect approval separately.
4. Upgrade approved high-risk clinical treatment articles; exclude rejected prolozone, systemic-ozone, and chiropractic-for-sleep content.
5. Restore high-value narrow symptom articles across the spine, shoulder, lower-extremity, TMJ/headache, and injury clusters.
6. Restore functional rehabilitation and treatment-education articles after owner confirmation of scope and author/reviewer assignment.
7. Implement taxonomy behavior last: curated cluster navigation on `/blog`, noindex thin archives, and only approved misspelling redirects.
8. Validate every restored page for metadata, original/updated dates, schema, sources, internal links, mobile layout, accessibility, and canonical consistency.

## Blog hub specification

The rebuilt `/blog` should include:

- A concise evergreen H1 and introduction explaining Relief Plus patient education.
- Featured topics aligned to the clinical clusters, not an excessive tag cloud.
- Featured articles selected by usefulness and historical value rather than recency alone.
- Latest articles with true original publication dates and Updated labels only where warranted.
- Clear routes to the three pillars, services hub, conditions hub, and appropriate specific pages.
- Optional accessible filtering only if navigation remains crawlable and does not generate indexable duplication.
- Article cards with descriptive titles, factual summaries, publication/review information, and meaningful link text.

## Taxonomy recommendations

| URL or group | Recommendation |
|---|---|
| `/blog?offset=*`, `/blog?author=*` | Keep out of the sitemap. Use a deliberate canonical/pagination model; do not blanket-redirect query strings. |
| `/blog/tag/vertigo` | NOINDEX / REVIEW. Current page is thin and depends on one article. |
| `/blog/tag/accupunture` | Misspelled and thin. Later redirect to `/blog/tag/acupuncture` only if a curated corrected archive is intentionally built. |
| `/blog/tag/dizzines` | Misspelled and thin. Later redirect to `/blog/tag/dizziness` only if a curated corrected archive is intentionally built. |
| `/blog/tag/carencro` | NOINDEX / REVIEW. Prefer curated local content on the hub and natural links to `/chiropractor-carencro-la`. |
| `/blog/tag/frozen+shoulder` | NOINDEX / REVIEW. Prefer the condition page and cluster navigation. |
| `/blog/tag/chiropractor` | NOINDEX / REVIEW. Too broad and thin to compete with the chiropractic pillar. |
| `/blog/tag/range+of+motion` | NOINDEX / REVIEW. Too thin and vague for independent search value. |
| `/blog/tag/team` and `/blog/team` | Current 404s. Preserve for backlink/Search Console review; do not automatically redirect. |

Default thin taxonomy to noindex/follow or omit it from the new public taxonomy until it is curated. Do not add tag URLs to the sitemap. Build human-oriented cluster navigation on `/blog` instead of recreating every legacy tag.

## Author and clinical-review strategy

Use only verified identities:

- Shawn D. Johnston, D.C.
- Jeanne Saucier, PT
- Ashton Reed, M.D.
- Relief Plus Editorial for neutral clinic-owned content when no individual author is approved.

Do not assign bylines from topic assumptions. If an individual assignment is unavailable, preserve the original documented author or use Relief Plus Editorial with a recorded clinical-review workflow.

### Owner input required

1. Confirm the original author for every imported article using source metadata or records.
2. Confirm which practitioner accepts authorship responsibility for future chiropractic, rehabilitation, injection, regenerative, and medical-risk content.
3. Confirm whether a separate reviewer is required for injections, ozone, PRP, cellular/tissue products, pregnancy, neurological red flags, or manipulation safety.
4. Confirm that current role descriptions and credentials may appear with bylines.
5. Confirm an editorial owner and review cadence.
6. Confirm the exact InvisaRED/LipoLaser device and service, and confirm whether Relief Plus offers acupuncture. Systemic ozone, prolozone, and chiropractic-for-sleep articles are not approved for restoration.
7. Confirm whether article URLs naming Dr. Johnston reflect real authorship or only title wording.

## Date handling

- Preserve original `datePublished` values from the live source.
- Preserve dates in consolidation records even when a URL is later redirected.
- Add `dateModified` and a visible Updated label only after meaningful factual, clinical, structural, or sourcing changes.
- Do not reset dates for formatting, migration, link repair, or superficial edits.
- Store import provenance and dates so schema and visible content remain consistent.

## Evidence and article-template standard

Each retained article should have a unique purpose, concise summary, semantic H2/H3 structure, calm escalation guidance where relevant, contextual service/condition links, and selected credible references where they materially support claims. Prefer clinical guidelines, systematic reviews, primary academic sources, government agencies, and professional organizations. Do not manufacture citations, overstate certainty, or turn every article into a literature review.

Recommended article elements:

- Breadcrumbs and unique H1.
- Original publication date; updated/reviewed date only when true.
- Verified author/reviewer or Relief Plus Editorial designation.
- Plain-language key takeaway.
- Condition/treatment-specific body with meaningful headings.
- Selected references where clinically useful.
- Related core-page and article links.
- Conservative CTA and escalation language only when appropriate.
- `Article` or `BlogPosting`, Breadcrumb, and publisher schema matching visible content.

## AI and crawler readiness

Use server-rendered semantic content, explicit topic names, concise answers, verified responsibility, trustworthy sources, stable canonicals, and clean internal links. OAI-SearchBot and Googlebot remain allowed by the sitewide robots policy. Do not add speculative AI files, keyword blocks, or `llms.txt` ranking claims.

## Phase 9B validation gates

- Record exact URL, canonical, title, H1, description, publication date, and author provenance before import.
- Ensure no article duplicates a landing page’s local commercial purpose.
- Do not strengthen medical claims beyond the evidence.
- Confirm all linked destinations resolve in the new build.
- Include the blog hub and retained articles in the sitemap; exclude tags and parameters.
- Ensure structured data matches visible author, date, and content.
- Run lint, typecheck, webpack build, diff check, full crawl, accessibility, and representative Lighthouse checks.
- Keep redirects in a separately approved phase after backlink/Search Console review.
