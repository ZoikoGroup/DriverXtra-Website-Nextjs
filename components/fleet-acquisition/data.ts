const IMG = "/images/fleet-acquisition";

export const HERO_IMAGE = `${IMG}/fleet-hero-truck-highway.webp`;

export const ICON_SHIELD_CHECK = `${IMG}/icons/icon-shield-check.svg`;
export const ICON_CHECK = `${IMG}/icons/icon-check.svg`;
export const ICON_FILE = `${IMG}/icons/icon-file.svg`;

export const STEPS: { title: string; text: string }[] = [
  { title: "Draft requirement", text: "Categories, quantity, market" },
  { title: "Submit request", text: "Status: Request Submitted — not a quote" },
  { title: "Supplier responses", text: "Quoted values with validity dates" },
  { title: "Compare and review", text: "Same criteria for every response" },
  { title: "Approve", text: "Authorized role confirms" },
  { title: "External handoff", text: "Contracting happens outside DriverXtra" },
];

export const CRITERIA: { criterion: string; why: string }[] = [
  { criterion: "Supplier", why: "Who is responding and their role" },
  { criterion: "Configuration", why: "Exact specification offered" },
  { criterion: "Quantity", why: "Full or partial fulfilment" },
  { criterion: "Market and currency", why: "Where it applies, and in which currency" },
  { criterion: "Exclusions", why: "What isn't included" },
  { criterion: "Quote validity", why: "When the response expires" },
];

export const CONTROLS: { icon: string; title: string; text: string; titleSize: string }[] = [
  {
    icon: ICON_SHIELD_CHECK,
    title: "Separation of duties",
    text: "Requesters can't approve their own requests.",
    titleSize: "text-[15.3px]",
  },
  {
    icon: ICON_CHECK,
    title: "Confirmation required",
    text: "Every consequential action is reviewed first.",
    titleSize: "text-[15.3px]",
  },
  {
    icon: ICON_FILE,
    title: "Audit trail",
    text: "Each decision records who, when and why.",
    titleSize: "text-[15.2px]",
  },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "Is submitting a request the same as ordering?",
    a: "No. A request asks suppliers to respond. Nothing is ordered.",
  },
  { q: "Are supplier responses binding?", a: "" },
  { q: "Who can approve?", a: "" },
  { q: "Can I compare different currencies?", a: "" },
];
