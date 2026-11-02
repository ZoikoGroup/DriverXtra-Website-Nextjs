const IMG = "/images/maintenance-networks";

export const HERO_IMAGE = `${IMG}/fleet-hero-technician-workshop.webp`;
export const ICON_CHEVRON_DOWN = `${IMG}/icons/icon-chevron-down.svg`;

export const SERVICES: { icon: string; title: string }[] = [
  { icon: `${IMG}/icons/icon-wrench.svg`, title: "Scheduled servicing" },
  { icon: `${IMG}/icons/icon-disc.svg`, title: "Tyres" },
  { icon: `${IMG}/icons/icon-car.svg`, title: "Bodywork" },
  { icon: `${IMG}/icons/icon-cpu.svg`, title: "Diagnostics" },
];

// Figma only shows "North"; the other regions are placeholders so the select is usable.
export const REGIONS = ["North", "South", "East", "West"];

export const EVIDENCE: { tone: "ok" | "pending" | "none"; label: string; meaning: string }[] = [
  { tone: "ok", label: "Capability evidenced", meaning: "Partner-provided evidence for this service" },
  { tone: "pending", label: "Listing checked", meaning: "Listing reviewed on the date shown" },
  { tone: "none", label: "Capacity unknown", meaning: "A listing doesn't show available slots" },
];

export const STATUSES: { title: string; text: string }[] = [
  { title: "Requested", text: "Sent to a provider" },
  { title: "Estimate received", text: "Estimated cost, not approved" },
  { title: "Approved", text: "Your authorized role approved" },
  { title: "Scheduled", text: "Only when the provider confirms" },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "Does a listing mean a provider can take my vehicles?",
    a: "No. A listing isn't capacity. Providers confirm availability.",
  },
  { q: "Is an estimate approved work?", a: "" },
  { q: "Can bookings be confirmed automatically?", a: "" },
  { q: "How fresh is provider information?", a: "" },
];
