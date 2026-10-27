import type { Faq } from "@/components/ui/FaqSection";
import {
  locationField,
  vehicleField,
  yearField,
  type Charge,
  type FormField,
  type ServiceCard,
  type Step,
} from "@/components/services/types";

export const img = (name: string) => `/images/inspection-appraisal/${name}`;

export const assessmentKinds: ServiceCard[] = [
  {
    title: "Pre-purchase inspection",
    text: "An independent check of a vehicle's visible and mechanical condition before you buy.",
    image: img("card-pre-purchase.webp"),
    alt: "A technician looking under a car in a workshop",
  },
  {
    title: "Appraisal / valuation",
    text: "An opinion of value at a date, based on condition and comparable sales. Not a purchase offer.",
    image: img("card-appraisal.webp"),
    alt: "Paperwork and a calculator on a desk",
  },
  {
    title: "Vehicle history report",
    text: "Records such as past registrations or reported incidents, from a named data provider.",
    image: img("card-history-report.webp"),
    alt: "A person reviewing and signing documents",
  },
  {
    title: "Diagnostic scan",
    text: "Fault codes read from the vehicle's systems. Codes aren't a full condition report.",
    image: img("card-diagnostic-scan.webp"),
    alt: "A modern car parked outside",
  },
];

export const formFields: FormField[] = [
  yearField,
  vehicleField,
  locationField,
  {
    key: "assessment",
    label: "Assessment needed",
    kind: "select",
    options: [
      "Pre-purchase inspection",
      "Appraisal / valuation",
      "Vehicle history report",
      "Diagnostic scan",
      "Not sure yet",
    ],
    error: "Choose an assessment.",
  },
];

export const charges: Charge[] = [
  {
    charge: "Inspection fee",
    covers: "Set by the provider for a stated scope",
    status: "quoted",
  },
  {
    charge: "Appraisal fee",
    covers: "Set by the provider; may depend on purpose",
    status: "quoted",
  },
  {
    charge: "Travel / mobile visit",
    covers: "Only if the provider comes to you",
    status: "conditional",
  },
  {
    charge: "Extra checks",
    covers: "Only with your approval before work",
    status: "consent",
  },
];

export const steps: Step[] = [
  {
    title: "Choose the assessment",
    text: "Decide whether you need condition, value, history or all three.",
  },
  {
    title: "Find an eligible provider",
    text: "Providers would show their scope, method and qualifications.",
  },
  {
    title: "The assessment",
    text: "The provider inspects or appraises the vehicle under its stated method.",
  },
  {
    title: "Review report and valuation",
    text: "Check the date, scope, limitations and who issued it.",
  },
];

export const recordedItems = [
  "Who carried out the assessment, and their stated qualification",
  "Date, location and odometer reading at the time",
  "What was checked — and what wasn't",
  "Photos and measurements where captured",
  "For valuations: purpose, date and method",
];

export const faqs: Faq[] = [
  {
    q: "Is an inspection the same as a certification?",
    a: "No. An inspection reports observed condition at a point in time. A certification needs a named program and its own evidence.",
  },
  {
    q: "Is an appraisal a purchase offer?",
    a: "No. An appraisal is an opinion of value on a given date for a stated purpose. A buyer or dealer may offer more or less, and an offer is a separate commitment.",
  },
  {
    q: "Does a history report show everything?",
    a: "No. It only shows what was reported to the named data provider. Unreported repairs, private sales or events in other markets may be missing, so pair it with an inspection.",
  },
  {
    q: "Who sees the report?",
    a: "You do. A report would only be shared with a seller, buyer, lender or insurer if you choose to share it, and you'd be shown who before it happens.",
  },
  {
    q: "Can a diagnostic scan replace an inspection?",
    a: "No. A scan reads stored fault codes from the vehicle's systems. It doesn't check bodywork, tyres, brakes, leaks or wear that a physical inspection would look at.",
  },
  {
    q: "What if I disagree with the findings?",
    a: "Raise it with the provider first and ask for the evidence behind the finding. You can also get a second, independent assessment. Unresolved issues could go through Service Disputes.",
  },
];
