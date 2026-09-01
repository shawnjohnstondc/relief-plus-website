import Link from "next/link";
import BrandMark from "./BrandMark";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0d1b30] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
        <div>
          <div className="flex items-center gap-3"><BrandMark /><span className="font-serif text-3xl">Relief <span className="text-[#d5b765]">+</span></span></div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Chiropractic · Physical Therapy · Regenerative Medicine</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">Serving Lafayette, Carencro, and Acadiana.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d5b765]">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/conditions-we-treat" className="hover:text-white">Conditions</Link>
            <Link href="/our-approach" className="hover:text-white">Our Approach</Link>
            <Link href="/team" className="hover:text-white">Team</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d5b765]">Patient Information</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link href="/faq-lafayette" className="hover:text-white">FAQ</Link>
            <Link href="/hipaa-notice-of-privacy-practices" className="hover:text-white">HIPAA Notice</Link>
            <Link href="/good-faith-estimate" className="hover:text-white">Good Faith Estimate</Link>
            <Link href="/privacy-policy" className="hover:text-white">Website Privacy Policy</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#d5b765]">Contact</p>
          <address className="mt-4 grid gap-3 text-sm not-italic leading-6 text-white/70">
            <span>Relief Plus</span>
            <span>112 Arabian Dr.<br />Lafayette, LA 70507</span>
            <a href="tel:3375654200" className="hover:text-white">(337) 565-4200</a>
            <a href="mailto:myreliefplus@gmail.com" className="break-all hover:text-white">myreliefplus@gmail.com</a>
          </address>
        </div>
      </div>
    </footer>
  );
}
