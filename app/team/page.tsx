import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createPageMetadata, createTeamStructuredData } from "@/lib/seo";

const path = "/team" as const;
export const metadata = createPageMetadata({ title: "Relief Plus Team", description: "Meet the verified clinical team listed by Relief Plus for chiropractic, physical therapy, and medical care in Lafayette, Louisiana.", path });
export default function Page() { return <><JsonLd data={createTeamStructuredData()} /><InfoPageShell path={path} breadcrumbLabel="Team" eyebrow="Our Team" title="Different clinical perspectives, one patient-centered plan." description="Relief Plus publicly lists clinicians across chiropractic, physical therapy, and medicine. The profiles below include only names, credentials, and roles verified on the clinic’s existing team page." heroPoints={["Verified public names and credentials only", "Space prepared for clinic-approved photography", "Care coordinated around the patient’s clinical needs"]} sections={[
  { eyebrow: "Clinical Team", title: "Meet the providers listed by Relief Plus.", items: [
    { title: "Shawn D. Johnston, D.C.", description: "Doctor of Chiropractic. The existing Relief Plus site also identifies Dr. Johnston as the clinic’s chiropractor and owner." },
    { title: "Jeanne Saucier, PT", description: "Physical Therapist. Additional education, specialty, and biography details have not yet been verified for publication in this rebuild." },
    { title: "Ashton Reed, M.D.", description: "Medical Doctor. Additional specialty, scope, and biography details have not yet been verified for publication in this rebuild." },
  ], paragraphs: ["Each profile is intentionally presented without stock portraits or inferred accomplishments. The layout can receive clinic-approved provider photography and expanded biographies once the owner verifies them."] },
  { eyebrow: "Coordinated Care", title: "The provider and treatment should fit the problem.", paragraphs: ["A multidisciplinary clinic adds value when each professional contributes within an appropriate role and when the patient understands who is responsible for each part of care.", "Provider availability, scope, and the clinician responsible for individual procedures should be confirmed directly with Relief Plus when scheduling."] },
]} cta={{ title: "Talk with Relief Plus about where to begin.", description: "Call the clinic to discuss the concern you want evaluated and the appropriate scheduling path." }} /></> }
