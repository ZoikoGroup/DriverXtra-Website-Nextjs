import { FileText, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";
import type { RegionName } from "@/lib/region";

/* ---------- Currency per region ---------- */

export const regionCurrency: Record<RegionName, { code: string; locale: string }> = {
  "United States": { code: "USD", locale: "en-US" },
  "United Kingdom": { code: "GBP", locale: "en-GB" },
  Canada: { code: "CAD", locale: "en-CA" },
  Germany: { code: "EUR", locale: "de-DE" },
  France: { code: "EUR", locale: "fr-FR" },
  India: { code: "INR", locale: "en-IN" },
  Australia: { code: "AUD", locale: "en-AU" },
  UAE: { code: "AED", locale: "en-AE" },
};

export function formatMoney(region: RegionName, n: number) {
  const { code, locale } = regionCurrency[region];
  return new Intl.NumberFormat(locale, { style: "currency", currency: code, maximumFractionDigits: 0 }).format(n);
}

export function currencySymbol(region: RegionName) {
  const { code, locale } = regionCurrency[region];
  return (
    new Intl.NumberFormat(locale, { style: "currency", currency: code })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? code
  );
}

/* ---------- Payment assumptions ---------- */

export type Assumptions = { termMonths: number; apr: number; downPayment: number };

export const defaultAssumptions: Assumptions = { termMonths: 60, apr: 7.9, downPayment: 0 };

export const termOptions = [24, 36, 48, 60, 72, 84];

/** Amount that can be financed for a given monthly payment (standard amortising loan). */
export function financeableAmount(monthly: number, { termMonths, apr }: Assumptions) {
  const r = apr / 100 / 12;
  if (r === 0) return monthly * termMonths;
  return (monthly * (1 - Math.pow(1 + r, -termMonths))) / r;
}

/** Estimated monthly payment for a vehicle price after the down payment. */
export function monthlyPayment(price: number, { termMonths, apr, downPayment }: Assumptions) {
  const principal = Math.max(price - downPayment, 0);
  const r = apr / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
}

/* ---------- How estimates work ---------- */

export const estimateCards: { title: string; text: string; icon: LucideIcon; image: string; alt: string }[] = [
  {
    title: "Payment vs total cost",
    text: "A longer term lowers the monthly payment but usually increases the total interest you pay. Compare both.",
    icon: Layers,
    image: "/images/by-monthly-budget/payment-vs-total-cost.webp",
    alt: "Finance paperwork and a calculator",
  },
  {
    title: "What's included",
    text: "Estimates use the listed price, your down payment and net trade-in. Taxes, fees, insurance and running costs aren't added unless shown.",
    icon: FileText,
    image: "/images/by-monthly-budget/whats-included.webp",
    alt: "Documents being reviewed",
  },
  {
    title: "Not a loan offer",
    text: "No credit check happens here. A lender decides eligibility, rate and terms in its own application.",
    icon: ShieldCheck,
    image: "/images/by-monthly-budget/not-a-loan-offer.webp",
    alt: "A padlock on a keyboard",
  },
];

/* ---------- FAQ ---------- */

export const budgetFaqs: Faq[] = [
  {
    q: 'What does "By Monthly Budget" mean?',
    a: "It helps you browse vehicles using a monthly payment amount you choose. Calculations, when available, are estimates based on stated assumptions.",
  },
  {
    q: "Is the monthly amount the vehicle price?",
    a: "No. It's an estimated payment. The vehicle price is shown separately on each listing, and the total you pay over the term is usually higher because of interest.",
  },
  {
    q: "Does this check my credit?",
    a: "No. Entering a budget doesn't run a credit check or share your details with any lender.",
  },
  {
    q: "Is the displayed payment a guaranteed offer?",
    a: "No. It's an illustration using the assumptions shown. A lender sets the actual rate, term and amount after its own checks.",
  },
  {
    q: "Why might a longer term look cheaper per month?",
    a: "Spreading the cost over more months lowers each payment, but you pay interest for longer, so the total cost is usually higher.",
  },
  {
    q: "What expenses are not in the payment?",
    a: "Taxes, registration, dealer or admin fees, insurance, fuel or charging, servicing and repairs aren't included unless a listing says so.",
  },
  {
    q: "What if a listing has no payment estimate?",
    a: "Some listings don't have enough information for an estimate. You can still view the price and use the finance calculator with your own figures.",
  },
  {
    q: "What does verified seller mean?",
    a: "The seller has completed DriverXtra's identity or business checks at the level shown. It doesn't guarantee the vehicle's condition, so review its history and inspection details.",
  },
  {
    q: "Why do I need to choose a location?",
    a: "Your location sets the currency, the listings available to you and any local rules that affect pricing.",
  },
  {
    q: "Can I see the full vehicle cost?",
    a: "Yes. Each listing shows the vehicle price, and the estimate panel shows the amount financed and total repayable for the assumptions used.",
  },
  {
    q: "AREA / PRINCIPLE",
    a: "This page is designed to follow WCAG 2.2 AA principles: content is perceivable, operable, understandable and robust, whichever device or assistive technology you use.",
  },
  {
    q: "Perceivable",
    a: "Text meets contrast guidelines, images have text alternatives, and payment estimates are written out in full rather than shown only as colour or graphics.",
  },
  {
    q: "Forms",
    a: "The budget field and payment assumptions have visible labels. Errors are announced and explained in text, and the hint makes clear the amount is a payment target, not a loan approval.",
  },
  {
    q: "Keyboard",
    a: "Every control, including the budget search, assumption fields, location picker and these questions, can be reached and used with a keyboard alone.",
  },
  {
    q: "Focus management",
    a: "Focus stays visible and moves in a logical order. When results update, the change is announced to screen readers without moving your focus.",
  },
];
