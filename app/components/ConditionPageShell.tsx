import Link from "next/link";
import PillarPageShell from "./PillarPageShell";
import type { PillarPageData } from "@/lib/pillar-pages";

export default function ConditionPageShell({ data }: { data: PillarPageData }) {
  return (
    <>
      <PillarPageShell data={data} />
      <Link
        href="/conditions-we-treat"
        className="fixed bottom-5 right-5 z-30 rounded-full border border-[#b08d3b]/40 bg-[#f7f5ef] px-5 py-3 text-xs font-semibold text-[#12233f] shadow-lg transition hover:border-[#b08d3b]"
      >
        View all conditions
      </Link>
    </>
  );
}
