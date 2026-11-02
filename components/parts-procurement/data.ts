import type { StatusRow } from "@/components/fleet-solutions/FleetStatusTable";

const IMG = "/images/parts-procurement";
const icon = (name: string) => `${IMG}/icons/icon-${name}.svg`;

export const HERO_IMAGE = `${IMG}/fleet-hero-mechanic-engine.webp`;

export const CATEGORIES: { icon: string; title: string; titleSize: string }[] = [
  { icon: icon("disc"), title: "Brakes", titleSize: "text-[16.1px]" },
  { icon: icon("drop"), title: "Filters", titleSize: "text-[15.7px]" },
  { icon: icon("disc"), title: "Tyres", titleSize: "text-[15.7px]" },
  { icon: icon("plug"), title: "Electrical", titleSize: "text-[15.7px]" },
];

export const FITMENT: StatusRow[] = [
  { tone: "ok", label: "Verified fitment", meaning: "Partner-provided fitment data for this exact vehicle" },
  { tone: "pending", label: "Candidate match", meaning: "Likely fit — needs confirmation" },
  { tone: "none", label: "Unknown", meaning: "Not enough vehicle detail to check" },
];

export const STEPS: { title: string; text: string }[] = [
  {
    title: "Request for quotation (RFQ)",
    text: "Asks suppliers for price, source and lead time. Not a commitment.",
  },
  {
    title: "Purchase order (PO)",
    text: "Your approved commitment to buy, sent outside DriverXtra in this prototype.",
  },
];

export const CONTROLS: { icon: string; title: string; text: string }[] = [
  {
    icon: icon("scale"),
    title: "Approval thresholds",
    text: "Above a set value, a Finance Reviewer approves.",
  },
  {
    icon: icon("shield-check"),
    title: "Supplier evidence",
    text: "Source and authorization shown on each quote.",
  },
  {
    icon: icon("clip"),
    title: "Goods receipt",
    text: "Record what arrived, and raise exceptions.",
  },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "Does the prototype show stock?",
    a: "No. Availability is unknown until a supplier confirms.",
  },
  { q: "Is a candidate match safe to order?", a: "" },
  { q: "Who approves POs?", a: "" },
  { q: "Can I return parts?", a: "" },
];
