import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import { createFaqStructuredData, createPageMetadata, createServiceStructuredData } from "@/lib/seo";
import SiteHeader from "@/app/components/SiteHeader";

const path = "/chiropractor-carencro-la";
const description = "Chiropractic care and physical therapy serving Carencro, just across the street from the city boundary at 112 Arabian Dr., Lafayette. Call 337-565-4200.";
const directions = "https://www.google.com/maps/dir/?api=1&destination=112%20Arabian%20Dr.%2C%20Lafayette%2C%20LA%2070507";
export const metadata = createPageMetadata({ title: "Chiropractor & Physical Therapy Serving Carencro, LA", description, path });

const services = [
  { title: "Chiropractic care", copy: "Dr. Shawn D. Johnston, D.C., evaluates muscle, joint, and movement concerns and discusses whether adjustments or other conservative care fit your needs.", href: "/chiropractic-adjustments-lafayette" },
  { title: "Physical therapy", copy: "Jeanne Saucier, PT, guides rehabilitation focused on mobility, strength, and the activities you want to return to at home, work, or in sport.", href: "/physical-therapy-lafayette" },
  { title: "Selected medical options", copy: "Regenerative medicine options are considered under Dr. Ashton Reed’s medical oversight, with a discussion of candidacy, evidence, risks, and alternatives.", href: "/regenerative-cellular-therapy-lafayette" },
];
const concerns = [
  ["Back pain", "/back-pain-lafayette"], ["Neck pain", "/neck-pain-lafayette"],
  ["Sciatica", "/sciatica-treatment-lafayette"], ["Shoulder pain", "/shoulder-pain-lafayette"],
  ["Knee pain", "/knee-pain-lafayette"], ["Hip pain", "/hip-pain-lafayette"],
  ["Car accident injuries", "/car-accident-injuries-lafayette"], ["Work injuries", "/work-injury-lafayette"],
];
const faqs = [
  { question: "Is Relief Plus in Carencro or Lafayette?", answer: "Our address is 112 Arabian Dr., Lafayette, LA 70507. Carencro is directly across the street, so we are located right by the Lafayette–Carencro boundary and serve patients from both communities. Use the Arabian Drive address when getting directions." },
  { question: "Do I need to choose a treatment before calling?", answer: "No. Tell us what hurts, when it began, and which activities are difficult. Your history and examination help determine whether chiropractic care, physical therapy, a selected medical option, or a referral is appropriate." },
  { question: "Do I need a referral?", answer: "No referral is needed to see Dr. Johnston or Dr. Reed. For physical therapy, Relief Plus can coordinate the referral or plan-of-care process when required. Insurance authorization and other payer requirements vary; call before your visit to confirm what applies." },
  { question: "Which insurance plans do you accept?", answer: "Relief Plus currently accepts Medicare, Blue Cross and Blue Shield (BCBS), UnitedHealthcare, VA, Verity, and Healthy Blue. Benefits, authorization, and your share of the cost depend on your plan and the service. Acceptance does not mean every treatment is covered. Call with your insurance information so the team can help you understand the next step." },
  { question: "What should I bring to my first visit?", answer: "Bring your photo ID, insurance information if applicable, a medication list, and relevant imaging reports or records you already have. Be ready to describe prior care and what you hope to get back to doing. Call if you need help arranging records or confirming paperwork." },
  { question: "What are your hours, and how do I schedule?", answer: "Call 337-565-4200 to schedule. Published hours are Monday and Wednesday, 7:00 AM–4:00 PM, and Tuesday and Thursday, 8:30 AM–4:00 PM. We remain open through lunch and are closed Friday through Sunday. Call to confirm holiday hours or temporary changes." },
];

export default function CarencroPage() {
  return <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
    <JsonLd data={createServiceStructuredData({ name: "Chiropractic care and physical therapy serving Carencro", description, path })} />
    <JsonLd data={createFaqStructuredData(faqs)} />
    <SiteHeader />
    <section className="px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs currentPage="Chiropractor Serving Carencro" />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#9a7428]">Right by Carencro. Here for you.</p>
            <h1 className="mt-6 font-serif text-5xl leading-tight tracking-tight sm:text-6xl">Chiropractic care &amp; physical therapy serving Carencro.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#12233f]/75">You do not have to head across Lafayette to visit Relief Plus. Carencro is directly across the street from our clinic at 112 Arabian Dr., Lafayette, LA 70507.</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#12233f]/75">If back, neck, or joint pain is making your day harder, start with a conversation and an examination. We will help you understand your options and the next step.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:+13375654200" className="rounded-full bg-[#12233f] px-6 py-3 text-sm font-semibold text-white">Call 337-565-4200</a>
              <a href={directions} className="rounded-full border border-[#12233f]/25 px-6 py-3 text-sm font-semibold">Get directions →</a>
            </div>
          </div>
          <aside className="rounded-[2rem] bg-[#153e35] p-8 text-white sm:p-10">
            <h2 className="font-serif text-3xl">Your visit, close to home.</h2>
            <address className="mt-6 text-lg not-italic leading-8">Relief Plus<br />112 Arabian Dr.<br />Lafayette, LA 70507</address>
            <p className="mt-5 leading-7 text-white/80">Our address is Lafayette; our neighbors across the street are in Carencro. Use the address above for navigation to the clinic.</p>
            <dl className="mt-7 space-y-4 border-t border-white/20 pt-6 text-sm">
              <div><dt className="font-semibold">Monday &amp; Wednesday</dt><dd className="mt-1 text-white/80">7:00 AM–4:00 PM</dd></div>
              <div><dt className="font-semibold">Tuesday &amp; Thursday</dt><dd className="mt-1 text-white/80">8:30 AM–4:00 PM</dd></div>
              <div><dt className="font-semibold">Friday–Sunday</dt><dd className="mt-1 text-white/80">Closed</dd></div>
            </dl>
            <p className="mt-6 text-sm leading-6 text-white/80">Open through lunch. Call to schedule and confirm holiday hours.</p>
          </aside>
        </div>
      </div>
    </section>

    <section className="bg-[#12233f] px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Care for Carencro and Acadiana</p>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl sm:text-5xl">Find the care that fits your concern.</h2>
        <p className="mt-6 max-w-3xl leading-7 text-white/80">You do not need to know your diagnosis or request a particular procedure. An assessment helps us explain which services may fit, whether care should be coordinated, and when another provider is needed.</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3">
          {services.map(({ title, copy, href }) => <Link key={href} href={href} className="bg-[#12233f] p-8 transition hover:bg-[#1b3153]"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-4 leading-7 text-white/80">{copy}</p><span className="mt-6 inline-block text-sm font-semibold text-[#d5b765]">Explore care →</span></Link>)}
        </div>
        <Link href="/team" className="mt-8 inline-block underline underline-offset-4">Meet the Relief Plus team →</Link>
      </div>
    </section>

    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9a7428]">Your first visit</p>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Start with what pain is keeping you from doing.</h2>
          <p className="mt-6 leading-7 text-[#12233f]/75">Maybe it is getting through a work shift, sitting comfortably in the car, sleeping, or keeping up with family. Those details matter as much as where it hurts.</p>
          <ol className="mt-8 space-y-6">
            <li><h3 className="text-lg font-semibold">1. Tell us your story.</h3><p className="mt-2 leading-7 text-[#12233f]/75">We discuss how symptoms began, what changes them, your health history, and care you have already tried.</p></li>
            <li><h3 className="text-lg font-semibold">2. Understand the findings.</h3><p className="mt-2 leading-7 text-[#12233f]/75">The examination guides a discussion of what may be contributing and whether further evaluation is needed.</p></li>
            <li><h3 className="text-lg font-semibold">3. Agree on the next step.</h3><p className="mt-2 leading-7 text-[#12233f]/75">We explain reasonable options and what progress might look like in your daily activities. You can ask questions before deciding on care.</p></li>
          </ol>
          <Link href="/our-approach" className="mt-8 inline-block font-semibold underline underline-offset-4">Learn about our approach →</Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image src="/dr-shawn-johnston-patient-consultation.png" alt="Shawn D. Johnston, D.C., listening to a patient at Relief Plus" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>

    <section className="border-y border-[#12233f]/10 bg-white/50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9a7428]">Common concerns</p>
        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Explore what brings you in.</h2>
        <p className="mt-6 max-w-3xl leading-7 text-[#12233f]/75">These guides explain common symptoms and how an evaluation can help. Your treatment depends on your examination, health history, and goals.</p>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{concerns.map(([label, href]) => <Link key={href} href={href} className="rounded-xl border border-[#12233f]/15 p-5 font-semibold transition hover:border-[#9a7428]">{label} →</Link>)}</div>
        <p className="mt-8 max-w-3xl leading-7 text-[#12233f]/75">Depending on the findings, we may discuss options such as <Link className="underline underline-offset-4" href="/dry-needling-lafayette">dry needling</Link>, <Link className="underline underline-offset-4" href="/spinal-decompression-lafayette">spinal decompression</Link>, <Link className="underline underline-offset-4" href="/class-iv-laser-therapy-lafayette">Class IV laser therapy</Link>, or <Link className="underline underline-offset-4" href="/shockwave-therapy-lafayette">shockwave therapy</Link>. Each has its own role and limitations; every patient does not need every service.</p>
      </div>
    </section>

    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9a7428]">Before you visit</p>
        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Questions from Carencro patients.</h2>
        <div className="mt-10 divide-y divide-[#12233f]/15">{faqs.map(({ question, answer }) => <div key={question} className="py-7"><h3 className="text-xl font-semibold">{question}</h3><p className="mt-3 leading-7 text-[#12233f]/75">{answer}</p></div>)}</div>
        <Link href="/faq-lafayette" className="mt-5 inline-block font-semibold underline underline-offset-4">More patient questions →</Link>
      </div>
    </section>

    <section className="bg-[#153e35] px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#d5b765]">Relief Plus · Lafayette &amp; Carencro</p>
        <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Let’s talk about your next step.</h2>
        <p className="mt-6 text-lg leading-8 text-white/80">Call to arrange a visit or ask our team about getting started.<br />112 Arabian Dr., Lafayette, LA 70507</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><a href="tel:+13375654200" className="rounded-full bg-[#d5b765] px-7 py-4 font-semibold text-[#12233f]">Call 337-565-4200</a><a href={directions} className="rounded-full border border-white/40 px-7 py-4 font-semibold">Get directions →</a></div>
        <Link href="/contact" className="mt-8 inline-block text-sm underline underline-offset-4">Contact and clinic information</Link>
      </div>
    </section>
  </main>;
}
