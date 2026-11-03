import type { Faq } from "@/components/ui/FaqSection";
import type { RoleCard } from "@/components/partner-program/RoleCards";
import type { ServiceRule } from "@/components/partner-program/EligibilityChecker";
import type { PartnerIcon } from "@/components/partner-program/icons";

export const roles: RoleCard[] = [
  {
    id: "carrier",
    title: "Carrier",
    text: "You operate the vehicles and drivers that move cars.",
    image: "/images/transport-partner-program/carrier.webp",
    alt: "A covered truck driving along a mountain highway",
    icon: "truck",
  },
  {
    id: "broker",
    title: "Broker",
    text: "You arrange transport with carriers. Brokerage and carrier responsibilities are different.",
    image: "/images/transport-partner-program/broker.webp",
    alt: "A team meeting in an open-plan office",
    icon: "scale",
  },
  {
    id: "both",
    title: "Carrier and broker",
    text: "You do both — each role is reviewed on its own evidence.",
    image: "/images/transport-partner-program/carrier-and-broker.webp",
    alt: "A white Scania truck on an open road",
    icon: "layers",
  },
];

export const approvalStages = ["Application received", "Authority verified", "Capacity approved", "Agreement signed", "Dispatch-eligible", "Assigned jobs"];

export const services: ServiceRule[] = [
  {
    id: "open",
    label: "Open transport",
    gates: ["Details of each open trailer and how vehicles are secured", "Cargo insurance limits that match the vehicle values you'll carry"],
  },
  {
    id: "enclosed",
    label: "Enclosed transport",
    gates: ["Details of each enclosed trailer and its loading equipment", "Cargo insurance suitable for higher-value vehicles"],
  },
  {
    id: "single",
    label: "Single-vehicle delivery",
    gates: ["Details of single-vehicle units, such as car transporters or recovery trucks", "How you handle keys and documents at handover"],
  },
  {
    id: "specialty",
    label: "Specialty or non-running vehicles",
    gates: ["Winching or loading equipment for non-running vehicles", "Driver training for specialty or high-value loads"],
  },
  {
    id: "cross-border",
    label: "Cross-border transport",
    gates: ["Authority for each country you'd operate in or through", "Customs and documentation process for each border"],
    note: "Cross-border transport needs a separate review for each market, so approval in one country doesn't cover another.",
  },
];

export const roleGates: Record<string, string[]> = {
  carrier: ["Operating authority to carry vehicles in your market", "Driver qualifications and the checks you carry out", "Cargo and liability insurance, with validity dates"],
  broker: ["Brokerage authorization for your market", "How you select and check the carriers you use", "Liability or contingent cover, where your market requires it"],
  both: [
    "Operating authority to carry vehicles in your market",
    "Separate brokerage authorization",
    "Driver qualifications and the checks you carry out",
    "Cargo and liability insurance, with validity dates",
  ],
};

export const commonGates = ["Your custody process from pickup to delivery"];

export const requirements: { icon: PartnerIcon; title: string; text: string }[] = [
  { icon: "file", title: "Operating authority", text: "Evidence of your authority to carry or broker, for each market." },
  { icon: "truck", title: "Vehicles and equipment", text: "Open or enclosed trailers, single-vehicle units and capacity." },
  { icon: "user", title: "Drivers", text: "Driver qualifications and the checks you carry out." },
  { icon: "shield", title: "Insurance", text: "Cargo and liability cover, with validity dates." },
  { icon: "clipboard", title: "Custody process", text: "How you record pickup, transit and delivery." },
];

export const carrierDuties = [
  "Operates the vehicles and employs or contracts drivers",
  "Holds operating authority and cargo insurance",
  "Records custody from pickup to delivery",
];

export const brokerDuties = ["Arranges transport with qualified carriers", "Shows brokerage authorization for each market", "Doesn't become a carrier by applying"];

export type CapacityStatus = "verified" | "pending" | "expiry";

export const capacityStyles: Record<CapacityStatus, { label: string; dot: string; text: string }> = {
  verified: { label: "Verified", dot: "bg-emerald-500", text: "text-emerald-700" },
  pending: { label: "Pending", dot: "bg-amber-500", text: "text-amber-700" },
  expiry: { label: "Expiry tracked", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
};

/** `declared: null` shows the visitor's selected market. */
export const capacity: { item: string; declared: string | null; status: CapacityStatus }[] = [
  { item: "Open trailers", declared: "4", status: "verified" },
  { item: "Enclosed trailers", declared: "1", status: "pending" },
  { item: "Drivers", declared: "6", status: "verified" },
  { item: "Markets", declared: null, status: "verified" },
  { item: "Cargo insurance", declared: "Until 30 Jun 2027", status: "expiry" },
];

export const custodySteps = [
  { title: "Pickup", text: "Condition photos, odometer, keys and documents handed over." },
  { title: "Loading", text: "Secured to the equipment's requirements." },
  { title: "In transit", text: "Milestones reported — not necessarily live location." },
  { title: "Delivery", text: "Condition record and receiver acknowledgement." },
  { title: "Exceptions", text: "Damage or delay recorded promptly with evidence." },
];

export const faqs: Faq[] = [
  {
    q: "Who can apply to become a transport partner?",
    a: "A legally authorized organization may start an application for the transport role and markets that apply to it. Eligibility depends on current market requirements, service scope and independent review.",
  },
  { q: "Does applying mean my business is approved?", a: "No. Applying starts a review. You're only dispatch-eligible once authority, capacity and an agreement are all in place." },
  {
    q: "What is the difference between a carrier and a broker?",
    a: "A carrier operates the vehicles and drivers that move cars. A broker arranges transport with carriers. Each role needs its own authorization.",
  },
  { q: "Which countries or regions are supported?", a: "Supported markets are added one at a time. Each market has its own requirements, and you're reviewed separately for each." },
  {
    q: "Can I join as an individual driver?",
    a: "Only where you hold the operating authority and insurance your market requires. Drivers working for a carrier are reviewed as part of that carrier.",
  },
  { q: "What documents might be required?", a: "Typically operating authority, insurance certificates, vehicle and trailer details, and driver qualifications — depending on your role and market." },
  { q: "Will I receive transport jobs immediately?", a: "No. Jobs are only assigned once you're dispatch-eligible, and being eligible doesn't guarantee any volume of work." },
  { q: "Can I offer enclosed or specialty transport?", a: "Yes, where your equipment, insurance and driver training are approved for it." },
  { q: "Do you guarantee rates or earnings?", a: "No. Rates, fees and payout timing are set out in your agreement. There are no guaranteed earnings." },
  { q: "Does business verification mean my vehicles are insured?", a: "No. Verification checks your evidence. You remain responsible for holding valid cargo and liability insurance." },
  { q: "Can I subcontract work?", a: "Only where your agreement allows it and the subcontractor is also approved. Brokering a job doesn't make you its carrier." },
  { q: "Can my application be approved in one market and not another?", a: "Yes. Each market is reviewed on its own requirements and evidence." },
  { q: "How do I correct a rejected document?", a: "We'd tell you why it was rejected. You can upload a corrected or updated document for review." },
  { q: "What happens when a permit expires?", a: "Dispatch eligibility for the affected market or service is paused until a valid permit is provided." },
  {
    q: "What happens if a vehicle is damaged during transport?",
    a: "Record the damage promptly with evidence. Claims follow a documented process, and your agreement sets out each party's responsibilities.",
  },
  { q: "Can my team manage multiple depots?", a: "Yes. Each depot or operating site can be added to your organization and reviewed where required." },
  { q: "How are my business and driver records protected?", a: "Documents are reviewed by authorized roles only and are never shown publicly." },
  { q: "Where do I get onboarding support?", a: "Partner onboarding contacts will be published for each supported market. Until then, use the general partner onboarding route." },
];
