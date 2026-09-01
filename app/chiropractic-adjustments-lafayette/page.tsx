import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import PillarPageShell from "@/app/components/PillarPageShell";
import { chiropracticPage } from "@/lib/pillar-pages";
import { createPageMetadata, createServiceStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: chiropracticPage.seoTitle,
  description: chiropracticPage.seoDescription,
  path: chiropracticPage.path,
});

export default function ChiropracticAdjustmentsPage() {
  return (
    <>
      <JsonLd
        data={createServiceStructuredData({
          name: chiropracticPage.seoTitle,
          description: chiropracticPage.seoDescription,
          path: chiropracticPage.path,
        })}
      />
      <PillarPageShell data={chiropracticPage} />
    </>
  );
}
