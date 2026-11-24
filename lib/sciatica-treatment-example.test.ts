import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { sciaticaPage } from "./condition-pages";
import { sciaticaTreatmentAnswer, sciaticaTreatmentParagraphs, sciaticaTreatmentQuestion, sciaticaTreatmentSectionId, sciaticaTreatmentSource } from "./sciatica-treatment-answer";
import { answerGroups, libraryPath } from "./site-answers/library";
import { searchSite, type AnswerIndex } from "./site-answers/search";

const fixture: AnswerIndex = {
  version: 1,
  pageCount: 1,
  chunks: answerGroups.flatMap(group => group.items.map(item => ({
    path: libraryPath,
    title: "Patient Questions & Answers",
    heading: item.question,
    section: group.title,
    text: item.answer,
    questions: [item.question, ...item.aliases],
  }))),
};
const indexPath = process.env.RELIEF_ANSWER_INDEX_PATH;
const index: AnswerIndex = indexPath ? JSON.parse(readFileSync(indexPath, "utf8")) : fixture;

describe("approved sciatica treatment example", () => {
  it("publishes one exact explanation on the condition page and in the Q&A", () => {
    const section = sciaticaPage.educationSections?.find(s => s.id === sciaticaTreatmentSectionId);
    expect(section?.title).toBe(sciaticaTreatmentQuestion);
    expect(section?.paragraphs).toEqual(sciaticaTreatmentParagraphs);
    expect(sciaticaPage.educationSections?.some(s => s.paragraphs?.some(p => p.includes("rapidly progressive leg weakness")))).toBe(true);
    expect(sciaticaPage.relatedServices.some(s => s.href === "/spinal-decompression-lafayette")).toBe(false);
    expect(sciaticaPage.pageSources?.some(s => s.href.includes("PMC10508241"))).toBe(true);
    const faq = answerGroups.flatMap(s => s.items).find(a => a.question === sciaticaTreatmentQuestion);
    expect(faq?.answer).toBe(sciaticaTreatmentAnswer);
    expect(faq?.source).toBe(sciaticaTreatmentSource);
  });

  it.each([
    "How do yall treat sciatica",
    "How do y'all treat sciatica?",
    "How do y’all treat sciatica?",
    "How do you treat sciatica?",
    "How do you all treat sciatica?",
    "What do y’all do for sciatica?",
    "What treatments do yall use for sciatica?",
    "What treatments do you use for sciatica?",
  ])("shows the treatment explanation for %s", (question) => {
    const result = searchSite(index, question);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ heading: sciaticaTreatmentQuestion, text: sciaticaTreatmentAnswer });
  });

  it.each([
    "Do you treat sciatica?",
    "Do yall treat sciatica?",
    "Do y’all treat sciatica?",
    "Can you help with sciatica?",
  ])("keeps the distinct yes/no answer for %s", (question) => {
    const answer = searchSite(index, question)[0];
    expect(answer).toMatchObject({ heading: "Do you treat sciatica?" });
    expect(answer.text).toMatch(/^Yes\. Relief Plus evaluates and treats sciatica when the examination supports care here\./);
  });

  it("does not override unrelated page intents", () => {
    expect(searchSite(index, "Do you treat back pain?")[0]?.heading).toBe("Do you treat back pain?");
    expect(searchSite(index, "How do you treat neck pain?")[0]?.heading).toBe("How do you treat neck pain?");
    expect(searchSite(index, "leg numbness driving")[0]?.heading).toBe("Should I keep driving if leg pain or numbness makes it hard to use the pedals?");
  });
});
