import type { Faq } from "@/components/ui/FaqSection";
import type { PartnerIcon } from "@/components/partner-program/icons";

export type TransactionType = "order" | "booking";

export const transactionTypes: Record<
  TransactionType,
  { label: string; intro: string; steps: { title: string; text: string }[]; prerequisites: string[]; exceptions: string[] }
> = {
  order: {
    label: "Orders",
    intro: "An order covers one or more lines from an authorized seller. Each line is accepted, fulfilled or rejected on its own evidence.",
    steps: [
      { title: "Quote", text: "Price, tax basis, currency and expiry" },
      { title: "Request", text: "Your request is received — not yet an order" },
      { title: "Seller acceptance", text: "Order and each line accepted" },
      { title: "Payment", text: "Confirmed by the payment source" },
      { title: "Fulfilled", text: "Shipment or delivery evidence recorded" },
    ],
    prerequisites: [
      "Seller or buyer role in an approved organization",
      "Order scopes for the target market",
      "Catalog source mapping (see Inventory & Catalog)",
      "Approved non-production environment for testing",
    ],
    exceptions: ["Partially accepted — some lines rejected", "Payment uncertain — check with the processor", "Quote expired — re-quote before continuing"],
  },
  booking: {
    label: "Bookings",
    intro: "A booking asks a provider for an appointment or capacity slot at one of its sites. Only the provider can confirm it.",
    steps: [
      { title: "Availability", text: "Read-only slots from the provider's source" },
      { title: "Request", text: "Your request is received — not yet a booking" },
      { title: "Slot hold", text: "Held for a short time, only if supported" },
      { title: "Provider confirmation", text: "The provider confirms the appointment" },
      { title: "Completed", text: "Service evidence recorded by the provider" },
    ],
    prerequisites: [
      "Service provider or fleet role in an approved organization",
      "Booking scopes for the provider's sites",
      "Site and service mapping from the provider",
      "Approved non-production environment for testing",
    ],
    exceptions: ["Declined — the provider can't take the slot", "Hold expired — check availability again", "Rescheduled — the provider proposed a new time"],
  },
};

export const businessObjects: { label: string; icon: PartnerIcon; belongsTo: string; authority: string }[] = [
  { label: "Order", icon: "cart", belongsTo: "Buyer and seller", authority: "Seller's commerce system" },
  { label: "Order lines", icon: "clipboard", belongsTo: "An order", authority: "Seller, line by line" },
  { label: "Payment", icon: "card", belongsTo: "An order or booking", authority: "Authorized payment processor" },
  { label: "Fulfillment", icon: "truck", belongsTo: "Order lines", authority: "Transport or delivery evidence owner" },
  { label: "Booking", icon: "calendar", belongsTo: "A provider site", authority: "Provider booking system" },
  { label: "Slot hold", icon: "clock", belongsTo: "A booking request", authority: "Provider capacity — only if supported" },
];

export const roles = [
  { title: "Seller", text: "Accepts and fulfills orders.", image: "role-seller.webp", alt: "A mechanic pouring oil into an engine" },
  { title: "Buyer", text: "Places orders from an approved system.", image: "role-buyer.webp", alt: "A white truck on an open road" },
  { title: "Service provider", text: "Confirms appointments at its sites.", image: "role-service-provider.webp", alt: "A car in a dim workshop with a technician beside it" },
  { title: "Fleet operator", text: "Books services for its vehicles.", image: "role-fleet-operator.webp", alt: "A covered truck driving along a mountain road" },
];

export type Capability = "Pilot" | "Not confirmed" | "Not supported";

export const capabilityStyles: Record<Capability, { dot: string; text: string }> = {
  Pilot: { dot: "bg-amber-500", text: "text-amber-700" },
  "Not confirmed": { dot: "border border-slate-400 bg-white", text: "text-slate-600" },
  "Not supported": { dot: "border border-slate-400 bg-white", text: "text-slate-600" },
};

export const markets: { market: string; orders: Capability; bookings: Capability }[] = [
  { market: "United Kingdom", orders: "Pilot", bookings: "Pilot" },
  { market: "United States", orders: "Not confirmed", bookings: "Not confirmed" },
  { market: "Germany", orders: "Not confirmed", bookings: "Not supported" },
  { market: "Other markets", orders: "Not confirmed", bookings: "Not confirmed" },
];

export const decisions = [
  {
    title: "Stock and slots",
    text: "Availability is read-only evidence from its source. It isn't a reservation, and no hold duration is promised.",
    icon: "clipboard",
    image: "stock-and-slots.png",
    alt: "Water droplets on glass in teal and orange light",
  },
  {
    title: "Payment",
    text: "Authorization, capture, settlement and refunds are confirmed by the authorized payment source — never by a generic paid badge.",
    icon: "card",
    image: "payment.png",
    alt: "A phone and paperwork on a desk",
  },
  {
    title: "Booking confirmation",
    text: "Only the provider confirms an appointment. An unconfirmed request is not a booking.",
    icon: "calendar",
    image: "booking-confirmation.png",
    alt: "Colleagues giving a high five in an office",
  },
] as const;

export const faqs: Faq[] = [
  {
    q: "What is the difference between an order and a booking?",
    a: "An order concerns purchasing goods or an approved procurement service with line and fulfillment states; a booking is a request for a provider-controlled appointment or capacity slot. Their acceptance, change and completion rules differ.",
  },
  { q: "Does submitting a request confirm an order?", a: "No. A received request isn't an order until the seller accepts it, line by line." },
  { q: "Does a booking request reserve an appointment?", a: "No. Only the provider confirms an appointment. A slot hold, where supported, is temporary and not a confirmation." },
  { q: "Can anyone integrate with orders and bookings?", a: "No. Access depends on partner eligibility, market and the capabilities approved for your organization." },
  { q: "Are live integrations available today?", a: "Orders and bookings are in pilot in some markets only. Check the capability table above for your market." },
  { q: "How does inventory availability affect orders?", a: "Availability is read-only evidence. It doesn't reserve stock, so a line can still be rejected when the seller reviews it." },
  { q: "How is a booking time represented?", a: "As a time with the provider site's time zone. Always show it in the site's local time, not the user's device time." },
  { q: "How do I prevent duplicate orders?", a: "Send an idempotency key with every request, and look up the outcome by key before you retry." },
  { q: "Are payment and order states the same?", a: "No. Payment states come from the authorized payment source and move independently of order and line states." },
  { q: "Can I use webhooks to track transactions?", a: "Yes, where your organization is approved for those event families. Reconcile with read endpoints as well." },
  { q: "What happens if an event arrives out of order?", a: "Use the event time and the resource's current state from a read endpoint. Never assume exactly-once or ordered delivery." },
  { q: "Can part of an order be accepted?", a: "Yes. Accepted lines keep their outcome and rejected lines are listed explicitly." },
  { q: "Can appointments be rescheduled?", a: "Only where the provider supports it. A reschedule is a new proposal the provider has to confirm." },
  { q: "What happens when I cancel?", a: "Cancellation approval and any refund are separate steps that progress independently." },
  { q: "How are errors and timeouts handled?", a: "A timeout means the outcome is unknown. Look up the request by its idempotency key before sending it again." },
  { q: "What data appears in technical logs?", a: "Request IDs, timings and status codes. Never log secrets, payment details or more personal data than needed." },
  { q: "Where should I check service outages?", a: "Platform Status shows current and historical component status." },
  { q: "Where can I find supported API operations and security policies?", a: "API Documentation lists supported operations; Security & Integration Guidance covers keys, secrets and data handling." },
];
