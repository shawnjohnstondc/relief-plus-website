import { describe, expect, it } from "vitest";
import { requestSchema, retrieveContext, validateAnswer, missingAnswer } from "./grounding";
import type { AnswerIndex } from "./search";

const index: AnswerIndex = { version: 1, pageCount: 3, chunks: [
  { path: "/contact", title: "Contact", heading: "Hours", section: "Hours", text: "Monday and Wednesday: 7:00 AM to 4:00 PM. Insurance accepted includes Medicare." },
  { path: "/dry-needling-lafayette", title: "Dry needling", heading: "Dry needling", section: "Treatment", text: "Dry needling uses thin needles without injected medicine. It may help selected muscular pain." },
  { path: "/time-card/admin", title: "Staff", heading: "Payroll", section: "Staff", text: "Private staff records must never enter the answer context." },
] };

describe("website-only AI grounding", () => {
  it("includes clinic facts and relevant prior questions without staff data", () => {
    const context = retrieveContext(index, "What about that treatment?", ["What is dry needling?"]);
    expect(context.some(p => p.path === "/contact")).toBe(true);
    expect(context.some(p => p.path === "/dry-needling-lafayette")).toBe(true);
    expect(context.some(p => p.path.startsWith("/time-card"))).toBe(false);
  });
  it("maps verified evidence to real website links", () => {
    const context = retrieveContext(index, "What are your hours?");
    const response = validateAnswer({ answerable: true, bullets: [{ text: "Monday and Wednesday: 7 AM–4 PM.", evidence: [{ id: 1, quote: "Monday and Wednesday: 7:00 AM to 4:00 PM." }] }] }, context);
    expect(response.sources).toEqual([{ title: "Contact", path: "/contact" }]);
    expect(response.insufficient).toBe(false);
  });
  it("rejects invented citations and fabricated quotations", () => {
    const context = retrieveContext(index, "What are your hours?");
    for (const evidence of [[{ id: 999, quote: "Monday and Wednesday: 7:00 AM to 4:00 PM." }], [{ id: 1, quote: "We are open all day on Sunday." }]]) {
      expect(validateAnswer({ answerable: true, bullets: [{ text: "An unsupported answer.", evidence }] }, context)).toEqual(missingAnswer);
    }
  });
  it("does not display generated content when the model finds insufficient evidence", () => {
    expect(validateAnswer({ answerable: false, bullets: [] }, [])).toEqual(missingAnswer);
  });
  it("limits visitor input and history", () => {
    expect(requestSchema.safeParse({ question: "a".repeat(601) }).success).toBe(false);
    expect(requestSchema.safeParse({ question: " ", history: [] }).success).toBe(false);
    expect(requestSchema.safeParse({ question: "Hours?", history: Array(5).fill({ question: "Hi", answer: "Hello" }) }).success).toBe(false);
  });
});
