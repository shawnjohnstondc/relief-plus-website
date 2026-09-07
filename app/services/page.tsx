import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

const path = "/services" as const;
export const metadata = createPageMetadata({ title: "Musculoskeletal Services in Lafayette, LA", description: "Explore Relief Plus chiropractic, physical therapy, regenerative medicine, and supporting musculoskeletal treatments in Lafayette, Louisiana.", path });
export default function Page() { return <><JsonLd data={createBreadcrumbStructuredData(path, "Services")} /><InfoPageShell path={path} breadcrumbLabel="Services" eyebrow="Services in Lafayette, Louisiana" title="Find the care that fits your concern." description="Start with an assessment of what hurts and what you want to do more comfortably. We explain whether chiropractic care, physical therapy, or a selected medical treatment may help and what other options to consider." heroPoints={["One service or coordinated care, depending on your needs", "A clear reason for each recommended treatment", "Your examination and goals guide the choice"]} sections={[
  { eyebrow: "Primary Pillars", title: "Three main services, with distinct roles.", items: [
    { title: "Chiropractic", description: "Dr. Shawn D. Johnston, D.C., assesses muscle and joint concerns and provides chiropractic care when appropriate.", href: "/chiropractic-adjustments-lafayette" },
    { title: "Physical Therapy", description: "Jeanne Saucier, PT, guides exercise and movement practice to build strength for daily life, work, and sport.", href: "/physical-therapy-lafayette" },
    { title: "Regenerative Medicine", description: "Selected options are considered under Dr. Ashton Reed’s medical oversight, with discussion of evidence, risks, and alternatives.", href: "/regenerative-cellular-therapy-lafayette" },
  ], paragraphs: ["You may need one service or benefit from clinicians working together. Each recommendation should have a clear purpose; not every patient sees every provider."] },
  { eyebrow: "Supporting Treatments", title: "What the supporting treatments involve.", items: [
    { title: "Dry Needling", description: "May reduce selected muscular sensitivity and create a more comfortable window for movement.", href: "/dry-needling-lafayette" },
    { title: "Class IV Laser Therapy", description: "Light applied from outside the body may help some pain and soft-tissue problems. Results vary.", href: "/class-iv-laser-therapy-lafayette" },
    { title: "Shockwave Therapy", description: "Sound-wave energy delivered through an applicator may help selected persistent tendon or heel pain.", href: "/shockwave-therapy-lafayette" },
    { title: "PRP Therapy", description: "An injection prepared from your own blood, considered for some joint or tendon conditions with uncertain benefit.", href: "/prp-therapy-lafayette" },
    { title: "Ozone Injection Therapy", description: "An oxygen-ozone mixture injected into a selected area. Evidence and risks depend on the condition and procedure.", href: "/ozone-injection-therapy-lafayette" },
    { title: "Trigger-Point Injections", description: "Medication injected into a selected muscle area when the assessment supports a muscle-related source of pain.", href: "/trigger-point-injections-lafayette" },
  ] },
  { eyebrow: "Selection Before Treatment", title: "A menu is not a treatment plan.", paragraphs: ["A useful plan explains what may be causing your symptoms, why a treatment is recommended, and how you will judge progress. Ask when the plan will be reviewed and what would lead to a change.", "Some options may be used together, while others may be unnecessary or inappropriate. Relief Plus prioritizes choosing the right treatment for the right patient rather than assembling the longest possible list of services."] },
  { eyebrow: "Wellness Offering", title: "Body-contouring goals remain distinct from clinical care.", paragraphs: ["InvisaRED is presented separately from chiropractic, physical therapy, and regenerative medicine. It is a wellness and body-contouring service for people interested in discussing circumference and body-composition goals—not a treatment for disease or a promise of a particular result."], items: [
    { title: "InvisaRED Body Contouring", description: "Review the service scope, realistic expectations, and questions to discuss before deciding whether it fits your goals.", href: "/invisared-weight-loss-lafayette" },
  ] },
]} cta={{ title: "Not sure which service fits?", description: "Call Relief Plus. Scheduling can begin with the problem you want evaluated rather than a treatment you need to choose yourself." }} /></> }
