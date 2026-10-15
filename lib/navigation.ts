export type LinkGroup = {
  title: string;
  links: string[];
};

export const footerColumns: LinkGroup[] = [
  {
    title: "Buy Vehicles",
    links: [
      "Browse All Vehicles",
      "Used Vehicles for Sale",
      "New Vehicles",
      "Certified Vehicles",
      "Electric & Hybrid Vehicles",
      "Commercial & Fleet Vehicles",
      "Advanced Vehicle Search",
    ],
  },
  {
    title: "Sell Vehicles",
    links: [
      "Value My Vehicle",
      "Sell My Vehicle",
      "Create a Listing",
      "Instant Offer",
      "Trade-In",
      "Consignment",
      "Manage My Listings",
    ],
  },
  {
    title: "Vehicle Categories",
    links: [
      "SUVs & Crossovers",
      "Sedans & Coupes",
      "Trucks & Vans",
      "Luxury & Performance",
      "Classic & Collector",
      "Motorcycles & Powersports",
      "All Vehicle Categories",
    ],
  },
  {
    title: "Brands & Discovery",
    links: [
      "All Brands A–Z",
      "Popular Vehicle Brands",
      "Electric Vehicle Brands",
      "Luxury Vehicle Brands",
      "Commercial Vehicle Brands",
      "Regional Brand Directory",
      "Compare Vehicles",
    ],
  },
  {
    title: "Parts & Accessories",
    links: [
      "Shop All Parts & Accessories",
      "Find Parts by VIN",
      "OEM Parts",
      "Aftermarket Parts",
      "Tires & Wheels",
      "EV Components & Chargers",
      "Tools & Workshop Equipment",
    ],
  },
  {
    title: "Vehicle Finance",
    links: [
      "Get Pre-Qualified",
      "Compare Vehicle Finance",
      "Loan & Lease Options",
      "Finance Calculator",
      "Finance Guides",
      "Finance Partners",
      "Finance Disclosures",
    ],
  },
  {
    title: "Insurance",
    links: [
      "Compare Insurance",
      "Personal Vehicle Insurance",
      "Commercial & Fleet Insurance",
      "Coverage Guide",
      "Insurance Partners",
      "Insurance Help",
      "Insurance Disclosures",
    ],
  },
  {
    title: "Automotive Services",
    links: [
      "Inspection & Appraisal",
      "Maintenance & Repair",
      "Tires & Installation",
      "Vehicle Transport & Shipping",
      "Detailing & Cosmetics",
      "Storage",
      "Roadside Assistance",
    ],
  },
  {
    title: "Dealers & Retailers",
    links: [
      "Dealer Solutions",
      "Open a Dealer Storefront",
      "Inventory Feeds",
      "Lead & CRM Integrations",
      "Dealer Verification",
      "Dealer Analytics",
      "Dealer Support",
    ],
  },
  {
    title: "Fleets & Enterprise",
    links: [
      "Fleet Solutions",
      "Fleet Acquisition",
      "Fleet Disposition",
      "Maintenance Networks",
      "Parts Procurement",
      "Lifecycle Analytics",
      "Enterprise Contact",
    ],
  },
  {
    title: "Providers & Parts Sellers",
    links: [
      "Become a Service Provider",
      "Become a Parts Seller",
      "OEM & Distributor Program",
      "Inspection Partner Program",
      "Transport Partner Program",
      "Finance & Insurance Partners",
      "Partner Onboarding",
    ],
  },
  {
    title: "Developers & Integrations",
    links: [
      "Developer Hub",
      "API Documentation",
      "Webhooks",
      "Inventory & Catalog Integrations",
      "Order & Booking Integrations",
      "Platform Status",
      "Security & Integration Guidance",
    ],
  },
  {
    title: "Trust & Safety",
    links: [
      "How Verification Works",
      "Buyer Safety",
      "Seller Safety",
      "Parts Authenticity & Anti-Counterfeit",
      "Report a Listing",
      "Report Fraud",
      "Disputes & Appeals",
    ],
  },
  {
    title: "Resources & Insights",
    links: [
      "Automotive Insights",
      "Market Trends & Price Indices",
      "Ownership Cost Guides",
      "EV & Charging Guides",
      "Buying & Selling Guides",
      "Newsroom",
      "Methodology & Data Standards",
    ],
  },
  {
    title: "Company & Support",
    links: [
      "About DriverXtra",
      "How DriverXtra Works",
      "Help Center",
      "Contact DriverXtra",
      "Careers",
      "Press & Media",
      "Partner With Us",
    ],
  },
  {
    title: "Legal, Accessibility & Global",
    links: [
      "Terms of Use",
      "Privacy Policy",
      "Cookie Policy",
      "Privacy Choices",
      "Accessibility Statement",
      "Compliance Disclosures",
      "Sitemap & Global Markets",
    ],
  },
];

export const legalLinks = [
  "Terms of Use",
  "Privacy Policy",
  "Cookie Policy",
  "Cookie Settings",
  "Privacy Choices",
  "Accessibility",
  "Compliance Disclosures",
  "Sitemap",
];

/** Links that point to real pages; everything else is "#" until its page exists. */
const pageLinks: Record<string, string> = {
  "About DriverXtra": "/about-driverxtra",
  "Browse All Vehicles": "/buy-vehicles",
  "Used Vehicles for Sale": "/buy-vehicles?type=used",
  "New Vehicles": "/buy-vehicles?type=new",
  "Certified Vehicles": "/buy-vehicles?type=certified",
  "Electric & Hybrid Vehicles": "/buy-vehicles?type=electric",
  "Commercial & Fleet Vehicles": "/buy-vehicles?type=commercial",
  "Advanced Vehicle Search": "/buy-vehicles?type=advanced",
  "Instant Offer": "/instant-offer",
  "Trade-In": "/trade-in",
  "Sell My Vehicle": "/sell-vehicles",
  "Value My Vehicle": "/sell-vehicles#value-my-vehicle",
  "Create a Listing": "/sell-vehicles#create-listing",
  // Header mega-menu labels
  "Used Vehicles": "/buy-vehicles?type=used",
  "Get an Instant Offer": "/instant-offer",
  "Trade In": "/trade-in",
  "List for Sale": "/sell-vehicles#create-listing",
  "How Selling Works": "/sell-vehicles#how-selling-works",
  "Seller Safety": "/sell-vehicles#seller-readiness",
  // Header / mega-menu banner buttons
  "Sell Vehicle": "/sell-vehicles",
  "Get Your Value": "/sell-vehicles#value-my-vehicle",
  "List a Vehicle": "/sell-vehicles#create-listing",
  "Check Offer Availability": "/instant-offer",
};

export const hrefFor = (label: string) => pageLinks[label] ?? "#";
