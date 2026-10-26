import { describe, expect, it } from "vitest";
import { blogPosts, blogPostsBySlug } from "./blog-posts";
import { physicalTherapyPage } from "./pillar-pages";
import { sportsInjuriesPage } from "./sports-injuries-page";

describe("approved October 26 patient education", () => {
  it("registers the ankle article once with sources and no unverified clinician credit", () => {
    const post = blogPostsBySlug.get("ankle-sprain-when-to-get-checked");
    expect(post).toBeDefined();
    expect(blogPosts.filter((p) => p.slug === post?.slug)).toHaveLength(1);
    expect(post?.category).toBe("Injury & Recovery");
    expect(post?.sources).toHaveLength(4);
    expect(post?.datePublished).toMatch(/^2026-10-26/);
    expect(post?.reviewedBy).toBeUndefined();
    expect(post?.lastReviewed).toBeUndefined();
    expect(JSON.stringify(post?.sections)).toContain("emergency department");
    expect(JSON.stringify(post?.sections)).toContain("not a do-it-yourself clearance test");
  });
  it("links the guide from the sports and physical therapy pages", () => {
    for (const page of [physicalTherapyPage, sportsInjuriesPage]) {
      expect(page.relatedServices.filter((link) => link.href === "/blog/ankle-sprain-when-to-get-checked")).toHaveLength(1);
    }
  });
  it("uses the approved patient-facing plantar teaser without changing its legacy URL", () => {
    const post = blogPostsBySlug.get("the-effectiveness-of-dry-needling-for-plantar-fasciitis-insights-by-dr-shawn-d-johnston-at-relief-plus");
    expect(post?.description).toBe("Learn how dry needling may fit into plantar heel pain care, what evidence shows, and why exercise and load management remain important.");
    expect(post?.datePublished).toBe("2024-03-21T08:14:39-05:00");
  });
});
