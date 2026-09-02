import Link from "next/link";
import type { PillarLink } from "@/lib/pillar-pages";

type RelatedServicesProps = {
  services: PillarLink[];
};

export default function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#12233f]/10 bg-[#12233f]/10 md:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="group bg-[#f7f5ef] p-8 transition hover:bg-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b08d3b]">
            Relief Plus
          </p>
          <h3 className="mt-5 font-serif text-2xl">{service.title}</h3>
          <p className="mt-4 leading-7 text-[#12233f]/65">
            {service.description}
          </p>
          <p className="mt-8 text-sm font-semibold transition group-hover:text-[#9a7428]">
            Learn more →
          </p>
        </Link>
      ))}
    </div>
  );
}
