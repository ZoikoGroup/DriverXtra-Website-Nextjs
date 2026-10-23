import {
  BadgePercent,
  Ban,
  Bookmark,
  Briefcase,
  Building2,
  Car,
  CarFront,
  ClipboardList,
  Coins,
  FileText,
  Flame,
  Handshake,
  Info,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
  ShieldPlus,
  Tag,
  TriangleAlert,
  Truck,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

/** Tabs under the hero — labels match the footer's Insurance column. */
export const insuranceTabs = [
  { id: "compare", label: "Compare Insurance" },
  { id: "personal", label: "Personal Vehicle Insurance" },
  { id: "commercial", label: "Commercial & Fleet Insurance" },
  { id: "coverage-guide", label: "Coverage Guide" },
  { id: "partners", label: "Insurance Partners" },
  { id: "help", label: "Insurance Help" },
  { id: "disclosures", label: "Insurance Disclosures" },
] as const;
export type TabId = (typeof insuranceTabs)[number]["id"];
export const isTabId = (v: string | undefined): v is TabId => insuranceTabs.some((t) => t.id === v);

export type InfoPanel = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; text: string; icon: LucideIcon }[];
  checklistTitle: string;
  checklist: string[];
};

export const panels: Record<Exclude<TabId, "compare">, InfoPanel> = {
  personal: {
    eyebrow: "Personal Vehicle Insurance",
    title: "Cover for the vehicle you drive every day",
    intro:
      "Personal policies cover private use such as commuting and leisure. The cover levels available, and what each includes, depend on your market and the insurer.",
    cards: [
      { title: "Third-party / liability", text: "Covers injury or damage you cause to other people and their property. Usually the legal minimum.", icon: ShieldCheck },
      { title: "Third-party, fire and theft", text: "Adds cover if your vehicle is stolen or damaged by fire, where offered.", icon: Flame },
      { title: "Comprehensive", text: "Can also cover damage to your own vehicle, subject to the excess and exclusions.", icon: Umbrella },
    ],
    checklistTitle: "What can affect the price",
    checklist: [
      "Where the vehicle is kept and how far it's driven",
      "The vehicle's value, power and security",
      "Who drives it and their driving history",
      "The excess you choose and any optional extras",
    ],
  },
  commercial: {
    eyebrow: "Commercial & Fleet Insurance",
    title: "Cover for vehicles used for work",
    intro:
      "Using a vehicle for business usually needs business or commercial cover. Fleet policies can cover several vehicles under one agreement, often with flexible driver rules.",
    cards: [
      { title: "Business use", text: "Covers driving for work beyond commuting — such as visiting clients or other sites.", icon: Briefcase },
      { title: "Commercial vehicles", text: "Vans, pickups and other work vehicles, including options for tools or goods carried.", icon: Truck },
      { title: "Fleet policies", text: "Several vehicles on one policy, with named-driver or any-driver options where offered.", icon: Car },
    ],
    checklistTitle: "Have this ready before comparing",
    checklist: [
      "How each vehicle is used and by whom",
      "Number and type of vehicles",
      "Where vehicles are kept overnight",
      "Any previous claims on the business's vehicles",
    ],
  },
  "coverage-guide": {
    eyebrow: "Coverage Guide",
    title: "Key insurance terms, explained",
    intro: "Policy wording varies by insurer and market. These general definitions help you read a policy — the insurer's documents always take priority.",
    cards: [
      { title: "Liability / third-party", text: "Cover for injury or damage you cause to others. Required by law in most markets.", icon: ShieldCheck },
      { title: "Collision / own damage", text: "Pays towards repairing your vehicle after an accident, minus the excess.", icon: CarFront },
      { title: "Excess / deductible", text: "The part of a claim you pay yourself. A voluntary excess can lower the premium.", icon: Coins },
      { title: "Exclusions", text: "What the policy won't cover — such as unlisted drivers, certain uses or modifications.", icon: Ban },
      { title: "Optional protection", text: "Extras such as breakdown, legal cover or a courtesy car, where available.", icon: ShieldPlus },
      { title: "No-claims discount", text: "A reduction for claim-free years, where offered. Rules and protection options vary.", icon: BadgePercent },
    ],
    checklistTitle: "Before you buy, check",
    checklist: [
      "The cover level and its limits",
      "The total excess — compulsory plus voluntary",
      "Material exclusions and who can drive",
      "Whether paying monthly adds interest",
    ],
  },
  partners: {
    eyebrow: "Insurance Partners",
    title: "Who could provide a policy",
    intro:
      "Where comparison is supported, options would come from regulated insurers and brokers. No insurance providers are connected in this demonstration.",
    cards: [
      { title: "Insurers", text: "Carry the risk, set the price and terms, and pay valid claims.", icon: Building2 },
      { title: "Brokers", text: "Arrange policies from one or more insurers and may charge their own fees.", icon: Handshake },
      { title: "DriverXtra", text: "Not an insurer. We'd explain options and refer you to the named provider.", icon: Info },
    ],
    checklistTitle: "Every partner profile would show",
    checklist: [
      "Legal name and regulatory status in your market",
      "Its role — insurer, broker or intermediary",
      "Whether DriverXtra receives a fee",
      "The products it offers where you live",
    ],
  },
  help: {
    eyebrow: "Insurance Help",
    title: "Help with your vehicle insurance",
    intro: "Your insurer handles policy changes, claims and complaints. Here's who to contact, and when.",
    cards: [
      { title: "Changing your policy", text: "Contact your insurer about a new vehicle, address or driver. Fees may apply.", icon: FileText },
      { title: "Making a claim", text: "Report an incident to your insurer as soon as you can, with photos and details.", icon: ClipboardList },
      { title: "Complaints", text: "Start with the insurer's complaints process. Your market may have an independent ombudsman.", icon: MessageCircle },
    ],
    checklistTitle: "Keep these to hand",
    checklist: [
      "Your policy number and documents",
      "The insurer's claims and complaints contacts",
      "Photos and details of any incident",
      "Your renewal date — prices can change at renewal",
    ],
  },
  disclosures: {
    eyebrow: "Insurance Disclosures",
    title: "Important information about this service",
    intro:
      "DriverXtra is not an insurer and doesn't give insurance advice. Policies would be provided by the regulated third parties named on each option, subject to their terms.",
    cards: [
      { title: "Referral fees", text: "We may receive a fee if you continue to some providers. Each profile says whether this applies.", icon: Bookmark },
      { title: "Your information", text: "This demo doesn't collect personal data. Any future sharing would need your approval first.", icon: Lock },
      { title: "Ordering", text: "Results would use a published, neutral method — paid placements labelled “Sponsored”.", icon: Scale },
    ],
    checklistTitle: "Always review",
    checklist: [
      "The insurer's policy wording and summary",
      "Its privacy notice",
      "Cancellation rights and fees",
      "Regulatory status — to be confirmed by Legal per market before launch",
    ],
  },
};

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
