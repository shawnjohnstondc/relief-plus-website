import type { EducationSection, PillarPageData } from "./pillar-pages";

const dryNeedling: EducationSection[] = [
  {
    eyebrow: "What Treatment Actually Involves",
    title: "A precise needle technique—not an injection.",
    paragraphs: [
      "Dry needling uses a thin, solid filament needle. No medication is delivered. After an assessment, a trained clinician selects muscular areas that may be contributing to a familiar pain pattern or movement restriction rather than simply needling wherever it hurts.",
      "A needle may produce pressure, an ache, a brief cramp-like sensation, or a local twitch response—an involuntary muscle contraction. A twitch response can occur, but it is not required to prove that treatment was successful. The number of sites and technique should reflect the patient’s presentation and tolerance.",
      "Dry needling is not acupuncture. Both use thin needles, but dry needling is applied within a musculoskeletal examination and treatment framework; acupuncture comes from a distinct system of practice, training, and clinical reasoning.",
    ],
    items: [
      { title: "Commonly discussed areas", description: "Neck and shoulder muscles, lower back and hip muscles, calf, foot, and other regions may be considered when examination findings support it." },
      { title: "What happens afterward", description: "Temporary soreness, bruising, fatigue, or a short-lived increase in familiar symptoms can occur. Activity advice depends on the area and response." },
    ],
  },
  {
    eyebrow: "Safety and Clinical Fit",
    title: "Why screening and anatomy matter.",
    paragraphs: [
      "Needle aversion, pregnancy, medications or conditions affecting bleeding, infection, compromised skin, altered sensation, immune concerns, and the anatomy of the proposed area can affect whether or how dry needling is used. Patients should share relevant medical history and medications before treatment.",
      "Minor events such as soreness, small amounts of bleeding, or bruising are more common than serious complications. Rare but important complications can occur, particularly when needling near the chest or other sensitive anatomy, which is why practitioner training, informed consent, and appropriate technique matter.",
    ],
    items: [
      { title: "When another option may fit", description: "If symptoms suggest a problem not primarily driven by muscle, or needling is not safe or acceptable, exercise, hands-on care, medical evaluation, or another modality may make more sense." },
      { title: "Realistic expectations", description: "Evidence varies by condition and comparison treatment. Dry needling is best viewed as a possible adjunct, not a stand-alone correction or proof of the diagnosis." },
    ],
    sources: [
      { label: "APTA dry needling competencies", href: "https://www.apta.org/contentassets/524be3943be0425c96b09f02165a1d4c/analysiscompetenciesfordryneedlingbypt.pdf" },
      { label: "Systematic review of adverse events", href: "https://pubmed.ncbi.nlm.nih.gov/42096510/" },
    ],
  },
  {
    eyebrow: "A Larger Recovery Plan",
    title: "Symptom change is useful only if function can move forward.",
    paragraphs: [
      "Dry needling may create a window in which movement feels more tolerable, but it does not build strength, change workload, or restore capacity by itself. Mobility work, progressive exercise, physical therapy, chiropractic care, sleep and activity considerations, or changes in training demands may still be relevant.",
    ],
    items: [
      { title: "Does soreness mean it worked?", description: "No. Soreness is a possible post-treatment response, not a measure of effectiveness." },
      { title: "Must the muscle twitch?", description: "No. A local twitch can occur, but its absence does not automatically make a session unsuccessful." },
      { title: "How many sessions are needed?", description: "There is no universal schedule. Continued use should depend on diagnosis, response, goals, and whether function is progressing." },
      { title: "Can it accompany PT or chiropractic?", description: "Yes, when it supports—not replaces—the movement, strength, joint, or activity goals in the plan." },
    ],
  },
];

const laser: EducationSection[] = [
  {
    eyebrow: "Understanding Photobiomodulation",
    title: "The treatment is light-based, but the dose is not generic.",
    paragraphs: [
      "Class IV describes a device safety classification associated with higher-power lasers. In musculoskeletal care, the term photobiomodulation describes applying selected wavelengths of light to a defined area. The proposed cellular mechanisms are studied as possible explanations for clinical effects; they do not guarantee pain relief, inflammation reduction, or tissue healing.",
      "Wavelength, power, total energy, treatment time, surface area, tissue depth, technique, and diagnosis all influence the delivered dose. Two sessions called “laser therapy” may therefore represent meaningfully different protocols.",
      "Patients typically wear protective eyewear while an applicator is moved over or held near the treatment area. Warmth may be felt with some settings, but treatment should not be presented as a test of pain tolerance.",
    ],
  },
  {
    eyebrow: "Evidence and Limitations",
    title: "Results depend on the condition and protocol studied.",
    paragraphs: [
      "Photobiomodulation has been studied for several musculoskeletal conditions, including some knee, shoulder, tendon, plantar-fascia, neck, and back presentations. Findings are not interchangeable across diagnoses, devices, or dosing schedules.",
      "Some reviews report short-term improvements for selected outcomes, while also identifying heterogeneous protocols, limited follow-up, risk of bias, or low certainty. That supports a measured adjunctive role rather than a claim that laser predictably repairs tissue or replaces active care.",
    ],
    items: [
      { title: "Why diagnosis matters", description: "A painful area may reflect different tissues and contributing factors. Laser parameters and whether the modality makes sense depend on that context." },
      { title: "Why reassessment matters", description: "Ongoing treatment should be tied to meaningful symptom or functional change—not continued simply because the device is available." },
    ],
    sources: [
      { label: "Review of orthopedic pain studies", href: "https://pubmed.ncbi.nlm.nih.gov/41789279/" },
      { label: "Knee osteoarthritis review", href: "https://pubmed.ncbi.nlm.nih.gov/38775202/" },
    ],
  },
  {
    eyebrow: "Precautions and Alternatives",
    title: "Eye protection is mandatory, and screening comes first.",
    paragraphs: [
      "Direct eye exposure must be avoided and wavelength-appropriate protective eyewear is required. The clinician should screen the proposed area and relevant medical circumstances, including pregnancy, suspected malignancy, active bleeding, impaired sensation, photosensitivity, photosensitizing medications, and other device- or protocol-specific precautions.",
      "Laser does not replace progressive loading, exercise, activity modification, hands-on care, medication discussions, imaging when indicated, or referral. The better choice depends on the diagnosis and patient goals.",
    ],
    items: [
      { title: "What might I feel?", description: "Often little sensation or mild warmth. The expected experience depends on the device, settings, area, and technique." },
      { title: "Can I return to activity?", description: "Laser alone usually does not determine activity restrictions; the underlying condition and broader plan do." },
      { title: "Is more power always better?", description: "No. Appropriate dosing matters more than assuming a higher setting produces a better clinical result." },
      { title: "Can it complement rehabilitation?", description: "It may, when used to support a plan that still addresses mobility, strength, tolerance, and function." },
    ],
  },
];

const shockwave: EducationSection[] = [
  {
    eyebrow: "How Acoustic-Wave Care Works",
    title: "A mechanical stimulus delivered from outside the body.",
    paragraphs: [
      "Shockwave therapy applies repeated acoustic pressure waves through a handheld applicator over a selected area. Treatment commonly feels like rapid tapping or pulsing; intensity may be adjusted based on the protocol and tolerance.",
      "Focused and radial systems generate and distribute acoustic energy differently. Because the equipment used by Relief Plus has not been documented in the project, this page does not claim which technology, depth, or energy profile the clinic provides. Patients can ask which device is proposed and why.",
      "Temporary tenderness, redness, swelling, bruising, or soreness during and after treatment can occur. Recommendations about activity afterward should reflect the treated condition and loading plan.",
    ],
  },
  {
    eyebrow: "Where Evidence Is Most Relevant",
    title: "Persistent tendon and plantar-fascia problems require diagnosis and loading context.",
    paragraphs: [
      "Shockwave is commonly studied for persistent plantar fasciopathy and selected tendinopathies. Evidence and protocols vary by body region, symptom duration, device type, dose, comparator, and outcome measured.",
      "It should not be described as breaking up scar tissue or guaranteeing new tissue growth. A reasonable discussion asks whether the diagnosis matches the populations studied and whether progressive loading, footwear changes, strength work, or other contributors are being addressed.",
    ],
    items: [
      { title: "Potential clinical fit", description: "A persistent, well-evaluated tendon or plantar-fascia presentation that has not progressed as expected with an appropriate plan." },
      { title: "A different path", description: "A new injury, suspected tear, nerve symptoms, bone stress concern, inflammatory condition, or uncertain diagnosis may call for different evaluation or management." },
    ],
    sources: [
      { label: "Plantar fasciopathy efficacy review", href: "https://pubmed.ncbi.nlm.nih.gov/39257331/" },
      { label: "Plantar fasciitis safety review", href: "https://pubmed.ncbi.nlm.nih.gov/28890412/" },
    ],
  },
  {
    eyebrow: "Safety and Recovery",
    title: "The treatment area and health history shape precautions.",
    paragraphs: [
      "Screening should consider the proposed treatment location and factors such as pregnancy, active infection, tumor in the area, bleeding disorders or anticoagulant use, impaired sensation, open growth plates, recent corticosteroid exposure, and nearby lung, nerve, vessel, or other vulnerable anatomy. Device-specific guidance also matters.",
    ],
    items: [
      { title: "Does it hurt?", description: "It can be uncomfortable. Sensation varies with location, settings, irritability, and individual tolerance." },
      { title: "Is soreness expected?", description: "Temporary soreness or bruising can occur; severe or unexpected symptoms should be reported." },
      { title: "Does it replace exercise?", description: "Usually not. Tendon and soft-tissue capacity often still requires appropriate loading and progression." },
      { title: "How is response judged?", description: "By meaningful changes in symptoms, function, and load tolerance over an appropriate time—not sensation during the session." },
    ],
  },
];

const prp: EducationSection[] = [
  {
    eyebrow: "From Blood Draw to Targeted Procedure",
    title: "PRP is prepared from the patient’s own blood.",
    paragraphs: [
      "A blood sample is collected and processed to concentrate a plasma fraction containing platelets. Platelets contain signaling proteins often discussed as growth factors, but that biological concept does not mean a procedure predictably regrows cartilage, heals a tendon, or reverses arthritis.",
      "PRP preparations differ. Platelet concentration, white- and red-cell content, processing system, activation, injection volume, target, and number of procedures vary across practices and studies. Those differences are one reason evidence from one protocol cannot automatically be applied to another.",
      "The procedure generally includes a blood draw, preparation period, cleaning the treatment area, and a targeted injection. The specific guidance method, anesthetic approach, and protocol used by Relief Plus should be confirmed with the clinic rather than inferred here.",
    ],
  },
  {
    eyebrow: "Diagnosis-Specific Evidence",
    title: "PRP is not one answer for every joint or tendon problem.",
    paragraphs: [
      "PRP has been studied in knee osteoarthritis and several tendon conditions, but findings vary substantially by diagnosis and protocol. Evidence suggesting benefit in one condition does not establish benefit for a different joint, tendon, tear, or stage of disease.",
      "For example, some analyses report improvements for certain knee osteoarthritis outcomes, while a recent review of Achilles tendinopathy found no significant advantage over controls. A candidacy discussion should identify the exact diagnosis, evidence relevant to it, and reasonable alternatives.",
    ],
    items: [
      { title: "A reasonable candidate discussion", description: "Considers a defined diagnosis, symptom duration, prior evidence-based care, health factors, goals, and whether the expected tradeoffs are acceptable." },
      { title: "When another option may fit", description: "Rehabilitation, load modification, medication discussion, another injection, surgical opinion, or further diagnostic evaluation may be more appropriate." },
    ],
    sources: [
      { label: "Knee injection network meta-analysis", href: "https://pubmed.ncbi.nlm.nih.gov/38331363/" },
      { label: "Achilles tendinopathy review", href: "https://pubmed.ncbi.nlm.nih.gov/39611122/" },
    ],
  },
  {
    eyebrow: "Before and After PRP",
    title: "Plan for a procedure—not instant proof of success.",
    paragraphs: [
      "Temporary pain, stiffness, swelling, bruising, or soreness can follow an injection. Other risks include bleeding, infection, injury to nearby structures, and lack of meaningful improvement. Individual medication and supplement guidance must come from the treating clinician; patients should not stop prescribed medication based on website content.",
      "Aftercare and rehabilitation timing depend on the target and procedure. A staged return to loading may be part of the plan, but PRP does not eliminate the need to restore strength, mobility, or activity tolerance when those deficits are present.",
    ],
    items: [
      { title: "How soon will I know?", description: "Response is not immediate or guaranteed. The expected reassessment window should be explained for the diagnosis and protocol." },
      { title: "How many injections?", description: "There is no universal number; protocols differ and should be justified rather than assumed." },
      { title: "Is PRP FDA-approved for my diagnosis?", description: "Patients should distinguish regulatory status of preparation devices from approval of a PRP product or orthopedic therapeutic claim." },
      { title: "What should I ask?", description: "Ask about the preparation system, target, evidence for the exact diagnosis, risks, alternatives, cost, follow-up, and rehabilitation plan." },
    ],
  },
];

const ozone: EducationSection[] = [
  {
    eyebrow: "What the Procedure Means",
    title: "Medical ozone therapy uses a clinician-prepared oxygen–ozone mixture.",
    paragraphs: [
      "For musculoskeletal use, a controlled oxygen–ozone gas mixture may be administered to a selected area by a qualified clinician. The route, concentration, volume, target, equipment, and safety procedures matter. This page intentionally does not provide preparation or do-it-yourself instructions.",
      "Proposed biological mechanisms are still being studied and should not be translated into promises of tissue repair, reliable inflammation reduction, or cure. Relief Plus positions ozone as an advanced option that requires diagnosis-specific discussion, not as a treatment for unrelated systemic disease.",
    ],
  },
  {
    eyebrow: "A Developing Evidence Base",
    title: "Short-term findings do not settle long-term value.",
    paragraphs: [
      "Oxygen–ozone injections have been studied in knee osteoarthritis and some spine, shoulder, and other musculoskeletal contexts. Reviews describe variable protocols and comparators, and the overall certainty is limited by study quality and heterogeneity.",
      "Some studies report short-term symptom improvement, while comparisons with other injections and longer follow-up are inconsistent. This makes careful patient selection, transparent uncertainty, and planned reassessment more appropriate than broad claims.",
    ],
    items: [
      { title: "Why the target matters", description: "Evidence for one joint or procedure route cannot be assumed to apply to another muscle, tendon, disc, or pain condition." },
      { title: "Why alternatives matter", description: "Exercise-based rehabilitation, activity modification, medication discussions, other injections, or specialist input may have different evidence and tradeoffs." },
    ],
    sources: [
      { label: "Knee osteoarthritis umbrella review", href: "https://pubmed.ncbi.nlm.nih.gov/38444768/" },
      { label: "Ozone versus corticosteroid review", href: "https://pubmed.ncbi.nlm.nih.gov/38277280/" },
    ],
  },
  {
    eyebrow: "Risks, Screening, and Follow-Up",
    title: "Injection safety and ozone-specific handling both matter.",
    paragraphs: [
      "Potential concerns include temporary pain or swelling, bruising, bleeding, infection, vasovagal symptoms, reaction in the treated area, injury to nearby structures, and no meaningful improvement. Ozone must not be inhaled, and administration route is a critical safety issue.",
      "Pregnancy, infection, bleeding risk, medication use, allergies or sensitivities, significant medical conditions, and the proposed anatomical target should be reviewed by the treating clinician. This is not a complete contraindication list.",
    ],
    items: [
      { title: "What might treatment feel like?", description: "Pressure, brief discomfort, or post-procedure soreness may occur; the experience depends on the site and technique." },
      { title: "What happens afterward?", description: "Instructions should cover expected symptoms, activity, warning signs, and when response will be reassessed." },
      { title: "Is it a universal solution?", description: "No. Clinical suitability and evidence differ by diagnosis, patient, and procedure." },
      { title: "Can rehabilitation still matter?", description: "Yes. An injection does not by itself restore strength, movement, or tolerance for daily and athletic demands." },
    ],
  },
];

const triggerPoint: EducationSection[] = [
  {
    eyebrow: "From Tender Spot to Clinical Finding",
    title: "Not every sore muscle contains a relevant trigger point.",
    paragraphs: [
      "A trigger point is generally described as a sensitive area within a taut band of skeletal muscle that may reproduce familiar local or referred symptoms. Palpation is only part of the assessment; the clinician should consider whether the finding matches the patient’s pain pattern and functional limitation.",
      "A trigger-point injection places a small amount of an injectate into the selected muscular site. The exact medication used at Relief Plus is not documented in the project, so this page does not claim a specific anesthetic, steroid, saline, or other formulation. Patients should ask what is proposed and why.",
      "Dry needling uses a solid filament needle without medication. A trigger-point injection uses a hollow needle to deliver an injectate. Neither choice removes the need to assess the broader problem.",
    ],
  },
  {
    eyebrow: "Procedure and Evidence",
    title: "The injection may address a focal pain generator, not every contributor.",
    paragraphs: [
      "The visit typically includes confirming the pain pattern, reviewing contraindications, cleaning the area, identifying the target, performing the injection, and monitoring the immediate response. Sensations may include pressure, a brief sting, cramping, or temporary soreness.",
      "Research comparing injectates and needling approaches is mixed; a systematic review could not identify one injectate composition as clearly superior. That uncertainty supports a focused trial only when the clinical finding and broader plan justify it.",
    ],
    sources: [
      { label: "Trigger-point injection systematic review", href: "https://pubmed.ncbi.nlm.nih.gov/39238525/" },
      { label: "Clinical review of procedure and risks", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9116734/" },
    ],
  },
  {
    eyebrow: "Safety and the Mechanical Picture",
    title: "Relief of a tender point does not explain why it developed.",
    paragraphs: [
      "Potential risks include temporary pain, bruising, bleeding, infection, allergic reaction to an injectate, skin or soft-tissue changes, injury to nearby structures, and—when treatment is near the chest—a rare risk of pneumothorax. Infection, bleeding risk, medication use, allergies, pregnancy, anatomy, and ability to safely access the target require review.",
      "Workload, joint motion, strength, posture tolerance, sleep, stress, movement strategy, and other pain sources may contribute to recurring muscle symptoms. Physical therapy, chiropractic care, exercise, ergonomic changes, or further evaluation may therefore remain important.",
    ],
    items: [
      { title: "Injection or dry needling?", description: "The decision depends on findings, tolerance, injectate considerations, clinician scope, evidence, and patient preference." },
      { title: "Will one injection solve it?", description: "No outcome or number of procedures can be assumed; response and function should be reassessed." },
      { title: "What should I report?", description: "Share infection symptoms, bleeding risk, medication use, allergies, pregnancy, prior reactions, and changes in sensation or strength." },
      { title: "What comes next?", description: "A useful follow-up plan addresses movement or loading contributors when present, rather than focusing only on the tender site." },
    ],
  },
];

export const regenerativeEducation: EducationSection[] = [
  {
    id: "cellular-therapy",
    eyebrow: "Regenerative Medicine Is a Broad Term",
    title: "The exact product determines the evidence and regulatory questions.",
    paragraphs: [
      "“Regenerative medicine” can refer to very different procedures, devices, drugs, biologics, and cellular or tissue-based products. They do not share one regulatory classification or one body of evidence. Regulatory status depends on the specific product, how it is processed, its intended use, and other facts.",
      "The exact cellular or tissue-based product used by Relief Plus is not documented in this project. Until its identity, source, labeling, intended use, and regulatory documentation are verified, this page does not describe it as FDA approved, FDA cleared, FDA compliant, a Section 361 product, exempt from approval, or as containing stem cells, mesenchymal stem cells, exosomes, or any particular tissue or cell source.",
      "Cellular or tissue-based therapy should not be presented as regenerating cartilage, repairing discs, reversing arthritis, restoring joints, healing tendons, replacing surgery, or producing predictable pain relief. A transparent consultation should begin with exactly what product is being proposed.",
    ],
  },
  {
    eyebrow: "Current FDA Patient Guidance",
    title: "Orthopedic marketing claims require particular care.",
    paragraphs: [
      "FDA states that regenerative medicine products marketed as stem-cell, Wharton’s jelly, amniotic, exosome, and similar products have not been FDA-approved for orthopedic conditions such as osteoarthritis, tendonitis, disc disease, back pain, hip pain, knee pain, neck pain, and shoulder pain.",
      "That statement does not mean every cellular or tissue product is identical or that every use has the same legal status. It means patients and clinicians need product-specific information. If approval is required for the proposed use, patients should be able to verify whether approval exists or whether treatment is being provided under FDA oversight in a clinical investigation.",
    ],
    items: [
      { title: "Product identity", description: "Brand or product name, manufacturer, labeling, lot or traceability information, and what is actually being administered." },
      { title: "Source and contents", description: "Where it comes from, how it is processed, and what verified documentation says it contains." },
      { title: "Regulatory basis", description: "The claimed classification, whether approval is required for this use, and the documentation supporting that position." },
      { title: "Condition-specific evidence", description: "Research relevant to the exact product, route, intended orthopedic use, and patient—not regenerative medicine as a category." },
    ],
    sources: [
      { label: "FDA patient and consumer information", href: "https://www.fda.gov/vaccines-blood-biologics/consumers-biologics/important-patient-and-consumer-information-about-regenerative-medicine-therapies" },
      { label: "FDA Regenerative Medicine 101", href: "https://www.fda.gov/media/154665/download" },
    ],
  },
  {
    eyebrow: "Patient Education",
    title: "Questions to ask about cellular or tissue-based therapies.",
    items: [
      { title: "What exactly is the product?", description: "Ask for the exact name, manufacturer, labeling, and a plain-language explanation of what will be administered." },
      { title: "Where does it come from?", description: "Ask for the verified tissue or cellular source and how source information is documented." },
      { title: "What does it contain?", description: "Ask which components have been verified and which characteristics have not been established." },
      { title: "How is it regulated?", description: "Ask for the specific regulatory classification being claimed and the documentation supporting it." },
      { title: "Does this use require FDA approval?", description: "The answer depends on the product and intended use; request a product-specific explanation." },
      { title: "If approval is required, is it approved for this use?", description: "Ask to review the relevant FDA approval or, for a clinical investigation, the IND information and FDA oversight documentation." },
      { title: "What evidence supports my particular use?", description: "Look for evidence matching the exact product, condition, route, and outcome—not a different product under the same broad label." },
      { title: "What are the known and uncertain risks?", description: "Discuss procedure risks, product risks, uncertainty, adverse-event reporting, and what follow-up is available." },
      { title: "What alternatives should I consider?", description: "Compare rehabilitation, chiropractic care, medications, other procedures, surgical consultation, watchful waiting, or further evaluation as appropriate." },
    ],
  },
  {
    eyebrow: "A Careful Advanced-Treatment Framework",
    title: "Transparency comes before candidacy.",
    paragraphs: [
      "A responsible discussion should clarify the diagnosis, the exact proposed product, the treating provider, evidence for the intended use, regulatory documentation, risks, uncertainties, cost, alternatives, and follow-up plan. A consultation should not presume that treatment is appropriate.",
      "PRP therapy and ozone injection therapy have their own procedures, evidence, risks, and candidacy considerations; they should not be treated as interchangeable with cellular or tissue-based products. Trigger-point injections remain a separate supporting musculoskeletal treatment rather than a featured regenerative option.",
      "Movement, strength, load tolerance, joint function, and daily goals may still require physical therapy, chiropractic care, activity modification, or another approach. Advanced care should be selected only when it adds a defensible role to that larger plan.",
    ],
  },
];

export const treatmentEducation: Partial<Record<PillarPageData["path"], EducationSection[]>> = {
  "/dry-needling-lafayette": dryNeedling,
  "/class-iv-laser-therapy-lafayette": laser,
  "/shockwave-therapy-lafayette": shockwave,
  "/prp-therapy-lafayette": prp,
  "/ozone-injection-therapy-lafayette": ozone,
  "/trigger-point-injections-lafayette": triggerPoint,
};
