import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { shockwavePage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: shockwavePage.seoTitle,
  description: shockwavePage.seoDescription,
  path: shockwavePage.path,
});

export default function ShockwaveTherapyPage() {
  return <SupportingTreatmentPage data={shockwavePage} />;
}
