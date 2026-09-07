import type { BlogParagraph, BlogPost } from "./blog-posts";

export const defaultArticleDisclaimer = "This article provides general education and is not a diagnosis or a substitute for individualized medical advice. Treatment suitability depends on examination findings, health history, goals, and clinical judgment.";

function paragraphText(value: BlogParagraph): string {
  return typeof value === "string" ? value : value.map((part) => typeof part === "string" ? part : part.text).join("");
}

/** Estimate from the prose actually rendered, including lists, comparisons and caveats. */
export function calculateReadTime(post: BlogPost): string {
  const text = [
    post.title, post.summary, post.takeaway, post.scopeNote,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs.map(paragraphText), ...(section.bullets ?? []).map(paragraphText), ...(section.numbered ?? []).map(paragraphText)]),
    post.comparison?.heading, post.comparison?.introduction,
    ...(post.comparison?.columns.flatMap((column) => [column.title, ...column.items]) ?? []),
    post.comparison?.disclaimer, post.nextStep, post.reviewNote, post.disclaimer ?? defaultArticleDisclaimer,
  ].filter(Boolean).join(" ");
  return `${Math.max(1, Math.ceil(text.split(/\s+/u).length / 200))} min read`;
}
