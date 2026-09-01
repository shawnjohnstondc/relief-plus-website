import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

const path = "/services" as const;
export const metadata = createPageMetadata({ title: "Musculoskeletal Services in Lafayette, LA", description: "Explore Relief Plus chiropractic, physical therapy, regenerative medicine, and supporting musculoskeletal treatments in Lafayette, Louisiana.", path });
export default function Page() { return <><JsonLd data={createBreadcrumbStructuredData(path, "Services")} /><InfoPageShell path={path} breadcrumbLabel="Services" eyebrow="Services in Lafayette, Louisiana" title="Three pillars supported by a focused treatment toolkit." description="Relief Plus organizes care around chiropractic, physical therapy, and regenerative medicine, with supporting treatments selected for a specific role in an individualized plan." heroPoints={["Pillar care that can stand alone or work together", "Supporting modalities chosen for a defined purpose", "Patient goals and clinical appropriateness guide selection"]} sections={[
  { eyebrow: "Primary Pillars", title: "The clinical foundation of Relief Plus.", items: [
    { title: "Chiropractic", description: "Musculoskeletal examination, joint care, adjustments, and movement-focused planning.", href: "/chiropractic-adjustments-lafayette" },
    { title: "Physical Therapy", description: "Progressive rehabilitation to develop mobility, strength, coordination, and task capacity.", href: "/physical-therapy-lafayette" },
    { title: "Regenerative Medicine", description: "A transparent framework for evaluating selected advanced treatment options.", href: "/regenerative-cellular-therapy-lafayette" },
  ], paragraphs: ["The three pillars remain equally visible because they answer different clinical needs. The examination determines whether one pillar is enough or whether coordinated care adds a useful role."] },
  { eyebrow: "Supporting Treatments", title: "Each modality should contribute something specific.", items: [
    { title: "Dry Needling", description: "May reduce selected muscular sensitivity and create a more comfortable window for movement.", href: "/dry-needling-lafayette" },
    { title: "Class IV Laser Therapy", description: "Non-invasive photobiomodulation considered to support selected symptom and functional goals.", href: "/class-iv-laser-therapy-lafayette" },
    { title: "Shockwave Therapy", description: "Acoustic-wave care considered for persistent tendon and plantar-fascia presentations.", href: "/shockwave-therapy-lafayette" },
    { title: "PRP Therapy", description: "A patient-derived biologic procedure discussed for selected joint and tendon concerns.", href: "/prp-therapy-lafayette" },
    { title: "Ozone Injection Therapy", description: "A diagnosis-specific advanced injection option with an evolving evidence base.", href: "/ozone-injection-therapy-lafayette" },
    { title: "Trigger-Point Injections", description: "A focused procedure for a clearly identified muscular or myofascial contributor.", href: "/trigger-point-injections-lafayette" },
  ] },
  { eyebrow: "Selection Before Treatment", title: "A menu is not a treatment plan.", paragraphs: ["A useful plan explains the working diagnosis, the functional findings that matter, the goal of each recommendation, what progress will look like, and when the plan will be reassessed.", "Some options may be used together, while others may be unnecessary or inappropriate. Relief Plus prioritizes choosing the right treatment for the right patient rather than assembling the longest possible list of services."] },
]} cta={{ title: "Not sure which service fits?", description: "Call Relief Plus. Scheduling can begin with the problem you want evaluated rather than a treatment you need to choose yourself." }} /></> }
