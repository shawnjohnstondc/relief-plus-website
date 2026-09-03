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
      <PillarPageShell data={{
        ...physicalTherapyPage,
        provider: {
          name: "Jeanne Saucier, PT",
          href: "/jeanne-saucier-pt",
          description: "Jeanne Saucier, PT, is the physical therapist at Relief Plus. She provides individualized physical therapy and rehabilitation focused on mobility, strength, functional capacity, and a safe return to meaningful daily, work, or athletic activity.",
        },
      }} />
    </>
  );
}
