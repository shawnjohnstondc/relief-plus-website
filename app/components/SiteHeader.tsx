import Link from "next/link";
import BrandMark from "./BrandMark";

const pillars = [
  ["Chiropractic", "/chiropractic-adjustments-lafayette"],
  ["Physical Therapy", "/physical-therapy-lafayette"],
  ["Regenerative Medicine", "/regenerative-cellular-therapy-lafayette"],
] as const;

const treatments = [
  ["Dry Needling", "/dry-needling-lafayette"],
  ["Class IV Laser Therapy", "/class-iv-laser-therapy-lafayette"],
  ["Shockwave Therapy", "/shockwave-therapy-lafayette"],
  ["PRP Therapy", "/prp-therapy-lafayette"],
  ["Ozone Injection Therapy", "/ozone-injection-therapy-lafayette"],
  ["Trigger Point Injections", "/trigger-point-injections-lafayette"],
] as const;

const conditions = [
  ["Back Pain", "/back-pain-lafayette"],
  ["Neck Pain", "/neck-pain-lafayette"],
  ["Sciatica", "/sciatica-treatment-lafayette"],
  ["Herniated Disc", "/herniated-disc-lafayette"],
  ["Pinched Nerve", "/pinched-nerve-lafayette"],
] as const;

const navLinkClass = "transition hover:text-[#9a7428]";

function Dropdown({ label, items, footer }: {
  label: string;
  items: ReadonlyArray<readonly [string, string]>;
  footer?: readonly [string, string];
}) {
  return (
    <details className="group relative">
      <summary className="cursor-pointer list-none transition marker:hidden hover:text-[#9a7428]">
        {label} <span aria-hidden="true" className="ml-1 text-[10px]">▾</span>
      </summary>
      <div className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-[#12233f]/10 bg-[#f7f5ef] p-3 shadow-xl">
        {items.map(([title, href]) => (
          <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm text-[#12233f]/75 transition hover:bg-white hover:text-[#9a7428]">{title}</Link>
        ))}
        {footer && <Link href={footer[1]} className="mt-2 block border-t border-[#12233f]/10 px-4 pb-2 pt-4 text-sm font-semibold text-[#12233f] hover:text-[#9a7428]">{footer[0]} →</Link>}
      </div>
    </details>
  );
}

export default function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    <header className="relative z-50 border-b border-[#12233f]/10 bg-[#f7f5ef]/95 text-[#12233f]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 lg:px-8">
        <Link href="/" aria-label="Relief Plus home" className="flex shrink-0 items-center gap-3">
          <BrandMark />
          <span>
            <span className="block font-serif text-2xl tracking-tight">Relief <span className="text-[#b08d3b]">+</span></span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-[#12233f]/55">Lafayette · Carencro</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-[13px] font-medium xl:flex">
          {pillars.map(([title, href]) => <Link key={href} href={href} aria-current={currentPath === href ? "page" : undefined} className={`${navLinkClass} ${currentPath === href ? "text-[#9a7428]" : ""}`}>{title}</Link>)}
          <Dropdown label="Treatments" items={treatments} footer={["View All Treatments", "/services"]} />
          <Dropdown label="Conditions" items={conditions} footer={["View All Conditions", "/conditions-we-treat"]} />
          <Link className={navLinkClass} href="/about">About</Link>
          <Link className={navLinkClass} href="/contact">Contact</Link>
        </nav>

        <a href="tel:3375654200" className="hidden shrink-0 rounded-full bg-[#12233f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3156] sm:block">Call to Schedule</a>

        <details className="group relative xl:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-[#12233f]/15 px-4 py-3 text-sm font-semibold marker:hidden">Menu</summary>
          <nav aria-label="Mobile navigation" className="absolute right-0 top-full z-50 mt-3 max-h-[calc(100vh-7rem)] w-[min(22rem,calc(100vw-3rem))] overflow-y-auto rounded-3xl border border-[#12233f]/10 bg-[#f7f5ef] p-5 shadow-2xl">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a7428]">Primary Care</p>
            {pillars.map(([title, href]) => <Link key={href} href={href} className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">{title}</Link>)}
            <details className="border-t border-[#12233f]/10 pt-2"><summary className="cursor-pointer list-none px-3 py-3 font-semibold marker:hidden">Treatments <span aria-hidden="true">▾</span></summary><div className="pl-3">{treatments.map(([title, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm text-[#12233f]/70 hover:bg-white">{title}</Link>)}<Link href="/services" className="block px-3 py-3 text-sm font-semibold text-[#9a7428]">View All Treatments →</Link></div></details>
            <details className="mt-2 border-t border-[#12233f]/10 pt-2"><summary className="cursor-pointer list-none px-3 py-3 font-semibold marker:hidden">Conditions <span aria-hidden="true">▾</span></summary><div className="pl-3">{conditions.map(([title, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm text-[#12233f]/70 hover:bg-white">{title}</Link>)}<Link href="/conditions-we-treat" className="block px-3 py-3 text-sm font-semibold text-[#9a7428]">View All Conditions →</Link></div></details>
            <div className="mt-2 border-t border-[#12233f]/10 pt-2"><Link href="/about" className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">About</Link><Link href="/our-approach" className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">Our Approach</Link><Link href="/team" className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">Team</Link><Link href="/faq-lafayette" className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">FAQ</Link><Link href="/contact" className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">Contact</Link></div>
            <a href="tel:3375654200" className="mt-4 block rounded-full bg-[#12233f] px-5 py-4 text-center text-sm font-semibold text-white">Call 337-565-4200</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
