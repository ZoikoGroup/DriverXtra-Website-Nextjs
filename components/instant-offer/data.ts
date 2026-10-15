import type { Faq } from "@/components/ui/FaqSection";

export const steps = [
  { id: 1, title: "Eligibility", text: "Market, vehicle type, role and area" },
  { id: 2, title: "Vehicle", text: "Registration, VIN or details" },
  { id: 3, title: "Condition", text: "Your honest description" },
  { id: 4, title: "Review Partner Terms", text: "Who buys, inspection, fees, payment" },
  { id: 5, title: "Consent & Request", text: "Choose what's shared, then request" },
  { id: 6, title: "Offer Status", text: "Track the partner's response" },
] as const;

export type StepId = (typeof steps)[number]["id"];

/* ---------- Form options ---------- */

export const sellerRoles = ["The owner", "Selling for the owner, with written permission", "A dealer or business"];

export const shareOptions = [
  { id: "vehicle", label: "Vehicle details", note: "Required for any offer", required: true },
  { id: "condition", label: "Condition description", note: "Helps the partner price accurately" },
  { id: "area", label: "Postcode area", note: "Not your full address" },
] as const;

/** Example partner shown at the terms step — real partners come from the marketplace. */
export const examplePartner = {
  name: "Northgate Vehicle Buyers Ltd",
  badge: "L5 Certified Partner",
  terms: [
    { label: "Who buys", value: "Northgate Vehicle Buyers Ltd — not DriverXtra" },
    { label: "Inspection", value: "Free inspection at your address or a partner site before any final offer" },
    { label: "Fees", value: "No fee to request or decline. Collection is free within 50 miles" },
    { label: "Payment", value: "Bank transfer after inspection and signed transfer documents" },
    { label: "Offer validity", value: "7 days from the date the partner sends it" },
  ],
};

/* ---------- FAQ ---------- */

export const faqs: Faq[] = [
  {
    q: "Does an instant offer guarantee I can sell my vehicle?",
    a: "No. An available third-party offer has its own written conditions, approval state and expiry; sale completion requires applicable transfer and payment steps.",
  },
  {
    q: "Is my vehicle valuation the same as a purchase offer?",
    a: "No. A valuation is a market range for information only. An offer comes from a named partner, has conditions and can change after inspection.",
  },
  {
    q: "Does DriverXtra buy my vehicle?",
    a: "No. DriverXtra is a marketplace operated by Zoiko Mobility Inc. Offers come from independent, named partners who buy the vehicle themselves.",
  },
  {
    q: "Are instant offers available in every country?",
    a: "No. Availability depends on partners operating in your market and area. If none are available, the eligibility step says so and shows other ways to sell.",
  },
  {
    q: "What details do I need to check eligibility?",
    a: "Your market, the vehicle type, your role (owner, authorised seller or business) and the postcode area where the vehicle is kept. Nothing is shared at this step.",
  },
  {
    q: "Can I request an offer without a valuation?",
    a: "Yes. A valuation is optional and separate. You can go straight to an instant-offer request if a partner serves your area.",
  },
  {
    q: "Why would an offer change after inspection?",
    a: "Offers are based on your description. If the inspection finds a different condition, mileage or history, the partner may revise or withdraw the offer, as set out in their terms.",
  },
  {
    q: "Does clicking “Accept” mean the sale is complete?",
    a: "No. Accepting starts the partner's process — usually inspection, signed transfer documents and payment. The sale completes only when those steps are done.",
  },
  {
    q: "When would I get paid?",
    a: "Payment timing is set in the partner's terms, typically after inspection and signed transfer documents. You'll see it before you send a request.",
  },
  {
    q: "Can I decline an offer?",
    a: "Yes. You can decline at any point before signing transfer documents. There is no fee to request or decline.",
  },
  {
    q: "Will my VIN and documents be shared?",
    a: "Only what you choose at the consent step is shared, and only with the named partner. Ownership documents are requested separately and stored privately.",
  },
  {
    q: "Can I get more than one offer?",
    a: "Where several partners serve your area, you can choose which ones receive your request and compare their offers side by side.",
  },
  {
    q: "What if there are no instant offers for my vehicle?",
    a: "You can still create a listing, request a trade-in, or use consignment where available. The methods comparison on this page shows how each one works.",
  },
  {
    q: "Is an Instant Offer the same as Trade-In?",
    a: "No. An instant offer is a sale to a named partner. A trade-in is linked to buying another vehicle from the same dealer.",
  },
];
