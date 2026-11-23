export const statementMeta = {
  covers: "DriverXtra website prototype · English",
  version: "DEMO-0.1",
  published: "5 Nov 2026",
  lastReviewed: "5 Nov 2026",
};

export const tocSections = [
  { id: "scope", label: "What this statement covers" },
  { id: "standards", label: "Standards and status" },
  { id: "done", label: "What we've done" },
  { id: "limitations", label: "Known limitations" },
  { id: "other-ways", label: "Other ways to get help" },
  { id: "compatibility", label: "Technology compatibility" },
  { id: "assessment", label: "How it was assessed" },
  { id: "report", label: "Report an issue" },
  { id: "changes", label: "Changes" },
  { id: "faq", label: "FAQ" },
];

export const scope = {
  covered: "all 73 pages of the DriverXtra website prototype, in English, as published on 5 Nov 2026.",
  notCovered: "partner websites, external image hosting, payment or identity providers, and any future mobile apps.",
};

export const doneItems = [
  "Ran an automated accessibility check (axe-core 4.10.2, WCAG 2.0–2.2 A and AA rules) on all 73 pages on 5 Nov 2026 — 46 pages, including this one, had no automated findings",
  "Fixed one issue found by that check the same day: decorative image fallbacks were exposed as unlabeled images on 5 pages",
  "Checked that pages reflow without sideways scrolling at 320 px wide",
  "Checked focus moves to the right heading after in-page navigation and form errors on recently built pages",
  "Gave every photo either a description or a decorative label",
];

export type Limitation = {
  title: string;
  status: "open" | "known";
  identified?: string;
  happens: string;
  where: string;
  workaround: string;
};

export const limitations: Limitation[] = [
  {
    title: "Some small labels have low colour contrast",
    status: "open",
    identified: "5 Nov 2026",
    happens:
      "Short section labels above headings, some status tags, rating stars and dimmed job cards may be hard to read for people with low vision.",
    where: "24 pages, including Insurance, Services, Finance, Insights, Newsroom, Careers, Fleet Analytics and the Homepage",
    workaround: "Use browser zoom or your system's high-contrast mode. The same information is also in nearby headings and text.",
  },
  {
    title: "Two step diagrams have incorrect list structure",
    status: "open",
    identified: "5 Nov 2026",
    happens:
      "Screen readers may announce the steps in the inventory pipeline and the homepage “how it works” steps without the correct list or tab structure.",
    where: "Catalog Integrations, Homepage",
    workaround: "The steps can still be read in order as plain text.",
  },
  {
    title: "Filter chips use an attribute screen readers may ignore",
    status: "open",
    identified: "5 Nov 2026",
    happens: "Some filter chips mark the selected option in a way that screen readers may not announce, so it can be unclear which filter is on.",
    where: "Listing and search pages with filter chips",
    workaround: "The results count and the list itself change when a filter is applied, so you can confirm the filter from the results.",
  },
  {
    title: "Not yet tested with screen readers",
    status: "open",
    happens: "No pages have been tested with NVDA, JAWS, VoiceOver or TalkBack, so some problems may not be listed here yet.",
    where: "All pages",
    workaround: "Tell us about anything that doesn't work using the form below, the Help Center or Contact DriverXtra.",
  },
  {
    title: "Photos load from an external image service",
    status: "known",
    happens: "Some photos load from an external image host. If it's slow or blocked, the photo may not appear.",
    where: "Pages with photos",
    workaround: "Photos are decorative or described in nearby text, so no information is lost if one doesn't load.",
  },
];

export type CompatStatus = "tested" | "partial" | "none" | "notReal";

export const compatibility: { environment: string; status: CompatStatus; notes: string }[] = [
  {
    environment: "Chromium (headless, via Playwright)",
    status: "tested",
    notes: "Scripted checks at 1440, 1024, 768, 375 and 320 px widths",
  },
  {
    environment: "Keyboard only",
    status: "partial",
    notes: "Focus moves and key controls checked on pages built since the Trust & Safety section",
  },
  { environment: "Firefox, Safari, Edge", status: "none", notes: "—" },
  { environment: "Screen readers (NVDA, JAWS, VoiceOver, TalkBack)", status: "none", notes: "—" },
  { environment: "Mobile devices", status: "notReal", notes: "Small-screen layouts checked in an emulated browser" },
];

export const assessment = [
  { label: "Type", value: "Self-assessment by the design team — not an independent audit" },
  { label: "Automated", value: "axe-core 4.10.2 in headless Chromium, WCAG 2.0, 2.1 and 2.2 A/AA rule sets, all 73 pages" },
  { label: "Scripted", value: "Layout reflow and keyboard focus checks during development" },
  { label: "Not done", value: "Manual expert audit, screen reader testing, testing with disabled users" },
  { label: "Date", value: "5 Nov 2026" },
];

export const reportPages = [
  "Homepage",
  "Buy vehicles",
  "Sell vehicles",
  "Parts",
  "Services",
  "Finance & Insurance",
  "Dealer & Fleet solutions",
  "Help Center",
  "Contact DriverXtra",
  "Legal & policy pages",
  "Somewhere else",
];

export const statementVersions = [
  { version: "DEMO-0.1", published: "5 Nov 2026", change: "First statement, based on the 5 Nov 2026 automated check" },
];

export const relatedLinks = [
  "Cookie Policy",
  "Privacy Choices",
  "Help Center",
  "Contact DriverXtra",
  "Privacy Policy",
  "Compliance Disclosures",
];

export const accessibilityFaqs = [
  {
    question: "What is this Accessibility Statement?",
    answer:
      "It explains the accessibility information verified for the specified DriverXtra surface, including assessment scope, any source-approved limitations and available help channels. It is not a compliance certificate.",
  },
  {
    question: "Does DriverXtra meet WCAG 2.2 Level AA?",
    answer:
      "We design toward WCAG 2.2 Level AA, but the site has not been formally assessed and no conformance claim is made. Known issues are listed under Known accessibility limitations.",
  },
  {
    question: "Which pages or services are covered?",
    answer:
      "All 73 pages of the DriverXtra website prototype, in English. Partner websites, external image hosting, payment or identity providers and future mobile apps are not covered.",
  },
  {
    question: "Is the statement the same as an audit report?",
    answer:
      "No. It's based on a self-assessment and an automated check. An independent manual audit hasn't been carried out yet.",
  },
  {
    question: "How can I report an accessibility barrier?",
    answer: "Use the Report an accessibility issue form on this page, or contact us through the Help Center or Contact DriverXtra.",
  },
  {
    question: "Do I need an account or proof of disability?",
    answer: "No. You don't need an account, and we won't ask about your health or disability.",
  },
  {
    question: "Can I send a screenshot or file?",
    answer:
      "The form doesn't accept attachments yet. Describe what happened in the text box, or ask through Contact DriverXtra how to send a file.",
  },
  {
    question: "What if I cannot use the feedback form?",
    answer: "Use the Help Center or Contact DriverXtra instead. Both accept the same reports.",
  },
  {
    question: "Will I receive a reply by a specific date?",
    answer:
      "No response time is published in this version. If you leave an email address, we'll use it only to follow up about your report.",
  },
  {
    question: "What if I see “receipt not confirmed”?",
    answer:
      "It means we couldn't confirm your report was received. Your text stays in the form so you can copy it, then send it through the Help Center or Contact DriverXtra.",
  },
  {
    question: "Are there known accessibility issues?",
    answer: "Yes. They're listed under Known accessibility limitations, with where they occur and what you can do now.",
  },
  {
    question: "Are alternative ways to complete a task available?",
    answer:
      "Yes. If a page is hard to use, the Help Center and Contact DriverXtra can help you complete the task another way.",
  },
  {
    question: "Which browsers and assistive technologies were tested?",
    answer:
      "Automated checks ran in headless Chromium, and some keyboard checks were done. Firefox, Safari, Edge, screen readers and real mobile devices haven't been tested yet.",
  },
  {
    question: "Does this cover third-party dealers, lenders or insurers?",
    answer: "No. Partner websites and services have their own accessibility information.",
  },
  {
    question: "Can I print or download the statement?",
    answer: "Yes. Use Print this statement in the page menu. Your browser can also save it as a PDF.",
  },
  {
    question: "Can I change my privacy or cookie preferences here?",
    answer: "No. Use Cookie Settings and Privacy Choices, linked under Related policies and help.",
  },
  {
    question: "How often is this statement updated?",
    answer: "Whenever an assessment changes or an issue is fixed. Each version is listed under Changes to this statement.",
  },
  {
    question: "How do I get urgent safety help instead?",
    answer: "Use the separate safety reporting route: Report Fraud or Report a Listing.",
  },
];
