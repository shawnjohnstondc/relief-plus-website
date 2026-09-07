import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { createConditionsCollectionStructuredData, createPageMetadata } from "@/lib/seo";
import SiteHeader from "@/app/components/SiteHeader";

const path = "/conditions-we-treat";
const description = "Explore musculoskeletal conditions evaluated at Relief Plus in Lafayette, serving Carencro and Acadiana with individualized, evidence-informed care.";
export const metadata = createPageMetadata({ title: "Conditions We Treat in Lafayette, LA", description, path });

const groups = [
  { title: "Spine, nerve, and headache concerns", items: [["Back Pain", "/back-pain-lafayette"], ["Neck Pain", "/neck-pain-lafayette"], ["Sciatica", "/sciatica-treatment-lafayette"], ["Herniated Disc", "/herniated-disc-lafayette"], ["Pinched Nerve", "/pinched-nerve-lafayette"], ["SI Joint Pain", "/si-joint-pain-lafayette"], ["Headaches", "/headache-treatment-lafayette"], ["TMJ / Jaw Pain", "/tmj-treatment-lafayette"]] },
  { title: "Joint and soft-tissue concerns", items: [["Shoulder Pain", "/shoulder-pain-lafayette"], ["Rotator Cuff Pain", "/rotator-cuff-pain-lafayette"], ["Frozen Shoulder", "/frozen-shoulder-lafayette"], ["Knee Pain", "/knee-pain-lafayette"], ["Knee Osteoarthritis", "/knee-osteoarthritis-lafayette"], ["Hip Pain", "/hip-pain-lafayette"], ["Hip Bursitis / GTPS", "/hip-bursitis-lafayette"], ["Tennis Elbow", "/tennis-elbow-lafayette"], ["Achilles Tendinopathy", "/achilles-tendinopathy-lafayette"], ["Plantar Fasciitis", "/plantar-fasciitis-lafayette"], ["Tendonitis", "/tendonitis-treatment-lafayette"]] },
  { title: "Injury-related concerns", items: [["Sports Injuries", "/sports-injuries-lafayette"], ["Car Accident Injuries", "/car-accident-injuries-lafayette"], ["Work Injuries", "/work-injury-lafayette"]] },
] as const;

export default function ConditionsPage() {
  return <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
    <JsonLd data={createConditionsCollectionStructuredData()} />
    <SiteHeader currentPath={path} />
    <section className="px-6 py-16 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><Breadcrumbs currentPage="Conditions We Treat" /><div className="mt-12 max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9a7428]">Musculoskeletal Care in Acadiana</p><h1 className="mt-6 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">Conditions we evaluate and treat at Relief Plus.</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-[#12233f]/70">Start with the area that hurts or a condition you want to understand. Each guide explains common symptoms, what an assessment may involve, and when to seek more help. You do not need a diagnosis before calling us; these pages can help you prepare for a visit.</p></div></div></section>
    <section className="bg-[#12233f] px-6 py-24 text-white lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="font-serif text-4xl sm:text-5xl">Find the concern you want to understand.</h2><div className="mt-12 grid gap-6 lg:grid-cols-3">{groups.map(group => <section key={group.title} className="rounded-3xl border border-white/10 bg-white/5 p-7"><h3 className="font-serif text-2xl text-[#d5b765]">{group.title}</h3><ul className="mt-6 space-y-3">{group.items.map(([title, href]) => <li key={href}><Link href={href} className="block border-b border-white/10 py-3 text-white/75 transition hover:text-white">{title} →</Link></li>)}</ul></section>)}</div></div></section>
    <section className="px-6 py-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9a7428]">One Individualized Plan</p><h2 className="mt-5 font-serif text-4xl sm:text-5xl">Explore the care that may fit.</h2><p className="mt-6 leading-7 text-[#12233f]/65">Your examination, goals, and previous care help guide the choice. You may need one service, a combination, or a referral for a different kind of care.</p></div><div className="grid gap-3">{[["Chiropractic", "/chiropractic-adjustments-lafayette"], ["Physical Therapy", "/physical-therapy-lafayette"], ["Regenerative Medicine", "/regenerative-cellular-therapy-lafayette"]].map(([title, href]) => <Link key={href} href={href} className="rounded-2xl border border-[#12233f]/10 p-6 font-serif text-2xl transition hover:border-[#b08d3b]">{title} →</Link>)}</div></div></section>
  </main>;
}
