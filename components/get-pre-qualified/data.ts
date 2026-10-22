import type { Faq } from "@/components/ui/FaqSection";

export const SAMPLE_PROVIDER = "Sample Provider A";

export const steps = [
  { id: 1, title: "Privacy & consent" },
  { id: 2, title: "About the vehicle" },
  { id: 3, title: "About you" },
  { id: 4, title: "Review" },
] as const;

export type StepId = (typeof steps)[number]["id"];

export const priceRanges = ["Under £10,000", "£10,000 – £20,000", "£20,000 – £35,000", "£35,000 – £50,000", "Over £50,000"];
export const termOptions = ["24 months", "36 months", "48 months", "60 months"];
export const employmentOptions = ["Employed full-time", "Employed part-time", "Self-employed", "Retired", "Not currently working"];
export const incomeBands = ["Under £15,000", "£15,000 – £25,000", "£25,000 – £40,000", "£40,000 – £60,000", "Over £60,000"];

/**
 * Example rule for design review — a real indication comes from the provider.
 * Compares the price band to the income band (both as list positions).
 */
export function exampleIndication(priceRange: string, incomeBand: string, employment: string) {
  const price = priceRanges.indexOf(priceRange);
  const income = incomeBands.indexOf(incomeBand);
  if (employment === "Not currently working" || price - income >= 2) return "unavailable" as const;
  return "indication" as const;
}

export const faqs: Faq[] = [
  {
    q: "Is pre-qualification an offer?",
    a: "No. It's an early indication from a provider. Only the provider can make an offer after its own full assessment.",
  },
  {
    q: "Will this affect my credit score?",
    a: "The provider decides whether any credit check is used and what type, and must tell you before it happens. DriverXtra doesn't run credit checks.",
  },
  {
    q: "What if no indication is available?",
    a: "It means the provider can't give an early indication from these details. You can still compare finance options, or change the vehicle price or deposit and try again.",
  },
  {
    q: "Who sees my details?",
    a: "Only the provider named on the consent step, and only for this early indication. You can choose not to continue at any point.",
  },
];
