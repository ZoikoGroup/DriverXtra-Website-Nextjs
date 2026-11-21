export const disclosureMeta = {
  version: "DEMO-0.1",
  published: "5 Nov 2026 (demonstration)",
};

export type Audience = "buyers" | "sellers" | "parts" | "services" | "finance" | "insurance" | "business";

export const audiences: { id: Audience | "everyone"; label: string }[] = [
  { id: "everyone", label: "Everyone" },
  { id: "buyers", label: "Buyers" },
  { id: "sellers", label: "Sellers & dealers" },
  { id: "parts", label: "Parts" },
  { id: "services", label: "Services" },
  { id: "finance", label: "Finance" },
  { id: "insurance", label: "Insurance" },
  { id: "business", label: "Business & fleets" },
];

export const doesItems = [
  "Runs a marketplace where sellers, dealers and providers list vehicles, parts and services",
  "Publishes guides, research and safety information",
  "Runs specific, limited verification checks",
];

export const doesntItems = [
  "Sell every vehicle or part listed — the seller is shown on each listing",
  "Lend money, underwrite insurance or perform services itself",
  "Guarantee title, condition, fitment or a safe transaction",
];

export const responsibilities = [
  { topic: "Listing content", driverxtra: "Hosts it and moderates reports", provider: "Writes it and is responsible for accuracy" },
  { topic: "Vehicle or part", driverxtra: "—", provider: "Sells it, sets price and terms" },
  { topic: "Service work", driverxtra: "Shows the provider and request", provider: "Confirms and carries out the work" },
  { topic: "Finance", driverxtra: "Shows examples and links", provider: "Lender approves and sets terms" },
  { topic: "Insurance", driverxtra: "Shows examples and links", provider: "Insurer quotes, binds and covers" },
  { topic: "Verification", driverxtra: "Runs the specific check shown", provider: "Provides accurate information" },
];

export type Topic = { id: string; title: string; audiences: Audience[]; points: string[] };

export const topics: Topic[] = [
  {
    id: "listings",
    title: "Vehicle listings and transactions",
    audiences: ["buyers", "sellers"],
    points: [
      "Listings are created by sellers and dealers. DriverXtra doesn't guarantee availability, title or condition.",
      "Prices, fees and availability may change before a transaction is completed.",
      "An asking price isn't a completed sale or a valuation.",
    ],
  },
  {
    id: "representations",
    title: "Dealer and seller representations",
    audiences: ["buyers", "sellers"],
    points: [
      "A verified badge covers a specific identity or business check — not ownership, title, condition or warranty.",
      "Sellers are responsible for the accuracy of what they list.",
    ],
  },
  {
    id: "parts",
    title: "Parts, brands and compatibility",
    audiences: ["parts", "sellers"],
    points: [
      "Fitment information has limits. Unknown fitment is shown as not confirmed, never as compatible.",
      "Brand names belong to their owners. A brand name or photo alone doesn't prove a part is genuine.",
      "Returns and warranties are set by the seller.",
    ],
  },
  {
    id: "services",
    title: "Services and bookings",
    audiences: ["services"],
    points: [
      "A request is not a confirmed booking. The provider confirms timing separately.",
      "Work is carried out by independent providers, who are responsible for it.",
    ],
  },
  {
    id: "finance",
    title: "Vehicle finance information",
    audiences: ["finance", "buyers"],
    points: [
      "Payment examples are estimates, not offers or approvals.",
      "Lenders decide eligibility, rates and terms. Their agreement is the binding document.",
    ],
  },
  {
    id: "insurance",
    title: "Vehicle insurance information",
    audiences: ["insurance", "buyers"],
    points: [
      "A quote or comparison is not confirmation that coverage is active.",
      "Insurers decide underwriting, cover and exclusions. Their policy documents are binding.",
    ],
  },
  {
    id: "fees",
    title: "Fees, taxes and delivery",
    audiences: ["buyers", "sellers", "parts", "business"],
    points: [
      "Taxes, registration, delivery and other charges depend on the offer, provider and location.",
      "We don't estimate tax or legal fees on this page.",
    ],
  },
  {
    id: "advertising",
    title: "Advertising and sponsored content",
    audiences: ["buyers", "sellers", "parts", "services", "finance", "insurance", "business"],
    points: [
      "Sponsored placements are labeled and kept separate from independent insights.",
      "Payment doesn't change independent research, rankings or methodology.",
    ],
  },
  {
    id: "verification",
    title: "Verification and marketplace safety",
    audiences: ["buyers", "sellers", "parts"],
    points: [
      "No transaction is guaranteed safe. Verification has limits.",
      "Report suspected fraud or misleading listings directly.",
    ],
  },
  {
    id: "business",
    title: "Business and fleet use",
    audiences: ["business"],
    points: [
      "Signed business contracts take precedence over general information here.",
      "Consumer rules may not apply to business transactions.",
    ],
  },
];

/** Sidebar entries: fixed sections around the filterable topics. */
export const tocBefore = [{ id: "responsibilities", label: "Platform and provider responsibilities" }];
export const tocAfter = [
  { id: "provider-documents", label: "Provider documents" },
  // The version and publish date live in the hero; there's no separate changes log yet.
  { id: "changes", label: "Changes", track: false },
  { id: "glossary", label: "Glossary" },
  { id: "help", label: "Help" },
  { id: "faq", label: "FAQ" },
];

export const glossary = [
  { term: "Marketplace", definition: "A platform where independent sellers and providers list items and services." },
  { term: "Seller or provider", definition: "The business or person who sells, supplies or carries out what you buy." },
  { term: "Estimate", definition: "An illustration based on assumptions — not an offer." },
  { term: "Quote", definition: "A price from a provider, which may still need acceptance or approval." },
  { term: "Binding", definition: "When an insurer confirms that cover has started." },
  { term: "Sponsored", definition: "Content paid for by an advertiser and labeled as such." },
];

export const relatedLinks = ["Cookie Policy", "Privacy Choices", "Accessibility Statement", "Terms of Use", "Privacy Policy"];

export const complianceFaqs = [
  {
    question: "What does this Compliance Disclosures page cover?",
    answer:
      "It organizes general marketplace and product-disclosure topics and points you to more detailed documents when relevant. The rules, providers, available products and documents can vary by location and transaction. It does not replace the terms shown by a seller, lender, insurer or service provider.",
  },
  {
    question: "Is DriverXtra the seller of every vehicle or product?",
    answer: "No. Most items are listed by independent sellers, dealers and providers. The seller is shown on each listing.",
  },
  {
    question: "Does verification guarantee vehicle ownership or condition?",
    answer:
      "No. A verification badge covers only the specific check shown, such as a business identity check. It isn't a guarantee of ownership, title, condition or warranty.",
  },
  {
    question: "Are listed vehicle prices final?",
    answer:
      "No. Prices are set by sellers and may change. Taxes, registration, delivery and other charges may be added depending on the offer and location.",
  },
  {
    question: "Does a finance calculator result mean a loan is approved?",
    answer: "No. Calculator results are estimates. Only a lender can approve finance and set the rate and terms.",
  },
  {
    question: "Is DriverXtra always the lender or lessor?",
    answer: "No. DriverXtra doesn't lend money. Finance is provided by participating lenders, who are named before you apply.",
  },
  {
    question: "Does an insurance quote mean I have coverage?",
    answer: "No. Cover starts only when the insurer confirms it in writing. A quote or comparison isn't confirmation.",
  },
  {
    question: "Are vehicle parts guaranteed to fit?",
    answer:
      "No. Fitment information has limits. Check the part against your vehicle and the seller's details before you buy.",
  },
  {
    question: "Is a service request a confirmed booking?",
    answer: "No. The provider confirms the booking and timing separately.",
  },
  {
    question: "Who sets fees, taxes and delivery charges?",
    answer: "The seller or provider, together with the rules where you live. We don't estimate tax or legal fees on this page.",
  },
  {
    question: "What does a sponsorship label mean?",
    answer: "It means an advertiser paid for the placement. Sponsored content is kept separate from independent research and rankings.",
  },
  {
    question: "Where can I read the finance or insurance details?",
    answer: "In the provider's own documents, linked from quotes and offers once verified. Those documents set the binding terms.",
  },
  {
    question: "Are all DriverXtra services available in my country?",
    answer: "Not always. Products, providers and documents vary by location.",
  },
  {
    question: "How can I check whether a provider document is current?",
    answer: "Check the date or version on the document itself, or ask the provider directly. Their published version is the one that applies.",
  },
  {
    question: "What if a disclosure seems incorrect or out of date?",
    answer: "Tell us through the Help Center or Contact DriverXtra, with the page and the text that looks wrong.",
  },
  {
    question: "Does reading this page mean I accept terms or consent to tracking?",
    answer: "No. Reading this page doesn't accept any terms or change your cookie or privacy choices.",
  },
  {
    question: "Can I view an older disclosure version?",
    answer: "This is the first version. Older versions will be listed here when the disclosures change.",
  },
  {
    question: "Can I use this page with assistive technology?",
    answer:
      "Yes. The page uses headings, labelled controls and a real table. See the Accessibility Statement for known limitations.",
  },
];
