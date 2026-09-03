import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import ProviderPageShell from "@/app/components/ProviderPageShell";
import { createPageMetadata, createProviderProfileStructuredData } from "@/lib/seo";

const path = "/jeanne-saucier-pt" as const;
const description = "Meet Jeanne L. Saucier, PT, a physical therapist at Relief Plus whose clinical experience informs practical, progressive rehabilitation for movement and function.";

export const metadata: Metadata = createPageMetadata({
  title: "Jeanne Saucier, PT | Physical Therapist at Relief Plus",
  description,
  path,
});

export default function JeanneSaucierPage() {
  return (
    <>
      <JsonLd data={createProviderProfileStructuredData({
        path,
        name: "Jeanne L. Saucier",
        honorificSuffix: "PT",
        jobTitle: "Physical Therapist",
        description,
        image: "/jeanne-saucier-pt-relief-plus.webp",
        relationship: "worksFor",
        alumniOf: ["LSU Medical Center — Allied Health"],
      })} />
      <ProviderPageShell
        path={path}
        name="Jeanne Saucier, PT"
        role="Physical Therapist"
        location="Relief Plus · Lafayette, Louisiana"
        introduction="Jeanne brings a broad physical-therapy background to rehabilitation at Relief Plus. Her work helps patients rebuild movement, strength, mobility, endurance, and confidence for the demands of daily life, work, and recreation."
        image={{ src: "/jeanne-saucier-pt-relief-plus.webp", alt: "Jeanne Saucier, PT, physical therapist at Relief Plus" }}
        sections={[
          {
            eyebrow: "Approach to Physical Therapy",
            title: "Rehabilitation that builds useful capacity.",
            paragraphs: [
              "Jeanne’s approach begins with what the patient needs and wants to do. Rehabilitation can address movement, mobility, strength, endurance, activity tolerance, and confidence, then progress those qualities toward the demands of everyday life.",
              "Physical therapy is more than passive treatment alone. Guided movement, progressive exercise and loading, education, and other appropriate strategies can help patients build capacity over time. The plan should respond to the examination, the person’s goals, and how function changes along the way.",
            ],
          },
          {
            eyebrow: "Education",
            title: "A physical-therapy foundation established in 1993.",
            paragraphs: ["Jeanne earned her Bachelor of Science in Physical Therapy from LSU Medical Center’s Allied Health program in New Orleans in 1993."],
            items: [
              { title: "LSU Medical Center — Allied Health", description: "Bachelor of Science in Physical Therapy\nGraduated August 1993\nNew Orleans, Louisiana" },
            ],
          },
          {
            eyebrow: "Depth of Experience",
            title: "A practical perspective shaped across clinical settings.",
            paragraphs: [
              "Jeanne’s physical-therapy experience dates to 1993. Her background spans outpatient rehabilitation, acute care, long-term care, assisted living, home health, pediatric and school-based physical therapy, cardiac rehabilitation, wound care, and general rehabilitation.",
              "That breadth of experience gives her a practical perspective on helping people with different abilities and demands rebuild strength, mobility, endurance, and confidence. These settings describe her professional background; they are not a list of services currently offered by Relief Plus.",
            ],
          },
          {
            eyebrow: "Role at Relief Plus",
            title: "Physical rehabilitation within a multidisciplinary model.",
            paragraphs: [
              "Jeanne’s role at Relief Plus centers on physical rehabilitation and rebuilding functional capacity. Dr. Johnston’s role centers on chiropractic, musculoskeletal evaluation, and appropriate conservative care, while Dr. Reed provides medical oversight for the regenerative medicine program.",
              "Access to distinct clinical perspectives does not mean every patient sees all three providers. Physical therapy may stand alone or coordinate with another part of care when the individual clinical picture supports it.",
            ],
          },
          {
            eyebrow: "Physical Therapy at Relief Plus",
            title: "Care connected to meaningful activity.",
            paragraphs: [
              "A physical-therapy evaluation may be useful when back, neck, shoulder, or knee problems affect movement; when weakness or reduced activity tolerance limits daily life; or when a patient needs a structured progression after an injury.",
              "The aim is not to promise a particular outcome. It is to understand the current limitation, establish useful priorities, and build a measured path toward work, exercise, recreation, or daily activity when appropriate.",
            ],
          },
        ]}
        related={[
          { title: "Physical Therapy", description: "Explore individualized rehabilitation for mobility, strength, and function.", href: "/physical-therapy-lafayette" },
          { title: "About Relief Plus", description: "Understand how the clinic’s three clinical perspectives fit together.", href: "/about" },
          { title: "Meet the Team", description: "See the distinct roles of Relief Plus clinicians.", href: "/team" },
          { title: "Back and Neck Pain", description: "Learn how evaluation and rehabilitation may support movement and function.", href: "/back-pain-lafayette" },
          { title: "Work Injuries", description: "Review individualized care for work demands and return to function.", href: "/work-injury-lafayette" },
          { title: "Sports Injuries", description: "Explore rehabilitation and progressive return-to-activity planning.", href: "/sports-injuries-lafayette" },
        ]}
      />
    </>
  );
}
