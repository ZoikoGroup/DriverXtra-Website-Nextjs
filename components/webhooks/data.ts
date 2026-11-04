import type { Faq } from "@/components/ui/FaqSection";

export const deliverySteps = [
  { title: "Event occurs", text: "Something changes in an approved product area.", icon: "zap" },
  { title: "Authorized subscription", text: "Your organization is approved for that event family and environment.", icon: "clipboard" },
  { title: "Validated callback", text: "Your HTTPS endpoint passed ownership and safety checks.", icon: "shield" },
  { title: "Signed attempt", text: "A delivery attempt is signed and sent.", icon: "lock" },
  { title: "You acknowledge", text: "Your receiver verifies, records and responds.", icon: "check" },
] as const;

export type Lifecycle = "Stable" | "Beta";

export type EventFamily = {
  id: string;
  label: string;
  image: string;
  alt: string;
  events: { name: string; text: string; version: string; lifecycle: Lifecycle }[];
};

export const eventFamilies: EventFamily[] = [
  {
    id: "listings",
    label: "Listings",
    image: "/images/webhooks/listings.png",
    alt: "A modern grey car parked outdoors at dusk",
    events: [
      { name: "listing.published", text: "A listing became visible to shoppers.", version: "v1", lifecycle: "Stable" },
      { name: "listing.updated", text: "Listed price or details changed.", version: "v1", lifecycle: "Stable" },
      { name: "listing.withdrawn", text: "A listing was removed from sale.", version: "v1", lifecycle: "Stable" },
    ],
  },
  {
    id: "feeds",
    label: "Inventory feeds",
    image: "/images/webhooks/inventory-feeds.png",
    alt: "Water droplets on glass in teal and orange light",
    events: [
      { name: "feed.run.completed", text: "A feed import run finished.", version: "v1", lifecycle: "Beta" },
      { name: "feed.run.failed", text: "A feed import run stopped with errors.", version: "v1", lifecycle: "Beta" },
    ],
  },
];

export const lifecycleStyles: Record<Lifecycle, { dot: string; text: string }> = {
  Stable: { dot: "bg-emerald-500", text: "text-emerald-700" },
  Beta: { dot: "bg-amber-500", text: "text-amber-700" },
};

export const envelopeFields = [
  { title: "Event ID", text: "Stable for the event. The same event may arrive in more than one attempt — deduplicate on this." },
  { title: "Type", text: "The approved event type, from the published catalog." },
  { title: "Version", text: "The schema version. Breaking changes get a new version." },
  { title: "Time", text: "When the event was created — not when it was delivered." },
  { title: "Data", text: "A minimal payload. Fetch details from the API if you need more." },
];

export const securitySteps = [
  { title: "Use HTTPS you control", text: "Use an approved HTTPS callback that your organization controls. Private or unsafe destinations are not permitted." },
  { title: "Keep the raw body", text: "Verify against the untouched request bytes, before parsing." },
  { title: "Check key ID and timestamp", text: "Reject stale or unknown keys. The freshness window comes from published guidance." },
  { title: "Compare signatures safely", text: "Use a constant-time comparison." },
  { title: "Then process", text: "Only after verification passes." },
];

export const subscriptionSteps = [
  { title: "Organization", text: "Choose your approved organization" },
  { title: "Environment", text: "Non-production or production, where provisioned" },
  { title: "Endpoint", text: "HTTPS callback with ownership checks" },
  { title: "Events", text: "Eligible event families only" },
  { title: "Confirm", text: "Reviews and approvals" },
];

export const troubleshooting = [
  ["Your endpoint returns errors", "Receiver fault", "Check your logs using the event ID — never log secrets."],
  ["Requests time out", "Network or slow processing", "Acknowledge first, then process asynchronously."],
  ["Signature check fails", "Verification fault", "Use the raw body and the correct key ID; check clock skew."],
  ["Nothing arrives", "Subscription or eligibility", "Check subscription status, then Platform Status."],
];

export const versions = [
  ["Listings", "v1", "Not yet published"],
  ["Inventory feeds", "v1 (beta)", "Not yet published"],
];

export const faqs: Faq[] = [
  {
    q: "What are webhooks?",
    a: "Webhooks are an integration pattern in which an approved service sends an event notification to a destination you control. DriverXtra event types and access are available only where officially published and authorized.",
  },
  { q: "Can I browse the guidance without signing in?", a: "Yes. This page and the public event summaries are open to everyone. Subscriptions, secrets and delivery logs need authorized access." },
  { q: "Which DriverXtra events are supported?", a: "Only the event families shown in the catalog above, at the lifecycle stage shown. Restricted families aren't listed publicly." },
  { q: "Can I subscribe to every event?", a: "No. You can subscribe only to event families your organization is approved for, in environments provisioned for you." },
  { q: "Is saving a callback the same as enabling deliveries?", a: "No. A callback must pass ownership and safety checks, and the subscription must be approved, before any delivery is attempted." },
  { q: "What callback URLs are permitted?", a: "HTTPS endpoints that your organization controls. Private, internal or otherwise unsafe destinations are rejected." },
  { q: "How do I know a notification is authentic?", a: "Verify the signature against the raw request body, check the key ID and timestamp, and compare in constant time before processing." },
  { q: "Will I see my signing secret again?", a: "No. A signing secret is shown once when it's created. If it's lost, rotate it and update your receiver." },
  { q: "Do events arrive exactly once or in order?", a: "Not unless a published contract says so. Expect duplicates, delays and out-of-order delivery, and deduplicate on the event ID." },
  { q: "Does a successful HTTP response prove my business action completed?", a: "No. It only acknowledges receipt. Your own processing and any follow-up calls are separate." },
  { q: "What happens if my endpoint is unavailable?", a: "An event can have several delivery attempts. Retry timing isn't published for this integration — refer to your approved agreement." },
  { q: "Can I replay a failed event?", a: "Replay availability depends on your agreement. There's no public replay control on this page." },
  { q: "Can I test with sample events?", a: "Test events use synthetic fixtures in a non-production environment, where one has been provisioned for your organization." },
  { q: "Why can't I see a delivery payload?", a: "Payloads are minimized and access-controlled. Authorized users can see delivery details for their own organization only." },
  { q: "How should I rotate signing keys?", a: "Accept both the old and the new key during the overlap, switch to the new key ID, then retire the old key." },
  { q: "What do the health metrics mean?", a: "They summarize recent delivery attempts for your subscription. They describe delivery, not whether your business processing succeeded." },
  { q: "How do I report a delivery incident?", a: "Check Platform Status first, then report a problem from the Developer Hub with the event ID. Never include secrets." },
  { q: "What happens when I stop the subscription?", a: "New deliveries stop. Events already in flight may still arrive, so keep your receiver tolerant for a short while." },
];
