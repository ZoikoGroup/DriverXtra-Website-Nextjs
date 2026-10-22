import type { Faq } from "@/components/ui/FaqSection";

/* ---------- Example provider records (design review data) ---------- */

export type LoanOption = {
  id: string;
  name: string;
  company: string;
  product: string;
  badge: "Representative example" | "Indicative rate";
  apr: number;
  rateType: "fixed" | "variable";
  /** Undefined when the provider didn't supply a fee schedule. */
  fees?: number;
  /** PCP optional final payment. */
  balloon?: number;
  notes: string;
  validated: string;
  validUntil: string;
  sponsored?: boolean;
};

export const loanOptions: LoanOption[] = [
  {
    id: "auto-lending",
    name: "Example Auto Lending",
    company: "Example Auto Lending Ltd",
    product: "Hire purchase",
    badge: "Representative example",
    apr: 12.9,
    rateType: "fixed",
    notes: "Subject to status. Fee schedule not supplied in current record.",
    validated: "7 Oct 2026",
    validUntil: "31 Oct 2026",
  },
  {
    id: "bank",
    name: "Example Bank",
    company: "Example Bank plc",
    product: "Personal car loan",
    badge: "Representative example",
    apr: 7.4,
    rateType: "fixed",
    fees: 0,
    notes: "Subject to status. Existing current-account holders may see different rates.",
    validated: "9 Oct 2026",
    validUntil: "20 Oct 2026",
  },
  {
    id: "credit-union",
    name: "Example Credit Union",
    company: "Example Credit Union Ltd",
    product: "Car loan",
    badge: "Indicative rate",
    apr: 11.5,
    rateType: "variable",
    fees: 5,
    notes: "Variable rate. Membership required. Future payments may change.",
    validated: "8 Oct 2026",
    validUntil: "31 Oct 2026",
  },
  {
    id: "motor-finance",
    name: "Example Motor Finance",
    company: "Example Motor Finance Ltd",
    product: "Hire purchase",
    badge: "Representative example",
    apr: 9.9,
    rateType: "fixed",
    fees: 10,
    notes: "Subject to status. UK residents 18+. Vehicles up to 10 years old at end of agreement.",
    validated: "10 Oct 2026",
    validUntil: "31 Oct 2026",
  },
  {
    id: "dealer-finance",
    name: "Example Dealer Finance",
    company: "Example Dealer Finance Ltd",
    product: "Personal contract purchase",
    badge: "Representative example",
    apr: 8.9,
    rateType: "fixed",
    fees: 10,
    balloon: 7700,
    notes: "PCP includes an optional final payment (balloon). Excess mileage charges apply.",
    validated: "10 Oct 2026",
    validUntil: "31 Oct 2026",
    sponsored: true,
  },
];

export type LeaseOption = {
  id: string;
  name: string;
  company: string;
  product: string;
  /** Monthly rental as a share of vehicle price (example pricing). */
  rentalFactor: number;
  /** Initial rental, in months of rental. */
  initialMonths: number;
  mileage: string;
  excessMileage: string;
  /** Undefined when end-of-contract fees weren't supplied. */
  endFees?: number;
  vatNote?: string;
  notes: string;
  validated: string;
  validUntil: string;
};

export const leaseOptions: LeaseOption[] = [
  {
    id: "lease-co",
    name: "Example Lease Co.",
    company: "Example Lease Co. Ltd",
    product: "Personal contract hire",
    rentalFactor: 0.0152,
    initialMonths: 6,
    mileage: "8,000 miles a year",
    excessMileage: "9p a mile",
    endFees: 0,
    notes: "Subject to status. You return the vehicle at the end — there's no option to buy.",
    validated: "9 Oct 2026",
    validUntil: "31 Oct 2026",
  },
  {
    id: "fleet-leasing",
    name: "Example Fleet Leasing",
    company: "Example Fleet Leasing Ltd",
    product: "Business contract hire",
    rentalFactor: 0.0138,
    initialMonths: 3,
    mileage: "10,000 miles a year",
    excessMileage: "8p a mile",
    endFees: 150,
    vatNote: "Prices exclude VAT — business customers only.",
    notes: "Subject to status. Maintenance package available at extra cost.",
    validated: "8 Oct 2026",
    validUntil: "31 Oct 2026",
  },
  {
    id: "car-leasing",
    name: "Example Car Leasing",
    company: "Example Car Leasing Ltd",
    product: "Personal contract hire",
    rentalFactor: 0.0147,
    initialMonths: 9,
    mileage: "6,000 miles a year",
    excessMileage: "Not provided",
    notes: "Subject to status. End-of-contract charges not supplied in current record.",
    validated: "6 Oct 2026",
    validUntil: "25 Oct 2026",
  },
];

/* ---------- Calculations ---------- */

/** Monthly rate from an APR (effective annual rate). */
const monthlyRate = (apr: number) => Math.pow(1 + apr / 100, 1 / 12) - 1;

/** Fixed monthly payment for an amount over n months, with an optional balloon at the end. */
export function monthlyPayment(amount: number, apr: number, months: number, balloon = 0) {
  const r = monthlyRate(apr);
  if (r === 0) return (amount - balloon) / months;
  const growth = Math.pow(1 + r, months);
  return ((amount - balloon / growth) * r) / (1 - 1 / growth);
}

export function loanFigures(option: LoanOption, price: number, deposit: number, months: number) {
  const monthly = monthlyPayment(price - deposit, option.apr, months, option.balloon ?? 0);
  const total = monthly * months + deposit + (option.fees ?? 0) + (option.balloon ?? 0);
  /** Only fixed-rate options with a full fee schedule can be cost-sorted. */
  const complete = option.fees !== undefined && option.rateType === "fixed";
  return { monthly, total, complete };
}

export function leaseFigures(option: LeaseOption, price: number, months: number) {
  const monthly = price * option.rentalFactor;
  const initial = monthly * option.initialMonths;
  const total = initial + monthly * (months - 1) + (option.endFees ?? 0);
  const complete = option.endFees !== undefined && option.excessMileage !== "Not provided";
  return { monthly, initial, total, complete };
}

export const formatGBP = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const termOptions = [24, 36, 48, 60];

/* ---------- Content ---------- */

export const faqs: Faq[] = [
  {
    q: "Does DriverXtra lend money?",
    a: "No. DriverXtra helps visitors understand and, where available, compare vehicle financing from third-party regulated providers. Those providers determine finance products, rates and approvals.",
  },
  {
    q: "Can I compare loans and leases together?",
    a: "You can view both, but they're shown separately. A lease is a rental, so its costs aren't comparable to a loan's APR or total payable.",
  },
  {
    q: "Does viewing comparisons affect my credit score?",
    a: "No. Comparing options here isn't an application and doesn't involve a credit check. A provider may run one if you apply with them.",
  },
  {
    q: "What is APR?",
    a: "The Annual Percentage Rate — the yearly cost of borrowing including interest and required fees, so different loans can be compared on the same basis.",
  },
  {
    q: "Why do two finance products have different monthly payments?",
    a: "Different rates, terms, fees and structures. A PCP, for example, has lower monthly payments because an optional final payment is left to the end.",
  },
  {
    q: "Are the prices shown guaranteed?",
    a: "No. Figures marked “representative” or “indicative” come from providers and may not be the terms you're offered. Estimates from your assumptions are illustrative.",
  },
  {
    q: "What fees should I compare?",
    a: "Arrangement and admin fees, option-to-purchase fees, early-settlement charges and, for leases, excess-mileage and end-of-contract charges.",
  },
  {
    q: "What if no finance options appear?",
    a: "Providers may not cover your market or vehicle. You can still use the payment estimate, which is illustrative only.",
  },
  {
    q: "Can I compare used-car finance?",
    a: "Yes, where providers offer it. Some limit the vehicle's age or mileage — check each provider's notes.",
  },
  {
    q: "How are options ordered?",
    a: "Alphabetically by provider by default — not a recommendation. You can sort by total or monthly cost, but only options with complete, fixed costs are sorted. Sponsored options are shown separately.",
  },
  {
    q: "How does lease financing differ from a vehicle loan?",
    a: "With a loan you own the vehicle once it's paid off. With a lease you pay to use it for a set term and mileage, then return it.",
  },
  {
    q: "Who handles my application or finance complaint?",
    a: "The provider you apply to. They make all decisions, issue all documents and handle complaints under their regulator's rules.",
  },
];
