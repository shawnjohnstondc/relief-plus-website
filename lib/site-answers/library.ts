import { backPainPage, neckPainPage, sciaticaPage, herniatedDiscPage, pinchedNervePage } from '../condition-pages';
import { phaseFiveConditionPages } from '../phase-five-condition-pages';
import { phaseSixConditionPages } from '../phase-six-condition-pages';
import { sportsInjuriesPage } from '../sports-injuries-page';
import { chiropracticPage, physicalTherapyPage, regenerativePage } from '../pillar-pages';
import { laserPage, dryNeedlingPage, shockwavePage, prpPage, ozonePage, triggerPointPage } from '../treatment-pages';
import { decompressionPage } from '../decompression-page';

export const libraryPath = '/faq-lafayette/patient-questions' as const;
export type LibraryAnswer = { question: string; answer: string; aliases: string[]; source: string };
const item = (question: string, answer: string, aliases: string[] = [], source = '/contact'): LibraryAnswer => ({ question, answer, aliases, source });

// Clinic policies are maintained here; clinical summaries below reuse the same
// source data as the condition and treatment pages so edits stay in sync.
export const answerGroups = [
  { id: 'visiting', title: 'Hours, location & appointments', items: [
    item('Are you open on Friday?', 'No. Relief Plus is closed on Friday.', ['Friday hours', 'Do you see patients Fridays?']),
    item('Are you open on Saturday or Sunday?', 'No. Relief Plus is closed on Saturday and Sunday.', ['Are you open weekends?', 'Saturday hours', 'Sunday hours']),
    item('What are your office hours?', 'Monday and Wednesday: 7:00 AM–4:00 PM.\n\nTuesday and Thursday: 8:30 AM–4:00 PM.\n\nFriday, Saturday and Sunday: closed. We stay open through lunch.', ['When are you open?', 'What time do you open and close?', 'Business hours']),
    item('What are your Monday hours?', 'Relief Plus is open Monday from 7:00 AM to 4:00 PM, including lunch.', ['Are you open Monday?', 'When do you close Monday?']),
    item('What are your Tuesday hours?', 'Relief Plus is open Tuesday from 8:30 AM to 4:00 PM, including lunch.', ['Are you open Tuesday?', 'When do you close Tuesday?']),
    item('What are your Wednesday hours?', 'Relief Plus is open Wednesday from 7:00 AM to 4:00 PM, including lunch.', ['Are you open Wednesday?', 'When do you close Wednesday?']),
    item('What are your Thursday hours?', 'Relief Plus is open Thursday from 8:30 AM to 4:00 PM, including lunch.', ['Are you open Thursday?', 'When do you close Thursday?']),
    item('Do you close for lunch?', 'No. Relief Plus stays open through lunch on its regular operating days, Monday through Thursday.', ['Are you open at lunch?', 'Lunch hours']),
    item('Are you open on holidays?', 'Holiday hours or temporary schedule changes can differ from regular hours. Call 337-565-4200 to confirm the schedule for a specific holiday.'),
    item('Where are you located?', 'Relief Plus is at 112 Arabian Dr., Lafayette, LA 70507.', ["Where are ya’ll located?", 'What is your address?', 'Where is your office?', 'How do I get to Relief Plus?']),
    item('Are you in Carencro?', 'Our clinic is at 112 Arabian Dr., Lafayette, LA 70507. We serve patients from Carencro and the surrounding Acadiana area.', ['Do you serve Carencro?']),
    item('How do I make an appointment?', 'Call Relief Plus at 337-565-4200 to schedule an appointment.', ['How do I book a visit?', 'Schedule an appointment', 'Can I make an appointment?']),
    item('Can I book online?', 'Appointments are scheduled by phone at 337-565-4200. This website does not offer online booking.', ['Do you have online scheduling?']),
    item('Do you take walk-ins?', 'Call 337-565-4200 before coming in without an appointment to check whether we can see you. Same-day availability can vary.', ['Do you accept walkins?', 'Can I walk in?', 'Do I need an appointment?']),
    item('Can I get a same-day appointment?', 'Call 337-565-4200 to ask about same-day availability. The website does not show live openings or guarantee an appointment today.', ['Can you see me today?', 'Are you accepting appointments today?']),
    item('What is your phone number?', 'Call Relief Plus at 337-565-4200.', ['How do I call you?', 'Telephone number']),
    item('What is your email address?', 'The clinic email is myreliefplus@gmail.com. Please do not send private medical information through ordinary email.', ['How do I email you?']),
    item('Where should my doctor fax a referral?', 'Referrals can be faxed to Relief Plus at 337-565-4201.', ['What is your fax number?']),
  ] },
  { id: 'first-visit', title: 'Your first visit', items: [
    item('Do you adjust on the first visit?', 'Yes. If the examination finds no contraindications, treatment is done on the first visit. An adjustment is performed when it is appropriate for your condition.', ['Do you adust on the first visit?', 'Will I get adjusted at my first appointment?', 'Do you treat on the first visit?', 'Will I receive treatment the same day?', 'First visit treatment'], '/faq-lafayette'),
    item('What happens at my first visit?', 'We discuss your symptoms, health history, previous care and goals, then examine the relevant movement, joints and nerve function.\n\nIf there are no contraindications, treatment is done on the first visit. The type of treatment follows the examination.', ['What should I expect at my first appointment?', 'New patient visit'], '/faq-lafayette'),
    item('What should I bring to my first visit?', 'Be ready to discuss your symptom history, medications, relevant health information, previous treatment and any imaging you already have. Call the clinic for current paperwork instructions.', ['What do I bring?', 'First visit paperwork'], '/faq-lafayette'),
    item('Do I need to choose a treatment before I come in?', 'No. Tell us what hurts and which activities are difficult. Your assessment helps determine which type of care fits.', ['I do not know which treatment I need'], '/faq-lafayette'),
    item('Will I be adjusted at every visit?', 'Not necessarily. Adjustments depend on the examination, whether they are appropriate, your preference and your response to care. Exercise, physical therapy or another approach may be a better fit.', ['Does every visit include an adjustment?'], '/faq-lafayette'),
    item('How many visits will I need?', 'The number of visits depends on your condition, examination, goals and response to care. Progress is reassessed rather than assuming everyone needs the same number of visits.', ['How long will treatment take?', 'How many treatments do I need?'], '/chiropractic-adjustments-lafayette'),
    item('Do I need X-rays or an MRI before treatment?', 'Imaging is not needed for every episode of back pain. It may be appropriate when the examination suggests a serious problem, progressive nerve changes, trauma or another reason the result would change care.', ['Is imaging always required?', 'Do all patients need X-rays?'], '/back-pain-lafayette'),
    item('Do I need a referral to see Dr. Johnston or Dr. Reed?', 'No referral is needed to see Dr. Johnston or Dr. Reed. Insurance authorization and other plan requirements may still apply.', ['Do I need a referral?', 'Do I need a referral for chiropractic?']),
    item('Do I need a referral for physical therapy?', 'When physical therapy is appropriate, Relief Plus can coordinate the referral or plan-of-care process and send the plan to an appropriate medical provider for review when required. Requirements vary by insurance plan.', ['PT referral requirements']),
    item('Can I have chiropractic and physical therapy together?', 'Yes. Chiropractic and physical therapy can work together when each has a clear role in your care. They can also be used independently.', ['Can I do PT and chiropractic?'], '/faq-lafayette'),
  ] },
  { id: 'insurance', title: 'Insurance & costs', items: [
    item('Which insurance plans do you accept?', 'Relief Plus accepts Medicare, Blue Cross and Blue Shield (BCBS), UnitedHealthcare, VA, Verity and Healthy Blue.\n\nBenefits, authorization and your share of the cost depend on your plan and the service. Accepting a plan does not guarantee coverage for every treatment.', ['Do you take insurance?', 'What insurance do you take?']),
    ...['Medicare', 'Blue Cross and Blue Shield', 'UnitedHealthcare', 'VA', 'Verity', 'Healthy Blue'].map(name => item(`Do you accept ${name}?`, `Yes. Relief Plus accepts ${name}. Coverage, authorization and your share of the cost depend on your specific plan and service.`, name === 'Blue Cross and Blue Shield' ? ['Do you take BCBS?', 'Do you take Blue Cross?'] : [])),
    item('How much does a visit cost?', 'Your cost depends on the services provided and your insurance benefits, if applicable. Call 337-565-4200 for pricing for the visit or treatment you are considering; this page does not publish a fixed visit price.', ['What are your prices?', 'How much is an adjustment?', 'What is the cost of laser therapy?', 'How much is physical therapy?']),
    item('Does insurance cover every treatment?', 'No coverage guarantee applies just because we accept your plan. Coverage and authorization vary by service and policy. Confirm benefits and your expected cost before treatment.', ['Will my insurance pay for laser therapy?', 'Is PRP covered by insurance?', 'Is shockwave covered?']),
    item('Can I get a good faith estimate?', 'Uninsured or self-pay patients may request a Good Faith Estimate of expected charges. See our Good Faith Estimate page or call the clinic for details.', ['Do you provide a good faith estimate?'], '/good-faith-estimate'),
  ] },
  { id: 'treatments', title: 'Treatments explained', items: [
    ...[
      ['chiropractic care', chiropracticPage], ['physical therapy', physicalTherapyPage],
      ['laser therapy', laserPage], ['dry needling', dryNeedlingPage], ['shockwave therapy', shockwavePage],
      ['PRP therapy', prpPage], ['ozone injection therapy', ozonePage], ['trigger point injections', triggerPointPage],
      ['spinal decompression', decompressionPage], ['regenerative medicine', regenerativePage],
    ].flatMap(([name, page]) => {
      const label = name as string;
      const data = page as typeof laserPage;
      const short = label.replace(/ therapy$| care$/, '');
      return [
        item(`Do you offer ${label}?`, `Yes. Relief Plus offers ${label}. An evaluation determines whether it is appropriate for your condition.`, [`Do you do ${label}?`, `Do you have ${label}?`, `Can I get ${label}?`, `Do you do ${short}?`], data.path),
        item(`What ${label.endsWith('injections') ? 'are' : 'is'} ${label}?`, data === laserPage ? 'Class IV laser therapy uses specific wavelengths of light applied from outside the body to a selected muscle, joint or soft-tissue area. This is also called photobiomodulation.\n\nIt may help selected pain or soft-tissue problems as part of a care plan. Results vary, and it does not replace exercise or rehabilitation when those are needed.' : data.overviewParagraphs.join('\n\n'), [`Explain ${label}`, `How does ${label} work?`], data.path),
      ];
    }),
    item('What does laser therapy feel like?', 'Patients commonly report little sensation or comfortable warmth. Sensation depends on the settings, treatment area and protocol. Eye protection is required.', ['Does laser therapy hurt?', 'Is laser therapy painful?'], '/faq-lafayette'),
    item('Is laser therapy an injection?', 'No. Class IV laser therapy applies light externally to a selected area. It does not involve an injection.', ['Does laser therapy use needles?'], laserPage.path),
    item('Does laser therapy replace exercise or physical therapy?', 'No. Laser can support a care plan, but it does not replace examination or work on strength, mobility and movement when those are needed.', ['Can I do laser instead of rehab?'], laserPage.path),
    item('What can laser therapy be used for?', 'Class IV laser may be considered as an adjunct for selected back, neck, shoulder, hip, knee, tendon or plantar-fascia problems. The diagnosis and examination determine whether it fits; benefit is not guaranteed.', ['What conditions does laser treat?', 'Can laser help knee pain?'], laserPage.path),
    item('Does dry needling inject medicine?', 'No. Dry needling uses a thin, solid filament needle without injecting medication.', ['Is dry needling an injection?'], dryNeedlingPage.path),
    item('Are laser and shockwave the same?', 'No. Laser therapy applies light to a selected area. Shockwave uses acoustic waves and is considered for selected persistent tendon or plantar-fascia problems. The examination helps determine which, if either, fits.', ['Laser versus shockwave', 'Difference between laser and shockwave'], '/faq-lafayette'),
    item('Are PRP and ozone the same?', 'No. PRP, ozone and cellular therapies are distinct procedures with different evidence, risks and candidacy requirements.', ['Are all regenerative treatments the same?'], '/faq-lafayette'),
    item('Does Dr. Johnston perform epidural injections?', 'No. Dr. Johnston does not perform epidural injections. When appropriate, he coordinates or refers patients to a qualified medical specialist for that decision and procedure.', ['Do you do epidural injections?', 'Do you give epidural steroid shots?'], '/blog/when-does-an-epidural-steroid-injection-work-for-sciatica'),
  ] },
  { id: 'conditions', title: 'Conditions & how care is selected', items: [
    ...[
      ['back pain', backPainPage], ['neck pain', neckPainPage], ['sciatica', sciaticaPage],
      ['herniated discs', herniatedDiscPage], ['pinched nerves', pinchedNervePage],
      ...phaseFiveConditionPages.map(p => [p.breadcrumbLabel.replace(/ Care$/i, '').toLowerCase(), p]),
      ...phaseSixConditionPages.map(p => [p.breadcrumbLabel.replace(/ Care$/i, '').toLowerCase(), p]),
      ['sports injuries', sportsInjuriesPage],
    ].flatMap(([name, page]) => {
      const data = page as typeof sciaticaPage;
      const names: Record<string, string> = { '/tmj-treatment-lafayette': 'TMJ pain', '/hip-bursitis-lafayette': 'hip bursitis', '/achilles-tendinopathy-lafayette': 'Achilles tendinopathy', '/si-joint-pain-lafayette': 'SI joint pain', '/headache-treatment-lafayette': 'headaches', '/plantar-fasciitis-lafayette': 'plantar fasciitis', '/tendonitis-treatment-lafayette': 'tendonitis' };
      const label = names[data.path] ?? name as string;
      return [
        item(`Do you treat ${label}?`, `Yes. Relief Plus evaluates and treats ${label} when the examination supports care here. We assess the cause and determine whether treatment or further medical evaluation should come first.`, [`Can you help with ${label}?`, `Do you see patients with ${label}?`], data.path),
        item(`How do you treat ${label}?`, data.path === '/sciatica-treatment-lafayette' ? 'We first check the cause of the leg symptoms, your strength, sensation and movement.\n\nWhen appropriate, chiropractic care addresses restricted back or pelvic joints. Physical therapy uses exercises to improve comfortable movement, trunk and hip control, walking and lifting. Nerve-mobility exercises may be included when appropriate.\n\nYour examination determines the plan and whether further medical evaluation is needed.' : data.approachDescription.replace(/\.\s+(?=[A-Z])/g, '.\n\n'), [`What treatments do you use for ${label}?`, `What can you do for ${label}?`], data.path),
      ];
    }),
    item('What is sciatica?', sciaticaPage.overviewParagraphs[0], ['What does sciatica mean?'], sciaticaPage.path),
    item('Can sciatica cause tingling or numbness?', 'Yes. Sciatica can include tingling, numbness, burning pain or weakness extending into a leg or foot. An examination helps identify the cause and check nerve function.', ['Sciatica symptoms', 'Can sciatica cause leg pain?'], sciaticaPage.path),
    item('When are back pain or sciatica symptoms an emergency?', 'Seek emergency care for new bladder or bowel control problems, numbness around the groin or saddle area, or severe or worsening weakness or numbness in both legs. These can signal a serious spinal problem.', ['Sciatica red flags', 'Back pain and bladder problems'], sciaticaPage.path),
    item('Can you guarantee pain relief?', 'No. Results vary by condition and patient. Care is based on the examination, your goals and reassessment of your response.', ['Will treatment definitely work?', 'Is treatment guaranteed?'], '/our-approach'),
  ] },
  { id: 'team', title: 'Your care team', items: [
    item('Who is the chiropractor at Relief Plus?', 'Dr. Shawn D. Johnston, D.C., provides chiropractic care and assesses muscle, joint and movement concerns.', ['Who does the adjustments?', 'Who is Dr. Johnston?'], '/dr-shawn-johnston-dc'),
    item('Who is your physical therapist?', 'Jeanne Saucier, PT, provides physical therapy focused on movement, strength and daily function.', ['Who does physical therapy?', 'Who is Jeanne Saucier?'], '/jeanne-saucier-pt'),
    item('What is Dr. Reed’s role?', 'Dr. Ashton Reed, M.D., provides medical oversight and clinical decision-making for the regenerative medicine program. He does not necessarily see every patient or perform every procedure.', ['Who is Dr. Reed?', 'Does Dr. Reed perform every procedure?'], '/dr-ashton-reed-md'),
    item('Will I see all three providers?', 'Not necessarily. Which providers are involved depends on your condition and care plan.', ['Does everyone see all providers?'], '/faq-lafayette'),
  ] },
];
