export type PillarLink = {
  title: string;
  description: string;
  href: string;
};

type ContentItem = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type EducationSection = {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: ContentItem[];
  sources?: Array<{ label: string; href: string }>;
};

export type PillarPageData = {
  path: `/${string}`;
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  heroDescription: string;
  heroPoints: string[];
  overviewTitle: string;
  overviewParagraphs: string[];
  serviceTitle: string;
  serviceSteps: ContentItem[];
  whoTitle: string;
  whoDescription: string;
  considerations: ContentItem[];
  conditionsDescription: string;
  conditions: Array<{ title: string; href: string }>;
  approachDescription: string;
  relatedServices: PillarLink[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  educationSections?: EducationSection[];
  pageSources?: Array<{ label: string; href: string; note: string }>;
  sourcesEyebrow?: string;
  sourcesTitle?: string;
  featureImage?: {
    src: `/${string}`;
    alt: string;
    caption?: string;
    objectPosition?: string;
  };
};

export const chiropracticPage: PillarPageData = {
  path: "/chiropractic-adjustments-lafayette",
  breadcrumbLabel: "Chiropractic Adjustments",
  eyebrow: "Chiropractic Care in Lafayette, Louisiana",
  h1: "Chiropractic adjustments built around how you move.",
  seoTitle: "Chiropractic Adjustments in Lafayette, LA",
  seoDescription:
    "Chiropractic adjustments in Lafayette, LA at Relief Plus, with individualized musculoskeletal care for movement, joint function, and recovery.",
  heroDescription:
    "Relief Plus provides individualized chiropractic care for people throughout Lafayette, Carencro, and Acadiana. Each plan begins with an examination and a clear understanding of the joints, movement patterns, and daily demands involved.",
  heroPoints: [
    "Musculoskeletal examination before treatment decisions",
    "Specific care selected for the individual patient",
    "Movement and function considered alongside symptoms",
  ],
  overviewTitle: "Chiropractic is a primary pillar of musculoskeletal care.",
  overviewParagraphs: [
    "Pain and stiffness can reflect more than one contributing factor. A chiropractic evaluation considers symptom history, joint motion, movement, function, and the activities that matter to the patient.",
    "When chiropractic care is appropriate, adjustments may be used as part of a broader plan to address restricted joint motion and support more comfortable movement. Exercise, physical therapy, or other treatments may also be considered when they fit the clinical picture.",
  ],
  serviceTitle: "What chiropractic care involves.",
  serviceSteps: [
    {
      title: "Examination",
      description:
        "Care begins by discussing symptoms, health history, movement limitations, and goals, followed by an appropriate musculoskeletal examination.",
    },
    {
      title: "Individualized adjustments",
      description:
        "A chiropractic adjustment is a controlled movement applied to a joint. Technique and treatment selection depend on the examination and patient needs.",
    },
    {
      title: "Functional progression",
      description:
        "The plan may include movement guidance, exercise, rehabilitation, or another service when those options may contribute to recovery and function.",
    },
  ],
  whoTitle: "Who may be evaluated for chiropractic care?",
  whoDescription:
    "Chiropractic care may be considered for a range of musculoskeletal concerns. An evaluation helps determine whether it is appropriate and whether another service or referral should be part of the plan.",
  considerations: [
    { title: "Pain or stiffness", description: "Symptoms involving the spine, joints, or surrounding muscles." },
    { title: "Restricted movement", description: "Difficulty moving comfortably during work, exercise, or daily life." },
    { title: "Recent injury", description: "Musculoskeletal symptoms following an accident, sport, or work activity." },
    { title: "Recurring limitations", description: "Problems that continue to interfere with function or quality of life." },
  ],
  conditionsDescription:
    "These pages represent common concerns evaluated at Relief Plus. A condition name alone does not determine whether an adjustment or any particular treatment is appropriate.",
  conditions: [
    { title: "Neck Pain", href: "/neck-pain-lafayette" },
    { title: "Back Pain", href: "/back-pain-lafayette" },
    { title: "Sciatica", href: "/sciatica-treatment-lafayette" },
    { title: "Headaches", href: "/headache-treatment-lafayette" },
    { title: "Herniated Disc", href: "/herniated-disc-lafayette" },
    { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" },
    { title: "Car Accident Injuries", href: "/car-accident-injuries-lafayette" },
    { title: "Work Injuries", href: "/work-injury-lafayette" },
  ],
  approachDescription:
    "Chiropractic stands alongside physical therapy and regenerative medicine at Relief Plus. Depending on the examination and goals, one pillar may lead the plan or multiple services may work together over time.",
  relatedServices: [
    {
      title: "Meet Dr. Johnston",
      description: "Learn about the Relief Plus founder’s background and approach to chiropractic care.",
      href: "/dr-shawn-johnston-dc",
    },
    {
      title: "Physical Therapy",
      description: "Progressive rehabilitation focused on mobility, strength, and function.",
      href: "/physical-therapy-lafayette",
    },
    {
      title: "Dry Needling",
      description: "A targeted option that may be considered for certain muscular concerns.",
      href: "/dry-needling-lafayette",
    },
    {
      title: "Shockwave Therapy",
      description: "An advanced treatment option evaluated for selected soft-tissue conditions.",
      href: "/shockwave-therapy-lafayette",
    },
  ],
  faqs: [
    {
      question: "Does every chiropractic visit include an adjustment?",
      answer: "No. Treatment decisions depend on the examination, current symptoms, health history, goals, and whether an adjustment is clinically appropriate.",
    },
    {
      question: "How many visits will I need?",
      answer: "The appropriate frequency and duration vary by condition, response, functional goals, and other individual factors. The plan should be reviewed as care progresses.",
    },
    {
      question: "Can chiropractic work with physical therapy?",
      answer: "Yes, when appropriate. Chiropractic may address joint motion while physical therapy develops mobility, strength, control, and a progressive return to activity.",
    },
  ],
  ctaTitle: "Start with a thoughtful chiropractic evaluation.",
  ctaDescription:
    "Call Relief Plus to discuss an appointment for chiropractic care in Lafayette and the surrounding Acadiana community.",
};

export const physicalTherapyPage: PillarPageData = {
  path: "/physical-therapy-lafayette",
  breadcrumbLabel: "Physical Therapy",
  eyebrow: "Physical Therapy in Lafayette, Louisiana",
  h1: "Rehabilitation designed for stronger, more confident movement.",
  seoTitle: "Physical Therapy in Lafayette, LA",
  seoDescription:
    "Physical therapy in Lafayette, LA at Relief Plus, with individualized rehabilitation for mobility, strength, function, and musculoskeletal recovery.",
  heroDescription:
    "Physical therapy at Relief Plus is centered on restoring mobility, developing strength, and helping patients progress toward meaningful daily, work, and activity goals. Plans are individualized for patients across Lafayette, Carencro, and Acadiana.",
  heroPoints: [
    "Evaluation of mobility, strength, control, and function",
    "Exercise and progression matched to individual goals",
    "Coordination with other care when clinically appropriate",
  ],
  featureImage: {
    src: "/physical-therapy-reformer-relief-plus.png",
    alt: "Patient performing a controlled reformer exercise at Relief Plus",
    caption: "Rehabilitation can progress mobility, strength, control, and confidence around the activities that matter.",
  },
  overviewTitle: "Recovery requires a plan that can progress with you.",
  overviewParagraphs: [
    "Musculoskeletal rehabilitation is not simply a list of exercises. It begins with understanding what a person needs to do, what is currently limited, and which physical factors may be contributing to that limitation.",
    "Physical therapy uses guided movement, exercise, education, and hands-on strategies as appropriate. The plan can change as mobility, strength, tolerance, and confidence improve.",
  ],
  serviceTitle: "What physical therapy involves.",
  serviceSteps: [
    {
      title: "Functional evaluation",
      description: "The initial assessment considers movement, mobility, strength, symptoms, activity demands, and the goals that will guide rehabilitation.",
    },
    {
      title: "Guided rehabilitation",
      description: "Treatment may include therapeutic exercise, movement retraining, hands-on care, and practical strategies selected for the individual.",
    },
    {
      title: "Measured progression",
      description: "Exercises and activities are adjusted over time to build capacity and support a safe, useful return to daily life, work, or recreation.",
    },
  ],
  whoTitle: "Who may benefit from a rehabilitation evaluation?",
  whoDescription:
    "Physical therapy may be appropriate for pain, weakness, mobility loss, injury recovery, or difficulty returning to an important activity. The evaluation helps establish realistic priorities and progression.",
  considerations: [
    { title: "Mobility limitations", description: "Restricted motion that affects daily tasks or activity." },
    { title: "Strength or control deficits", description: "Reduced capacity, stability, or confidence with movement." },
    { title: "Injury recovery", description: "A structured progression following a musculoskeletal injury." },
    { title: "Return to activity", description: "Preparation for work, recreation, exercise, or everyday demands." },
  ],
  conditionsDescription:
    "Physical therapy may be included in care for these concerns when the evaluation identifies rehabilitation needs. The plan and progression vary for every patient.",
  conditions: [
    { title: "Shoulder Pain", href: "/shoulder-pain-lafayette" },
    { title: "Knee Pain", href: "/knee-pain-lafayette" },
    { title: "Hip Pain", href: "/hip-pain-lafayette" },
    { title: "Back Pain", href: "/back-pain-lafayette" },
    { title: "Neck Pain", href: "/neck-pain-lafayette" },
    { title: "Tendonitis", href: "/tendonitis-treatment-lafayette" },
    { title: "Work Injuries", href: "/work-injury-lafayette" },
    { title: "Car Accident Injuries", href: "/car-accident-injuries-lafayette" },
  ],
  approachDescription:
    "Physical therapy may stand alone or work alongside chiropractic care when joint motion, strength, movement control, and activity tolerance all need attention. Advanced regenerative options remain a separate consideration based on clinical appropriateness.",
  relatedServices: [
    {
      title: "Meet Jeanne Saucier, PT",
      description: "Physical therapy at Relief Plus is provided by Jeanne Saucier, PT. Learn about her education, clinical background, and approach to progressive rehabilitation.",
      href: "/jeanne-saucier-pt",
    },
    {
      title: "Chiropractic Care",
      description: "Musculoskeletal care focused on joint motion, movement, and function.",
      href: "/chiropractic-adjustments-lafayette",
    },
    {
      title: "Dry Needling",
      description: "A targeted option that may complement rehabilitation for selected muscular concerns.",
      href: "/dry-needling-lafayette",
    },
    {
      title: "Class IV Laser Therapy",
      description: "An advanced modality considered in context with the broader recovery plan.",
      href: "/class-iv-laser-therapy-lafayette",
    },
  ],
  faqs: [
    {
      question: "What happens during a physical therapy evaluation?",
      answer: "The evaluation considers symptoms, movement, mobility, strength, activity demands, and personal goals. Those findings guide the initial rehabilitation plan.",
    },
    {
      question: "Will the program change over time?",
      answer: "Usually. Rehabilitation should progress in response to tolerance, function, goals, and clinical findings rather than remain the same throughout care.",
    },
    {
      question: "Can physical therapy and chiropractic be used together?",
      answer: "They can be coordinated when appropriate. The decision depends on the condition, examination findings, response to care, and the needs of the individual patient.",
    },
  ],
  ctaTitle: "Build a practical path back to function.",
  ctaDescription:
    "Call Relief Plus to discuss a physical therapy evaluation in Lafayette and an individualized approach to movement and recovery.",
};

export const regenerativePage: PillarPageData = {
  path: "/regenerative-cellular-therapy-lafayette",
  breadcrumbLabel: "Regenerative Cellular Therapy",
  eyebrow: "Regenerative Medicine in Lafayette, Louisiana",
  h1: "Regenerative medicine explored with scientific interest, transparency, and care.",
  seoTitle: "Regenerative Cellular Therapy in Lafayette, LA",
  seoDescription:
    "Regenerative cellular therapy in Lafayette, LA at Relief Plus, with advanced options considered through examination, goals, and clinical appropriateness.",
  heroDescription:
    "Regenerative medicine is the advanced-treatment pillar at Relief Plus, bringing thoughtful clinical evaluation to a rapidly evolving area of musculoskeletal care. Each conversation connects scientific interest with the patient’s condition, goals, and the exact option being considered.",
  heroPoints: [
    "Advanced options evaluated for a defined musculoskeletal need",
    "Evidence and product details translated into a clear patient discussion",
    "Treatment coordinated with movement and rehabilitation when appropriate",
  ],
  featureImage: {
    src: "/ozone-therapy-preparation-relief-plus.png",
    alt: "Ozone generator with a sterile drape and prepared clinical supplies at Relief Plus",
    caption: "Advanced options begin with careful preparation, a defined clinical purpose, and an informed patient discussion.",
  },
  overviewTitle: "Advanced options can add value when the science, product, and patient align.",
  overviewParagraphs: [
    "Regenerative medicine refers to a group of advanced treatment options being explored for selected musculoskeletal concerns. The field’s scientific momentum makes it an important conversation for some patients, while its breadth makes product-specific evidence essential.",
    "At Relief Plus, the conversation begins with an examination, the nature and duration of the problem, prior treatment, functional goals, and the alternatives available. That context helps identify when an advanced option may have a defensible role in a broader recovery plan.",
  ],
  serviceTitle: "How regenerative options are considered.",
  serviceSteps: [
    {
      title: "Clinical assessment",
      description: "The process begins by evaluating the condition, symptoms, function, relevant history, prior care, and the goals that matter to the patient.",
    },
    {
      title: "Candidacy discussion",
      description: "Potential benefits, limitations, alternatives, and clinical appropriateness should be discussed before any treatment decision is made.",
    },
    {
      title: "Coordinated recovery",
      description: "When appropriate, an advanced option may be coordinated with rehabilitation, activity guidance, or another part of the broader care plan.",
    },
  ],
  whoTitle: "The best advanced-care decisions start with thoughtful candidacy.",
  whoDescription:
    "A regenerative consultation does not assume that treatment will be recommended. Candidacy depends on examination findings, the condition, health considerations, goals, and reasonable alternatives.",
  considerations: [
    { title: "The condition", description: "The tissue, joint, or musculoskeletal problem under evaluation." },
    { title: "Prior care", description: "What has already been tried and how the condition responded." },
    { title: "Functional goals", description: "The activities and quality-of-life priorities guiding the decision." },
    { title: "Clinical appropriateness", description: "Whether an option reasonably fits the patient and the overall plan." },
  ],
  conditionsDescription:
    "Advanced treatment options may be discussed for selected joint or soft-tissue concerns, but a linked condition does not establish candidacy or imply that regenerative care will be recommended.",
  conditions: [
    { title: "Shoulder Pain", href: "/shoulder-pain-lafayette" },
    { title: "Knee Pain", href: "/knee-pain-lafayette" },
    { title: "Hip Pain", href: "/hip-pain-lafayette" },
    { title: "Tendonitis", href: "/tendonitis-treatment-lafayette" },
  ],
  approachDescription:
    "Regenerative medicine does not replace a complete musculoskeletal approach. Chiropractic care, physical therapy, activity modification, or other options may be more appropriate, or may be coordinated as part of a broader plan.",
  relatedServices: [
    {
      title: "Meet Dr. Reed",
      description: "Learn about physician oversight and medical decision-making in the regenerative medicine program.",
      href: "/dr-ashton-reed-md",
    },
    {
      title: "PRP Therapy",
      description: "A separate advanced treatment page for patients exploring PRP as a possible option.",
      href: "/prp-therapy-lafayette",
    },
    {
      title: "Ozone Injection Therapy",
      description: "An injection-based option considered for selected musculoskeletal concerns.",
      href: "/ozone-injection-therapy-lafayette",
    },
    {
      title: "Regenerative Cellular Therapy",
      description: "Patient education about product identity, evidence, regulation, and informed questions.",
      href: "/regenerative-cellular-therapy-lafayette#cellular-therapy",
    },
  ],
  faqs: [
    {
      question: "Is regenerative medicine appropriate for everyone?",
      answer: "No. Candidacy depends on the condition, examination findings, health considerations, goals, prior care, and available alternatives.",
    },
    {
      question: "Does a consultation mean treatment will be recommended?",
      answer: "No. A consultation is an opportunity to evaluate the problem and discuss whether an advanced option, another form of care, or a different next step is most appropriate.",
    },
    {
      question: "Can regenerative medicine be combined with rehabilitation?",
      answer: "Rehabilitation or movement guidance may be part of the broader plan when clinically appropriate. The sequence and combination of care depend on individual needs.",
    },
  ],
  ctaTitle: "Begin with a candidacy conversation.",
  ctaDescription:
    "Call Relief Plus to discuss an evaluation and whether a regenerative medicine consultation may be an appropriate next step.",
};
