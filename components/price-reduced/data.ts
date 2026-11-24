import type { Faq } from "@/components/ui/FaqSection";

const shared = (name: string) => `/images/verified-seller-inventory/${name}.webp`;
const own = (name: string) => `/images/price-reduced/${name}.webp`;

export type Condition = "New" | "Used" | "Certified";
export type BodyStyle = "SUV" | "Hatchback" | "Estate" | "Pickup" | "Van";

export type ReducedListing = {
  id: string;
  year: number;
  make: string;
  model: string;
  body: BodyStyle;
  fuel: string;
  condition: Condition;
  mileage: number;
  price: number;
  previousPrice: number;
  /** ISO date the reduction was recorded. */
  reducedOn: string;
  sellerType: "Dealer" | "Private";
  seller: string;
  city: string;
  conditionalOffer?: number;
  image: string;
};

/** Example inventory — swap for live listings with a verified price history later. */
export const reducedListings: ReducedListing[] = [
  { id: "2023-family-suv", year: 2023, make: "Example", model: "Family SUV", body: "SUV", fuel: "Petrol", condition: "Certified", mileage: 9000, price: 24995, previousPrice: 26495, reducedOn: "2026-11-02", sellerType: "Dealer", seller: "Certified Example Dealer", city: "London", conditionalOffer: 1000, image: shared("example-suv") },
  { id: "2020-panel-van", year: 2020, make: "Example", model: "Panel Van", body: "Van", fuel: "Diesel", condition: "Used", mileage: 74000, price: 12750, previousPrice: 13500, reducedOn: "2026-10-30", sellerType: "Dealer", seller: "Trade Vans Example", city: "Birmingham", image: shared("example-panel-van") },
  { id: "2022-city-ev", year: 2022, make: "Example", model: "City EV", body: "Hatchback", fuel: "Electric", condition: "Used", mileage: 15000, price: 16495, previousPrice: 17995, reducedOn: "2026-10-28", sellerType: "Dealer", seller: "Example EV Store", city: "Bristol", image: shared("example-ev-charging") },
  { id: "2022-sample-pickup", year: 2022, make: "Sample", model: "Pickup", body: "Pickup", fuel: "Diesel", condition: "Used", mileage: 21000, price: 27500, previousPrice: 28995, reducedOn: "2026-10-05", sellerType: "Dealer", seller: "Trade Vans Example", city: "Birmingham", image: shared("example-pickup") },
  { id: "2021-compact-suv", year: 2021, make: "Example", model: "Compact SUV", body: "SUV", fuel: "Hybrid", condition: "Used", mileage: 28000, price: 17950, previousPrice: 18950, reducedOn: "2026-10-01", sellerType: "Dealer", seller: "Example Motors Ltd", city: "Manchester", image: shared("example-suv") },
  { id: "2021-estate", year: 2021, make: "Example", model: "Estate", body: "Estate", fuel: "Hybrid", condition: "Used", mileage: 38000, price: 22000, previousPrice: 23000, reducedOn: "2026-10-01", sellerType: "Dealer", seller: "Sples Motors Example", city: "Leeds", image: own("example-estate") },
  { id: "2024-compact-ev", year: 2024, make: "Example", model: "Compact EV", body: "Hatchback", fuel: "Electric", condition: "New", mileage: 120, price: 28490, previousPrice: 29990, reducedOn: "2026-11-04", sellerType: "Dealer", seller: "Example Motors Ltd", city: "Manchester", image: shared("example-ev-charging") },
  { id: "2023-sample-estate", year: 2023, make: "Sample", model: "Touring Estate", body: "Estate", fuel: "Diesel", condition: "Used", mileage: 19500, price: 19750, previousPrice: 21250, reducedOn: "2026-10-22", sellerType: "Private", seller: "Verified private seller", city: "Cardiff", image: own("example-estate") },
  { id: "2019-crew-van", year: 2019, make: "Sample", model: "Crew Van", body: "Van", fuel: "Diesel", condition: "Used", mileage: 88000, price: 9950, previousPrice: 10950, reducedOn: "2026-10-18", sellerType: "Dealer", seller: "Trade Vans Example", city: "Birmingham", image: shared("example-panel-van") },
  { id: "2022-sample-suv", year: 2022, make: "Sample", model: "Hybrid SUV", body: "SUV", fuel: "Hybrid", condition: "Used", mileage: 24000, price: 23450, previousPrice: 25450, reducedOn: "2026-09-20", sellerType: "Dealer", seller: "Northside Cars", city: "Leeds", image: shared("example-suv") },
];

/** Date the asking prices above were last checked. Also the reference for "Price reduced within". */
export const PRICES_CHECKED = "2026-11-05";
export const PAGE_SIZE = 6;

export const reduction = (l: ReducedListing) => l.previousPrice - l.price;
export const reductionPct = (l: ReducedListing) => (reduction(l) / l.previousPrice) * 100;

/* ---------- Filters ---------- */

const unique = <T,>(values: T[]) => Array.from(new Set(values)).sort();

export const makes = unique(reducedListings.map((l) => l.make));
export const bodyStyles: BodyStyle[] = ["SUV", "Hatchback", "Estate", "Pickup", "Van"];
export const conditions: Condition[] = ["New", "Used", "Certified"];
export const priceOptions = [10000, 15000, 20000, 25000, 30000];
export const minReductionOptions = [500, 1000, 1500, 2000];
export const withinOptions = [
  { days: 7, label: "Last 7 days" },
  { days: 14, label: "Last 14 days" },
  { days: 30, label: "Last 30 days" },
  { days: 60, label: "Last 60 days" },
];

export type Filters = {
  make: string;
  body: string;
  condition: string;
  maxPrice: string;
  minReduction: string;
  withinDays: string;
  location: string;
};

export const emptyFilters: Filters = {
  make: "",
  body: "",
  condition: "",
  maxPrice: "",
  minReduction: "",
  withinDays: "",
  location: "",
};

export const sortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "recent", label: "Most recently reduced" },
  { id: "amount", label: "Biggest reduction (£)" },
  { id: "percent", label: "Biggest reduction (%)" },
  { id: "price-asc", label: "Price: low to high" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

const sorters: Record<SortId, (a: ReducedListing, b: ReducedListing) => number> = {
  recommended: () => 0,
  recent: (a, b) => b.reducedOn.localeCompare(a.reducedOn),
  amount: (a, b) => reduction(b) - reduction(a),
  percent: (a, b) => reductionPct(b) - reductionPct(a),
  "price-asc": (a, b) => a.price - b.price,
};

const daysBefore = (iso: string) =>
  (Date.parse(`${PRICES_CHECKED}T00:00:00Z`) - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000;

export function filterListings(f: Filters, sort: SortId) {
  const loc = f.location.trim().toLowerCase();
  return reducedListings
    .filter(
      (l) =>
        (!f.make || l.make === f.make) &&
        (!f.body || l.body === f.body) &&
        (!f.condition || l.condition === f.condition) &&
        (!f.maxPrice || l.price <= Number(f.maxPrice)) &&
        (!f.minReduction || reduction(l) >= Number(f.minReduction)) &&
        (!f.withinDays || daysBefore(l.reducedOn) <= Number(f.withinDays)) &&
        (!loc || l.city.toLowerCase().includes(loc)),
    )
    .sort(sorters[sort]);
}

export const formatGbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
export const formatMiles = (n: number) => `${n.toLocaleString("en-GB")} mi`;
export const formatDate = (iso: string, year = true) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(year ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });

/* ---------- Method ---------- */

export const methodSteps = [
  {
    title: "Same vehicle, same offer",
    text: "The earlier price must be for the same vehicle, seller, market, currency and offer conditions.",
  },
  {
    title: "A price that actually lasted",
    text: "The earlier public asking price must have been publicly available for at least 14 days in this example policy. Short-lived price rises are ignored.",
  },
  {
    title: "Same fee basis",
    text: "Mandatory fees are included on both sides. Excluding a fee can't create a reduction.",
  },
  {
    title: "Still lower, still recent",
    text: "If the price goes back up, or the reduction is older than 60 days, the claim is removed.",
  },
  {
    title: "Conditional offers kept separate",
    text: "Discounts for some buyers only aren't treated as a public price reduction.",
  },
];

/* ---------- Keep exploring ---------- */

export const exploreLinks = [
  {
    title: "By Monthly Budget",
    text: "Browse by what you can spend each month.",
    image: own("explore-monthly-budget"),
    alt: "Paperwork and a calculator",
    href: "/by-monthly-budget",
  },
  {
    title: "Verified Seller Inventory",
    text: "Vehicles from sellers who completed applicable checks.",
    image: own("explore-verified-sellers"),
    alt: "A dealer forecourt",
    href: "/verified-seller-inventory",
  },
  {
    title: "Buyer Safety",
    text: "Checks before you pay.",
    image: shared("buyer-safety"),
    alt: "A padlock on a keyboard",
    href: "/trust-buyer-safety",
  },
];

/* ---------- FAQ ---------- */

export const priceReducedFaqs: Faq[] = [
  {
    q: "What counts as a price reduction?",
    a: "We show a reduction only when the current asking price is lower than a comparable earlier public asking price for the same vehicle and offer conditions. Availability varies by market and listing.",
  },
  {
    q: "Does a lower asking price mean I will save that amount?",
    a: "Not necessarily. The reduction compares two asking prices. What you pay depends on the final agreed price, fees, taxes and any part-exchange or finance terms.",
  },
  {
    q: "Are all seller discounts included?",
    a: "No. Conditional offers, such as finance deposits or loyalty discounts, are shown separately because not every buyer qualifies for them.",
  },
  {
    q: "Why do some vehicles not show a previous price?",
    a: "If we can't confirm a comparable earlier price that lasted long enough, we don't show a reduction, even if the seller says the price has dropped.",
  },
  {
    q: "How current are these prices?",
    a: "Prices are checked regularly and the last check time is shown above the results. Sellers can change prices at any time, so confirm with them before you travel or pay.",
  },
  {
    q: "Does Price Reduced mean the vehicle is inspected or verified?",
    a: "No. It's only about the asking price. Check the seller's verification status, vehicle history and inspection details separately.",
  },
  {
    q: "Can I compare prices across countries?",
    a: "Not on this page. Reductions are only calculated within the same market and currency, because taxes, fees and specifications differ.",
  },
  {
    q: "How can I report an inaccurate price?",
    a: 'Use "Report an incorrect price" on the vehicle card. Our team reviews the price history and removes the reduction if it doesn\'t meet the policy.',
  },
  {
    q: "Can I get notified of another decrease?",
    a: "Yes. Save the vehicle or set a price alert from the listing, and we'll let you know if its asking price drops again.",
  },
  {
    q: "What should I check before contacting a seller?",
    a: "Review the full price and fee details, the vehicle history, the seller's verification status and whether any offer has conditions. Never pay a deposit before seeing the vehicle and documents.",
  },
];
