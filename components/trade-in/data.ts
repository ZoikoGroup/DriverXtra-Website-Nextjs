import type { Faq } from "@/components/ui/FaqSection";

export const steps = [
  { id: 1, title: "Program check" },
  { id: 2, title: "Your vehicle" },
  { id: 3, title: "Condition & rights" },
  { id: 4, title: "Choose dealer" },
  { id: 5, title: "Replacement" },
  { id: 6, title: "Your numbers" },
  { id: 7, title: "Consent & request" },
  { id: 8, title: "Dealer review" },
  { id: 9, title: "Decision" },
  { id: 10, title: "Next steps" },
] as const;

export type StepId = (typeof steps)[number]["id"];

/** Steps 8–10 happen after the request is sent. */
export const LAST_FORM_STEP = 7;

export const sellerRoles = ["The owner", "Acting for the owner, with written permission", "A dealer or business"];

export const financeOptions = ["No outstanding finance", "Yes — I'll need a settlement figure", "Not sure"];
export const documentOptions = ["Yes, I have the V5C / title", "Applied for a replacement", "No"];

/** Example dealers — real dealers come from the marketplace for the seller's area. */
export const dealers = [
  { id: "harbourside", name: "Harbourside Motors", badge: "L4 Business Verified", distance: "3.2 mi", rating: 4.8, reviews: 312, note: "Independent · cars and vans" },
  { id: "northline", name: "Northline Volvo Centre", badge: "L5 Certified Partner", distance: "6.8 mi", rating: 4.9, reviews: 540, note: "Franchise dealer · Volvo" },
  { id: "city-exchange", name: "City Car Exchange", badge: "L4 Business Verified", distance: "9.1 mi", rating: 4.6, reviews: 128, note: "Independent · all makes" },
];

export const replacementOptions = [
  { id: "chosen", label: "I've chosen a vehicle from this dealer" },
  { id: "browsing", label: "I'm still browsing their stock" },
  { id: "unsure", label: "I'm not sure I'll buy yet" },
];

export const budgetOptions = ["Under $20,000", "$20,000 – $35,000", "$35,000 – $50,000", "Over $50,000"];

export const balanceOptions = ["Pay the balance myself", "Ask about dealer finance (separate decision)", "Not sure yet"];

export const shareOptions = [
  { id: "vehicle", label: "Vehicle details", note: "Required for any trade-in terms", required: true },
  { id: "condition", label: "Condition and rights answers", note: "Helps the dealer set accurate terms" },
  { id: "replacement", label: "Replacement vehicle and budget", note: "Trade-in is linked to a purchase" },
  { id: "numbers", label: "Settlement figure", note: "Only if you entered one" },
] as const;

export const nextSteps = [
  { title: "Inspection", text: "The dealer inspects the vehicle before confirming any allowance." },
  { title: "Documents", text: "V5C / title, photo ID, service history and, if financed, a settlement letter." },
  { title: "Separate purchase agreement", text: "Your replacement vehicle is bought under its own agreement and terms." },
  { title: "Settlement & handover", text: "The dealer settles any finance as agreed, then you hand over keys and documents." },
];

export const faqs: Faq[] = [
  {
    q: "What is a vehicle trade-in?",
    a: "A trade-in is an arrangement in which an eligible dealer may credit or purchase your current vehicle as part of a separate vehicle-purchase transaction, subject to dealer terms.",
  },
  {
    q: "Can I trade in a vehicle through DriverXtra?",
    a: "Where participating dealers serve your area, you can request trade-in terms here. DriverXtra connects you with the dealer; the dealer makes the decision.",
  },
  {
    q: "Is a trade-in valuation a guaranteed offer?",
    a: "No. A market valuation is information only. A dealer's allowance is set by the dealer, has conditions and is confirmed after inspection.",
  },
  {
    q: "Does DriverXtra buy my vehicle?",
    a: "No. DriverXtra is a marketplace operated by Zoiko Mobility Inc. Trade-in terms come from independent, named dealers.",
  },
  {
    q: "Must I buy another vehicle to receive a trade-in allowance?",
    a: "Usually, yes — a trade-in is linked to buying from the same dealer. If you only want to sell, an instant offer or a private listing may suit you better.",
  },
  {
    q: "Can I trade in a financed vehicle?",
    a: "Often, yes. The dealer settles the outstanding finance as part of the deal, so you'll need a settlement figure from your lender.",
  },
  {
    q: "What if I owe more than the vehicle is worth?",
    a: "That difference is negative equity. It's added to what you pay for the replacement vehicle and must be shown clearly in the dealer's terms.",
  },
  {
    q: "Does trading in a car save sales tax?",
    a: "In some markets the trade-in value reduces the taxable amount of the new purchase. Rules vary by country and region — check the dealer's terms and local guidance.",
  },
  {
    q: "Will the dealer honor an estimate after inspection?",
    a: "Not necessarily. If the inspection finds a different condition, mileage or history, the dealer may revise the allowance, as set out in their terms.",
  },
  {
    q: "What documents might be needed?",
    a: "Typically the V5C or title, photo ID, service history, all keys and, if the vehicle is financed, a settlement letter from your lender.",
  },
  {
    q: "Is dealer verification the same as vehicle title verification?",
    a: "No. Dealer verification checks the business. Title verification checks that you can sell this vehicle. Each has its own status.",
  },
  {
    q: "Can I compare trade-in and private listing?",
    a: "Yes. The methods comparison on this page shows who controls the sale, third parties, offers and fees for each option.",
  },
  {
    q: "What happens when I request trade-in terms?",
    a: "Only the details you choose are shared with the dealer you picked. The dealer reviews them and responds with terms or a decline.",
  },
  {
    q: "Can I cancel or decline?",
    a: "Yes. You can withdraw your request or decline the dealer's terms at any point before signing a purchase agreement.",
  },
];
