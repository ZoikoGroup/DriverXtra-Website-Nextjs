export const HERO_IMAGE = "/images/lifecycle-analytics/fleet-hero-reports-charts.webp";

export const KPIS: { title: string; window: string; source: string; completeness: string }[] = [
  { title: "Cost by category", window: "Last 90 days", source: "Sample", completeness: "80% complete" },
  { title: "Downtime", window: "Last 90 days", source: "Sample", completeness: "Partial — 2 sites missing" },
  { title: "Utilization", window: "Last 30 days", source: "Sample", completeness: "Telematics only" },
  { title: "Replacement review", window: "Rolling 12 months", source: "Sample", completeness: "Unknown — no data" },
];

export const COST_SHARE: { label: string; percent: number }[] = [
  { label: "Maintenance", percent: 42 },
  { label: "Tyres", percent: 18 },
  { label: "Parts", percent: 24 },
];

export const COST_TABLE: { category: string; share: string; value: "Estimated" | "Unknown" }[] = [
  { category: "Maintenance", share: "42%", value: "Estimated" },
  { category: "Tyres", share: "18%", value: "Estimated" },
  { category: "Parts", share: "24%", value: "Estimated" },
  { category: "Fuel", share: "Unknown", value: "Unknown" },
];

export const SOURCES: { source: string; tone: "pending" | "plain" | "none"; status: string }[] = [
  { source: "Telematics", tone: "pending", status: "Partner-provided where connected" },
  { source: "Maintenance records", tone: "plain", status: "User-provided" },
  { source: "Fuel cards", tone: "none", status: "Not connected" },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "Is ROI calculated?",
    a: "No. Return-on-investment isn't shown without supported data.",
  },
  { q: "What does 'Unknown' mean?", a: "" },
  { q: "Can I export reports?", a: "" },
  { q: "Is data real-time?", a: "" },
];
