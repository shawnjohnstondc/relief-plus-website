import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import { conditions, conditionLibraryPath, conditionQuestions } from '@/lib/site-answers/condition-library';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Condition Library: Patient Questions & Answers',
  description: 'Plain-language explanations of 61 muscle, joint and nerve conditions, including common symptoms and general approaches to care.',
  path: conditionLibraryPath,
});

export default function ConditionLibraryPage() {
  return <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
    <SiteHeader currentPath={conditionLibraryPath} />
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <Link href="/faq-lafayette/patient-questions" className="text-sm text-[#82601f] underline underline-offset-4">Patient questions & answers</Link>
      <h1 className="mt-8 font-serif text-5xl tracking-tight sm:text-6xl">Conditions, explained.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#12233f]/75">Clear answers about what a condition means, how it may feel and how care is usually approached.</p>
      <p className="mt-4 max-w-2xl leading-7 text-[#12233f]/75">These are general explanations, not a diagnosis or a list of services offered here. Your examination determines which care is appropriate. For Relief Plus services, see our <Link href="/services" className="underline underline-offset-4">treatment pages</Link>.</p>
      <nav aria-label="Conditions in this library" className="my-10 grid gap-x-8 gap-y-3 border-y border-[#12233f]/15 py-6 sm:grid-cols-2">
        {conditions.map(condition => <a key={condition.id} href={`#${condition.id}`} className="text-sm leading-6 underline underline-offset-4">{condition.title}</a>)}
      </nav>
      {conditions.map(condition => <section key={condition.id} id={condition.id} className="scroll-mt-24 border-b border-[#12233f]/15 py-10">
        <h2 className="mb-7 font-serif text-3xl sm:text-4xl">{condition.title}</h2>
        {conditionQuestions(condition).map(item => <article key={item.id} className="py-5">
          <h3 id={item.id} data-answer-questions={JSON.stringify(item.aliases)} className="scroll-mt-24 text-lg font-semibold leading-7">{item.question}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#12233f]/80">
            {item.answer.split(/(?<=\.)\s+(?=[A-Z])/).map(sentence => <li key={sentence}>{sentence}</li>)}
          </ul>
        </article>)}
      </section>)}
      <aside className="mt-12 text-sm leading-7 text-[#12233f]/70" aria-label="About these explanations">
        <strong>About these explanations</strong>
        <div>Adapted from the clinic-provided Condition Reference, AC Joint Sprain through Lumbar Spondylolisthesis — Type III Degenerative. Brief or cross-reference entries draw on related sections. Written in patient-friendly language September 30, 2026.</div>
        <div className="mt-3">Additional patient information: <a className="underline" href="https://www.nhs.uk/conditions/cervical-spondylosis/">NHS: cervical spondylosis</a>; <a className="underline" href="https://www.nhs.uk/conditions/osteoarthritis/treatment/">NHS: osteoarthritis</a>; <a className="underline" href="https://www.nhs.uk/conditions/spondylolisthesis/">NHS: spondylolisthesis</a>; <a className="underline" href="https://www.nhs.uk/conditions/vertigo/">NHS: vertigo</a>; <a className="underline" href="https://www.orthoinfo.org/diseases--conditions/carpal-tunnel-syndrome/">AAOS: carpal tunnel syndrome</a>.</div>
      </aside>
    </div>
    <SiteFooter />
  </main>;
}
