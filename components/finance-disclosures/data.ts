import type { Faq } from "@/components/ui/FaqSection";

export const steps = [
  "Choose your market to see the information that applies where available.",
  "Explore topics below.",
  "Review the provider's latest terms before proceeding.",
];

export type Topic = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  related?: { label: string; href: string };
};

export const topics: Topic[] = [
  {
    id: "interest-apr-total-cost",
    title: "Interest rates, APR and the total cost",
    summary:
      "An interest rate is the cost of borrowing on the amount financed. APR, where local law requires it, is a standardised measure that may include certain fees. The total cost depends on rate, term, fees and any final payment.",
    details: [
      "Representative APRs are examples supplied by providers — the rate you're offered may differ.",
      "A longer term usually lowers the monthly payment but increases the total interest paid.",
      "Compare the total amount payable, including the deposit, fees and any final (balloon) payment.",
    ],
    related: { label: "Estimate a payment", href: "/finance-calculator" },
  },
  {
    id: "fees-and-charges",
    title: "Fees and charges to check",
    summary: "Agreements can include arrangement, documentation, option-to-purchase, late-payment and early-settlement fees.",
    details: [
      "Ask which fees are included in the APR and which sit outside it.",
      "Check what happens if a payment is missed, and any charges for changing the agreement.",
      "If you might settle early, ask how the settlement figure is calculated.",
    ],
  },
  {
    id: "lease-obligations",
    title: "Important lease obligations",
    summary: "Leases can include mileage allowances, wear standards, return conditions and early-termination charges beyond the regular payment.",
    details: [
      "Check the annual mileage allowance and the charge for each excess mile.",
      "Review the fair wear and tear standard and any collection or disposal fees.",
      "Ending a lease early can create substantial liability, and transfers may not be allowed.",
    ],
    related: { label: "How a vehicle lease works", href: "/vehicle-loan-or-lease#vehicle-leases" },
  },
  {
    id: "credit-checks",
    title: "Credit checks and eligibility",
    summary: "Providers decide eligibility. Whether a credit check is used — and its type — depends on the provider, product and market.",
    details: [
      "A soft check, where offered, is usually not visible to other lenders. A full application normally involves a hard check.",
      "The provider must tell you before any credit check happens.",
      "Pre-qualification is an early indication only, not an approval or offer.",
    ],
    related: { label: "Get Pre-Qualified", href: "/get-pre-qualified" },
  },
  {
    id: "information-use",
    title: "How your information may be used",
    summary: "When you continue to a provider, only information you agree to share is sent, to the named recipient, for the stated purpose.",
    details: [
      "You'll see what would be shared, and with whom, before anything is sent.",
      "Calculator inputs stay in your browser and aren't sent to providers.",
      "Each provider handles your data under its own privacy notice.",
    ],
  },
  {
    id: "who-provides-finance",
    title: "Who provides your finance?",
    summary: "DriverXtra is a marketplace and referral intermediary, not a lender. Finance and leases are provided by the third parties named on each option.",
    details: [
      "Providers make every decision and issue all documents.",
      "DriverXtra may receive a fee when you continue to some providers; each profile says whether this applies.",
      "Fees never change the order in which options are shown.",
    ],
    related: { label: "Finance Partners", href: "/finance-partners" },
  },
];

export const checklist: [string, string, string][] = [
  ["Total amount payable", "Yes", "Total of rentals plus end costs"],
  ["Upfront payment", "Deposit and fees", "Initial rental and fees"],
  ["Final payment", "Any balloon", "Purchase option, if offered"],
  ["Use limits", "Usually none", "Mileage and wear"],
  ["Ending early", "Settlement figure and fees", "Termination charges"],
];

export const faqs: Faq[] = [
  {
    q: "What are vehicle finance disclosures?",
    a: "They explain important information about costs, finance terms, risks, provider roles and data use. Your provider's current documents govern the specific arrangement; applicable requirements vary by market.",
  },
  {
    q: "Is DriverXtra the lender?",
    a: "No. DriverXtra is a marketplace and referral intermediary. Finance and leases come from the third-party providers named on each option.",
  },
  {
    q: "What is the difference between an interest rate and APR?",
    a: "The interest rate is the cost of borrowing on the amount financed. APR, where required, is a standardised measure that may also include certain fees.",
  },
  {
    q: "Does the lowest monthly payment mean the lowest cost?",
    a: "Not necessarily. A longer term or a large final payment can lower the monthly figure but increase the total amount payable.",
  },
  {
    q: "Are calculator results finance offers?",
    a: "No. They're illustrations based on the assumptions you enter. Only a provider can make an offer.",
  },
  {
    q: "Will I be approved for financing?",
    a: "That's the provider's decision, based on its own assessment. Comparing options on DriverXtra doesn't guarantee approval.",
  },
  {
    q: "Will checking eligibility affect my credit?",
    a: "It depends on the provider and the type of check. Comparing options and using the calculator don't involve a credit check; the provider must tell you before one happens.",
  },
  {
    q: "Which fees should I check?",
    a: "Arrangement, documentation, option-to-purchase, late-payment and early-settlement fees — and, for leases, excess-mileage and end-of-term charges.",
  },
  {
    q: "Do taxes and insurance appear in monthly estimates?",
    a: "Only if you add them. Insurance is usually separate, and providers' quotes may treat taxes differently by market.",
  },
  {
    q: "How do loans and leases differ?",
    a: "A loan generally finances a purchase you'll own; a lease grants use for a set period, often with mileage and wear limits and end-of-term charges.",
  },
];
