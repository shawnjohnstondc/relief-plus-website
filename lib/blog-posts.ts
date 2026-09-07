export type BlogLink = { title: string; href: string; description: string };
export type BlogInline = string | { text: string; href: string };
export type BlogParagraph = string | BlogInline[];
export type BlogSection = { heading: string; paragraphs: BlogParagraph[]; bullets?: BlogParagraph[]; numbered?: BlogParagraph[]; clinicalPerspective?: boolean };
export type BlogSource = { id?: string; title: string; organization: string; href: string };

export type BlogPost = {
  slug: string;
  path: `/blog/${string}`;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  summary: string;
  takeaway: string;
  nextStep: string;
  datePublished: string;
  dateModified?: string;
  readTime: string;
  author?: { name: string; href: `/${string}` };
  contributor?: { name: string; href: `/${string}`; role: string };
  reviewedBy?: { name: string; href: `/${string}` };
  lastReviewed?: string;
  scopeNote?: string;
  sections: BlogSection[];
  comparison?: {
    heading: string;
    introduction: string;
    columns: { title: string; items: string[] }[];
    disclaimer: string;
  };
  reviewNote?: string;
  disclaimer?: string;
  related: BlogLink[];
  sources: BlogSource[];
};


import { phaseNineCBlogPosts } from "./phase-nine-c-blog-posts";
import { phaseNineDBlogPosts } from "./phase-nine-d-blog-posts";
import { phaseNineFBlogPosts } from "./phase-nine-f-blog-posts";
import { phaseNineHBlogPosts } from "./phase-nine-h-blog-posts";
import { authorityBlogPosts } from "./authority-blog-posts";
import { bowhuntingShoulderBlogPost } from "./bowhunting-shoulder-blog-post";

const phaseNineBBlogPosts: BlogPost[] = [
  {
    dateModified: "2026-09-07T12:00:00-05:00",
    nextStep: "If jaw pain affects eating or speaking, note when it occurs and whether your jaw locks before arranging an assessment.",
    takeaway: "Jaw pain can involve the joint, chewing muscles, or both. Painless clicking alone is common and usually does not need treatment.",
    slug: "why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la",
    path: "/blog/why-your-jaw-hurts-tmj-pain-guide-for-lafayette-la",
    title: "Why Your Jaw Hurts: A Practical Guide to TMJ Pain",
    seoTitle: "Why Your Jaw Hurts: TMJ Pain Guide | Relief Plus",
    description: "Learn common reasons for jaw pain, clicking, tightness, and facial discomfort, plus conservative first steps and when to seek an evaluation.",
    category: "TMJ & Headache",
    summary: "Chewing feels sore, yawning hurts, or your jaw keeps catching. Learn what may cause these symptoms, which simple steps may help, and when you need a dental or medical assessment.",
    datePublished: "2026-08-04T11:22:10-05:00",
    readTime: "7 min read",
    sections: [
      { heading: "The jaw is more than a hinge", paragraphs: ["Your jaw joints connect your lower jaw to your skull. These are the temporomandibular joints, or TMJs. They work with your chewing muscles, teeth, nerves, and neck when you speak, chew, swallow, or yawn. Problems involving these joints and muscles are called temporomandibular disorders (TMD).", "Symptoms may include pain in the jaw or temple, tenderness in the chewing muscles, limited or painful opening, locking, or painful clicking. Painless clicking is common and, by itself, usually does not require treatment."] },
      { heading: "Common contributors to jaw discomfort", paragraphs: ["Some symptoms are more joint-dominant, while others are primarily muscular. Clenching, grinding, prolonged chewing, an abrupt increase in jaw use, trauma, and stress-related muscle tension may contribute. Neck symptoms and headache can occur alongside TMD, but their presence does not prove that one area caused the other.", "Because tooth problems, sinus symptoms, ear conditions, headache disorders, and other medical issues can resemble TMD, the right starting point is a history and examination rather than self-diagnosis."], bullets: ["Pain or fatigue while chewing", "Jaw tightness or reduced opening", "Painful clicking, catching, or locking", "Face, temple, ear-region, or neck discomfort"] },
      { heading: "What an evaluation may include", paragraphs: ["A clinician may ask when the symptoms began, what movements reproduce them, whether the jaw locks, and how eating, sleep, stress, dental history, and neck symptoms relate. Examination can include jaw motion, muscle tenderness, joint sounds, bite comfort, and relevant neck or neurological findings.", "Not every person needs imaging. A dentist, physician, or another appropriate clinician may be involved when symptoms suggest dental disease, significant trauma, persistent locking, systemic illness, or another diagnosis outside the scope of conservative musculoskeletal care."] },
      { heading: "Calm first steps", paragraphs: ["Many TMD symptoms improve with simple, reversible measures. Temporarily reducing gum chewing and very tough foods, keeping the teeth apart when resting, noticing daytime clenching, and using heat or cold for short periods may help settle an irritated system. A short period of softer foods can be reasonable, but prolonged restriction is rarely the goal.", "Exercises should match the presentation. Aggressive stretching or repeatedly forcing a painful or locked jaw can aggravate symptoms. When movement work is appropriate, it should be comfortable and progressed according to response."] },
      { heading: "When to arrange an assessment", paragraphs: ["Consider an evaluation when pain is frequent or worsening, the jaw repeatedly locks, opening is becoming limited, symptoms interfere with eating or speaking, or headaches and neck symptoms are persistent. Seek timely medical or dental care for major facial trauma, substantial swelling, fever, a new bite change, unexplained numbness, or difficulty swallowing or breathing.", "At Relief Plus, jaw complaints are considered within the broader musculoskeletal picture. Conservative care may include education, movement strategies, and treatment of relevant muscular or neck findings when clinically appropriate. Care is individualized, and dental or medical referral is recommended when the findings call for it."] },
    ],
    related: [
      { title: "TMJ treatment in Lafayette", href: "/tmj-treatment-lafayette", description: "How Relief Plus evaluates jaw pain and function." },
      { title: "Headache treatment", href: "/headache-treatment-lafayette", description: "A measured approach to recurring head pain." },
      { title: "Neck pain care", href: "/neck-pain-lafayette", description: "Explore evaluation and care for neck symptoms." },
    ],
    sources: [
      { title: "TMD (Temporomandibular Disorders)", organization: "National Institute of Dental and Craniofacial Research", href: "https://www.nidcr.nih.gov/health-info/tmd" },
    ],
  },
  {
    dateModified: "2026-09-07T12:00:00-05:00",
    nextStep: "Ask which daily habits or movements are worth changing and whether a dentist should be part of your care.",
    takeaway: "Care for jaw disorders often starts with simple, reversible steps. The right plan depends on whether the main concern involves your muscles, joints, teeth, or a combination.",
    slug: "treating-temporomandibular-joint-dysfunction-with-conservative-care",
    path: "/blog/treating-temporomandibular-joint-dysfunction-with-conservative-care",
    title: "Conservative Care for Temporomandibular Disorders",
    seoTitle: "Conservative Care for TMD and Jaw Pain | Relief Plus",
    description: "Understand conservative, reversible options for TMD, how care may be sequenced, and why treatment should match the individual examination.",
    category: "TMJ & Headache",
    summary: "You want relief from jaw pain, but you may not need a major procedure. This guide explains care that can be adjusted or stopped, from changing chewing habits to movement work and dental input.",
    datePublished: "2024-03-19T08:41:04-05:00",
    readTime: "8 min read",
    sections: [
      { heading: "Why conservative care usually comes first", paragraphs: ["Jaw-joint and chewing-muscle disorders are often grouped under the name TMD. Many improve over time. National guidance recommends starting with care that can be adjusted or stopped, rather than making permanent changes to your teeth, bite, or jaw joint.", "Conservative does not mean passive. It means choosing the least invasive reasonable option, monitoring response, and escalating only when the diagnosis and clinical course support it."] },
      { heading: "Adjust chewing and clenching habits", paragraphs: ["The first phase often focuses on understanding aggravating habits and reducing unnecessary strain. Examples include limiting gum chewing, avoiding repeated wide opening, modifying very hard or chewy foods for a short period, and practicing a relaxed resting jaw position with the teeth apart.", "Stress does not make symptoms imaginary. It can influence clenching, sleep, pain sensitivity, and muscle tension. Awareness and practical coping strategies may be useful parts of care without suggesting that stress is the sole cause."] },
      { heading: "Movement and rehabilitation", paragraphs: ["When appropriate, rehabilitation may address controlled jaw opening, coordination, chewing-muscle tolerance, posture, and relevant neck or shoulder-girdle findings. Cervical findings can be considered when neck movement or muscle sensitivity relates to the complaint, without assuming the neck is always the cause. The dose matters: movement should generally remain comfortable, and progression should reflect irritability and function.", "Physical therapy and hands-on care may help selected patients, but research certainty varies by intervention. Chiropractic care may address relevant neck or musculoskeletal findings without claiming to realign the jaw. Dry needling may be considered for a distinct muscular contributor when appropriate; it does not correct the joint or replace dental evaluation. A favorable short-term response does not establish that one technique is necessary for everyone."] },
      { heading: "Oral appliances and coordinated care", paragraphs: ["A dentist may recommend an oral appliance for a specific purpose, such as managing nighttime grinding or protecting the teeth. Appliances should be monitored; they are not a universal cure and should not permanently change the bite without a clear indication and informed discussion.", "Coordination with a dentist or physician is important when tooth disease, infection, inflammatory arthritis, substantial trauma, recurrent dislocation, persistent locking, or another medical condition may be involved."] },
      { heading: "How progress is judged", paragraphs: ["Useful outcomes include easier eating and speaking, improved comfortable opening, fewer locking episodes, and better tolerance of daily activity—not simply whether a joint sound disappears. Painless clicking can remain even when function is good.", "Relief Plus uses examination findings, symptom behavior, goals, and response over time to guide conservative options. If the presentation is not improving as expected, the plan should be reconsidered rather than continued automatically."] },
    ],
    related: [
      { title: "TMJ treatment in Lafayette", href: "/tmj-treatment-lafayette", description: "Review Relief Plus evaluation and care pathways." },
      { title: "Physical therapy", href: "/physical-therapy-lafayette", description: "Learn how rehabilitation supports movement and function." },
      { title: "Dry needling", href: "/dry-needling-lafayette", description: "Understand when this may be considered for selected muscular contributors." },
      { title: "Chiropractic care", href: "/chiropractic-adjustments-lafayette", description: "See how relevant neck and musculoskeletal findings may be addressed." },
    ],
    sources: [
      { title: "TMD: Treatment guidance", organization: "National Institute of Dental and Craniofacial Research", href: "https://www.nidcr.nih.gov/health-info/tmd" },
      { title: "Physical therapy for temporomandibular disorders: umbrella review", organization: "Journal of Clinical Medicine / PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/36769437/" },
    ],
  },
  {
    dateModified: "2026-09-07T12:00:00-05:00",
    nextStep: "Bring examples of the movements you have lost and how long soreness lasts after exercise to your visit.",
    takeaway: "Gentle movement and forceful stretching are not the same thing. Frozen-shoulder exercises should match how easily your symptoms flare and how you respond afterward.",
    slug: "frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion",
    path: "/blog/frozen-shoulder-effective-exercises-for-regaining-your-range-of-motion",
    title: "Frozen Shoulder Exercises: Matching Movement to the Stage",
    seoTitle: "Frozen Shoulder Exercises and Safe Progression | Relief Plus",
    description: "Learn how frozen shoulder exercise may change with pain and stiffness, why forcing motion can backfire, and when an assessment is appropriate.",
    category: "Shoulder & Upper Extremity",
    summary: "Reaching a shelf or putting on a shirt becomes harder as your shoulder stiffens. If frozen shoulder is the cause, this guide explains how to choose movement that fits your pain and stage of recovery.",
    datePublished: "2024-04-03T09:34:15-05:00",
    readTime: "8 min read",
    sections: [
      { heading: "What frozen shoulder means", paragraphs: ["Frozen shoulder, or adhesive capsulitis, typically involves a gradual loss of both active motion and motion when someone else moves the shoulder. Reaching overhead, behind the back, or out to the side may become painful and restricted. The course can be prolonged and varies considerably between people.", "A stiff shoulder is not automatically frozen shoulder. Rotator cuff problems, arthritis, recent injury, cervical conditions, and other disorders can create overlapping symptoms, so an examination matters before choosing an exercise plan."] },
      { heading: "Match exercise to how easily pain flares", paragraphs: ["When pain is easily provoked and lingers, gentle motion within tolerance is usually more sensible than forceful stretching. As irritability settles and stiffness becomes the main limitation, longer or slightly stronger stretching and progressive strengthening may become appropriate.", "The goal is a tolerable dose that supports function without causing a meaningful flare. Temporary mild discomfort can occur, but repeated sharp pain, worsening night pain, or loss of function suggests the dose should be reconsidered."] },
      { heading: "Examples of commonly used movements", paragraphs: ["A clinician may select supported forward slides, pendulum motion, assisted elevation with the other arm, gentle external-rotation work, or wall-assisted reaching. Later phases may add shoulder-blade control, rotator cuff loading, and task-specific strength.", "As the shoulder stiffens, the shoulder blade and upper back may contribute more motion to help the arm reach. Some compensation is useful, but excessive shrugging or trunk movement can hide what the shoulder itself tolerates. Rehabilitation may therefore coordinate glenohumeral mobility with scapular and thoracic movement rather than treating either in isolation.", "These examples are educational, not a personal prescription. Direction, range, repetitions, and frequency should reflect the individual examination."], bullets: ["Supported table or counter slides", "Comfortable assisted elevation", "Gentle external rotation with support", "Progressive shoulder and shoulder-blade strengthening"] },
      { heading: "What not to do", paragraphs: ["More force is not always better. Aggressive stretching during a highly painful phase can increase guarding and make daily activity harder. Exercise should also not distract from a new injury, rapidly increasing weakness, fever or systemic illness, or symptoms suggesting a neurological problem.", "Diabetes and thyroid disease are associated with frozen shoulder and may influence the course. Patients should discuss relevant health conditions with their clinician so expectations and the care plan remain realistic."] },
      { heading: "Building a useful progression", paragraphs: ["Progress can be tracked through comfortable reach, sleep, dressing, grooming, work tasks, and strength—not range measurements alone. Physical therapy may combine education, mobility work, manual therapy, and progressive exercise according to the stage and goals.", "Relief Plus evaluates the shoulder and related neck and neurological findings before recommending a progression. Imaging or medical referral may be considered when the history, trauma, weakness, or response does not fit an uncomplicated frozen-shoulder pattern."] },
    ],
    related: [
      { title: "Frozen shoulder care", href: "/frozen-shoulder-lafayette", description: "Explore evaluation and individualized treatment planning." },
      { title: "Physical therapy", href: "/physical-therapy-lafayette", description: "Learn about mobility, strength, and functional progression." },
      { title: "Shoulder pain", href: "/shoulder-pain-lafayette", description: "Review other shoulder presentations we evaluate." },
    ],
    sources: [
      { title: "Adhesive Capsulitis Clinical Practice Guideline", organization: "Academy of Orthopaedic Physical Therapy", href: "https://www.orthopt.org/uploads/content_files/ICF/Updated_Guidelines/Shoulder_Guidelines_AdhesiveCapsulitis_JOSPT_May_2013.pdf" },
      { title: "Rehabilitation interventions for frozen shoulder: systematic review", organization: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/42307090/" },
    ],
  },
  {
    dateModified: "2026-09-07T12:00:00-05:00",
    nextStep: "Review your previous elbow treatments and ask what benefit would justify the risks and cost of PRP in your case.",
    takeaway: "PRP is not a guaranteed fix for tennis elbow. Weigh the diagnosis, previous rehabilitation, risks, cost, and other options before deciding.",
    slug: "discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus",
    path: "/blog/discover-the-power-of-prp-therapy-for-tennis-elbow-at-relief-plus",
    title: "PRP for Tennis Elbow: Evidence, Candidacy, and Alternatives",
    seoTitle: "PRP for Tennis Elbow: Evidence and Options | Relief Plus",
    description: "A balanced guide to PRP for tennis elbow, including evidence limits, candidacy, alternatives, risks, and questions to discuss before treatment.",
    category: "Advanced Treatment Education",
    summary: "Your outer elbow still hurts when you grip or lift, and you are wondering about PRP. Learn what a platelet-rich plasma injection involves, where the evidence is uncertain, and what to ask before choosing it.",
    datePublished: "2024-03-15T12:11:50-05:00",
    readTime: "9 min read",
    sections: [
      { heading: "What is causing your elbow pain?", paragraphs: ["Tennis elbow is pain near the outer elbow, often when you grip or use the tendons that lift your wrist. Its medical name is lateral elbow tendinopathy. Pain in the same area can also come from your neck, a nerve, a joint, or an injury. An examination should come before an injection discussion.", "Symptoms can persist when the demands of work, sport, or daily life repeatedly exceed current tendon capacity, or when a loading plan is too little, too much, or difficult to sustain. Duration alone does not prove irreversible damage. Most care plans begin with education and progressive loading. Activity may need modification, but complete rest can reduce capacity. The aim is to find a tolerable level and gradually rebuild strength."] },
      { heading: "What PRP is", paragraphs: ["Platelet-rich plasma is prepared from a patient’s own blood to concentrate platelets in a smaller volume of plasma. Preparation methods differ, including platelet concentration and the presence of white blood cells. Those differences make it difficult to treat every PRP study or product as equivalent.", "PRP is not the same as cellular or stem-cell therapy. It should not be described as guaranteed tissue regeneration, a cure, or a predictable way to avoid surgery."] },
      { heading: "What the evidence can—and cannot—say", paragraphs: ["Research has compared PRP with corticosteroid injections and other approaches. Some reviews report more favorable longer-term pain or function outcomes for PRP than corticosteroid injection, while corticosteroid may have stronger short-term effects. Study methods, preparation protocols, follow-up periods, and patient selection vary.", "A group average does not predict an individual result. Evidence does not establish that every patient with tennis elbow should receive PRP, nor that PRP replaces a progressive rehabilitation plan."] },
      { heading: "Is PRP a reasonable option for you?", paragraphs: ["A discussion may be more relevant when symptoms are persistent, the diagnosis is reasonably established, appropriate rehabilitation has been attempted, and the person understands the uncertainties. Health history, medications, bleeding risk, infection risk, procedure tolerance, goals, and practical cost should be reviewed.", "Alternatives can include continued or revised rehabilitation, activity and equipment changes, watchful waiting, medication discussion with an appropriate clinician, or specialist referral. The right comparison is the available options for that patient—not PRP versus doing nothing."] },
      { heading: "Questions to ask before proceeding", paragraphs: ["Patients deserve a clear explanation of what is proposed and why."], bullets: ["What diagnosis is being treated, and how confident are we?", "What PRP preparation and procedure are proposed?", "What benefits are plausible, and what remains uncertain?", "What are the risks, cost, recovery expectations, and alternatives?", "How will rehabilitation be coordinated after the procedure?"] },
      { heading: "The Relief Plus approach", paragraphs: ["At Relief Plus, PRP is considered as one possible option within a broader plan. It is not appropriate for every person or every elbow complaint. Recommendations are based on examination findings, clinical appropriateness, goals, prior care, evidence, and an informed discussion of alternatives."] },
    ],
    related: [
      { title: "Tennis elbow care", href: "/tennis-elbow-lafayette", description: "Start with diagnosis, loading tolerance, and function." },
      { title: "PRP therapy", href: "/prp-therapy-lafayette", description: "Review the Relief Plus PRP decision process." },
      { title: "Physical therapy", href: "/physical-therapy-lafayette", description: "Learn how progressive rehabilitation may support recovery." },
    ],
    sources: [
      { title: "PRP versus corticosteroid for lateral epicondylitis: meta-analysis", organization: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/38357713/" },
      { title: "Lateral Elbow Pain and Muscle Function Impairments CPG", organization: "Academy of Orthopaedic Physical Therapy", href: "https://www.orthopt.org/content/s/lateral-elbow-pain-and-muscle-function-impairments-2022" },
    ],
  },
  {
    dateModified: "2026-09-07T12:00:00-05:00",
    nextStep: "If elbow pain is limiting work or exercise, ask how any needling treatment would support a plan to rebuild strength.",
    takeaway: "Dry needling may ease symptoms for some people with tennis elbow. It does not replace an assessment or exercises that help the elbow handle gripping and lifting.",
    slug: "dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1",
    path: "/blog/dry-needling-a-game-changer-in-treating-tennis-elbow-at-relief-plus-with-dr-shawn-johnston-1",
    title: "Dry Needling for Tennis Elbow: Where It May Fit",
    seoTitle: "Dry Needling for Tennis Elbow: A Balanced Guide | Relief Plus",
    description: "Learn how dry needling may fit into tennis elbow care, what research suggests, what it does not prove, and why progressive loading still matters.",
    category: "Treatment Education",
    summary: "Gripping a tool or lifting a pan brings on elbow pain. Could dry needling help? This article explains its possible role, risks, and why gradually rebuilding grip and wrist strength still matters.",
    datePublished: "2024-03-14T15:45:54-05:00",
    readTime: "8 min read",
    sections: [
      { heading: "Tennis elbow is a load-related problem", paragraphs: ["Tennis elbow often hurts during gripping, lifting, tool use, or racquet sports. It involves how the tendon and nearby tissues handle force. It is not simply a muscle knot that needs to be released.", "An examination may assess the elbow, wrist, grip, neck, and neurological findings. This helps distinguish tendinopathy from nerve irritation, joint problems, trauma, and referred pain."] },
      { heading: "What dry needling involves", paragraphs: ["Dry needling uses a thin solid filament needle in selected muscular or connective-tissue targets. It does not inject medication. Approaches and targets differ, so the term does not describe one identical protocol across every study or clinic. A clinician may consider wrist-extensor muscular sensitivity or trigger-point-like findings, but tenderness alone does not explain every case of tennis elbow.", "Temporary soreness, bruising, minor bleeding, or symptom aggravation can occur. Infection and other complications are uncommon but possible. Screening, clean technique, informed consent, and practitioner training are important."] },
      { heading: "What research suggests", paragraphs: ["A systematic review of dry needling for lateral epicondylalgia reported improvements in pain and related outcomes, particularly in the short term. The authors rated parts of the evidence low to moderate because studies differed and had limitations.", "This supports a careful may-help conclusion—not “game-changer” language or a promise. Research does not show that dry needling is required, permanently changes tendon structure, or works equally well for every person."] },
      { heading: "Why rehabilitation remains central", paragraphs: ["The elbow still needs the capacity to tolerate gripping, lifting, work, and sport. Progressive wrist-extensor and grip loading, task modification, and gradual return to activity are therefore central parts of care. Dry needling, if selected, is best understood as an adjunct that may help create a window for movement or loading.", "Progress should be judged by function, strength, and tolerance over time—not only immediate tenderness or a brief change after treatment."] },
      { heading: "What a reasonable sequence may look like", paragraphs: ["Early care may begin with an explanation of the diagnosis, practical changes to the most provocative tasks, and a starting load the elbow can tolerate. If pain is limiting participation and examination identifies a relevant muscular component, dry needling may be discussed alongside—not ahead of—the active plan.", "Response should then be reassessed. A useful short-term symptom change can support progression into gripping, wrist-extensor loading, and work- or sport-specific tasks. If there is no meaningful benefit, continuing the same adjunct repeatedly is not automatically justified. The diagnosis, dosage, and alternatives should be reconsidered." ] },
      { heading: "Who may not be a good fit", paragraphs: ["Dry needling may be inappropriate or require additional precautions for people with certain bleeding risks, infection near the treatment area, needle phobia, altered sensation, some medical conditions, or other individual factors. Pregnancy and medication history should be discussed with the treating clinician.", "Relief Plus selects treatment according to diagnosis, clinical appropriateness, preferences, and goals. Declining dry needling does not prevent a person from receiving an evidence-informed rehabilitation plan."] },
    ],
    related: [
      { title: "Tennis elbow care", href: "/tennis-elbow-lafayette", description: "Understand assessment and progressive loading options." },
      { title: "Dry needling", href: "/dry-needling-lafayette", description: "Review how this adjunct is evaluated at Relief Plus." },
      { title: "Physical therapy", href: "/physical-therapy-lafayette", description: "Learn how rehabilitation supports progressive loading and function." },
    ],
    sources: [
      { title: "Dry needling for lateral epicondylalgia: systematic review and meta-analysis", organization: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/32576044/" },
      { title: "Lateral Elbow Pain and Muscle Function Impairments CPG", organization: "Academy of Orthopaedic Physical Therapy", href: "https://www.orthopt.org/content/s/lateral-elbow-pain-and-muscle-function-impairments-2022" },
    ],
  },
];

import { calculateReadTime } from "./article-reading-time";

export const blogPosts: BlogPost[] = [bowhuntingShoulderBlogPost, ...authorityBlogPosts, ...phaseNineBBlogPosts, ...phaseNineCBlogPosts, ...phaseNineDBlogPosts, ...phaseNineFBlogPosts, ...phaseNineHBlogPosts].map((post) => ({ ...post, readTime: calculateReadTime(post) }));

export const blogPostsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));
