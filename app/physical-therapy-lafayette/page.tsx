import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import PillarPageShell from "@/app/components/PillarPageShell";
import { physicalTherapyPage } from "@/lib/pillar-pages";
import { createPageMetadata, createServiceStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: physicalTherapyPage.seoTitle,
  description: physicalTherapyPage.seoDescription,
  path: physicalTherapyPage.path,
});

export default function PhysicalTherapyPage() {
  return (
    <>
      <JsonLd
        data={createServiceStructuredData({
          name: physicalTherapyPage.seoTitle,
          description: physicalTherapyPage.seoDescription,
          path: physicalTherapyPage.path,
        })}
      />
      <PillarPageShell data={physicalTherapyPage} />
    </>
  );
}
