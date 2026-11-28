import { describe, expect, it } from "vitest";
import { blogPosts } from "./blog-posts";
import { neckImagingAskAnswers, neckImagingFaqs } from "./neck-imaging-answers";
import { answerGroups } from "./site-answers/library";
import { searchSite } from "./site-answers/search";

describe("approved neck imaging content", () => {
  const entries = answerGroups.flatMap(group => group.items.map((entry, n) => ({ ...entry, path: `/faq-lafayette/patient-questions#${group.id}-${n + 1}` })));
  const index = { version: 1, pageCount: 1, chunks: entries.map(entry => ({ path: entry.path, title: "Patient Questions", heading: entry.question, section: "Patient Questions", text: entry.answer, questions: [entry.question, ...entry.aliases] })) };
  it("registers both articles and links every FAQ and short answer to its matching article", () => {
    for (const entry of [...neckImagingFaqs, ...neckImagingAskAnswers]) {
      expect(blogPosts.find(post => post.path === entry.href)).toBeDefined();
    }
  });
  it.each([
    ["Should I wear a cervical colar if I have a cervical disc?", 0],
    ["can i wear a neck brace for a bulging disc", 0],
    ["When do I need an MRI for my neck pain?", 1],
    ["BCBS neck MRI approval", 1],
    ["Do I need physical therapy before a neck MRI?", 1],
  ])("routes %s to the approved answer", (query, n) => {
    expect(searchSite(index, query)[0]?.text).toBe(neckImagingAskAnswers[n].answer);
  });
  it("keeps urgent instructions and the plan-specific checklist with the MRI article", () => {
    const mri = blogPosts.find(post => post.path === neckImagingFaqs[1].href)!;
    const article = JSON.stringify(mri);
    expect(mri.sections.findIndex(section => section.heading.startsWith("When to get urgent"))).toBeLessThan(mri.sections.findIndex(section => section.heading.includes("BCBSLA")));
    expect(article).toContain("physical therapy or a documented clinician-supervised home program");
    expect(article).toContain("at least six weeks");
    expect(article).toContain("Authorization does not guarantee payment");
    expect(neckImagingAskAnswers[1].answer).toContain("go to the ER");
  });
});
