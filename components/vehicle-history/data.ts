import {
  FileText,
  Gauge,
  Lock,
  Search,
  ShieldAlert,
  TriangleAlert,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";
import type { RelatedLink } from "@/components/ui/RelatedLinksSection";
import type { RegionName } from "@/lib/region";

const img = (name: string) => `/images/vehicle-history/${name}.webp`;

/* ---------- Quick links ---------- */

export const quickLinks = [
  { label: "Understand reports", href: "#coverage", image: img("nav-understand-reports"), alt: "Vehicle documents on a desk" },
  { label: "Check VIN or registration", href: "#identifier", image: img("nav-check-vin"), alt: "A car parked on a street" },
  { label: "Review recalls", href: "#official-checks", image: img("nav-review-recalls"), alt: "A padlock on a keyboard" },
  { label: "Inspect in person", href: "#checklist", image: img("nav-inspect-in-person"), alt: "A technician inspecting a car" },
];

/* ---------- Coverage ---------- */

export const coverageItems: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Title and branding records", text: "Look for recorded salvage, flood or other title brands where your market offers them.", icon: FileText },
  { title: "Odometer and mileage records", text: "Compare dated readings and investigate differences in distance units or sequence.", icon: Gauge },
  { title: "Accident and damage records", text: "Some incidents may be absent even when damage occurred.", icon: TriangleAlert },
  { title: "Registration and keeper history", text: "Availability varies. Personal keeper information is not displayed here.", icon: UserRound },
  { title: "Service and inspection history", text: "Recorded service events do not replace a qualified independent inspection.", icon: Wrench },
  { title: "Theft and loss records", text: "A source can only report what it holds, as of the date it was checked.", icon: Lock },
  { title: "Safety recalls", text: "Check the appropriate official or manufacturer service. A zero result is not a universal safety guarantee.", icon: ShieldAlert },
  { title: "Independent inspection", text: "Evaluates current condition — evidence a history report can't give.", icon: Search },
];

/* ---------- Identifier ---------- */

export const identifierTips = [
  "Check the number on the vehicle against the official documents before using a lookup.",
  "On many modern vehicles the VIN is visible at the base of the windscreen and on the driver's door pillar.",
  "In the UK, number plate and V5C records have different uses from a VIN.",
];

const VIN_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5,
  P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};
const VIN_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

export type VinResult = { ok: boolean; message: string; note?: string };

/** Format-only VIN check (ISO 3779). Nothing is looked up or sent anywhere. */
export function checkVin(raw: string): VinResult {
  const vin = raw.replace(/[\s-]/g, "").toUpperCase();
  if (!vin) return { ok: false, message: "Enter a VIN to check its format." };
  if (/[IOQ]/.test(vin)) return { ok: false, message: "A VIN never contains the letters I, O or Q. Check for 1 or 0 instead." };
  if (!/^[A-Z0-9]+$/.test(vin)) return { ok: false, message: "A VIN only uses letters and numbers." };
  if (vin.length !== 17) return { ok: false, message: `A VIN has 17 characters — this one has ${vin.length}.` };

  const sum = [...vin].reduce((acc, ch, i) => acc + (/\d/.test(ch) ? Number(ch) : VIN_VALUES[ch]) * VIN_WEIGHTS[i], 0);
  const expected = sum % 11 === 10 ? "X" : String(sum % 11);
  return {
    ok: true,
    message: `${vin} is a well-formed 17-character VIN.`,
    note:
      vin[8] === expected
        ? "Its check digit (9th character) is also valid under the North American scheme."
        : "Its 9th character doesn't match the North American check digit. That's normal for many vehicles built for other markets.",
  };
}

/* ---------- Official checks by market ---------- */

export type OfficialService = { name: string; text: string; href: string };

export const officialChecks: Record<RegionName, OfficialService[]> = {
  "United Kingdom": [
    { name: "DVLA vehicle enquiry", text: "Tax and MOT status, first registration date and basic vehicle details.", href: "https://www.gov.uk/get-vehicle-information-from-dvla" },
    { name: "MOT history (DVSA)", text: "Past MOT results, recorded mileage and advisories.", href: "https://www.gov.uk/check-mot-history" },
    { name: "Vehicle recall check (DVSA)", text: "Outstanding safety recalls by make, model and VIN.", href: "https://www.gov.uk/check-vehicle-recall" },
  ],
  "United States": [
    { name: "NHTSA recall lookup", text: "Unrepaired safety recalls by VIN.", href: "https://www.nhtsa.gov/recalls" },
    { name: "NMVTIS", text: "Title, brand and total-loss history from approved data providers.", href: "https://vehiclehistory.bja.ojp.gov/" },
    { name: "NICB VINCheck", text: "Reported theft and some total-loss records.", href: "https://www.nicb.org/vincheck" },
  ],
  Canada: [
    { name: "Transport Canada recalls", text: "Motor vehicle safety recall database.", href: "https://tc.canada.ca/" },
    { name: "Provincial registry", text: "Lien and registration searches are run by each province or territory.", href: "https://www.canada.ca/" },
  ],
  Germany: [
    { name: "KBA recall database", text: "Recalls registered with the Federal Motor Transport Authority.", href: "https://www.kba.de/" },
  ],
  France: [
    { name: "HistoVec", text: "Official vehicle history from registration records, shared by the seller.", href: "https://histovec.interieur.gouv.fr/" },
  ],
  India: [
    { name: "VAHAN (Parivahan)", text: "Registration details from the national vehicle register.", href: "https://vahan.parivahan.gov.in/" },
  ],
  Australia: [
    { name: "PPSR vehicle search", text: "Finance owing, stolen and written-off records.", href: "https://www.ppsr.gov.au/" },
    { name: "Product Safety Australia", text: "Vehicle safety recalls.", href: "https://www.productsafety.gov.au/" },
  ],
  UAE: [
    { name: "RTA vehicle services", text: "Registration and vehicle services in Dubai. Other emirates run their own services.", href: "https://www.rta.ae/" },
  ],
};

/* ---------- Mixed results ---------- */

export type ResultStatus = "Unknown" | "Conflicting" | "Partial" | "Limited scope" | "Stale";

export const statusTone: Record<ResultStatus, { dot: string; text: string }> = {
  Unknown: { dot: "border border-slate-400 bg-white", text: "text-slate-500" },
  Conflicting: { dot: "bg-red-600", text: "text-red-700" },
  Partial: { dot: "bg-amber-500", text: "text-amber-700" },
  "Limited scope": { dot: "bg-amber-500", text: "text-amber-700" },
  Stale: { dot: "bg-amber-500", text: "text-amber-700" },
};

export const mixedResults: { title: string; returned: string; meaning: string; status: ResultStatus }[] = [
  { title: "Title-source status", returned: "No record returned", meaning: 'Unknown title history in this dataset — not a "clean title".', status: "Unknown" },
  { title: "Odometer", returned: "2020: 35,000 miles → 2022: 30,000 miles", meaning: "Potential inconsistency. Verify dates, units and any instrument replacement.", status: "Conflicting" },
  { title: "Accident source", returned: "No incident entries returned", meaning: "No incident reported to this source. Can't infer accident-free.", status: "Unknown" },
  { title: "Salvage / total loss", returned: 'One source "not reported", another "unknown"', meaning: "Partial and uncertain — not reducible to a single pass mark.", status: "Conflicting" },
  { title: "Service history", returned: "One maintenance record, date unknown", meaning: "Incomplete maintenance history. Recommend an inspection.", status: "Partial" },
  { title: "Recall lookup", returned: "No unrepaired recall in scoped lookup", meaning: "None from that check as of the lookup date; broader recall limits apply.", status: "Limited scope" },
  { title: "Identity check", returned: "Registration and identifier don't match", meaning: "Stop. Compare the vehicle and documents manually.", status: "Conflicting" },
  { title: "Report freshness", returned: "Fetched 11 months ago", meaning: "This source may be out of date. Use the latest official service before deciding.", status: "Stale" },
];

/* ---------- Checklist ---------- */

export const checklistItems = [
  "Confirm the VIN, registration and documents match the car.",
  "Review title/ownership documents and dated records available for your market.",
  "Check official recall information and arrange a qualified independent inspection.",
  "Verify seller and payment instructions before sharing funds or personal data.",
];

/* ---------- FAQ ---------- */

export const vehicleHistoryFaqs: Faq[] = [
  {
    q: "What is a vehicle history report?",
    a: "A compilation of records that selected public and private sources have about a vehicle. Depending on the provider and market, it may include recorded title or salvage information, mileage, total-loss events and some incidents. It does not capture every event.",
  },
  {
    q: "Does a clean-looking report mean a vehicle has never been in an accident?",
    a: "No. Many accidents are never reported to the sources a report uses. An empty section only means no record was returned from those sources.",
  },
  {
    q: "Can a history report prove that a car is safe?",
    a: "No. A report describes past records, not current condition. A qualified independent inspection and an official recall check are still needed.",
  },
  {
    q: "How do I find a VIN?",
    a: "Look at the base of the windscreen on the driver's side, the driver's door pillar, and the registration documents. All of them should show the same 17-character number.",
  },
  {
    q: "What should I do if odometer records do not match?",
    a: "Pause the purchase. Ask the seller for an explanation and evidence such as service invoices or an instrument-replacement record, and check for unit differences between miles and kilometres.",
  },
  {
    q: "Is seller verification the same as vehicle history verification?",
    a: "No. Seller verification checks who the seller is. Vehicle history is a separate set of records about the vehicle itself.",
  },
  {
    q: "Where can I check recalls?",
    a: "Use the official service for your market, listed under Official checks by market, or the manufacturer's recall lookup with the vehicle's VIN.",
  },
  {
    q: "Do I need a history report if I have an inspection?",
    a: "They answer different questions. An inspection shows current condition; a history report can reveal recorded past events, like title brands or mileage gaps, that an inspection might miss.",
  },
  {
    q: "Will DriverXtra provide a paid report?",
    a: "Not on this page. Where a listing includes a history report, it comes from a named provider and shows when it was fetched.",
  },
  {
    q: "What if a vehicle or provider report appears incorrect?",
    a: "Contact the report provider to dispute the record. If the listing itself is misleading, use Report a Listing Concern so our team can review it.",
  },
];

/* ---------- Related ---------- */

export const relatedLinks: RelatedLink[] = [
  {
    title: "How Verification Works",
    text: "What seller badges cover.",
    image: "/images/verified-seller-inventory/vehicle-history.webp",
    alt: "Documents being checked",
    href: "/dealer-verification",
  },
  {
    title: "Buyer Safety",
    text: "Checks before you pay.",
    image: img("related-buyer-safety"),
    alt: "A buyer looking at a car",
    href: "/trust-buyer-safety",
  },
  {
    title: "Verified Seller Inventory",
    text: "Vehicles from verified sellers.",
    image: img("related-verified-sellers"),
    alt: "A dealer forecourt",
    href: "/verified-seller-inventory",
  },
];
