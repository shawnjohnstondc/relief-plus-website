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
  heading: string;
  hero: string;
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
    h1: seed.heading,
    seoTitle: `${seed.shortName} Treatment in Lafayette, LA`,
    seoDescription: seed.description,
    heroDescription: seed.hero,
    heroPoints: [
      "Understand what may be causing your symptoms",
      "Discuss care options and when referral may help",
      "Track changes in pain and daily activity",
    ],
    overviewTitle: `What might explain your symptoms?`,
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
    ctaDescription: "Call our Lafayette clinic to arrange a visit. Tell us what hurts and which daily activities you want help with.",
    educationSections: seed.clinical.educationSections,
    pageSources: seed.clinical.pageSources,
  };
}

const chiropractic = { title: "Chiropractic", description: "Musculoskeletal care focused on joint motion and function.", href: "/chiropractic-adjustments-lafayette" };
const pt = { title: "Physical Therapy", description: "Progressive rehabilitation for mobility, strength, and function.", href: "/physical-therapy-lafayette" };
const decompression = { title: "Spinal Decompression", description: "Learn about table-based traction, its evidence limits, and questions to ask before a trial.", href: "/spinal-decompression-lafayette" };
const dry = { title: "Dry Needling", description: "A targeted option considered for selected muscular concerns.", href: "/dry-needling-lafayette" };

export const backPainPage = createConditionPage({
  hero: "Back pain can make yardwork, a long drive, or getting out of bed difficult. At Relief Plus, we ask what brings on your pain, check your movement and nerve function when needed, and help you understand your care options.",
  heading: "Back pain care for the activities you miss.",
  path: "/back-pain-lafayette", name: "Back pain care", shortName: "Back Pain",
  description: "Back pain treatment in Lafayette, LA with individualized evaluation and conservative musculoskeletal care at Relief Plus.",
  overview: ["Back pain may involve joints, muscles, discs, nerves, or the demands of activity. Several factors can overlap. Where it hurts and how strong the pain feels cannot identify the cause on their own.", "We ask how your pain began, what changes it, and whether it travels into a leg. We also look at how it affects your work, sleep, movement, and the activities you enjoy."],
  symptoms: [{ title: "Aching or stiffness", description: "Symptoms may be local, intermittent, or affected by position." }, { title: "Movement limits", description: "Bending, lifting, sitting, or standing may become difficult." }, { title: "Radiating symptoms", description: "Pain, tingling, or numbness may extend into a leg." }, { title: "Reduced capacity", description: "Work, exercise, sleep, or daily routines may be affected." }],
  related: [{ title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, decompression, { title: "Class IV Laser Therapy", description: "An adjunct considered within an appropriate care plan.", href: "/class-iv-laser-therapy-lafayette" }],
  clinical: backPainClinical,
});

export const neckPainPage = createConditionPage({
  hero: "Turning to check traffic, working at a screen, or finding a comfortable sleep position may be difficult with neck pain. We look at what changes your symptoms and whether headaches, arm pain, or numbness need further attention.",
  heading: "Understand your neck pain and your next step.",
  path: "/neck-pain-lafayette", name: "Neck pain care", shortName: "Neck Pain",
  description: "Neck pain treatment in Lafayette, LA with individualized evaluation of movement, function, and related symptoms at Relief Plus.",
  overview: ["Your neck may feel stiff or achy, or you may have sharper pain when you turn or hold a position. Headaches or symptoms traveling toward an arm can occur too.", "Several conditions can feel similar. An examination helps us consider the possible causes and choose care based on more than one symptom."],
  symptoms: [{ title: "Stiffness", description: "Turning or positioning the head may feel restricted." }, { title: "Local pain", description: "Aching or sharper discomfort may occur around the neck and upper back." }, { title: "Arm symptoms", description: "Some concerns include tingling, numbness, or discomfort into an arm." }, { title: "Headache pattern", description: "Neck symptoms and certain headache patterns may occur together." }],
  related: [{ title: "Headaches", href: "/headache-treatment-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }],
  care: [chiropractic, pt, dry],
  clinical: neckPainClinical,
});

export const sciaticaPage = createConditionPage({
  hero: "Pain, tingling, or burning that travels from your back or buttock into your leg may be called sciatica. We assess the pattern and your nerve function to help explain the cause and decide whether rehabilitation or further medical care should come first.",
  heading: "Sciatica care starts with understanding your leg symptoms.",
  path: "/sciatica-treatment-lafayette", name: "Sciatica care", shortName: "Sciatica",
  description: "Sciatica treatment in Lafayette, LA with evaluation of radiating leg symptoms, movement, and function at Relief Plus.",
  overview: ["Sciatica describes symptoms such as pain, burning, tingling, numbness, or weakness traveling into a leg along the sciatic nerve pathway. It names a pattern, not the full cause.", "We look at what changes your symptoms and check movement and nerve function. That helps us consider the likely source and decide what needs attention first."],
  symptoms: [{ title: "Radiating pain", description: "Discomfort may travel from the low back or buttock into a leg." }, { title: "Tingling or numbness", description: "Altered sensation may occur along part of the leg or foot." }, { title: "Burning symptoms", description: "Some people describe a hot, electric, or sharp quality." }, { title: "Strength changes", description: "Weakness or reduced control warrants careful evaluation." }],
  related: [{ title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, decompression, dry],
  clinical: sciaticaClinical,
});

export const herniatedDiscPage = createConditionPage({
  hero: "A scan may mention a herniated disc, but that does not tell the whole story. We compare the scan with your pain, movement, strength, and sensation to see whether it helps explain your symptoms and what care may fit.",
  heading: "A herniated disc finding deserves a clear explanation.",
  path: "/herniated-disc-lafayette", name: "Herniated disc care", shortName: "Herniated Disc",
  description: "Herniated disc treatment in Lafayette, LA with individualized evaluation of symptoms, function, and examination findings at Relief Plus.",
  overview: ["Discs sit between the bones of your spine and help it handle weight and movement. A disc change on a scan may or may not explain your symptoms. We interpret the scan alongside your examination.", "Pain may stay in your neck or back or travel into an arm or leg. Numbness, tingling, or weakness can also occur. Your symptoms and what you can do matter when choosing care."],
  symptoms: [{ title: "Spinal pain", description: "Symptoms may be felt in the neck or lower back." }, { title: "Radiating discomfort", description: "Pain may extend into an arm or leg." }, { title: "Sensation changes", description: "Tingling or numbness can occur in some presentations." }, { title: "Functional limits", description: "Sitting, lifting, walking, or other tasks may be affected." }],
  related: [{ title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Neck Pain", href: "/neck-pain-lafayette" }, { title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" }],
  care: [chiropractic, pt, decompression, { title: "Class IV Laser Therapy", description: "A non-invasive adjunct considered only for selected presentations within a broader plan.", href: "/class-iv-laser-therapy-lafayette" }],
  clinical: herniatedDiscClinical,
});

export const pinchedNervePage = createConditionPage({
  hero: "Pins and needles, numbness, or pain traveling into an arm or leg can interrupt sleep and daily tasks. We check where the symptoms travel, what changes them, and whether there is weakness that needs prompt attention.",
  heading: "Find out what may be causing your nerve symptoms.",
  path: "/pinched-nerve-lafayette", name: "Pinched nerve care", shortName: "Pinched Nerve",
  description: "Pinched nerve treatment in Lafayette, LA with careful evaluation of pain, sensation, strength, movement, and function at Relief Plus.",
  overview: ["“Pinched nerve” is a common name for symptoms thought to involve nerve irritation or pressure. Pain, tingling, numbness, and weakness can each have more than one explanation.", "We ask about the pattern and examine relevant movement and nerve function. We also check for signs that need further medical evaluation before deciding on care."],
  symptoms: [{ title: "Tingling", description: "Pins-and-needles sensations may follow a particular pattern." }, { title: "Numbness", description: "Reduced or altered feeling may affect an arm, hand, leg, or foot." }, { title: "Radiating pain", description: "Symptoms may travel away from the neck or back." }, { title: "Weakness", description: "Strength or control changes deserve prompt clinical attention." }],
  related: [{ title: "Neck Pain", href: "/neck-pain-lafayette" }, { title: "Back Pain", href: "/back-pain-lafayette" }, { title: "Sciatica", href: "/sciatica-treatment-lafayette" }, { title: "Herniated Disc", href: "/herniated-disc-lafayette" }],
  care: [chiropractic, pt, dry],
  clinical: pinchedNerveClinical,
});
