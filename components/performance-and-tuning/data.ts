import type { Faq } from "@/components/ui/FaqSection";
import type { VehicleId } from "@/components/parts/data";
import type { RegionName } from "@/lib/region";

export const CATALOG_UPDATED = "5 Nov 2026";

export const intro = [
  { title: "Browse", text: "Explore products by family." },
  { title: "Fitment", text: "Whether a part is listed for your exact vehicle." },
  { title: "Road use", text: "Whether it can be offered for your market and intended use." },
  { title: "Installation", text: "Tools, calibration or professional review that may be needed." },
];

export const intendedUses = ["Not sure", "Public roads", "Track or competition", "Off-road / private land"] as const;
export type IntendedUse = (typeof intendedUses)[number];

export const families = ["Air intake", "Exhaust", "Suspension", "Brakes", "Cooling", "Gauges & electronics"] as const;
export type Family = (typeof families)[number];

export type Fit = "supported" | "check" | "not-listed" | "unverified";
export const fitLabels: Record<Fit, { label: string; dot: string; text: string }> = {
  supported: { label: "Listed for your vehicle", dot: "bg-emerald-600", text: "text-emerald-700" },
  check: { label: "Check details before ordering", dot: "bg-amber-600", text: "text-amber-700" },
  "not-listed": { label: "Not listed for this vehicle", dot: "bg-red-600", text: "text-red-700" },
  unverified: { label: "Compatibility has not been verified", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
};

export type RoadUse = "offered" | "not-confirmed" | "competition" | "not-offered";
export const roadUseLabels: Record<RoadUse, { label: string; dot: string; text: string }> = {
  offered: { label: "Offered in this market", dot: "bg-emerald-600", text: "text-emerald-700" },
  "not-confirmed": { label: "Road-use status not confirmed", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
  competition: { label: "Competition use only", dot: "bg-amber-600", text: "text-amber-700" },
  "not-offered": { label: "Not offered in this market", dot: "bg-red-600", text: "text-red-700" },
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  partNo: string;
  family: Family;
  price: number;
  image: string;
  alt: string;
  /** Synthetic application data; vehicles not listed are "not listed". */
  fits: Partial<Record<VehicleId, { fit: Fit; note?: string }>>;
  roadUse: Partial<Record<RegionName, RoadUse>>;
  install: "basic" | "professional";
  test?: { result: string; detail: string };
};

const img = (f: string) => `/images/performance-and-tuning/${f}`;

export const products: Product[] = [
  {
    id: "panel-air-filter",
    name: "High-flow panel air filter",
    brand: "Example Filters",
    partNo: "PT-AF-201",
    family: "Air intake",
    price: 49,
    image: img("air-filter.webp"),
    alt: "A silver sports car parked in a dark showroom",
    fits: { "vw-golf": { fit: "supported" }, "bmw-320d": { fit: "supported" }, "ford-focus": { fit: "check", note: "Listed for the 125 PS engine only." } },
    roadUse: { "United Kingdom": "offered", "United States": "offered", Germany: "offered", France: "offered", Canada: "offered", Australia: "offered" },
    install: "basic",
  },
  {
    id: "cat-back-exhaust",
    name: "Cat-back exhaust system",
    brand: "Example Exhaust Co.",
    partNo: "PT-EX-330",
    family: "Exhaust",
    price: 899,
    image: img("exhaust-system.webp"),
    alt: "A grey performance coupe parked on a dusk road",
    fits: { "vw-golf": { fit: "check", note: "Listed for GTI bodywork with the twin-exit rear valance." } },
    roadUse: { "United States": "competition", Germany: "not-offered" },
    install: "professional",
    test: {
      result: "Measured exhaust back-pressure reduced from 0.42 bar to 0.31 bar.",
      detail: "Example manufacturer test, 2021 Golf GTI 2.0 TSI, stock engine, at 6,000 rpm, single dyno session. Example Exhaust Co. test report EX-330-T1 · verified 12 Sep 2026. Not a guarantee for other setups.",
    },
  },
  {
    id: "lowering-springs",
    name: "Lowering spring set (−30 mm)",
    brand: "Sample Suspension",
    partNo: "PT-SP-110",
    family: "Suspension",
    price: 279,
    image: img("lowering-springs.webp"),
    alt: "A black saloon parked under studio lights",
    fits: { "vw-golf": { fit: "supported" }, "bmw-320d": { fit: "check", note: "Not listed for cars with adaptive dampers." }, "vw-polo": { fit: "not-listed" } },
    roadUse: { "United Kingdom": "offered", "United States": "offered", Germany: "offered", Canada: "offered", Australia: "offered", France: "offered" },
    install: "professional",
  },
  {
    id: "brake-pads",
    name: "Performance brake pads (front)",
    brand: "Sample Brakes",
    partNo: "PT-BP-340",
    family: "Brakes",
    price: 119,
    image: img("brake-pads.webp"),
    alt: "A black sports car driving on a motorway at dusk",
    fits: { "vw-golf": { fit: "supported" }, "ford-focus": { fit: "supported" }, "bmw-320d": { fit: "check", note: "Check your front disc size (330 mm or 348 mm)." } },
    roadUse: { "United Kingdom": "offered", "United States": "offered", Germany: "offered", France: "offered", Canada: "offered", Australia: "offered", India: "offered", UAE: "offered" },
    install: "professional",
  },
  {
    id: "intercooler",
    name: "Intercooler upgrade",
    brand: "Example Cooling",
    partNo: "PT-IC-77",
    family: "Cooling",
    price: 649,
    image: img("intercooler.webp"),
    alt: "A technician working in an open engine bay",
    fits: { "vw-golf": { fit: "check", note: "Requires the front bumper carrier from 2021 onwards." }, "bmw-320d": { fit: "supported" } },
    roadUse: {},
    install: "professional",
  },
  {
    id: "boost-gauge",
    name: "Boost pressure gauge (52 mm)",
    brand: "Sample Instruments",
    partNo: "PT-GA-52",
    family: "Gauges & electronics",
    price: 89,
    image: img("boost-gauge.webp"),
    alt: "A dashboard screen showing performance charts",
    fits: { "vw-golf": { fit: "supported" }, "ford-focus": { fit: "supported" }, "ford-fiesta": { fit: "supported" }, "bmw-320d": { fit: "supported" } },
    roadUse: { "United Kingdom": "offered", "United States": "offered", Germany: "offered", France: "offered", Canada: "offered", Australia: "offered" },
    install: "basic",
  },
];

export const faqs: Faq[] = [
  { q: "What is Performance & Tuning?", a: "A browsing category for upgrade-related parts. Inventory and feature support must be verified before publication." },
  { q: "Does choosing my vehicle mean a part fits?", a: "No. It filters products and shows a fitment status for each one. Read the status and any condition before ordering." },
  { q: "Can I use my saved Garage vehicle?", a: "Yes. Vehicles from Use My Garage appear at the top of the vehicle list, and the active one is selected for you." },
  { q: "Why do I see “Check details”?", a: "The part may fit if a named detail matches, such as engine output or brake disc size. Confirm it before ordering." },
  { q: "What does “Unknown” mean?", a: "There isn't enough vehicle or part data to compare. Choose a vehicle, or ask the seller." },
  { q: "Is an upgrade legal on public roads?", a: "It depends on your market, the part and your vehicle. The road-use status is a filter, not legal advice — check local rules before fitting." },
  { q: "Does a competition-use label guarantee legality?", a: "No. It means the seller offers the part for competition use only. It isn't permitted on public roads in that market." },
  { q: "Can I increase horsepower by a fixed amount?", a: "We don't publish fixed power gains. Where a test result exists, it applies only to the exact configuration tested." },
  { q: "How can I compare products fairly?", a: "Tick Compare on up to three products to see fitment, road use, installation and test evidence side by side." },
  { q: "Can I install an upgrade myself?", a: "Some parts need only basic tools. Others need professional installation, calibration or review — this is shown on each product." },
  { q: "Will any aftermarket upgrade void my warranty?", a: "Not automatically, but a modification may affect warranty claims related to it. Check your warranty terms and ask the manufacturer." },
  { q: "Do Verified Parts Sellers guarantee compatibility?", a: "Seller verification checks the business, not each part's fitment. Use the fitment status and listing details." },
  { q: "Why is a product not available in my market?", a: "Sellers choose where they offer products, and some parts aren't permitted for road use in every market." },
  { q: "Why did a fitment result disappear?", a: "Changing your vehicle or a filter changes the results. Clear filters or choose your vehicle again." },
  { q: "Where is tuning software installed?", a: "Engine software changes are carried out by the seller or an approved installer. We don't install or distribute tuning software." },
  { q: "What if a test result has no baseline?", a: "We don't show a result without the tested configuration and a baseline. Treat unsupported claims as unverified." },
  { q: "How do I report wrong application details?", a: "Use Report on the product listing, or contact Help Center with the part number and your vehicle details." },
  { q: "Can I get help selecting parts?", a: "Yes. Fitment Help explains each status, and you can message the seller from any product page." },
];
