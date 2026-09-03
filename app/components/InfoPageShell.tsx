import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export type InfoSection = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: Array<{ title: string; description: string; href?: string; actionLabel?: string; portrait?: string; role?: string }>;
};

type InfoPageShellProps = {
  path: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  heroPoints?: string[];
  sections: InfoSection[];
  cta?: { title: string; description: string };
  children?: React.ReactNode;
};

export default function InfoPageShell({ path, breadcrumbLabel, eyebrow, title, description, heroPoints, sections, cta, children }: InfoPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <SiteHeader currentPath={path} />
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs currentPage={breadcrumbLabel} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#82601f]">{eyebrow}</p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-7xl">{title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#12233f]/70">{description}</p>
            </div>
            {heroPoints && <aside className="rounded-[2rem] bg-[#153e35] p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Relief Plus</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">Care organized around what you need.</h2>
              <div className="mt-8 space-y-5">{heroPoints.map((point) => <p key={point} className="border-t border-white/15 pt-5 text-sm leading-6 text-white/72">{point}</p>)}</div>
            </aside>}
          </div>
        </div>
      </section>
      {sections.map((section, index) => (
        <section key={section.title} className={`px-6 py-20 lg:px-8 lg:py-24 ${index % 3 === 0 ? "bg-[#12233f] text-white" : index % 3 === 1 ? "bg-[#e8e5dc]" : "bg-[#f7f5ef]"}`}>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div><p className={`text-xs font-semibold uppercase tracking-[.25em] ${index % 3 === 0 ? "text-[#d5b765]" : "text-[#82601f]"}`}>{section.eyebrow}</p><h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">{section.title}</h2></div>
            <div>
              {section.paragraphs && <div className={`space-y-5 text-lg leading-8 ${index % 3 === 0 ? "text-white/72" : "text-[#12233f]/70"}`}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              {section.items && <div className="mt-8 grid gap-4 sm:grid-cols-2">{section.items.map((item) => {
                const content = <>{item.portrait && <div aria-hidden="true" className={`mb-6 flex aspect-[4/3] items-end rounded-xl p-5 ${index % 3 === 0 ? "bg-[#0d1b30]" : "bg-[#153e35]"}`}><span className="font-serif text-5xl text-[#d5b765]">{item.portrait}</span></div>}{item.role && <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[.2em] ${index % 3 === 0 ? "text-[#d5b765]" : "text-[#82601f]"}`}>{item.role}</p>}<h3 className="font-serif text-xl">{item.title}</h3><p className={`mt-3 whitespace-pre-line text-sm leading-6 ${index % 3 === 0 ? "text-white/65" : "text-[#12233f]/65"}`}>{item.description}</p>{item.href && <span className={`mt-5 block text-sm font-semibold ${index % 3 === 0 ? "text-[#d5b765]" : "text-[#82601f]"}`}>{item.actionLabel ?? "Learn more"} →</span>}</>;
                const classes = `rounded-2xl border p-6 transition focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#b08d3b] ${index % 3 === 0 ? "border-white/10 bg-white/5" : "border-[#12233f]/10 bg-white/55"}`;
                if (!item.href) return <article key={item.title} className={classes}>{content}</article>;
                return item.href.startsWith("/")
                  ? <Link key={item.title} href={item.href} className={`${classes} hover:border-[#b08d3b]`}>{content}</Link>
                  : <a key={item.title} href={item.href} className={`${classes} hover:border-[#b08d3b]`}>{content}</a>;
              })}</div>}
            </div>
          </div>
        </section>
      ))}
      {children}
      {cta && <section className="px-6 py-20 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#153e35] px-8 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Ready to Begin?</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">{cta.title}</h2><p className="mt-5 text-lg leading-8 text-white/70">{cta.description}</p></div><a href="tel:+13375654200" className="mt-8 inline-block rounded-full bg-[#d5b765] px-7 py-4 text-sm font-semibold text-[#12233f] lg:mt-0">Call 337-565-4200</a></div></section>}
      <SiteFooter />
    </main>
  );
}
