import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { ozonePage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: ozonePage.seoTitle,
  description: ozonePage.seoDescription,
  path: ozonePage.path,
});

export default function OzoneInjectionTherapyPage() {
  return <SupportingTreatmentPage data={ozonePage} />;
}
