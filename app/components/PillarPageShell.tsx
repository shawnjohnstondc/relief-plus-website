import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import RelatedServices from "./RelatedServices";
import type { PillarPageData } from "@/lib/pillar-pages";
import SiteHeader from "./SiteHeader";

const pillars = [
  {
    title: "Chiropractic",
    href: "/chiropractic-adjustments-lafayette",
    description: "Joint motion, musculoskeletal evaluation, and function.",
  },
  {
    title: "Physical Therapy",
    href: "/physical-therapy-lafayette",
    description: "Rehabilitation, strength, mobility, and progression.",
  },
  {
    title: "Regenerative Medicine",
    href: "/regenerative-cellular-therapy-lafayette",
    description: "Advanced options considered for appropriate patients.",
  },
] as const;

export default function PillarPageShell({ data }: { data: PillarPageData }) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <SiteHeader currentPath={data.path} />

      <section className="overflow-hidden px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs currentPage={data.breadcrumbLabel} />

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#82601f]">
                {data.eyebrow}
              </p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                {data.h1}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#12233f]/70">
                {data.heroDescription}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:3375654200"
                  className="rounded-full bg-[#12233f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#1a3156]"
                >
                  Call to Schedule
                </a>
                <a
                  href="#what-to-expect"
                  className="rounded-full border border-[#12233f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:border-[#b08d3b] hover:text-[#9a7428]"
                >
                  Learn About This Care
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[#153e35] p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
                Care at Relief Plus
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight">
                The right treatment starts with understanding the problem.
              </h2>
              <div className="mt-8 space-y-5">
                {data.heroPoints.map((point) => (
                  <div
                    key={point}
                    className="border-t border-white/15 pt-5 text-sm leading-6 text-white/72"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#12233f] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
              Why This Approach Matters
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              {data.overviewTitle}
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-white/72">
            {data.overviewParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="what-to-expect" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
              Understanding Your Care
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              {data.serviceTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#12233f]/10 bg-[#12233f]/10 lg:grid-cols-3">
            {data.serviceSteps.map((step, index) => (
              <div key={step.title} className="bg-[#f7f5ef] p-8">
                <p className="text-sm font-semibold text-[#b08d3b]">
                  0{index + 1}
                </p>
                <h3 className="mt-8 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 leading-7 text-[#12233f]/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e5dc] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
              Individualized Evaluation
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              {data.whoTitle}
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-[#12233f]/65">
              {data.whoDescription}
            </p>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-2">
            {data.considerations.map((item) => (
              <div key={item.title} className="border-b border-[#12233f]/15 py-5">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#12233f]/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
              Conditions Commonly Evaluated
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              Care begins with a clear clinical picture.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#12233f]/65">
              {data.conditionsDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.conditions.map((condition) => (
              <Link
                key={condition.href}
                href={condition.href}
                className="rounded-2xl border border-[#12233f]/10 bg-white/55 p-5 font-serif text-lg transition hover:border-[#b08d3b] hover:text-[#9a7428]"
              >
                {condition.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#153e35] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
              One Integrated Clinic
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              Three pillars. One individualized plan.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              {data.approachDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className={`p-8 transition hover:bg-white/10 ${
                  pillar.href === data.path ? "bg-white/10" : "bg-[#153e35]"
                }`}
              >
                <h3 className="font-serif text-2xl">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-white/65">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {data.educationSections?.map((section, sectionIndex) => (
        <section
          key={section.title}
          id={section.id}
          className={`px-6 py-24 lg:px-8 ${
            sectionIndex % 2 === 0 ? "bg-[#f7f5ef]" : "bg-[#e8e5dc]"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
                {section.eyebrow}
              </p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
                {section.title}
              </h2>
            </div>
            <div>
              {section.paragraphs && (
                <div className="space-y-5 text-lg leading-8 text-[#12233f]/70">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              )}
              {section.items && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-[#12233f]/10 bg-white/55 p-6">
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#12233f]/65">{item.description}</p>
                    </article>
                  ))}
                </div>
              )}
              {section.sources && (
                <div className="mt-8 border-t border-[#12233f]/10 pt-5 text-sm text-[#12233f]/60">
                  <span className="font-semibold text-[#12233f]/75">Evidence sources: </span>
                  {section.sources.map((source, index) => (
                    <span key={source.href}>
                      {index > 0 && " · "}
                      <a className="underline decoration-[#b08d3b] underline-offset-4 hover:text-[#9a7428]" href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
              Related Care
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              Treatment options considered in context.
            </h2>
          </div>
          <RelatedServices services={data.relatedServices} />
        </div>
      </section>

      <section className="bg-[#e8e5dc] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">
              Common Questions
            </p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              What patients often ask.
            </h2>
          </div>

          <div>
            {data.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-[#12233f]/15 py-6">
                <summary className="cursor-pointer list-none pr-8 font-serif text-xl marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 max-w-2xl leading-7 text-[#12233f]/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {data.pageSources && (
        <section className="border-t border-[#12233f]/10 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#82601f]">{data.sourcesEyebrow ?? "Selected Clinical Sources"}</p>
            <h2 className="mt-4 font-serif text-3xl">{data.sourcesTitle ?? "Evidence used to inform this patient guide."}</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {data.pageSources.map((source) => (
                <li key={source.href} className="rounded-2xl border border-[#12233f]/10 bg-white/50 p-5">
                  <a href={source.href} target="_blank" rel="noreferrer" className="font-semibold underline decoration-[#b08d3b] underline-offset-4 hover:text-[#9a7428]">{source.label}</a>
                  <p className="mt-2 text-sm leading-6 text-[#12233f]/60">{source.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#12233f] px-7 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
              Ready to Begin?
            </p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              {data.ctaTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              {data.ctaDescription}
            </p>
          </div>
          <a
            href="tel:3375654200"
            className="mt-8 inline-block rounded-full bg-[#d5b765] px-7 py-4 text-sm font-semibold text-[#12233f] lg:mt-0"
          >
            Call 337-565-4200
          </a>
        </div>
      </section>

      <footer className="bg-[#0d1b30] px-6 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-serif text-3xl">
              Relief <span className="text-[#d5b765]">+</span>
            </div>
            <p className="mt-3 text-sm text-white/55">
              Chiropractic · Physical Therapy · Regenerative Medicine
            </p>
          </div>
          <Link href="/" className="text-sm text-white/65 transition hover:text-white">
            Return to homepage
          </Link>
        </div>
      </footer>
    </main>
  );
}
