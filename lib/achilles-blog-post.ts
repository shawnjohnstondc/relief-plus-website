import type { BlogPost } from "./blog-posts";

const aaos = "https://www.orthoinfo.org/diseases--conditions/achilles-tendinitis/";
const nhs = "https://www.sfh-tr.nhs.uk/patients-and-visiting/patient-information-leaflets/musculoskeletal-msk/achilles-tendinopathy";
const rupture = "https://www.cuh.nhs.uk/patient-information/achilles-tendon-rupture-management-and-rehabilitation/";
const clot = "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/";
const tear = "https://www.orthoinfo.org/diseases--conditions/achilles-tendon-rupture-tear/";
const guideline = "https://www.jospt.org/doi/10.2519/jospt.2024.0302";

export const achillesBlogPost: BlogPost = {
  slug: "achilles-pain-back-of-heel",
  path: "/blog/achilles-pain-back-of-heel",
  title: "Achilles Pain at the Back of Your Heel: What to Do Next",
  seoTitle: "Achilles Pain at the Back of Your Heel | Relief Plus",
  description: "Pain at the back of your heel? Learn about Achilles tendon symptoms, urgent warning signs, and how assessment can guide activity and rehabilitation.",
  category: "Injury & Recovery",
  summary: "Learn how the onset and location of Achilles pain can guide the next step, which symptoms need urgent care, and how individualized rehabilitation can help rebuild capacity.",
  takeaway: "Pain at the back of the heel deserves an assessment that distinguishes gradual tendon symptoms from a sudden injury. A possible Achilles rupture needs urgent medical care, not a trial of home exercises.",
  nextStep: "Describe how the pain began and what activities are difficult. Arrange an assessment for persistent symptoms; urgent warning signs need medical care first.",
  datePublished: "2026-11-03T22:20:00-06:00",
  readTime: "5 min read",
  author: { name: "Relief Plus Editorial", href: "/clinical-standards-editorial-review" },
  sections: [
    { heading: "Start with how the pain began", paragraphs: [
      ["Perhaps your heel feels stiff when you first get moving, or the back of your ankle aches after a longer walk. Achilles tendinopathy can cause pain, stiffness and swelling in this area, sometimes easing as you move before becoming troublesome again after activity. ", {text:"NHS: Achilles tendinopathy",href:nhs}],
      ["The Achilles tendon connects your calf muscles to your heel. It helps you push off during walking, climb stairs and rise onto your toes. Symptoms may develop after a substantial increase in activity, but the location of pain alone cannot confirm the cause. ", {text:"AAOS: Achilles tendinitis",href:aaos}]
    ]},
    { heading: "A sudden pop needs prompt attention", paragraphs: [
      "Seek urgent medical assessment if you feel a sudden snap or pop, feel as though someone kicked the back of your calf, or develop new difficulty pushing off or walking after an injury. These can be signs of an Achilles rupture.",
      ["Pain can settle after a rupture, and some people can still walk flat-footed. Improvement in pain does not rule out a tear. Stop the activity and get checked rather than testing the tendon repeatedly or trying to stretch through it. Do not wait for a routine rehabilitation appointment. ",{text:"Cambridge University Hospitals: Achilles tendon rupture",href:rupture}],
      ["New, unexplained one-sided calf pain and swelling also need urgent medical attention because a blood clot is one possible cause. If these symptoms occur with chest pain or shortness of breath, call 911. ",{text:"NHS: Deep vein thrombosis",href:clot}]
    ]},
    { heading: "Where the pain sits matters", paragraphs: [
      "Achilles symptoms can involve the middle of the tendon above the heel or the point where it attaches to the heel bone. Clinicians call these midportion and insertional tendinopathy. The distinction matters when choosing exercises.",
      ["For example, lowering your heel below a step is not a suitable starting exercise for every painful Achilles. AAOS specifically cautions against that heel-drop exercise for insertional symptoms. Avoid copying an exercise routine before the problem and appropriate movement range are clear. ",{text:"AAOS: Achilles tendinitis",href:aaos}]
    ]},
    { heading: "What an assessment can clarify", paragraphs: [
      ["An examination considers when symptoms began, recent activity changes, tenderness, swelling and ankle movement. Imaging may help in selected situations, but an MRI is not automatically necessary for Achilles tendinopathy. ",{text:"AAOS: Achilles tendinitis",href:aaos}],
      ["Tell your clinician about your health conditions, medications and any sudden injury. Those details can affect the assessment. Bring a clear description of what has become difficult, whether that is walking at work, taking stairs or returning to a sport. ",{text:"AAOS: Achilles tendon rupture",href:tear}]
    ]},
    { heading: "Adjust activity, then rebuild capacity", paragraphs: [
      "Once an assessment supports midportion Achilles tendinopathy and excludes a more urgent injury, complete rest is generally not the goal. The 2024 physical therapy guideline recommends continuing suitable activity within pain tolerance and using tendon-loading exercise as a first-line treatment.",
      ["Loading means asking the calf and tendon to work against resistance. The starting exercise, effort and progression should match the person’s symptoms and ability. A sudden injury or pain at the heel attachment may require a different approach; this guideline is specifically about midportion tendinopathy. ",{text:"2024 midportion Achilles tendinopathy clinical practice guideline",href:guideline}],
      "A useful question is, “What can I keep doing, and what should I temporarily change?” Your clinician can help adjust activity and an exercise plan rather than leaving you to choose between doing nothing and pushing through everything."
    ]},
    { heading: "Track everyday progress", paragraphs: [
      ["Notice how the tendon responds during activity and afterward. Tell your clinician if symptoms remain more aggravated the next day or ordinary walking is getting harder. Rehabilitation needs adjustment when the challenge exceeds what you can currently manage. Improvement often takes months, so discuss realistic goals rather than expecting a fixed recovery date. ",{text:"NHS: Achilles tendinopathy",href:nhs}],
      ["At Relief Plus, ",{text:"physical therapy",href:"/physical-therapy-lafayette"}," begins with an individualized assessment of movement, strength, function and goals. If symptoms are limiting daily life, ",{text:"contact Relief Plus",href:"/contact"}," to discuss an evaluation. Urgent warning signs need medical attention first."],
      "This article provides general education, not an individual diagnosis or treatment plan."
    ]}
  ],
  related: [
    {title:"Achilles Tendinopathy",href:"/achilles-tendinopathy-lafayette",description:"How assessment and progressive loading guide care for Achilles symptoms."},
    {title:"Physical Therapy",href:"/physical-therapy-lafayette",description:"Individualized rehabilitation focused on movement, strength and daily function."},
    {title:"Ankle Sprain: When to Get Checked",href:"/blog/ankle-sprain-when-to-get-checked",description:"Urgent warning signs and supported recovery after an ankle injury."}
  ],
  sources: [
    {title:"Achilles tendinopathy",organization:"Sherwood Forest Hospitals NHS Foundation Trust",href:nhs},
    {title:"Achilles tendinitis",organization:"American Academy of Orthopaedic Surgeons",href:aaos},
    {title:"Achilles tendon rupture: management and rehabilitation",organization:"Cambridge University Hospitals NHS Foundation Trust",href:rupture},
    {title:"Deep vein thrombosis (DVT)",organization:"NHS",href:clot},
    {title:"Achilles tendon rupture (tear)",organization:"American Academy of Orthopaedic Surgeons",href:tear},
    {title:"Achilles Pain, Stiffness, and Muscle Power Deficits: Midportion Achilles Tendinopathy Revision 2024",organization:"Journal of Orthopaedic & Sports Physical Therapy",href:guideline}
  ]
};
