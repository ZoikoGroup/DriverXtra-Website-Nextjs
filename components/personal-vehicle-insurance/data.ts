import type { Faq } from "@/components/ui/FaqSection";

export const uses = [
  {
    id: "social",
    title: "Social and domestic",
    text: "Everyday personal trips",
    note: "Social and domestic cover is usually the most basic use class. Check it doesn't include commuting if you drive to work.",
  },
  {
    id: "commuting",
    title: "Commuting",
    text: "Travel to and from one regular workplace",
    note: "Commuting cover typically adds travel to a single regular workplace. Driving between sites for work usually needs business use.",
  },
  {
    id: "business",
    title: "Business use",
    text: "Driving for work, deliveries, or carrying passengers for pay",
    note: "Business use is usually different from private cover — and carrying goods or passengers for pay often needs a specialist policy.",
  },
] as const;

export const coverItems = [
  {
    title: "Liability to others",
    text: "Damage or injury you cause to other people, vehicles and property. Many markets require a minimum level by law.",
    image: "/images/personal-vehicle-insurance/liability-to-others.png",
    alt: "A dark sports car facing the camera on an open road",
  },
  {
    title: "Own-vehicle risks",
    text: "Fire, theft or damage to your own vehicle, depending on the level of cover chosen.",
    image: "/images/personal-vehicle-insurance/own-vehicle-risks.png",
    alt: "A black car driving along a road",
  },
  {
    title: "Optional extras",
    text: "Breakdown help, a courtesy car or legal expenses — availability and terms vary.",
    image: "/images/personal-vehicle-insurance/optional-extras.png",
    alt: "A driver's hand on the steering wheel at dusk",
  },
];

export const details = [
  {
    title: "Deductible / excess",
    text: "The amount you pay towards a claim before the insurer pays. It can combine a compulsory and a voluntary amount, and may differ for young drivers or certain claim types.",
  },
  {
    title: "Limits",
    text: "The most the policy will pay — overall, per claim or for specific items such as personal belongings, accessories or windscreens.",
  },
  {
    title: "Exclusions",
    text: "Situations the policy won't cover, such as drivers not named on the policy, undeclared modifications or using the vehicle for a purpose it isn't insured for.",
  },
  {
    title: "Your obligations",
    text: "Giving accurate information, telling the insurer about changes, keeping the vehicle roadworthy and reporting incidents promptly. Not doing so can affect a claim.",
  },
  {
    title: "Electric and hybrid vehicles",
    text: "Check how the battery, charging cable and home charger are covered, whether battery damage is treated differently, and if repairs need specialist garages.",
  },
];

export const renewalChecklist = [
  "Compare the total premium with last year, not just the monthly amount",
  "Check the deductible/excess hasn't changed",
  "Confirm named drivers and declared use are still correct",
  "Read any new exclusions or endorsements",
  "Note your current policy end date to avoid a gap in cover",
  "Keep your proof of no-claims (if your market uses one)",
];

export const faqs: Faq[] = [
  {
    q: "Is this a quote?",
    a: "No. This page explains personal motor cover. Only an insurer can give a quote or confirm cover.",
  },
  {
    q: "What counts as business use?",
    a: "Usually any driving for work beyond commuting to one regular workplace — such as visiting clients or other sites. Deliveries or carrying passengers for pay often need specialist cover.",
  },
  {
    q: "What's the minimum cover I need?",
    a: "Most markets require at least liability (third-party) cover. The exact legal minimum depends on where the vehicle is kept and used.",
  },
  {
    q: "Does a higher excess always mean a cheaper policy?",
    a: "Not always. A higher voluntary excess can lower the premium, but the saving varies by insurer — and you'd pay more if you claim.",
  },
  {
    q: "Are electric vehicles insured differently?",
    a: "The cover types are the same, but check how the battery, charging equipment and specialist repairs are handled. Prices can differ.",
  },
];
