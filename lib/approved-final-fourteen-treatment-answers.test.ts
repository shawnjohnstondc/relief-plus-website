import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { approvedConditionTreatments as treatments, approvedTreatmentHref } from "./approved-condition-treatment-answers";
import { phaseFiveConditionPages, kneeOsteoarthritisPage } from "./phase-five-condition-pages";
import { phaseSixConditionPages } from "./phase-six-condition-pages";
import { sportsInjuriesPage } from "./sports-injuries-page";
import { answerGroups, libraryPath } from "./site-answers/library";
import { searchSite, type AnswerIndex } from "./site-answers/search";

const cases = [
  [treatments.shoulderPain, "shoulder pain", ["What do you do for a sore shoulder?"]],
  [treatments.rotatorCuff, "rotator cuff pain", ["How do y’all treat rotator cuff tendinitis?", "What can you do for rotator cuff?"]],
  [treatments.frozenShoulder, "frozen shoulder", ["How do y'all treat adhesive capsulitis?", "What do you do for a frozen shoulder?"]],
  [treatments.kneePain, "knee pain", ["What do yall do for a sore knee?"]],
  [treatments.kneeOsteoarthritis, "knee osteoarthritis", ["How do yall treat knee arthritis?", "What do you do for arthritis in my knee?"]],
  [treatments.hipPain, "hip pain", ["How do yall treat a sore hip?"]],
  [treatments.hipBursitis, "hip bursitis", ["How do y'all treat pain on the outside of my hip?", "What do you do for gluteal tendon pain?", "How do you treat GTPS?"]],
  [treatments.tennisElbow, "tennis elbow", ["How do yall treat lateral epicondylitis?"]],
  [treatments.achilles, "Achilles tendinopathy", ["How do you treat Achilles tendinitis?", "What can you do for Achilles tendon pain?"]],
  [treatments.plantar, "plantar fasciitis", ["How do y'all treat plantar fascitis?", "What do you do for plantar heel pain?"]],
  [treatments.tendonitis, "tendonitis", ["How do yall treat tendinitis?", "What do you do for tendon pain?"]],
  [treatments.sportsInjuries, "sports injuries", ["How do yall treat a sports injury?"]],
  [treatments.carAccident, "car accident injuries", ["How do y’all treat injuries from a wreck?", "What do you do for injuries after a car crash?"]],
  [treatments.workInjuries, "work injuries", ["How do yall treat a workplace injury?", "What do y’all do for an on-the-job injury?"]],
] as const;
const items = answerGroups.flatMap(g => g.items);
const pages = [...phaseFiveConditionPages, ...phaseSixConditionPages, sportsInjuriesPage];
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

describe("fourteen approved Section 6 and 7 treatment answers", () => {
  it.each(cases)("shares a condition section and FAQ source: %o", (answer, label) => {
    const page = pages.find(p => p.path === answer.path);
    expect(page?.educationSections?.find(section => section.id === answer.stableSection)).toMatchObject({
      title: answer.question, paragraphs: answer.paragraphs,
    });
    expect(items.filter(item => item.question === answer.question)).toEqual([expect.objectContaining({
      answer: answer.paragraphs.join("\n\n"), source: approvedTreatmentHref(answer),
    })]);
    expect(items.find(item => item.question === `Do you treat ${label}?`)?.source).toBe(answer.path);
  });

  it.each(cases)("keeps distinct treatment and availability: %o", (answer, label, queries) => {
    for (const query of [answer.question, `How do yall treat ${label}`, `How do y'all treat ${label}?`, ...queries]) {
      expect(searchSite(index, query), query).toEqual([expect.objectContaining({
        heading: answer.question, text: answer.paragraphs.join("\n\n"),
      })]);
    }
    const canonical = `Do you treat ${label}?`;
    for (const query of [canonical, `Do yall treat ${label}?`, `Can you help with ${label}?`]) {
      expect(searchSite(index, query)[0], query).toMatchObject({
        heading: canonical, text: expect.stringContaining("Yes. Relief Plus evaluates and treats"),
      });
    }
  });

  it("does not turn other tendon disorders, claim or clearance requests into a routine treatment result", () => {
    const queries = [
      "How do yall treat golfer's elbow?", "How do you treat golfers elbow?", "How do you treat golfer’s elbow?",
      "Can you approve my workers' comp claim?", "Do you guarantee my return to work?",
      "Can you give me legal advice after a car accident?", "Can you guarantee clearance to play after a concussion?",
    ];
    for (const query of queries) {
      const first = searchSite(index, query)[0];
      expect(cases.some(([answer]) => first?.heading === answer.question), query).toBe(false);
    }
  });

  it("keeps urgent language and avoids a knee-OA laser recommendation", () => {
    expect(treatments.kneePain.paragraphs[1]).toContain("needs urgent medical evaluation");
    expect(treatments.carAccident.paragraphs[1]).toContain("seek emergency care");
    expect(treatments.sportsInjuries.paragraphs[1]).toContain("stop playing and get medical assessment before returning to sport");
    expect(treatments.kneeOsteoarthritis.paragraphs[1]).toContain("Laser isn’t a routine part of knee arthritis care.");
    expect(kneeOsteoarthritisPage.relatedServices.some(s => s.href === "/class-iv-laser-therapy-lafayette")).toBe(false);
  });
});
