import type { Faq } from "@/components/ui/FaqSection";

export type AccessClass = "public" | "partner" | "unpublished";

export const accessClasses: Record<AccessClass, { label: string; dot: string; text: string }> = {
  public: { label: "Public", dot: "bg-emerald-500", text: "text-emerald-700" },
  partner: { label: "Partner-restricted", dot: "bg-amber-500", text: "text-amber-700" },
  unpublished: { label: "Not yet published", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
};

export const families = [
  { id: "listings", label: "Listings (demo)", published: true },
  { id: "parts", label: "Parts catalog — not yet published", published: false },
];

export const versions = [
  { id: "2026-10-01", label: "2026-10-01 — Current", status: "current" as const },
  { id: "2026-04-01", label: "2026-04-01 — Deprecated", status: "deprecated" as const },
];

export type Param = { name: string; in: string; type: string; required: boolean; description: string; since?: string };
export type Property = { name: string; type: string; presence: "Required" | "Nullable" | "Optional"; description: string; nested?: boolean };
export type ErrorRow = { status: string; code: string; meaning: string; retry: string };

export type Operation = {
  id: string;
  method: "GET" | "POST";
  title: string;
  path: string;
  summary: string;
  access: AccessClass;
  owner: string;
  reviewed: string;
  scope: string;
  params: Param[];
  requestBody: string;
  responseStatus: string;
  properties: Property[];
  example: string;
  errors: ErrorRow[];
  pagination: string;
  idempotency: string;
  /** Changes made in each version; the first entry is the version that introduced the operation. */
  changes: { version: string; note: string }[];
};

const commonErrors: ErrorRow[] = [
  { status: "400", code: "invalid_parameter", meaning: "A parameter is malformed.", retry: "No — fix the request" },
  { status: "401", code: "unauthorized", meaning: "Credentials missing or invalid.", retry: "No" },
  { status: "429", code: "rate_limited", meaning: "Too many requests.", retry: "Yes — with backoff" },
  { status: "5xx", code: "server_error", meaning: "Temporary service problem.", retry: "Yes — with backoff" },
  { status: "Other", code: "—", meaning: "Undocumented — don't assume behavior", retry: "Not specified" },
];

export const operations: Operation[] = [
  {
    id: "list-listings",
    method: "GET",
    title: "List listings",
    path: "/v1/listings",
    summary: "Returns a page of listings visible to your organization.",
    access: "public",
    owner: "Marketplace API team (demo)",
    reviewed: "1 Oct 2026",
    scope: "listings:read",
    params: [
      { name: "page_cursor", in: "query", type: "string", required: false, description: "Opaque cursor from a previous response." },
      { name: "limit", in: "query", type: "integer", required: false, description: "Maximum items per page. Allowed range: not specified." },
      { name: "make", in: "query", type: "string", required: false, description: "Filter by vehicle make.", since: "2026-10-01" },
    ],
    requestBody: "None for this operation.",
    responseStatus: "200",
    properties: [
      { name: "items", type: "array", presence: "Required", description: "Listings in this page." },
      { name: "items[].id", type: "string", presence: "Required", description: "Listing identifier.", nested: true },
      { name: "items[].title", type: "string", presence: "Required", description: "Display title.", nested: true },
      { name: "items[].price", type: "object", presence: "Nullable", description: "Price and currency, when published.", nested: true },
      { name: "next_cursor", type: "string", presence: "Nullable", description: "Cursor for the next page; absent on the last page." },
    ],
    example: `GET /v1/listings?make=Example&limit=2
Authorization: Bearer <YOUR_APPROVED_TOKEN>

200 OK
{
  "items": [
    { "id": "lst_demo_001", "title": "2021 Example Hatchback",
      "price": { "amount": 14995, "currency": "GBP" } }
  ],
  "next_cursor": null
}`,
    errors: commonErrors,
    pagination: "Cursor-based: pass next_cursor as page_cursor. Ordering is stable within a cursor sequence.",
    idempotency: "Not applicable — read-only.",
    changes: [
      { version: "2026-04-01", note: "Initial version" },
      { version: "2026-10-01", note: "Added the make filter (demonstration change log)" },
    ],
  },
  {
    id: "get-listing",
    method: "GET",
    title: "Get a listing",
    path: "/v1/listings/{listing_id}",
    summary: "Returns one listing visible to your organization.",
    access: "public",
    owner: "Marketplace API team (demo)",
    reviewed: "1 Oct 2026",
    scope: "listings:read",
    params: [{ name: "listing_id", in: "path", type: "string", required: true, description: "The listing identifier, for example lst_demo_001." }],
    requestBody: "None for this operation.",
    responseStatus: "200",
    properties: [
      { name: "id", type: "string", presence: "Required", description: "Listing identifier." },
      { name: "title", type: "string", presence: "Required", description: "Display title." },
      { name: "price", type: "object", presence: "Nullable", description: "Price and currency, when published." },
      { name: "status", type: "string", presence: "Required", description: "Listing status, such as active or sold." },
    ],
    example: `GET /v1/listings/lst_demo_001
Authorization: Bearer <YOUR_APPROVED_TOKEN>

200 OK
{
  "id": "lst_demo_001",
  "title": "2021 Example Hatchback",
  "price": { "amount": 14995, "currency": "GBP" },
  "status": "active"
}`,
    errors: [
      commonErrors[1],
      { status: "404", code: "not_found", meaning: "No listing with this ID is visible to you.", retry: "No" },
      ...commonErrors.slice(2),
    ],
    pagination: "Not applicable — returns a single listing.",
    idempotency: "Not applicable — read-only.",
    changes: [{ version: "2026-04-01", note: "Initial version" }],
  },
  {
    id: "create-listing",
    method: "POST",
    title: "Create a listing",
    path: "/v1/listings",
    summary: "Creates a listing for your organization.",
    access: "partner",
    owner: "Marketplace API team (demo)",
    reviewed: "1 Oct 2026",
    scope: "listings:write",
    params: [],
    requestBody: "",
    responseStatus: "201",
    properties: [],
    example: "",
    errors: [],
    pagination: "",
    idempotency: "",
    changes: [],
  },
];

export type Guide = { id: string; title: string; summary: string; sections: { heading: string; body: string; list?: string[] }[] };

export const guides: Guide[] = [
  {
    id: "quickstart",
    title: "Quickstart",
    summary: "The path from reading the reference to a first approved request.",
    sections: [
      {
        heading: "Before you start",
        body: "Public reference pages can be read without an account. Calling an operation needs a verified organization and approved scopes.",
        list: ["Read the reference for the operation you need", "Request technical access from the Developer Hub", "Test with synthetic data only", "Ask for production approval separately"],
      },
      { heading: "Your first request", body: "Once a scope is approved, send a read-only request such as List listings with a small limit and check the response shape against this reference." },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    summary: "How requests are authenticated and how scopes are granted.",
    sections: [
      { heading: "Bearer tokens", body: "Requests send an approved token in the Authorization header. Tokens are issued per organization and environment." },
      {
        heading: "Scopes",
        body: "Each operation lists the scope it needs. Request only the scopes you'll use — each is reviewed individually.",
        list: ["Never put tokens in URLs, code repositories or logs", "Rotate tokens if you suspect exposure", "Revoked tokens stop working immediately"],
      },
    ],
  },
  {
    id: "errors",
    title: "Errors",
    summary: "How errors are returned and when it's safe to retry.",
    sections: [
      { heading: "Error shape", body: "Errors return an HTTP status, a stable code and a request ID. Quote the request ID when contacting support — never include secrets." },
      { heading: "Retrying", body: "Retry only where the reference says it's safe, using exponential backoff. Fix malformed requests instead of retrying them." },
    ],
  },
  {
    id: "versions",
    title: "Versions",
    summary: "How API versions are named, changed and retired.",
    sections: [
      { heading: "Date-based versions", body: "Versions are named by release date. Each reference page shows its version and last review date." },
      {
        heading: "Deprecation",
        body: "A deprecated version keeps working for a published period, then is retired. Breaking changes always arrive in a new version.",
        list: ["Watch the compatibility section of each operation", "Test against the current version before switching"],
      },
    ],
  },
];

export const tocSections = [
  { id: "authentication", label: "Authentication" },
  { id: "parameters", label: "Parameters" },
  { id: "request-body", label: "Request body" },
  { id: "responses", label: "Responses" },
  { id: "example", label: "Example" },
  { id: "errors", label: "Errors" },
  { id: "pagination", label: "Pagination & retries" },
  { id: "limits", label: "Limits" },
  { id: "compatibility", label: "Compatibility" },
];

export const destinations = [
  { label: "Webhooks", text: "Event topics and signature verification.", icon: "zap", image: "/images/developer-hub/webhooks.png", alt: "Glass office towers against a blue sky" },
  {
    label: "Inventory & Catalog Integrations",
    text: "Feed mappings and reconciliation.",
    icon: "clipboard",
    image: "/images/developer-hub/inventory-and-catalog.png",
    alt: "Water droplets on glass in teal and orange light",
  },
  {
    label: "Order & Booking Integrations",
    text: "Supported transaction flows.",
    icon: "calendar",
    image: "/images/developer-hub/order-and-booking.webp",
    alt: "A person leaning against a classic car in a workshop",
  },
  {
    label: "Security & Integration Guidance",
    text: "Auth, scopes and secret handling.",
    icon: "shield",
    image: "/images/developer-hub/security-guidance.png",
    alt: "A phone and paperwork on a desk",
  },
] as const;

export const faqs: Faq[] = [
  {
    q: "What is included in API Documentation?",
    a: "It explains approved API reference material and integration concepts, including operation definitions, required inputs, output structures, errors and applicable version information where those details have been published.",
  },
  { q: "Do I need an account to read the documentation?", a: "No, for pages marked Public. Partner-restricted pages need a verified organization and approved access." },
  { q: "Are all API integrations available in every market?", a: "No. Availability depends on your organization, market and program." },
  { q: "Where can I find available API versions?", a: "Use the Version menu in the reference sidebar. Each version shows whether it's current or deprecated." },
  { q: "Does a published endpoint mean I can call it?", a: "No. Calling an operation needs approved access and the scope listed on its page." },
  { q: "Can I request API access here?", a: "Access requests go through the Developer Hub, where they're routed to the right owner." },
  { q: "Is there a public sandbox or try-it tool?", a: "No public try-it tool is offered. Approved testing uses synthetic data only." },
  { q: "Which authentication method does the API use?", a: "Bearer tokens with operation-level scopes. See the Authentication guide." },
  { q: "How can I understand a request field?", a: "Each operation's Parameters table lists where the field goes, its type, whether it's required and what it means." },
  { q: "Are the code examples safe to run?", a: "Examples use synthetic data and placeholder tokens. They're for illustration — never paste real credentials into them." },
  { q: "Where are error codes explained?", a: "In each operation's Errors section and in the Errors guide." },
  { q: "Are there rate limits or usage quotas?", a: "Where limits are documented they're shown under Limits. If a limit isn't specified, confirm current terms before relying on any assumed limit." },
  { q: "How do pagination and retries work?", a: "List operations use cursors. Retry only where the reference says it's safe, with backoff." },
  { q: "Where do I find webhook information?", a: "Webhooks have their own reference, reached through the Developer Hub." },
  { q: "What happens when an API version is deprecated?", a: "It keeps working for a published period before retirement. Move to the current version before then." },
  { q: "How do I report unclear documentation?", a: "Use the feedback at the end of each page, or report a problem from the Developer Hub. Don't include secrets or personal data." },
  { q: "Where can I check whether the platform is operating?", a: "Platform Status shows current and historical component status." },
  { q: "Can I download schemas or SDKs?", a: "Only where a reference page links to them. Anything else should be treated as unofficial." },
];
