export type Evidence = "observed" | "calculated" | "modeled" | "withheld" | "notEvaluated";

export const evidenceLabels: { id: Evidence; label: string; description: string }[] = [
  { id: "observed", label: "Observed", description: "Recorded from an approved source, such as an advertised price." },
  { id: "calculated", label: "Calculated", description: "Derived from observed data with a declared formula." },
  { id: "modeled", label: "Modeled", description: "An estimate built on stated assumptions." },
  { id: "withheld", label: "Withheld", description: "Not shown because of sample size, privacy or rights." },
  { id: "notEvaluated", label: "Not evaluated", description: "No approved method yet." },
];

export const evidenceName = Object.fromEntries(evidenceLabels.map((e) => [e.id, e.label])) as Record<Evidence, string>;

export type Metric = {
  id: string;
  category: string;
  name: string;
  evidence: Evidence;
  description: string;
  formula: string;
  units: string;
  version: string;
  scope: string;
};

const NO_METHOD = {
  formula: "No approved method yet",
  version: "—",
} as const;

export const metrics: Metric[] = [
  {
    id: "listing-asking-median",
    category: "Prices",
    name: "Listing asking median",
    evidence: "observed",
    description: "Median of eligible active listings, after removing duplicates and invalid stock.",
    formula: "median(eligible de-duplicated asking prices) for a defined market, period and cohort",
    units: "Currency, tax basis stated",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "completed-sale-median",
    category: "Prices",
    name: "Completed sale median",
    evidence: "notEvaluated",
    description: "Median of verified completed-sale amounts. Not published until an approved sold-price source exists.",
    ...NO_METHOD,
    units: "Currency, tax basis stated",
    scope: "Not published in any market",
  },
  {
    id: "price-dispersion",
    category: "Prices",
    name: "Price dispersion (P10/P50/P90)",
    evidence: "calculated",
    description: "The 10th, 50th and 90th percentiles of eligible asking prices, showing the spread of the market.",
    formula: "percentiles 10, 50 and 90 of eligible de-duplicated asking prices",
    units: "Currency, tax basis stated",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "price-per-vehicle-index",
    category: "Indices",
    name: "Price-per-vehicle index",
    evidence: "calculated",
    description: "A weighted index of asking prices across comparable strata, relative to a declared base period.",
    formula: "Σ(stratum weight × stratum median ÷ base-period stratum median) × 100",
    units: "Index points (base = 100)",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "month-over-month-change",
    category: "Indices",
    name: "Month-over-month change",
    evidence: "calculated",
    description: "The percentage change in an index between consecutive calendar months.",
    formula: "(index this month ÷ index last month − 1) × 100",
    units: "Percent",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "inflation-adjusted-index",
    category: "Indices",
    name: "Inflation-adjusted index",
    evidence: "notEvaluated",
    description: "An index restated to a common price level. Not published until an approved deflator is chosen.",
    ...NO_METHOD,
    units: "Index points (base = 100)",
    scope: "Not published in any market",
  },
  {
    id: "inventory-count",
    category: "Market composition",
    name: "Inventory count",
    evidence: "observed",
    description: "The number of eligible active listings at the end of the period, after removing duplicates.",
    formula: "count(eligible de-duplicated active listings) at period end",
    units: "Listings",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom, United States",
  },
  {
    id: "ev-share",
    category: "Market composition",
    name: "Electric vehicle share",
    evidence: "observed",
    description: "The share of eligible active listings that are battery electric vehicles.",
    formula: "count(eligible BEV listings) ÷ count(eligible listings) × 100",
    units: "Percent",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "data-coverage-quality",
    category: "Market composition",
    name: "Data coverage quality",
    evidence: "notEvaluated",
    description: "How completely our sources cover a market. No approved scoring method exists yet.",
    ...NO_METHOD,
    units: "—",
    scope: "Not published in any market",
  },
  {
    id: "ownership-economic-cost",
    category: "Cost estimates",
    name: "Ownership economic cost",
    evidence: "modeled",
    description: "An estimate of the full cost of owning a vehicle, including depreciation, over a stated period.",
    formula: "depreciation + energy + insurance + maintenance + tax + financing, under stated assumptions",
    units: "Currency per year, tax basis stated",
    version: "v0.2 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "ownership-cash-flow",
    category: "Cost estimates",
    name: "Ownership cash flow",
    evidence: "modeled",
    description: "An estimate of the money actually paid out while owning a vehicle. Excludes depreciation.",
    formula: "energy + insurance + maintenance + tax + finance payments, under stated assumptions",
    units: "Currency per month, tax basis stated",
    version: "v0.2 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "ev-energy-spending",
    category: "EV and charging",
    name: "EV energy spending",
    evidence: "modeled",
    description: "An estimate of charging costs for a stated mileage, efficiency and home/public charging mix.",
    formula: "annual distance × consumption × weighted tariff for the stated charging mix",
    units: "Currency per year",
    version: "v0.2 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "charging-duration",
    category: "EV and charging",
    name: "Charging duration",
    evidence: "modeled",
    description: "An estimate of time to charge between two stated levels at a stated charger power.",
    formula: "energy needed ÷ effective charging power, adjusted for the stated charging curve",
    units: "Minutes",
    version: "v0.2 · approved (demonstration)",
    scope: "United Kingdom",
  },
  {
    id: "ev-rated-range",
    category: "EV and charging",
    name: "EV rated range",
    evidence: "observed",
    description: "The official rated range published for the vehicle under its stated test cycle.",
    formula: "rated range as published by the approved source, with test cycle stated",
    units: "Miles or kilometres, test cycle stated",
    version: "v0.3 · approved (demonstration)",
    scope: "United Kingdom, United States",
  },
];

export const indexRows = [
  { term: "Base", value: "100 at a declared reference period" },
  { term: "Strata", value: "Comparable groups of vehicles (for example body, fuel, age)" },
  { term: "Weights", value: "Approved weights per stratum, published with the version" },
  { term: "Rebasing", value: "Announced in advance, with a revision note" },
];

export const illustrativeIndex = [
  { period: "Base", value: 100 },
  { period: "P2", value: 102 },
  { period: "P3", value: 99 },
  { period: "P4", value: 104 },
];

export const timestamps = [
  { title: "Observed", text: "When the source recorded the information", example: "30 Sep 2026" },
  { title: "Received", text: "When it reached us", example: "1 Oct 2026, 02:00" },
  { title: "Processed", text: "When the calculation ran", example: "2 Oct 2026, 04:10" },
  { title: "Published", text: "When it went public", example: "3 Oct 2026, 09:00" },
];

export const revisions = [
  {
    version: "v0.3",
    period: "Jan–Jun 2026",
    change: "Duplicate-listing rule tightened",
    effect: "Removed relisted vehicles from one source",
    approvedBy: "Research lead (demonstration)",
    published: "3 Oct 2026",
  },
  {
    version: "v0.2",
    period: "All periods",
    change: "Minimum sample introduced",
    effect: "Small groups withheld instead of shown",
    approvedBy: "Research lead (demonstration)",
    published: "2 Jul 2026",
  },
  {
    version: "v0.1",
    period: "—",
    change: "Initial method",
    effect: "First published definitions",
    approvedBy: "Research lead (demonstration)",
    published: "15 Apr 2026",
  },
];

export const glossary = [
  { term: "Index", text: "A relative series from a declared reference period; not a price." },
  { term: "Median", text: "The middle value of a sorted sample — less affected by extremes than an average." },
  { term: "Percentile", text: "The value below which a given share of observations falls." },
  { term: "Inflation adjustment", text: "Restating values to a common price level using an approved deflator." },
  { term: "Outlier", text: "A value outside documented validation or trimming rules." },
  { term: "Suppression", text: "Withholding a result because of sample size, privacy or rights." },
  { term: "Confidence", text: "Only shown where statistically defensible — never fabricated." },
];

export const methodologyFaqs = [
  {
    question: "What is the difference between an asking price and a sold price?",
    answer:
      "An asking price is what a seller advertises. A sold price requires evidence of a completed transaction. Neither should be silently substituted for the other.",
  },
  {
    question: "Is a price index the same as a market value?",
    answer:
      "No. An index is a relative series measured against a declared reference period. It shows movement, not what any vehicle is worth.",
  },
  {
    question: "Where do the figures come from?",
    answer:
      "From approved sources for each metric, such as advertised listings. Each figure carries an evidence label showing whether it was observed, calculated or modeled.",
  },
  {
    question: "How often are data and charts updated?",
    answer:
      "It varies by metric, market and source. Each published figure shows separate observed, received, processed and published timestamps in UTC.",
  },
  {
    question: "Why are some regions not shown?",
    answer:
      "A region is only shown where we have an approved source and enough data. Availability varies by market, data source and metric.",
  },
  {
    question: "What does “insufficient data” mean?",
    answer:
      "The sample for that group fell below the approved minimum, so the result is withheld rather than shown with misleading precision.",
  },
  {
    question: "Why do figures change for earlier periods?",
    answer:
      "Late data, corrections or a methodology revision can restate earlier periods. Changes are recorded in the revision history with the affected periods.",
  },
  {
    question: "What does the index base mean?",
    answer:
      "The base is the declared reference period, set to 100. A value of 104 means 4% higher than the base period, not a price of 104.",
  },
  {
    question: "Are advertised prices adjusted for inflation?",
    answer:
      "No. Published asking-price figures are nominal unless clearly labelled. An inflation-adjusted index has no approved method yet.",
  },
  {
    question: "Are currencies directly comparable?",
    answer:
      "No. Figures are shown in each market's currency and tax basis. We don't convert or compare across currencies without an approved method.",
  },
  {
    question: "How do you handle duplicate listings?",
    answer:
      "Listings that appear more than once, including relisted vehicles, are de-duplicated using documented rules before any figure is calculated.",
  },
  {
    question: "What about unusually high or low values?",
    answer:
      "Values outside documented validation or trimming rules are treated as outliers and excluded. The rules are published with each version.",
  },
  {
    question: "Are ownership cost estimates financial advice?",
    answer:
      "No. They are modeled estimates built on stated assumptions. Your own costs will differ, so treat them as a guide only.",
  },
  {
    question: "Why might EV charging estimates differ from reality?",
    answer:
      "Real costs depend on your tariff, charging mix, driving style, weather and battery condition. Estimates use stated assumptions that may not match yours.",
  },
  {
    question: "Can I download or reuse the underlying data?",
    answer:
      "Not by default. Some data isn't licensed for redistribution. Send a data and reuse request before downloading or republishing restricted data.",
  },
  {
    question: "Does sponsored content change the methodology?",
    answer: "No. Methods are approved independently and are not changed by sponsors or advertisers.",
  },
  {
    question: "How can I request a correction?",
    answer: "Use Report a correction and tell us which metric and version looks wrong, with any supporting detail.",
  },
  {
    question: "Can I see old methodology versions?",
    answer:
      "Yes. The revision history lists each version, the affected periods, what changed and when it was published.",
  },
];
