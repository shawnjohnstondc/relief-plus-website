import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createBreadcrumbStructuredData, createFaqStructuredData, createPageMetadata } from "@/lib/seo";

const path = "/faq-lafayette" as const;
const categories = [
  { eyebrow: "Getting Started", title: "Planning your first conversation.", items: [
    { question: "Do I need to know which treatment I need?", answer: "No. Tell us what hurts, what is difficult, and what you want to get back to. An assessment helps determine whether chiropractic, physical therapy, a selected medical option, or a referral fits your needs." },
    { question: "What should I bring or be ready to discuss?", answer: "Be prepared to discuss symptom history, relevant health information, medications, prior care, imaging you already have, and the activities you want to improve. Call the clinic for current paperwork instructions." },
    { question: "Which insurance plans does Relief Plus accept?", answer: "Relief Plus currently accepts Medicare, Blue Cross and Blue Shield (BCBS), UnitedHealthcare, VA, Verity, and Healthy Blue. Coverage, authorization, benefits, and patient responsibility vary by plan and service. Acceptance does not guarantee coverage or payment for a particular visit or treatment." },
    { question: "Do I need a referral?", answer: "No referral is needed to see Dr. Johnston or Dr. Reed. Physical therapy is handled differently. When PT is appropriate, Relief Plus can coordinate the referral or plan-of-care process and send the plan to a primary-care physician or another appropriate medical provider for review when required. Payer requirements vary by plan." },
  ] },
  { eyebrow: "Provider Roles", title: "Who provides care at Relief Plus?", items: [
    { question: "What are the providers’ roles?", answer: "Dr. Johnston provides chiropractic care and assesses muscle, joint, and movement concerns. Jeanne Saucier, PT, guides physical therapy to rebuild movement and strength. Dr. Reed provides medical oversight and decision-making for the regenerative medicine program. Not every patient sees all three." },
    { question: "Does Dr. Reed perform every advanced procedure?", answer: "No. Dr. Reed provides medical oversight and clinical decision-making for the regenerative medicine program, but this does not mean he sees every advanced-care patient or performs every procedure. The clinic can explain the responsible provider and process for a specific service." },
  ] },
  { eyebrow: "Chiropractic", title: "Questions about chiropractic care.", items: [
    { question: "Does every chiropractic visit include an adjustment?", answer: "No. Treatment should follow the examination, clinical appropriateness, patient preference, and response. Education, exercise, physical therapy, referral, or another approach may be more appropriate." },
    { question: "Is chiropractic only for the spine?", answer: "No. An assessment may include the spine, arms, legs, and the way you move when those areas are relevant to your symptoms." },
  ] },
  { eyebrow: "Physical Therapy", title: "Questions about rehabilitation.", items: [
    { question: "What does physical therapy focus on?", answer: "Physical therapy helps you build movement, strength, and endurance for activities such as walking, lifting, working, or playing a sport. The starting point and pace depend on your needs." },
    { question: "Can physical therapy work alongside chiropractic?", answer: "Yes, when each has a clear role. They may also be used independently depending on the condition and examination." },
  ] },
  { eyebrow: "Dry Needling", title: "Questions about needling.", items: [
    { question: "Is dry needling an injection?", answer: "No. Dry needling uses a thin, solid filament needle and does not inject medication." },
    { question: "Does dry needling replace exercise?", answer: "Usually not when the goal requires greater strength, movement, or load tolerance. It may create a more comfortable opportunity for active care." },
  ] },
  { eyebrow: "Laser", title: "Questions about Class IV laser.", items: [
    { question: "What does laser treatment feel like?", answer: "Patients commonly report little sensation or comfortable warmth. The experience depends on the device settings, area, and protocol, and eye protection is required." },
  ] },
  { eyebrow: "Shockwave", title: "Questions about acoustic-wave care.", items: [
    { question: "What is shockwave commonly considered for?", answer: "It is commonly studied for persistent plantar-fascia and selected tendon problems. Diagnosis, symptom duration, equipment, and loading plan matter." },
  ] },
  { eyebrow: "Advanced Options", title: "PRP, ozone, and regenerative medicine.", items: [
    { question: "Are PRP, ozone, and cellular therapies the same?", answer: "No. They are distinct procedures with different evidence, risks, product questions, and regulatory considerations." },
    { question: "Is every patient a candidate for regenerative medicine?", answer: "No. Candidacy depends on the exact option, diagnosis, examination, health context, evidence, goals, risks, and reasonable alternatives." },
  ] },
  { eyebrow: "Scheduling + Location", title: "Visiting Relief Plus.", items: [
    { question: "How do I schedule?", answer: "Call Relief Plus at 337-565-4200. This website does not offer online booking." },
    { question: "Where is Relief Plus?", answer: "The clinic’s published address is 112 Arabian Dr., Lafayette, Louisiana 70507." },
  ] },
];
const faqItems = categories.flatMap((category) => category.items);
export const metadata = createPageMetadata({ title: "Relief Plus FAQ in Lafayette, LA", description: "Answers to common questions about getting started, chiropractic, physical therapy, treatments, scheduling, and the Relief Plus Lafayette location.", path });
export default function Page() { return <><JsonLd data={createBreadcrumbStructuredData(path, "Frequently Asked Questions")} /><JsonLd data={createFaqStructuredData(faqItems)} /><InfoPageShell path={path} breadcrumbLabel="FAQ" eyebrow="Frequently Asked Questions" title="Clear answers before care begins." description="Find answers about your first visit, provider roles, treatments, and scheduling. For questions about your own health, insurance benefits, or current availability, call the clinic." sections={categories.map((category) => ({ eyebrow: category.eyebrow, title: category.title, items: category.items.map((item) => ({ title: item.question, description: item.answer })) }))} cta={{ title: "Have a question specific to you?", description: "Call Relief Plus at 337-565-4200 for scheduling and current clinic information." }} /></> }
