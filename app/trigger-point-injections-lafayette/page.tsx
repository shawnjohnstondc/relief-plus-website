import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { triggerPointPage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: triggerPointPage.seoTitle,
  description: triggerPointPage.seoDescription,
  path: triggerPointPage.path,
});

export default function TriggerPointInjectionsPage() {
  return <SupportingTreatmentPage data={triggerPointPage} />;
}
