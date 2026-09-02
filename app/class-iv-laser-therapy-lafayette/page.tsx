import type { Metadata } from "next";
import SupportingTreatmentPage from "@/app/components/SupportingTreatmentPage";
import { laserPage } from "@/lib/treatment-pages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: laserPage.seoTitle,
  description: laserPage.seoDescription,
  path: laserPage.path,
});

export default function ClassIvLaserTherapyPage() {
  return <SupportingTreatmentPage data={laserPage} />;
}
