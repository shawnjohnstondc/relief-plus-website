import ConditionPageShell from "@/app/components/ConditionPageShell";
import JsonLd from "@/app/components/JsonLd";
import { siJointPage as data } from "@/lib/phase-five-condition-pages";
import { createConditionStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: data.seoTitle, description: data.seoDescription, path: data.path });
export default function Page() { return <><JsonLd data={createConditionStructuredData({ name: data.breadcrumbLabel, conditionName: "Sacroiliac joint pain", description: data.seoDescription, path: data.path })} /><ConditionPageShell data={data} /></>; }
