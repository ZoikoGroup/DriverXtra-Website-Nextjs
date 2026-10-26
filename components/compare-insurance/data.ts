import {
  Car,
  Scale,
  Tag,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

/** Insurance tab bar — each tab is its own page; labels match the footer's Insurance column. */
export const insuranceTabs = [
  { id: "compare", label: "Compare Insurance", href: "/compare-insurance" },
  { id: "personal", label: "Personal Vehicle Insurance", href: "/personal-vehicle-insurance" },
  { id: "commercial", label: "Commercial & Fleet Insurance", href: "/commercial-and-fleet-insurance" },
  { id: "coverage-guide", label: "Coverage Guide", href: "/coverage-guide" },
  { id: "partners", label: "Insurance Partners", href: "/insurance-partners" },
  { id: "help", label: "Insurance Help", href: "/insurance-help" },
  { id: "disclosures", label: "Insurance Disclosures", href: "/insurance-disclosures" },
] as const;
export type TabId = (typeof insuranceTabs)[number]["id"];

/** Old /compare-insurance?tab=… links, from when these were in-page tabs. */
export const legacyTabHref = (tab: string | undefined) => insuranceTabs.find((t) => t.id === tab && t.id !== "compare")?.href;

export const howItWorks = [
  { title: "Market", text: "Where the vehicle is kept and used" },
  { title: "Use and vehicle", text: "Private or business, vehicle type" },
  { title: "Coverage needs", text: "The level of cover you want to look at" },
  { title: "Supported options", text: "Real providers only — none are connected in this demo" },
];

export const compareCards = [
  {
    title: "Coverage",
    image: "/images/compare-insurance/coverage.png",
    alt: "A dark sports car parked on an open road",
    meaning: "What the policy pays for — such as damage to others, your own vehicle, theft or fire — and the limits that apply.",
  },
  {
    title: "Deductible / excess",
    image: "/images/compare-insurance/deductible-excess.png",
    alt: "Paperwork and a calculator on a desk",
    meaning: "The amount you pay towards a claim before the insurer pays. A higher amount can lower the premium.",
  },
  {
    title: "Total premium",
    image: "/images/compare-insurance/total-premium.png",
    alt: "A modern grey car parked outdoors",
    meaning: "What the policy costs in total, including taxes and fees, and whether paying monthly adds interest.",
  },
  {
    title: "Exclusions",
    image: "/images/compare-insurance/exclusions.png",
    alt: "A person reading and signing a contract",
    meaning: "Situations the policy won't cover, such as certain uses, drivers or modifications. Always read them.",
  },
  {
    title: "Who provides it",
    image: "/images/compare-insurance/who-provides-it.png",
    alt: "Two people shaking hands",
    meaning: "The insurer that carries the risk, and any broker or intermediary involved in arranging the policy.",
  },
];

export const wizardSteps = [
  { id: 1, title: "Market" },
  { id: 2, title: "Use" },
  { id: 3, title: "Vehicle" },
  { id: 4, title: "Coverage" },
  { id: 5, title: "Options" },
] as const;

export const useOptions = ["Private / personal use", "Business use", "Fleet (several vehicles)"];
export const vehicleOptions = ["Car", "Van or pickup", "Motorcycle", "Electric vehicle"];
export const coverageOptions = ["Third-party / liability only", "Third-party, fire and theft", "Comprehensive", "Not sure yet"];

export const resultShows = [
  "The insurer's legal name and role",
  "Total premium and what it includes, with its source and date",
  "Deductible/excess and material exclusions",
  "Whether it's a quote, an estimate or general information",
];

export const fairness: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Neutral default order",
    text: "Results would be ordered by a published, explainable method — never by who pays most.",
    icon: Scale,
  },
  {
    title: "Sponsored placements",
    text: "Any paid placement would be labelled “Sponsored” and kept apart from the ranked list.",
    icon: Tag,
  },
  {
    title: "No “best” claims",
    text: "We won't call an option best, cheapest or recommended for you.",
    icon: TriangleAlert,
  },
];

export const faqs: Faq[] = [
  {
    q: "Is this an insurance quote?",
    a: "No. This page explains what to compare. Prices and terms come only from a supported provider, and no providers are connected in this demonstration.",
  },
  {
    q: "Does DriverXtra sell insurance?",
    a: "No. DriverXtra isn't an insurer. Where supported, policies would be provided by the regulated insurers or brokers named on each option.",
  },
  {
    q: "Why don't I see prices?",
    a: "Prices depend on details only a provider can assess. We don't show made-up figures, and no providers are connected in this demo.",
  },
  {
    q: "I use my vehicle for business. Can I compare here?",
    a: "Choose “Business use” in the steps above. Business and fleet cover differ from personal policies, so supported options would be shown separately.",
  },
  {
    q: "What's a deductible or excess?",
    a: "The amount you pay towards a claim before the insurer pays. Choosing a higher amount can lower the premium, but you'd pay more if you claim.",
  },
];
