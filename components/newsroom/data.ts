const IMG = "/images/newsroom";

export type Topic = "product" | "company" | "partnerships" | "media" | "corrections";

export const topics: { id: Topic | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product updates" },
  { id: "company", label: "Company" },
  { id: "partnerships", label: "Partnerships" },
  { id: "media", label: "Media statements" },
  { id: "corrections", label: "Corrections" },
];

export type Announcement = {
  id: string;
  type: string;
  topic: Topic;
  title: string;
  summary: string;
  /** ISO date, interpreted as UTC. */
  published: string;
  regions: string[];
  image: string;
  imageAlt: string;
  correctionPublished?: boolean;
};

/** Placeholder records — every title is marked "Example" until real releases are approved. */
export const announcements: Announcement[] = [
  {
    id: "parts-onboarding-uk",
    type: "Product announcement",
    topic: "product",
    title: "Example: Partner onboarding now open for parts sellers in the UK",
    summary:
      "Approved parts businesses in the United Kingdom can apply through Partner Onboarding. Applying doesn't mean approval.",
    published: "2026-10-02",
    regions: ["United Kingdom"],
    image: `${IMG}/news-parts-onboarding.webp`,
    imageAlt: "A mechanic topping up engine oil",
  },
  {
    id: "correction-trust-safety",
    type: "Correction",
    topic: "corrections",
    title: "Correction: Trust & Safety guidance announcement",
    summary: "We corrected the list of markets covered. The original announcement now shows what changed.",
    published: "2026-09-29",
    regions: ["United Kingdom", "United States"],
    image: `${IMG}/news-correction.webp`,
    imageAlt: "An editorial team working in an open-plan office",
  },
  {
    id: "trust-safety-hub",
    type: "Announcement",
    topic: "company",
    title: "Example: DriverXtra publishes Trust & Safety guidance hub",
    summary: "New guidance covers verification, buyer and seller safety, reporting and disputes.",
    published: "2026-09-26",
    regions: ["United Kingdom", "United States"],
    image: `${IMG}/news-trust-safety-hub.webp`,
    imageAlt: "Documents being reviewed and signed",
    correctionPublished: true,
  },
  {
    id: "ev-charging-partnership",
    type: "Press release",
    topic: "partnerships",
    title: "Example: Demonstration partnership with an EV charging network",
    summary:
      "An illustrative partnership announcement showing how partner names and quotes appear only with approval.",
    published: "2026-09-15",
    regions: ["Germany"],
    image: `${IMG}/news-ev-partnership.webp`,
    imageAlt: "An electric car charging",
  },
  {
    id: "service-disruption",
    type: "Media statement",
    topic: "media",
    title: "Example: Statement on a reported service disruption",
    summary: "A short approved statement. Current service status lives on Platform Status.",
    published: "2026-09-02",
    regions: ["United Kingdom"],
    image: `${IMG}/news-service-disruption.webp`,
    imageAlt: "A monitoring dashboard on a laptop",
  },
  {
    id: "market-trends-explorer",
    type: "Product announcement",
    topic: "product",
    title: "Example: Market Trends explorer launched (planned in some markets)",
    summary: "Availability differs by market. Planned isn't the same as available.",
    published: "2026-08-20",
    regions: ["United Kingdom", "United States"],
    image: `${IMG}/news-market-trends.webp`,
    imageAlt: "A car on a forecourt at dusk",
  },
  {
    id: "company-update-2025",
    type: "Announcement",
    topic: "company",
    title: "Example: Annual company update",
    summary: "An illustrative company update. Figures appear only once they've been approved for publication.",
    published: "2025-11-12",
    regions: ["United States"],
    image: `${IMG}/hero-communications-team.webp`,
    imageAlt: "A communications team at work",
  },
  {
    id: "third-party-report",
    type: "Media statement",
    topic: "media",
    title: "Example: Statement on a third-party report",
    summary: "An illustrative response to inaccurate coverage, limited to facts we can confirm.",
    published: "2025-06-03",
    regions: ["United Kingdom", "United States", "Germany"],
    image: `${IMG}/press-inquiries.webp`,
    imageAlt: "A spokesperson speaking to a small group",
  },
];

export const spotlightId = "parts-onboarding-uk";

/** Formats an ISO date in UTC so server and client render the same text. */
export const formatDate = (iso: string, month: "long" | "short" = "long") =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month, year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export const newsroomFaqs = [
  {
    question: "What is the DriverXtra Newsroom?",
    answer:
      "The Newsroom is designed for approved official DriverXtra company announcements and media information. It is different from independent automotive research in Automotive Insights.",
  },
  {
    question: "Are Newsroom articles independent research?",
    answer:
      "No. Newsroom items are official company communications. For market data and independent analysis, see Automotive Insights and Market Trends.",
  },
  {
    question: "How do I find a release?",
    answer:
      "Use the Latest announcements archive. Filter by topic, region and year, search by keyword, or sort by newest or oldest.",
  },
  {
    question: "Why is a story missing from the Newsroom?",
    answer:
      "Only approved official announcements are published here. Coverage by other outlets, rumours and unapproved material aren't included.",
  },
  {
    question: "How can I tell when an announcement was published?",
    answer:
      "Each record shows its publication date in UTC. If a correction was published later, the record is labelled so you can see what changed.",
  },
  {
    question: "What does an “Official company statement” label mean?",
    answer:
      "It means the text was approved for publication by DriverXtra. It doesn't mean every detail applies in every market.",
  },
  {
    question: "Can I reuse DriverXtra logos or press images?",
    answer:
      "Only approved media resources, and only within their usage and attribution restrictions. Check the terms on Press & Media before reuse.",
  },
  {
    question: "Where is the press kit?",
    answer: "Approved logos, imagery and press materials are on the Press & Media page, under Media resources.",
  },
  {
    question: "Can I quote a DriverXtra announcement?",
    answer:
      "You can quote published text accurately, with attribution to DriverXtra and the publication date. Don't alter quotes or present them as new statements.",
  },
  {
    question: "How can journalists contact DriverXtra?",
    answer:
      "Journalists and media organizations can send requests through the media inquiry form on Press & Media.",
  },
  {
    question: "Will DriverXtra respond within a certain time?",
    answer: "No response time is promised. Sharing your deadline helps us prioritise, but it isn't an agreed turnaround.",
  },
  {
    question: "What happens if a release contains an error?",
    answer:
      "We publish a correction and label the original announcement, so readers can see what changed and when.",
  },
  {
    question: "Why was a release withdrawn?",
    answer:
      "A release may be withdrawn if it's no longer accurate or approved. Where possible, a short notice explains the withdrawal.",
  },
  {
    question: "Are announcements always available worldwide?",
    answer:
      "No. Each record lists the regions it covers. Products and services described may not be available in other markets.",
  },
  {
    question: "Are listed dates shown in my local time zone?",
    answer: "No. Dates are shown in UTC, and the year filter uses UTC too.",
  },
  {
    question: "Does a partnership announcement mean a service is available today?",
    answer:
      "Not necessarily. Partnerships can be planned or limited to some markets. Check the announcement's regions and current product pages.",
  },
  {
    question: "How are sponsored articles handled?",
    answer: "The Newsroom doesn't publish sponsored articles. Official announcements are not paid placements.",
  },
  {
    question: "Where can I report fraud or an unsafe listing?",
    answer:
      "Use Report Fraud or Report a Listing. The Newsroom can't take reports, and media inquiries aren't monitored for safety issues.",
  },
];
