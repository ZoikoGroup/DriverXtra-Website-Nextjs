import { FileText, Layers, Tag, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const feeItems = ["Sales tax or VAT", "Registration and title", "Delivery / destination", "Documentation fee"] as const;
export const feeStates = ["Unknown", "Known", "Estimated"] as const;
export type FeeState = (typeof feeStates)[number];

export const differences: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "List price vs agreed price",
    text: "The manufacturer's list price isn't necessarily what you pay. Finance is based on the agreed price plus anything you choose to finance.",
    icon: Tag,
  },
  {
    title: "Manufacturer offers",
    text: "Promotional rates or rebates are set by a lender or manufacturer for specific models and buyers. Some can't be combined. Nothing here assumes eligibility.",
    icon: Layers,
  },
  {
    title: "Dealer add-ons",
    text: "Paint protection, extended warranties or service plans are often optional. Ask for each price and whether you can decline it.",
    icon: FileText,
  },
];

export const guides: { title: string; text: string; image: string; alt: string; link: string }[] = [
  { title: "APR & Interest Guide", text: "How the rate changes total cost.", image: "/images/new-vehicle-finance/apr-interest-guide.webp", alt: "Bills, a calculator and a notebook on a desk", link: "APR & Interest Guide" },
  { title: "Finance Disclosures", text: "Who provides finance, and their role.", image: "/images/new-vehicle-finance/finance-disclosures.webp", alt: "A person signing a document", link: "Finance Disclosures" },
  { title: "Leasing instead?", text: "Leasing is a different product with different costs.", image: "/images/new-vehicle-finance/leasing-instead.webp", alt: "A grey coupe parked at dusk", link: "Loan & Lease Options" },
];

export const checklist = [
  "Get an insurance quote for the exact model before you commit.",
  "Budget for registration, tax and any delivery charges.",
  "Add fuel or charging, servicing and tyres to your monthly costs.",
  "Check the payment still works if your circumstances change.",
  "Read the full agreement, including early-repayment terms.",
];

export const faqs: Faq[] = [
  { q: "What is new vehicle financing?", a: "A way to pay for a new vehicle over time under financing terms agreed with a lender or provider. The exact product and availability depend on the market and contract." },
  { q: "Does this page offer a loan?", a: "No. It's an educational illustration. Applying is a separate step with a lender." },
  { q: "Is the monthly figure a quote?", a: "No. It uses only your figures and a rate you choose. A lender's quote may differ." },
  { q: "What is APR?", a: "Annual percentage rate — the yearly cost of borrowing, including interest and certain fees, shown as a percentage." },
  { q: "Is APR the same as interest rate?", a: "Not always. APR can include some fees as well as interest, so it may be higher than the interest rate alone." },
  { q: "Why can a longer term cost more?", a: "Spreading the loan over more months lowers each payment, but interest is charged for longer, so the total is usually higher." },
  { q: "How much deposit do I need?", a: "There's no universal minimum. A bigger down payment means you borrow less and pay less interest." },
  { q: "Can I use a trade-in?", a: "Yes. Tick “I'm trading in a vehicle” and enter its value and anything you still owe on it." },
  { q: "Are taxes and fees included?", a: "Only the ones you mark as known or estimated. Unknown items aren't counted, and the result says so." },
  { q: "Are optional extras required?", a: "Usually not. Paint protection, extended warranties and service plans are often optional — ask whether you can decline them." },
  { q: "Will this page check my credit?", a: "No. Nothing you enter leaves this browser tab." },
  { q: "What is a soft check?", a: "A credit search that lets a provider give an early indication without affecting your credit score. Pre-qualification explains when it's used." },
  { q: "Does prequalification guarantee approval?", a: "No. It's an early indication. A lender makes the final decision on a full application." },
  { q: "Can I compare lenders?", a: "Yes. Compare Vehicle Finance shows options side by side where they're available in your market." },
  { q: "Are EVs included?", a: "Yes, but EVs have extra factors like charging and battery warranty. See EV Finance for those." },
  { q: "Can my business use this page?", a: "You can use the illustration, but business finance has different products and rules. See Fleet Solutions or speak to a provider." },
  { q: "What if information seems incorrect?", a: "Contact Help Center with the page and the detail that looks wrong, and we'll review it." },
  { q: "How do I understand the full cost?", a: "Look at the total of payments and finance charge, not just the monthly amount, and add insurance, fuel or charging and servicing." },
];
