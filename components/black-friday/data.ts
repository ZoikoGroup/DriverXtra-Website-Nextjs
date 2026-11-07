export const IMG = "/images/black-friday";

/** Proposed Black Friday discount — not yet approved for launch. */
export const OFFER_PERCENT = 35;
export const OFFER_MONTHS = 3;

export type Plan = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  price: number;
  dataGb: number;
  hotspotGb: number;
  features: { label: string; note?: string }[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "starter-5",
    name: "DriverX Starter 5",
    short: "Starter 5",
    tagline: "For lighter workweeks",
    price: 16,
    dataGb: 5,
    hotspotGb: 1,
    features: [{ label: "Unlimited U.S. talk & text" }, { label: "Calls & texts to 100+ countries" }],
  },
  {
    id: "cruise-15",
    name: "DriverX Cruise 15",
    short: "Cruise 15",
    tagline: "For regular gig drivers",
    price: 38,
    dataGb: 15,
    hotspotGb: 5,
    features: [
      { label: "Unlimited talk & text", note: "U.S., Canada & Mexico" },
      { label: "Calls & texts to 100+ countries" },
    ],
  },
  {
    id: "power-25",
    name: "DriverX Power 25",
    short: "Power 25",
    tagline: "For multi-app workdays",
    price: 57,
    dataGb: 25,
    hotspotGb: 15,
    featured: true,
    features: [
      { label: "Unlimited talk & text", note: "U.S., Canada & Mexico" },
      { label: "International calls, texts & roaming" },
    ],
  },
  {
    id: "unlimited",
    name: "DriverX Unlimited",
    short: "Unlimited",
    tagline: "For full-time drivers",
    price: 70,
    dataGb: 35,
    hotspotGb: 20,
    features: [
      { label: "Unlimited talk & text", note: "U.S., Canada & Mexico" },
      { label: "Calls & texts to 220+ countries" },
    ],
  },
];

export const PLAN_CATEGORIES = ["Prepaid", "Postpaid", "Data-Only", "Business & Fleet"] as const;
export type PlanCategory = (typeof PLAN_CATEGORIES)[number];

export type ConditionStatus = "Proposed" | "Pending" | "Not offered" | "Listed";

export const CONDITIONS: { title: string; detail: string; status: ConditionStatus }[] = [
  { title: "Offer period", detail: "First 3 months of eligible driver-plan charges", status: "Proposed" },
  { title: "Price after month 3", detail: "Regular monthly plan price applies", status: "Pending" },
  { title: "Who qualifies", detail: "Eligible new lines and plans", status: "Pending" },
  { title: "Taxes and mandatory fees", detail: "Shown at checkout", status: "Pending" },
  { title: "Activation fee", detail: "Waiver requires separate approval", status: "Not offered" },
  {
    title: "Campaign dates",
    detail: "Black Friday 27 Nov and Cyber Monday 30 Nov 2026. Exact offer window",
    status: "Pending",
  },
  {
    title: "Monthly plan prices",
    detail: PLANS.map((p) => `${p.short} $${p.price}`).join(", "),
    status: "Listed",
  },
];

export const FEATURES = [
  {
    title: "Mobile hotspot",
    body: "Share your connection with a tablet or laptop for paperwork between jobs.",
    note: "1 GB on Starter 5, up to 20 GB on Unlimited",
    image: `${IMG}/feature-hotspot-laptop.webp`,
    alt: "Laptop open on a desk beside a coffee cup",
  },
  {
    title: "Talk and text",
    body: "Unlimited U.S. talk and text on every plan, with Canada and Mexico included from Cruise 15.",
    note: "Included on all four plans",
    image: `${IMG}/feature-talk-text-phone.webp`,
    alt: "Smartphone showing its home screen against a blurred lakeside",
  },
  {
    title: "International calling",
    body: "Calls and texts to 100+ countries, or 220+ on Unlimited. Power 25 adds international roaming.",
    image: `${IMG}/feature-international-flight.webp`,
    alt: "Aircraft wing above the clouds at sunrise",
  },
];

export const FAQS = [
  {
    id: "offer-live",
    question: `Is the ${OFFER_PERCENT}% Black Friday offer live?`,
    answer:
      "Not yet. The offer is proposed and still needs sign-off. Until its terms are confirmed, standard plan prices apply. Sign up below and we'll email you when the terms are final.",
  },
  {
    id: "used-up-data",
    question: "What happens when I use up my high-speed data?",
    answer:
      "You stay connected. Every driver plan moves to unlimited 2G data for the rest of the billing period, so messaging and lighter apps keep working at slower speeds.",
  },
  {
    id: "pay-annually",
    question: "Can I pay annually?",
    answer:
      "The plan table has an annual view so you can compare yearly cost. Whether annual billing is available for your plan, and on what terms, is confirmed at checkout.",
  },
  {
    id: "unlimited-data",
    question: "Is the Unlimited plan unlimited data?",
    answer:
      "Unlimited includes 35 GB of high-speed data, then unlimited 2G data. Talk and text are unlimited across the U.S., Canada and Mexico, with calls and texts to 220+ countries.",
  },
  {
    id: "availability",
    question: "Where is DriverX Mobile available?",
    answer:
      "Availability depends on your area and device. Check your eligibility before you sign up so you know you're covered where you drive.",
  },
  {
    id: "fleets",
    question: "Are there plans for fleets?",
    answer:
      "Yes. Business & Fleet plans keep drivers and dispatch connected under one account. Talk to our fleet team to size a plan for your vehicles.",
  },
];
