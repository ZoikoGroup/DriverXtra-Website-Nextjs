const IMG = "/images/fleet-disposition";

export const HERO_IMAGE = `${IMG}/fleet-hero-vehicles-storage.webp`;
export const CLEARANCE_IMAGE = `${IMG}/disposition-documents-review.webp`;

export const ICON_CHECK = `${IMG}/icons/icon-check.svg`;

export const METHODS: { icon: string; title: string; text: string }[] = [
  {
    icon: `${IMG}/icons/icon-tag.svg`,
    title: "Remarketing partner",
    text: "Sold through an approved remarketing channel, where available.",
  },
  {
    icon: `${IMG}/icons/icon-scale.svg`,
    title: "Auction",
    text: "Listed with an auction provider under their terms.",
  },
  {
    icon: `${IMG}/icons/icon-truck.svg`,
    title: "Trade-in",
    text: "Part of a replacement acquisition.",
  },
  {
    icon: `${IMG}/icons/icon-building.svg`,
    title: "Internal transfer",
    text: "Moved to another entity or site.",
  },
];

export const READINESS = [
  "Title or registration document available",
  "Any lien or finance cleared",
  "Keys, documents and accessories collected",
  "Telematics and personal data removed",
  "Condition evidence recorded",
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "What happens if a lien isn't cleared?",
    a: "The case shows Blocked and the vehicle can't be released.",
  },
  { q: "Is a valuation a guaranteed price?", a: "" },
  { q: "Who can release a vehicle?", a: "" },
  { q: "Can I dispose of several vehicles at once?", a: "" },
];
