"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import BrandMark from "./BrandMark";

const pillars = [["Chiropractic", "/chiropractic-adjustments-lafayette"], ["Physical Therapy", "/physical-therapy-lafayette"], ["Regenerative Medicine", "/regenerative-cellular-therapy-lafayette"]] as const;
const treatments = [["Dry Needling", "/dry-needling-lafayette"], ["Class IV Laser Therapy", "/class-iv-laser-therapy-lafayette"], ["Shockwave Therapy", "/shockwave-therapy-lafayette"], ["PRP Therapy", "/prp-therapy-lafayette"], ["Ozone Injection Therapy", "/ozone-injection-therapy-lafayette"], ["Trigger Point Injections", "/trigger-point-injections-lafayette"]] as const;
const conditions = [["Back Pain", "/back-pain-lafayette"], ["Neck Pain", "/neck-pain-lafayette"], ["Sciatica", "/sciatica-treatment-lafayette"], ["Herniated Disc", "/herniated-disc-lafayette"], ["Pinched Nerve", "/pinched-nerve-lafayette"]] as const;
type MenuName = "treatments" | "conditions";

type MenuProps = { label: string; items: ReadonlyArray<readonly [string, string]>; footer: readonly [string, string]; open: boolean; id: string; onToggle: () => void; onNavigate: () => void };

function DesktopDropdown({ label, items, footer, open, id, onToggle, onNavigate }: MenuProps) {
  return <div className="relative"><button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="cursor-pointer transition hover:text-[#9a7428] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b08d3b]">{label} <span aria-hidden="true" className={`ml-1 inline-block text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span></button><div id={id} aria-hidden={!open} className={`nav-dropdown absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-[#12233f]/10 bg-[#f7f5ef] p-3 shadow-xl ${open ? "nav-dropdown-open" : ""}`}>{items.map(([title, href]) => <Link key={href} href={href} onClick={onNavigate} tabIndex={open ? 0 : -1} className="block rounded-xl px-4 py-3 text-sm text-[#12233f]/75 transition hover:bg-white hover:text-[#9a7428]">{title}</Link>)}<Link href={footer[1]} onClick={onNavigate} tabIndex={open ? 0 : -1} className="mt-2 block border-t border-[#12233f]/10 px-4 pb-2 pt-4 text-sm font-semibold text-[#12233f] hover:text-[#9a7428]">{footer[0]} →</Link></div></div>;
}

function MobileSubmenu({ label, items, footer, open, id, onToggle, onNavigate }: MenuProps) {
  return <div className="border-t border-[#12233f]/10 pt-2"><button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex w-full items-center justify-between px-3 py-3 text-left font-semibold">{label}<span aria-hidden="true" className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span></button><div id={id} aria-hidden={!open} className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden pl-3">{items.map(([title, href]) => <Link key={href} href={href} onClick={onNavigate} tabIndex={open ? 0 : -1} className="block rounded-lg px-3 py-2 text-sm text-[#12233f]/70 hover:bg-white">{title}</Link>)}<Link href={footer[1]} onClick={onNavigate} tabIndex={open ? 0 : -1} className="block px-3 py-3 text-sm font-semibold text-[#9a7428]">{footer[0]} →</Link></div></div></div>;
}

export default function SiteHeader({ currentPath }: { currentPath?: string }) {
  const [desktopMenu, setDesktopMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<MenuName | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const baseId = useId();

  useEffect(() => {
    function outside(event: PointerEvent) { if (!headerRef.current?.contains(event.target as Node)) { setDesktopMenu(null); setMobileOpen(false); setMobileMenu(null); } }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setDesktopMenu(null); setMobileOpen(false); setMobileMenu(null); } }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);

  const closeAll = () => { setDesktopMenu(null); setMobileOpen(false); setMobileMenu(null); };
  const navLinkClass = "transition hover:text-[#9a7428] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b08d3b]";

  return <header ref={headerRef} className="relative z-50 border-b border-[#12233f]/10 bg-[#f7f5ef]/95 text-[#12233f]"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 lg:px-8">
    <Link href="/" aria-label="Relief Plus home" onClick={closeAll} className="flex shrink-0 items-center gap-3"><BrandMark /><span><span className="block font-serif text-2xl tracking-tight">Relief <span className="text-[#b08d3b]">+</span></span><span className="block text-[10px] uppercase tracking-[.22em] text-[#12233f]/55">Lafayette · Carencro</span></span></Link>
    <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-[13px] font-medium xl:flex">{pillars.map(([title, href]) => <Link key={href} href={href} onClick={closeAll} aria-current={currentPath === href ? "page" : undefined} className={`${navLinkClass} ${currentPath === href ? "text-[#9a7428]" : ""}`}>{title}</Link>)}<DesktopDropdown label="Treatments" items={treatments} footer={["View All Treatments", "/services"]} open={desktopMenu === "treatments"} id={`${baseId}-treatments-desktop`} onToggle={() => setDesktopMenu(desktopMenu === "treatments" ? null : "treatments")} onNavigate={closeAll} /><DesktopDropdown label="Conditions" items={conditions} footer={["View All Conditions", "/conditions-we-treat"]} open={desktopMenu === "conditions"} id={`${baseId}-conditions-desktop`} onToggle={() => setDesktopMenu(desktopMenu === "conditions" ? null : "conditions")} onNavigate={closeAll} /><Link className={navLinkClass} href="/about" onClick={closeAll}>About</Link><Link className={navLinkClass} href="/contact" onClick={closeAll}>Contact</Link></nav>
    <a href="tel:3375654200" className="hidden shrink-0 rounded-full bg-[#12233f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a3156] sm:block">Call to Schedule</a>
    <div className="relative xl:hidden"><button type="button" aria-expanded={mobileOpen} aria-controls={`${baseId}-mobile-panel`} onClick={() => { setMobileOpen(!mobileOpen); setDesktopMenu(null); if (mobileOpen) setMobileMenu(null); }} className="rounded-full border border-[#12233f]/15 px-4 py-3 text-sm font-semibold">Menu</button><nav id={`${baseId}-mobile-panel`} aria-label="Mobile navigation" aria-hidden={!mobileOpen} className={`mobile-nav-panel absolute right-0 top-full z-50 mt-3 max-h-[calc(100vh-7rem)] w-[min(22rem,calc(100vw-3rem))] overflow-y-auto rounded-3xl border border-[#12233f]/10 bg-[#f7f5ef] p-5 shadow-2xl ${mobileOpen ? "mobile-nav-panel-open" : ""}`}><p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a7428]">Primary Care</p>{pillars.map(([title, href]) => <Link key={href} href={href} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1} className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">{title}</Link>)}<MobileSubmenu label="Treatments" items={treatments} footer={["View All Treatments", "/services"]} open={mobileMenu === "treatments"} id={`${baseId}-treatments-mobile`} onToggle={() => setMobileMenu(mobileMenu === "treatments" ? null : "treatments")} onNavigate={closeAll} /><MobileSubmenu label="Conditions" items={conditions} footer={["View All Conditions", "/conditions-we-treat"]} open={mobileMenu === "conditions"} id={`${baseId}-conditions-mobile`} onToggle={() => setMobileMenu(mobileMenu === "conditions" ? null : "conditions")} onNavigate={closeAll} /><div className="mt-2 border-t border-[#12233f]/10 pt-2">{[["About", "/about"], ["Our Approach", "/our-approach"], ["Team", "/team"], ["FAQ", "/faq-lafayette"], ["Contact", "/contact"]].map(([title, href]) => <Link key={href} href={href} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1} className="block rounded-xl px-3 py-3 font-semibold hover:bg-white">{title}</Link>)}</div><a href="tel:3375654200" tabIndex={mobileOpen ? 0 : -1} className="mt-4 block rounded-full bg-[#12233f] px-5 py-4 text-center text-sm font-semibold text-white">Call 337-565-4200</a></nav></div>
  </div></header>;
}
