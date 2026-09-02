import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createPageMetadata, createServiceStructuredData } from "@/lib/seo";

const path = "/invisared-weight-loss-lafayette" as const;
const title = "InvisaRED Body Contouring in Lafayette, LA";
const description =
  "Learn about InvisaRED body-contouring and circumference-focused wellness services at Relief Plus in Lafayette, serving Carencro and Acadiana.";

export const metadata = createPageMetadata({ title, description, path });

export default function InvisaRedPage() {
  return (
    <>
      <JsonLd
        data={createServiceStructuredData({
          name: "InvisaRED Body Contouring",
          description,
          path,
        })}
      />
      <InfoPageShell
        path={path}
        breadcrumbLabel="InvisaRED Body Contouring"
        eyebrow="Wellness and Body Contouring"
        title="A measured conversation about body-contouring goals."
        description="Relief Plus offers InvisaRED as a distinct wellness service for people interested in body contouring and circumference-focused goals. It is not presented as medical weight-loss treatment, a treatment for disease, or a guaranteed way to change body composition."
        heroPoints={[
          "Goals and expectations discussed before beginning",
          "Separate from chiropractic, physical therapy, and regenerative medicine",
          "No guaranteed amount, location, or permanence of change",
        ]}
        sections={[
          {
            eyebrow: "What This Service Is",
            title: "Body contouring is different from medical weight management.",
            paragraphs: [
              "The purpose of this service is to support a conversation about appearance, body-contouring, and circumference goals. Scale weight, body circumference, body composition, and overall health are related but different measurements, and a change in one does not guarantee a change in another.",
              "InvisaRED should not be understood as treatment for obesity, diabetes, metabolic disease, or another health condition. People seeking diagnosis or medical management of weight-related concerns should discuss those needs with an appropriately qualified medical professional.",
            ],
          },
          {
            eyebrow: "Realistic Expectations",
            title: "Individual response cannot be predicted or promised.",
            paragraphs: [
              "Relief Plus does not promise a particular number of inches, pounds, sessions, or a permanent result. The service does not guarantee change in a specific body area, and it should not replace nutrition, physical activity, sleep, or medical care when those are relevant to a person's goals.",
              "A useful consultation should clarify what you hope to change, how progress would be measured, what the service can and cannot reasonably address, and whether the commitment fits your expectations.",
            ],
          },
          {
            eyebrow: "Before You Decide",
            title: "Ask clear questions about the service being offered.",
            items: [
              {
                title: "What is being measured?",
                description:
                  "Ask whether progress will be discussed in terms of circumference, photographs, clothing fit, scale weight, or another measure—and what that measure can actually show.",
              },
              {
                title: "What should I expect?",
                description:
                  "Discuss the appointment process, comfort, practical preparation, follow-up, cost, and the limits of what can be predicted before starting.",
              },
              {
                title: "Is this appropriate for me?",
                description:
                  "Share relevant health history and ask whether any concern should be reviewed medically or makes the service unsuitable.",
              },
              {
                title: "What are the alternatives?",
                description:
                  "Consider whether general wellness support, nutrition guidance, exercise, or medical evaluation better matches the goal you want to address.",
              },
            ],
          },
          {
            eyebrow: "A Separate Wellness Role",
            title: "This service does not replace the three clinical pillars.",
            paragraphs: [
              "InvisaRED is not grouped under chiropractic, physical therapy, or regenerative medicine. Those services address musculoskeletal examination, rehabilitation, or carefully selected clinical treatment options. Body contouring has a different purpose and should be evaluated on its own terms.",
              "Relief Plus serves people from Lafayette, Carencro, and throughout Acadiana. A phone conversation can help determine whether an InvisaRED consultation or a different type of care is the appropriate next step.",
            ],
          },
        ]}
        cta={{
          title: "Ask whether InvisaRED fits your goals.",
          description:
            "Call Relief Plus to discuss the service, its limits, and what information you should understand before making a decision.",
        }}
      />
    </>
  );
}
