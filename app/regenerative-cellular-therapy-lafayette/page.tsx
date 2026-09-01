import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import PillarPageShell from "@/app/components/PillarPageShell";
import { regenerativePage } from "@/lib/pillar-pages";
import { createPageMetadata, createServiceStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: regenerativePage.seoTitle,
  description: regenerativePage.seoDescription,
  path: regenerativePage.path,
});

export default function RegenerativeCellularTherapyPage() {
  return (
    <>
      <JsonLd
        data={createServiceStructuredData({
          name: regenerativePage.seoTitle,
          description: regenerativePage.seoDescription,
          path: regenerativePage.path,
        })}
      />
      <PillarPageShell data={regenerativePage} />
    </>
  );
}
