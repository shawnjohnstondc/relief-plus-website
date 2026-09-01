import JsonLd from "./JsonLd";
import PillarPageShell from "./PillarPageShell";
import type { PillarPageData } from "@/lib/pillar-pages";
import { createServiceStructuredData } from "@/lib/seo";
import { treatmentEducation, treatmentResearch } from "@/lib/treatment-education";

export default function SupportingTreatmentPage({
  data,
}: {
  data: PillarPageData;
}) {
  return (
    <>
      <JsonLd
        data={createServiceStructuredData({
          name: data.seoTitle,
          description: data.seoDescription,
          path: data.path,
        })}
      />
      <PillarPageShell
        data={{
          ...data,
          educationSections: treatmentEducation[data.path],
          pageSources: treatmentResearch[data.path],
          sourcesEyebrow: "Selected Research",
          sourcesTitle: "Research informing this treatment guide.",
        }}
      />
    </>
  );
}
