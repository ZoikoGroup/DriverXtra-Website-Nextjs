import { CalendarDays, Clock, Scale, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const termOptions = [12, 24, 36, 48, 60, 72, 84];

export type Inputs = {
  price: number;
  down: number;
  rate: number;
  term: number;
  tradeIn: number;
  owed: number;
  taxPercent: number;
  fees: number;
};

export type Estimate = Inputs & {
  financed: number;
  monthly: number;
  totalPayments: number;
  interest: number;
  totalCost: number;
};

/**
 * Simple annual interest rate compounded monthly — illustrative only, not APR.
 * Financed = price + tax + fees − down payment − (trade-in − amount still owed).
 */
export function calculate(inputs: Inputs): Estimate {
  const tax = (inputs.price * inputs.taxPercent) / 100;
  const tradeEquity = inputs.tradeIn - inputs.owed; // negative equity adds to the amount financed
  const financed = Math.max(0, inputs.price + tax + inputs.fees - inputs.down - tradeEquity);
  const r = inputs.rate / 100 / 12;
  const monthly = r === 0 ? financed / inputs.term : (financed * r) / (1 - Math.pow(1 + r, -inputs.term));
  const totalPayments = monthly * inputs.term;
  return {
    ...inputs,
    financed,
    monthly,
    totalPayments,
    interest: totalPayments - financed,
    totalCost: totalPayments + inputs.down,
  };
}

export const formatGBP = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const beyondMonthly: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Longer terms", text: "Often lower each month but can mean more interest overall.", icon: Clock },
  {
    title: "Rate vs APR",
    text: "This calculator uses a simple annual interest rate compounded monthly. APR may include other borrowing costs.",
    icon: Scale,
  },
  {
    title: "Lease end costs",
    text: "Lease illustrations can involve residual value, mileage limits, return charges, and other end-of-term costs not reflected in the periodic payment.",
    icon: CalendarDays,
  },
];

export const faqs: Faq[] = [
  {
    q: "Does this calculator give me a finance offer?",
    a: "No. It uses the information you enter to create an illustration. A lender or finance provider determines actual eligibility, rates, charges, payment schedules, and contract terms.",
  },
  {
    q: "Will calculating affect my credit score?",
    a: "No. The calculator runs in your browser and doesn't involve a credit check.",
  },
  {
    q: "Is the interest rate the same as APR?",
    a: "No. This calculator uses a simple annual interest rate. APR may also include certain borrowing costs and follows market-specific disclosure rules.",
  },
  {
    q: "Does the monthly estimate include tax and fees?",
    a: "Only if you add them under “Add a trade-in, taxes and fees”. They're then included in the amount financed.",
  },
  {
    q: "Why is a longer term often lower monthly but higher total interest?",
    a: "You repay the same amount over more months, so each payment is smaller — but interest is charged for longer, so the total is usually higher.",
  },
  {
    q: "How does my down payment affect the estimate?",
    a: "It reduces the amount you borrow, which lowers both the monthly payment and the total interest.",
  },
  {
    q: "How does a trade-in with an outstanding loan work?",
    a: "Your trade-in value reduces the amount financed, but anything still owed on it is added back. If you owe more than it's worth, the difference increases what you borrow.",
  },
  {
    q: "Can I calculate payments on a used vehicle?",
    a: "Yes. Enter the vehicle's price — the calculation is the same. Providers may offer different rates for used vehicles.",
  },
  {
    q: "Why does the payment differ from a dealer or lender quote?",
    a: "Quotes use the provider's actual rate, fees, payment timing and terms, which this illustration can't know.",
  },
  {
    q: "Can I calculate a lease payment?",
    a: "Not here — leases depend on residual value and contract terms. See lease options on Compare Vehicle Finance.",
  },
  {
    q: "Does the lease estimate include mileage or return charges?",
    a: "No. Lease illustrations don't include excess-mileage, wear or other end-of-term charges.",
  },
  {
    q: "Can I compare two payment scenarios?",
    a: "Yes. Calculate a payment, save it as Scenario A, change the inputs, recalculate and save as Scenario B.",
  },
  {
    q: "Does DriverXtra approve the loan or lease?",
    a: "No. DriverXtra isn't a lender. Providers make every decision.",
  },
  {
    q: "Are my inputs saved or sent to finance providers?",
    a: "No. Your inputs stay in your browser and aren't sent to anyone. Saved scenarios clear when you leave the page.",
  },
];
