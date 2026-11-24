import { Bell, Lock, Mail, RefreshCw, ShieldCheck, Tag, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

/* ---------- Watch targets (examples) ---------- */

export const savedListings = [
  { id: "DX-L-1001", title: "2021 Example Compact SUV", price: 17950 },
  { id: "DX-L-1002", title: "2023 Example Family SUV", price: 24995 },
  { id: "DX-L-1003", title: "2022 Example City EV", price: 16495 },
];

export const savedSearches = [
  { id: "S-01", title: "Electric hatchbacks under £20,000" },
  { id: "S-02", title: "SUVs within 25 miles of Manchester" },
  { id: "S-03", title: "Vans under 80,000 mi" },
];

const LISTING_ID = /DX-L-\d{4}/i;

/** Pulls a listing ID out of a pasted link or ID. Returns null when none is found. */
export function parseListing(input: string) {
  const match = input.match(LISTING_ID);
  if (!match) return null;
  const id = match[0].toUpperCase();
  return savedListings.find((l) => l.id === id) ?? { id, title: `Listing ${id}`, price: null };
}

/* ---------- Channels ---------- */

export type Channel = "account" | "email";

export const channels: { id: Channel | "sms" | "push"; label: string; offered: boolean }[] = [
  { id: "account", label: "In my DriverXtra account", offered: true },
  { id: "email", label: "Email my verified address", offered: true },
  { id: "sms", label: "Text message — not offered", offered: false },
  { id: "push", label: "Push notification — not offered", offered: false },
];

export const channelLabel: Record<Channel, string> = { account: "In my account", email: "Email" };

/* ---------- Saved alerts (demo, stored on this device) ---------- */

export type Rule = "decrease" | "target";

export type PriceAlert = {
  id: string;
  kind: "vehicle" | "search";
  title: string;
  rule: Rule;
  target?: number;
  channels: Channel[];
  market: string;
  createdAt: string;
  paused: boolean;
};

const STORAGE_KEY = "dx-price-alerts-demo";

export type DemoState = { signedIn: boolean; alerts: PriceAlert[] };

export function loadDemo(): DemoState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DemoState;
  } catch {
    // Storage blocked or corrupt — start fresh.
  }
  return { signedIn: false, alerts: [] };
}

export function saveDemo(state: DemoState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — alerts last for this page view only.
  }
}

/* ---------- Examples ---------- */

export const exampleAlerts: { channel: string; icon: LucideIcon; title: string; body: string[]; footer?: string; muted?: boolean }[] = [
  {
    channel: "Email",
    icon: Mail,
    title: "Price update for your watched 2021 Example Compact SUV",
    body: [
      "The current validated listed price is £17,950.",
      "Previous comparable verified price: £18,950, checked 5 Nov, 09:00.",
    ],
    footer: "View listing · Stop these alerts · Privacy Notice",
  },
  {
    channel: "In-app",
    icon: Bell,
    title: "A watched vehicle has an eligible price update.",
    body: ["Check its current listing."],
  },
  {
    channel: "Target met",
    icon: Tag,
    title: "The watched listing was checked at £15,995, at or below your target of £16,000.",
    body: ["Confirm the price with the seller before deciding."],
    muted: true,
  },
];

/* ---------- Method ---------- */

export const methodCards: { title: string; text: string; icon: LucideIcon; image: string; alt: string }[] = [
  {
    title: "Same listing, same basis",
    text: "A decrease only counts when the earlier and current prices are for the same listing, currency and fee basis. A manufacturer list price isn't an earlier asking price.",
    icon: ShieldCheck,
    image: "/images/by-monthly-budget/whats-included.webp",
    alt: "Documents being compared",
  },
  {
    title: "Rechecked before sending",
    text: "The price and availability are checked again just before a notification goes out. If the listing sold or the price went back up, nothing is sent.",
    icon: RefreshCw,
    image: "/images/price-alerts/rechecked-before-sending.webp",
    alt: "A data dashboard",
  },
  {
    title: "One alert per event",
    text: "Retries never send duplicates, and paused or deleted alerts send nothing.",
    icon: Lock,
    image: "/images/by-monthly-budget/not-a-loan-offer.webp",
    alt: "A padlock on a keyboard",
  },
];

/* ---------- FAQ ---------- */

export const priceAlertFaqs: Faq[] = [
  {
    q: "What is a price alert?",
    a: "A price alert is a preference to monitor a selected vehicle listing or saved search and notify you when an eligible, verified price rule is met, where the service is available.",
  },
  {
    q: "Does a price alert guarantee that I can buy the vehicle for that price?",
    a: "No. An alert reports the listed price when it was checked. The seller can change the price or sell the vehicle at any time, so confirm with them before deciding.",
  },
  {
    q: "Is a price alert the same as a price reduction?",
    a: "No. A price reduction is a verified drop shown on a listing. An alert is your request to be told when a reduction, or a price at or below your target, is confirmed.",
  },
  {
    q: "Will I get every price change instantly?",
    a: "No. Prices are checked periodically and rechecked before an alert is sent. Short-lived changes and price rises don't trigger alerts.",
  },
  {
    q: "Can I follow more than one vehicle?",
    a: "Yes. Create a separate alert for each listing or saved search, and manage them all under My price alerts.",
  },
  {
    q: "Can I change the target amount?",
    a: "Yes. Delete the alert and create a new one with the target you want. Only price changes after the new alert is created are counted.",
  },
  {
    q: "Will you email or text me automatically?",
    a: "Only through the channels you choose. In-account alerts are on by default; email needs your consent, and text and push notifications aren't offered yet.",
  },
  {
    q: "How do I stop price alerts?",
    a: "Pause or delete an alert under My price alerts, or use the stop link in any alert email. Paused and deleted alerts send nothing.",
  },
  {
    q: "Does a seller verification badge make a price accurate?",
    a: "No. Verification is about the seller's identity or business checks, not the price. Review the full price and fee details on the listing.",
  },
  {
    q: "What if a price shown in an alert looks incorrect?",
    a: "Open the listing and use \"Report an incorrect price\". Our team reviews the price history and corrects or removes alerts that don't meet the policy.",
  },
];
