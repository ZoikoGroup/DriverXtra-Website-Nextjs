import { Clock, Lock, Tag, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const heroFacts: { text: string; icon: LucideIcon }[] = [
  { text: "A range, not a single number", icon: Tag },
  { text: "Four short steps", icon: Clock },
  { text: "No account or sign-up needed", icon: Lock },
];

export const steps = [
  { id: 1, title: "Vehicle" },
  { id: 2, title: "Mileage & condition" },
  { id: 3, title: "Review" },
  { id: 4, title: "Your estimate" },
] as const;

export type StepId = (typeof steps)[number]["id"];

export const lookupModes = [
  { id: "registration", label: "Registration plate" },
  { id: "vin", label: "VIN" },
  { id: "make-model", label: "Make and model" },
] as const;

export type LookupMode = (typeof lookupModes)[number]["id"];

export const isLookupMode = (value: string | undefined): value is LookupMode => lookupModes.some((m) => m.id === value);

export const damageOptions = [
  { id: "none", label: "No damage", factor: 1 },
  { id: "minor", label: "Minor cosmetic damage", factor: 0.95 },
  { id: "major", label: "Mechanical or structural damage", factor: 0.8 },
];

export type ExampleVehicle = { year: number; make: string; model: string };

/**
 * There's no vehicle-data API yet, so a lookup returns one of these example
 * records (picked from the plate/VIN so it's stable) and is labelled as demo data.
 */
const exampleRecords: ExampleVehicle[] = [
  { year: 2021, make: "Volkswagen", model: "Golf 1.5 TSI Life" },
  { year: 2022, make: "Toyota", model: "Corolla 1.8 Hybrid Icon" },
  { year: 2020, make: "Ford", model: "Focus 1.0 EcoBoost ST-Line" },
  { year: 2023, make: "Kia", model: "Sportage 1.6 T-GDi GT-Line" },
  { year: 2019, make: "BMW", model: "320d M Sport" },
];

export function exampleLookup(identifier: string): ExampleVehicle {
  const sum = [...identifier.toUpperCase()].reduce((total, ch) => total + ch.charCodeAt(0), 0);
  return exampleRecords[sum % exampleRecords.length];
}

const conditionFactor: Record<string, number> = { excellent: 1.06, good: 1, fair: 0.9, "needs-work": 0.75 };

/**
 * Illustrative estimate for design review only — age, mileage, condition and
 * damage adjustments on a fixed base. Not market data.
 */
export function exampleEstimate(year: number, mileage: number, condition: string, damage: string) {
  const age = Math.max(0, 2025 - year);
  const base = 32000 * Math.pow(0.86, age);
  const afterMileage = Math.max(1500, base - mileage * 0.07);
  const damageFactor = damageOptions.find((d) => d.id === damage)?.factor ?? 1;
  const mid = afterMileage * (conditionFactor[condition] ?? 1) * damageFactor;
  const round = (n: number) => Math.round(n / 50) * 50;
  const confidence = age > 8 || damage === "major" ? "Low" : age > 4 ? "Medium" : "High";
  return { low: round(mid * 0.92), high: round(mid * 1.08), confidence };
}

export const faqs: Faq[] = [
  {
    q: "What is my vehicle worth?",
    a: "DriverXtra can provide a market-informed estimate where the vehicle and selected market are supported and sufficient reliable data is available. The estimate is not a guaranteed sale price.",
  },
  {
    q: "Is a valuation a guaranteed purchase offer?",
    a: "No. A valuation is information only. An offer comes from a named buyer, partner or dealer, has its own conditions and usually follows an inspection.",
  },
  {
    q: "Can I value a vehicle without a VIN?",
    a: "Yes. You can use the registration plate, or enter the make, model and year yourself.",
  },
  {
    q: "Why do you ask for mileage and condition?",
    a: "They're among the biggest factors in a vehicle's value. Without them, the range would be much wider and less useful.",
  },
  {
    q: "Will you verify my vehicle ownership?",
    a: "No, not for a valuation. Finding a vehicle record isn't proof of ownership. Ownership is checked separately if you go on to sell.",
  },
  {
    q: "Why is my estimate a range?",
    a: "Real sale prices vary with the buyer, timing, location and inspection. A range with its method, date and confidence is more honest than a single number.",
  },
  {
    q: "What happens if no estimate is available?",
    a: "If coverage or data isn't sufficient for your vehicle or market, we say so instead of guessing. You can still list the vehicle or explore other ways to sell.",
  },
  {
    q: "Can I change the vehicle details?",
    a: "Yes. You can go back and change anything before you get your estimate, and start again afterwards.",
  },
  {
    q: "Does my estimate include taxes or fees?",
    a: "No. The estimate is for the vehicle only. Any fees for a selling method are shown before you commit to it.",
  },
  {
    q: "Can I sell my car after valuation?",
    a: "Yes. From your estimate you can create a listing, or — where available — request an instant offer or trade-in.",
  },
  {
    q: "Can I receive an instant offer?",
    a: "Where a named partner serves your area, you can request a conditional offer. That's a separate step from your valuation.",
  },
  {
    q: "How long is my vehicle valuation valid?",
    a: "An estimate reflects the market on the date shown. Values change over time, so check again before you sell.",
  },
  {
    q: "Do you share my VIN or plate with buyers?",
    a: "No. Your plate and VIN aren't shared with buyers from a valuation. If you list the vehicle, you choose what appears on the listing.",
  },
  {
    q: "Can a business value multiple fleet vehicles?",
    a: "Fleet and business valuations use a separate business path with delegated approval. We won't quote a bulk value without the details of each vehicle.",
  },
];
