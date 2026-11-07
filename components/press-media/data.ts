import type { Faq } from "@/components/ui/FaqSection";

export const IMG = "/images/press-media";

/* ---------- Start here ---------- */
export const START_ROUTES = [
  {
    title: "Media inquiry",
    body: "Interviews, comment, events or corrections.",
    href: "#media-inquiry",
    icon: "message",
    image: `${IMG}/start-media-inquiry.webp`,
    alt: "Speaker presenting to a small audience in a brick-walled office",
  },
  {
    title: "Media resources",
    body: "Approved logos, imagery and documents, with usage terms.",
    href: "#media-resources",
    icon: "file",
    image: `${IMG}/start-media-resources.webp`,
    alt: "Abstract teal and orange liquid texture",
  },
  {
    title: "Published announcements",
    body: "Official statements live in the Newsroom.",
    href: "#newsroom",
    icon: "globe",
    image: `${IMG}/start-published-announcements.webp`,
    alt: "Hand signing a printed document",
  },
  {
    title: "General help",
    body: "Accounts, orders and support questions.",
    href: "/enterprise-contact",
    icon: "help",
    image: `${IMG}/start-general-help.webp`,
    alt: "Two colleagues high-fiving across a desk",
  },
] as const;

/* ---------- Media resources ---------- */
export type ResourceStatus = "usage" | "permission" | "unavailable";

export const RESOURCE_TYPES = ["Logo", "Product image", "Photography", "Document"] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export type MediaResource = {
  id: string;
  title: string;
  type: ResourceType;
  formats: string;
  version: string;
  status: ResourceStatus;
  terms: string;
  image: string;
  alt: string;
};

export const STATUS_LABEL: Record<ResourceStatus, string> = {
  usage: "Usage terms apply",
  permission: "Permission required",
  unavailable: "Unavailable for public use",
};

export const RESOURCES: MediaResource[] = [
  {
    id: "logo-full-colour",
    title: "DriverXtra logo — full colour",
    type: "Logo",
    formats: "SVG · PNG",
    version: "v3 · 1 Sep 2026",
    status: "usage",
    terms: "Use unaltered on light backgrounds with clear space around the mark. Don't imply endorsement or partnership.",
    image: `${IMG}/resource-logo-full-colour.webp`,
    alt: "Blue glass office towers seen from below",
  },
  {
    id: "logo-reversed",
    title: "DriverXtra logo — reversed",
    type: "Logo",
    formats: "SVG · PNG",
    version: "v3 · 1 Sep 2026",
    status: "usage",
    terms: "Use unaltered on dark backgrounds with clear space around the mark. Don't imply endorsement or partnership.",
    image: `${IMG}/resource-logo-reversed.webp`,
    alt: "Close-up of code on a dark screen",
  },
  {
    id: "marketplace-screenshots",
    title: "Marketplace screenshots",
    type: "Product image",
    formats: "PNG",
    version: "v2 · 20 Sep 2026",
    status: "permission",
    terms: "Request permission through a media inquiry before publishing. Screens may change and must not be edited.",
    image: `${IMG}/resource-marketplace-screenshots.webp`,
    alt: "Laptop on a white desk showing code beside a plant",
  },
  {
    id: "vehicle-lifestyle",
    title: "Vehicle lifestyle imagery",
    type: "Photography",
    formats: "JPG",
    version: "v1 · 5 Aug 2026",
    status: "usage",
    terms: "Editorial use only, credited to DriverXtra. Don't crop in a way that changes the meaning of the image.",
    image: `${IMG}/resource-vehicle-lifestyle.webp`,
    alt: "Dark sports car parked on an empty rooftop under cloudy skies",
  },
  {
    id: "parts-services",
    title: "Parts and services imagery",
    type: "Photography",
    formats: "JPG",
    version: "v1 · 5 Aug 2026",
    status: "permission",
    terms: "Request permission through a media inquiry before publishing. Some images include third-party products.",
    image: `${IMG}/resource-parts-services.webp`,
    alt: "Mechanic pouring engine oil into a car engine",
  },
  {
    id: "company-fact-sheet",
    title: "Company fact sheet",
    type: "Document",
    formats: "PDF",
    version: "Pending update",
    status: "unavailable",
    terms: "The fact sheet is being updated and isn't available for public use yet. Approved facts are listed below.",
    image: `${IMG}/resource-company-fact-sheet.webp`,
    alt: "Hand writing on a sheet of paper with a pen",
  },
];

/* ---------- Company facts ---------- */
export const COMPANY_FACTS = [
  { label: "Trading name", value: "DriverXtra" },
  { label: "Relationship", value: "DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko Group company." },
  { label: "What it does", value: "A marketplace for vehicles, parts and automotive services." },
];

/* ---------- Newsroom ---------- */
export const ANNOUNCEMENTS = [
  {
    title: "Example announcement: marketplace update",
    date: "1 Oct 2026",
    image: `${IMG}/announcement-marketplace-update.webp`,
    alt: "White truck on a desert highway",
  },
  {
    title: "Example announcement: partner program",
    date: "12 Sep 2026",
    image: `${IMG}/announcement-partner-program.webp`,
    alt: "Speaker presenting to a small audience",
  },
  {
    title: "Example announcement: safety guidance",
    date: "28 Aug 2026",
    image: `${IMG}/announcement-safety-guidance.webp`,
    alt: "Person using a laptop and phone in a café",
  },
];

/* ---------- Media inquiry ---------- */
export const REQUEST_TYPES = [
  "Interview request",
  "Request for comment or statement",
  "Brand or media resource",
  "Event or speaking",
  "Correction to published coverage",
  "Other media request",
];

export const WHAT_TO_INCLUDE = [
  "Your outlet and topic",
  "Any deadline and your time zone",
  "Links to published coverage, if it's a correction",
];

/* ---------- FAQ ---------- */
export const PRESS_FAQS: Faq[] = [
  {
    q: "Where can I find DriverXtra announcements?",
    a: "Visit the Newsroom for published corporate announcements and any official correction or withdrawal notices. This Press & Media page is primarily for resources and requests.",
  },
  {
    q: "How do I contact the media team?",
    a: "Use the media inquiry form on this page. It routes your request to Corporate Communications with the details they need.",
  },
  {
    q: "How quickly will I receive a reply?",
    a: "We review every inquiry, but there's no response guarantee. A deadline you share helps us prioritise; it isn't an accepted turnaround.",
  },
  {
    q: "Can I request an executive interview?",
    a: "Yes. Choose “Interview request” in the media inquiry form and tell us your outlet, topic and timing. Availability isn't guaranteed.",
  },
  {
    q: "May I download and use the DriverXtra logo?",
    a: "Approved logo files are listed under Media resources. Review the usage terms first, and don't alter the logo or imply endorsement.",
  },
  {
    q: "Can I reuse photos from the media kit?",
    a: "Some imagery is available under usage terms; other images need permission first. Each resource shows which applies.",
  },
  {
    q: "Where are official company facts published?",
    a: "The approved company snapshot on this page lists facts confirmed by Corporate Communications. We don't publish estimates of size, reach or results.",
  },
  {
    q: "Are embargoed statements available here?",
    a: "No. Embargoed material is never shared through this page, the inquiry form or any other public channel.",
  },
  {
    q: "Can I request a statement about a product or incident?",
    a: "Yes. Choose “Request for comment or statement” and include your deadline and what the statement is for.",
  },
  {
    q: "Can I request correction of an announcement?",
    a: "Choose “Correction to published coverage” and include links to the coverage or announcement. Any official correction is published in the Newsroom.",
  },
  {
    q: "Why is a media resource missing?",
    a: "Resources appear only once they're approved for public use. Some may be pending update or withdrawn; ask through a media inquiry if you need something specific.",
  },
  {
    q: "Do I need a journalist account?",
    a: "No account is needed. Submit the media inquiry form with a reply email address at your publication or organisation.",
  },
  {
    q: "What information is needed for a request?",
    a: "Your name, publication or organisation, a reply email, the type of request and how we can help. A deadline and time zone are optional.",
  },
  {
    q: "Can I attach supporting documents?",
    a: "The form doesn't accept attachments. Include links in your message, and we'll ask for anything else we need.",
  },
  {
    q: "How is media inquiry information handled?",
    a: "Your details are used only to review and respond to your inquiry. Don't include sensitive personal data or anything under embargo.",
  },
  {
    q: "Can I track my inquiry?",
    a: "There's no tracking for media inquiries. If we need more information, we'll reply to the email address you provide.",
  },
  {
    q: "How do I report a fraudulent media contact?",
    a: "If someone claims to represent DriverXtra and asks for payment or embargoed material, don't engage. Report it through our fraud reporting page.",
  },
  {
    q: "Where should I go for support or partnerships?",
    a: "This page is for media only. For support, contact DriverXtra; for partnerships, see Partner With Us.",
  },
];
