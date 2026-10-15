import { ClipboardCheck, Flag, Lock, MessageSquare, Tag, UserCheck, type LucideIcon } from "lucide-react";

/* ---------- Form options shared by the selling flows ---------- */

export const vehicleTypes = ["Car", "Van / light commercial", "Motorcycle"];

export const conditionLevels = [
  { id: "excellent", label: "Excellent", text: "No visible damage, everything works" },
  { id: "good", label: "Good", text: "Minor marks from normal use" },
  { id: "fair", label: "Fair", text: "Visible wear or small faults" },
  { id: "needs-work", label: "Needs work", text: "Damage or faults that need repair" },
];

export const conditionIssues = [
  "Accident damage (repaired or not)",
  "Dashboard warning lights on",
  "Missing or incomplete service history",
  "Outstanding finance on the vehicle",
];

export const keyOptions = ["1", "2", "3 or more"];

export const years = Array.from({ length: 16 }, (_, i) => String(2025 - i));

/* ---------- Methods comparison ---------- */

export const methodColumns = ["Method", "Who controls the sale", "Third parties", "Offer", "Fees", "Time"];

export const methods = [
  ["Value My Vehicle", "You — information only", "None", "Market range with method and date; not an offer", "None (example)", "Varies by method and market"],
  ["Create a Listing", "You set price and choose buyer", "Buyers contact you", "No offer — buyers may make one", "Shown before you submit", "Varies by method and market"],
  ["Instant Offer", "Partner decides", "Named partner", "Conditional, after inspection", "Set by partner", "Varies by method and market"],
  ["Trade-In", "Dealer decides", "Named dealer", "Linked to buying from the dealer", "Set by dealer", "Varies by method and market"],
  ["Consignment", "Shared, by written agreement", "Authorised provider", "Agreed in contract", "Commission per contract", "Varies by method and market"],
];

/* ---------- Selling safely ---------- */

export const safetyTips: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Identity isn't ownership",
    text: "Verifying who you are is separate from showing you can sell this vehicle. Each has its own status.",
    icon: UserCheck,
  },
  {
    title: "Listings are reviewed",
    text: "Submitted listings are checked for accuracy, prohibited claims and duplicates before they go live.",
    icon: ClipboardCheck,
  },
  {
    title: "Fees before commitment",
    text: "You'll see any fee and its version before you submit or pay. If we can't show it, we don't charge it.",
    icon: Tag,
  },
  {
    title: "Protected messaging",
    text: "Buyers contact you through DriverXtra. Your phone and email aren't shown on the listing.",
    icon: MessageSquare,
  },
  {
    title: "Private documents",
    text: "ID and ownership documents are stored privately and never appear on your listing.",
    icon: Lock,
  },
  {
    title: "Something suspicious?",
    text: "Overpayment offers and off-platform payment requests are common scams.",
    icon: Flag,
  },
];
