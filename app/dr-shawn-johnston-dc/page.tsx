import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import ProviderPageShell from "@/app/components/ProviderPageShell";
import { createPageMetadata, createProviderProfileStructuredData } from "@/lib/seo";

const path = "/dr-shawn-johnston-dc" as const;
const description = "Meet Shawn D. Johnston, D.C., founder of Relief Plus and a Lafayette chiropractor focused on individualized musculoskeletal care, movement, and function.";

export const metadata: Metadata = createPageMetadata({
  title: "Shawn D. Johnston, D.C. | Founder",
  description,
  path,
});

export default function DrShawnJohnstonPage() {
  return (
    <>
      <JsonLd data={createProviderProfileStructuredData({
        path,
        name: "Shawn D. Johnston",
        honorificSuffix: "D.C.",
        jobTitle: "Doctor of Chiropractic and Founder",
        description,
        image: "/shawn-d-johnston-dc-relief-plus.webp",
        relationship: "worksFor",
        alumniOf: ["Logan University", "Freed-Hardeman University"],
        memberOf: ["American Chiropractic Association", "Louisiana Chiropractic Association"],
      })} />
      <ProviderPageShell
        path={path}
        name="Shawn D. Johnston, D.C."
        role="Founder · Doctor of Chiropractic"
        location="Relief Plus · Lafayette, Louisiana"
        introduction="Dr. Johnston founded Relief Plus to give patients an individualized place to begin with chiropractic care while drawing on rehabilitation, physician involvement, and selected advanced options when the clinical picture supports them."
        image={{ src: "/shawn-d-johnston-dc-relief-plus.webp", alt: "Shawn D. Johnston, D.C., founder and chiropractor at Relief Plus", objectPosition: "center top" }}
        quote={{ text: "The goal isn't to do more treatment. It's to understand the person well enough to know what treatment actually makes sense.", attribution: "Shawn D. Johnston, D.C." }}
        sections={[
          {
            eyebrow: "Clinical Philosophy",
            title: "Chiropractic first, but never in isolation.",
            paragraphs: [
              "Chiropractic is foundational to Dr. Johnston’s clinical identity. His approach begins with listening, examination, and the central question: What does this particular patient actually need?",
              "A musculoskeletal diagnosis provides a starting point. The evaluation also considers movement, function, symptom behavior, daily demands, and the patient’s goals. Chiropractic care may be the primary path, while physical therapy, rehabilitation, physician involvement, or another carefully selected option may contribute when appropriate.",
              "Access to more treatment options does not mean every patient receives more treatment. It creates an opportunity to choose care with greater intention and to coordinate disciplines when doing so is useful.",
            ],
          },
          {
            eyebrow: "Education",
            title: "A foundation in chiropractic and life science.",
            items: [
              { title: "Logan University", description: "Doctor of Chiropractic — 2007\nBachelor of Science in Life Science — 2007\nSt. Louis, Missouri" },
              { title: "Freed-Hardeman University", description: "Pre-medical studies in Biology and Chemistry\nHenderson, Tennessee" },
            ],
          },
          {
            eyebrow: "Professional Experience",
            title: "Musculoskeletal care since 2008.",
            paragraphs: [
              "Dr. Johnston began practicing chiropractic in Lafayette in 2008 at Anesthesiology and Pain Consultants. Working in a multidisciplinary pain-management environment alongside anesthesiologists and other medical providers helped shape his appreciation for careful treatment selection and collaboration.",
              "He founded and opened Relief Plus in 2014. The clinic developed around a chiropractic-first foundation with broader access to rehabilitation and selected medical or advanced options when appropriate for the individual patient.",
            ],
            items: [
              { title: "Relief Plus", description: "Founder / Chiropractor\n2014–Present" },
              { title: "Anesthesiology and Pain Consultants", description: "Chiropractor\n2008–2014\nLafayette, Louisiana" },
            ],
          },
          {
            eyebrow: "Selected Training",
            title: "Continuing study across movement and musculoskeletal care.",
            paragraphs: [
              "Dr. Johnston’s owner-verified training includes Dry Needling through the American Dry Needling Association, Class IV Laser Therapy through LightForce, Titleist Performance Institute Level I, Selective Functional Movement Assessment training, and Motion Palpation Institute coursework.",
              "His continuing education has included spinal and extremity assessment, rehabilitation, gait, whiplash-associated disorders, TMJ and orofacial rehabilitation, movement, and related musculoskeletal topics. He has also presented on Selective Functional Movement Assessment for other healthcare professionals. This presentation history is described narrowly and is not intended to imply a broader academic appointment.",
            ],
          },
          {
            eyebrow: "Professional Memberships",
            title: "Connected to the chiropractic profession.",
            items: [
              { title: "American Chiropractic Association", description: "Owner-verified professional membership." },
              { title: "Louisiana Chiropractic Association", description: "Owner-verified professional membership." },
            ],
          },
          {
            eyebrow: "Clinical Interests",
            title: "Care connected to the activities patients value.",
            paragraphs: ["Dr. Johnston’s clinical interests include spine and extremity musculoskeletal conditions, functional movement, coordination with rehabilitation, work and sports injuries, whiplash-associated injuries, TMJ and orofacial rehabilitation, dry needling, and Class IV laser therapy. These interests are not presented as board-certified specialties or guarantees of a particular outcome."],
          },
          {
            eyebrow: "Why Relief Plus",
            title: "A clinic built to keep care personal.",
            paragraphs: [
              "Relief Plus grew from Dr. Johnston’s desire to build a clinic where chiropractic remains foundational but care does not automatically stop at an adjustment. Patients should be evaluated carefully, understand the findings, and receive treatment directed at what is limiting them as individuals.",
              "When another discipline adds value, the clinic can communicate and collaborate. When a patient needs only one kind of care, the plan should stay focused. As Relief Plus grows, the goal is to preserve the relationships, clarity, and personal attention on which it was built.",
            ],
          },
          {
            eyebrow: "Outside the Clinic",
            title: "Relationships, consistency, and a life rooted in Acadiana.",
            paragraphs: [
              "Originally from Tennessee, Dr. Johnston made Acadiana home. He and his wife, Anne-Kathryn—AK—are raising three boys.",
              "Music and faith are important parts of his life. He serves in worship ministry and helps lead worship at church. The values he brings from those parts of life—relationships, trust, consistency, and showing up for people—also shape how he wants patients to experience Relief Plus.",
            ],
          },
        ]}
        related={[
          { title: "About Relief Plus", description: "Learn how the clinic’s complementary disciplines fit together.", href: "/about" },
          { title: "Chiropractic", description: "Explore individualized chiropractic and musculoskeletal care.", href: "/chiropractic-adjustments-lafayette" },
          { title: "Physical Therapy", description: "See how rehabilitation may support strength, movement, and function.", href: "/physical-therapy-lafayette" },
          { title: "Sports Injuries", description: "Review diagnosis-led care and return-to-sport planning.", href: "/sports-injuries-lafayette" },
          { title: "Work Injuries", description: "Learn about evaluation and functional return-to-work care.", href: "/work-injury-lafayette" },
          { title: "Clinical Standards", description: "How Relief Plus develops and maintains health information.", href: "/clinical-standards-editorial-review" },
        ]}
      />
    </>
  );
}
