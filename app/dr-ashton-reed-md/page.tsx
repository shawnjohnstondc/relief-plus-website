import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import ProviderPageShell from "@/app/components/ProviderPageShell";
import { createPageMetadata, createProviderProfileStructuredData } from "@/lib/seo";

const path = "/dr-ashton-reed-md" as const;
const description = "Meet Ashton Reed, MD, a board-certified Internal Medicine physician providing medical oversight for the Relief Plus regenerative medicine program.";

export const metadata: Metadata = createPageMetadata({
  title: "Ashton Reed, MD | Internal Medicine Physician",
  description,
  path,
});

export default function DrAshtonReedPage() {
  return (
    <>
      <JsonLd data={createProviderProfileStructuredData({
        path,
        name: "Ashton Reed",
        honorificSuffix: "MD",
        jobTitle: "Internal Medicine Physician",
        description,
        image: "/ashton-reed-md-relief-plus.webp",
        relationship: "affiliation",
      })} />
      <ProviderPageShell
        path={path}
        name="Ashton Reed, MD"
        role="Board-Certified Internal Medicine Physician"
        location="Medical Oversight — Regenerative Medicine Program"
        introduction="Dr. Reed provides physician oversight, clinical review, and medical decision-making for patients being considered for regenerative care at Relief Plus. His role supports careful selection and does not mean that every patient sees him personally."
        image={{ src: "/ashton-reed-md-relief-plus.webp", alt: "Ashton Reed, MD, Internal Medicine physician at Relief Plus", objectPosition: "center top" }}
        sections={[
          {
            eyebrow: "Role at Relief Plus",
            title: "Physician involvement in selected regenerative care.",
            paragraphs: [
              "Dr. Reed’s verified role is medical oversight of the Relief Plus regenerative medicine program. This includes clinical review and medical decision-making for patients being considered for regenerative care, with physician involvement in selected regenerative and injection-based services.",
              "His involvement should not be interpreted to mean that every regenerative patient sees Dr. Reed personally, that he performs every injection, or that he is continuously onsite. The provider and process for a specific service should be confirmed directly with Relief Plus.",
            ],
          },
          {
            eyebrow: "Education and Training",
            title: "Internal Medicine training in Lafayette.",
            paragraphs: ["Dr. Reed is a board-certified Internal Medicine physician in Lafayette. He completed his Internal Medicine residency through LSU Health Sciences Center at University Hospital and Clinics in Lafayette, Louisiana."],
            items: [
              { title: "Internal Medicine Residency", description: "LSU Health Sciences Center / University Hospital and Clinics\nLafayette, Louisiana" },
            ],
          },
          {
            eyebrow: "Clinical Decision-Making",
            title: "Understand the treatment before choosing it.",
            paragraphs: [
              "Regenerative medicine includes different procedures and products. Their evidence, risks, alternatives, and regulatory status differ. Medical oversight helps assess those questions in relation to your diagnosis.",
              "Ask which exact treatment is proposed, why it may fit your condition, and what the evidence shows. The discussion should include known and uncertain risks, other choices, and how rehabilitation may fit. No option is appropriate for everyone.",
            ],
          },
          {
            eyebrow: "Multidisciplinary Care",
            title: "A distinct role within a broader clinical model.",
            paragraphs: ["Relief Plus brings together chiropractic, physical therapy, and physician involvement without assuming that every patient requires all three. Dr. Reed’s role is specific to medical oversight and appropriate decision-making within the regenerative medicine program."],
          },
        ]}
        related={[
          { title: "About Relief Plus", description: "Meet the team and understand how the disciplines differ.", href: "/about" },
          { title: "Regenerative Medicine", description: "Review Relief Plus’s careful advanced-care framework.", href: "/regenerative-cellular-therapy-lafayette" },
          { title: "PRP Therapy", description: "Learn about evidence, preparation, candidacy, and alternatives.", href: "/prp-therapy-lafayette" },
          { title: "Ozone Injection Therapy", description: "Understand the proposed role, evidence limits, and questions to ask.", href: "/ozone-injection-therapy-lafayette" },
          { title: "Trigger Point Injections", description: "Explore this focused option for selected myofascial pain.", href: "/trigger-point-injections-lafayette" },
          { title: "Clinical Standards", description: "How Relief Plus develops and reviews health information.", href: "/clinical-standards-editorial-review" },
        ]}
      />
    </>
  );
}
