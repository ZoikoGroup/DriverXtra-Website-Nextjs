import type { Faq } from "@/components/ui/FaqSection";

export type Access = "public" | "partner" | "pilot" | "unavailable" | "unknown";

export const accessStyles: Record<Access, { label: string; dot: string; text: string }> = {
  public: { label: "Public", dot: "bg-emerald-500", text: "text-emerald-700" },
  partner: { label: "Partner access required", dot: "bg-amber-500", text: "text-amber-700" },
  pilot: { label: "Pilot", dot: "bg-red-600", text: "text-red-700" },
  unavailable: { label: "Unavailable", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
  unknown: { label: "Unknown", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
};

export type RouteIcon = "code" | "zap" | "clipboard" | "calendar" | "gauge" | "shield";

export type Route = {
  id: string;
  /** Matches the footer label, so the link resolves through `hrefFor`. */
  label: string;
  text: string;
  meta: string;
  access: Access;
  icon: RouteIcon;
  image: string;
  alt: string;
};

export const routes: Route[] = [
  {
    id: "api",
    label: "API Documentation",
    text: "Endpoints, schemas, error handling and version policy.",
    meta: "Reference · v1 · reviewed 1 Oct 2026",
    access: "public",
    icon: "code",
    image: "/images/developer-hub/api-documentation.png",
    alt: "A person writing on printed documentation",
  },
  {
    id: "webhooks",
    label: "Webhooks",
    text: "Event topics, signature verification and delivery semantics.",
    meta: "Reference · Event spec v1 · reviewed 1 Oct 2026",
    access: "partner",
    icon: "zap",
    image: "/images/developer-hub/webhooks.png",
    alt: "Glass office towers against a blue sky",
  },
  {
    id: "inventory",
    label: "Inventory & Catalog Integrations",
    text: "Catalog, stock and feed mappings with provenance and reconciliation.",
    meta: "Guide · Reviewed 28 Sep 2026",
    access: "public",
    icon: "clipboard",
    image: "/images/developer-hub/inventory-and-catalog.png",
    alt: "Water droplets on glass in teal and orange light",
  },
  {
    id: "orders",
    label: "Order & Booking Integrations",
    text: "Supported order and service-booking flows with reconciliation rules.",
    meta: "Guide · Pilot · reviewed 25 Sep 2026",
    access: "pilot",
    icon: "calendar",
    image: "/images/developer-hub/order-and-booking.webp",
    alt: "A person leaning against a classic car in a workshop",
  },
  {
    id: "status",
    label: "Platform Status",
    text: "Current and historical component status from an authoritative source.",
    meta: "Operational · Live source",
    access: "public",
    icon: "gauge",
    image: "/images/developer-hub/platform-status.webp",
    alt: "Printed reports with charts next to a laptop",
  },
  {
    id: "security",
    label: "Security & Integration Guidance",
    text: "Authentication, scopes, secret handling and incident process.",
    meta: "Guidance · Reviewed 30 Sep 2026",
    access: "partner",
    icon: "shield",
    image: "/images/developer-hub/security-guidance.png",
    alt: "A phone and paperwork on a desk",
  },
];

export const useCases = [
  { title: "Understand", text: "Read the public overview", href: "#integration-routes" },
  { title: "Select a route", text: "Open the specialist reference", href: "#integration-routes" },
  { title: "Review requirements", text: "Check access level and market", href: "#access-levels" },
  { title: "Request access", text: "Only where a real review exists", href: "#request-access" },
];

export const accessLevels: { access: Access; text: string }[] = [
  { access: "public", text: "Readable without signing in." },
  { access: "partner", text: "Some content needs a verified organization and approved access." },
  { access: "pilot", text: "Limited to approved participants; scope may change." },
  { access: "unavailable", text: "Not offered for this market or organization." },
  { access: "unknown", text: "Availability is not confirmed for this market or organization." },
];

/** Public documentation only — restricted pages are never part of the search index. */
export const docs: { title: string; snippet: string; category: string; route: string }[] = [
  { title: "Error responses", snippet: "Error codes, retry guidance and request IDs for support.", category: "API reference", route: "API Documentation" },
  { title: "Versioning and deprecation", snippet: "How versions are named, announced and retired.", category: "API reference", route: "API Documentation" },
  { title: "Pagination and filtering", snippet: "Cursor pagination, page sizes and filter syntax.", category: "API reference", route: "API Documentation" },
  { title: "Rate limits", snippet: "Request limits, headers and backoff behaviour.", category: "API reference", route: "API Documentation" },
  { title: "Inventory feed formats", snippet: "Supported feed formats and field mappings.", category: "Integration guides", route: "Inventory & Catalog Integrations" },
  { title: "Feed reconciliation", snippet: "How stock changes are matched and conflicts are reported.", category: "Integration guides", route: "Inventory & Catalog Integrations" },
  { title: "Listing provenance", snippet: "Recording where each catalog field came from.", category: "Integration guides", route: "Inventory & Catalog Integrations" },
  { title: "Component status", snippet: "Live and historical status for each platform component.", category: "Operations", route: "Platform Status" },
  { title: "Incident history", snippet: "Past incidents, their impact and resolution notes.", category: "Operations", route: "Platform Status" },
];

export const docCategories = ["API reference", "Integration guides", "Operations"];

export const readinessItems = [
  "We know which organization and role will own this integration",
  "We've confirmed the market where it will run",
  "We know who owns the data being exchanged",
  "Security review contacts are identified",
  "We have a plan for testing with synthetic data",
  "Support and incident handoff contacts are agreed",
];

export const accessSteps = [
  { title: "Interest", text: "You tell us what you want to build." },
  { title: "Organization verification", text: "Your organization and role are confirmed." },
  { title: "Scoped access", text: "Least-privilege scopes reviewed by approvers." },
  { title: "Testing", text: "Synthetic fixtures only — no live customer data." },
  { title: "Production", text: "Separate product, security and operational approval." },
];

export const capabilities = ["Listings and inventory", "Catalog and parts data", "Orders and service bookings", "Webhooks and events", "Leads and CRM"];

export const environments = ["Testing with synthetic data", "Production (after testing)"];

export const credentialRules = ["Secrets are never shown in public pages, URLs or logs", "Scopes are requested and approved individually", "Credentials can be revoked with an audit record"];

export const faqs: Faq[] = [
  {
    q: "What is the Developer Hub?",
    a: "It is a starting point for understanding available integration topics, locating maintained technical references and seeing the requirements for requesting appropriate access. It is not itself proof that a particular API or connector is live.",
  },
  { q: "Can I read documentation without an account?", a: "Yes, for anything labelled Public. Partner and pilot content needs a verified organization and approved access." },
  { q: "How do I find API documentation?", a: "Open API Documentation from the integration routes above, or search the public documentation." },
  { q: "How are webhooks documented?", a: "The Webhooks reference covers event topics, signature verification and delivery semantics. Some of it needs partner access." },
  { q: "Can DriverXtra integrate with inventory systems?", a: "Inventory & Catalog Integrations explains supported feed formats, mappings and reconciliation." },
  { q: "Can I integrate orders or service bookings?", a: "Order and booking flows are in pilot. Scope is limited to approved participants and may change." },
  { q: "Where do I check whether services are working?", a: "Platform Status shows current and historical component status from an authoritative source." },
  { q: "Do I receive an API key by signing up?", a: "No. Credentials are only issued after your organization is verified and the scopes you need are approved." },
  { q: "Is a sandbox available?", a: "Testing uses synthetic fixtures only. Availability depends on your capability and market — check current documentation." },
  { q: "Which SDKs are supported?", a: "Only SDKs listed in the API Documentation are supported. Anything else should be treated as unofficial." },
  { q: "How do I request technical access?", a: "Use the request form on this page. It records your request and routes it to the right owner — there's no promise of approval time." },
  { q: "Are APIs available in every market?", a: "No. Availability is labelled per market and organization. Unknown means it isn't confirmed yet." },
  { q: "How should I handle API credentials?", a: "Store them in a secrets manager, never in code, URLs or logs, and request only the scopes you need." },
  { q: "Where do I report a documentation issue?", a: "Use Report a problem in the Security & privacy section. Don't include secrets or personal data." },
  { q: "How do version changes affect my integration?", a: "Breaking changes come with a new version and a deprecation notice. Each reference shows its version and last review date." },
  { q: "Do green status labels guarantee my own integration works?", a: "No. Platform Status covers DriverXtra components, not your own systems or network." },
  { q: "Can my organization access another organization's integration settings?", a: "No. Access is scoped to your own verified organization." },
  { q: "Does submitting an integration request create a commercial agreement?", a: "No. A request starts a technical review. Any commercial terms are agreed separately." },
];
