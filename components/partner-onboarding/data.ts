import type { Faq } from "@/components/ui/FaqSection";
import type { PartnerIcon } from "@/components/partner-program/icons";

/** `label` matches the footer label, so links resolve through `hrefFor`. */
export const programs: { label: string; text: string; icon: PartnerIcon; activity: string }[] = [
  {
    label: "Become a Service Provider",
    text: "Automotive service businesses — branches, services and credentials.",
    icon: "wrench",
    activity: "Repair, maintain or detail vehicles",
  },
  { label: "Become a Parts Seller", text: "Parts sellers — provenance, catalog, fitment and fulfilment.", icon: "clipboard", activity: "Sell automotive parts" },
  {
    label: "OEM & Distributor Program",
    text: "Manufacturers, brand owners, distributors and importers — rights scope.",
    icon: "building",
    activity: "Manufacture or hold rights to a brand",
  },
  {
    label: "Inspection Partner Program",
    text: "Inspection organizations and qualified inspectors — methods and independence.",
    icon: "eye",
    activity: "Inspect vehicles",
  },
  { label: "Transport Partner Program", text: "Carriers and brokers — authority, capacity and custody evidence.", icon: "truck", activity: "Move vehicles or arrange transport" },
  {
    label: "Finance & Insurance Partners",
    text: "Regulated finance and insurance organizations — licensed scope and referrals.",
    icon: "card",
    activity: "Provide finance or insurance",
  },
];

export const orgTypes = [
  { id: "sole-trader", label: "Sole trader or individual", note: "Some programs need a registered legal entity. Each program page says whether individuals can apply in your market." },
  { id: "company", label: "Registered company", note: "Your registered legal name and an authorized representative are needed once, then shared across programs." },
  { id: "partnership", label: "Partnership", note: "Tell us who is authorized to act for the partnership. Some actions may need evidence from each partner." },
  { id: "group", label: "Group or parent company", note: "A parent can start the application, but each affiliate's legal entity is reviewed separately." },
  { id: "other", label: "Public body or other organization", note: "We'll confirm which programs are open to your organization type in your market." },
];

export const comparison = [
  ["Become a Service Provider", "Business, branches, credentials", "Category safety and licensing", "Service listings, where supported"],
  ["Become a Parts Seller", "Business, provenance, catalog", "Fitment and restricted items", "Selling for approved categories"],
  ["OEM & Distributor Program", "Entity, rights documents", "Brand, territory and channel scope", "Catalog rights for confirmed scope"],
  ["Inspection Partner Program", "Sites, inspector qualifications", "Method and independence", "Inspection services, when accepted"],
  ["Transport Partner Program", "Authority, vehicles, drivers, insurance", "Carrier vs broker role", "Dispatch eligibility for approved capacity"],
  ["Finance & Insurance Partners", "Regulatory status, products", "Licensed scope and compensation", "Consent-based referrals"],
];

export const onboardingSteps = [
  { title: "Choose a pathway", text: "One or more programs" },
  { title: "Organization profile", text: "Legal identity and representative — once" },
  { title: "Program details", text: "Specialist fields and evidence" },
  { title: "Submit for review", text: "We received your application" },
  { title: "Decision and agreement", text: "Separate per program" },
  { title: "Activation", text: "Specific capabilities, possibly limited" },
];

export const preparation: { icon: PartnerIcon; title: string; text: string }[] = [
  { icon: "building", title: "Registered legal name", text: "Use your organization's registered legal name. A trading name by itself may not establish legal identity." },
  { icon: "user", title: "Authorized representative", text: "Tell us who is authorized to act for the organization. Some actions may require additional authorization evidence." },
  { icon: "globe", title: "Scope", text: "Where and how you intend to operate. We assess permissions for specific programs, markets and capabilities." },
  { icon: "file", title: "Program evidence", text: "Provide the documents requested for each program. Upload securely; requirements vary by role and market." },
  { icon: "lock", title: "Secure sign-in", text: "Your application is private to your organization and resumes only after sign-in." },
];

export type StatusTone = "neutral" | "amber" | "red" | "green";

export const toneStyles: Record<StatusTone, { dot: string; text: string }> = {
  neutral: { dot: "border border-slate-400 bg-white", text: "text-slate-700" },
  amber: { dot: "bg-amber-500", text: "text-amber-700" },
  red: { dot: "bg-red-600", text: "text-red-700" },
  green: { dot: "bg-emerald-500", text: "text-emerald-700" },
};

export const statuses: { label: string; text: string; tone: StatusTone }[] = [
  { label: "Draft", text: "Saved — not submitted. No review has begun.", tone: "neutral" },
  { label: "We received your application", text: "Reference issued. Sign in to check the review status.", tone: "amber" },
  { label: "Internal handoff pending", text: "Your application is saved. Do not submit another one — we retain the receipt while we retry.", tone: "red" },
  { label: "Under review", text: "The reviewing team may request additional information.", tone: "amber" },
  { label: "Information requested", text: "Respond in your workspace so review can continue.", tone: "red" },
  { label: "Decision issued", text: "Approved for a specific scope, or not approved — with reasons where permitted.", tone: "green" },
  { label: "Agreement offered", text: "Terms to review and sign — separate from approval.", tone: "amber" },
  { label: "Activated", text: "Specific capabilities enabled. May be limited, paused on expiry or suspended.", tone: "green" },
];

export const faqs: Faq[] = [
  {
    q: "What is Partner Onboarding?",
    a: "It is a starting point for organizations interested in joining a DriverXtra partner program. It helps you find the relevant pathway, review requirements and submit information for assessment. Applying does not mean you are accepted.",
  },
  { q: "Which types of organizations can apply?", a: "Service businesses, parts sellers, manufacturers and distributors, inspectors, transport operators and regulated finance or insurance organizations — subject to each program's rules." },
  { q: "Can I apply for more than one partner program?", a: "Yes. Your organization profile is shared, and each program is reviewed on its own evidence." },
  { q: "Does submitting an application mean I can start transacting?", a: "No. You can only use capabilities that have been approved, agreed and activated for your organization." },
  { q: "What documents will be required?", a: "Your registered legal identity, an authorized representative and the evidence each program asks for. Requirements vary by role and market." },
  { q: "Do I need an account to explore the programs?", a: "No. You can read every program and use the pathway finder without signing in. Applying needs secure sign-in." },
  { q: "Can a colleague apply on behalf of a company?", a: "Yes, if they're authorized to act for the organization. Some actions may require additional authorization evidence." },
  { q: "How long does onboarding take?", a: "It depends on the programs, your market and how quickly evidence is provided. No completion time is guaranteed." },
  { q: "How will I know my application status?", a: "Sign in to your workspace to see the status of each program separately." },
  { q: "What if I enter the wrong partner category?", a: "Tell us in your workspace. We can move your application to the right program, which may need different evidence." },
  { q: "Can I reuse documents across multiple programs?", a: "Shared identity documents can be reused. Program-specific evidence is reviewed separately." },
  { q: "What if a document expires or is rejected?", a: "We'll tell you what's needed. Capabilities that depend on an expired document may be paused until it's renewed." },
  { q: "Do you guarantee product placement, leads or bookings?", a: "No. Activation enables specific capabilities, not a volume of business." },
  { q: "Will my uploaded documents be public?", a: "No. Evidence is stored securely and only authorized reviewers can access it." },
  { q: "Is there a fee to join?", a: "Any fees would be set out in your program agreement before you sign." },
  { q: "What if my program is not available in my market?", a: "You can register interest. Programs open market by market." },
  { q: "Can my organization appeal or correct a decision?", a: "Where permitted, decisions come with reasons and a way to provide corrected evidence or ask for a review." },
  { q: "Who can help with onboarding?", a: "Partner onboarding contacts will be published for each supported market. Until then, start from this page." },
];
