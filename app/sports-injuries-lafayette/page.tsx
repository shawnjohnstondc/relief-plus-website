import ConditionPageShell from "@/app/components/ConditionPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createConditionStructuredData, createPageMetadata } from "@/lib/seo";
import { sportsInjuriesPage as data } from "@/lib/sports-injuries-page";

export const metadata = createPageMetadata({
  title: data.seoTitle,
  description: data.seoDescription,
  path: data.path,
});

export default function SportsInjuriesPage() {
  return (
    <>
      <JsonLd
        data={createConditionStructuredData({
          name: data.breadcrumbLabel,
          conditionName: "Sports injury",
          description: data.seoDescription,
          path: data.path,
        })}
      />
      <ConditionPageShell data={data} />
    </>
  );
}
