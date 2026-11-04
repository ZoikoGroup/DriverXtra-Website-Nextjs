import type { Faq } from "@/components/ui/FaqSection";

export type Health = "Operational" | "Degraded performance" | "Partial outage" | "Under maintenance";

export const healthStyles: Record<Health, { dot: string; text: string }> = {
  Operational: { dot: "rounded-full bg-emerald-600", text: "text-emerald-700" },
  "Degraded performance": { dot: "rounded-full bg-amber-600", text: "text-amber-700" },
  "Partial outage": { dot: "rounded-sm bg-orange-700", text: "text-orange-700" },
  "Under maintenance": { dot: "rounded-full bg-blue-700", text: "text-blue-700" },
};

export const LAST_VERIFIED = "10 Oct 2026, 09:10 UTC";

export type Service = {
  name: string;
  health: Health;
  text: string;
  /** Days with a disclosed incident in the last 90 days, counted back from today (0 = today). */
  incidentDays: number[];
  /** Footer label of a page with more detail, resolved through `hrefFor`. */
  link?: string;
};

export const serviceGroups: { title: string; services: Service[] }[] = [
  {
    title: "Consumer services",
    services: [
      { name: "Website & apps", health: "Operational", text: "Browsing, sign-in and account pages on web and mobile.", incidentDays: [38] },
      { name: "Search", health: "Operational", text: "Vehicle, parts and service search results.", incidentDays: [26] },
      { name: "Listings", health: "Operational", text: "Publishing, updating and viewing listings.", incidentDays: [] },
      { name: "Messaging", health: "Operational", text: "Messages between shoppers, dealers and providers.", incidentDays: [] },
      { name: "Parts & checkout", health: "Operational", text: "Parts basket, checkout and payment handoff.", incidentDays: [] },
    ],
  },
  {
    title: "Developer services",
    services: [
      { name: "API", health: "Operational", text: "Public API endpoints for approved integrations.", incidentDays: [66], link: "API Documentation" },
      { name: "Webhooks", health: "Operational", text: "Event notification delivery to approved callbacks.", incidentDays: [52], link: "Webhooks" },
    ],
  },
];

export const allServices = [...serviceGroups.flatMap((g) => g.services.map((s) => s.name)), "Inventory feeds"];

export const maintenance = [
  {
    title: "Payments provider upgrade",
    ref: "MNT-DEMO-0041",
    service: "Parts & checkout",
    status: "Under maintenance",
    window: "14 Oct 2026, 01:00–03:00 UTC",
    startsAt: "2026-10-14T01:00:00Z",
    impact: "Checkout may be unavailable for up to 15 minutes.",
    image: "/images/platform-status/maintenance-payments.png",
    alt: "A phone and paperwork on a desk",
  },
  {
    title: "Search index rebuild",
    ref: "MNT-DEMO-0042",
    service: "Search",
    status: "Tentative",
    window: "21 Oct 2026, 02:00–05:00 UTC",
    startsAt: "2026-10-21T02:00:00Z",
    impact: "Search results may lag behind new listings.",
    image: "/images/platform-status/maintenance-search.webp",
    alt: "Reports with charts spread across a desk",
  },
];

export type Incident = { ref: string; title: string; service: string; severity: Health; date: string; outcome: string };

export const incidents: Incident[] = [
  { ref: "INC-DEMO-0139", title: "Delayed feed imports", service: "Inventory feeds", severity: "Degraded performance", date: "28 Sep 2026", outcome: "Resolved" },
  { ref: "INC-DEMO-0131", title: "Search unavailable in one region", service: "Search", severity: "Partial outage", date: "14 Sep 2026", outcome: "Resolved" },
  { ref: "INC-DEMO-0127", title: "Login errors for some users", service: "Website & apps", severity: "Partial outage", date: "2 Sep 2026", outcome: "Resolved" },
  { ref: "INC-DEMO-0120", title: "Webhook delivery delays", service: "Webhooks", severity: "Degraded performance", date: "19 Aug 2026", outcome: "Resolved" },
  { ref: "MNT-DEMO-0040", title: "Scheduled database upgrade", service: "API", severity: "Under maintenance", date: "5 Aug 2026", outcome: "Completed" },
];

export const channels = [
  { label: "Email", offered: true },
  { label: "SMS", offered: false },
  { label: "RSS", offered: false },
  { label: "Webhook", offered: false },
];

export const faqs: Faq[] = [
  {
    q: "What does Platform Status show?",
    a: "It presents approved operational health summaries, affected components, incident updates and maintenance notices. Availability and service scope depend on confirmed operational sources.",
  },
  { q: "Does green mean every feature is available?", a: "No. It means no disclosed issue affects that service category. A single feature or your own connection can still have problems." },
  { q: "What does \"Current service health is being verified\" mean?", a: "The status source hasn't confirmed the latest health yet. We show that instead of assuming everything is fine." },
  { q: "How often is status updated?", a: "When the status registry confirms a change. The last verified time is shown at the top of the page." },
  { q: "Why can two components have different statuses?", a: "Each service is monitored separately, so an issue in one doesn't necessarily affect another." },
  { q: "Where can I see an active incident?", a: "Active incidents appear at the top of the page and on the affected service, with their latest update." },
  { q: "What is the difference between investigating and monitoring?", a: "Investigating means the cause is still being found. Monitoring means a fix is in place and we're watching that it holds." },
  { q: "Is a planned maintenance notice an outage?", a: "No. It's an announced window when a service may be limited. The notice says what may be affected." },
  { q: "Are maintenance end times guaranteed?", a: "No. Windows are estimates, and tentative ones are marked. Changes are posted with a visible revision note." },
  { q: "How is historical uptime calculated?", a: "From disclosed incidents for each service over the period shown. It isn't a service-level commitment." },
  { q: "Can I view past incidents?", a: "Yes. The incident history lists disclosed records, though the archive may not be complete for every period." },
  { q: "Can I subscribe to status updates?", a: "Yes, by email for the services you choose. We'll ask you to verify your email before anything is sent." },
  { q: "Will signing up subscribe me to marketing?", a: "No. Status updates are operational notices only." },
  { q: "What if I do not receive a notification?", a: "Check that you verified your email and your spam folder. This page is always the source of truth." },
  { q: "Can I select specific services?", a: "Yes. Choose the services and notice types you want when you subscribe." },
  { q: "Why was an incident update corrected?", a: "If an earlier update was inaccurate, we correct it and keep a visible note of what changed." },
  { q: "Does an incident resolution guarantee my individual request succeeded?", a: "No. Check your own request or order, and contact support if something still looks wrong." },
  { q: "Where do developers get technical details or help?", a: "The Developer Hub links to API Documentation, Webhooks and how to report an integration problem." },
];
