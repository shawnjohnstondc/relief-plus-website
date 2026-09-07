import type { PillarPageData } from "./pillar-pages";

export const decompressionPage: PillarPageData = {
  path: "/spinal-decompression-lafayette",
  breadcrumbLabel: "Spinal Decompression",
  eyebrow: "Spinal Decompression in Lafayette, Louisiana",
  h1: "Decompression care starts with understanding your back pain.",
  seoTitle: "Spinal Decompression in Lafayette, LA",
  seoDescription: "Learn about nonsurgical spinal decompression at Relief Plus in Lafayette: how traction works, what to expect, evidence limits, and when other care is needed.",
  heroDescription: "Back pain or symptoms traveling into your leg can make sitting, walking, and work difficult. Nonsurgical decompression uses controlled traction—a pulling force applied through a treatment table. At Relief Plus, an examination comes first to help you understand whether it is an option worth considering.",
  heroPoints: [
    "Start with your symptoms, movement, and nerve function",
    "Understand the purpose and limits of traction",
    "Reassess how you feel and what you can do",
  ],
  featureImage: {
    src: "/dr.shawn-decompression.png",
    alt: "Dr. Shawn Johnston beside a patient positioned on a spinal decompression table at Relief Plus",
    caption: "Nonsurgical decompression at Relief Plus in Lafayette.",
    objectPosition: "center center",
  },
  provider: {
    name: "Shawn D. Johnston, D.C.",
    href: "/dr-shawn-johnston-dc",
    description: "Dr. Johnston evaluates back and nerve-related symptoms and discusses conservative care options. Tell us what you have already tried and which activities you want to do more comfortably.",
  },
  answerBlock: {
    supportedTitle: "What the treatment involves",
    supportedText: "A traction table applies a controlled pulling force while your body is supported. Position, force, and your response matter. The aim is to explore whether symptoms change enough to support useful movement.",
    limitsTitle: "What it cannot promise",
    limitsText: "Traction does not put a disc back in place, guarantee tissue repair, or replace surgery when surgery is needed. Research does not support routine traction for low-back pain, and several clinical guidelines recommend against its use in common low-back-pain groups.",
  },
  overviewTitle: "What does nonsurgical decompression mean?",
  overviewParagraphs: [
    "The term is often used for table-based spinal traction. A harness supports part of your body while the equipment applies a measured pulling force. This may be applied steadily or in cycles, depending on the treatment approach.",
    "It is different from decompression surgery, which can remove tissue pressing on a nerve. A table treatment does not remove a herniated disc or prove that a nerve has been freed from pressure. Feeling better during a session is useful information, but it does not establish a lasting change in the spine.",
  ],
  serviceTitle: "What happens during a visit?",
  serviceSteps: [
    { title: "Understand the pattern", description: "We ask where pain travels, what changes it, and whether there is numbness or weakness. The examination may check movement, strength, feeling, reflexes, and walking. Existing imaging is considered when relevant." },
    { title: "Discuss the options", description: "We explain why traction may or may not fit, what the evidence shows, and what other care could address the same goal. You can ask questions or decline treatment." },
    { title: "Check your response", description: "If a trial is agreed on, positioning and traction are selected for you. Tell the clinician about discomfort or changing symptoms. Your response helps determine whether to adjust, stop, or choose another approach." },
  ],
  whoTitle: "Start with the activity that is difficult.",
  whoDescription: "These symptoms can prompt an assessment, but none of them automatically means you need decompression.",
  considerations: [
    { title: "Sitting or driving", description: "Notice how long you can sit and whether a position change or a short walk helps." },
    { title: "Walking or standing", description: "Tell us when symptoms start and whether they stay in your back or travel into a leg." },
    { title: "Bending or lifting", description: "Describe the movement, weight, and repetition involved rather than repeatedly testing a painful task." },
    { title: "Leg symptoms", description: "Pain, tingling, numbness, or weakness needs a careful nerve assessment before treatment decisions." },
  ],
  conditionsDescription: "These guides explain concerns that may come up during a decompression discussion. A condition name or scan finding alone does not show that traction will help.",
  conditions: [
    { title: "Back Pain", href: "/back-pain-lafayette" },
    { title: "Sciatica", href: "/sciatica-treatment-lafayette" },
    { title: "Herniated Disc", href: "/herniated-disc-lafayette" },
    { title: "Pinched Nerve", href: "/pinched-nerve-lafayette" },
  ],
  approachDescription: "Your plan may focus on education, activity changes, exercise, or other care instead of traction. If a traction trial is considered, it should have a clear goal and a reason to continue. A brief change on the table is not the only measure of progress.",
  relatedServices: [
    { title: "Physical Therapy", href: "/physical-therapy-lafayette", description: "Build movement, strength, and endurance for the activities you want back." },
    { title: "Chiropractic Care", href: "/chiropractic-adjustments-lafayette", description: "Learn how an examination guides joint care, movement advice, and other conservative options." },
    { title: "Our Approach", href: "/our-approach", description: "See how symptoms, examination findings, and daily goals shape a care plan." },
  ],
  educationSections: [
    {
      id: "evidence",
      eyebrow: "Evidence and Expectations",
      title: "The research matters when deciding whether to try traction.",
      paragraphs: [
        "Research results vary, and traction has not shown a reliable added benefit for many people with low-back pain. The 2021 physical-therapy guideline recommends against mechanical traction for chronic low-back pain with leg pain because adding it to other care did not improve outcomes. WHO also recommends against routine traction for chronic primary low-back pain.",
        "That means decompression should not be presented as a standard answer for back pain or a disc finding. If a clinician proposes a trial, ask why your situation may warrant it, what alternatives are available, and what would lead you to stop. More force or more visits does not establish a better result.",
      ],
    },
    {
      id: "comfort-and-safety",
      eyebrow: "Safety and When More Evaluation Is Needed",
      title: "Speak up if symptoms worsen or change.",
      paragraphs: [
        "You may notice the pull of traction and pressure from the support harness. The experience should be discussed before starting. Do not try to push through increasing pain, spreading leg symptoms, new numbness, or weakness; tell the treating clinician so treatment can stop and the change can be assessed.",
        "Traction can worsen symptoms in some people. Your clinician needs to know about pregnancy, recent injury or surgery, fragile bones or osteoporosis, known spinal instability, cancer, infection, and other health conditions before deciding whether it is suitable. Some findings call for a different treatment or medical review first.",
        "Seek urgent medical care for new loss of bladder or bowel control, numbness around the saddle or genital area, rapidly worsening leg weakness, or severe symptoms after significant trauma. Back pain with fever, infection risk, unexplained weight loss, or a cancer history also needs prompt medical assessment.",
      ],
    },
    {
      id: "progress",
      eyebrow: "Progress Beyond the Table",
      title: "Judge progress by your day, not just the session.",
      paragraphs: [
        "Can you sit through more of a work task, walk more comfortably, or manage an exercise with less difficulty? Those changes help judge whether the overall plan is useful. Your symptoms later that day and after returning to activity matter too.",
        "Exercise and a gradual return to activity may remain central to recovery. If a trial gives no meaningful benefit or makes symptoms worse, the plan should be reconsidered rather than repeated automatically. Persistent or changing nerve symptoms may call for imaging, medical assessment, or a specialist opinion.",
      ],
    },
  ],
  faqs: [
    { question: "Is decompression the same as traction?", answer: "Nonsurgical spinal decompression commonly refers to traction delivered through a treatment table. Equipment and settings can differ. It is not the same as surgical decompression." },
    { question: "Will it fix a bulging or herniated disc?", answer: "There is no guarantee that traction will relieve symptoms, and it should not be described as putting a disc back in place or repairing it. Your examination and nerve function matter more than a scan label alone." },
    { question: "Is it recommended for everyone with sciatica?", answer: "No. Guidelines recommend against routine use in common low-back-pain groups, including chronic low-back pain with leg pain. Ask about the evidence, other options, and the reason for any proposed trial." },
    { question: "How many visits will I need?", answer: "There is no fixed number that fits everyone. Before starting, discuss the purpose of any trial, when the response will be reviewed, the cost, and what would lead to stopping or changing care." },
    { question: "Do I need a new MRI first?", answer: "Not every person with back pain needs an MRI. Your history and examination help determine whether imaging would change care or whether further medical assessment should come first. Bring any imaging reports you already have." },
    { question: "How do I arrange a visit?", answer: "Call Relief Plus at 337-565-4200. You can start with an assessment of your back or leg symptoms without deciding on decompression beforehand." },
  ],
  pageSources: [
    { label: "Royal Berkshire NHS: Lumbar traction patient guide", href: "https://www.royalberkshire.nhs.uk/media/vlkav1rt/mechanical_manual-lumbar-traction-patient-guide_aug22.pdf", note: "Patient information on traction and health conditions to discuss before treatment." },
    { label: "APTA Orthopedics: Low Back Pain Clinical Practice Guideline (2021)", href: "https://www.orthopt.org/uploads/content_files/files/jospt.2021.0304.pdf", note: "Recommendation against mechanical traction for chronic low-back pain with leg pain." },
    { label: "WHO: Evidence and recommendations for chronic primary low-back pain (2023)", href: "https://www.ncbi.nlm.nih.gov/books/NBK599213/", note: "Traction methods, evidence limits, and recommendation against routine use." },
    { label: "Cochrane: Traction for low-back pain", href: "https://www.cochrane.org/evidence/CD003010_traction-low-back-pain", note: "Review of benefit and reported adverse effects, including increased pain and worsening neurological signs." },
    { label: "Cleveland Clinic: Spinal decompression therapy", href: "https://my.clevelandclinic.org/health/treatments/10874-spinal-decompression-therapy", note: "Overview distinguishing traction and other nonsurgical care from decompression surgery." },
  ],
  showClinicalStandardsLink: true,
  ctaTitle: "Let’s understand your back or leg symptoms.",
  ctaDescription: "Call our Lafayette clinic to arrange an assessment. Bring your questions about decompression, previous care, and the activities you want to return to.",
};
