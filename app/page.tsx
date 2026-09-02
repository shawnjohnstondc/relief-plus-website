import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import ReviewCarousel from "./components/ReviewCarousel";
import BrandMark from "./components/BrandMark";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = createPageMetadata({
  title: "Chiropractic, Physical Therapy & Regenerative Medicine",
  description:
    "Relief Plus provides chiropractic, physical therapy, and regenerative medicine for patients in Lafayette, Carencro, and Acadiana.",
  path: "/",
});

const treatments = [
  {
    title: "Chiropractic Care",
    description:
      "Personalized chiropractic care focused on restoring motion, reducing pain, and helping you move and function better.",
    href: "/chiropractic-adjustments-lafayette",
  },
  {
    title: "Dry Needling",
    description:
      "Targeted treatment for muscular tension, trigger points, restricted movement, and persistent pain.",
    href: "/dry-needling-lafayette",
  },
  {
    title: "Class IV Laser Therapy",
    description:
      "Advanced laser therapy designed to support tissue healing, reduce inflammation, and improve recovery.",
    href: "/class-iv-laser-therapy-lafayette",
  },
  {
    title: "Physical Therapy",
    description:
      "Movement-based rehabilitation designed around your condition, function, and individual goals.",
    href: "/physical-therapy-lafayette",
  },
  {
    title: "Shockwave Therapy",
    description:
      "Non-invasive acoustic wave therapy for stubborn musculoskeletal conditions and chronic soft-tissue pain.",
    href: "/shockwave-therapy-lafayette",
  },
  {
    title: "Regenerative Medicine",
    description:
      "Clinically directed regenerative treatment options used as part of an individualized musculoskeletal recovery plan.",
    href: "/regenerative-cellular-therapy-lafayette",
  },
];

const conditions = [
  { title: "Back Pain", href: "/back-pain-lafayette" },
  { title: "Sciatica", href: "/sciatica-treatment-lafayette" },
  { title: "Headaches", href: "/headache-treatment-lafayette" },
  { title: "Shoulder Pain", href: "/shoulder-pain-lafayette" },
  { title: "Knee Pain", href: "/knee-pain-lafayette" },
  { title: "Hip Pain", href: "/hip-pain-lafayette" },
  { title: "Herniated Discs", href: "/herniated-disc-lafayette" },
  { title: "Pinched Nerves", href: "/pinched-nerve-lafayette" },
  { title: "Car Accident Injuries", href: "/car-accident-injuries-lafayette" },
  { title: "Sports Injuries", href: "/sports-injuries-lafayette" },
  { title: "Work Injuries", href: "/work-injury-lafayette" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      {/* HEADER */}
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-10 sm:py-14 lg:min-h-[690px] lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#82601f] sm:mb-6 sm:text-xs sm:tracking-[0.28em]">
              Chiropractic · Physical Therapy · Regenerative Medicine
            </p>

            <h1 className="max-w-4xl font-serif text-[2.65rem] leading-[1.02] tracking-[-0.035em] text-[#12233f] sm:text-6xl lg:text-7xl">
              Move better.
              <br />
              Feel stronger.
              <br />
              <span className="text-[#9a7428]">Live with less pain.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#12233f]/70 sm:mt-8 sm:text-lg sm:leading-8">
              Relief Plus brings chiropractic care, physical therapy, and
              regenerative medicine together in one integrated clinic. We
              combine evidence-informed care with advanced treatment options
              to help identify the source of pain, restore function, and
              support long-term recovery.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a
                href="tel:3375654200"
                className="rounded-full bg-[#12233f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#1a3156]"
              >
                Call to Schedule
              </a>

              <Link
                href="#treatments"
                className="rounded-full border border-[#12233f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:border-[#b08d3b] hover:text-[#9a7428]"
              >
                Explore Our Treatments
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#12233f]/10 pt-6 text-sm text-[#12233f]/70 sm:mt-12 sm:pt-7">
              <span>Evidence-informed care</span>
              <span>Individualized treatment</span>
              <span>Advanced recovery options</span>
            </div>
          </div>

          <div className="relative pb-32 sm:pb-28 lg:pb-20">
            <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] sm:min-h-[430px] lg:min-h-[560px]">
              <Image
                src="/relief-plus-hero-wide.webp"
                alt="Shawn D. Johnston, D.C., owner of Relief Plus"
                fill
                priority
                sizes="(min-width: 1024px) 43vw, 100vw"
                className="object-cover object-center"
              />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#12233f]/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:left-7 sm:top-7">
                Lafayette · Carencro · Acadiana
              </div>
            </div>

            <blockquote className="absolute bottom-0 left-3 right-3 z-10 rounded-[1.5rem] border border-[#12233f]/10 bg-[#f7f5ef]/95 px-6 py-6 shadow-[0_16px_40px_rgba(18,35,63,0.12)] backdrop-blur-sm sm:left-8 sm:right-8 sm:px-8 sm:py-7 lg:left-10 lg:right-[-2rem]">
              <span aria-hidden="true" className="block font-serif text-4xl leading-none text-[#9a7428]">“</span>
              <p className="-mt-2 font-serif text-[1.35rem] leading-snug text-[#12233f] sm:text-[1.6rem]">
                The goal isn’t more treatment. It’s finding the right treatment for the person in front of us.
              </p>
              <footer className="mt-4 border-t border-[#12233f]/10 pt-3">
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-[#12233f]">Shawn D. Johnston, D.C.</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[#82601f]">Owner, Relief Plus</span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#12233f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
              Relief Plus
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              More than simply treating where it hurts.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-white/72">
              Pain can affect the way you work, sleep, exercise, care for your
              family, and enjoy everyday life. Our approach starts with finding
              out what is limiting you and building care around your individual
              needs.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/72">
              Chiropractic, physical therapy, and regenerative medicine work
              together as the three pillars of our approach, with each care
              plan shaped around what can meaningfully support your recovery.
            </p>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section id="treatments" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7428]">
              What We Do
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              Care built around the person,
              <br className="hidden sm:block" /> not just the diagnosis.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#12233f]/65">
              Different problems require different tools. We combine
              examination, hands-on care, rehabilitation, and advanced
              treatment options to create a plan that makes sense for you.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[#12233f]/10 bg-[#12233f]/10 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <Link
                key={treatment.title}
                href={treatment.href}
                className="group bg-[#f7f5ef] p-8 transition hover:bg-white"
              >
                <div className="mb-12"><BrandMark className="text-xl" /></div>

                <h3 className="font-serif text-2xl">{treatment.title}</h3>

                <p className="mt-4 leading-7 text-[#12233f]/62">
                  {treatment.description}
                </p>

                <p className="mt-8 text-sm font-semibold text-[#12233f] transition group-hover:text-[#9a7428]">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLINIC IN MOTION */}
      <section className="px-6 pb-24 lg:px-8">
        <figure className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#12233f]/10 bg-white/50 shadow-[0_18px_50px_rgba(18,35,63,0.08)]">
          <div className="relative aspect-[4/5] min-h-[420px] sm:aspect-[16/10] lg:aspect-[16/8]">
            <Image
              src="/relief-plus-active-clinic-hallway.png"
              alt="Patients and clinic staff moving through the Relief Plus hallway"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="font-serif text-xl text-[#12233f]">Care in motion at Relief Plus</span>
            <span className="text-sm text-[#12233f]/60">Serving Lafayette, Carencro, and Acadiana</span>
          </figcaption>
        </figure>
      </section>

      {/* CONDITIONS */}
      <section id="conditions" className="bg-[#e8e5dc] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7428]">
              Conditions We Treat
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
              Helping you get back to moving with confidence.
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-[#12233f]/65">
              Whether symptoms began suddenly or have been limiting you for
              months, our first goal is to understand what is happening and
              determine the most appropriate path forward.
            </p>

            <Link
              href="/conditions-we-treat"
              className="mt-8 inline-block text-sm font-semibold text-[#82601f]"
            >
              View all conditions →
            </Link>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-2">
            {conditions.map((condition) => (
              <Link
                key={condition.href}
                href={condition.href}
                className="group flex min-h-16 cursor-pointer items-center justify-between gap-4 border-b border-[#12233f]/15 px-2 py-4 font-serif text-xl transition-colors duration-200 ease-out hover:bg-[#f7f5ef]/55 hover:text-[#82601f] focus-visible:rounded-lg focus-visible:bg-[#f7f5ef]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82601f] sm:px-3"
              >
                <span>{condition.title}</span>
                <span aria-hidden="true" className="shrink-0 text-base text-[#82601f] transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewCarousel />

      {/* DOCTOR / STORY */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.72fr_.72fr_1.1fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7428]">
              A Different Kind of Clinic
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Care should feel personal.
            </h2>

          </div>

          <figure className="overflow-hidden rounded-[2rem] border border-[#12233f]/10 bg-white/55">
            <div className="relative aspect-[4/5]">
              <Image
                src="/dr-shawn-johnston-patient-consultation.png"
                alt="Shawn D. Johnston, D.C., listening to a patient during a consultation at Relief Plus"
                fill
                sizes="(min-width: 1024px) 27vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="px-5 py-4 text-sm leading-6 text-[#12233f]/62">
              Individualized care begins with listening, examination, and clear patient education.
            </figcaption>
          </figure>

          <div>
            <p className="text-lg leading-8 text-[#12233f]/68">
              Relief Plus was built around a simple idea: patients deserve
              thoughtful care, clear communication, and treatment options that
              are selected because they fit the patient — not because every
              patient receives the same routine.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#12233f]/68">
              Our goal is to provide an environment where chiropractic,
              physical therapy, and regenerative medicine work together
              without losing the personal relationship at the center of good
              healthcare.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-[#12233f]/20 px-6 py-3 text-sm font-semibold"
            >
              About Relief Plus
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#153e35] px-7 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
              Ready to Begin?
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Let’s find the right next step.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/70">
              Call Relief Plus to schedule an appointment or speak with our
              team.
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

      {/* FOOTER */}
      <footer className="bg-[#0d1b30] px-6 py-14 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-serif text-3xl">
                Relief <span className="text-[#d5b765]">+</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
                Chiropractic, physical therapy, and regenerative medicine for
                Lafayette, Carencro, and the Acadiana community.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Explore
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <p>
                  <Link href="/chiropractic-adjustments-lafayette">
                    Chiropractic
                  </Link>
                </p>
                <p>
                  <Link href="/conditions-we-treat">Conditions</Link>
                </p>
                <p>
                  <Link href="/about">About</Link>
                </p>
                <p>
                  <Link href="/blog">Resources</Link>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Patient Information
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <p>
                  <Link href="/hipaa-notice-of-privacy-practices">
                    HIPAA Notice of Privacy Practices
                  </Link>
                </p>
                <p>
                  <Link href="/good-faith-estimate">
                    Good Faith Estimate
                  </Link>
                </p>
                <p>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Contact
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/75">
                <p>Relief Plus</p>
                <p>112 Arabian Dr.<br />Lafayette, LA 70507</p>
                <p><Link href="/chiropractor-carencro-la">Serving Lafayette and the Carencro area</Link></p>
                <p>
                  <a href="tel:3375654200">(337) 565-4200</a>
                </p>
                <p><a href="mailto:myreliefplus@gmail.com">myreliefplus@gmail.com</a></p>
                <p>
                  <Link href="/contact">Contact Relief Plus</Link>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Relief Plus. All rights reserved.</p>

            <Link
              href="/time-card"
              className="text-white/55 transition hover:text-white/75"
            >
              Staff
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
