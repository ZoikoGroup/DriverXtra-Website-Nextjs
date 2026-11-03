import type { Faq } from "@/components/ui/FaqSection";
import type { RoleCard } from "@/components/partner-program/RoleCards";
import type { ServiceRule } from "@/components/partner-program/EligibilityChecker";
import type { PartnerIcon } from "@/components/partner-program/icons";

export const roles: RoleCard[] = [
  { id: "lender", title: "Lender or lessor", text: "Provides credit or leases under its own authorization.", icon: "card" },
  { id: "credit-intermediary", title: "Credit intermediary", text: "Arranges finance with lenders — a different role from lending.", icon: "scale" },
  { id: "insurer", title: "Insurer", text: "Carries the insurance risk and sets policy terms.", icon: "shield" },
  { id: "insurance-intermediary", title: "Insurance intermediary", text: "Arranges or distributes insurance — not the risk carrier.", icon: "umbrella" },
];

export const approvalStages = ["Inquiry received", "Regulatory status confirmed", "Product scope approved", "Agreement signed", "Referrals enabled", "Live with consumers"];

export const products: ServiceRule[] = [
  { id: "vehicle-loans", label: "Vehicle loans", gates: ["Representative example and APR disclosures for each loan product", "How affordability and credit checks are carried out"] },
  { id: "vehicle-leases", label: "Vehicle leases", gates: ["Lease terms, mileage limits and end-of-lease charges", "Disclosures shown before a consumer continues"] },
  {
    id: "personal-insurance",
    label: "Personal vehicle insurance",
    gates: ["Policy documents and product information for each cover level", "How premiums, excess and exclusions are shown before purchase"],
  },
  {
    id: "commercial-insurance",
    label: "Commercial & fleet insurance",
    gates: ["Business-use declarations and fleet eligibility rules", "Policy documents for each commercial product"],
  },
  {
    id: "optional-protection",
    label: "Optional protection products",
    gates: ["Who carries the risk and who arranges the product", "Cancellation rights and how the product is sold separately"],
    note: "Optional products are reviewed for fair value and must never be bundled into a comparison without consent.",
  },
];

const finance = ["vehicle-loans", "vehicle-leases"];
const insurance = ["personal-insurance", "commercial-insurance", "optional-protection"];

export const roleScope = {
  allowed: { lender: finance, "credit-intermediary": finance, insurer: insurance, "insurance-intermediary": insurance },
  note: "This product sits outside the role you chose. Finance and insurance roles are reviewed separately — if your organization performs both, each role needs its own authorization and review.",
};

export const roleGates: Record<string, string[]> = {
  lender: ["Your lending or leasing authorization and its scope", "How you make credit decisions and issue agreements"],
  "credit-intermediary": ["Your credit-broking authorization and its scope", "The lenders you work with, and how you're paid by them"],
  insurer: ["Your insurer authorization and the classes of business it covers", "How you handle claims and complaints"],
  "insurance-intermediary": ["Your intermediary authorization or appointment", "The insurers you arrange cover with, and how you're paid"],
};

export const commonGates = ["Legal entity details for each market", "Your compensation model, so it can be disclosed", "How you use referred consumer data, and for what purpose"];

export const requirements: { icon: PartnerIcon; title: string; text: string }[] = [
  { icon: "building", title: "Legal entity", text: "Registered identity for each market you operate in." },
  { icon: "shield", title: "Regulatory status", text: "Your licence or registration and its scope — recorded as declared until reviewed." },
  { icon: "tag", title: "Products", text: "Which finance or insurance products you hope to support." },
  { icon: "scale", title: "Compensation model", text: "How, if at all, you pay DriverXtra — to be disclosed." },
  { icon: "lock", title: "Data handling", text: "How you use referred consumer data, and for what purpose." },
];

export const financeRoles: [string, string][] = [
  ["Lender or lessor", "decides credit and owns the agreement"],
  ["Credit intermediary", "introduces or arranges; doesn't lend"],
];

export const insuranceRoles: [string, string][] = [
  ["Insurer", "carries the risk and handles claims"],
  ["Intermediary or broker", "arranges cover; doesn't underwrite"],
];

export const compensationModels = [
  ["No payment to DriverXtra", "Stated on the partner profile"],
  ["Referral fee", "Disclosed before a consumer continues"],
  ["Commission", "Disclosed before a consumer continues"],
  ["Sponsored placement", "Labelled and kept separate from rankings"],
];

export const referralSteps = [
  { title: "Consumer chooses you", text: "From a comparison, never automatically." },
  { title: "Consent shown", text: "Named partner, purpose and data listed first." },
  { title: "Consumer agrees", text: "Marketing consent is separate and optional." },
  { title: "Handoff", text: "Only the agreed data, to the named partner." },
  { title: "Your process", text: "You assess, decide and issue documents." },
];

export const faqs: Faq[] = [
  {
    q: "Can my organization become a finance partner?",
    a: "You may explore an application if your organization can identify its legal capacity, intended operating market and product scope. Any participation is subject to evidence-based review, commercial terms and applicable market requirements.",
  },
  {
    q: "Can an insurance broker apply even if it does not underwrite policies?",
    a: "Yes. Insurance intermediaries are reviewed in their own role. A broker application doesn't establish insurer status.",
  },
  { q: "Is submitting the form the same as becoming a partner?", a: "No. Submitting documents doesn't confirm authorization, approval or partnership status." },
  {
    q: "Does DriverXtra make lending decisions or issue insurance?",
    a: "No. Lenders decide credit and insurers carry the risk. DriverXtra compares options and makes consent-based referrals.",
  },
  { q: "What information do we need to provide?", a: "Your legal entity, regulatory status, product scope, compensation model and how you handle referred consumer data." },
  { q: "Can one parent company apply for all affiliates?", a: "A parent can start the inquiry, but each affiliate's legal entity and authorization is reviewed separately." },
  { q: "What happens if our market is not listed?", a: "Markets are added one at a time. You can register interest, and we'll explain the pathway once your market is supported." },
  { q: "Will we receive a guaranteed reply within a stated time?", a: "We aim to reply promptly, but review times depend on your role, products and market, so no reply time is guaranteed." },
  { q: "Are there joining fees or commissions?", a: "Any fees or commissions would be set out in your agreement before you sign, and disclosed to consumers where required." },
  { q: "When can we receive consumer referrals?", a: "Only once your regulatory status and product scope are confirmed, an agreement is signed and referrals are enabled." },
  { q: "Can we connect through an API or webhook?", a: "Technical handoff options are agreed during onboarding. Only the data a consumer agreed to share is ever sent." },
  { q: "How is our business documentation protected?", a: "Evidence is reviewed privately, stored securely with restricted access and kept only as long as it's needed." },
  { q: "Can we submit multiple product categories?", a: "Yes. Each product category is reviewed and approved on its own scope." },
  { q: "Does a verification badge endorse our products?", a: "No. A badge shows that your status was reviewed. It isn't a recommendation of your products." },
  {
    q: "What if our license, registration or appointment expires?",
    a: "Referrals for the affected scope are paused until a current status is confirmed.",
  },
  { q: "Can we change the authorized company contact?", a: "Yes. Contact changes are verified before they take effect." },
  { q: "How do we correct a rejected document or application?", a: "We'd tell you what's missing or why, and you can resubmit corrected evidence for review." },
  {
    q: "Where can consumers compare available finance or insurance services?",
    a: "Consumers can compare finance and insurance options on DriverXtra's Compare Vehicle Finance and Compare Insurance pages, where partners are available in their market.",
  },
];
