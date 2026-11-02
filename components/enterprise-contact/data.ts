const IMG = "/images/enterprise-contact";

export const HERO_IMAGE = `${IMG}/fleet-hero-enterprise-meeting.webp`;
export const ASIDE_IMAGE = `${IMG}/enquiry-fleet-vans-depot.webp`;
export const ICON_CHEVRON_DOWN = `${IMG}/icons/icon-chevron-down.svg`;

export const INTERESTS = ["Fleet Solutions", "Acquisition", "Disposition", "Maintenance", "Parts", "Analytics"];

// Figma only shows the "Choose" placeholder; these markets are placeholders so the select is usable.
export const MARKETS = ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Other"];

export const ROUTING: { title: string; titleSize: string; text: string }[] = [
  {
    title: "How routing works",
    titleSize: "text-[15.9px]",
    text: "Your area of interest decides which team receives your enquiry. Routing is internal and doesn't create an account, quote or contract.",
  },
  {
    title: "Active issue or emergency?",
    titleSize: "text-[15.8px]",
    text: "Use your account support channel. For roadside emergencies, contact local emergency services.",
  },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "Will someone call me back?",
    a: "We aim to respond, but a receipt doesn't promise a callback or timing.",
  },
  { q: "Is this a quote?", a: "" },
  { q: "What shouldn't I include?", a: "" },
  { q: "Do I need an account?", a: "" },
];
