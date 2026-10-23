import { BadgePercent, Bookmark, Info, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export type Customer = "Consumer" | "Business";

export type Partner = {
  id: string;
  name: string;
  legalName: string;
  role: "Lender" | "Lessor";
  customers: Customer;
  product: string;
  /** Whether continuing hands over details the visitor approves, or just opens the provider's site. */
  sharesDetails: boolean;
};

// Ordered alphabetically — the directory never ranks by payment.
export const partners: Partner[] = [
  { id: "auto-lending", name: "Example Auto Lending", legalName: "Example Auto Lending Ltd", role: "Lender", customers: "Consumer", product: "Hire purchase", sharesDetails: true },
  { id: "bank", name: "Example Bank", legalName: "Example Bank plc", role: "Lender", customers: "Consumer", product: "Personal car loan", sharesDetails: false },
  { id: "credit-union", name: "Example Credit Union", legalName: "Example Credit Union Ltd", role: "Lender", customers: "Consumer", product: "Car loan", sharesDetails: true },
  { id: "fleet-leasing", name: "Example Fleet Leasing", legalName: "Example Fleet Leasing Ltd", role: "Lessor", customers: "Business", product: "Business contract hire", sharesDetails: false },
  { id: "leasing", name: "Example Leasing", legalName: "Example Leasing Ltd", role: "Lessor", customers: "Consumer", product: "Personal contract hire", sharesDetails: false },
  { id: "motor-finance", name: "Example Motor Finance", legalName: "Example Motor Finance Ltd", role: "Lender", customers: "Consumer", product: "Hire purchase", sharesDetails: true },
  { id: "vehicle-contracts", name: "Example Vehicle Contracts", legalName: "Example Vehicle Contracts Ltd", role: "Lessor", customers: "Consumer", product: "Personal contract hire", sharesDetails: false },
];

export const productTypes = [...new Set(partners.map((p) => p.product))].sort();
export const customerTypes: Customer[] = ["Consumer", "Business"];

export const continueNote = (p: Partner) =>
  p.sharesDetails ? "Continuing may share details you approve — explained first." : "Continuing opens the provider's website. No details are shared.";

export const howWeWork: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Referral relationships",
    text: "DriverXtra may receive a fee when you continue to some providers. Each profile says whether this applies. Fees never change the directory order.",
    icon: Bookmark,
  },
  {
    title: "What a listing means",
    text: "A profile isn't lender approval, a finance offer, a guarantee or a universal licence claim.",
    icon: Info,
  },
  {
    title: "Rates",
    text: "Rates and terms are not shown in this directory. For available finance offers, use the separate comparison experience where supported.",
    icon: BadgePercent,
  },
];

export const faqs: Faq[] = [
  {
    q: "What is a finance partner on DriverXtra?",
    a: "A finance partner is a third-party organization that may participate in vehicle-finance experiences where supported. The organization's role and available services depend on its approved profile and the market you select.",
  },
  {
    q: "Does DriverXtra provide the loan?",
    a: "No. DriverXtra isn't a lender or lessor. Any finance agreement is between you and the provider, which makes every decision.",
  },
  {
    q: "Are all lenders in my area listed?",
    a: "No. The directory only shows organizations that participate on DriverXtra in your selected market. Many other providers exist.",
  },
  {
    q: "Does being listed mean DriverXtra recommends a provider?",
    a: "No. A listing isn't a recommendation. Compare the provider's terms, fees and suitability for yourself before you continue.",
  },
  {
    q: "Can I see financing rates here?",
    a: "No. Rates and terms aren't shown in this directory. Where supported, use Compare Vehicle Finance to see available offers.",
  },
  {
    q: "Does a partner listing mean I qualify?",
    a: "No. Only the provider can decide, after its own assessment. Get Pre-Qualified can give an early indication where available.",
  },
  {
    q: "Why do partners vary by country or state?",
    a: "Providers are licensed or authorised for particular markets and products, so who appears — and what they offer — depends on the region you select.",
  },
  {
    q: "How are finance partners ordered?",
    a: "Alphabetically. There is no paid placement, and referral fees never change the order.",
  },
];
