import JsonLd from "@/app/components/JsonLd";
import ConditionPageShell from "@/app/components/ConditionPageShell";
import { herniatedDiscPage as data } from "@/lib/condition-pages";
import { createConditionStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: data.seoTitle, description: data.seoDescription, path: data.path });
export default function Page() { return <><JsonLd data={createConditionStructuredData({ name: data.breadcrumbLabel, conditionName: "Herniated disc", description: data.seoDescription, path: data.path })} /><ConditionPageShell data={data} /></>; }
