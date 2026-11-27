import { FileText, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const readingStates = ["Not sure", "Verified on a document", "Shown on the dashboard", "Seller's claim"] as const;
export const sellers = ["Not sure yet", "Dealer", "Private seller", "Auction"] as const;
export type Reading = (typeof readingStates)[number];
export type Seller = (typeof sellers)[number];

export const checks: { title: string; text: string; icon: LucideIcon; link: string; linkLabel: string }[] = [
  {
    title: "Title and registration",
    text: "Check who owns the car, whether any finance is still owed on it, and whether the title is branded (for example salvage). There's no automatic “good title” label.",
    icon: FileText,
    link: "Vehicle History",
    linkLabel: "Run a history check",
  },
  {
    title: "History and inspection",
    text: "A history report shows what was reported to its sources; an independent inspection checks current condition; seller claims are neither. Use all three.",
    icon: Layers,
    link: "Inspection & Appraisal",
    linkLabel: "Book an inspection",
  },
  {
    title: "Safety recalls",
    text: "Check open recalls with the official source for your market. A clear lookup isn't a safety approval.",
    icon: ShieldCheck,
    link: "Odometer / Mileage Disclosure",
    linkLabel: "Mileage disclosure rules",
  },
];

export const costLines = [
  { line: "Asking price", meaning: "What the seller wants for the vehicle. You can negotiate." },
  { line: "Taxes and fees", meaning: "Registration, documentation and other charges. Some can be financed; some can't." },
  { line: "Optional products", meaning: "Extended warranties, GAP or service plans. Optional — and they add to what you borrow if financed." },
  { line: "Down payment", meaning: "Cash you pay up front. There's no universal lender minimum." },
  { line: "Trade-in allowance", meaning: "What a dealer offers for your current car." },
  { line: "Trade-in loan payoff", meaning: "What you still owe on your current car. If it's more than the allowance, that's negative equity." },
  { line: "Amount financed", meaning: "What you actually borrow after all of the above." },
];

export const faqs: Faq[] = [
  { q: "What is used vehicle financing?", a: "A loan or other financing arrangement for buying a pre-owned vehicle. Actual products, borrower rules and vehicles supported depend on provider and market." },
  { q: "Does DriverXtra approve used-car loans?", a: "No. Lenders decide eligibility, rates and terms. DriverXtra helps you explore costs and compare options." },
  { q: "Do vehicle age and mileage matter?", a: "Often. Some lenders set age or mileage limits, or offer shorter terms for older vehicles. Rules vary by lender." },
  { q: "Can I finance a vehicle from a private seller?", a: "Some lenders offer private-sale loans; many don't. Check before you agree a price with the seller." },
  { q: "Does a history report prove a vehicle is safe?", a: "No. It shows what was reported to its sources. An independent inspection checks the vehicle's current condition." },
  { q: "What if the title has a lien or brand?", a: "Outstanding finance must usually be cleared before ownership transfers. A branded title (for example salvage) can limit financing — ask the lender." },
  { q: "Is a clean recall lookup a safety certificate?", a: "No. It means no open recalls were found at the official source at that time. It isn't a safety approval." },
  { q: "What does APR mean?", a: "Annual percentage rate — the yearly cost of borrowing including interest and some fees. Lenders set it after you apply." },
  { q: "Why does a longer term change total cost?", a: "A longer term lowers the monthly payment but usually adds more interest overall. Compare total repaid, not just the monthly figure." },
  { q: "What is a down payment?", a: "Cash you pay up front. It reduces what you borrow; there's no universal minimum." },
  { q: "Does a trade-in always lower the loan?", a: "Only if it's worth more than you still owe. If the payoff is higher than the allowance, the difference is added to your loan." },
  { q: "Are taxes and dealer fees included?", a: "Only if you enter them. If you don't know them yet, tick “I don't know the fees yet” and they're listed as not included." },
  { q: "Will exploring estimates affect credit?", a: "No. Nothing on this page runs a credit check or is shared with lenders." },
  { q: "What if I do not know the mileage?", a: "Choose “Not sure”. Ask the seller for a documented reading before you apply." },
  { q: "Can modified or imported used cars be financed?", a: "Sometimes, but many lenders limit them or ask for extra documents. Ask the lender before you commit." },
  { q: "Do I need an independent inspection?", a: "It isn't required, but it's the only one of the three checks that looks at current condition. It's worth it for most used cars." },
  { q: "Are advertised rates guaranteed?", a: "No. Advertised rates are examples. Your rate depends on the lender's decision after you apply." },
  { q: "What happens after Get Pre-Qualified?", a: "You see an early indication of what you may be offered. A lender still makes the final decision on a full application." },
];
