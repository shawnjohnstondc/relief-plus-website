import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { approvedConditionTreatments as treatments, approvedTreatmentHref } from "./approved-condition-treatment-answers";
import { siJointPage, tmjPage } from "./phase-five-condition-pages";
import { headachePage } from "./phase-six-condition-pages";
import { answerGroups, libraryPath } from "./site-answers/library";
import { searchSite, type AnswerIndex } from "./site-answers/search";

const cases = [
  [treatments.siJoint, siJointPage, "SI joint pain", ["How do yall treat SI joint pain", "What do y’all do for sacroiliac joint pain?", "How do y'all treat SI joint?"]],
  [treatments.headache, headachePage, "headaches", ["What do you do for headaches?", "How do yall treat headaches?", "How do y’all treat headache?"]],
  [treatments.tmj, tmjPage, "TMJ pain", ["How do y’all treat jaw pain?", "How do yall treat jaw pain", "What do you do for TMJ?", "How do y'all treat TMD?", "What can you do for TMJ pain?"]],
] as const;
const items = answerGroups.flatMap(group => group.items);
const fixture: AnswerIndex = {
  version: 1,
  pageCount: 1,
  chunks: items.map(item => ({
    path: libraryPath, title: "Patient Questions & Answers", heading: item.question,
    section: "Conditions & how care is selected", text: item.answer, questions: [item.question, ...item.aliases],
  })),
};
const indexPath = process.env.RELIEF_ANSWER_INDEX_PATH;
const index: AnswerIndex = indexPath ? JSON.parse(readFileSync(indexPath, "utf8")) : fixture;

describe("three approved Section 5 treatment answers", () => {
  it.each(cases)("shares exact treatment content and a stable condition link: $0.title", (answer, page) => {
    expect(page.educationSections?.find(section => section.id === answer.stableSection)).toMatchObject({
      title: answer.question, paragraphs: answer.paragraphs,
    });
    expect(items.filter(item => item.question === answer.question)).toEqual([expect.objectContaining({
      answer: answer.paragraphs.join("\n\n"), source: approvedTreatmentHref(answer),
    })]);
  });

  it.each(cases)("finds the explanation for formal and colloquial treatment questions: $0.title", (answer, _page, _label, queries) => {
    for (const query of [answer.question, ...queries]) {
      expect(searchSite(index, query)).toEqual([expect.objectContaining({
        heading: answer.question, text: answer.paragraphs.join("\n\n"),
      })]);
    }
  });

  it.each(cases)("keeps availability separate: $0.title", (_answer, page, label) => {
    const canonical = `Do you treat ${label}?`;
    for (const query of [canonical, `Do yall treat ${label}?`, `Can you help with ${label}?`]) {
      expect(searchSite(index, query)[0]).toMatchObject({
        heading: canonical, text: expect.stringContaining("Yes. Relief Plus evaluates and treats"),
      });
    }
    expect(items.find(item => item.question === canonical)?.source).toBe(page.path);
  });

  it("retains distinct scope and warning language", () => {
    expect(treatments.siJoint.paragraphs[1]).toContain("not to “put the pelvis back in place.”");
    expect(treatments.headache.paragraphs[1]).toContain("not as a treatment for migraine");
    expect(treatments.headache.paragraphs[1]).toContain("headache with fever and a stiff neck needs emergency evaluation");
    expect(treatments.tmj.paragraphs[1]).toContain("trouble breathing or swallowing needs emergency care");
    for (const [query, heading] of [
      ["How do yall treat sciatica", "How do you treat sciatica?"],
      ["How do yall treat a herniated disc", "How do you treat a herniated disc?"],
      ["How do you treat shoulder pain?", "How do you treat shoulder pain?"],
      ["Do you offer spinal decompression?", "Do you offer spinal decompression?"],
      ["Can I book online?", "Can I book online?"],
    ]) {
      expect(searchSite(index, query)[0]?.heading).toBe(heading);
    }
  });
});
