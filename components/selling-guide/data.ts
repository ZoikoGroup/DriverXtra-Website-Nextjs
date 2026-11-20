export type RouteId = "private" | "instant" | "tradeIn" | "consignment";

export type SaleRoute = {
  id: RouteId;
  title: string;
  description: string;
  pro: string;
  con: string;
  linkLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export const saleRoutes: SaleRoute[] = [
  {
    id: "private",
    title: "Sell privately",
    description: "You list it, talk to buyers and handle the sale yourself.",
    pro: "Most control over price and timing",
    con: "You handle viewings, payment checks and paperwork",
    linkLabel: "Create a listing",
    href: "/list-and-manage",
    imageSrc: "/images/selling-guide/route-sell-privately.webp",
    imageAlt: "A private seller's car on a driveway",
  },
  {
    id: "instant",
    title: "Instant offer",
    description: "Get an offer from a buyer and sell with less effort.",
    pro: "Usually quicker and simpler",
    con: "An offer is conditional on inspection and may be lower than a private sale",
    linkLabel: "Request an instant offer",
    href: "/instant-offer",
    imageSrc: "/images/selling-guide/route-instant-offer.webp",
    imageAlt: "A car on a dealer forecourt",
  },
  {
    id: "tradeIn",
    title: "Trade in",
    description: "Use your car's value toward your next vehicle with a dealer.",
    pro: "Sell and buy in one place",
    con: "Compare the trade-in value separately from the new car's price",
    linkLabel: "Explore trade-in",
    href: "/trade-in",
    imageSrc: "/images/selling-guide/route-trade-in.webp",
    imageAlt: "A car being traded in",
  },
  {
    id: "consignment",
    title: "Consignment",
    description: "A professional seller markets the car for you.",
    pro: "Less hands-on for you",
    con: "Fees and terms vary — read the agreement carefully",
    linkLabel: "Explore consignment",
    href: "/consignment",
    imageSrc: "/images/selling-guide/route-consignment.webp",
    imageAlt: "Two people agreeing a sale",
  },
];

export type QuizOption = { label: string; scores: Partial<Record<RouteId, number>> };
export type QuizQuestion = { id: string; question: string; options: QuizOption[] };

export const routeQuiz: QuizQuestion[] = [
  {
    id: "speed",
    question: "How quickly do you want to sell?",
    options: [
      { label: "As soon as possible", scores: { instant: 2, tradeIn: 2 } },
      { label: "I can wait for the right buyer", scores: { private: 2, consignment: 1 } },
    ],
  },
  {
    id: "effort",
    question: "How hands-on do you want to be?",
    options: [
      { label: "As little as possible", scores: { instant: 2, tradeIn: 1, consignment: 2 } },
      { label: "Happy to do viewings and paperwork", scores: { private: 3 } },
    ],
  },
  {
    id: "buying",
    question: "Are you buying another vehicle?",
    options: [
      { label: "Yes", scores: { tradeIn: 3 } },
      { label: "No", scores: { instant: 1, private: 1, consignment: 1 } },
    ],
  },
];

export type ChecklistGroup = { title: string; items: { id: string; label: string }[] };

export const prepChecklist: ChecklistGroup[] = [
  {
    title: "Documents and history",
    items: [
      { id: "docs", label: "Find your registration and ownership documents" },
      { id: "records", label: "Gather service and repair records" },
      { id: "faults", label: "Note known faults honestly" },
      { id: "finance", label: "Check for outstanding finance on the vehicle" },
    ],
  },
  {
    title: "Presentation",
    items: [
      { id: "clean", label: "Clean inside and out" },
      { id: "fixes", label: "Fix small, cheap issues where it makes sense" },
      { id: "personal", label: "Remove personal items and toll or parking tags" },
      { id: "keys", label: "Locate all keys and the owner's manual" },
    ],
  },
  {
    title: "Your privacy",
    items: [
      { id: "apps", label: "Sign out of connected apps and clear saved addresses" },
      { id: "phones", label: "Unpair phones from the infotainment system" },
    ],
  },
];

export const photoShots = [
  { title: "Front three-quarter", hint: "Your main photo — whole car, good light" },
  { title: "Rear three-quarter", hint: "The other side of the car" },
  { title: "Side profile", hint: "Shows condition along the body" },
  { title: "Dashboard and mileage", hint: "Mileage clearly readable" },
  { title: "Front seats and interior", hint: "Clean and uncluttered" },
  { title: "Rear seats and boot", hint: "Show space and condition" },
  { title: "Wheels and tyres", hint: "Tread and any kerb damage" },
  { title: "Any damage, close up", hint: "Honest photos reduce disputes later" },
];

export const paymentLadder = [
  { title: "Screenshot of a transfer", status: "Not proof", tone: "bad" },
  { title: "Email “payment confirmation”", status: "Not proof", tone: "bad" },
  { title: "Pending or scheduled payment", status: "Not cleared", tone: "warn" },
  { title: "Cleared funds in your own account", status: "Check it yourself", tone: "good" },
] as const;

export const handoverChecklist = [
  "Payment shows as cleared in an account you control",
  "Written receipt with date, price, vehicle and both names",
  "Ownership transfer completed the way your market requires",
  "All keys, manual and service records handed over",
  "Insurance cancelled or moved once the car has gone",
  "Your listing removed",
];

export const sellingFaqs = [
  {
    question: "What's the quickest way to sell my car?",
    answer:
      "An instant offer or trade-in is usually quicker than a private sale, because you deal with one buyer. The offer may be lower and is normally conditional on an inspection.",
  },
  {
    question: "Will I get more money selling privately?",
    answer:
      "Often, but not always. A private sale can achieve a higher price, but it takes more time and effort, and you take on viewings, payment checks and paperwork yourself.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Usually your registration or ownership documents, service and repair records, and any finance settlement letter. Exact requirements differ by market, so check your local rules.",
  },
  {
    question: "Can I sell a car that still has finance on it?",
    answer:
      "Usually only once the finance is settled, or with the lender's agreement. Contact your lender for a settlement figure and tell buyers about the finance up front.",
  },
  {
    question: "How do I set the right price?",
    answer:
      "Start with a valuation, then compare similar vehicles — same age, mileage, condition and spec. Remember asking prices aren't sold prices, and decide your lowest acceptable price in advance.",
  },
  {
    question: "Should I fix problems before selling?",
    answer:
      "Small, cheap fixes can be worth it. For larger repairs, compare the cost with the likely effect on price. Either way, describe known faults honestly.",
  },
  {
    question: "What should I leave out of my listing?",
    answer:
      "Your phone number, email, home address and anything that shows your house number or street. Keep contact on the platform where you can.",
  },
  {
    question: "Is a payment screenshot proof I've been paid?",
    answer:
      "No. Screenshots and emails can be faked. Only hand over the car once funds show as cleared in an account you control, and check it yourself.",
  },
  {
    question: "A buyer says they overpaid — what should I do?",
    answer:
      "Pause. Don't send money back. Overpayment requests are a common scam. Check your own account directly and report it if something seems wrong.",
  },
  {
    question: "Who's insured during a test drive?",
    answer:
      "It depends on your policy and the buyer's. Check with your insurer before any test drive, and keep the keys until you're in the car.",
  },
  {
    question: "What happens after I hand over the car?",
    answer:
      "Complete the ownership transfer the way your market requires, cancel or move your insurance, and remove your listing. Keep a copy of the receipt.",
  },
  {
    question: "Is my checklist progress saved?",
    answer:
      "Your ticks are saved on this device only, in your browser. Nothing is sent to DriverXtra. Clearing your browser data or using another device starts fresh.",
  },
];
