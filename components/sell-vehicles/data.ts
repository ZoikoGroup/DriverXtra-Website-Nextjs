import {
  Building2,
  Car,
  ClipboardList,
  FileText,
  Gauge,
  MapPin,
  Tag,
  Truck,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

/* ---------- Hero vehicle finder ---------- */

export const sellerTypes = ["Private seller", "Dealer", "Fleet / business"];

export const lookupModes = [
  { id: "reg", label: "Registration", field: "Registration plate", placeholder: "e.g. AB12 CDE" },
  { id: "vin", label: "VIN", field: "Vehicle identification number", placeholder: "17 characters, e.g. WVWZZZ1KZAW000000" },
  { id: "model", label: "Make & model", field: "Make and model", placeholder: "e.g. Toyota RAV4" },
] as const;

export type LookupMode = (typeof lookupModes)[number]["id"];

/* ---------- Selling methods ---------- */

export type SellingMethod = {
  title: string;
  text: string;
  icon: LucideIcon;
  /** Small note box; `provider` turns it into a "Provided by" card. */
  note?: string;
  provider?: string;
  cta: string;
  href: string;
  style: "primary" | "dark" | "outline";
  featured?: boolean;
};

export const sellingMethods: SellingMethod[] = [
  {
    title: "Value My Vehicle",
    text: "Check an estimated market range when coverage is available.",
    icon: Tag,
    note: "A valuation estimate is not a purchase offer.",
    cta: "Start Valuation",
    href: "#value-my-vehicle",
    style: "primary",
    featured: true,
  },
  {
    title: "Create a Listing",
    text: "Prepare a vehicle listing and submit it for review.",
    icon: FileText,
    note: "You set the price and talk to buyers yourself.",
    cta: "List Vehicle",
    href: "#create-listing",
    style: "dark",
  },
  {
    title: "Instant Offer",
    text: "A named partner may make a conditional offer after checking your vehicle.",
    icon: Zap,
    provider: "Example Car Buying Partner Ltd",
    cta: "Check Offer Availability",
    href: "/instant-offer",
    style: "outline",
  },
  {
    title: "Trade-In",
    text: "Put the vehicle toward one you buy from a participating dealer.",
    icon: Car,
    provider: "Example Dealer Group",
    cta: "Check Trade-In Availability",
    href: "/trade-in",
    style: "outline",
  },
  {
    title: "Consignment",
    text: "An authorised provider manages the sale for an agreed fee.",
    icon: Building2,
    provider: "Example Specialist Cars Ltd",
    cta: "Review Consignment Providers",
    href: "#",
    style: "outline",
  },
];

/* ---------- How selling works ---------- */

export const sellingSteps = [
  { title: "Choose a method", text: "Check a value, list your vehicle, or — where available — ask a named partner for an offer." },
  { title: "Add the details", text: "Vehicle details, mileage, condition and photos. Missing facts stay blank, never guessed." },
  { title: "Verification & evidence", text: "You may need to verify your identity and show you're authorised to sell. Documents stay private." },
  { title: "Review or handoff", text: "Listings are reviewed before going live. Partner offers come from the partner, under their terms." },
  { title: "Buyer messages", text: "Once live, buyers contact you through protected messaging. You decide what happens next." },
];

/* ---------- Value My Vehicle ---------- */

export const valuationNeeds: { text: string; icon: LucideIcon }[] = [
  { text: "Registration, VIN, or make, model and year", icon: Car },
  { text: "Current mileage", icon: Gauge },
  { text: "Your market (no exact address)", icon: MapPin },
];

/* ---------- Create a Listing ---------- */

export const listingSteps = [
  { title: "Vehicle", text: "Registration, VIN or make and model" },
  { title: "Specifications", text: "Body, fuel, mileage and equipment" },
  { title: "Condition/Evidence", text: "Condition, history and private proof" },
  { title: "Photos", text: "Your own photos, cover first" },
  { title: "Price/Terms", text: "Asking price, location, contact, fees" },
  { title: "Review/Submit", text: "Preview, confirm and submit" },
];

export const listerRoles = [
  { label: "Private owner", text: "You own the vehicle." },
  { label: "Authorised agent", text: "Selling for the owner, with their written permission." },
  { label: "Dealer / business", text: "Listing for a verified business." },
  { label: "Fleet operator", text: "Disposing of organisation vehicles." },
];

export const listingVehicleTypes = [
  { label: "Car" },
  { label: "Van / light commercial" },
  { label: "Motorcycle" },
  { label: "Project / salvage vehicle", unavailable: true },
];

/* ---------- Seller readiness ---------- */

export const readinessChecks: { title: string; icon: LucideIcon; what: string; never: string }[] = [
  {
    title: "Identity",
    icon: User,
    what: "Verify your identity when required to continue.",
    never: "Confirms who you are — not that you own the vehicle.",
  },
  {
    title: "Authority to sell",
    icon: ClipboardList,
    what: "Documents showing you can sell this vehicle.",
    never: "Visible to anyone else. Documents stay private.",
  },
  {
    title: "Vehicle details",
    icon: Car,
    what: "Year, make, model, mileage and condition.",
    never: "Guessed — missing details stay blank.",
  },
  {
    title: "Fees",
    icon: Tag,
    what: "Any fee and its version, before you submit.",
    never: "Assumed to be free when we can't show a fee.",
  },
];

/* ---------- Selling as a business ---------- */

export const businessPaths: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Dealers & retailers",
    text: "Business verification, staff permissions you control, and inventory feeds where available.",
    icon: Building2,
  },
  {
    title: "Fleet disposal",
    text: "Multi-vehicle disposal with delegated approval. We won't quote a bulk price without the details.",
    icon: Truck,
  },
];

/* ---------- FAQ ---------- */

export const faqs: Faq[] = [
  {
    q: "How do I sell my vehicle on DriverXtra?",
    a: "You can start by checking a valuation or preparing a vehicle listing. The available options and requirements depend on your market, vehicle and seller role.",
  },
  {
    q: "Does DriverXtra buy my vehicle?",
    a: "No. DriverXtra is a marketplace operated by Zoiko Mobility Inc. Buyers, partners and dealers buy vehicles — we connect you with them.",
  },
  {
    q: "Can I sell without getting a valuation?",
    a: "Yes. A valuation is optional. You can go straight to creating a listing or, where available, requesting an instant offer or trade-in.",
  },
  {
    q: "What documents might I need?",
    a: "Usually photo ID, the V5C or title, service history and, if the vehicle is financed, a settlement letter. Requirements depend on your market and role.",
  },
  {
    q: "Does a VIN lookup prove ownership?",
    a: "No. Identifying a vehicle only confirms its details. Ownership and your authority to sell are checked separately.",
  },
  {
    q: "Is my listing published as soon as I submit it?",
    a: "No. Submitted listings are reviewed for accuracy, prohibited claims and duplicates before they go live.",
  },
  {
    q: "Is selling free?",
    a: "Any fee and its version are shown before you submit. If we can't show you a fee, we don't charge it.",
  },
  {
    q: "Can I receive an instant offer?",
    a: "Where a named partner serves your area, you can request a conditional offer. Check availability on the Instant Offer page.",
  },
  {
    q: "Can I trade in my vehicle?",
    a: "Where participating dealers serve your area, you can request trade-in terms toward a vehicle you buy from them.",
  },
  {
    q: "What is vehicle consignment?",
    a: "An authorised provider manages the sale for you, under a written agreement, in exchange for an agreed commission.",
  },
  {
    q: "Can a dealer or fleet sell vehicles?",
    a: "Yes, through a separate verified business path with staff permissions, inventory feeds and delegated approval where available.",
  },
  {
    q: "Can I pause or edit a listing?",
    a: "Yes. You can pause, edit or remove your listing from Manage My Listings. Material changes may be reviewed again.",
  },
  {
    q: "How do I stay safe when speaking to buyers?",
    a: "Keep conversations in protected messaging, never accept overpayments, and don't move payment off-platform. Report anything suspicious.",
  },
  {
    q: "What happens if a method is not available?",
    a: "Methods not offered in your market say so. You can still use the others — the comparison table shows how each one works.",
  },
];
