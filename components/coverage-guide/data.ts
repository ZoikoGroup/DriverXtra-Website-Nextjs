import type { Faq } from "@/components/ui/FaqSection";

export const glossaryTopics = ["Core cover", "Costs & limits", "Policy terms", "Optional extras", "Business"] as const;
export type GlossaryTopic = (typeof glossaryTopics)[number];

export type Audience = "personal" | "business" | "all";

export type Term = {
  term: string;
  topic: GlossaryTopic;
  definition: string;
  /** Who the term mainly matters to — "Who is the cover for?" filters on this. */
  audience: Audience;
};

export const terms: Term[] = [
  {
    term: "Liability (third-party)",
    topic: "Core cover",
    audience: "all",
    definition: "Cover for injury or damage you cause to other people, their vehicles or property. Most markets require a minimum level by law.",
  },
  {
    term: "Own-vehicle damage",
    topic: "Core cover",
    audience: "all",
    definition: "Pays towards repairing or replacing your own vehicle after an accident, minus the excess. Often called collision or comprehensive cover.",
  },
  {
    term: "Fire and theft",
    topic: "Core cover",
    audience: "all",
    definition: "Cover if the vehicle is stolen or damaged by fire. Insurers may require keys to be secured and approved security fitted.",
  },
  {
    term: "Personal injury benefits",
    topic: "Core cover",
    audience: "personal",
    definition: "Payments towards medical costs or lost income after an accident, whoever was at fault. Availability and limits vary by market.",
  },
  {
    term: "Deductible / excess",
    topic: "Costs & limits",
    audience: "all",
    definition: "The amount you pay towards a claim before the insurer pays. It can combine a compulsory and a voluntary amount.",
  },
  {
    term: "Premium",
    topic: "Costs & limits",
    audience: "all",
    definition: "The price of the policy for its term. Check whether it includes taxes and fees, and whether paying monthly adds interest.",
  },
  {
    term: "Limit",
    topic: "Costs & limits",
    audience: "all",
    definition: "The most the policy will pay — overall, per claim or for specific items such as belongings, accessories or windscreens.",
  },
  {
    term: "Exclusion",
    topic: "Policy terms",
    audience: "all",
    definition: "A situation the policy won't cover, such as unlisted drivers, undeclared modifications or using the vehicle for an uninsured purpose.",
  },
  {
    term: "Endorsement",
    topic: "Policy terms",
    audience: "all",
    definition: "A change to the standard policy wording that applies to you — for example an extra excess or a condition about where the vehicle is kept.",
  },
  {
    term: "Declarations / schedule",
    topic: "Policy terms",
    audience: "all",
    definition: "The page showing your details: names, vehicle, use, cover level, excess and dates. Check it carefully — errors can affect claims.",
  },
  {
    term: "Named driver",
    topic: "Policy terms",
    audience: "all",
    definition: "A person listed on the policy as allowed to drive. Anyone not named, or not covered by an any-driver clause, may not be insured.",
  },
  {
    term: "Breakdown assistance",
    topic: "Optional extras",
    audience: "all",
    definition: "Roadside help or recovery if the vehicle breaks down. Levels range from local roadside help to national or international recovery.",
  },
  {
    term: "Courtesy car",
    topic: "Optional extras",
    audience: "personal",
    definition: "A temporary vehicle while yours is repaired by an approved garage. It's often small and may not be provided if the car is written off.",
  },
  {
    term: "Legal expenses",
    topic: "Optional extras",
    audience: "all",
    definition: "Help with legal costs, such as recovering uninsured losses after an accident that wasn't your fault.",
  },
  {
    term: "Fleet policy",
    topic: "Business",
    audience: "business",
    definition: "One policy covering several vehicles under one business, often with any-authorised-driver rules and claims assessed across the fleet.",
  },
  {
    term: "Goods in transit",
    topic: "Business",
    audience: "business",
    definition: "Cover for loss of or damage to goods you carry for your business or customers. Usually separate from motor cover.",
  },
];

export const buildingBlocks: { title: string; topic: GlossaryTopic; image: string; alt: string }[] = [
  { title: "Liability", topic: "Core cover", image: "/images/coverage-guide/liability.png", alt: "A dark sports car facing the camera on an open road" },
  { title: "Costs & limits", topic: "Costs & limits", image: "/images/coverage-guide/costs-and-limits.png", alt: "A calculator and insurance paperwork on a desk" },
  { title: "Policy terms", topic: "Policy terms", image: "/images/coverage-guide/policy-terms.png", alt: "A person signing a document" },
];

export type Treatment = "Included" | "Conditional" | "Excluded";

export const workedExample: { situation: string; treatment: Treatment; why: string }[] = [
  { situation: "You damage another car in a car park", treatment: "Included", why: "Liability to others" },
  { situation: "Your car is stolen from your driveway", treatment: "Conditional", why: "Only if theft cover is included, and keys were secured" },
  { situation: "A friend not named on the policy crashes", treatment: "Conditional", why: "Depends on who's allowed to drive" },
  { situation: "You use the car for paid deliveries", treatment: "Excluded", why: "Business use not declared" },
];

export const policyParts = [
  { name: "Schedule / declarations", text: "check names, vehicle, use, cover level, excess and dates." },
  { name: "Policy wording", text: "what's covered and excluded, and your obligations." },
  { name: "Endorsements", text: "changes to the standard wording that apply to you." },
  { name: "Certificate", text: "legal proof of cover where your market requires one." },
];

export const questionsToAsk = [
  "What exactly is covered, and at what limits?",
  "What's the total excess I'd pay on a claim?",
  "Which exclusions could affect how I use the vehicle?",
  "Who's allowed to drive?",
  "What do I need to tell the insurer if things change?",
  "Is the price the total for the term, including taxes and fees?",
];

export const faqs: Faq[] = [
  {
    q: "Does this guide apply to my policy?",
    a: "It explains general concepts. Your insurer's policy wording is what applies.",
  },
  {
    q: "What's the difference between excess and deductible?",
    a: "Nothing — they're two names for the same thing. “Excess” is common in the UK and Ireland; “deductible” is used in many other markets.",
  },
  {
    q: "Why do definitions vary?",
    a: "Each insurer writes its own policy wording, and laws differ between markets. Always check the definitions in your own policy documents.",
  },
  {
    q: "Can I print the checklist?",
    a: "Yes. Use “Print checklist” under “Questions to ask before deciding” — only the questions are printed.",
  },
];
