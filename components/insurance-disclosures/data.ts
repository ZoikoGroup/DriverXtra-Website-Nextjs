import type { Faq } from "@/components/ui/FaqSection";

export type Audience = "personal" | "commercial";

export type DisclosureTopic = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  audiences: Audience[];
};

export const topics: DisclosureTopic[] = [
  {
    id: "role",
    title: "DriverXtra's role",
    summary: "DriverXtra is not an insurer. Where comparison or referral is supported, it acts as a marketplace and introducer to named third parties.",
    details: [
      "We don't carry insurance risk, set prices, decide eligibility or handle claims.",
      "We don't give personal insurance advice or recommendations.",
      "Each option names the organisation that would provide or arrange cover.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "providers",
    title: "Third-party providers",
    summary: "Insurers and intermediaries named on each option provide cover and set terms. Their documents govern any policy.",
    details: [
      "The insurer carries the risk; a broker or intermediary may arrange the policy for you.",
      "Each provider's legal name, role and regulatory status would be shown before you continue.",
      "Your contract is with the provider, not with DriverXtra.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "compensation",
    title: "Compensation and sponsorship",
    summary: "DriverXtra may be paid by some providers. Sponsored placements are labelled and kept apart from ranked results.",
    details: [
      "Where a referral fee or commission applies, the provider's profile says so before you continue.",
      "Payment never changes the default order of results.",
      "Any sponsored placement is labelled “Sponsored”.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "comparison",
    title: "Comparison methods",
    summary: "How options are ordered, which providers are included, and what's excluded from a comparison.",
    details: [
      "Results would be ordered by a published, explainable method.",
      "A comparison may not include every provider or product in your market.",
      "We won't describe any option as best, cheapest or recommended for you.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "premiums",
    title: "Premiums, taxes and fees",
    summary: "What a quoted price includes, such as insurance premium tax or fees, and how instalments may change the total.",
    details: [
      "Check whether a figure includes taxes, admin fees and optional extras.",
      "Paying monthly can include interest or a credit charge, so the total may be higher.",
      "Prices can change at renewal.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "excess",
    title: "Deductibles / excess",
    summary: "How compulsory and voluntary excess work, and how they affect what you pay on a claim.",
    details: [
      "The total excess is usually the compulsory amount plus any voluntary amount you choose.",
      "Some claims, drivers or vehicles can carry an extra excess.",
      "A higher excess can lower the premium but increases what you pay if you claim.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "limits",
    title: "Coverage limits",
    summary: "The most a policy pays for different losses, and how limits apply.",
    details: [
      "Limits can apply overall, per claim, or to specific items such as belongings or windscreens.",
      "Business use may need higher liability limits.",
      "Check the schedule for the limits that apply to you.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "exclusions",
    title: "Exclusions",
    summary: "What policies commonly don't cover. Material exclusions must be shown before purchase.",
    details: [
      "Common exclusions include unlisted drivers, undeclared use and undeclared modifications.",
      "Material exclusions should be shown clearly before you buy.",
      "Endorsements can add exclusions that apply only to you.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "quote-status",
    title: "Quote status",
    summary: "Whether a figure is general information, an estimate or a provider's quote, and how long it's valid.",
    details: [
      "General information and estimates are not offers.",
      "Only a provider's quote, based on your details, can be accepted — and it may expire.",
      "Every figure would be labelled with its status, source and date.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "privacy",
    title: "Privacy and consent",
    summary: "What would be shared with a provider, why, and how to withdraw consent.",
    details: [
      "You'd see exactly what would be shared, with which named provider, before agreeing.",
      "Insurance pages in this demonstration don't collect personal data.",
      "You can withdraw consent; the provider's own privacy notice then applies to data it already holds.",
    ],
    audiences: ["personal", "commercial"],
  },
  {
    id: "business-use",
    title: "Business use and declarations",
    summary: "Why every business use, driver and operating area must be declared accurately for commercial cover.",
    details: [
      "Undeclared business use can lead to a claim being refused.",
      "Fleet policies may need driver checks, telematics or maintenance records.",
      "Tell the insurer promptly about changes in use, vehicles or drivers.",
    ],
    audiences: ["commercial"],
  },
  {
    id: "goods-in-transit",
    title: "Goods and equipment",
    summary: "Whether goods carried and tools or fitted equipment are covered, and when separate cover is needed.",
    details: [
      "Motor cover often excludes goods carried for business or customers.",
      "Tools and fitted equipment may need to be listed or insured separately.",
      "Check limits and security conditions for vehicles left unattended.",
    ],
    audiences: ["commercial"],
  },
];

export const faqs: Faq[] = [
  {
    q: "Is this page legal advice?",
    a: "No. It explains disclosure topics in general. Your provider's documents and local law apply.",
  },
  {
    q: "Why are review dates pending?",
    a: "Each topic must be reviewed by our Legal team for every market before launch. Until then, topics show “Review pending” rather than a date.",
  },
  {
    q: "What if a required notice is missing?",
    a: "Any step towards a provider is paused until the notice is published. We won't continue without it.",
  },
  {
    q: "Can I print these topics?",
    a: "Yes. Use “Print this page” above the topics — the printout includes the full text of every topic shown for your filters.",
  },
];
