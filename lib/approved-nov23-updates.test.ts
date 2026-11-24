import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts, blogPostsBySlug } from "./blog-posts";
import { sciaticaPage } from "./condition-pages";
import { conflictingAddressFaq, outsideRecordsFaq, sciaticaDrivingFaq, sciaticaRoadTripPath, vaCommunityCareFaq, vaCommunityCareFaqAnchor } from "./nov23-patient-answers";
import { answerGroups, libraryPath } from "./site-answers/library";
import { searchSite, type AnswerIndex } from "./site-answers/search";

const sittingSlug = "why-your-lower-back-hurts-when-sitting-lafayette-la-guide";
const fixture: AnswerIndex = {
  version: 1,
  pageCount: 1,
  chunks: answerGroups.flatMap(group => group.items.map((item, index) => ({
    path: `${libraryPath}#${group.id}-${index + 1}`,
    title: "Patient Questions & Answers",
    heading: item.question,
    section: group.title,
    text: item.answer,
    questions: [item.question, ...item.aliases],
  }))),
};
const indexPath = process.env.RELIEF_ANSWER_INDEX_PATH;
const index: AnswerIndex = indexPath ? JSON.parse(readFileSync(indexPath, "utf8")) : fixture;

describe("approved November 23 website updates", () => {
  it("registers a sourced road-trip guide and all intended internal links", () => {
    const post = blogPostsBySlug.get("sciatica-road-trip-driving");
    expect(blogPosts.filter(p => p.path === sciaticaRoadTripPath)).toHaveLength(1);
    expect(post?.sections).toHaveLength(4);
    expect(post?.sources.map(s => s.organization)).toEqual(["NHS", "NICE", "FDA"]);
    expect(post?.related.map(s => s.href)).toEqual([sciaticaPage.path, `/blog/${sittingSlug}`, "/contact"]);
    expect(JSON.stringify(post?.sections)).toContain("difficulty starting urination");
    expect(sciaticaPage.conditions.some(l => l.href === sciaticaRoadTripPath)).toBe(true);
    expect(blogPostsBySlug.get(sittingSlug)?.related.some(l => l.href === sciaticaRoadTripPath)).toBe(true);
  });

  it("aligns the sciatica FAQ with its guide and preserves the VA question link", () => {
    expect(sciaticaPage.faqs).toContainEqual(sciaticaDrivingFaq);
    expect(index.chunks.find(p => p.questions?.includes("Do you accept VA?"))).toMatchObject({
      heading: vaCommunityCareFaq.question,
      path: vaCommunityCareFaqAnchor,
      text: vaCommunityCareFaq.answer,
    });
    expect(vaCommunityCareFaq.answer).not.toMatch(/guarantee|we accept VA|in.network/);
  });

  it.each([
    ["Do you accept VA?", vaCommunityCareFaq.answer],
    ["VA referral", vaCommunityCareFaq.answer],
    ["Do I need a VA authorization?", vaCommunityCareFaq.answer],
    ["Veterans Community Care", vaCommunityCareFaq.answer],
    ["sciatica while driving", sciaticaDrivingFaq.answer],
    ["leg numbness driving", sciaticaDrivingFaq.answer],
    ["Can I drive with leg numbness?", sciaticaDrivingFaq.answer],
    ["old Carencro address", conflictingAddressFaq.answer],
    ["Can I send you my MRI results?", outsideRecordsFaq.answer],
    ["upload imaging", outsideRecordsFaq.answer],
    ["email my records", outsideRecordsFaq.answer],
  ])("returns the precise Ask Anything answer for %s", (input, answer) => {
    const result = searchSite(index, input);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe(answer);
    expect(result[0].path).toMatch(/^\/faq-lafayette\/patient-questions#/);
  });
});
