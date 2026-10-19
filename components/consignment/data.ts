import type { Faq } from "@/components/ui/FaqSection";

export const steps = [
  { id: 1, title: "Check eligibility" },
  { id: 2, title: "Your vehicle" },
  { id: 3, title: "Review provider" },
  { id: 4, title: "Understand agreement" },
  { id: 5, title: "Send enquiry" },
  { id: 6, title: "Track outcome" },
] as const;

export type StepId = (typeof steps)[number]["id"];

/* ---------- Form options ---------- */

export const sellerRoles = ["The owner", "Acting for the owner, with written permission", "A business"];

export const financeOptions = ["No outstanding finance", "Yes — I'll need a settlement figure", "Not sure"];

export const documentOptions = ["Yes, I have the V5C / title", "Applied for a replacement", "No"];

export const shareOptions = [
  { id: "vehicle", label: "Vehicle details", note: "Required for any consignment enquiry", required: true },
  { id: "condition", label: "Condition and finance answers", note: "Helps the provider assess the vehicle" },
  { id: "price", label: "Your asking price", note: "Only if you entered one" },
  { id: "area", label: "Postcode area", note: "Not your full address" },
] as const;

/** Example providers — real providers come from the marketplace for the seller's area. */
export const providers = [
  {
    id: "specialist",
    name: "Example Specialist Cars Ltd",
    badge: "L5 Certified Partner",
    distance: "4.1 mi",
    rating: 4.8,
    reviews: 214,
    note: "Showroom consignment · cars and vans",
    terms: [
      { label: "Who sells", value: "Example Specialist Cars Ltd markets and sells the vehicle — not DriverXtra" },
      { label: "Custody", value: "Vehicle kept at the provider's showroom, under their trade insurance" },
      { label: "Pricing", value: "Asking price agreed in writing; changes need your written approval" },
      { label: "Commission", value: "8% of the final sale price, minimum £600. No fee if it doesn't sell" },
      { label: "Minimum term", value: "60 days, then rolling with 7 days' notice" },
      { label: "Payment", value: "To your bank within 5 business days of the buyer's cleared funds" },
    ],
  },
  {
    id: "harbourside",
    name: "Harbourside Motors",
    badge: "L4 Business Verified",
    distance: "7.3 mi",
    rating: 4.6,
    reviews: 98,
    note: "Online consignment · vehicle stays with you",
    terms: [
      { label: "Who sells", value: "Harbourside Motors handles enquiries and the sale — not DriverXtra" },
      { label: "Custody", value: "Vehicle stays with you; you arrange viewings and keep your own insurance" },
      { label: "Pricing", value: "Asking price agreed in writing; changes need your written approval" },
      { label: "Commission", value: "Flat £495 on completion. £95 listing fee, refundable if withdrawn in 14 days" },
      { label: "Minimum term", value: "30 days, then rolling with no notice period" },
      { label: "Payment", value: "Buyer pays the provider; funds reach you within 3 business days" },
    ],
  },
];

export const outcomeSteps = [
  { title: "Inspection", text: "The provider inspects the vehicle and confirms whether they can consign it." },
  { title: "Written agreement", text: "Custody, pricing, commission and term are set out before you sign anything." },
  { title: "Marketing & buyer offers", text: "A listing or buyer offer isn't a sale. You approve any price change in writing." },
  { title: "Sale & payment", text: "Ownership transfers on completion, then the provider pays you as agreed." },
];

/* ---------- FAQ ---------- */

export const faqs: Faq[] = [
  {
    q: "What does selling a vehicle on consignment mean?",
    a: "Where supported, an authorized dealer or service provider may market a seller's vehicle under written terms. The agreement should identify who is responsible for custody, pricing, fees and the eventual sale.",
  },
  {
    q: "Does DriverXtra buy my vehicle on consignment?",
    a: "No. DriverXtra is a marketplace operated by Zoiko Mobility Inc. Consignment is provided by independent, named providers who market and sell the vehicle on your behalf.",
  },
  {
    q: "Is vehicle consignment available in every market?",
    a: "No. It depends on authorised providers operating in your market and area. If none are available, the eligibility step says so and shows other ways to sell.",
  },
  {
    q: "Does asking about consignment sign an agreement?",
    a: "No. An enquiry only shares the details you choose with one provider. Any agreement is a separate written contract you review and sign with the provider.",
  },
  {
    q: "Who keeps the vehicle while it is being marketed?",
    a: "It depends on the provider. Some keep it at their premises; others leave it with you and arrange viewings. Custody is stated in the provider's terms before you enquire.",
  },
  {
    q: "Is my vehicle automatically insured?",
    a: "Not automatically. Check the agreement: a provider holding the vehicle usually covers it under trade insurance, but if it stays with you, your own policy applies.",
  },
  {
    q: "How much does consignment cost?",
    a: "Providers usually charge a commission on the final sale price, sometimes with a minimum or a listing fee. You'll see each fee before you send an enquiry.",
  },
  {
    q: "Can the dealer change my asking price?",
    a: "Only as the written agreement allows. On DriverXtra, providers must get your written approval before changing the agreed asking price.",
  },
  {
    q: "Do I keep legal ownership until it sells?",
    a: "Usually, yes. Consignment isn't a sale to the provider — ownership normally transfers directly to the buyer on completion. Confirm this in the agreement.",
  },
  {
    q: "Can I consign a vehicle with outstanding finance?",
    a: "Often, yes, but the finance must be settled before ownership can transfer. You'll need a settlement figure from your lender, and some providers decline financed vehicles.",
  },
  {
    q: "When is a consigned vehicle considered sold?",
    a: "When the buyer has paid in full and the transfer is complete. A listing, a buyer's interest or an accepted offer isn't a completed sale.",
  },
  {
    q: "When do I receive the money?",
    a: "Payment timing is set in the provider's terms, typically a few business days after the buyer's funds clear, less the agreed commission.",
  },
  {
    q: "Can I cancel consignment and get my vehicle back?",
    a: "Yes, subject to the agreement's minimum term and notice period. Before signing, check whether any fee applies if you withdraw early.",
  },
  {
    q: "What if the provider declines or consignment is unavailable?",
    a: "You can still create a listing, request an instant offer or explore a trade-in. The methods comparison on this page shows how each one works.",
  },
];
