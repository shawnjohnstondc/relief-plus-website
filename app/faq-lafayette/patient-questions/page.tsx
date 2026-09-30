import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import { answerGroups, libraryPath } from '@/lib/site-answers/library';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Patient Questions & Answers',
  description: 'Specific answers about Relief Plus hours, first visits, insurance, treatments and care for common muscle, joint and nerve concerns.',
  path: libraryPath,
});

export default function PatientQuestionsPage() {
  return <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
    <SiteHeader currentPath={libraryPath} />
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <Link href="/faq-lafayette" className="text-sm text-[#82601f] underline underline-offset-4">← Frequently asked questions</Link>
      <h1 className="mt-8 font-serif text-5xl tracking-tight sm:text-6xl">A little more detail.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[#12233f]/75">Practical answers about visiting Relief Plus, your care options and what to expect. Choose a topic or browse the questions below.</p>
      <nav aria-label="Question topics" className="my-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#12233f]/15 py-6">
        {answerGroups.map(group => <a key={group.id} href={`#${group.id}`} className="text-sm underline underline-offset-4">{group.title}</a>)}
      </nav>
      {answerGroups.map(group => <section id={group.id} key={group.id} className="scroll-mt-24 py-10">
        <h2 className="mb-8 font-serif text-3xl sm:text-4xl">{group.title}</h2>
        <div className="divide-y divide-[#12233f]/15">
          {group.items.map((item, index) => <article key={item.question} id={`${group.id}-${index + 1}`} className="scroll-mt-24 py-7">
            <h3 data-answer-questions={JSON.stringify(item.aliases)} className="text-lg font-semibold leading-7">{item.question}</h3>
            {item.answer.split('\n\n').map(paragraph => <p key={paragraph} className="mt-3 max-w-3xl leading-7 text-[#12233f]/80">{paragraph}</p>)}
            <div className="mt-3"><Link href={item.source} className="text-xs text-[#82601f] underline underline-offset-4">More detail</Link></div>
          </article>)}
        </div>
      </section>)}
    </div>
    <SiteFooter />
  </main>;
}
