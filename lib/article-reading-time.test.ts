import { describe, expect, it } from "vitest";
import { calculateReadTime } from "./article-reading-time";
import { blogPosts, type BlogPost } from "./blog-posts";

const draft: BlogPost = {
  slug: "reading-time", path: "/blog/reading-time", title: "", seoTitle: "", description: "", category: "",
  summary: "", takeaway: "", nextStep: "", datePublished: "2026-09-07", readTime: "99 min read", sections: [], related: [], sources: [], disclaimer: "",
};

describe("article reading estimates", () => {
  it("rounds up with a one-minute minimum", () => {
    expect(calculateReadTime(draft)).toBe("1 min read");
    expect(calculateReadTime({ ...draft, summary: Array(201).fill("word").join(" ") })).toBe("2 min read");
  });
  it("counts linked prose, lists and comparisons rather than URL lengths or source titles", () => {
    expect(calculateReadTime({ ...draft,
      sections: [{ heading: "", paragraphs: [[{ text: Array(100).fill("word").join(" "), href: "https://example.com" }]], bullets: [Array(50).fill("word").join(" ")], numbered: [Array(50).fill("word").join(" ")] }],
      comparison: { heading: "comparison", introduction: "", columns: [], disclaimer: "" },
      sources: [{ title: Array(1000).fill("word").join(" "), organization: "source", href: "https://example.com" }],
    })).toBe("2 min read");
  });
  it("supplies distinct takeaways and next steps for the full article collection", () => {
    expect(blogPosts).toHaveLength(50);
    for (const post of blogPosts) {
      expect(post.takeaway.trim().length).toBeGreaterThan(20);
      expect(post.takeaway).not.toBe(post.summary);
      expect(post.nextStep.trim().length).toBeGreaterThan(20);
      expect(post.readTime).toBe(calculateReadTime(post));
    }
  });
});
