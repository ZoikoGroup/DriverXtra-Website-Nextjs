import { Calculator, FileText, CreditCard, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const topics = ["Getting started", "Loan & lease", "Rates, APR & fees", "Monthly vs total cost", "Credit & eligibility", "Leasing"] as const;
export type Topic = (typeof topics)[number];

export type Guide = {
  id: string;
  topic: Topic;
  title: string;
  excerpt: string;
  body: string[];
  reviewed: string;
  /** For sorting by newest. */
  reviewedOn: string;
  minutes: number;
  level: "Beginner" | "Intermediate";
  related: { label: string; href: string };
};

export const guides: Guide[] = [
  {
    id: "how-financing-works",
    topic: "Getting started",
    title: "How vehicle financing works",
    excerpt:
      "Vehicle financing lets you pay for a car over time under an agreement with a finance provider. The agreement can involve borrowing to purchase the car or paying to use it for a set period.",
    body: [
      "Vehicle financing lets you pay for a car over time under an agreement with a finance provider. The agreement can involve borrowing to purchase the car, or paying to use it for a set period.",
      "Every agreement sets out the amount, the rate basis, the term, any fees, and what happens at the end. The provider — not DriverXtra — decides whether to offer you finance and on what terms.",
      "Before you choose, compare the total amount payable as well as the monthly payment, and check what you're responsible for during the agreement.",
    ],
    reviewed: "30 September 2026",
    reviewedOn: "2026-09-30",
    minutes: 2,
    level: "Beginner",
    related: { label: "Compare Vehicle Finance", href: "/compare-vehicle-finance" },
  },
  {
    id: "loan-or-lease",
    topic: "Loan & lease",
    title: "Loan or lease: what changes?",
    excerpt:
      "A loan generally finances a purchase; a lease generally grants use for a defined period. Ownership, mileage limits, end-of-term choices and total cost can all differ.",
    body: [
      "A loan generally finances a purchase; a lease generally grants use of a vehicle for a defined period.",
      "With a loan, you usually own the vehicle once the agreement is paid. With a lease, you return it at the end unless the contract offers a purchase option.",
      "Leases often have mileage and wear limits and end-of-term charges. Loans can carry more cost uncertainty from depreciation and repairs. Neither is better for everyone.",
    ],
    reviewed: "28 September 2026",
    reviewedOn: "2026-09-28",
    minutes: 2,
    level: "Beginner",
    related: { label: "Vehicle Loan or Lease", href: "/vehicle-loan-or-lease" },
  },
  {
    id: "apr",
    topic: "Rates, APR & fees",
    title: "APR, interest and vehicle finance costs",
    excerpt:
      "An interest rate is the cost of borrowing on the amount financed. APR, where it applies, is a standardised measure that may include certain fees. The two aren't interchangeable.",
    body: [
      "An interest rate is the cost of borrowing on the amount financed.",
      "APR, where local law requires it, is a standardised measure that may include certain fees as well as interest, so different products can be compared on the same basis.",
      "Representative APRs are examples — the rate you're offered may differ. Always check the fees that sit outside the APR too.",
    ],
    reviewed: "25 September 2026",
    reviewedOn: "2026-09-25",
    minutes: 2,
    level: "Intermediate",
    related: { label: "How finance options are compared", href: "/compare-vehicle-finance#understanding-figures" },
  },
  {
    id: "monthly-vs-total",
    topic: "Monthly vs total cost",
    title: "Monthly payment versus total cost",
    excerpt:
      "A lower monthly payment can come from a longer term or a large final payment, and may cost more overall. Compare the total amount payable and what's due at the end.",
    body: [
      "A lower monthly payment can come from a longer term or a large final (balloon) payment — and may cost more overall.",
      "Compare the total amount payable, including the deposit, fees and any final payment, not just the monthly figure.",
      "Use the Finance Calculator to save two scenarios and see how the term changes both the monthly payment and the total interest.",
    ],
    reviewed: "20 September 2026",
    reviewedOn: "2026-09-20",
    minutes: 2,
    level: "Beginner",
    related: { label: "Finance Calculator", href: "/finance-calculator" },
  },
  {
    id: "pre-qualification",
    topic: "Credit & eligibility",
    title: "What is pre-qualification?",
    excerpt:
      "Pre-qualification can give an early indication of whether a provider may consider you. It isn't an offer, approval or guarantee, and any credit check is the provider's decision.",
    body: [
      "Pre-qualification can give an early indication of whether a provider may consider you.",
      "It isn't an offer, approval or guarantee. The provider decides whether any credit check is used, and must tell you before it happens.",
      "Only the provider can make an offer, after its own full assessment.",
    ],
    reviewed: "18 September 2026",
    reviewedOn: "2026-09-18",
    minutes: 2,
    level: "Beginner",
    related: { label: "Get Pre-Qualified", href: "/get-pre-qualified" },
  },
  {
    id: "leasing-end-of-term",
    topic: "Leasing",
    title: "Leasing: mileage, wear and end-of-term",
    excerpt:
      "Leases can include mileage allowances, wear standards and end-of-term charges beyond the regular payment. Check the allowance, the excess charge, the return condition and the fees.",
    body: [
      "Leases can include mileage allowances, wear standards and end-of-term charges beyond the regular payment.",
      "Check the mileage allowance and the charge per excess mile, the return-condition standard, and any collection or disposal fees.",
      "Ending a lease early can create substantial liability, and transfers may not be allowed.",
    ],
    reviewed: "15 September 2026",
    reviewedOn: "2026-09-15",
    minutes: 2,
    level: "Intermediate",
    related: { label: "How a vehicle lease works", href: "/vehicle-loan-or-lease#vehicle-leases" },
  },
];

export const startHere = ["how-financing-works", "loan-or-lease", "apr"];

export const educationCards: { title: string; text: string; icon: LucideIcon; link: { label: string; href: string } }[] = [
  { title: "Guide", text: "Explains terminology and choices.", icon: FileText, link: { label: "Loan & Lease Options", href: "/vehicle-loan-or-lease" } },
  {
    title: "Calculator",
    text: "Illustrates what changing assumptions may do.",
    icon: Calculator,
    link: { label: "Finance Calculator", href: "/finance-calculator" },
  },
  {
    title: "Provider offer",
    text: "Actual terms come only from a provider.",
    icon: CreditCard,
    link: { label: "Compare Vehicle Finance", href: "/compare-vehicle-finance" },
  },
];

export const glossary = [
  { term: "APR", text: "A standardised cost-of-borrowing measure where local law requires one. It may include certain fees." },
  { term: "Principal", text: "The amount borrowed, before interest." },
  { term: "Finance charge", text: "The cost of borrowing as defined by the agreement or local rules." },
  { term: "Residual value", text: "An estimated or agreed vehicle value at the end of a lease or some loans." },
  { term: "Early termination", text: "Ending an agreement before its term, which may involve fees or remaining obligations." },
];

export const faqs: Faq[] = [
  {
    q: "What are Finance Guides?",
    a: "Finance Guides are educational articles designed to explain vehicle-finance terms, common costs and decisions. They are not loan offers, eligibility decisions or personal financial advice.",
  },
  {
    q: "Does DriverXtra lend money through these guides?",
    a: "No. DriverXtra isn't a lender. Finance comes from third-party providers, who make every decision.",
  },
  {
    q: "Can I use a guide to see if I qualify?",
    a: "No. Guides explain the process. For an early indication from a provider, use Get Pre-Qualified.",
  },
  {
    q: "Is loan financing always cheaper than leasing?",
    a: "No. It depends on the terms, how long you keep the vehicle, its resale value and the end-of-term costs.",
  },
  {
    q: "What does APR mean?",
    a: "Annual Percentage Rate — a standardised cost-of-borrowing measure, where local law requires one, that may include certain fees.",
  },
  {
    q: "Is APR the same as the interest rate?",
    a: "No. The interest rate is the cost of borrowing on the amount financed; APR may also include certain fees.",
  },
  {
    q: "Does a lower monthly payment mean a cheaper loan?",
    a: "Not necessarily. A longer term or a large final payment can lower the monthly figure but raise the total cost.",
  },
  {
    q: "Can I finance a used vehicle?",
    a: "Often, yes. Providers may limit the vehicle's age, mileage or category, and rates can differ.",
  },
];
