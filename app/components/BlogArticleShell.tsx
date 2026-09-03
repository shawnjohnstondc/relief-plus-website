import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { createBlogPostingStructuredData } from "@/lib/seo";
import JsonLd from "./JsonLd";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Chicago",
});

export default function BlogArticleShell({ post }: { post: BlogPost }) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <JsonLd
        data={createBlogPostingStructuredData({
          headline: post.title,
          title: post.seoTitle,
          description: post.description,
          path: post.path,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: post.author,
          reviewedBy: post.reviewedBy,
          lastReviewed: post.lastReviewed,
        })}
      />
      <SiteHeader currentPath={post.path} />

      <header className="px-6 pb-16 pt-10 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[#12233f]/65">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#82601f]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-[#82601f]">Patient Education</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#12233f]">{post.category}</li>
            </ol>
          </nav>
          <div className="mt-12 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#82601f]">{post.category}</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-7xl">{post.title}</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#12233f]/75">{post.summary}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#12233f]/10 pt-6 text-sm text-[#12233f]/65">
              {post.author ? <span>Written by <Link href={post.author.href} className="underline decoration-[#b08d3b] underline-offset-4">{post.author.name}</Link></span> : <span>By <Link href="/clinical-standards-editorial-review" className="underline decoration-[#b08d3b] underline-offset-4">Relief Plus Editorial</Link></span>}
              {post.reviewedBy && <span>Reviewed by <Link href={post.reviewedBy.href} className="underline decoration-[#b08d3b] underline-offset-4">{post.reviewedBy.name}</Link></span>}
              {post.lastReviewed && <span>Last reviewed <time dateTime={post.lastReviewed}>{dateFormatter.format(new Date(post.lastReviewed))}</time></span>}
              <span>Published <time dateTime={post.datePublished}>{dateFormatter.format(new Date(post.datePublished))}</time></span>
              <span>Updated <time dateTime={post.dateModified}>{dateFormatter.format(new Date(post.dateModified))}</time></span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-[#e8e5dc] px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <article className="rounded-[2rem] border border-[#12233f]/10 bg-[#f7f5ef] px-7 py-10 sm:px-12 lg:px-16">
            <div className="rounded-2xl border-l-4 border-[#b08d3b] bg-white/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#82601f]">Key takeaway</p>
              <p className="mt-3 text-lg leading-8">{post.summary}</p>
            </div>
            <div className="mt-12 space-y-14">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-[1.05rem] leading-8 text-[#12233f]/78">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 grid gap-3 pl-5 text-[1.02rem] leading-7 text-[#12233f]/75 marker:text-[#82601f]">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <section className="mt-16 border-t border-[#12233f]/10 pt-10" aria-labelledby="sources-heading">
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#82601f]">Selected evidence</p>
              <h2 id="sources-heading" className="mt-3 font-serif text-3xl">Sources and further reading</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#12233f]/70">
                {post.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer" className="font-semibold text-[#12233f] underline decoration-[#b08d3b] underline-offset-4 hover:text-[#82601f]">{source.title}</a>
                    <span className="block">{source.organization}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-6 text-[#12233f]/65">This article provides general education and is not a diagnosis or a substitute for individualized medical advice. Treatment suitability depends on examination findings, health history, goals, and clinical judgment.</p>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6" aria-label="Related Relief Plus resources">
            <div className="rounded-[2rem] bg-[#153e35] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d5b765]">Related care</p>
              <div className="mt-5 space-y-5">
                {post.related.map((item) => (
                  <Link key={item.href} href={item.href} className="block border-t border-white/15 pt-5 first:border-0 first:pt-0">
                    <span className="font-serif text-xl">{item.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-white/70">{item.description}</span>
                    <span className="mt-3 block text-sm font-semibold text-[#d5b765]">Learn more →</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#12233f]/10 bg-white/55 p-7">
              <h2 className="font-serif text-2xl">A question about your symptoms?</h2>
              <p className="mt-3 text-sm leading-6 text-[#12233f]/70">A conversation can help you understand whether an evaluation at Relief Plus is an appropriate next step.</p>
              <a href="tel:3375654200" className="mt-6 inline-block rounded-full bg-[#12233f] px-5 py-3 text-sm font-semibold text-white">Call (337) 565-4200</a>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
