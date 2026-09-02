import type { PillarPageData } from "./pillar-pages";
import {
  backPainClinical,
  herniatedDiscClinical,
  neckPainClinical,
  pinchedNerveClinical,
  sciaticaClinical,
  type ConditionClinicalContent,
} from "./condition-clinical-content";

type ConditionSeed = {
  path: PillarPageData["path"];
  name: string;
  shortName: string;
  description: string;
  overview: string[];
  symptoms: Array<{ title: string; description: string }>;
  related: Array<{ title: string; href: string }>;
  care: PillarPageData["relatedServices"];
  clinical: ConditionClinicalContent;
};

function createConditionPage(seed: ConditionSeed): PillarPageData {
  return {
    path: seed.path,
    breadcrumbLabel: seed.name,
    eyebrow: `${seed.shortName} Care in Lafayette, Louisiana`,
    h1: `${seed.name} built around a careful evaluation.`,
    seoTitle: `${seed.shortName} Treatment in Lafayette, LA`,
    seoDescription: seed.description,
    heroDescription: `Relief Plus evaluates ${seed.shortName.toLowerCase()} concerns for patients across Lafayette, Carencro, and Acadiana. Care begins by understanding symptoms, function, health history, and the activities affected.`,
    heroPoints: [
      "A condition name does not determine treatment by itself",
      "Examination findings guide clinically appropriate options",
      "Progress is considered in terms of symptoms and function",
    ],
    overviewTitle: `Understanding ${seed.shortName.toLowerCase()} starts with the whole clinical picture.`,
    overviewParagraphs: seed.overview,
    serviceTitle: seed.clinical.serviceTitle,
    serviceSteps: seed.clinical.serviceSteps,
    whoTitle: `How ${seed.shortName.toLowerCase()} can affect daily life.`,
    whoDescription: seed.clinical.whoDescription,
    considerations: seed.symptoms,
    conditionsDescription: `Symptoms can overlap with other musculoskeletal concerns. Explore related pages while remembering that an examination is needed to clarify what may be contributing.`,
    conditions: seed.related,
    approachDescription: seed.clinical.approachDescription,
    relatedServices: seed.care,
    faqs: seed.clinical.faqs,
    ctaTitle: `Take the next step with a ${seed.shortName.toLowerCase()} evaluation.`,
    ctaDescription: "Call Relief Plus to discuss an appointment in Lafayette and a thoughtful path toward movement, function, and recovery.",
    educationSections: seed.clinical.educationSections,
    pageSources: seed.clinical.pageSources,
  };
}

const chiropractic = { title: "Chiropractic", description: "Musculoskeletal care focused on joint motion and function.", href: "/chiropractic-adjustments-lafayette" };
const pt = { title: "Physical Therapy", description: "Progressive rehabilitation for mobility, strength, and function.", href: "/physical-therapy-lafayette" };
const dry = { title: "Dry Needling", description: "A targeted option considered for selected muscular concerns.", href: "/dry-needling-lafayette" };

export const backPainPage = createConditionPage({
  path: "/back-pain-lafayette", name: "Back pain care", shortName: "Back Pain",
  description: "Back pain treatment in Lafayette, LA with individualized evaluation and conservative musculoskeletal care at Relief Plus.",
  overview: ["Back pain may be influenced by joints, muscles, discs, nerves, activity demands, or a combination of factors. Its location and intensity alone do not establish the cause.", "Evaluation considers how symptoms began, what changes them, whether they travel, and how they affect movement, work, sleep, or recreation."],
  symptoms: [{ title: "Aching or stiffness", description: "Symptoms may be local, intermittent, or affected by position." }, { title: "Movement limits", description: "Bending, lifting, sitting, or standing may become difficult." }, { title: "Radiating symptoms", description: "Pain, tingling, or numbness may extend into a leg." }, { title: "Reduced capacity", description: "Work, exercise, sleep, or daily routines may be affected." }],
  related: [{ title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, { title: "Class IV Laser Therapy", description: "An adjunct considered within an appropriate care plan.", href: "/class-iv-laser-therapy-lafayette" }],
  clinical: backPainClinical,
});

export const neckPainPage = createConditionPage({
  path: "/neck-pain-lafayette", name: "Neck pain care", shortName: "Neck Pain",
  description: "Neck pain treatment in Lafayette, LA with individualized evaluation of movement, function, and related symptoms at Relief Plus.",
  overview: ["Neck discomfort may involve stiffness, aching, sharper pain, or symptoms that change with posture and movement. Some people also notice headaches or symptoms extending toward an arm.", "Because neck symptoms have varied causes and presentations, care decisions should follow an examination rather than a single symptom or assumption."],
  symptoms: [{ title: "Stiffness", description: "Turning or positioning the head may feel restricted." }, { title: "Local pain", description: "Aching or sharper discomfort may occur around the neck and upper back." }, { title: "Arm symptoms", description: "Some concerns include tingling, numbness, or discomfort into an arm." }, { title: "Headache pattern", description: "Neck symptoms and certain headache patterns may occur together." }],
  related: [{ title: "Headaches", href: "/headache-treatment-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }],
  care: [chiropractic, pt, dry],
  clinical: neckPainClinical,
});

export const sciaticaPage = createConditionPage({
  path: "/sciatica-treatment-lafayette", name: "Sciatica care", shortName: "Sciatica",
  description: "Sciatica treatment in Lafayette, LA with evaluation of radiating leg symptoms, movement, and function at Relief Plus.",
  overview: ["Sciatica describes a pattern of symptoms associated with irritation involving the sciatic nerve pathway; it is not a complete diagnosis by itself. Symptoms may include pain, burning, tingling, numbness, or weakness extending into a leg.", "The source and contributing factors can vary, so the evaluation looks beyond the location of pain to symptom behavior, neurologic findings, movement, and function."],
  symptoms: [{ title: "Radiating pain", description: "Discomfort may travel from the low back or buttock into a leg." }, { title: "Tingling or numbness", description: "Altered sensation may occur along part of the leg or foot." }, { title: "Burning symptoms", description: "Some people describe a hot, electric, or sharp quality." }, { title: "Strength changes", description: "Weakness or reduced control warrants careful evaluation." }],
  related: [{ title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, dry],
  clinical: sciaticaClinical,
});

export const herniatedDiscPage = createConditionPage({
  path: "/herniated-disc-lafayette", name: "Herniated disc care", shortName: "Herniated Disc",
  description: "Herniated disc treatment in Lafayette, LA with individualized evaluation of symptoms, function, and examination findings at Relief Plus.",
  overview: ["Spinal discs sit between vertebrae and help manage load and movement. A disc finding may or may not explain a person’s symptoms, and imaging findings should be considered alongside the clinical examination.", "Symptoms can be local or travel into an arm or leg and may include pain, numbness, tingling, or weakness. Decisions should reflect symptom behavior and function—not a scan alone."],
  symptoms: [{ title: "Spinal pain", description: "Symptoms may be felt in the neck or lower back." }, { title: "Radiating discomfort", description: "Pain may extend into an arm or leg." }, { title: "Sensation changes", description: "Tingling or numbness can occur in some presentations." }, { title: "Functional limits", description: "Sitting, lifting, walking, or other tasks may be affected." }],
  related: [{ title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Neck Pain", href: "/neck-pain-lafayette" }, { title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, { title: "Class IV Laser Therapy", description: "A non-invasive adjunct considered only for selected presentations within a broader plan.", href: "/class-iv-laser-therapy-lafayette" }],
  clinical: herniatedDiscClinical,
});

export const pinchedNervePage = createConditionPage({
  path: "/pinched-nerve-lafayette", name: "Pinched nerve care", shortName: "Pinched Nerve",
  description: "Pinched nerve treatment in Lafayette, LA with careful evaluation of pain, sensation, strength, movement, and function at Relief Plus.",
  overview: ["The phrase “pinched nerve” is commonly used for symptoms thought to involve nerve irritation or compression. Pain, tingling, numbness, or weakness may occur, but those symptoms can have more than one explanation.", "A focused history and examination help clarify the pattern, screen for findings that may need further evaluation, and guide appropriate next steps."],
  symptoms: [{ title: "Tingling", description: "Pins-and-needles sensations may follow a particular pattern." }, { title: "Numbness", description: "Reduced or altered feeling may affect an arm, hand, leg, or foot." }, { title: "Radiating pain", description: "Symptoms may travel away from the neck or back." }, { title: "Weakness", description: "Strength or control changes deserve prompt clinical attention." }],
  related: [{ title: "Neck Pain", href: "/neck-pain-lafayette" }, { title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }],
  care: [chiropractic, pt, dry],
  clinical: pinchedNerveClinical,
});
