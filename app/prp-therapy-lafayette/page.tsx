import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { prpPage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: prpPage.seoTitle,
  description: prpPage.seoDescription,
  path: prpPage.path,
});

export default function PrpTherapyPage() {
  return <SupportingTreatmentPage data={prpPage} />;
}
