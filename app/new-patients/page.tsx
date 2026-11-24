import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import JsonLd from "@/app/components/JsonLd";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { vaCommunityCareFaq, vaCommunityCareFaqAnchor } from "@/lib/nov23-patient-answers";
import { chiropracticReferralGuidance, physicalTherapyReferralGuidance } from "@/lib/referral-guidance";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

const path = "/new-patients" as const;
const directions = "https://www.google.com/maps/dir/?api=1&destination=112%20Arabian%20Dr.%2C%20Lafayette%2C%20LA%2070507";
const textLink = "font-semibold text-[#6b4e17] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4";
const callButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#12233f] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#1a3156] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12233f]";

export const metadata = createPageMetadata({
  title: "New Patients: Start Here",
  description: "Plan your first visit to Relief Plus in Lafayette. Learn what to bring, how referrals and costs work, and how to schedule by phone.",
  path,
});

export default function NewPatientsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      <JsonLd data={createBreadcrumbStructuredData(path, "New Patients")} />
      <SiteHeader currentPath={path} />

      <div className="mx-auto max-w-4xl px-5 pb-16 pt-7 sm:px-8 sm:pt-10">
        <Breadcrumbs currentPage="New Patients" />

        <header className="mt-8 max-w-2xl sm:mt-12">
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">New Patients: Start Here</h1>
          <p className="mt-4 text-base leading-7 text-[#12233f]/80 sm:text-lg">
            Not sure whether you need chiropractic care or physical therapy? You don’t have to decide before you call. Tell us what’s getting in your way, and we’ll help you figure out where to start.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+13375654200" className={callButton}>Call to schedule: 337-565-4200</a>
            <a href={directions} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#12233f]/25 px-6 py-3 text-sm font-semibold hover:border-[#82601f] focus-visible:outline-2 focus-visible:outline-offset-4">
              Get directions
            </a>
          </div>
          <p className="mt-3 text-sm text-[#12233f]/80">112 Arabian Dr., Lafayette, LA 70507</p>
        </header>

        <div className="mt-10 space-y-8 border-t border-[#12233f]/15 pt-8 sm:mt-12">
          <section aria-labelledby="first-visit">
            <h2 id="first-visit" className="font-serif text-2xl sm:text-3xl">What happens at my first visit?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#12233f]/80">
              We’ll talk about your symptoms, health history, past care and what you want to get back to. Then we’ll examine what’s relevant, such as movement and nerve function. If it’s safe and appropriate, treatment can start at the first visit. An adjustment isn’t automatic.
            </p>
          </section>

          <section aria-labelledby="what-to-bring">
            <h2 id="what-to-bring" className="font-serif text-2xl sm:text-3xl">What should I bring?</h2>
            <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 leading-7 text-[#12233f]/80">
              <li>A list of your medications and notes about symptoms or previous care.</li>
              <li>Your insurance information if you’d like us to check your plan.</li>
              <li>If you already have outside X-rays or an MRI, let us know when you call. We’ll explain how to bring or share the images and report. Don’t send private records by ordinary email or through Ask Anything.</li>
            </ul>
          </section>

          <section aria-labelledby="referrals">
            <h2 id="referrals" className="font-serif text-2xl sm:text-3xl">Do I need a referral?</h2>
            <dl className="mt-4 max-w-3xl divide-y divide-[#12233f]/15 rounded-2xl border border-[#12233f]/15 bg-white/60 px-5">
              <div className="py-4">
                <dt className="font-semibold">Chiropractic</dt>
                <dd className="mt-1 leading-7 text-[#12233f]/80">{chiropracticReferralGuidance}</dd>
              </div>
              <div className="py-4">
                <dt className="font-semibold">Physical therapy</dt>
                <dd className="mt-1 leading-7 text-[#12233f]/80">{physicalTherapyReferralGuidance}</dd>
              </div>
              <div className="py-4">
                <dt className="font-semibold">VA Community Care</dt>
                <dd className="mt-1 leading-7 text-[#12233f]/80">{vaCommunityCareFaq.answer.replace(/^Yes\. /, "")} <Link href={vaCommunityCareFaqAnchor} className={textLink}>See the VA referral FAQ</Link>.</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="costs">
            <h2 id="costs" className="font-serif text-2xl sm:text-3xl">How do I check insurance or cost?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#12233f]/80">
              Call before your visit to check current participation, referral or authorization requirements and what you may owe. Coverage depends on the exact plan, provider and service; a carrier name alone doesn’t guarantee coverage or payment.
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-[#12233f]/80">
              If you’re paying without insurance, call for pricing for the visit or service you’re considering. You can also ask for a <Link href="/good-faith-estimate" className={textLink}>Good Faith Estimate</Link>.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-[#12233f]/15 pt-6">
          <a href="tel:+13375654200" className={callButton}>Call 337-565-4200</a>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
