import {
  BadgeCheck,
  Car,
  CircleDot,
  ClipboardCheck,
  Flag,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Tag,
  TriangleAlert,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

/* ---------- Vehicles for the compatibility check ---------- */

export const vehicles = [
  { id: "vw-golf", make: "Volkswagen", label: "Golf 1.5 TSI · 2020–2024" },
  { id: "vw-polo", make: "Volkswagen", label: "Polo 1.0 TSI · 2021–2024" },
  { id: "ford-focus", make: "Ford", label: "Focus 1.0 EcoBoost · 2019–2024" },
  { id: "ford-fiesta", make: "Ford", label: "Fiesta 1.0 EcoBoost · 2018–2023" },
  { id: "toyota-corolla", make: "Toyota", label: "Corolla 1.8 Hybrid · 2019–2024" },
  { id: "toyota-chr", make: "Toyota", label: "C-HR 2.0 Hybrid · 2020–2024" },
  { id: "bmw-320d", make: "BMW", label: "320d (G20) · 2019–2024" },
  { id: "bmw-x3", make: "BMW", label: "X3 xDrive30e · 2020–2024" },
] as const;

export type VehicleId = (typeof vehicles)[number]["id"];
export const vehicleMakes = Array.from(new Set(vehicles.map((v) => v.make)));
export const isVehicleId = (value: string | undefined): value is VehicleId => vehicles.some((v) => v.id === value);
const ALL_VEHICLES = vehicles.map((v) => v.id);

/* ---------- Types and categories ---------- */

export const partTypes = [
  { id: "aftermarket", label: "Aftermarket Parts", badge: "Aftermarket", icon: Wrench },
  { id: "ev", label: "EV components & Chargers", badge: "EV component", icon: PlugZap },
  { id: "oem", label: "OEM Parts", badge: "OEM-classified", icon: ShieldCheck },
  { id: "tyre", label: "Tyres", badge: "Tyre", icon: CircleDot },
  { id: "wheel", label: "Wheels", badge: "Wheel", icon: CircleDot },
  { id: "tools", label: "Tools & Workshop Equipment", badge: "Workshop tool", icon: Wrench },
] as const;

export type PartType = (typeof partTypes)[number]["id"];

export const categories = [
  "Brakes",
  "Filters",
  "Ignition",
  "Lighting",
  "Exhaust",
  "Suspension",
  "Air intake",
  "Exterior & roof",
  "Interior",
  "Batteries & electrical",
  "Tyres",
] as const;

export type Category = (typeof categories)[number];

/* ---------- Parts (example listings for design review) ---------- */

export type Part = {
  id: string;
  name: string;
  type: PartType;
  category?: Category;
  condition?: "Used" | "Refurbished" | "Remanufactured";
  sponsored?: boolean;
  brand: string;
  partNo: string;
  spec?: string;
  /** Undefined when the item isn't offered in the selected market. */
  price?: number;
  perUnit?: boolean;
  seller: string;
  origin?: "reviewed" | "unverified" | "lapsed";
  universal?: boolean;
  connectorCheck?: boolean;
  restricted?: boolean;
  keyNotice?: boolean;
  /** Road-use or legality caution shown in an amber box. */
  notice?: string;
  /** Vehicles this exact part has been checked against. */
  fits?: VehicleId[];
  /** OEM listings: part-number revision, seller checks and supersession. */
  revision?: string;
  sellerCheck?: "authorized" | "L4" | "L3" | "L2";
  newerRevision?: boolean;
};

export const PARTS_COUNTRY = "United Kingdom";

export const parts: Part[] = [
  // EV components & chargers
  { id: "wallbox", name: "7.4 kW home wallbox (tethered)", type: "ev", category: "Batteries & electrical", brand: "Example Charge Co.", partNo: "ECC-WB74-T", spec: "Type 2 · 7.4 kW (AC, single-phase)", price: 549, seller: "Example EV Supplies", connectorCheck: true },
  { id: "t2-cable", name: "Type 2 to Type 2 charging cable, 5 m", type: "ev", category: "Batteries & electrical", brand: "Example Cable Co.", partNo: "ECB-T2T2-5M", spec: "Type 2 · Up to 22 kW (AC, three-phase)", price: 169, seller: "Example EV Supplies", connectorCheck: true },
  { id: "granny-cable", name: "Portable charger (granny cable), UK plug", type: "ev", category: "Batteries & electrical", brand: "Example Charge Co.", partNo: "ECC-PC-UK10", spec: "Type 2 · 2.3 kW (10 A)", price: 229, seller: "Example EV Supplies", connectorCheck: true },
  { id: "hv-module", name: "High-voltage battery module (used)", type: "ev", category: "Batteries & electrical", condition: "Used", brand: "Example EV Breakers", partNo: "EVB-HVM-48", spec: "— · —", price: 690, seller: "Example EV Breakers", restricted: true, fits: [] },

  // Workshop tools
  { id: "trolley-jack", name: "Low-profile trolley jack, 2 tonne", type: "tools", brand: "Example Workshop Co.", partNo: "EWS-TJ2", spec: "Rated capacity: 2,000 kg (manufacturer statement)", price: 89, seller: "Example Tool Depot", universal: true },
  { id: "torque-wrench", name: "Torque wrench 40–200 Nm", type: "tools", brand: "Example Hand Tools", partNo: "EHT-TW200", spec: "Range: 40–200 Nm", price: 64, seller: "Example Tool Depot", universal: true },
  { id: "obd-scanner", name: "OBD-II diagnostic scanner", type: "tools", category: "Batteries & electrical", brand: "Example Diagnostics", partNo: "EDG-OBD5", spec: "Protocols: OBD-II / EOBD", price: 79, seller: "Example Tool Depot", fits: [...ALL_VEHICLES] },
  { id: "impact-wrench", name: "Cordless impact wrench 18 V", type: "tools", condition: "Refurbished", brand: "Example Power Tools", partNo: "EPT-IW18", spec: "Max torque: 400 Nm (manufacturer statement)", price: 119, seller: "Example Tool Outlet", universal: true },
  { id: "vehicle-lift", name: "Two-post vehicle lift, 4 tonne", type: "tools", brand: "Example Lift Systems", partNo: "ELS-2P4", spec: "Rated capacity: 4,000 kg (manufacturer statement)", price: 3490, seller: "Example Garage Equipment Ltd", universal: true, restricted: true },
  { id: "tool-chest", name: "Rolling tool chest, 7 drawers", type: "tools", brand: "Example Workshop Co.", partNo: "EWS-RC7", spec: "Drawers: 7, ball-bearing runners", price: 249, seller: "Example Tool Depot", universal: true },

  // OEM-classified
  { id: "vw-oil-filter", name: "Engine oil filter element", type: "oem", category: "Filters", brand: "Volkswagen", partNo: "VW-06L115562B", price: 18.6, seller: "Example VW Parts Centre", origin: "reviewed", fits: ["vw-golf"], revision: "B", sellerCheck: "authorized" },
  { id: "vw-brake-pads", name: "Front brake pad set", type: "oem", category: "Brakes", brand: "Volkswagen", partNo: "VW-5Q0698151B", price: 86.4, seller: "Example Parts Exchange", origin: "unverified", fits: ["vw-golf"], revision: "B", sellerCheck: "L3", newerRevision: true },
  { id: "ford-spark-plug", name: "Spark plug, 1.0 EcoBoost", type: "oem", category: "Ignition", brand: "Ford", partNo: "FD-1890342", price: 11.2, seller: "Example Motor Factors", origin: "reviewed", fits: ["ford-focus", "ford-fiesta"], revision: "A", sellerCheck: "L4" },
  { id: "toyota-cabin-filter", name: "Cabin air filter", type: "oem", category: "Filters", brand: "Toyota", partNo: "TY-87139-0R010", price: 24, seller: "Example Parts Exchange", origin: "lapsed", fits: ["toyota-corolla", "toyota-chr"], revision: "A", sellerCheck: "L3" },
  { id: "bmw-egr", name: "EGR valve (remanufactured)", type: "oem", category: "Exhaust", condition: "Remanufactured", brand: "BMW", partNo: "BM-11718591117", price: 214, seller: "Example Reman Ltd", origin: "unverified", fits: ["bmw-320d"], revision: "C", sellerCheck: "L4" },
  { id: "ford-headlamp", name: "Headlamp unit, left (used)", type: "oem", category: "Lighting", condition: "Used", brand: "Ford", partNo: "FD-2301457", price: 89, seller: "Example Breakers Yard", origin: "unverified", fits: ["ford-focus"], revision: "A", sellerCheck: "L2" },
  { id: "toyota-inverter-pump", name: "Inverter coolant pump", type: "oem", category: "Batteries & electrical", brand: "Toyota", partNo: "TY-G9020-47031", seller: "Example Parts Exchange", origin: "reviewed", fits: ["toyota-corolla", "toyota-chr"], revision: "A", sellerCheck: "authorized" },
  { id: "vw-wiper-arm", name: "Rear wiper arm", type: "oem", category: "Exterior & roof", brand: "Volkswagen", partNo: "VW-5G6955707A", seller: "Example VW Parts Centre", origin: "reviewed", fits: ["vw-golf"], revision: "A", sellerCheck: "authorized" },
  { id: "bmw-key-housing", name: "Remote key housing", type: "oem", category: "Batteries & electrical", brand: "BMW", partNo: "BM-66129874230", price: 64, seller: "Example Parts Exchange", origin: "unverified", keyNotice: true, fits: ["bmw-320d", "bmw-x3"], revision: "A", sellerCheck: "L3" },

  // Aftermarket
  { id: "ceramic-pads", name: "Ceramic front brake pads", type: "aftermarket", category: "Brakes", brand: "Example Brakeworks", partNo: "EB-CP2241", price: 24.99, seller: "Example Parts Direct", fits: ["vw-golf", "ford-focus"] },
  { id: "vented-discs", name: "Vented front brake discs (pair)", type: "aftermarket", category: "Brakes", brand: "Example Brakeworks", partNo: "EB-VD3400", price: 129, seller: "Example Parts Direct", fits: ["vw-golf"] },
  { id: "oil-filter", name: "Oil filter", type: "aftermarket", category: "Filters", brand: "Example Filtration", partNo: "EF-OF118", price: 8.49, seller: "Example Motor Factors", fits: ["ford-focus", "ford-fiesta", "toyota-corolla"] },
  { id: "panel-air-filter", name: "High-flow panel air filter", type: "aftermarket", category: "Air intake", sponsored: true, brand: "Example Airflow", partNo: "AF-HF2201", price: 54.99, seller: "Example Performance Store", fits: ["vw-golf", "bmw-320d"] },
  { id: "iridium-plugs", name: "Iridium spark plugs (set of 4)", type: "aftermarket", category: "Ignition", brand: "Example Ignition Co.", partNo: "EI-IR7744", price: 39.99, seller: "Example Motor Factors", fits: ["ford-focus", "ford-fiesta"] },
  { id: "led-bulbs", name: "LED headlight bulbs H7 (pair)", type: "aftermarket", category: "Lighting", brand: "Example Lumen", partNo: "EL-H7LED", price: 44.99, seller: "Example Lighting Shop", fits: ["vw-golf", "vw-polo", "ford-focus"], notice: "LED replacements in halogen headlamp housings may not be permitted for road use in your selected market." },
  { id: "cat-back", name: "Cat-back sport exhaust system", type: "aftermarket", category: "Exhaust", brand: "Example Exhaust Works", partNo: "EX-CB7G", price: 849, seller: "Example Performance Store", fits: ["vw-golf"], notice: "Exhaust modifications can affect road-use and noise rules. Check what applies to your vehicle and market before fitting." },
  { id: "coilovers", name: "Adjustable coilover suspension kit", type: "aftermarket", category: "Suspension", brand: "Example Ride Dynamics", partNo: "RD-CO550", price: 1149, seller: "Example Performance Store", fits: ["vw-golf", "bmw-320d"] },
  { id: "wiper-blades", name: "Universal flat wiper blade 24\"", type: "aftermarket", category: "Exterior & roof", brand: "Example Wipe Co.", partNo: "EW-U24", price: 12.99, seller: "Example Motor Factors", fits: ["vw-polo", "ford-fiesta", "toyota-corolla"] },
  { id: "roof-bars", name: "Aluminium roof bars (pair)", type: "aftermarket", category: "Exterior & roof", brand: "Example Rack Systems", partNo: "RS-AB118", price: 189, seller: "Example Outdoor Gear Ltd", fits: ["vw-golf", "bmw-x3"] },
  { id: "floor-mats", name: "Tailored rubber floor mats", type: "aftermarket", category: "Interior", brand: "Example Interior Co.", partNo: "IC-RM-G8", price: 49.99, seller: "Example Motor Factors", fits: ["toyota-corolla", "toyota-chr", "vw-golf"] },
  { id: "battery-70ah", name: "AGM start-stop battery 70Ah", type: "aftermarket", category: "Batteries & electrical", condition: "Refurbished", brand: "Example Power", partNo: "EP-AGM70", seller: "Example Motor Factors", fits: ["ford-focus", "vw-golf", "vw-polo"] },

  // Tyres
  { id: "eco-contact", name: "Example Grip Sport 5", type: "tyre", category: "Tyres", brand: "Example Tyre Co.", partNo: "ETC-GS5-2254517", spec: "225/45 R17 · 94 W (XL) · Summer", price: 112, perUnit: true, seller: "Example Tyre Warehouse", fits: ["vw-golf", "ford-focus"] },
  { id: "all-season", name: "Example All-Season Plus", type: "tyre", category: "Tyres", brand: "Example Tyre Co.", partNo: "ETC-ASP-2055516", spec: "205/55 R16 · 91 V · All-season", price: 84, perUnit: true, seller: "Example Tyre Warehouse", fits: ["vw-polo", "ford-focus", "toyota-corolla"] },
  { id: "winter-edge", name: "Example Winter Edge", type: "tyre", category: "Tyres", brand: "Example Rubber Works", partNo: "ERW-WE-2254018", spec: "225/40 R18 · 92 V (XL) · Winter", price: 138, perUnit: true, seller: "Example Seasonal Tyres", fits: ["vw-golf"] },
  { id: "grip-sport", name: "Example Grip Sport 5 (rear)", type: "tyre", category: "Tyres", brand: "Example Tyre Co.", partNo: "ETC-GS5-2554018", spec: "255/40 R18 · 99 Y (XL) · Summer", price: 164, perUnit: true, seller: "Example Tyre Warehouse", fits: ["bmw-320d"] },
  { id: "part-worn", name: "Part-worn tyre", type: "tyre", category: "Tyres", condition: "Used", brand: "Example Tyre Co.", partNo: "ETC-GS5-2254517", spec: "225/45 R17 · 5 mm (seller-measured) · Summer", price: 38, perUnit: true, seller: "Example Breakers Yard", fits: ["vw-golf", "ford-focus"] },

  // Wheels
  { id: "flow-alloy", name: "Example Flow 10-spoke alloy", type: "wheel", brand: "Example Wheel Co.", partNo: "EWC-F10-1875", spec: "18 × 7.5J · 5×112 · ET45", price: 189, perUnit: true, seller: "Example Wheel Studio", fits: ["vw-golf", "bmw-320d"] },
  { id: "steel-wheel", name: "Example Classic steel wheel", type: "wheel", brand: "Example Wheel Co.", partNo: "EWC-ST-1665", spec: "16 × 6.5J · 5×108 · ET50", price: 62, perUnit: true, seller: "Example Motor Factors", fits: ["ford-focus", "ford-fiesta"] },
  { id: "forged-wheel", name: "Example Forged multi-spoke", type: "wheel", condition: "Refurbished", brand: "Example Forge", partNo: "EFG-MS-1985", spec: "19 × 8.5J · 5×112 · ET30", price: 295, perUnit: true, seller: "Example Wheel Studio", fits: ["bmw-320d", "bmw-x3"] },
];

/* ---------- Shop-by cards ---------- */

export const shopCards: {
  title: string;
  text: (count: (types: PartType[]) => number, region: string) => string;
  icon: LucideIcon;
  types?: PartType[];
  id: string;
  /** Key in typePresets, for links to /parts?type=… */
  preset?: string;
  /** Cards with their own page, and the section that page scrolls to. */
  page?: string;
  anchor?: string;
}[] = [
  { id: "vin", title: "Find Parts by VIN", text: () => "Identify your vehicle first", icon: Car, page: "/find-parts-by-vin", anchor: "find-by-vin" },
  { id: "oem", page: "/oem-parts", anchor: "explore-oem", title: "OEM Parts", text: (n, r) => `OEM-classified parts and part numbers · ${n(["oem"])} in ${r}`, icon: ShieldCheck, types: ["oem"], preset: "oem" },
  { id: "aftermarket", page: "/aftermarket-parts", anchor: "all-parts", title: "Aftermarket Parts", text: (n, r) => `Replacement and upgrade parts · ${n(["aftermarket"])} in ${r}`, icon: Wrench, types: ["aftermarket"], preset: "aftermarket" },
  { id: "tyres-wheels", page: "/tires-and-wheels", anchor: "explore-tyres", title: "Tires & Wheels", text: (n, r) => `By vehicle or by size · ${n(["tyre", "wheel"])} in ${r}`, icon: CircleDot, types: ["tyre", "wheel"], preset: "tyres-wheels" },
  { id: "ev", title: "EV Components & Chargers", text: (n, r) => `Proposed · chargers and cables · ${n(["ev"])} in ${r}`, icon: PlugZap, types: ["ev"], preset: "ev" },
  { id: "tools", title: "Tools & Workshop Equipment", text: (n, r) => `Proposed · tools and equipment · ${n(["tools"])} in ${r}`, icon: ClipboardCheck, types: ["tools"], preset: "tools" },
];

/* ---------- URL presets (footer / menu links) ---------- */

export const typePresets: Record<string, PartType[]> = {
  oem: ["oem"],
  aftermarket: ["aftermarket"],
  "tyres-wheels": ["tyre", "wheel"],
  ev: ["ev"],
  tools: ["tools"],
};

export const categoryPresets: Record<string, Category[]> = {
  "brakes-suspension": ["Brakes", "Suspension"],
  exhaust: ["Exhaust"],
  filters: ["Filters"],
  lighting: ["Lighting"],
  interior: ["Interior"],
  exterior: ["Exterior & roof"],
  electrical: ["Batteries & electrical"],
};

/* ---------- Explainers ---------- */

export const partQuestions = [
  { title: "Seller", icon: BadgeCheck, what: "Who is selling and which checks they passed.", never: "That a part is genuine or fits." },
  { title: "Fitment", icon: ClipboardCheck, what: "Whether this exact part was checked against your vehicle.", never: "Origin, condition or warranty." },
  { title: "OEM / aftermarket / used", icon: Tag, what: "How the part is classified and its stated condition.", never: "Authenticity or quality." },
  { title: "Returns & warranty", icon: Truck, what: "Who provides cover, for how long, and the return terms.", never: "An automatic factory warranty." },
];

export const choosingTips: { title: string; text: string; icon: LucideIcon; link?: { label: string; href: string } }[] = [
  {
    title: "OEM-classified",
    text: "Associated with the original equipment manufacturer. The label alone doesn't prove an item is genuine.",
    icon: ShieldCheck,
    link: { label: "OEM Parts", href: "/oem-parts" },
  },
  {
    title: "Aftermarket",
    text: "From other supply channels. Not automatically compatible, better or worse.",
    icon: Wrench,
    link: { label: "Aftermarket Parts", href: "/aftermarket-parts" },
  },
  {
    title: "Refurbished & used",
    text: "Condition is set by the seller. Check traceability, returns and warranty on each item.",
    icon: Sparkles,
  },
  {
    title: "Higher-risk categories",
    text: "EV high-voltage parts, lifting equipment and safety-critical items may be restricted by market or buyer type.",
    icon: TriangleAlert,
  },
  {
    title: "Something wrong?",
    text: "Use “Report a fitment or listing concern” on any part. Reports are reviewed.",
    icon: Flag,
  },
  {
    title: "Buying for a fleet or workshop?",
    text: "Business accounts may get bulk ordering where available.",
    icon: Truck,
    link: { label: "Business options", href: "#" },
  },
];

export const faqs: Faq[] = [
  {
    q: "Can I browse parts without entering a VIN?",
    a: "Yes. Browse All Parts lets you explore available categories without providing a VIN or signing in. Compatibility for a particular vehicle remains unverified until sufficient matching evidence is available.",
  },
  {
    q: "How do I check whether a part fits my vehicle?",
    a: "Choose your make and model (or enter your VIN) in Check compatibility. Parts checked against that vehicle show “Fits your vehicle”; others say fitment isn't verified.",
  },
  {
    q: "Does selecting my vehicle guarantee fit?",
    a: "No. It shows parts that have been checked against that vehicle, but variations in trim, year or options can matter. Check the part details and seller's fitment notes before you buy.",
  },
  {
    q: "What is the difference between OEM and aftermarket parts?",
    a: "OEM-classified parts are associated with the original manufacturer. Aftermarket parts come from other supply channels. Neither label is a quality or authenticity guarantee.",
  },
  {
    q: "Can I shop for used or refurbished parts?",
    a: "Yes. Their condition is set by the seller and shown on each listing. Check traceability, returns and warranty before you buy.",
  },
  {
    q: "Does a Verified Seller badge mean a part is genuine?",
    a: "No. Seller verification checks the business. Part origin is shown separately, for example “Manufacturer-origin evidence reviewed”.",
  },
  {
    q: "Are all prices final at the listing stage?",
    a: "No. Delivery costs and any fees are shown before purchase where available.",
  },
  {
    q: "What happens if no matching parts are found?",
    a: "We say so instead of suggesting something that may not fit. Try a different category, or search by part number.",
  },
  {
    q: "Can I search by part number?",
    a: "Yes. Enter the manufacturer or seller part number in the search box above the results.",
  },
  {
    q: "Are EV components and chargers available everywhere?",
    a: "No. Availability depends on your market, and some high-voltage parts are restricted to qualified buyers.",
  },
  {
    q: "Do I need an account to use My Garage?",
    a: "Yes — saving vehicles to My Garage needs an account. You can still check compatibility for one vehicle without signing in.",
  },
  {
    q: "How do I report a wrong fitment claim or suspicious part?",
    a: "Use “Report a fitment or listing concern” on the part's listing. Reports are reviewed by our trust and safety team.",
  },
];
