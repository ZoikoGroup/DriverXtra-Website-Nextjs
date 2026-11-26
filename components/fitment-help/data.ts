import type { Faq } from "@/components/ui/FaqSection";
import type { VehicleId } from "@/components/parts/data";

export type FitStatus = "supported" | "check" | "not-listed" | "unknown" | "disagree" | "unavailable";

export const statuses: Record<FitStatus, { label: string; meaning: string; action: string; dot: string; text: string; panel: string }> = {
  supported: {
    label: "Supported",
    meaning: "Listed application data covers the details you gave.",
    action: "Still check the qualifiers, especially for modified vehicles.",
    dot: "bg-emerald-600",
    text: "text-emerald-700",
    panel: "border-emerald-200 bg-emerald-50/60",
  },
  check: {
    label: "Check details before ordering",
    meaning: "The part may fit if a named detail matches.",
    action: "Check the named detail before ordering.",
    dot: "bg-amber-600",
    text: "text-amber-700",
    panel: "border-amber-200 bg-amber-50/60",
  },
  "not-listed": {
    label: "Not listed as compatible",
    meaning: "Application data excludes your configuration.",
    action: "Look for a listed alternative. It isn't a safety verdict.",
    dot: "bg-red-600",
    text: "text-red-700",
    panel: "border-red-200 bg-red-50/60",
  },
  unknown: {
    label: "Fitment unknown",
    meaning: "There isn't enough vehicle or part data.",
    action: "Add missing vehicle details, or ask the seller.",
    dot: "border border-slate-400 bg-white",
    text: "text-slate-600",
    panel: "border-slate-200 bg-slate-50",
  },
  disagree: {
    label: "Information disagrees",
    meaning: "Sources disagree or are out of date.",
    action: "Check manufacturer notes or report the issue.",
    dot: "bg-red-600",
    text: "text-red-700",
    panel: "border-red-200 bg-red-50/60",
  },
  unavailable: {
    label: "Cannot check fitment right now",
    meaning: "The check couldn't run.",
    action: "Browse, but verify before ordering.",
    dot: "border border-slate-400 bg-white",
    text: "text-slate-600",
    panel: "border-slate-200 bg-slate-50",
  },
};

type Rule = { status: FitStatus; note: string };

/** Synthetic application data for the example checker — not real fitment. */
export const exampleParts: { id: string; name: string; partNo: string; rules: Partial<Record<VehicleId, Rule>>; otherwise: Rule }[] = [
  {
    id: "front-pads",
    name: "Front brake pad set",
    partNo: "EX-BP-5Q0151",
    rules: {
      "vw-golf": { status: "supported", note: "Listed for 1.5 TSI with 312 mm front discs." },
      "vw-polo": { status: "check", note: "Listed only with 288 mm front discs. Check your disc size before ordering." },
    },
    otherwise: { status: "not-listed", note: "Not in the application list for this model." },
  },
  {
    id: "spark-plugs",
    name: "Iridium spark plugs (set of 3)",
    partNo: "EX-IR-1890",
    rules: {
      "ford-focus": { status: "supported", note: "Listed for 1.0 EcoBoost (100/125 PS)." },
      "ford-fiesta": { status: "check", note: "Listed for 125 PS only. Check the engine output on your registration document." },
      "toyota-corolla": { status: "not-listed", note: "Hybrid engines use a different plug. Look for a listed alternative." },
    },
    otherwise: { status: "unknown", note: "No application data for this engine yet." },
  },
  {
    id: "cabin-filter",
    name: "Cabin air filter",
    partNo: "EX-CF-0R010",
    rules: {
      "toyota-corolla": { status: "supported", note: "Listed for all trims." },
      "toyota-chr": { status: "disagree", note: "The manufacturer list and the seller listing give different part numbers." },
    },
    otherwise: { status: "not-listed", note: "Not in the application list for this model." },
  },
  {
    id: "alloy-18",
    name: "18 × 7.5J alloy wheel, 5×112 ET45",
    partNo: "EX-AW-1875",
    rules: {
      "vw-golf": { status: "check", note: "Matches the bolt pattern. Check tyre size and whether your car has the sport brake package." },
      "bmw-320d": { status: "check", note: "Matches the bolt pattern, but hub bore rings are needed." },
      "bmw-x3": { status: "not-listed", note: "Load rating is below what this vehicle needs." },
    },
    otherwise: { status: "not-listed", note: "Bolt pattern doesn't match." },
  },
  {
    id: "egr-valve",
    name: "EGR valve (remanufactured)",
    partNo: "EX-EGR-8591",
    rules: {
      "bmw-320d": { status: "supported", note: "Listed for B47 engines built from 03/2019." },
    },
    otherwise: { status: "unknown", note: "No application data for this engine." },
  },
  {
    id: "roof-bars",
    name: "Aluminium roof bars (pair)",
    partNo: "EX-RB-118",
    rules: {},
    otherwise: { status: "unavailable", note: "The fitting-kit lookup is offline in this example." },
  },
];

export const troubleshooting = [
  { title: "VIN didn't decode", text: "VIN lookup may not cover your vehicle. Choose your details manually instead.", link: "Use My Garage" },
  { title: "Trim or engine doesn't match", text: "Check your registration document or the engine code under the bonnet, then update your vehicle.", link: "Use My Garage" },
  { title: "Wrong part number", text: "Compare the exact part number and variant on the listing with your old part.", link: "Browse All Parts" },
  { title: "Catalog looks out of date", text: "Application data has a review date. If it's old or sources disagree, treat it as unverified.", link: "Parts Authenticity & Anti-Counterfeit" },
  { title: "Modified or special setup", text: "Aftermarket changes, conversions and imports may not match stock application data.", link: "Performance & Tuning" },
];

export const faqs: Faq[] = [
  { q: "What is Fitment Help?", a: "A guide to checking whether the exact part is listed for the details of your vehicle, including any conditions." },
  { q: "Does selecting a vehicle mean every part fits?", a: "No. A selected vehicle filters listings and shows a fitment status for each part. Read the status and its reason before ordering." },
  { q: "Will entering a VIN prove compatibility?", a: "No. A VIN identifies your vehicle where lookup is available; it doesn't prove a part fits. Application data and listing details still apply." },
  { q: "Can I use Use My Garage?", a: "Yes. Vehicles in Use My Garage appear at the top of the checker so you don't have to choose them again." },
  { q: "What if I do not know my VIN?", a: "Choose your make, model and year instead. The VIN is on your registration document and usually at the base of the windscreen." },
  { q: "Why do you ask for an engine or trim?", a: "The same model can use different parts depending on engine, trim, brake package or production date." },
  { q: "What does “Supported by listed application data” mean?", a: "The data we hold lists this part for the details you gave. It isn't a guarantee — still check the qualifiers." },
  { q: "What does “Check details” mean?", a: "The part may fit if a named detail matches, such as disc size or engine output. Confirm that detail before ordering." },
  { q: "What does “Not compatible” mean?", a: "Application data excludes your configuration. It's not a safety verdict — look for a listed alternative." },
  { q: "What does “Fitment unknown” mean?", a: "There isn't enough vehicle or part data to compare. Add more vehicle detail or ask the seller." },
  { q: "Why did my fitment status change?", a: "Application data is updated, and changing your vehicle details changes the comparison. The latest result replaces the earlier one." },
  { q: "Can a verified seller guarantee a part fits?", a: "Seller verification checks the business, not each part's fitment. Use the fitment status and listing details." },
  { q: "What if the car is modified?", a: "Modifications, conversions and imports may not match stock application data. Treat results as a starting point and ask the seller." },
  { q: "Why is VIN decoding unavailable for my vehicle?", a: "VIN coverage varies by market, age and manufacturer. Choose your vehicle details manually instead." },
  { q: "What if there is conflicting fitment information?", a: "We show “Information disagrees” and no positive badge. Check the manufacturer's notes or report the issue." },
  { q: "Do I need to share registration or an ID?", a: "No. You only choose vehicle details. A VIN is optional and only used for the lookup." },
  { q: "Does Fitment Help promise returns or refunds?", a: "No. Returns follow the seller's policy and your consumer rights. Check them on the listing before you buy." },
  { q: "Can I contact a person about a part?", a: "Yes. Message the seller from the listing, or contact Help Center if you need help reading fitment information." },
];
