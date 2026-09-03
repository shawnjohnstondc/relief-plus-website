import InfoPageShell from "@/app/components/InfoPageShell";
import JsonLd from "@/app/components/JsonLd";
import { createBreadcrumbStructuredData, createPageMetadata } from "@/lib/seo";

const path = "/contact" as const;
export const metadata = createPageMetadata({ title: "Contact Relief Plus in Lafayette, LA", description: "Call Relief Plus at 337-565-4200 or visit 112 Arabian Dr., Lafayette, LA 70507 for chiropractic, physical therapy, and musculoskeletal care.", path });
export default function Page() { return <><JsonLd data={createBreadcrumbStructuredData(path, "Contact Relief Plus")} /><InfoPageShell path={path} breadcrumbLabel="Contact" eyebrow="Contact Relief Plus" title="Start with a phone call." description="Relief Plus provides phone-based scheduling for patients in Lafayette, Carencro, and throughout Acadiana. No online booking or medical-information form is used on this site." heroPoints={["Call (337) 565-4200", "112 Arabian Dr., Lafayette, LA 70507", "Fax referrals to (337) 565-4201"]} sections={[
  { eyebrow: "Clinic Information", title: "Call or visit Relief Plus.", items: [
    { title: "Phone", description: "(337) 565-4200", href: "tel:+13375654200", actionLabel: "Call Relief Plus" },
    { title: "Address", description: "112 Arabian Dr.\nLafayette, LA 70507", href: "https://www.google.com/maps/dir/?api=1&destination=112%20Arabian%20Dr.%2C%20Lafayette%2C%20LA%2070507", actionLabel: "Get directions" },
    { title: "Email", description: "myreliefplus@gmail.com", href: "mailto:myreliefplus@gmail.com", actionLabel: "Email Relief Plus" },
    { title: "Referral Fax", description: "(337) 565-4201" },
    { title: "Care for patients in Carencro", description: "Learn more about Relief Plus care for patients traveling from the Carencro area.", href: "/chiropractor-carencro-la" },
  ], paragraphs: ["Please do not use ordinary email for urgent concerns or assume it is a secure way to transmit medical information. Call the clinic for scheduling and instructions about records or referrals."] },
  { eyebrow: "Published Hours", title: "Current hours listed by the clinic.", items: [
    { title: "Monday & Wednesday", description: "7:00 AM–11:00 AM and 12:15 PM–4:00 PM" },
    { title: "Tuesday & Thursday", description: "8:30 AM–12:00 PM and 1:15 PM–4:00 PM" },
    { title: "Friday", description: "Closed" },
  ], paragraphs: ["Hours were verified against the existing Relief Plus contact page. Patients should call to confirm holiday schedules or temporary changes."] },
  { eyebrow: "Scheduling", title: "You do not need to choose a treatment before calling.", paragraphs: ["Tell the team what is limiting you and what you hope to return to. The appropriate evaluation can begin with the problem rather than a specific modality.", "Insurance participation, referral requirements, appointment availability, and pricing were not verified for this rebuild and should be confirmed directly with the clinic."] },
]} cta={{ title: "Call Relief Plus to schedule.", description: "The clinic’s published scheduling number is 337-565-4200." }} /></> }
