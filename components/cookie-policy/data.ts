export const policyMeta = {
  version: "DEMO-0.1",
  effective: "1 Oct 2026 (demonstration)",
  lastReviewed: "3 Oct 2026",
};

export const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "categories", label: "Technology categories" },
  { id: "technologies", label: "Technologies and providers" },
  { id: "controls", label: "Your controls" },
  { id: "browsers", label: "Browsers and devices" },
  { id: "changes", label: "Changes" },
  { id: "help", label: "Help" },
  { id: "faq", label: "FAQ" },
];

export type CategoryId = "necessary" | "functional" | "measurement" | "advertising";

export type Category = {
  id: CategoryId;
  name: string;
  status: "always" | "active" | "off";
  description: string;
};

export const categories: Category[] = [
  {
    id: "necessary",
    name: "Strictly necessary",
    status: "always",
    description: "Needed for pages and features you request to work, such as remembering the region you chose.",
  },
  {
    id: "functional",
    name: "Functional and preferences",
    status: "active",
    description: "Remember choices and items you save on this device, such as saved vehicles or a draft listing.",
  },
  {
    id: "measurement",
    name: "Measurement and analytics",
    status: "off",
    description: "Not used in this prototype. No technologies count visits or measure how pages are used.",
  },
  {
    id: "advertising",
    name: "Advertising and personalization",
    status: "off",
    description: "Not used in this prototype. No technologies build profiles or show advertising based on your activity.",
  },
];

export type Technology = {
  name: string;
  category: CategoryId;
  type: "Local storage" | "Session storage";
  provider: string;
  purpose: string;
  duration: string;
};

const FIRST_PARTY = "DriverXtra (first party)";
const UNTIL_CLEARED = "Until you clear site data";

export const technologies: Technology[] = [
  {
    name: "Region",
    category: "necessary",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Remembers the region, language and currency you selected",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Focus return",
    category: "necessary",
    type: "Session storage",
    provider: FIRST_PARTY,
    purpose: "Moves keyboard focus to the page heading after you follow a footer link",
    duration: "Until you close the tab",
  },
  {
    name: "Cookie preference",
    category: "necessary",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Remembers your Cookie Settings choice in this prototype",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Saved, Garage, Compare",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Saved vehicles, your garage and vehicles you're comparing",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Sell draft, Sell valuation, Sell offer, Sell trade-in, Sell consignment, My listings",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Draft sell journeys and demonstration listings",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Parts cart, Parts vehicle, Parts questions",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Parts cart, chosen vehicle and fitment questions",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Dealer, Fleet, Partner",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Demonstration workspace data for dealers, fleets and partners",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Report last, Fraud last, Dispute last, Contact last",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "The last report, case or inquiry reference so you can check it",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Service demo",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Demonstration service requests and bookings",
    duration: UNTIL_CLEARED,
  },
  {
    name: "Guide mode",
    category: "functional",
    type: "Local storage",
    provider: FIRST_PARTY,
    purpose: "Whether you were reading the buying or selling guide",
    duration: UNTIL_CLEARED,
  },
];

export const categoryName = Object.fromEntries(categories.map((c) => [c.id, c.name])) as Record<CategoryId, string>;

export const policyVersions = [
  {
    version: "DEMO-0.1",
    effective: "1 Oct 2026",
    summary: "First demonstration version, built from the prototype's storage inventory.",
  },
];

export const relatedLinks = ["Privacy Policy", "Privacy Choices", "Terms of Use", "Accessibility Statement"];

export const cookieFaqs = [
  {
    question: "What are cookies and related technologies?",
    answer:
      "Cookies and similar device technologies can support site functions and other purposes. This page will define only the technologies included in the approved DriverXtra inventory for the selected market and product surface; actual details must be verified before publication.",
  },
  {
    question: "Which cookies does DriverXtra use?",
    answer:
      "This prototype uses first-party local storage and session storage only. Every item is listed in the Technologies and providers table, with its category, purpose and how long it is kept.",
  },
  {
    question: "Are any cookies necessary for the site to function?",
    answer:
      "Yes. Strictly necessary storage remembers things like the region you chose and your Cookie Settings choice. It can't be turned off in Cookie Settings because the site needs it to work as you asked.",
  },
  {
    question: "Does reading the Cookie Policy mean I have consented?",
    answer:
      "No. Reading this page doesn't accept anything. Your choices are only stored when you save them in Cookie Settings.",
  },
  {
    question: "Where can I change my cookie preferences?",
    answer: "Select Open Cookie Settings on this page or Cookie Settings in the site footer, choose your options and save.",
  },
  {
    question: "What happens if Cookie Settings cannot open?",
    answer:
      "Optional categories stay as they were, and nothing new is turned on. You can also clear site data in your browser, or contact DriverXtra through the Help Center for help.",
  },
  {
    question: "Are provider names and durations current?",
    answer:
      "They reflect the prototype's storage inventory on the last reviewed date shown at the top of the page. Any change is recorded under Changes to this policy.",
  },
  {
    question: "Do these technologies work the same on mobile and desktop?",
    answer:
      "Yes. The same storage is used in mobile and desktop browsers. Choices are stored per browser and device, so you'll need to set them on each one you use.",
  },
  {
    question: "Are third-party providers involved?",
    answer: "Not in this prototype. Every item listed is first party, set by DriverXtra itself.",
  },
  {
    question: "How long does a cookie last?",
    answer:
      "It depends on the item. Session storage clears when you close the tab; local storage stays until you clear site data. Each item's duration is shown in the table.",
  },
  {
    question: "Can I withdraw a previously saved preference?",
    answer: "Yes. Open Cookie Settings at any time, change your choice and save. The new choice replaces the old one.",
  },
  {
    question: "Does deleting browser cookies update DriverXtra preferences?",
    answer:
      "Clearing site data removes stored items, including your saved Cookie Settings choice. Optional categories then return to their defaults until you save a choice again.",
  },
  {
    question: "Why does the page ask me to select a region?",
    answer:
      "Rules and available features can vary by market. We don't infer your region from your location, so you choose the one that applies to you.",
  },
  {
    question: "Can I read a previous version?",
    answer: "Yes. Previous versions are listed under Changes to this policy, with what changed in each one.",
  },
  {
    question: "How is this different from the Privacy Policy?",
    answer:
      "This policy covers storage technologies on your device. The Privacy Policy explains how DriverXtra collects, uses and shares personal information more broadly.",
  },
  {
    question: "How is this different from Privacy Choices?",
    answer:
      "Cookie Settings controls storage on this device. Privacy Choices is where you manage other requests about your personal information.",
  },
  {
    question: "How can I read this page with assistive technology?",
    answer:
      "The page uses headings, labelled controls and real tables so screen readers can move through it. Let us know through the Help Center if anything is hard to use.",
  },
  {
    question: "What if I find an inaccurate vendor or purpose entry?",
    answer:
      "Contact DriverXtra with the item's name and what looks wrong. We'll check it against the storage inventory and record any correction under Changes.",
  },
];
