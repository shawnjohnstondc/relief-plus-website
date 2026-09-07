# Patient content authoring and review

This repository stores public copy in `app/**/page.tsx` and typed data in `lib/*pages.ts`, `lib/*clinical-content.ts`, `lib/*blog-post*.ts`, and `lib/treatment-education.ts`. Shared page factories and shells render that content. No scheduled content generator, publishing job, or prompt template was found in the repository. This guide applies to manual and assisted drafts in this existing workflow; it changes no publishing permissions or schedules.

## Write for the person reading

- Open with a recognizable experience and explain what the page helps the reader understand. Use “you,” familiar words, short paragraphs, and concrete activities. Aim for roughly grades 6–8 in the main explanation; keep necessary medical terms and source detail.
- Put the everyday description before the medical name. Explain what a test, movement, or treatment means in that context. Do not turn a possible explanation into a diagnosis.
- Explain the assessment, options, limits, practical next step, and warning signs relevant to that topic. Retain worthwhile depth below the introduction. Do not use generic filler or internal SEO/project language in visible copy.
- Keep provider roles accurate. Dr. Johnston provides chiropractic care; Jeanne Saucier, PT, provides physical therapy; Dr. Reed provides medical oversight for regenerative care. Do not imply every patient sees all three or that Dr. Reed performs every injection or is always onsite.
- Do not invent clinic timelines, costs, coverage, products, device models, patient stories, quotations, or treatment promises. Preserve documented biographies, authentic reviews, and legal text.

## Articles

- `summary` is the opening experience and purpose. `description` tells someone browsing the index what they will learn. `takeaway` is a distinct plain-language conclusion, never a copy of the opening. `nextStep` is topic-specific preparation or a useful question, followed by the existing contact link in the shell. Keep urgent referral directions in the article; a routine appointment is not a substitute for emergency care.
- Reading time is computed by `calculateReadTime` from the rendered article prose at 200 words per minute. Do not infer it from an old manual estimate. Source titles and navigation chrome are excluded.
- Preserve `slug`, `path`, original `datePublished`, inline links, citations, and their anchors. Improve titles only while retaining topic intent and updating SEO titles consistently.
- Set `dateModified` for substantive edits. Do not change `lastReviewed`, add a reviewer, or assign clinician authorship unless an actual review/authorship is documented. An editorial date is not a new clinical-review date.

## Review before release

1. Read the complete page in context. Check meaningful differences across neighboring topics and shared templates.
2. Verify new or materially changed clinical claims against primary research or authoritative clinical guidance. Preserve evidence limits, adverse effects, contraindications, and urgent referral guidance.
3. Run `npm run lint`, `npm test`, and `npm run build`. Check representative production-rendered pages on desktop and a narrow phone viewport, including navigation, warning-sign links, source anchors, headings, and overflow.
4. Record every route reviewed, edited, retained, or excluded. Include original-versus-revised examples and unresolved facts in the review report.
5. Prepare a branch and reviewable diff. Production publishing requires existing release authorization; an editorial brief alone is not approval to deploy.
