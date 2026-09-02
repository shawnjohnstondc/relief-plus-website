import LegalPageShell from "@/app/components/LegalPageShell";
import { createPageMetadata } from "@/lib/seo";

const path = "/good-faith-estimate" as const;
export const metadata = createPageMetadata({ title: "Good Faith Estimate", description: "Patient information from Relief Plus about the right to receive a Good Faith Estimate for expected non-emergency medical costs.", path });
export default function Page() { return <LegalPageShell path={path} title="Good Faith Estimate" description="The following content is migrated from the legacy Relief Plus Good Faith Estimate page and formatted for readability without changing its substantive meaning." sections={[
  { title: "Your right to an estimate", paragraphs: ["You have the right to receive a ‘Good Faith Estimate’ explaining how much your medical care will cost. Under the law, health care providers need to give patients who do not have insurance or who are not using insurance an estimate of the bill for medical items and services."], items: [
    "You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency items or services. This includes related costs such as medical tests, prescription drugs, equipment, and hospital fees.",
    "Make sure your health care provider gives you a Good Faith Estimate in writing at least one business day before your medical service or item. You can also ask your health care provider, and any other provider you choose, for a Good Faith Estimate before you schedule an item or service.",
    "If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill.",
    "Save a copy or picture of your Good Faith Estimate.",
  ] },
  { title: "More information", paragraphs: ["For questions or more information about your right to a Good Faith Estimate, visit cms.gov/nosurprises or call Relief Plus at 337-565-4200.", "The legacy page does not state a publication or effective date and should be reviewed by the owner or legal counsel for current federal wording and clinic-specific contact procedures."] },
]} /> }
