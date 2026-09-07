import JsonLd from "@/app/components/JsonLd";
import PillarPageShell from "@/app/components/PillarPageShell";
import { decompressionPage } from "@/lib/decompression-page";
import { createBreadcrumbStructuredData, createFaqStructuredData, createPageMetadata, createServiceStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: decompressionPage.seoTitle,
  description: decompressionPage.seoDescription,
  path: decompressionPage.path,
});

export default function SpinalDecompressionPage() {
  return <>
    <JsonLd data={createServiceStructuredData({ name: "Nonsurgical Spinal Decompression", description: decompressionPage.seoDescription, path: decompressionPage.path })} />
    <JsonLd data={createBreadcrumbStructuredData(decompressionPage.path, decompressionPage.breadcrumbLabel)} />
    <JsonLd data={createFaqStructuredData(decompressionPage.faqs)} />
    <PillarPageShell data={decompressionPage} />
  </>;
}
