# Relief Plus editorial review — September 7, 2026

Implemented in the actual `shawnjohnstondc/relief-plus-website` repository on `editorial/readability-engagement`. Ready for review; not pushed, merged, or deployed. Local production preview: [Relief Plus review](http://localhost:3012/).

## Scope and results

Reviewed all 98 current sitemap pages: edited 95 marketing and patient-education pages, and retained the three legal pages verbatim. The work includes all 49 articles, all 31 condition/service data pages, and the 15 homepage, index, provider, and information pages. Retained passages that already worked; this was not a wholesale replacement of clinical detail. The full route inventory below also records legacy redirects, retired routes, two inactive legacy continuity paths, and excluded staff routes.

- The homepage keeps “Move better. Feel stronger. Live with less pain.” Its opening now identifies the audience, care options, and phone scheduling. Service cards explain what treatments involve and distinguish Dr. Johnston’s chiropractic care, Jeanne Saucier’s physical therapy, and Dr. Reed’s medical oversight. Existing photos, review carousel, quotations, and contact targets remain.
- Condition/service openings use relevant situations and explain what assessment can clarify. Main explanations and selected examination steps are simpler. Jump links lead to assessment, treatment options, FAQs, and relevant safety information; an expandable contents list reaches deeper clinical detail. All existing detailed condition-education sections and sources remain intact.
- All 49 articles now have a recognizable opening, a separate takeaway, a topic-specific next step, and a contact link. Selected body wording or headings changed in 31 articles; useful remaining explanations stayed. Reading estimates use actual rendered prose, including linked text, lists, comparisons, and disclaimers, at 200 words per minute.
- The journal retains all 49 articles in their topic groups and adds descriptions there. The “recently published” section now lists six rather than repeating the full library. Topic labels use familiar body areas.
- Removed visible internal wording about SEO, project documentation, and content placement. Provider biographies keep their documented facts. The editorial-policy page distinguishes a writing update from clinical review and no longer relies on an outdated fixed article count.
- Added `docs/PATIENT-CONTENT-GUIDE.md` for the existing typed-data authoring workflow. No scheduled content generator or publishing workflow was found in the repository. No schedules or permissions were changed.

## Before and after

### Homepage opening

**Before:** “Relief Plus brings chiropractic care, physical therapy, and regenerative medicine together in one integrated clinic. We combine evidence-informed care with advanced treatment options to help identify the source of pain, restore function, and support long-term recovery.”

**After:** “Back, neck, or joint pain making your day harder? We help adults across Lafayette, Carencro, and Acadiana understand their symptoms and explore chiropractic care, physical therapy, or selected regenerative treatments. Call our Lafayette clinic to arrange a visit.”

### Frozen shoulder

**Before:** “Frozen shoulder, or adhesive capsulitis, typically involves meaningful loss of both active and passive shoulder motion. Relief Plus evaluates irritability, motion, compensation, health context, and the daily activities most affected.”

**After:** “Putting on a shirt or reaching behind your back may become difficult with frozen shoulder, also called adhesive capsulitis. We check how far you can move your arm yourself and with gentle assistance, then plan movement around your pain and stiffness.”

### Nighttime hand numbness article

**Before:** “The location of numbness, positions that provoke it, and accompanying weakness can help distinguish irritation at the wrist, elbow, neck, or more than one site.” This also appeared unchanged in the takeaway box.

**After opening:** “You wake up with a numb hand and shake it until the feeling returns. If this keeps happening, which fingers are affected and how you sleep can offer useful clues. Here is what to notice and when to have it checked.”

**Separate takeaway:** “Nighttime numbness may come from nerve irritation at the wrist, elbow, neck, or more than one place. Changing weakness or loss of hand function needs prompt assessment.”

**Next step:** “Write down which fingers go numb, how often it happens, and whether you are dropping objects or losing grip strength.” The article then links to the existing contact page. Reading time changed from 7 min read to 2 min read based on the current prose.

## Verification

- `npm run lint`: passed.
- `npm test`: 89 tests passed in 11 files, including reading-time boundaries, linked text/lists/comparisons, and distinct article takeaways. Existing staff-application tests also passed; that code was not changed.
- `npm run build`: passed compilation, TypeScript, and generation of 112 static outputs.
- Fresh HTTP and rendered-HTML checks: all 98 sitemap pages returned 200; one H1 each; no heading-level skips; valid JSON-LD blocks; expected canonical URLs; no missing local anchor targets, duplicate IDs, or unknown internal content routes.
- Browser checks at 390 × 844 and 1440 × 900: homepage, back pain, physical therapy, regenerative medicine, dry needling, blog index, and nighttime hand numbness. No horizontal document or text overflow; no captured browser warnings/errors. Visual checks included phone article and treatment typography, distinct openings, the homepage, journal, and back-pain warning section.
- Interaction checks: the article’s next-step link opened `/contact` with phone scheduling; the back-pain safety link reached its warning section with the heading visible. Telephone targets remained `tel:+13375654200`; no call was placed. The journal still exposes 49 distinct article URLs.
- Data comparison: all 49 article paths, original publication dates, authors/contributors/reviewers, clinical-review dates, review notes, scope notes, disclaimers, related links, and source objects were preserved. All embedded article links and all condition/service data links were preserved. All detailed condition-education sections were unchanged. Two explanatory article paragraphs mentioning weakness were paraphrased and checked for retained nerve/referral meaning; urgent guidance remained.
- Legal pages, review carousel, SEO helper, sitemap, robots, and routing configuration were byte-compared with the original commit and are unchanged. Existing unrelated untracked logos and SEO audit files were left alone.
- Substantive article edits carry a September 7, 2026 `dateModified`. No new clinical-review date or clinician attribution was added. Non-article pages retain their existing metadata workflow.
- React review: changes remain server-rendered; no new client dependency, animation, data fetch, or hydration state was added. Navigation uses native links and disclosure controls.

## Evidence checks and remaining factual limits

The rewrite restates existing clinical explanations and retains their sources and uncertainty. Targeted authoritative checks included [NIDCR jaw-disorder guidance](https://www.nidcr.nih.gov/health-info/tmd), [AAOS carpal-tunnel guidance](https://www.orthoinfo.org/diseases--conditions/carpal-tunnel-syndrome/), and [FDA regenerative-medicine information](https://www.fda.gov/vaccines-blood-biologics/consumers-biologics/important-patient-and-consumer-information-about-regenerative-medicine-therapies). The nighttime opening fits AAOS’s discussion of nighttime symptoms and shaking the hand, while the article retains other possible nerve sites and urgent symptoms. Provider roles were checked against the repository’s current biographies. This editorial work is not represented as a new clinician review of every article.

The source still does not establish the exact cellular/tissue product, shockwave device type, trigger-point injectate, or full procedure protocols used at the clinic. The revised wording invites readers to ask those questions and makes no new product, device, timing, price, or outcome claims. Existing insurance and referral qualifications were retained. Those facts should only change with clinic documentation.

Representative current public pages were compared with the local source. Two optional legacy paths have no local article data and returned fresh production 404s; older search-cache copies were not treated as current website content. No legacy routing or migration was introduced.

## Review workflow

No repository PR template or specialized editorial release process was present. Changes are prepared on a dedicated local review branch, with this report, the route inventory, and a reviewable diff. Production release remains a separate decision.

## Complete route inventory

| Route | Type | Outcome | Review note |
|---|---|---|---|
| / | Marketing / information | Changed | Kept headline, images and authentic reviews; rewrote opening, service cards and visit explanation. |
| /about | Marketing / information | Changed | Simplified introduction and team coordination; preserved biographies and quote. |
| /team | Marketing / information | Changed | Replaced source-verification language with useful provider-role information. |
| /contact | Marketing / information | Changed | Clearer phone scheduling and preparation; contacts, hours, insurance and referral qualifications retained. |
| /services | Marketing / information | Changed | Explained procedures in everyday terms and identified the three clinician roles. |
| /our-approach | Marketing / information | Changed | Explained assessment and progression through daily tasks. |
| /dr-shawn-johnston-dc | Marketing / information | Changed | Simplified introduction; retained education, experience, family details, training, memberships and quote. |
| /jeanne-saucier-pt | Marketing / information | Changed | Simplified introduction and rehabilitation explanation; retained education, experience and scope. |
| /dr-ashton-reed-md | Marketing / information | Changed | Simplified procedure-choice explanation; preserved credentials and all limits on personal involvement. |
| /clinical-standards-editorial-review | Marketing / information | Changed | Clarified editorial versus clinical-review dates; replaced stale article count with accurate attribution policy. |
| /faq-lafayette | Marketing / information | Changed | Simplified care and provider answers; insurance and referral details retained; shared FAQ schema remains aligned. |
| /hipaa-notice-of-privacy-practices | Legal | Excluded; retained verbatim | Reviewed scope only; no editorial changes. |
| /good-faith-estimate | Legal | Excluded; retained verbatim | Reviewed scope only; no editorial changes. |
| /privacy-policy | Legal | Excluded; retained verbatim | Reviewed scope only; no editorial changes. |
| /blog | Marketing / information | Changed | All 49 articles remain grouped; added descriptions; reduced recent list to six; clearer topic names. |
| /chiropractic-adjustments-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /physical-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /regenerative-cellular-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /prp-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /ozone-injection-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /trigger-point-injections-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /dry-needling-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /class-iv-laser-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /shockwave-therapy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /invisared-weight-loss-lafayette | Marketing / information | Changed | Plain body-contouring explanation; medical-weight-loss exclusion and outcome limits retained. |
| /chiropractor-carencro-la | Marketing / information | Changed | Explained the Lafayette location and next step for Carencro patients. |
| /conditions-we-treat | Marketing / information | Changed | Clear starting point for people without a diagnosis; all condition links retained. |
| /back-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /neck-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /sciatica-treatment-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /herniated-disc-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /pinched-nerve-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /knee-osteoarthritis-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /rotator-cuff-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /tmj-treatment-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /frozen-shoulder-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /hip-bursitis-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /tennis-elbow-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /achilles-tendinopathy-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /si-joint-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /headache-treatment-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /shoulder-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /knee-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /hip-pain-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /plantar-fasciitis-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /tendonitis-treatment-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /car-accident-injuries-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /work-injury-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /sports-injuries-lafayette | Condition / service | Changed | Topic-specific heading and opening; assessment/care/FAQ navigation; useful detail, source links and clinical warnings retained. |
| /blog/bowhunting-shoulder-mechanics-acadiana | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/when-does-an-epidural-steroid-injection-work-for-sciatica | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/treating-temporomandibular-joint-dysfunction-with-conservative-care | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1 | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-neck-hurts-when-you-wake-up-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/why-your-hands-go-numb-at-night-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/headache-relief-in-lafayette-la-when-its-coming-from-your-neck-and-what-actually-helps | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/understanding-the-difference-tension-headaches-vs-migraines | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/the-safest-approach-to-cervical-spine-manipulation-reducing-risks-and-enhancing-health | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/cervical-traction-a-path-to-relief-at-relief-plus-chiropractic-clinic | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/can-ozone-injections-help-your-knee-osteoarthritis-a-modern-approach-to-pain-management | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/shockwave-therapy-and-dry-needling-a-dual-approach-to-treating-runners-knee | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-lower-back-hurts-when-sitting-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/lumbar-disc-pain-why-your-back-isnt-just-tight-and-what-to-do-about-it | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/understanding-scapular-dyskinesis-the-hidden-culprit-behind-shoulder-pain | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-hip-hurts-when-you-walk-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/prp-and-dry-needling-complementary-approaches-to-muscle-injury-treatment-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/the-effectiveness-of-dry-needling-for-plantar-fasciitis-insights-by-dr-shawn-d-johnston-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/unraveling-dequervains-syndrome-innovative-treatments-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/facet-syndrome-how-chiropractic-adjustments-and-dry-needling-bring-relief | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/when-to-wear-a-back-brace-for-disc-pain-a-balanced-approach | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/why-your-elbow-hurts-when-you-lift-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-shoulder-hurts-when-you-sleep-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-foot-hurts-when-you-first-wake-up-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-knee-hurts-when-going-up-stairs-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/delayed-pain-after-a-car-accident-in-lafayette-la-why-symptoms-show-up-later | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/how-long-after-a-car-accident-should-you-see-a-chiropractor-in-lafayette-la | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/the-carencro-commute-and-the-industrial-athlete-is-your-job-winning-the-war-on-your-spine | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/why-your-back-hurts-when-you-stand-too-long-lafayette-la-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/strengthening-your-foundation-top-three-exercises-for-low-back-stability | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/understanding-and-managing-mortons-neuroma-a-comprehensive-guide | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/headaches-that-wont-go-away-it-might-not-be-what-you-think | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/pregnancy-pain-whats-normal-whats-not-and-how-to-find-relief-safely | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/piriformis-syndrome-and-l5-s1-disc-bulge-a-comparative-insight-by-dr-shawn-johnston-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/understanding-arm-numbness-differentiating-causes-by-symptoms | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/easing-the-grip-of-disc-bulge-with-radicular-pain-traction-and-adjusting-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/the-rhythm-of-recovery-why-acadianas-musicians-are-turning-to-chiropractic-care | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/unlocking-the-bodys-potential-the-science-of-natural-movement | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/exploring-the-mobile-stable-complex-by-janda-insights-into-functional-injuries | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/integrating-developmental-kinesiology-into-everyday-life | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/breathing-and-posture-foundations-of-optimal-health | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Existing detailed body retained after review. |
| /blog/integrating-chiropractic-care-and-physical-therapy-for-comprehensive-pain-management | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/the-carencro-workers-guide-to-lumbar-health-keeping-acadiana-strong | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/the-healing-touch-manual-therapy-techniques-for-soft-tissue-mobilization | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/back-to-basics-core-strengthening-exercises-for-lower-back-pain-relief | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /blog/the-strategic-use-of-trigger-point-injections-at-relief-plus | Article | Changed | Distinct opening, takeaway and next step; computed reading time; truthful editorial update date. Selected body wording/headings simplified. |
| /home | Legacy redirect | Retained | Existing 301 to /; routing configuration unchanged. |
| /hippa-privacy | Legacy redirect | Retained | Existing 301 to /hipaa-notice-of-privacy-practices; routing configuration unchanged. |
| /privacy-policy-3 | Legacy redirect | Retained | Existing 301 to /good-faith-estimate; routing configuration unchanged. |
| /faqs-1 | Legacy redirect | Retained | Existing 301 to /faq-lafayette; routing configuration unchanged. |
| /new-dropdown | Legacy redirect | Retained | Existing 301 to /chiropractic-adjustments-lafayette; routing configuration unchanged. |
| /sciatica-lafayette | Legacy redirect | Retained | Existing 301 to /sciatica-treatment-lafayette; routing configuration unchanged. |
| /blog/car-accident-injury-treatment-in-lafayette-la-what-to-do-immediately-and-why-waiting-can-make-it-worse | Legacy redirect | Retained | Existing 301 to /car-accident-injuries-lafayette; routing configuration unchanged. |
| /blog/whiplash-treatment-in-lafayette-la-symptoms-causes-and-how-to-recover-faster | Legacy redirect | Retained | Existing 301 to /car-accident-injuries-lafayette; routing configuration unchanged. |
| /blog/shoulder-pain-treatment-in-lafayette-la-why-it-wont-go-away-and-what-actually-helps | Legacy redirect | Retained | Existing 301 to /shoulder-pain-lafayette; routing configuration unchanged. |
| /blog/knee-pain-treatment-in-lafayette-la-causes-solutions-and-when-to-get-help | Legacy redirect | Retained | Existing 301 to /knee-pain-lafayette; routing configuration unchanged. |
| /blog/sciatica-treatment-in-lafayette-la-how-to-get-relief-fast-and-what-actually-works | Legacy redirect | Retained | Existing 301 to /sciatica-treatment-lafayette; routing configuration unchanged. |
| /blog/when-to-see-a-chiropractor-in-lafayette-la-signs-you-shouldnt-ignore | Legacy redirect | Retained | Existing 301 to /chiropractic-adjustments-lafayette; routing configuration unchanged. |
| /blog/back-pain-treatment-in-lafayette-la-what-actually-works-and-why-most-treatments-fail | Legacy redirect | Retained | Existing 301 to /back-pain-lafayette; routing configuration unchanged. |
| /blog/beyond-the-adjustment-why-carencros-industrial-athletes-trust-relief-plus-for-total-recovery | Legacy redirect | Retained | Existing 301 to /blog/the-carencro-commute-and-the-industrial-athlete-is-your-job-winning-the-war-on-your-spine; routing configuration unchanged. |
| /blog/rediscovering-primal-movement-patterns-for-modern-wellness | Legacy redirect | Retained | Existing 301 to /blog/unlocking-the-bodys-potential-the-science-of-natural-movement; routing configuration unchanged. |
| /blog/relieving-tension-headaches-the-chiropractic-approach | Legacy redirect | Retained | Existing 301 to /blog/understanding-the-difference-tension-headaches-vs-migraines; routing configuration unchanged. |
| /blog/treating-plantar-fasciitis-through-dry-needling-efficacy-and-mechanism | Legacy redirect | Retained | Existing 301 to /blog/the-effectiveness-of-dry-needling-for-plantar-fasciitis-insights-by-dr-shawn-d-johnston-at-relief-plus; routing configuration unchanged. |
| /blog/healing-your-shoulder-why-prolozone-is-a-game-changer-for-ac-joint-injuries | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /blog/unlocking-the-secrets-of-sleep-chiropractic-techniques-for-a-restful-night | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /blog/team | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /blog/unlocking-recovery-how-systemic-ozone-therapy-complements-chiropractic-care | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /blog/tag/[tag] | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /cart | Retired resource | Retained | Handler unchanged; retired resources return 410; unrecognized tags return 404. |
| /blog/lipolaser-understanding-the-effectiveness-of-targeted-fat-loss | Legacy continuity path | Retained; not a current content page | No local article source; optional legacy rewrite unchanged. Fresh production request returned 404 on September 7, 2026. Search cache showed older content and was not used as current copy. |
| /blog/treating-vertigo-with-acupuncture-a-holistic-approach | Legacy continuity path | Retained; not a current content page | No local article source; optional legacy rewrite unchanged. Fresh production request returned 404 on September 7, 2026. Search cache showed older content and was not used as current copy. |
| /time-card | Staff application | Out of scope | No content or application changes. |
| /time-card/admin | Staff application | Out of scope | No content or application changes. |
| /time-card/admin/export | Staff application | Out of scope | No content or application changes. |
