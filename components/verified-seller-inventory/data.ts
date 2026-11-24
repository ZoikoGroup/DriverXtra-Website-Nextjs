import type { Faq } from "@/components/ui/FaqSection";

const img = (name: string) => `/images/verified-seller-inventory/${name}.webp`;

export type Fuel = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "Plug-in hybrid";
export type Body = "SUV" | "Hatchback" | "Estate" | "Pickup" | "Van";
export type Condition = "New" | "Used" | "Certified";
export type SellerType = "Dealer" | "Fleet" | "Private";

export type VerifiedListing = {
  id: string;
  year: number;
  make: string;
  model: string;
  body: Body;
  fuel: Fuel;
  condition: Condition;
  mileage: number;
  price: number;
  /** ISO date the listing went live. */
  listed: string;
  seller: string;
  sellerType: SellerType;
  city: string;
  history: "available" | "new";
  image: string;
};

/** Example inventory — swap for live verified-seller listings later. */
export const verifiedListings: VerifiedListing[] = [
  { id: "2023-family-suv", year: 2023, make: "Example", model: "Family SUV", body: "SUV", fuel: "Petrol", condition: "Certified", mileage: 9000, price: 24995, listed: "2026-11-04", seller: "Fleet Remarketing Example", sellerType: "Fleet", city: "Birmingham", history: "available", image: img("example-suv") },
  { id: "2024-compact-ev", year: 2024, make: "Example", model: "Compact EV", body: "Hatchback", fuel: "Electric", condition: "New", mileage: 120, price: 29990, listed: "2026-11-03", seller: "Example Motors Ltd", sellerType: "Dealer", city: "Manchester", history: "new", image: img("example-ev-charging") },
  { id: "2022-city-ev", year: 2022, make: "Example", model: "City EV", body: "Hatchback", fuel: "Electric", condition: "Used", mileage: 15000, price: 16495, listed: "2026-11-01", seller: "Northside Cars", sellerType: "Dealer", city: "Leeds", history: "available", image: img("example-ev-charging") },
  { id: "2021-compact-suv", year: 2021, make: "Example", model: "Compact SUV", body: "SUV", fuel: "Hybrid", condition: "Used", mileage: 28000, price: 17950, listed: "2026-10-28", seller: "Example Motors Ltd", sellerType: "Dealer", city: "Manchester", history: "available", image: img("example-suv") },
  { id: "2022-sample-pickup", year: 2022, make: "Sample", model: "Pickup", body: "Pickup", fuel: "Diesel", condition: "Used", mileage: 31000, price: 27500, listed: "2026-10-25", seller: "Fleet Remarketing Example", sellerType: "Fleet", city: "Birmingham", history: "available", image: img("example-pickup") },
  { id: "2020-panel-van", year: 2020, make: "Example", model: "Panel Van", body: "Van", fuel: "Diesel", condition: "Used", mileage: 74000, price: 12750, listed: "2026-10-12", seller: "Fleet Remarketing Example", sellerType: "Fleet", city: "Birmingham", history: "available", image: img("example-panel-van") },
  { id: "2024-plugin-suv", year: 2024, make: "Sample", model: "Plug-in SUV", body: "SUV", fuel: "Plug-in hybrid", condition: "Used", mileage: 6500, price: 34250, listed: "2026-10-10", seller: "Northside Cars", sellerType: "Dealer", city: "Leeds", history: "available", image: img("example-suv") },
  { id: "2021-family-estate", year: 2021, make: "Example", model: "Family Estate", body: "Estate", fuel: "Diesel", condition: "Used", mileage: 41000, price: 14995, listed: "2026-10-08", seller: "A. Verified Private Seller", sellerType: "Private", city: "Bristol", history: "available", image: img("example-suv") },
  { id: "2023-sample-ev", year: 2023, make: "Sample", model: "Long Range EV", body: "Hatchback", fuel: "Electric", condition: "Certified", mileage: 12000, price: 26750, listed: "2026-10-05", seller: "Example Motors Ltd", sellerType: "Dealer", city: "Manchester", history: "available", image: img("example-ev-charging") },
  { id: "2019-crew-van", year: 2019, make: "Sample", model: "Crew Van", body: "Van", fuel: "Diesel", condition: "Used", mileage: 88000, price: 10450, listed: "2026-09-30", seller: "Fleet Remarketing Example", sellerType: "Fleet", city: "Birmingham", history: "available", image: img("example-panel-van") },
];

export const STATUS_CONFIRMED = "6 Nov 2026, 09:00 UTC";
export const PAGE_SIZE = 6;

/* ---------- Filter options ---------- */

const unique = <T,>(values: T[]) => Array.from(new Set(values)).sort();

export const makes = unique(verifiedListings.map((l) => l.make));
export const modelsFor = (make: string) =>
  unique(verifiedListings.filter((l) => !make || l.make === make).map((l) => l.model));
export const bodies: Body[] = ["SUV", "Hatchback", "Estate", "Pickup", "Van"];
export const fuels: Fuel[] = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in hybrid"];
export const conditions: Condition[] = ["New", "Used", "Certified"];
export const sellerTypes: SellerType[] = ["Dealer", "Fleet", "Private"];
export const priceOptions = [10000, 15000, 20000, 25000, 30000, 40000];
export const mileageOptions = [1000, 10000, 25000, 50000, 75000, 100000];

export type Filters = {
  make: string;
  model: string;
  body: string;
  fuel: string;
  condition: string;
  maxPrice: string;
  maxMileage: string;
  sellerType: string;
  location: string;
};

export const emptyFilters: Filters = {
  make: "",
  model: "",
  body: "",
  fuel: "",
  condition: "",
  maxPrice: "",
  maxMileage: "",
  sellerType: "",
  location: "",
};

export const sortOptions = [
  { id: "relevant", label: "Most relevant" },
  { id: "newest", label: "Newest listed" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "mileage-asc", label: "Mileage: low to high" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

const sorters: Record<SortId, (a: VerifiedListing, b: VerifiedListing) => number> = {
  relevant: () => 0,
  newest: (a, b) => b.listed.localeCompare(a.listed),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "mileage-asc": (a, b) => a.mileage - b.mileage,
};

export function filterListings(f: Filters, sort: SortId) {
  const loc = f.location.trim().toLowerCase();
  return verifiedListings
    .filter(
      (l) =>
        (!f.make || l.make === f.make) &&
        (!f.model || l.model === f.model) &&
        (!f.body || l.body === f.body) &&
        (!f.fuel || l.fuel === f.fuel) &&
        (!f.condition || l.condition === f.condition) &&
        (!f.maxPrice || l.price <= Number(f.maxPrice)) &&
        (!f.maxMileage || l.mileage <= Number(f.maxMileage)) &&
        (!f.sellerType || l.sellerType === f.sellerType) &&
        // "Current location" comes from the browser — no city match needed for example data.
        (!loc || loc === "current location" || l.city.toLowerCase().includes(loc)),
    )
    .sort(sorters[sort]);
}

export const formatGbp = (n: number) => `£${n.toLocaleString("en-GB")}`;
export const formatMiles = (n: number) => `${n.toLocaleString("en-GB")} mi`;
export const formatListed = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/* ---------- Before you buy ---------- */

export const beforeYouBuy = [
  {
    title: "Vehicle History",
    text: "Records are separate from seller checks, and may be incomplete.",
    image: img("vehicle-history"),
    alt: "Vehicle documents being checked",
    href: "/trust-buyer-safety",
  },
  {
    title: "How Verification Works",
    text: "What each verification label covers, and its limits.",
    image: img("how-verification-works"),
    alt: "A seller and a buyer talking",
    href: "/dealer-verification",
  },
  {
    title: "Buyer Safety",
    text: "Checks before you pay, and how to spot payment scams.",
    image: img("buyer-safety"),
    alt: "A padlock on a keyboard",
    href: "/trust-buyer-safety",
  },
];

/* ---------- FAQ ---------- */

export const verifiedFaqs: Faq[] = [
  {
    q: "What does Verified Seller mean?",
    a: "It indicates that a seller has met the applicable checks under the platform's approved verification policy. The scope can differ for private individuals and businesses and may change over time.",
  },
  {
    q: "Does a verified seller mean the vehicle is safe?",
    a: "No. Verification is about the seller, not the vehicle. Check the vehicle history, any open safety recalls and consider an independent inspection before you buy.",
  },
  {
    q: "Does DriverXtra verify that a seller owns every vehicle?",
    a: "Not for every listing. Some checks confirm identity or business registration only. Ask for proof of ownership and check the documents before paying.",
  },
  {
    q: "Is a verified dealer the same as a licensed dealer?",
    a: "Not necessarily. Licensing rules differ by market and are set by local authorities. Verification shows that DriverXtra's checks were completed, not that a licence is held.",
  },
  {
    q: "Are all listings on DriverXtra verified?",
    a: "No. This page only shows listings from sellers whose verification is currently active. Other listings may come from sellers who haven't completed checks.",
  },
  {
    q: "Can a seller lose verification status?",
    a: "Yes. Checks can expire, or be withdrawn after a policy breach or confirmed report. Listings from that seller then stop appearing here.",
  },
  {
    q: "Does seller verification include a vehicle history report?",
    a: "No. A vehicle history report is a separate record, shown on the listing when available. It may be incomplete, so review it alongside the vehicle itself.",
  },
  {
    q: "Can a verified seller ask me to pay a deposit outside the platform?",
    a: "Be cautious. Never send money by bank transfer, gift card or crypto before seeing the vehicle and its documents. Report any seller who pressures you to pay off-platform.",
  },
  {
    q: "How can I report a misleading verified badge?",
    a: 'Use "Report this listing" on the vehicle card or listing page. Our trust team reviews reports and can remove the badge or the listing.',
  },
  {
    q: "Why are no verified sellers appearing for my location?",
    a: "Verified inventory isn't available in every area or market yet. Try widening your search, clearing filters or checking a different location.",
  },
];
