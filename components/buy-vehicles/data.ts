import type { RegionName } from "@/lib/region";

export type Condition = "new" | "used";
export type Powertrain = "BEV" | "PHEV" | "HEV" | "Petrol" | "Diesel";
export type BodyType = "Sedan / coupe" | "Hatchback" | "Estate / wagon" | "SUV / crossover" | "Van" | "Pickup";
export type SellerType = "Dealer" | "Private" | "Fleet";
export type Verification = "L2" | "L3" | "L4" | "L5";
export type History = "available" | "new" | "pending";

export type Listing = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  powertrain: Powertrain;
  mileage: number;
  location: string;
  seller: SellerType;
  condition: Condition;
  body: BodyType;
  verification: Verification;
  history: History;
  certification?: { status: "certified" | "lapsed"; text: string };
  sponsored?: boolean;
  commercial?: boolean;
  country: RegionName;
  /** Dummy photos for now — swap for real listing images later. */
  image: string;
};

/** All example listings are UK vehicles for now. */
const LISTING_COUNTRY: RegionName = "United Kingdom";

const exampleListings: Omit<Listing, "country">[] = [
  {
    id: "toyota-rav4-2024",
    year: 2024,
    make: "Toyota",
    model: "RAV4 2.5 Hybrid Design",
    price: 31450,
    powertrain: "HEV",
    mileage: 8200,
    location: "Manchester",
    seller: "Dealer",
    condition: "used",
    body: "SUV / crossover",
    verification: "L4",
    history: "available",
    certification: { status: "certified", text: "Certified by Northgate Certified Inspections (certificate on file)" },
    image: "/images/home/image1.png",
  },
  {
    id: "bmw-x3-2025",
    year: 2025,
    make: "BMW",
    model: "X3 xDrive30e M Sport",
    price: 52900,
    powertrain: "PHEV",
    mileage: 10,
    location: "London",
    seller: "Dealer",
    condition: "new",
    body: "SUV / crossover",
    verification: "L5",
    history: "new",
    image: "/images/home/image2.png",
  },
  {
    id: "tesla-model-3-2023",
    year: 2023,
    make: "Tesla",
    model: "Model 3 Long Range AWD",
    price: 29900,
    powertrain: "BEV",
    mileage: 14000,
    location: "Bristol",
    seller: "Private",
    condition: "used",
    body: "Sedan / coupe",
    verification: "L3",
    history: "available",
    image: "/images/home/image3.png",
  },
  {
    id: "mercedes-c300-2024",
    year: 2024,
    make: "Mercedes-Benz",
    model: "C 300 AMG Line Premium",
    price: 38500,
    powertrain: "Petrol",
    mileage: 11000,
    location: "Birmingham",
    seller: "Dealer",
    condition: "used",
    body: "Sedan / coupe",
    verification: "L4",
    history: "available",
    certification: { status: "certified", text: "Certified by Example manufacturer approved used programme" },
    sponsored: true,
    image: "/images/home/image4.png",
  },
  {
    id: "ford-transit-custom-2022",
    year: 2022,
    make: "Ford",
    model: "Transit Custom 320 L1 Trend",
    price: 24750,
    powertrain: "Diesel",
    mileage: 31200,
    location: "Leeds",
    seller: "Fleet",
    condition: "used",
    body: "Van",
    verification: "L4",
    history: "available",
    commercial: true,
    image: "/images/about/hero-vehicle-listing.png",
  },
  {
    id: "kia-ev6-2025",
    year: 2025,
    make: "Kia",
    model: "EV6 GT-Line S AWD",
    price: 47200,
    powertrain: "BEV",
    mileage: 5,
    location: "Glasgow",
    seller: "Dealer",
    condition: "new",
    body: "SUV / crossover",
    verification: "L4",
    history: "new",
    image: "/images/about/ecosystem-vehicles.png",
  },
  {
    id: "vw-golf-gti-2021",
    year: 2021,
    make: "Volkswagen",
    model: "Golf GTI Clubsport",
    price: 23800,
    powertrain: "Petrol",
    mileage: 27400,
    location: "Cardiff",
    seller: "Private",
    condition: "used",
    body: "Hatchback",
    verification: "L2",
    history: "pending",
    image: "/images/about/audience-individuals.webp",
  },
  {
    id: "ford-ranger-2023",
    year: 2023,
    make: "Ford",
    model: "Ranger Wildtrak 2.0 EcoBlue",
    price: 36900,
    powertrain: "Diesel",
    mileage: 18100,
    location: "Exeter",
    seller: "Dealer",
    condition: "used",
    body: "Pickup",
    verification: "L4",
    history: "available",
    commercial: true,
    image: "/images/home/image1.png",
  },
  {
    id: "vw-id-buzz-cargo-2025",
    year: 2025,
    make: "Volkswagen",
    model: "ID. Buzz Cargo Commerce",
    price: 46500,
    powertrain: "BEV",
    mileage: 8,
    location: "Reading",
    seller: "Dealer",
    condition: "new",
    body: "Van",
    verification: "L4",
    history: "new",
    commercial: true,
    image: "/images/home/image3.png",
  },
  {
    id: "toyota-corolla-2022",
    year: 2022,
    make: "Toyota",
    model: "Corolla 1.8 Hybrid Icon",
    price: 17950,
    powertrain: "HEV",
    mileage: 22800,
    location: "Nottingham",
    seller: "Dealer",
    condition: "used",
    body: "Hatchback",
    verification: "L4",
    history: "available",
    certification: { status: "lapsed", text: "Certification not current — not counted as certified" },
    image: "/images/home/image2.png",
  },
  {
    id: "volvo-xc60-2025",
    year: 2025,
    make: "Volvo",
    model: "XC60 T6 Plug-in Hybrid Plus",
    price: 58900,
    powertrain: "PHEV",
    mileage: 12,
    location: "Edinburgh",
    seller: "Dealer",
    condition: "new",
    body: "SUV / crossover",
    verification: "L5",
    history: "new",
    image: "/images/about/hero-vehicle-listing.png",
  },
  {
    id: "mercedes-sprinter-2020",
    year: 2020,
    make: "Mercedes-Benz",
    model: "Sprinter 314 CDI L2H2",
    price: 21400,
    powertrain: "Diesel",
    mileage: 66200,
    location: "Bristol",
    seller: "Fleet",
    condition: "used",
    body: "Van",
    verification: "L4",
    history: "available",
    commercial: true,
    image: "/images/home/image4.png",
  },
];

export const listings: Listing[] = exampleListings.map((l) => ({ ...l, country: LISTING_COUNTRY }));

/* ---------- Labels ---------- */

export const powertrainLabel: Record<Powertrain, string> = {
  BEV: "Electric (BEV)",
  PHEV: "Plug-in hybrid (PHEV)",
  HEV: "Hybrid (HEV)",
  Petrol: "Petrol",
  Diesel: "Diesel",
};

export const powertrainFilterLabel: Record<Powertrain, string> = {
  BEV: "Battery electric (BEV)",
  PHEV: "Plug-in hybrid (PHEV)",
  HEV: "Hybrid (HEV)",
  Petrol: "Petrol / gasoline",
  Diesel: "Diesel",
};

export const verificationLabel: Record<Verification, string> = {
  L2: "L2 Identity Verified",
  L3: "L3 Verified Seller",
  L4: "L4 Business Verified",
  L5: "L5 Certified Partner",
};

export const bodyTypes: BodyType[] = ["Sedan / coupe", "Hatchback", "Estate / wagon", "SUV / crossover", "Van", "Pickup"];
export const powertrains: Powertrain[] = ["BEV", "PHEV", "HEV", "Petrol", "Diesel"];
export const sellerTypes: SellerType[] = ["Dealer", "Private", "Fleet"];
export const makes = Array.from(new Set(listings.map((l) => l.make))).sort();
export const mileageOptions = [1000, 10000, 25000, 50000, 75000];
export const yearOptions = [2025, 2024, 2023, 2022, 2021, 2020];

/* ---------- Tabs ---------- */

export const tabs = [
  { id: "all", label: "All Vehicles", match: () => true },
  { id: "used", label: "Used Vehicles", match: (l: Listing) => l.condition === "used" },
  { id: "new", label: "New Vehicles", match: (l: Listing) => l.condition === "new" },
  { id: "certified", label: "Certified Vehicles", match: (l: Listing) => l.certification?.status === "certified" },
  { id: "electric", label: "Electric & Hybrid Vehicles", match: (l: Listing) => ["BEV", "PHEV", "HEV"].includes(l.powertrain) },
  { id: "commercial", label: "Commercial & Fleet Vehicles", match: (l: Listing) => !!l.commercial },
  { id: "advanced", label: "Advanced Vehicle Search", match: () => true },
] as const;

export type TabId = (typeof tabs)[number]["id"];

export const isTabId = (value: string | undefined): value is TabId => tabs.some((t) => t.id === value);

/* ---------- Filters ---------- */

export type Filters = {
  condition: "any" | Condition;
  certifiedOnly: boolean;
  make: string;
  bodies: BodyType[];
  priceMin: string;
  priceMax: string;
  powertrains: Powertrain[];
  sellers: SellerType[];
  maxMileage: string;
  yearFrom: string;
  verifiedOnly: boolean;
  historyOnly: boolean;
};

export const emptyFilters: Filters = {
  condition: "any",
  certifiedOnly: false,
  make: "",
  bodies: [],
  priceMin: "",
  priceMax: "",
  powertrains: [],
  sellers: [],
  maxMileage: "",
  yearFrom: "",
  verifiedOnly: false,
  historyOnly: false,
};

export function countActiveFilters(f: Filters) {
  return (
    (f.condition !== "any" ? 1 : 0) +
    (f.certifiedOnly ? 1 : 0) +
    (f.make ? 1 : 0) +
    f.bodies.length +
    (f.priceMin ? 1 : 0) +
    (f.priceMax ? 1 : 0) +
    f.powertrains.length +
    f.sellers.length +
    (f.maxMileage ? 1 : 0) +
    (f.yearFrom ? 1 : 0) +
    (f.verifiedOnly ? 1 : 0) +
    (f.historyOnly ? 1 : 0)
  );
}

function matchesFilters(l: Listing, f: Filters) {
  if (f.condition !== "any" && l.condition !== f.condition) return false;
  if (f.certifiedOnly && l.certification?.status !== "certified") return false;
  if (f.make && l.make !== f.make) return false;
  if (f.bodies.length && !f.bodies.includes(l.body)) return false;
  if (f.priceMin && l.price < Number(f.priceMin)) return false;
  if (f.priceMax && l.price > Number(f.priceMax)) return false;
  if (f.powertrains.length && !f.powertrains.includes(l.powertrain)) return false;
  if (f.sellers.length && !f.sellers.includes(l.seller)) return false;
  if (f.maxMileage && l.mileage > Number(f.maxMileage)) return false;
  if (f.yearFrom && l.year < Number(f.yearFrom)) return false;
  if (f.verifiedOnly && l.verification === "L2") return false;
  if (f.historyOnly && l.history !== "available") return false;
  return true;
}

/* ---------- Sorting ---------- */

export const sortOptions = [
  { id: "relevant", label: "Most relevant" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "year-desc", label: "Newest first" },
  { id: "mileage-asc", label: "Lowest mileage" },
] as const;

export type SortId = (typeof sortOptions)[number]["id"];

const sorters: Record<SortId, (a: Listing, b: Listing) => number> = {
  relevant: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "year-desc": (a, b) => b.year - a.year,
  "mileage-asc": (a, b) => a.mileage - b.mileage,
};

export function getResults(region: RegionName, tab: TabId, filters: Filters, sort: SortId) {
  const match = tabs.find((t) => t.id === tab)?.match ?? (() => true);
  return listings
    .filter((l) => l.country === region && match(l) && matchesFilters(l, filters))
    .sort(sorters[sort]);
}

export const regionHasListings = (region: RegionName) => listings.some((l) => l.country === region);

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
export const formatMileage = (n: number) => `${n.toLocaleString("en-US")} mi`;
