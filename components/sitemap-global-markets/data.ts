import type { RegionName } from "@/lib/region";

/** One-line summary under each footer column in the site directory, keyed by column title. */
export const columnSummaries: Record<string, string> = {
  "Buy Vehicles": "Search and browse vehicles for sale",
  "Sell Vehicles": "Value, list or trade in your vehicle",
  "Vehicle Categories": "Browse by vehicle type",
  "Brands & Discovery": "Explore manufacturers and compare",
  "Parts & Accessories": "Parts, tyres, EV components and tools",
  "Vehicle Finance": "Loans, leases, calculators and disclosures",
  Insurance: "Compare cover and read disclosures",
  "Automotive Services": "Inspection, repair, transport and more",
  "Dealers & Retailers": "Tools and programmes for dealers",
  "Fleets & Enterprise": "Acquisition, disposition and lifecycle",
  "Providers & Parts Sellers": "Join as a provider, seller or partner",
  "Developers & Integrations": "APIs, webhooks and platform status",
  "Trust & Safety": "Verification, safety and reporting",
  "Resources & Insights": "Research, guides and news",
  "Company & Support": "About, help, contact and careers",
  "Legal, Accessibility & Global": "Policies, accessibility and markets",
};

export type MarketStatus = "available" | "limited" | "notConfirmed";

export const marketStatuses: Record<MarketStatus, { label: string; description: string; text: string; dot: string }> = {
  available: {
    label: "Available",
    description: "Core sections confirmed in this prototype",
    text: "text-emerald-700",
    dot: "bg-emerald-600",
  },
  limited: {
    label: "Limited",
    description: "Some sections not confirmed",
    text: "text-gold",
    dot: "bg-brand-dark",
  },
  notConfirmed: {
    label: "Not confirmed",
    description: "No confirmed scope yet",
    text: "text-slate-600",
    dot: "border border-slate-400",
  },
};

export type Market = {
  name: string;
  code: string;
  currency: string;
  status: MarketStatus;
  /** The site-wide region this market maps to, when one exists. */
  region?: RegionName;
};

export const markets: Market[] = [
  { name: "United Kingdom", code: "GB", currency: "GBP", status: "available", region: "United Kingdom" },
  { name: "United States", code: "US", currency: "USD", status: "limited", region: "United States" },
  { name: "Ireland", code: "IE", currency: "EUR", status: "notConfirmed" },
  { name: "Germany", code: "DE", currency: "EUR", status: "limited", region: "Germany" },
  { name: "France", code: "FR", currency: "EUR", status: "notConfirmed", region: "France" },
  { name: "Canada", code: "CA", currency: "CAD", status: "notConfirmed", region: "Canada" },
  { name: "Australia", code: "AU", currency: "AUD", status: "notConfirmed", region: "Australia" },
  { name: "United Arab Emirates", code: "AE", currency: "AED", status: "notConfirmed", region: "UAE" },
];

export const helpLinks = ["Help Center", "Report Fraud", "Report a Listing", "Accessibility Statement", "Cookie Settings"];

export const sitemapFaqs = [
  {
    question: "What is the Sitemap & Global Markets page for?",
    answer:
      "It helps you find public DriverXtra sections and explore the browsing choices available for a market. It does not confirm that every feature is offered in every location.",
  },
  {
    question: "Is this the same as a search-engine XML sitemap?",
    answer:
      "No. This page is a sitemap for people. A machine-readable XML sitemap isn't deployed for this prototype, so none is linked.",
  },
  {
    question: "Does a listed country mean DriverXtra operates all services there?",
    answer:
      "No. Being listed doesn't mean DriverXtra operates there. Each market's status shows how much has been confirmed.",
  },
  {
    question: "Can I browse DriverXtra from an unsupported market?",
    answer:
      "Yes, you can read public pages from anywhere. Products, providers and prices may not apply to your location.",
  },
  {
    question: "Why do different markets show different pages?",
    answer: "Rules, providers and available products differ between countries, so some sections only apply to certain markets.",
  },
  {
    question: "Can DriverXtra choose a market automatically for me?",
    answer: "No. We don't infer your market from your location. You choose one, and you can change it at any time.",
  },
  {
    question: "Do I have to share my precise location?",
    answer: "No. Choosing a market only needs the country you want to browse. We don't ask for your precise location.",
  },
  {
    question: "How can I change the site language?",
    answer: "This prototype is in English only. Other languages aren't available yet.",
  },
  {
    question: "Why is the page not available in my selected language?",
    answer: "Only English is published in this version. Translated pages will be listed here when they exist.",
  },
  {
    question: "Does changing currency change what I must pay?",
    answer:
      "No. Currency affects how prices are displayed. What you pay is set by the seller or provider in their own terms.",
  },
  {
    question: "Where can I find finance information?",
    answer: "Under Vehicle Finance in the site directory, including Finance Guides and Finance Disclosures.",
  },
  {
    question: "Where can I find insurance information?",
    answer: "Under Insurance in the site directory, including the Coverage Guide and Insurance Disclosures.",
  },
  {
    question: "How do I report suspected fraud?",
    answer: "Use Report Fraud, linked under Help and safety on this page and under Trust & Safety in the directory.",
  },
  {
    question: "Can I report a suspicious vehicle listing?",
    answer: "Yes. Use Report a Listing, linked under Help and safety on this page.",
  },
  {
    question: "Where are the Terms, Privacy and Cookie settings?",
    answer: "Under Legal, Accessibility & Global in the site directory and in the site footer.",
  },
  {
    question: "Why did a saved page link change?",
    answer:
      "Pages are sometimes renamed or moved as the site grows. Where we can, old addresses redirect to the new page. Otherwise, find it in the site directory.",
  },
  {
    question: "Can I browse using a keyboard or screen reader?",
    answer:
      "Yes. The directory is made of headings and plain links, and the market list uses standard buttons. See the Accessibility Statement for known limitations.",
  },
  {
    question: "How can I find business or technical resources?",
    answer: "See Dealers & Retailers, Fleets & Enterprise, Providers & Parts Sellers and Developers & Integrations in the directory.",
  },
];
