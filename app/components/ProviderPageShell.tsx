import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type ProviderSection = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: Array<{ title: string; description: string }>;
};

type ProviderPageShellProps = {
  path: string;
  name: string;
  role: string;
  location: string;
  introduction: string;
  image: { src: string; alt: string; objectPosition?: string };
  quote?: { text: string; attribution: string };
  sections: ProviderSection[];
  related: Array<{ title: string; description: string; href: string }>;
};

export default function ProviderPageShell({
  path,
  name,
  role,
  location,
  introduction,
  image,
  quote,
  sections,
  related,
}: ProviderPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <SiteHeader currentPath={path} />

      <section className="overflow-hidden px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs currentPage={name} />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#82601f]">Relief Plus Provider</p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-7xl">{name}</h1>
              <p className="mt-6 font-serif text-2xl text-[#153e35]">{role}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[.18em] text-[#82601f]">{location}</p>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#12233f]/72">{introduction}</p>
            </div>
            <figure className="overflow-hidden rounded-[2rem] border border-[#12233f]/10 bg-[#153e35]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: image.objectPosition ?? "center" }}
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {quote && (
        <section className="bg-[#12233f] px-6 py-20 text-white lg:px-8">
          <blockquote className="mx-auto max-w-5xl text-center">
            <span aria-hidden="true" className="font-serif text-6xl leading-none text-[#d5b765]">“</span>
            <p className="mx-auto -mt-2 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl">{quote.text}</p>
            <footer className="mt-7 text-sm font-semibold text-[#d5b765]">— {quote.attribution}</footer>
          </blockquote>
        </section>
      )}

      {sections.map((section, index) => (
        <section key={section.title} className={`px-6 py-20 lg:px-8 lg:py-24 ${index % 2 === 0 ? "bg-[#e8e5dc]" : "bg-[#f7f5ef]"}`}>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#82601f]">{section.eyebrow}</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">{section.title}</h2>
            </div>
            <div>
              {section.paragraphs && <div className="space-y-5 text-lg leading-8 text-[#12233f]/72">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              {section.items && <div className={`${section.paragraphs ? "mt-9" : ""} grid gap-4 sm:grid-cols-2`}>{section.items.map((item) => <article key={item.title} className="rounded-2xl border border-[#12233f]/10 bg-white/60 p-6"><h3 className="font-serif text-xl">{item.title}</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#12233f]/68">{item.description}</p></article>)}</div>}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#153e35] px-6 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Explore Relief Plus</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl sm:text-5xl">Related care and clinic information.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <Link key={item.href} href={item.href} className="bg-[#153e35] p-7 transition hover:bg-white/10"><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p><span className="mt-5 block text-sm font-semibold text-[#d5b765]">Learn more →</span></Link>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#12233f] px-8 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Contact Relief Plus</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Start with a conversation about what is limiting you.</h2><p className="mt-5 text-lg leading-8 text-white/70">Call the clinic to discuss the appropriate place to begin. Relief Plus does not use online scheduling.</p></div>
          <a href="tel:+13375654200" className="mt-8 inline-block rounded-full bg-[#d5b765] px-7 py-4 text-sm font-semibold text-[#12233f] lg:mt-0">Call (337) 565-4200</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
