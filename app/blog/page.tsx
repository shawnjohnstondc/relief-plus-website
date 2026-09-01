import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { blogPosts } from "@/lib/blog-posts";
import { createBlogCollectionStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Patient Education | Relief Plus",
  description: "Explore evidence-informed Relief Plus articles about musculoskeletal conditions, movement, rehabilitation, and treatment decisions.",
  path: "/blog",
});

const clusters = [
  { title: "Spine & Chiropractic", description: "Back, neck, nerve, and movement education.", href: "/chiropractic-adjustments-lafayette" },
  { title: "Rehabilitation & Function", description: "Mobility, strength, and progressive return to activity.", href: "/physical-therapy-lafayette" },
  { title: "Shoulder & Upper Extremity", description: "Shoulder, elbow, and tendon concerns.", href: "/shoulder-pain-lafayette" },
  { title: "Knee, Hip & Lower Extremity", description: "Joint, tendon, and lower-extremity movement concerns.", href: "/knee-pain-lafayette" },
  { title: "TMJ & Headache", description: "Jaw function, head pain, and conservative care.", href: "/tmj-treatment-lafayette" },
  { title: "Advanced Treatment Education", description: "Candidacy, evidence, uncertainties, and alternatives.", href: "/regenerative-cellular-therapy-lafayette" },
  { title: "Injury & Recovery", description: "Education for returning to function after an injury.", href: "/car-accident-injuries-lafayette" },
  { title: "Treatments", description: "Browse the current Relief Plus treatment options.", href: "/services" },
  { title: "All Conditions", description: "Browse the musculoskeletal concerns evaluated at Relief Plus.", href: "/conditions-we-treat" },
] as const;

const latest = [...blogPosts].sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));
const articleClusters = [
  { title: "Back, Neck & Spine", categories: ["Back & Spine", "Spine & Chiropractic", "Spine & Nerve", "Chiropractic Education"] },
  { title: "Headache & TMJ", categories: ["Headache", "TMJ & Headache"] },
  { title: "Shoulder & Upper Extremity", categories: ["Shoulder & Upper Extremity"] },
  { title: "Knee, Hip & Lower Extremity", categories: ["Knee & Lower Extremity", "Hip & Lower Extremity"] },
  { title: "Treatments & Advanced Options", categories: ["Advanced Treatment Education", "Treatment Education"] },
  { title: "Injury, Work & Recovery", categories: ["Injury & Recovery", "Work & Function"] },
  { title: "Physical Therapy & Rehabilitation", categories: ["Rehabilitation & Function", "Movement & Function"] },
  { title: "Local & Acadiana", categories: ["Local & Acadiana"] },
].map((cluster) => ({ ...cluster, posts: blogPosts.filter((post) => cluster.categories.includes(post.category)) }));

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <JsonLd data={createBlogCollectionStructuredData()} />
      <SiteHeader currentPath="/blog" />
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="text-sm text-[#12233f]/65"><Link href="/" className="hover:text-[#82601f]">Home</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Patient Education</span></nav>
          <div className="mt-12 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#82601f]">Relief Plus Journal</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-7xl">Patient education for clearer care decisions.</h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#12233f]/72">Explore practical, evidence-informed guidance about pain, movement, rehabilitation, and advanced treatment options. These resources support—not replace—an individualized examination.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#12233f] px-6 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Featured reading</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {blogPosts.slice(0, 5).map((post, index) => (
              <Link key={post.path} href={post.path} className={`rounded-[2rem] border border-white/10 p-7 transition hover:border-[#d5b765]/70 sm:p-9 ${index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[.65fr_1.35fr] lg:gap-10" : "bg-white/5"}`}>
                <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#d5b765]">{post.category}</p><p className="mt-4 text-sm text-white/55">{new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" }).format(new Date(post.datePublished))}</p></div>
                <div className={index === 0 ? "mt-6 lg:mt-0" : "mt-6"}><h2 className="font-serif text-3xl leading-tight sm:text-4xl">{post.title}</h2><p className="mt-4 text-base leading-7 text-white/70">{post.description}</p><span className="mt-6 block text-sm font-semibold text-[#d5b765]">Read article →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5ef] px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82601f]">Browse the journal</p><h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Articles organized around patient questions.</h2></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {articleClusters.map((cluster) => <section key={cluster.title} className="rounded-[2rem] border border-[#12233f]/10 bg-white/55 p-7 sm:p-9"><h3 className="font-serif text-3xl">{cluster.title}</h3><div className="mt-6 divide-y divide-[#12233f]/10">{cluster.posts.map((post) => <Link key={post.path} href={post.path} className="block py-4 first:pt-0"><span className="font-medium leading-6">{post.title}</span><span className="mt-2 block text-sm text-[#82601f]">Read article →</span></Link>)}</div></section>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82601f]">Explore by topic</p><h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Start with the question that matters to you.</h2></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clusters.map((cluster) => <Link key={cluster.href} href={cluster.href} className="rounded-2xl border border-[#12233f]/10 bg-white/55 p-6 transition hover:border-[#b08d3b]"><h3 className="font-serif text-2xl">{cluster.title}</h3><p className="mt-3 text-sm leading-6 text-[#12233f]/68">{cluster.description}</p><span className="mt-5 block text-sm font-semibold text-[#82601f]">Explore topic →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e5dc] px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82601f]">Latest articles</p><h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Recently published.</h2><p className="mt-5 max-w-md leading-7 text-[#12233f]/68">Dates reflect original publication. Substantively updated articles also show an updated date on the article page.</p></div>
          <div className="mt-10 divide-y divide-[#12233f]/10 lg:mt-0">
            {latest.map((post) => <Link key={post.path} href={post.path} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6"><time dateTime={post.datePublished} className="text-sm text-[#12233f]/60">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" }).format(new Date(post.datePublished))}</time><span><span className="block font-serif text-2xl">{post.title}</span><span className="mt-2 block text-sm text-[#82601f]">Read article →</span></span></Link>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#153e35] px-8 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Individualized care</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Education is the beginning of a good decision.</h2><p className="mt-5 text-lg leading-8 text-white/70">If symptoms are affecting daily life, an examination can help clarify reasonable next steps and alternatives.</p></div><Link href="/contact" className="mt-8 inline-block rounded-full bg-[#d5b765] px-7 py-4 text-sm font-semibold text-[#12233f] lg:mt-0">Contact Relief Plus</Link></div></section>
      <SiteFooter />
    </main>
  );
}
