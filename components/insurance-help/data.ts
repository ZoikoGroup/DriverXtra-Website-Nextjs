export const helpTopics = [
  { id: "quotes", label: "Quotes and comparison" },
  { id: "referrals", label: "Provider referrals" },
  { id: "servicing", label: "Policy servicing" },
  { id: "claims", label: "Claims questions" },
  { id: "privacy", label: "Data and privacy" },
  { id: "complaints", label: "Complaints" },
] as const;

export type HelpTopicId = (typeof helpTopics)[number]["id"];
export const isHelpTopicId = (v: string | undefined): v is HelpTopicId => helpTopics.some((t) => t.id === v);

export const answers: { q: string; a: string; topic: HelpTopicId }[] = [
  {
    q: "How do I make a claim?",
    topic: "claims",
    a: "Contact your insurer's claims line — the number is on your policy documents or certificate. Report the incident as soon as you can, with the date, location, photos and details of anyone involved. DriverXtra can't make or handle claims.",
  },
  {
    q: "Who do I contact about my policy?",
    topic: "servicing",
    a: "Your insurer, or the broker who arranged the policy. They handle changes such as a new vehicle, address or driver, renewals and cancellations.",
  },
  {
    q: "Was my quote on DriverXtra a real offer?",
    topic: "quotes",
    a: "No. No insurance providers are connected in this demonstration, so nothing shown here is a quote. A real price only comes from an insurer or broker after it assesses your details.",
  },
  {
    q: "How do I complain about an insurer?",
    topic: "complaints",
    a: "Use the insurer's own complaints process first — details are in your policy documents. If it isn't resolved, you may be able to go to an independent ombudsman, where your market has one.",
  },
  {
    q: "How do I complain about DriverXtra?",
    topic: "complaints",
    a: "Contact DriverXtra about anything on our website, content or comparison pages. We'll acknowledge your complaint and explain the next steps.",
  },
  {
    q: "What data did I share, and with whom?",
    topic: "privacy",
    a: "In this demonstration, none — insurance pages don't collect personal data. Where referrals are supported, you'd see exactly what would be shared, and with which named partner, before agreeing.",
  },
  {
    q: "I was referred to a provider — what now?",
    topic: "referrals",
    a: "The provider explains its own process, checks your details and decides whether to offer cover. Nothing is bought until you agree with them directly.",
  },
  {
    q: "Can DriverXtra cancel my policy?",
    topic: "servicing",
    a: "No. Only your insurer or broker can cancel a policy. Check your documents for cancellation rights and any fees.",
  },
];

export type Owner = "DriverXtra" | "Insurer / broker" | "Ombudsman" | "Emergency services";

export type RouterStep = {
  question: string;
  options: { label: string; next: string }[];
};

export type RouterResult = { owner: Owner; title: string; text: string; topic?: HelpTopicId };

/** Issue router: steps lead to other steps or to a result. */
export const routerSteps: Record<string, RouterStep> = {
  start: {
    question: "What happened?",
    options: [
      { label: "Problem with the DriverXtra site", next: "site" },
      { label: "Question about my policy", next: "policy" },
      { label: "I need to claim", next: "claim" },
      { label: "I want to complain", next: "complain" },
    ],
  },
  claim: {
    question: "Is anyone hurt, or is the vehicle unsafe to move?",
    options: [
      { label: "Yes", next: "emergency" },
      { label: "No", next: "claimInsurer" },
    ],
  },
  complain: {
    question: "Who is the complaint about?",
    options: [
      { label: "DriverXtra", next: "complainDriverXtra" },
      { label: "My insurer or broker", next: "complainInsurer" },
      { label: "Insurer didn't resolve it", next: "ombudsman" },
    ],
  },
};

export const routerResults: Record<string, RouterResult> = {
  site: {
    owner: "DriverXtra",
    title: "Contact DriverXtra",
    text: "Our website, content and comparison pages are our responsibility. Tell us what went wrong and which page you were on.",
  },
  policy: {
    owner: "Insurer / broker",
    title: "Contact your insurer or broker",
    text: "Use the contact details on your policy documents. They handle cover questions, changes, renewals and cancellations.",
    topic: "servicing",
  },
  emergency: {
    owner: "Emergency services",
    title: "Get safe and call emergency services first",
    text: "Make sure everyone is safe and call the local emergency number. Contact your insurer once it's safe to do so.",
  },
  claimInsurer: {
    owner: "Insurer / broker",
    title: "Report it to your insurer's claims line",
    text: "Do it as soon as you can. Have your policy number, photos, the time and place, and details of anyone involved ready.",
    topic: "claims",
  },
  complainDriverXtra: {
    owner: "DriverXtra",
    title: "Complain to DriverXtra",
    text: "Tell us what happened and what you'd like us to do. We'll acknowledge it and explain the next steps.",
    topic: "complaints",
  },
  complainInsurer: {
    owner: "Insurer / broker",
    title: "Use the insurer's complaints process",
    text: "Details are in your policy documents. Keep a record of dates, names and what was said.",
    topic: "complaints",
  },
  ombudsman: {
    owner: "Ombudsman",
    title: "Take it to an independent ombudsman",
    text: "If the insurer's final response doesn't resolve it, an ombudsman may review it free of charge, where your market has one.",
    topic: "complaints",
  },
};

export const whoHandles: [string, string][] = [
  ["DriverXtra", "Our website, content and comparison pages"],
  ["Insurer / broker", "Quotes, policies, changes, cancellations and claims"],
  ["Ombudsman (where available)", "Unresolved complaints about an insurer"],
];
