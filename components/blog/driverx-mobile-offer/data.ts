import type { Faq } from "@/components/ui/FaqSection";

export const IMG = "/images/black-friday";
export const DRIVERX_URL = "https://driverxmobile.com/";

export const TITLE = "Drive Smarter and Save More: Get 35% Off DriverX Mobile Plans for Three Months";
export const DESCRIPTION =
  "Discover how eligible customers can save 35% on DriverX Mobile eligible driver-plan charges for the first three months, with a potential activation-fee waiver for qualifying new lines.";

export const QUICK_SUMMARY: { label: string; text: string }[] = [
  {
    label: "Exclusive introductory savings",
    text: "Eligible customers can get 35% off DriverX Mobile eligible driver-plan charges for the first three months.",
  },
  {
    label: "Activation-fee benefit",
    text: "Eligible new lines may qualify for a waived activation fee, subject to commercial approval.",
  },
  {
    label: "Designed for drivers",
    text: "DriverX Mobile offers connectivity solutions for rideshare drivers, delivery professionals, gig workers and fleet operators.",
  },
  {
    label: "Stay connected",
    text: "Explore mobile solutions for navigation, communication, delivery applications and everyday work requirements.",
  },
  {
    label: "Explore available plans",
    text: "Visit DriverX Mobile to discover available plans and confirm promotional eligibility.",
  },
];

/** Table of contents — ids match the article's h2 anchors. */
export const TOC = [
  { id: "save-35", label: "Save 35% for three months" },
  { id: "why-connectivity", label: "Why connectivity matters" },
  { id: "driver-focused", label: "Connectivity designed around drivers" },
  { id: "how-discount-helps", label: "How the discount helps" },
  { id: "who-benefits", label: "Who can benefit" },
  { id: "what-to-consider", label: "What to consider" },
  { id: "how-to-explore", label: "How to explore the offer" },
  { id: "why-driver-focused", label: "Why driver-focused?" },
  { id: "faq", label: "FAQs" },
  { id: "final-thoughts", label: "Final thoughts" },
];

export const SAVINGS_ROWS: { label: string; amount: string; highlight?: boolean }[] = [
  { label: "Original monthly charge", amount: "$50" },
  { label: "35% introductory discount", amount: "$17.50" },
  { label: "Discounted monthly charge", amount: "$32.50" },
  { label: "Savings over three months", amount: "$52.50", highlight: true },
];

export const FAQS: (Faq & { a: string })[] = [
  {
    q: "What is the DriverX Mobile 35% introductory offer?",
    a: "DriverX Mobile's promotional offer provides eligible customers with 35% off eligible driver-plan charges for the first three months.",
  },
  {
    q: "How long does the DriverX Mobile discount last?",
    a: "The introductory discount applies to eligible driver-plan charges during the first three months, subject to the applicable promotional terms.",
  },
  {
    q: "Does DriverX Mobile waive activation fees?",
    a: "Eligible new lines may qualify for an activation-fee waiver where commercially approved. Customers should confirm eligibility before activation.",
  },
  {
    q: "Who can benefit from DriverX Mobile plans?",
    a: "DriverX Mobile offers solutions for gig workers, delivery drivers, rideshare professionals, fleet operators and other mobile professionals.",
  },
  {
    q: "Can I explore different DriverX Mobile plans?",
    a: "Yes. Customers can explore prepaid, postpaid, business and data-only options through the official plans page.",
  },
  {
    q: "Why is mobile connectivity important for delivery drivers?",
    a: "Delivery drivers use mobile connectivity for navigation, order management, customer communication and accessing delivery applications.",
  },
  {
    q: "Where can I find more information about DriverX Mobile?",
    a: "Visit https://driverxmobile.com/ to explore its services, available plans and contact information.",
  },
];

/** Structured data supplied with the article copy. */
export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://driverxmobile.com/#article",
      headline: TITLE,
      description: DESCRIPTION,
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://driverxmobile.com/" },
      url: "https://driverxmobile.com/",
      publisher: { "@type": "Organization", name: "DriverX Mobile", url: "https://driverxmobile.com/" },
      about: [
        { "@type": "Thing", name: "Driver Mobile Plans" },
        { "@type": "Thing", name: "Mobile Connectivity for Drivers" },
        { "@type": "Thing", name: "35% Mobile Plan Discount" },
      ],
      keywords: [
        "DriverX Mobile",
        "Driver Mobile Plans",
        "35% Mobile Plan Discount",
        "Rideshare Driver Mobile Plans",
        "Delivery Driver Connectivity",
        "Gig Worker Mobile Plans",
        "Fleet Connectivity Solutions",
      ],
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": "https://driverxmobile.com/#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};
