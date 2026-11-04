import { describe, expect, it } from "vitest";
import { blogPosts, blogPostsBySlug } from "./blog-posts";
import { physicalTherapyPage } from "./pillar-pages";
import { achillesPage } from "./phase-five-condition-pages";
import { answerGroups } from "./site-answers/library";

describe("approved November patient-facing updates", () => {
  it("registers the complete sourced Achilles article once", () => {
    const post = blogPostsBySlug.get("achilles-pain-back-of-heel");
    expect(post).toBeDefined();
    expect(blogPosts.filter(p => p.slug === post?.slug)).toHaveLength(1);
    expect(post?.sections).toHaveLength(6);
    expect(post?.sources).toHaveLength(6);
    expect(post?.reviewedBy).toBeUndefined();
    expect(JSON.stringify(post?.sections)).toContain("call 911");
    expect(JSON.stringify(post?.sections)).toContain("some people can still walk flat-footed");
    expect(JSON.stringify(post?.sections)).toContain("specifically about midportion tendinopathy");
  });
  it("links the article from relevant existing pages", () => {
    const path = "/blog/achilles-pain-back-of-heel";
    expect(physicalTherapyPage.relatedServices.some(l => l.href === path)).toBe(true);
    expect(achillesPage.conditions.some(l => l.href === path)).toBe(true);
  });
  it("keeps all plan-name answers qualified, not blanket participation assertions", () => {
    const insurance = answerGroups.flatMap(g => g.items).filter(i => /insurance plans|Do you accept/.test(i.question));
    expect(insurance.length).toBeGreaterThanOrEqual(7);
    for (const item of insurance) {
      expect(item.answer).toContain("exact plan, provider and service");
      expect(item.answer).toContain("does not establish in-network status");
    }
  });
});
