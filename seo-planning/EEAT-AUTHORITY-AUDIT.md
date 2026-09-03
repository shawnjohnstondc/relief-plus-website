# Relief Plus E-E-A-T and Google Authority Audit

**Audit date:** September 2, 2026  
**Canonical site:** https://www.myreliefplus.com  
**Repository / branch reviewed:** `relief-plus-website` / `main` at `07e435612a5fb788675d6330d63d916efcc8ea99`  
**Scope:** Read-only review of the live site and repository. No code, content, DNS, database, time-card, deployment, or Google Business Profile changes were made.

## A. Executive summary

Relief Plus has a strong technical and editorial foundation for a local healthcare site: the public site is available, its canonical URLs are coherent, NAP is consistent across the homepage, Contact page, footer, and `MedicalBusiness` data, the three clinical pillars are clear, clinical content is generally cautious, original clinic photography demonstrates first-hand experience, and retained articles contain visible dates, sources, disclaimers, and relevant internal links.

The primary authority weakness is **identity depth**, not page quantity. Google can identify a business named Relief Plus at a Lafayette address, but the current entity graph gives it few verified reconciliation points beyond its own website. The three clinicians appear together on `/team`, but none has a dedicated, uniquely identifying provider URL. Person markup contains only a name, suffix, job title, and `worksFor`; it has no stable person `@id`, profile URL, image, verified license identifier, or verified `sameAs`. This is especially important for health content, where Google says trust is the most important part of E-E-A-T and gives stronger weight to E-E-A-T-aligned signals for YMYL topics ([Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

Authorship is the second major gap. The repository contains **48 retained blog articles**. All 48 visibly say “By Relief Plus Editorial” and all 48 use `Organization` author markup. None is attributed to a verified individual; none exposes a visible reviewer, `reviewedBy`, or `lastReviewed`. This is honest and preferable to invented authorship, but it prevents the site from demonstrating which qualified person is responsible for future clinical content. Google explicitly encourages accurate bylines that lead to author background and recommends an author URL that uniquely identifies the author ([Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)).

The highest-impact next phase should therefore be narrow: verify provider facts, create provider profile pages, connect those profiles to the clinic entity, establish a real editorial/review workflow for future or genuinely reviewed content, and reconcile the website with the Google Business Profile and primary-source professional records. Do not mass-produce articles or add unverified schema fields.

### Overall assessment

| Area | Current assessment | Main opportunity |
|---|---|---|
| Relief Plus entity | Strong on-site NAP; moderate external disambiguation | Add verified logo/image, GBP/social identity links, and consistent organization identifiers |
| Shawn Johnston entity | Moderate on-site biography; weak unique entity URL | Dedicated provider page with owner-verified education, history, licensure, training, and profiles |
| Other providers | Thin | Verify full identities, current roles, scope, licenses, biographies, and whether each is public-facing at Relief Plus |
| Authorship | Honest but generic | Future person-level author/reviewer model based on actual work performed |
| Healthcare content trust | Generally strong | Correct a small number of broad homepage marketing claims; maintain citations and review cadence |
| Experience | Strong original-photo foundation | Add factual captions/context and provider/profile connections without testimonials or outcome claims |
| Local authority | Good geographic clarity; limited third-party corroboration | GBP alignment, legitimate community/professional relationships, and accurate local citations |
| Duplicate homepage risk | No current duplicate | Keep `/home` as 404 unless evidence supports a one-hop 301 |

## B. Current authority strengths

1. **A clear real-world clinic identity.** Relief Plus is consistently presented at 112 Arabian Dr., Lafayette, LA 70507, with (337) 565-4200 and `myreliefplus@gmail.com`.
2. **A focused clinical purpose.** Chiropractic, Physical Therapy, and Regenerative Medicine are consistently presented as the three pillars.
3. **Patient-first content architecture.** Conditions, treatments, services, About, Team, Contact, FAQs, legal/patient-information pages, and 48 retained articles form a coherent musculoskeletal topic set.
4. **Conservative clinical language.** Most high-risk terms appear in disclaimers or explicit limitations—not as promises. Condition pages routinely discuss differentials, red flags, referral, imaging, candidacy, uncertainty, and treatment alternatives.
5. **Evidence visibility.** Treatment and blog pages contain selected sources and explain evidence limits. Every retained article model includes `datePublished`, `dateModified`, sources, related resources, and an educational disclaimer.
6. **First-hand visual evidence.** Original imagery shows the clinic, consultation, physical therapy, dry needling, laser use with protective eyewear, ozone preparation, and work-injury education.
7. **Trust infrastructure.** Contact details, published hours, HIPAA Notice, Good Faith Estimate, Website Privacy Policy, and a clear warning not to email urgent or sensitive medical information are visible.
8. **No fabricated provider precision.** The Team page explicitly leaves unverified education, specialty, certification, and procedural-responsibility claims unstated.

## C. Relief Plus entity

### Current consistency

| Attribute | Homepage / footer | Contact | `MedicalBusiness` | Finding |
|---|---|---|---|---|
| Name | Relief Plus | Relief Plus | Relief Plus | Consistent |
| Street | 112 Arabian Dr. | 112 Arabian Dr. | 112 Arabian Dr. | Consistent |
| City / ZIP | Lafayette, LA 70507 | Lafayette, LA 70507 | Lafayette, LA 70507 | Consistent |
| Phone | (337) 565-4200 | (337) 565-4200 | +1-337-565-4200 | Correct display/structured variants |
| Email | `myreliefplus@gmail.com` | Same | Same | Consistent |
| Fax | Not emphasized in footer | (337) 565-4201 | +1-337-565-4201 | Consistent where used |
| Service area | Lafayette, Carencro, Acadiana | Same | Same three areas | Consistent |
| Hours | Not in footer | Published schedule | Same schedule | Consistent in code/live output |

The Lafayette postal address is correctly distinguished from the Carencro service area. `/chiropractor-carencro-la` states that Relief Plus serves people from Carencro; it does not claim a Carencro clinic address.

### Ambiguity and gaps

- The business entity has one stable ID, `https://www.myreliefplus.com/#medical-business`, which is good. It lacks a verified `logo`, representative `image`, `sameAs`, and `geo`. Google recommends organization data that reflects real-world presence and online identity, including applicable name, address, telephone, URL, and logo ([Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)).
- `MedicalBusiness` is emitted through `SiteHeader` on essentially every public page. The ID and facts are consistent, so this does not create competing businesses within a document, but Google says organization details normally belong on the homepage or a single organization/about page and need not appear on every page. A future cleanup can place the canonical organization node centrally and let page-level entities reference its stable ID.
- There is no separate conflicting `Organization` node, but the blog author is an inline `Organization` named Relief Plus rather than a reference to the canonical medical-business ID. That weakens graph consolidation.
- Current search results still surfaced pre-launch wording and facts, including old Carencro-address material and broad “root cause/recover faster” language, despite the live URLs now returning rebuilt content. This is an index-refresh issue and an external-identity consistency warning, not evidence that the current live pages contain that old copy. Request recrawling of the highest-value rebuilt pages and monitor snippets in Search Console.
- Third-party directory results still show the former 109 E Saint Peter St., Carencro location and historical hours. Those sources should be corrected or claimed only where legitimate; do not create bulk low-quality directory listings.

### Recommended Relief Plus entity model

- One canonical node: `https://www.myreliefplus.com/#organization` or retain `#medical-business` consistently.
- Type: the most accurate supported local/medical subtype (`MedicalBusiness` is currently reasonable).
- Verified name, canonical URL, NAP, hours, service area, logo, representative clinic image, and any accurate founding date.
- Verified GBP and exact official clinic social/profile URLs in `sameAs`; no generic directory or search-result URLs.
- Provider relationships from stable person IDs to the business via `worksFor`/`affiliation`, only while accurate.
- Services reference the canonical business node as `provider`.

## D. Shawn Johnston entity

### Verified information currently published

- Public name: **Shawn D. Johnston, D.C.**
- Role: Chiropractor and owner of Relief Plus.
- Has provided chiropractic care in the Lafayette area since 2008.
- Doctor of Chiropractic degree from Logan University, 2007.
- Current site states that verified Relief Plus materials list professional training in dry needling and Class IV laser.
- Current role includes chiropractic care, musculoskeletal/functional examination, patient education, and coordination of appropriate options.
- Original photographs identify him in the homepage hero, consultation, dry-needling, and laser contexts.

The current repository does **not** verify a license number/status, complete undergraduate history, specific certification issuers/dates, professional memberships, speaking engagements, publications, full employment chronology, or social/profile URLs. Older indexed material contains a much longer curriculum vitae, but that legacy text should not be republished or marked up until the owner verifies it item by item.

### Dedicated page recommendation

Create a dedicated page at **`/dr-shawn-johnston-dc`**. It is clearer and more stable than nesting him under `/team`, preserves the commonly used professional name, and can serve as both provider profile and author identity. Keep `/team` as the group overview and link the Shawn card/name to the profile.

The page should focus on one person and use visible, verified content plus `ProfilePage` with a stable `Person` `@id`, for example `https://www.myreliefplus.com/dr-shawn-johnston-dc#person`. Google recognizes an employee page focused on one person as a valid profile-page use case ([Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)).

Recommended visible content, after verification:

- Professional name and current role.
- Current headshot/original clinical photo.
- Education with institution and year.
- Practice history and Relief Plus founding/ownership chronology.
- Current Louisiana license type, status, number, and primary-source verification link if the owner approves publication.
- Exact training/certifications, issuing organizations, and dates.
- Clinical interests stated without superiority or outcome claims.
- Real teaching/speaking history with host, subject, and date.
- What he does and does not personally provide at Relief Plus.
- Links to genuinely authored/reviewed content—not every clinic article.

## E. Other provider entities

### Jeanne Saucier, PT

Current verified publication is limited to name, `PT` credential, Physical Therapist role, and a general description of rehabilitation focused on movement, strength, progressive loading, and function. No education, license number/status, certifications, specialty, years in practice, photograph, or external identity link is verified in the repository.

Recommendation: create **`/jeanne-saucier-pt`** only after confirming that she is currently public-facing at Relief Plus and obtaining a verified biography, current Louisiana PT license information, role/scope, education, and an approved photograph. Until then, the cautious Team entry is appropriate. If she genuinely authors or reviews rehabilitation content, her profile can become its author/reviewer destination.

### Ashton Reed, M.D.

The current site lists “Ashton Reed, M.D.” and states that Dr. Reed is associated with Relief Plus, contributes medical oversight, and may be appropriately involved in selected advanced options. It explicitly says specialty, board certification, education, and specific procedural responsibilities are unverified. External primary/credible records appear to identify the physician as **David Ashton Reed, M.D.**, an internal-medicine physician in Lafayette, but the site must not assume this is the same person or infer Relief Plus responsibilities from an external directory.

This is a P1 identity-clarity issue because name form and responsibility affect patient understanding. Confirm the full professional name, current affiliation, exact role, scope, availability, procedures personally performed/supervised, license/NPI identifiers, and whether “medical oversight” is the correct public description.

Recommendation: if current affiliation and patient-facing responsibility are confirmed, create **`/dr-david-ashton-reed-md`** (or the exact verified professional-name variant). If involvement is limited, non-patient-facing, or no longer current, revise the Team/entity relationship rather than creating an authority page.

### Other clinicians

No other public clinician is represented in the current site’s Team schema. Staff names in the private time-card system are out of scope and must not be exposed as public clinicians or organization employees through public schema.

## F. Authorship

### Current inventory

| Item | Count / state |
|---|---|
| Retained articles | **48** |
| Visible “Relief Plus Editorial” byline | **48** |
| `BlogPosting.author` | **48 Organization authors** |
| Individually attributed articles | **0** |
| Visible reviewer / medical reviewer | **0** |
| `reviewedBy` / `lastReviewed` support | **None** |
| `datePublished` | Present for all 48 |
| `dateModified` | Present for all 48 |
| Visible published/updated dates | Present for all 48 |
| Sources/further reading | Present in the article data model and visible shell |

Some legacy slugs/titles contain Shawn’s name. The current content correctly does not treat that URL wording as proof of authorship; at least one article explicitly says the historical URL is not verified authorship.

### Future architecture

1. Keep existing historical articles attributed to Relief Plus Editorial unless original authorship can be documented.
2. Give Relief Plus Editorial a transparent editorial-policy page or a section on `/about` explaining who maintains it, how sources are selected, and when clinical review occurs.
3. For new articles, store separate structured fields for:
   - `author` — the person/organization that actually wrote the content;
   - `reviewedBy` — only the clinician who actually performed a substantive review;
   - `datePublished`;
   - `dateModified` — only for substantive updates;
   - `lastReviewed` — visible review date if a real review occurred.
4. Display bylines/review disclosures in plain language and link each named person to a verified profile page.
5. Mirror visible attribution in structured data. Google recommends that all visible authors also appear in markup and that author `url` or `sameAs` uniquely identify them ([Google Article author best practices](https://developers.google.com/search/docs/appearance/structured-data/article#author-markup-best-practices)).
6. Do not add a reviewer simply to create a ranking signal. “Medically reviewed by” must correspond to a documented review process and the reviewer’s relevant discipline.

Suggested discipline alignment, subject to actual participation:

- Chiropractic, musculoskeletal examination, manual care: Shawn.
- Rehabilitation, loading, mobility, strength, return to function: Jeanne.
- Medical/injection/regulatory content: only the verified clinician responsible and competent for that topic; confirm Ashton’s role before assigning him.
- Mixed topics: one genuine author plus one genuine reviewer where necessary—not an automatic three-name byline.

## G. Healthcare content trust

### Overall classification: **LOW to MODERATE risk; no confirmed high-risk promise found in current core content**

Most occurrences of “guarantee,” “cure,” “regenerate,” “reverse,” “permanent,” and “decompress” are careful statements rejecting those claims. The major treatment and condition data are unusually explicit about limits, candidacy, referral, risks, and uncertainty.

Meaningful current wording to review later:

| Risk | URL | Current wording | Why review | Direction, not replacement copy |
|---|---|---|---|---|
| Moderate | `/` | “Advanced laser therapy designed to support tissue healing, reduce inflammation, and improve recovery.” | Broad, outcome-oriented biological claims appear in a homepage card without diagnosis, dose, evidence, or uncertainty context. | Describe laser as a selected adjunct and connect benefit language to diagnosis-specific evidence and variable response. |
| Moderate | `/` | “help identify the source of pain, restore function, and support long-term recovery” | “The source” can imply a singular discoverable cause; “restore” can read as a promised result. | Emphasize evaluating likely contributors and supporting functional goals rather than finding one root cause. |
| Low–Moderate | `/` | Chiropractic care is “focused on restoring motion, reducing pain, and helping you move and function better.” | Patient-friendly, but three favorable outcomes are presented together without variability language. | Retain goal orientation while avoiding an implied result for every patient. |
| Low–Moderate | `/prp-therapy-lafayette` and related education | “PRP offers a compelling option” and a cited meta-analysis “found PRP significantly improved…” | The page contains good caveats, but statistical significance can be mistaken for predictable individual benefit or clinical magnitude. | Keep source, effect context, limitations, preparation variability, absolute/clinical relevance where available, and candidacy language. |
| Low | `/shockwave-therapy-lafayette` education | “The best results start with a confirmed diagnosis…” | “Best results” is promotional/generalized but immediately followed by appropriate selection and loading context. | Prefer “a sound treatment plan” or similarly non-superlative framing during a future copy pass. |
| Low | Multiple pages | “right treatment,” “advanced options,” “evidence-informed” | These are reasonable positioning phrases when supported by the extensive selection/uncertainty content. | Keep, but ensure actual processes and provider responsibilities are transparent. |

No current core page reviewed makes a guaranteed cure, disc-restoration, cartilage-regrowth, universal decompression, universal-posture, or surgery-replacement promise. Regenerative-cellular content contains strong regulatory and candidacy caveats. Preserve that conservative standard.

Important indexing note: Google search results observed during this audit still displayed old pre-launch passages containing “root cause,” “recover faster,” “without limits,” “spinal alignment,” and an old Carencro location. Those phrases were not found in the current rebuilt pages reviewed. Monitor reindexing and request crawl of `/`, `/about`, `/team`, `/contact`, and cornerstone service pages.

## H. Experience signals

### Current strengths

- `/`: owner hero portrait, active clinic hallway, and Shawn consultation imagery.
- `/physical-therapy-lafayette`: original reformer exercise image in the physical-therapy page context.
- `/class-iv-laser-therapy-lafayette`: original clinical use image with eyewear and treatment-area context.
- `/dry-needling-lafayette`: original shoulder dry-needling image identifying Shawn.
- `/ozone-injection-therapy-lafayette` and regenerative pillar: actual ozone preparation equipment/supplies, correctly not represented as an injection underway.
- `/work-injury-lafayette`: consultation using a spine model in a work-injury context.
- Image alternative text generally explains who/what is shown rather than making outcome claims.

These are strong first-hand signals because they show real people, equipment, and environment rather than generic stock photography. Google’s people-first guidance explicitly asks whether content demonstrates first-hand expertise or experience.

### Improvements

- Add factual visible captions where context could be ambiguous: who is pictured, that the setting is Relief Plus, and what phase is shown (consultation, preparation, rehabilitation, treatment). Do not state results.
- Use one verified primary profile photograph per provider and connect it to the provider page; avoid duplicating every treatment image on the profile.
- On service pages, briefly explain what a real visit/evaluation includes, who may provide the service, and what patients can expect before/during/after. Much of this already exists; provider attribution is the missing piece.
- Keep photo file names, alt text, captions, and page context aligned. Do not use `sameAs`, `image`, or provider identity markup for a person who is not actually shown.
- Consider a short, factual clinic-environment section on Contact/About covering access, parking, arrival, and the physical setting if owner-verified. This is useful real-world experience, not promotional testimony.

## I. Local authority

### Current state

- Lafayette is clearly the physical address and principal location.
- Carencro and Acadiana are consistently described as service areas.
- `/chiropractor-carencro-la` is linked from the homepage, Contact page, two relevant work/local articles, and sitemap. It is not orphaned.
- The Carencro page explains access to the same Lafayette clinic and three-pillar model; it does not present a fictitious second office.
- The page is somewhat broad and has no unique first-hand travel/access/community information. It is acceptable but should not be multiplied into near-duplicate city pages.

### Authentic opportunities

1. Reconcile GBP, Apple/Bing maps, and legitimate healthcare/professional listings to the Lafayette address and current hours.
2. Correct credible legacy profiles that still show 109 E Saint Peter St., Carencro.
3. Document real community participation, local education, sports/community relationships, or professional events only where Relief Plus actually participates; link to corroborating organization/event pages when available.
4. Earn—not buy—local references through useful talks, injury-prevention education, employer/community resources, or legitimate organizational memberships.
5. If patients routinely travel from Carencro, add verified logistical information (approximate area served, directions/access cues, parking) without inventing a Carencro address or repeating city keywords.
6. Avoid mass directory submissions, paid link packages, reciprocal-link pages, and duplicate city landing pages.

## J. Google Business Profile alignment

The GBP itself was not changed or authenticated during this audit. The owner should compare it against this checklist:

| Field | Website source of truth / owner check |
|---|---|
| Business name | `Relief Plus`—match real signage and GBP exactly; do not add service/location keywords |
| Primary category | Choose the single category that best describes the clinic’s actual primary business; owner must confirm current GBP choice |
| Secondary categories | Use only categories for real, staffed services; avoid one category per treatment |
| Address | 112 Arabian Dr., Lafayette, LA 70507 |
| Phone | (337) 565-4200 |
| Website | `https://www.myreliefplus.com/` |
| Hours | Mon/Wed 7:00–11:00 and 12:15–4:00; Tue/Thu 8:30–12:00 and 1:15–4:00; Fri closed—owner must confirm current reality/holiday handling |
| Service area | Lafayette, Carencro, Acadiana only as operationally accurate |
| Services | Align with current three pillars and actual treatment offerings; do not add unverified procedures |
| Providers | Confirm which clinicians are public-facing and can be contacted at the location; do not create support-staff profiles |
| Appointment method | Phone-based scheduling; the site states there is no online booking form |
| Description | Factual, current, no links/promotions/guarantees/root-cause language |
| Photos | Current exterior/interior, team/provider, and real service imagery; retire obsolete-location photos |

Google directs businesses to use their real-world name, accurate address/service area, and the fewest categories needed to describe the core business ([Google Business Profile representation guidelines](https://support.google.com/business/answer/3038177), [Google Business Profile categories](https://support.google.com/business/answer/7249669)). Individual practitioner profiles require additional eligibility considerations; do not create them automatically.

## K. Structured-data/entity graph

### Existing inventory

- `MedicalBusiness`: name, stable business ID, canonical URL, NAP, fax, hours, description, and three service areas.
- `Person`: Shawn, Jeanne, and Ashton on `/team`; name, suffix, job title, and `worksFor` only.
- `Service`: treatment/pillar/local pages with business provider and area served.
- `MedicalWebPage` + `MedicalCondition`: condition pages.
- `BlogPosting`: 48 articles with headline, description, URL, dates, organization author, publisher, webpage, and breadcrumbs.
- `CollectionPage`: blog and conditions hubs.
- `BreadcrumbList`: major content types.
- `FAQPage`: pages/components that use the FAQ helper.
- No standalone `Organization`, `Physician`, or `ProfilePage` entity.
- No `sameAs` or `knowsAbout` properties.
- No ratings, awards, license identifiers, or unsupported medical credentials in structured data.
- Staff time-card routes do not render public-site headers or public medical schema and remain noindex/nofollow.

### Findings

- The business node is consistent but repeated on every public page; central placement plus stable references would be cleaner.
- Team persons have no `@id`, `url`, or `image`, so other nodes cannot reliably reference the same people.
- Person markup says `worksFor`, but the exact current relationship and responsibility for Jeanne and Ashton should be owner-verified before expanding it.
- `BlogPosting.author` is a separate inline organization object and should reference the canonical Relief Plus node or an editorial-policy/organization URL.
- Page-level `Service` and `MedicalWebPage` nodes are conservative and do not invent outcomes. Their relationship to responsible providers is absent—which is preferable until responsibility is verified.
- FAQ markup may be semantically valid, but Google currently limits FAQ rich results largely to well-known authoritative government and health sites; do not treat it as a guaranteed rich-result feature.

### Recommended graph

```text
Relief Plus (#medical-business)
├── url / NAP / hours / logo / image / verified sameAs
├── provider or employee → Shawn (#person)
├── provider or employee → Jeanne (#person), if verified
├── affiliated medical provider → Ashton (#person), exact relation verified
└── provider of → Service entities

Provider ProfilePage
└── mainEntity → stable Person #person
    ├── worksFor / affiliation → Relief Plus #medical-business
    ├── verified education / credentials / identifiers
    └── verified sameAs

BlogPosting
├── author → actual Organization or Person stable ID
├── reviewedBy → actual reviewer stable ID, only when review occurred
├── datePublished / dateModified / visible last-reviewed date
└── publisher → Relief Plus #medical-business
```

Do not use `knowsAbout` as a list of desired keywords. If ever used, restrict it to supportable professional topics on verified provider pages. Do not add `Physician` for Ashton or provider relationships to services until his identity and responsibility are confirmed.

## L. External identity signals

Highest-quality candidates, subject to owner verification:

1. **Google Business Profile** for the exact Relief Plus location.
2. **Primary-source Louisiana license verification** for each clinician: Louisiana chiropractic board, Louisiana Physical Therapy Board, and Louisiana State Board of Medical Examiners. The latter two provide public license-verification tools ([Louisiana Physical Therapy Board](https://www.laptboard.org/), [LSBME verification guidance](https://www.lsbme.la.gov/content/verifications)).
3. **NPI/NPPES** for clinicians who have an applicable NPI, verified against the exact full name and role.
4. **Education institution alumni/profile pages** only if they genuinely identify the provider.
5. **Professional organization membership/profile pages** only for current verified membership.
6. **LinkedIn or official professional profiles** owned by the exact person and kept current.
7. **Official Relief Plus social profiles** used and controlled by the clinic.
8. **Legitimate local organization, event, employer, media, or community pages** that independently corroborate real participation.

Do not use stale commercial directories as primary identity proof. Several surfaced profiles contain the old Carencro address/hours or potentially sensitive/outdated licensure assertions. Owner confirmation and primary-source verification are required before linking or adding `sameAs`.

Owner information required: exact GBP URL, official clinic social URLs, exact professional names used on licenses/NPI, primary-source verification URLs or identifiers, current memberships, institution pages, and legitimate local involvement links.

## M. Trust/transparency

### Strengths

- Clear owner identification and clinic contact information.
- Separate Team and About pages.
- Distinct HIPAA Notice, Good Faith Estimate, and Website Privacy Policy.
- Phone-first scheduling and warning that ordinary email is not appropriate for urgent concerns or assumed secure transmission.
- General educational disclaimer on every retained article.
- Calm red-flag/referral language across major condition content.
- Regenerative/cellular content distinguishes evidence, product uncertainty, regulatory status, candidacy, and alternatives.

### Gaps

- “Who provides which care?” remains partly ambiguous, especially medical/injection services.
- No editorial policy explains Relief Plus Editorial, source selection, update cadence, corrections, or actual review workflow.
- No dedicated provider pages connect qualifications and responsibility to clinical content.
- No sitewide medical-information disclaimer destination; articles contain a disclaimer, but service/condition pages rely mostly on their content context.
- No visible content-review date or reviewer on high-risk advanced-treatment pages.
- Clinic ownership is stated for Shawn, but the legal/business entity or DBA relationship should only be added if the owner wants it public and verifies the exact wording.
- Website Privacy Policy should be revisited if analytics, cookies, forms, maps, advertising pixels, chat, or other third-party data collection are later added. This is not a current launch blocker.

## N. `/home` and duplicate routes

### Live result

- `https://www.myreliefplus.com/`: HTTP 200, self-canonical (rendered as `https://www.myreliefplus.com`), indexable, included once in sitemap.
- `https://www.myreliefplus.com/home`: HTTP 404 for GET and HEAD, no live competing content, no sitemap entry, and no internal link found.

There is no current duplicate homepage. The sitemap URL and canonical root are functionally equivalent; the trailing-slash serialization difference does not create a second route.

### Recommendation

Leave `/home` as **404** unless Search Console, backlinks, analytics, or the legacy migration inventory proves that it was a valuable historical homepage URL. If meaningful legacy signals exist, a direct one-hop **301 to `/`** would be appropriate. Do not add a canonical-only duplicate and do not return a soft 404. No other active root-like duplicate page was found in application routes.

## O. 12-month content strategy

Publish approximately **1–2 substantive pieces per month**, driven by real patient questions and clinician participation. Update useful existing articles when that better answers the query; do not publish a new article merely to target a close keyword variant.

| Cluster | Existing pillar/landing destination | Supporting opportunities | Best discipline, if genuinely involved | Search intent / internal-link destination |
|---|---|---|---|---|
| Back pain | `/back-pain-lafayette` | Flare self-management; lifting/load decisions; when imaging helps; work/desk/driving capacity | Shawn + Jeanne where actually authored/reviewed | Education/differential → back pain, PT, chiropractic |
| Sciatica/radicular | `/sciatica-treatment-lafayette` | Radicular pain vs referred pain; neurological changes; centralization; when referral is urgent | Shawn/Jeanne; medical reviewer for red-flag content if actually reviewed | Symptom clarification → sciatica, herniated disc, pinched nerve |
| Neck/headache | `/neck-pain-lafayette`, `/headache-treatment-lafayette` | Cervicogenic vs migraine/tension patterns; screen use; sleep/activity; urgent patterns | Shawn/Jeanne; medical review where warranted | Differential/self-management → neck/headache pages |
| Work injury | `/work-injury-lafayette` | Graded return to lifting, prolonged standing, driving, overhead work; documentation expectations without legal advice | Jeanne + Shawn | Return-to-function → work injury, PT |
| Sports injury | `/sports-injuries-lafayette` | Return-to-running; cutting/landing; overhead athlete loading; readiness beyond pain | Jeanne; Shawn for relevant musculoskeletal evaluation | Return-to-sport → sports injury and diagnosis-specific pages |
| Shoulder/elbow | `/shoulder-pain-lafayette`, cuff/frozen shoulder/tennis elbow pages | When weakness matters; progressive overhead load; tendon vs joint; realistic recovery markers | Jeanne, possibly Shawn | Differential/rehab → exact condition, PT |
| Knee/hip | knee/hip/OA/bursitis pages | OA activity decisions; stairs/squats; running load; when imaging/referral matters | Jeanne; relevant medical review for procedure content | Function/candidacy → exact condition, PT, PRP only when relevant |
| Physical rehabilitation | `/physical-therapy-lafayette` | How progression is chosen; soreness vs flare; home-program adherence; measuring meaningful function | Jeanne | Treatment-process → PT and relevant condition |
| Dry needling | `/dry-needling-lafayette` | What it feels like; risks/consent; adjunct vs active care; diagnosis-specific evidence | Verified trained provider | Decision support → dry needling + exact condition |
| Laser | `/class-iv-laser-therapy-lafayette` | Dose/parameters; eyewear/safety; evidence by diagnosis; why response varies | Verified treating provider | Decision support → laser + supported conditions |
| Injection/advanced | regenerative, PRP, ozone, trigger point pages | Product/protocol questions; evidence by diagnosis; risks; alternatives; regulatory updates | Actual administering/responsible clinician; medical reviewer where appropriate | Candidacy/shared decision-making → exact treatment, not broad condition capture |

### Suggested cadence

- Quarter 1: provider/editorial foundation first; then one back/sciatica update and one PT process article.
- Quarter 2: one shoulder or sports-return article and one dry-needling/laser decision guide.
- Quarter 3: one work-injury functional guide and one knee/hip evidence update.
- Quarter 4: one headache/neck differential guide and one advanced-treatment evidence update.
- Use remaining capacity to update high-value existing articles rather than filling a quota.

Each article should answer a distinct question, add first-hand clinical explanation, cite primary/guideline evidence where appropriate, state who wrote/reviewed it, and link to one primary clinical destination plus genuinely relevant secondary resources.

## P. P1/P2/P3 recommendations

### P1 — high-impact authority/trust improvements

| Recommendation | Why it matters | Pages/components affected | Owner information required | Codex without owner info? |
|---|---|---|---|---|
| Verify all three provider identities, current roles, and scope | Patients and search systems cannot reliably connect names to qualifications/responsibility | `/team`, `/about`, relevant service pages, provider schema | Exact names, current role/affiliation, license status/ID, scope, services personally provided | **No** for facts; architecture can be prepared only |
| Build Shawn provider profile | Creates the strongest verified clinician/owner/author entity | New `/dr-shawn-johnston-dc`, Team/About links, schema | Approved bio, headshot, license details, exact education/history/training, profiles | **Partly**; current facts can scaffold, but verification is needed before publication |
| Resolve Ashton name/role ambiguity | “Ashton Reed” vs likely “David Ashton Reed,” plus vague “medical oversight,” is material healthcare clarity | `/team`, `/about`, regenerative/injection pages, schema | Full legal/professional name, role, affiliation, scope, NPI/license, procedures/oversight | **No** |
| Establish real authorship/review policy | Health content should clearly state who created/reviewed it; Google strongly encourages accurate authorship | Blog shell/data, editorial policy, provider pages, selected clinical pages | Who writes, who reviews which topics, documentation/workflow, review cadence | **No** for attribution; implementation follows policy |
| Reconcile GBP and primary identity sources | Current site is consistent, but indexed/third-party results still surface old Carencro facts | GBP, Contact/About, external profiles, schema `sameAs` | GBP URL/screenshots or fields, official profiles, current hours/categories | **No** for external verification |
| Review three broad homepage claims | Homepage is prominent and contains the clearest remaining biological/outcome overstatements | `/`, specifically laser/chiropractic/hero copy | No new facts unless owner wants device-specific claims | **Yes**, after owner approves wording direction |

### P2 — worthwhile medium-term improvements

- Create verified profile pages for Jeanne and Ashton if their active public-facing roles warrant them.
- Consolidate structured data around stable business/person IDs; reference the canonical business node from authors/services.
- Add verified business logo, clinic image, GBP/social `sameAs`, and geo only after exact values are supplied.
- Add an editorial policy/corrections/update methodology page or About section.
- Add visible factual captions to original clinical photography.
- Define risk-based review cadence: advanced/regulatory pages more often than stable anatomy/rehabilitation pages.
- Correct or claim legitimate directories that still show the old Carencro location.
- Add a clear sitewide educational-information disclaimer destination and link it where useful, without replacing page-specific red flags.
- Request recrawl/indexing of the rebuilt homepage, About, Team, Contact, three pillars, and provider pages when launched.

### P3 — optional refinements

- Add verified founding date/legal entity/DBA wording if useful to patients and desired publicly.
- Add a clinic-access/arrival/parking section after owner verification.
- Add legitimate local community/event history with corroborating links.
- Consider representative 1:1, 4:3, and 16:9 article images only when genuinely useful; do not generate generic stock images for schema completeness.
- Monitor `/home` backlinks and add a 301 only if evidence warrants it.

## Q. Minimum owner questions

1. What are the exact current professional names, Louisiana license types/numbers/statuses, and primary-source verification URLs for Shawn D. Johnston, Jeanne Saucier, and Ashton Reed?
2. Is Ashton’s full professional name **David Ashton Reed, M.D.**, and what is his exact current relationship to Relief Plus, patient-facing availability, scope, and responsibility for each injection/regenerative service?
3. Please approve or correct Shawn’s current biography facts: practice since 2008; Logan University D.C., 2007; Relief Plus ownership/founding timeline; exact dry-needling and Class IV laser training/certification issuer and dates; any other education, work history, teaching, memberships, or certifications to publish.
4. What verified biography, education, current role/scope, approved photo, and clinical interests may be published for Jeanne?
5. What is the exact Relief Plus Google Business Profile URL, current primary/secondary categories, hours, appointment setting, and approved official clinic social/profile URLs?
6. Who will actually write and clinically review future content by topic, and what review/update cadence can the clinic consistently document?
7. Are there genuine current community organizations, professional memberships, talks, local media, sports/employer relationships, or educational events that Relief Plus may accurately name and link?

## R. Recommended Phase 1 implementation

Do not begin with more articles. Complete this sequence:

1. **Owner verification packet:** answer the seven questions above and provide primary-source links/photos.
2. **Provider identity foundation:** build `/dr-shawn-johnston-dc`; resolve Ashton’s identity/role; decide whether Jeanne and Ashton warrant dedicated pages.
3. **Editorial policy:** define Relief Plus Editorial, authorship, review, corrections, source selection, `dateModified`, and `lastReviewed` rules.
4. **Entity graph cleanup:** assign stable person IDs; connect verified providers to the canonical MedicalBusiness; reference actual authors/reviewers; add only verified external identity links.
5. **Trust copy refinement:** review the three homepage phrases identified above without redesigning the page.
6. **GBP/external reconciliation:** align current NAP/hours/categories/services/photos and correct legitimate old-address citations.
7. **Recrawl and measure:** validate structured data, submit the priority URLs for recrawl, and monitor Search Console indexing/snippets before starting the first clinician-led content batch.

This sequence strengthens the “Who” and trust foundation before asking Google or patients to rely on additional health content. It follows Google’s guidance to make authorship and background clear, focus on people-first usefulness, and use only applicable structured-data properties—not speculative authority markup.
