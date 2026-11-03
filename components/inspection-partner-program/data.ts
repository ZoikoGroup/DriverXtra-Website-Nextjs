import type { Faq } from "@/components/ui/FaqSection";
import type { RoleCard } from "@/components/partner-program/RoleCards";
import type { ServiceRule } from "@/components/partner-program/EligibilityChecker";
import type { PartnerIcon } from "@/components/partner-program/icons";

export const applicants: RoleCard[] = [
  {
    id: "organization",
    title: "Inspection organization",
    text: "Multiple inspectors and sites under one organization.",
    image: "/images/inspection-partner-program/inspection-organization.webp",
    alt: "Glass office towers against a blue sky",
    icon: "building",
  },
  {
    id: "independent",
    title: "Independent inspector",
    text: "A qualified individual, where your market allows it.",
    image: "/images/inspection-partner-program/independent-inspector.png",
    alt: "Two colleagues giving a high five at a desk",
    icon: "user",
  },
  {
    id: "mobile",
    title: "Mobile inspection service",
    text: "Inspections at the customer's location, with site rules.",
    image: "/images/inspection-partner-program/mobile-inspection-service.png",
    alt: "The silhouette of a black saloon car in low light",
    icon: "car",
  },
];

export const approvalStages = ["Application received", "Organization verified", "Inspectors qualified", "Agreement signed", "Services active", "Bookable"];

export const categories: ServiceRule[] = [
  {
    id: "pre-purchase",
    label: "Pre-purchase inspection",
    gates: ["An approved pre-purchase checklist and method version", "Evidence each inspector is trained on that checklist"],
  },
  {
    id: "condition",
    label: "Condition report",
    gates: ["A condition-grading method with clear definitions", "Secure photo capture linked to each finding"],
  },
  {
    id: "appraisal",
    label: "Appraisal support",
    gates: ["Appraisal credentials where your market requires them", "A stated method — appraisals are opinions, not guaranteed values"],
  },
  {
    id: "diagnostic",
    label: "Diagnostic scan",
    gates: ["Details of scan tools and software versions used", "How fault codes and readings are recorded with units and time"],
  },
  {
    id: "ev-battery",
    label: "EV battery health check",
    gates: ["High-voltage safety qualifications for each inspector", "The battery test method and equipment calibration records"],
  },
  {
    id: "statutory",
    label: "Statutory safety test",
    gates: [],
    note: "Statutory safety and roadworthiness testing is regulated separately and can't be approved through this program. You'd need the relevant authority's own approval for your market.",
  },
];

export const applicantGates: Record<string, string[]> = {
  organization: ["Legal identity and an authorized representative", "Details of each operating site", "Credentials for every inspector who'd carry out work"],
  independent: ["Proof of identity and your own credentials", "Confirmation your market allows independent inspectors", "Professional indemnity insurance, where required"],
  mobile: ["Legal identity and an authorized representative", "Site rules for inspecting at the customer's location", "Insurance covering work away from your premises"],
};

export const commonGates = ["An independence declaration covering dealers, sellers and repairers"];

export const requirements: { icon: PartnerIcon; title: string; text: string }[] = [
  { icon: "building", title: "Organization and sites", text: "Legal identity, representative and each operating site." },
  { icon: "user", title: "Inspector qualifications", text: "Credentials for each inspector, with expiry dates." },
  { icon: "clipboard", title: "Inspection types", text: "The categories you're qualified to provide." },
  { icon: "eye", title: "Methods and exclusions", text: "What you check, and what you can't confirm." },
  { icon: "scale", title: "Independence declaration", text: "Relationships with dealers, sellers or repairers." },
];

export const reportElements = [
  ["Checklist", "Approved method version shown on every report"],
  ["Exclusions", "What wasn't checked is listed clearly"],
  ["Readings", "Measurements recorded with units and time"],
  ["Photos", "Captured securely, linked to the finding"],
  ["Corrections", "Changes are versioned, never silent"],
];

export const declarations = ["Ownership or employment links with dealers or sellers", "Commercial arrangements with repairers", "Any payment linked to inspection outcomes"];

export const evidenceSteps = [
  { title: "Customer permission", text: "Recorded before the inspection starts." },
  { title: "Secure capture", text: "Photos and readings tied to the vehicle and time." },
  { title: "Report issued", text: "With method version and exclusions." },
  { title: "Corrections", text: "Versioned, with a reason — the original stays on record." },
  { title: "Disputes", text: "Handled through a documented review process." },
];

export const bookingSteps = [
  { title: "Requested", text: "A customer asks for an inspection" },
  { title: "Accepted", text: "The partner accepts the request" },
  { title: "Scheduled", text: "Time and place confirmed" },
  { title: "Inspected", text: "Findings captured" },
  { title: "Report issued", text: "Shared with the customer" },
];

export const reviewPoints = [
  "Credentials are tracked with expiry dates — you're reminded before they lapse.",
  "An expired qualification pauses only the inspection types it covers, until it's renewed.",
  "Report quality is sampled and reviewed against the approved method.",
  "Upheld disputes and repeated corrections can trigger a further review.",
];

export const faqs: Faq[] = [
  {
    q: "Who can apply to be an inspection partner?",
    a: "An eligible inspection business or qualified professional may explore the program in a supported market. Your organization, operating site, inspector qualifications and intended services may each require separate review.",
  },
  { q: "Does applying mean DriverXtra has approved my business?", a: "No. Applying starts a review. You're only listed once each required check is complete and an agreement is signed." },
  {
    q: "Can an ordinary repair workshop also provide inspections?",
    a: "Possibly, but any commercial relationship with repairs must be declared, and customers would see it on relevant reports.",
  },
  {
    q: "Does an inspection partner issue a statutory roadworthiness certificate?",
    a: "No. Statutory safety testing is regulated separately. An inspection report on DriverXtra is not a statutory certificate.",
  },
  { q: "Do I need formal inspector licenses or credentials?", a: "Where your market or inspection category requires them, yes. Each inspector's credentials are recorded with expiry dates." },
  {
    q: "Can an inspector assess a vehicle sold by a related dealership?",
    a: "Only where the relationship is declared and the market allows it. Undeclared conflicts may lead to suspension.",
  },
  { q: "What inspection types are covered?", a: "Categories such as pre-purchase inspections, condition reports, diagnostic scans and EV battery checks, depending on market." },
  { q: "Can I provide an appraisal or guaranteed vehicle value?", a: "Appraisal support may be available where qualified, but no report can guarantee a vehicle's value." },
  { q: "How are inspection methods and equipment reviewed?", a: "Methods come from an approved source and are versioned. Equipment and software may need calibration or version records." },
  { q: "How are inspection photos and reports protected?", a: "Evidence is captured securely, linked to the finding and accessible only to authorized roles and the customer." },
  { q: "Will I automatically receive inspection appointments?", a: "No. Requests aren't scheduled until you accept and confirm them. Being listed doesn't guarantee any volume of work." },
  { q: "Can I offer mobile inspections?", a: "Yes, where approved. Mobile services need site rules and insurance covering work at the customer's location." },
  { q: "Does inspection approval mean customers receive a warranty?", a: "No. An inspection report records observed condition at a point in time. It isn't a warranty." },
  { q: "Can I correct a submitted inspection report?", a: "Yes. Corrections are versioned with a reason, and the original stays on record." },
  { q: "What happens if credentials expire?", a: "The inspection types those credentials cover are paused until they're renewed. Other approved types can continue." },
  { q: "Are there fixed partner fees or guaranteed earnings?", a: "Any fees would be set out in your agreement before you sign. There are no guaranteed earnings." },
  { q: "What if my application needs more information or is declined?", a: "We'd tell you what's missing or why, and how to reapply or ask for a review where that's available." },
  {
    q: "How do I contact the partner team?",
    a: "Partner contact details will be published for each supported market. Until then, use the general partner onboarding route.",
  },
];
