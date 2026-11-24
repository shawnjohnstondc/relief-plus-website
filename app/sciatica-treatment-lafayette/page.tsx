import JsonLd from "@/app/components/JsonLd";
import ConditionPageShell from "@/app/components/ConditionPageShell";
import { sciaticaPage as data } from "@/lib/condition-pages";
import { sciaticaDrivingFaq } from "@/lib/nov23-patient-answers";
import { createConditionStructuredData, createFaqStructuredData, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: data.seoTitle, description: data.seoDescription, path: data.path });
export default function Page() { return <><JsonLd data={createConditionStructuredData({ name: data.breadcrumbLabel, conditionName: "Sciatica", description: data.seoDescription, path: data.path })} /><JsonLd data={createFaqStructuredData([sciaticaDrivingFaq])} /><ConditionPageShell data={data} /></>; }
