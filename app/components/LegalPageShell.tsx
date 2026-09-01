import Breadcrumbs from "./Breadcrumbs";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };

export default function LegalPageShell({ path, title, description, notice, sections }: { path: string; title: string; description: string; notice?: string; sections: LegalSection[] }) {
  return <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]"><SiteHeader currentPath={path} /><section className="px-6 py-16 lg:px-8 lg:py-20"><div className="mx-auto max-w-5xl"><Breadcrumbs currentPage={title} /><p className="mt-12 text-xs font-semibold uppercase tracking-[.28em] text-[#9a7428]">Patient Information</p><h1 className="mt-6 font-serif text-5xl tracking-tight sm:text-6xl">{title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-[#12233f]/70">{description}</p>{notice && <p className="mt-10 rounded-2xl border border-[#b08d3b]/35 bg-[#e8e5dc] p-6 font-semibold leading-7">{notice}</p>}</div></section><section className="border-t border-[#12233f]/10 px-6 pb-24 lg:px-8"><article className="mx-auto max-w-5xl">{sections.map((section) => <section key={section.title} className="border-b border-[#12233f]/10 py-10"><h2 className="font-serif text-3xl">{section.title}</h2>{section.paragraphs && <div className="mt-5 space-y-4 leading-7 text-[#12233f]/72">{section.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>}{section.items && <ul className="mt-5 space-y-3 pl-5 leading-7 text-[#12233f]/72">{section.items.map((item) => <li key={item} className="list-disc pl-1">{item}</li>)}</ul>}</section>)}</article></section><SiteFooter /></main>;
}
