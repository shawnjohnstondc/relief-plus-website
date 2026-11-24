import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { approvedConditionTreatments, approvedTreatmentHref } from "./approved-condition-treatment-answers";
import { backPainPage, herniatedDiscPage, neckPainPage, pinchedNervePage } from "./condition-pages";
import { answerGroups, libraryPath } from "./site-answers/library";
import { searchSite, type AnswerIndex } from "./site-answers/search";

const rows = [
  [approvedConditionTreatments.backPain, backPainPage, "back pain"],
  [approvedConditionTreatments.neckPain, neckPainPage, "neck pain"],
  [approvedConditionTreatments.herniatedDisc, herniatedDiscPage, "herniated discs"],
  [approvedConditionTreatments.pinchedNerve, pinchedNervePage, "pinched nerves"],
] as const;
const items = answerGroups.flatMap(group => group.items);
const fixture: AnswerIndex = {
  version: 1,
  pageCount: 1,
  chunks: answerGroups.flatMap(group => group.items.map(item => ({
    path: libraryPath, title: "Patient Questions & Answers", heading: item.question,
    section: group.title, text: item.answer, questions: [item.question,...item.aliases],
  }))),
};
const indexPath = process.env.RELIEF_ANSWER_INDEX_PATH;
const index: AnswerIndex = indexPath ? JSON.parse(readFileSync(indexPath, "utf8")) : fixture;

describe("four approved condition-specific treatment answers", () => {
  it.each(rows)("aligns the linked condition section and public FAQ: $0.title", (answer, page) => {
    const section = page.educationSections?.find(s => s.id === answer.stableSection);
    expect(section?.title).toBe(answer.question);
    expect(section?.paragraphs).toEqual(answer.paragraphs);
    const q = items.filter(i => i.question === answer.question);
    expect(q).toHaveLength(1);
    expect(q[0].source).toBe(approvedTreatmentHref(answer));
    expect(q[0].answer).toBe(answer.paragraphs.join("\n\n"));
  });

  it.each(rows)("separates treatment and availability: $0.title", (answer, _, plural) => {
    for (const query of [answer.question, `How do yall treat ${answer.condition}`, `How do y'all treat ${answer.condition}`, `How do yall treat ${plural}`, `What do y’all do for ${answer.condition}?`, `What treatments do you use for ${plural}?`]) {
      const result = searchSite(index, query);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ heading: answer.question, text: answer.paragraphs.join("\n\n") });
    }
    for (const query of [`Do you treat ${plural}?`, `Do yall treat ${plural}?`]) {
      const result = searchSite(index, query)[0];
      expect(result.heading).toBe(`Do you treat ${plural}?`);
      expect(result.text).toContain("Yes. Relief Plus evaluates and treats");
    }
  });

  it("keeps sciatica, the existing generic traction answer, and unrelated answers separate", () => {
    expect(searchSite(index,"How do yall treat sciatica")[0].heading).toBe("How do you treat sciatica?");
    expect(searchSite(index,"Do you treat sciatica?")[0].heading).toBe("Do you treat sciatica?");
    expect(searchSite(index,"Do you offer spinal decompression?")[0].heading).toBe("Do you offer spinal decompression?");
    expect(searchSite(index,"Do you treat shoulder pain?")[0].heading).toBe("Do you treat shoulder pain?");
  });

  it("preserves urgent escalation and does not recommend routine traction", () => {
    expect(approvedConditionTreatments.herniatedDisc.paragraphs.join(" ")).toContain("seek emergency evaluation for new trouble starting urination or emptying your bladder");
    expect(herniatedDiscPage.educationSections?.find(s => s.eyebrow === "When More Evaluation Is Needed")?.paragraphs?.[0]).toContain("new trouble starting urination or emptying your bladder");
    for (const p of [backPainPage, herniatedDiscPage]) {
      expect(p.relatedServices.find(s => s.href === "/spinal-decompression-lafayette")?.description).toContain("not routine");
    }
    expect(JSON.stringify(pinchedNervePage.educationSections)).not.toMatch(/Laser is a possible adjunct/i);
  });
});
