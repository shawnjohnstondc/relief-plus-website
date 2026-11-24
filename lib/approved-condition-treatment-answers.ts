export const approvedConditionTreatments = {
  "backPain": {
    "path": "/back-pain-lafayette",
    "title": "Back Pain",
    "stableSection": "care-detail-4",
    "question": "How do you treat back pain?",
    "condition": "back pain",
    "paragraphs": [
      "At Relief Plus, we start by checking which movements bring on your back pain and what it’s keeping you from doing. Your plan may include exercises for back and hip mobility, trunk strength and endurance, and a gradual return to tasks such as lifting or yardwork. If stiff joints make movement harder, hands-on mobilization or an adjustment may be used alongside exercise when it’s safe.",
      "Dry needling may be an add-on for some people with persistent muscle-related pain. Class IV laser may be discussed for a separate muscle or soft-tissue problem; it does not replace rehabilitation. Table-based traction is not a routine part of back-pain care. If you have new or worsening weakness, or the exam suggests a problem that needs medical care, we help you get evaluated."
    ]
  },
  "neckPain": {
    "path": "/neck-pain-lafayette",
    "title": "Neck Pain",
    "stableSection": "care-detail-4",
    "question": "How do you treat neck pain?",
    "condition": "neck pain",
    "paragraphs": [
      "At Relief Plus, we check how your neck and upper back move, which positions bother you, and whether pain or tingling travels into an arm. Physical therapy may use neck and shoulder exercises to improve turning, reaching, and endurance for driving or desk work. If the exam finds stiff joints and hands-on care is appropriate, we may use gentle mobilization alongside exercise.",
      "If muscle tenderness or tension is a separate part of the problem, dry needling or Class IV laser may be discussed as supporting options, not substitutes for exercise. If symptoms travel into your arm, we check strength and sensation before choosing care. Worsening arm or hand weakness, new trouble with balance, or loss of hand coordination needs prompt medical evaluation."
    ]
  },
  "herniatedDisc": {
    "path": "/herniated-disc-lafayette",
    "title": "Herniated Disc",
    "stableSection": "care-detail-4",
    "question": "How do you treat a herniated disc?",
    "condition": "a herniated disc",
    "paragraphs": [
      "At Relief Plus, we compare your symptoms and nerve exam with any scan you already have. A herniated disc on an MRI does not always explain pain. When nonsurgical care is appropriate, we may use movements that suit your symptoms, exercises to rebuild strength and coordination, and a gradual return to sitting, lifting, or reaching, depending on where you’re affected.",
      "Hands-on joint mobilization may help with stiffness or guarding when it’s safe, but it doesn’t push the disc back into place. Dry needling may be considered for separate muscle pain, not to treat the disc; table-based traction is not routine for low-back disc symptoms. Rapidly worsening weakness needs urgent medical care. With back or leg symptoms, seek emergency evaluation for new trouble starting urination or emptying your bladder, numbness around the groin or saddle area, or loss of bladder or bowel control."
    ]
  },
  "pinchedNerve": {
    "path": "/pinched-nerve-lafayette",
    "title": "Pinched Nerve",
    "stableSection": "care-detail-5",
    "question": "How do you treat a pinched nerve?",
    "condition": "a pinched nerve",
    "paragraphs": [
      "A “pinched nerve” could start at the spine or farther down, such as at the wrist or elbow. At Relief Plus, we check the pattern of symptoms and test movement, strength, and sensation to help locate the problem. For a spine-related problem, guided movement and strengthening may help you regain function. When a nerve is irritated at the wrist or elbow, changing activities or positions that put pressure on it may be more useful.",
      "Sometimes hands-on care helps a stiff joint that’s limiting movement, or dry needling is considered for separate muscle pain. Neither is a way to free a trapped nerve. Treatment depends on where the problem is and whether nerve function is changing. New or worsening weakness, a foot that starts to drag, or hand clumsiness needs prompt medical evaluation. An unclear source may need further testing or a referral."
    ]
  }
};

export type ApprovedConditionTreatment = typeof approvedConditionTreatments[keyof typeof approvedConditionTreatments];

export function approvedTreatmentForPath(path: string) {
  return Object.values(approvedConditionTreatments).find(treatment => treatment.path === path);
}

export function approvedTreatmentHref(treatment: ApprovedConditionTreatment) {
  return `${treatment.path}#${treatment.stableSection}`;
}

export function approvedTreatmentAliases(treatment: ApprovedConditionTreatment, existingLabel: string) {
  const name = treatment.condition;
  const withoutArticle = name.replace(/^a /, "");
  const exact = [
    `How do you treat ${existingLabel}?`,
    `How do yall treat ${name}?`,
    `How do yall treat ${withoutArticle}?`,
    `How do y’all treat ${existingLabel}?`,
    `How do you all treat ${name}?`,
    `How do you treat ${withoutArticle}?`,
    `What do you do for ${name}?`,
    `What do y’all do for ${name}?`,
    `What do y’all do for ${existingLabel}?`,
    `What treatments do you use for ${existingLabel}?`,
    `What treatments do y’all use for ${name}?`,
    `What can you do for ${existingLabel}?`,
  ];
  return [...new Set(exact)].filter(question => question !== treatment.question);
}
