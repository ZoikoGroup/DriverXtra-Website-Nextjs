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

export const img = (name: string) => `/images/maintenance-repair/${name}`;

export const helpTypes: ServiceCard[] = [
  {
    title: "Scheduled maintenance",
    text: "Routine servicing such as oil, filters and fluid checks at intervals.",
    image: img("card-scheduled-maintenance.webp"),
    alt: "A mechanic pouring oil into an engine",
  },
  {
    title: "Diagnostics",
    text: "Investigating a warning light, noise or fault to find the cause.",
    image: img("card-diagnostics.webp"),
    alt: "A grey sports saloon parked outside",
  },
  {
    title: "Repairs",
    text: "Fixing an identified fault, based on an estimate you approve.",
    image: img("card-repairs.webp"),
    alt: "A car in a dim workshop with a technician working beside it",
  },
  {
    title: "Brakes & suspension",
    text: "Safety-related systems — always have them assessed by a qualified technician.",
    image: img("card-brakes-suspension.webp"),
    alt: "The side profile of a dark car",
  },
];

export const formFields: FormField[] = [
  yearField,
  vehicleField,
  {
    key: "service",
    label: "Service or symptom",
    error: "Describe the service or symptom.",
  },
  locationField,
];

export const charges: Charge[] = [
  {
    charge: "Diagnostic fee",
    covers: "Charged for investigation time, even if no repair follows",
    status: "quoted",
  },
  {
    charge: "Parts",
    covers: "Itemized, with part type (OEM, aftermarket, used)",
    status: "quoted",
  },
  {
    charge: "Labour",
    covers: "Hours × rate, or a fixed price",
    status: "quoted",
  },
  {
    charge: "Revised scope",
    covers: "Any extra work found during the job",
    status: "new-consent",
  },
  { charge: "Tax and fees", covers: "Shown on the estimate", status: "quoted" },
];

export const steps: Step[] = [
  {
    title: "Diagnosis",
    text: "The provider investigates and explains what they found.",
  },
  {
    title: "Estimate",
    text: "Itemized parts and labour for the proposed work, with an expiry.",
  },
  {
    title: "Your authorization",
    text: "Work starts only on the scope you approve.",
  },
  {
    title: "Service record and follow-up",
    text: "Invoice, work performed, parts used and any warranty.",
  },
];

export const recordedItems = [
  "Estimate version and date, and what you approved",
  "Any revised estimate, with your separate approval",
  "Parts fitted and their type",
  "Final invoice matching the approved scope",
  "Workmanship warranty terms, if offered",
];

export const faqs: Faq[] = [
  {
    q: "Can a garage do extra work without asking?",
    a: "It shouldn't. Extra work needs a revised estimate and your approval first.",
  },
  {
    q: "Is a diagnostic fee normal?",
    a: "Yes. Finding the cause of a fault takes time and equipment, so many providers charge for it even if you don't go ahead with the repair. The fee should be stated before they start.",
  },
  {
    q: "What's the difference between an estimate and an invoice?",
    a: "An estimate is the proposed work and price before anything is done. An invoice is the bill for the work actually carried out, and it should match the scope you approved.",
  },
  {
    q: "Will servicing affect my warranty?",
    a: "It depends on the warranty terms. Many manufacturers accept servicing elsewhere if it follows their schedule and uses suitable parts — keep the records and check your warranty booklet.",
  },
  {
    q: "What if a warning light comes on while driving?",
    a: "Check the owner's manual for what the light means. A red light usually means stop when it's safe to do so; an amber light means get it checked soon. If in doubt, call roadside assistance.",
  },
  {
    q: "Who's responsible for workmanship?",
    a: "The provider who did the work. Any workmanship warranty should be stated on the invoice, including how long it lasts and what it covers.",
  },
];
