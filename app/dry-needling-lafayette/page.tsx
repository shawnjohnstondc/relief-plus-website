import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { dryNeedlingPage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: dryNeedlingPage.seoTitle,
  description: dryNeedlingPage.seoDescription,
  path: dryNeedlingPage.path,
});

export default function DryNeedlingPage() {
  return <SupportingTreatmentPage data={dryNeedlingPage} />;
}
