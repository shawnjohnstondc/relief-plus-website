import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleShell from "@/app/components/BlogArticleShell";
import { blogPosts, blogPostsBySlug } from "@/lib/blog-posts";
import { createArticleMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsBySlug.get(slug);
  if (!post) return {};

  return createArticleMetadata({
    title: post.seoTitle,
    description: post.description,
    path: post.path,
    datePublished: post.datePublished,
    ...(post.dateModified ? { dateModified: post.dateModified } : {}),
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsBySlug.get(slug);
  if (!post) notFound();

  return <BlogArticleShell post={post} />;
}
