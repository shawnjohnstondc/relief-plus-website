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
    href: "/dry-needling",
  },
  {
    title: "Class IV Laser Therapy",
    description:
      "Advanced laser therapy designed to support tissue healing, reduce inflammation, and improve recovery.",
    href: "/laser-therapy",
  },
  {
    title: "Physical Therapy",
    description:
      "Movement-based rehabilitation designed around your condition, function, and individual goals.",
    href: "/physical-therapy",
  },
  {
    title: "Shockwave Therapy",
    description:
      "Non-invasive acoustic wave therapy for stubborn musculoskeletal conditions and chronic soft-tissue pain.",
    href: "/shockwave-therapy",
  },
  {
    title: "Therapeutic Injections",
    description:
      "Clinically directed injection options used as part of an individualized musculoskeletal and recovery plan.",
    href: "/therapeutic-injections",
  },
];

const conditions = [
  "Neck Pain",
  "Back Pain",
  "Sciatica",
  "Headaches",
  "Shoulder Pain",
  "Knee Pain",
  "Hip Pain",
  "Herniated Discs",
  "Pinched Nerves",
  "Car Accident Injuries",
  "Sports Injuries",
  "Work Injuries",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#12233f]">
      {/* HEADER */}
      <header className="border-b border-[#12233f]/10 bg-[#f7f5ef]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b08d3b] text-lg font-semibold text-[#b08d3b]">
              R+
            </div>

            <div>
              <div className="font-serif text-2xl tracking-tight">
                Relief <span className="text-[#b08d3b]">+</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#12233f]/55">
                Lafayette · Carencro
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            <a className="hover:text-[#9a7428]" href="/chiropractic-adjustments-lafayette">
              Chiropractic
            </a>
            <a className="hover:text-[#9a7428]" href="#treatments">
              Treatments
            </a>
            <a className="hover:text-[#9a7428]" href="#conditions">
              Conditions
            </a>
            <a className="hover:text-[#9a7428]" href="/about">
              About
            </a>
            <a className="hover:text-[#9a7428]" href="/blog">
              Resources
            </a>
            <a className="hover:text-[#9a7428]" href="/contact">
              Contact
            </a>
          </nav>

          <a
            href="tel:3375654200"
            className="rounded-full bg-[#12233f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3156]"
          >
            Call 337-565-4200
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7428]">
              Chiropractic · Recovery · Wellness
            </p>

            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.035em] text-[#12233f] sm:text-6xl lg:text-7xl">
              Move better.
              <br />
              Feel stronger.
              <br />
              <span className="text-[#9a7428]">Live with less pain.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#12233f]/70">
              Relief Plus provides chiropractic care and advanced
              musculoskeletal treatment for patients throughout Lafayette,
              Carencro, and Acadiana — with a focus on understanding the
              problem, restoring function, and helping you get back to the
              things that matter.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:3375654200"
                className="rounded-full bg-[#12233f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#1a3156]"
              >
                Call to Schedule
              </a>

              <a
                href="#treatments"
                className="rounded-full border border-[#12233f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:border-[#b08d3b] hover:text-[#9a7428]"
              >
                Explore Our Treatments
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#12233f]/10 pt-7 text-sm text-[#12233f]/60">
              <span>Chiropractic first</span>
              <span>Individualized care</span>
              <span>Advanced recovery options</span>
            </div>
          </div>

          {/* PHOTO PLACEHOLDER */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#12233f]/10 bg-[#dfe3dc] shadow-[0_35px_90px_rgba(18,35,63,0.12)]">
              <div className="flex h-full flex-col items-center justify-center px-10 text-center">
                <div className="mb-5 h-px w-16 bg-[#b08d3b]" />
                <p className="font-serif text-3xl text-[#12233f]">
                  Your clinic photography
                </p>
                <p className="mt-4 max-w-xs text-sm leading-6 text-[#12233f]/55">
                  We’ll replace this with one of your professional clinic or
                  doctor photographs.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 hidden rounded-2xl bg-[#153e35] p-6 text-white shadow-xl md:block">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                Serving
              </p>
              <p className="mt-2 font-serif text-xl">
                Lafayette · Carencro · Acadiana
              </p>
            </div>
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
              Chiropractic remains at the center of what we do, supported by
              additional treatment and rehabilitation options when they can
              meaningfully contribute to your recovery.
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
              <a
                key={treatment.title}
                href={treatment.href}
                className="group bg-[#f7f5ef] p-8 transition hover:bg-white"
              >
                <div className="mb-12 text-sm text-[#b08d3b]">R+</div>

                <h3 className="font-serif text-2xl">{treatment.title}</h3>

                <p className="mt-4 leading-7 text-[#12233f]/62">
                  {treatment.description}
                </p>

                <p className="mt-8 text-sm font-semibold text-[#12233f] transition group-hover:text-[#9a7428]">
                  Learn more →
                </p>
              </a>
            ))}
          </div>
        </div>
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

            <a
              href="/conditions-we-treat"
              className="mt-8 inline-block text-sm font-semibold text-[#9a7428]"
            >
              View all conditions →
            </a>
          </div>

          <div className="grid gap-x-8 sm:grid-cols-2">
            {conditions.map((condition) => (
              <div
                key={condition}
                className="border-b border-[#12233f]/15 py-5 font-serif text-xl"
              >
                {condition}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR / STORY */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="aspect-[5/4] rounded-[2rem] bg-[#d9ddd7]">
            <div className="flex h-full items-center justify-center p-10 text-center">
              <div>
                <p className="font-serif text-3xl">Doctor / clinic image</p>
                <p className="mt-3 text-sm text-[#12233f]/55">
                  We’ll use your real photography here.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7428]">
              A Different Kind of Clinic
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Care should feel personal.
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#12233f]/68">
              Relief Plus was built around a simple idea: patients deserve
              thoughtful care, clear communication, and treatment options that
              are selected because they fit the patient — not because every
              patient receives the same routine.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#12233f]/68">
              Our goal is to provide an environment where chiropractic,
              rehabilitation, recovery, and wellness services work together
              without losing the personal relationship at the center of good
              healthcare.
            </p>

            <a
              href="/about"
              className="mt-8 inline-block rounded-full border border-[#12233f]/20 px-6 py-3 text-sm font-semibold"
            >
              About Relief Plus
            </a>
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
                Chiropractic, recovery, and wellness care for Lafayette,
                Carencro, and the Acadiana community.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Explore
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <p><a href="/chiropractic-adjustments-lafayette">Chiropractic</a></p>
                <p><a href="/conditions-we-treat">Conditions</a></p>
                <p><a href="/about">About</a></p>
                <p><a href="/blog">Resources</a></p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Patient Information
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <p><a href="/hipaa-notice-of-privacy-practices">HIPAA Notice of Privacy Practices</a></p>
                <p><a href="/good-faith-estimate">Good Faith Estimate</a></p>
                <p><a href="/privacy-policy">Privacy Policy</a></p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Contact
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/75">
                <p>Lafayette / Carencro, Louisiana</p>
                <p>
                  <a href="tel:3375654200">337-565-4200</a>
                </p>
                <p>
                  <a href="/contact">Contact Relief Plus</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Relief Plus. All rights reserved.</p>

            <a
              href="/time-card"
              className="text-white/25 transition hover:text-white/60"
            >
              Staff
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}