import {
  Accessibility,
  ArrowDownAZ,
  ArrowLeftRight,
  Armchair,
  Award,
  BadgeCheck,
  Ban,
  Bell,
  BookOpen,
  Box,
  Briefcase,
  Building2,
  Calculator,
  CalendarClock,
  CalendarDays,
  Camera,
  Car,
  CarFront,
  ChartColumn,
  ChartLine,
  ChartPie,
  CircleDollarSign,
  CircleDot,
  CircleHelp,
  ClipboardList,
  Clock,
  CloudUpload,
  Coins,
  Cpu,
  CreditCard,
  Database,
  Disc3,
  Droplet,
  Factory,
  FileCheck2,
  FileCode,
  FileLock2,
  FileSearch,
  FileText,
  Filter,
  Flag,
  Gauge,
  Gavel,
  Gem,
  Globe,
  Handshake,
  HardHat,
  Headphones,
  IdCard,
  Landmark,
  Leaf,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  MessageCircleQuestionMark,
  MessageSquareMore,
  MonitorCog,
  Package,
  Percent,
  PiggyBank,
  PlugZap,
  Receipt,
  RefreshCw,
  Scale,
  ScanBarcode,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  ShieldPlus,
  SprayCan,
  Star,
  Store,
  Tag,
  Target,
  TrendingUp,
  TriangleAlert,
  Truck,
  Umbrella,
  User,
  UserPlus,
  Users,
  Warehouse,
  Webhook,
  Wifi,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type MegaItem = {
  label: string;
  icon: LucideIcon;
  /** Small grey caption under the label, e.g. "Signed in". */
  note?: string;
};

export type MegaColumn = {
  title: string;
  items: MegaItem[];
};

export type MegaBanner = {
  /** "full": image strip across the bottom. "split": buttons left, image fades in on the right. */
  layout: "full" | "split";
  /** Drop an image at this path in /public — a dark gradient is shown until it exists. */
  image: string;
  primary: string;
  secondary?: { label: string; icon: LucideIcon };
  note?: string;
};

export type MegaMenu = {
  label: string;
  uppercaseTitles?: boolean;
  columns: MegaColumn[];
  banner: MegaBanner;
};

export const megaMenus: MegaMenu[] = [
  {
    label: "Buy Vehicles",
    columns: [
      {
        title: "Start Shopping",
        items: [
          { label: "Browse All Vehicles", icon: Search },
          { label: "New Vehicles", icon: Star },
          { label: "Used Vehicles", icon: Car },
          { label: "Certified Vehicles", icon: ShieldCheck },
          { label: "Newly Listed", icon: Clock },
        ],
      },
      {
        title: "Browse by Type",
        items: [
          { label: "SUVs & Crossovers", icon: CarFront },
          { label: "Sedans & Coupes", icon: Car },
          { label: "Trucks & Vans", icon: Truck },
          { label: "Electric & Hybrid", icon: Leaf },
          { label: "Luxury & Performance", icon: Gem },
          { label: "Commercial & Fleet", icon: Building2 },
          { label: "Classic & Collector", icon: LifeBuoy },
        ],
      },
      {
        title: "Browse by Need",
        items: [
          { label: "Near Me", icon: MapPin },
          { label: "By Price", icon: Tag },
          { label: "By Monthly Budget", icon: Calculator },
          { label: "Price Reduced", icon: Percent },
          { label: "Verified Seller Inventory", icon: BadgeCheck },
        ],
      },
      {
        title: "Brands & Research",
        items: [
          { label: "Browse by Brand", icon: CarFront },
          { label: "View All Brands A–Z", icon: ArrowDownAZ },
          { label: "Compare Vehicles", icon: ChartColumn },
          { label: "Price Alerts", icon: Bell },
          { label: "Ownership Cost", icon: FileText },
        ],
      },
      {
        title: "Guidance",
        items: [
          { label: "Buying Guide", icon: BookOpen },
          { label: "Vehicle History", icon: FileText },
          { label: "How Verification Works", icon: ShieldCheck },
          { label: "Buyer Safety", icon: Users },
        ],
      },
    ],
    banner: { layout: "full", image: "/images/menu/buy-vehicles.jpg", primary: "Browse All Vehicles" },
  },
  {
    label: "Sell Vehicles",
    columns: [
      {
        title: "Start Selling",
        items: [
          { label: "Value My Vehicle", icon: Tag },
          { label: "List for Sale", icon: FileText },
          { label: "Get an Instant Offer", icon: Zap },
          { label: "Trade In", icon: ArrowLeftRight },
          { label: "Consignment", icon: Handshake },
        ],
      },
      {
        title: "Seller Tools",
        items: [
          { label: "Pricing Guidance", icon: ChartColumn },
          { label: "Prepare My Listing", icon: FileText },
          { label: "Photo Checklist", icon: Camera },
          { label: "Manage Listings", icon: Settings, note: "Signed in" },
          { label: "Messages", icon: Mail, note: "Signed in" },
        ],
      },
      {
        title: "Documents",
        items: [
          { label: "Ownership / Title Requirements", icon: FileText },
          { label: "Odometer / Mileage Disclosure", icon: Gauge },
          { label: "Document Upload Guidance", icon: CloudUpload },
          { label: "PII Redaction", icon: FileLock2 },
        ],
      },
      {
        title: "Trust & Safety",
        items: [
          { label: "Seller Verification", icon: ShieldCheck },
          { label: "Secure Messaging", icon: Lock },
          { label: "Payment Protection Scope", icon: CreditCard },
          { label: "Seller Safety", icon: Users },
          { label: "Disputes & Appeals", icon: TriangleAlert },
        ],
      },
      {
        title: "Learn",
        items: [
          { label: "How Selling Works", icon: BookOpen },
          { label: "Selling Guide", icon: FileText },
          { label: "Fees & Disclosures", icon: CircleDollarSign },
          { label: "Help Center", icon: CircleHelp },
        ],
      },
    ],
    banner: {
      layout: "full",
      image: "/images/menu/sell-vehicles.jpg",
      primary: "Get Your Value",
      secondary: { label: "List a Vehicle", icon: FileText },
    },
  },
  {
    label: "Parts & Accessories",
    columns: [
      {
        title: "Shop by Vehicle",
        items: [
          { label: "Enter VIN", icon: ScanBarcode },
          { label: "Choose Make / Model / Year / Trim", icon: Car },
          { label: "Use My Garage", icon: Warehouse },
          { label: "Fitment Help", icon: Search },
        ],
      },
      {
        title: "Repair & Maintain",
        items: [
          { label: "Brakes & Suspension", icon: Disc3 },
          { label: "Engine & Powertrain", icon: Settings },
          { label: "Exhaust & Emissions", icon: Wind },
          { label: "Fluids & Consumables", icon: Droplet },
          { label: "Filters", icon: Filter },
        ],
      },
      {
        title: "Upgrade",
        items: [
          { label: "Tires & Wheels", icon: CircleDot },
          { label: "Performance & Tuning", icon: Target },
          { label: "Electronics & Infotainment", icon: Cpu },
          { label: "Interior Accessories", icon: Armchair },
          { label: "Exterior Accessories", icon: CarFront },
        ],
      },
      {
        title: "EV & Workshop",
        items: [
          { label: "EV Components & Chargers", icon: PlugZap },
          { label: "Sensors", icon: Wifi },
          { label: "Tools & Garage Equipment", icon: Wrench },
          { label: "Workshop Supplies", icon: Briefcase },
        ],
      },
      {
        title: "Trust & Business",
        items: [
          { label: "OEM Parts", icon: Settings },
          { label: "Aftermarket Parts", icon: Box },
          { label: "Refurbished / Used", icon: RefreshCw },
          { label: "Warranty & Returns", icon: ShieldCheck },
          { label: "Verified Parts Sellers", icon: Users },
          { label: "Bulk / B2B Parts", icon: Warehouse },
        ],
      },
    ],
    banner: {
      layout: "full",
      image: "/images/menu/parts.jpg",
      primary: "Select Your Vehicle",
      secondary: { label: "Browse All Parts", icon: Box },
    },
  },
  {
    label: "Finance",
    columns: [
      {
        title: "Get Started",
        items: [
          { label: "Get Pre-Qualified", icon: FileCheck2 },
          { label: "Compare Vehicle Loans", icon: Scale },
          { label: "Compare Lease Offers", icon: FileText },
          { label: "Estimate Monthly Payment", icon: Calculator },
        ],
      },
      {
        title: "By Need",
        items: [
          { label: "New Vehicle Finance", icon: CarFront },
          { label: "Used Vehicle Finance", icon: Car },
          { label: "EV Finance", icon: PlugZap, note: "Where available" },
          { label: "Commercial / Fleet Finance", icon: Truck },
        ],
      },
      {
        title: "Understand Cost",
        items: [
          { label: "APR & Interest Guide", icon: Percent },
          { label: "Fees & Total Cost", icon: Coins },
          { label: "Deposit / Down Payment", icon: PiggyBank },
          { label: "Term Comparison", icon: ChartColumn },
        ],
      },
      {
        title: "Eligibility",
        items: [
          { label: "How Pre-Qualification Works", icon: FileSearch },
          { label: "Soft Check", icon: ShieldCheck, note: "Where permitted" },
          { label: "Partner Eligibility", icon: Users },
          { label: "Required Documents", icon: FileText },
        ],
      },
      {
        title: "Learn",
        items: [
          { label: "Finance Guide", icon: BookOpen },
          { label: "Finance FAQs", icon: MessageCircleQuestionMark },
          { label: "Partner Standards", icon: Handshake },
          { label: "Consumer Disclosures", icon: FileCheck2 },
        ],
      },
    ],
    banner: {
      layout: "full",
      image: "/images/menu/finance.jpg",
      primary: "Get Pre-Qualified",
      secondary: { label: "Compare Vehicle Loans", icon: Scale },
    },
  },
  {
    label: "Insurance",
    columns: [
      {
        title: "Compare Cover",
        items: [
          { label: "Compare Insurance", icon: FileSearch },
          { label: "Vehicle Insurance", icon: Car },
          { label: "Commercial & Fleet", icon: Truck },
          { label: "EV Cover", icon: PlugZap, note: "Where available" },
        ],
      },
      {
        title: "Coverage",
        items: [
          { label: "Liability / Third-Party", icon: ShieldCheck },
          { label: "Comprehensive", icon: Umbrella },
          { label: "Collision / Own Damage", icon: CarFront },
          { label: "Optional Protection", icon: ShieldPlus, note: "Market dependent" },
        ],
      },
      {
        title: "Understand",
        items: [
          { label: "Coverage Guide", icon: BookOpen },
          { label: "Exclusions & Excess / Deductible", icon: ClipboardList },
          { label: "What Affects Price", icon: ChartColumn },
          { label: "Claims Basics", icon: FileCheck2 },
        ],
      },
      {
        title: "Providers",
        items: [
          { label: "Regulated Partner Standards", icon: Users },
          { label: "How Comparison Works", icon: FileSearch },
          { label: "Privacy & Data Sharing", icon: Lock },
          { label: "Market Availability", icon: Globe },
        ],
      },
      {
        title: "Help",
        items: [
          { label: "Insurance FAQs", icon: MessageCircleQuestionMark },
          { label: "Glossary", icon: BookOpen },
          { label: "Consumer Disclosures", icon: FileCheck2 },
          { label: "Support", icon: Headphones },
        ],
      },
    ],
    banner: {
      layout: "full",
      image: "/images/menu/insurance.jpg",
      primary: "Compare Insurance",
      secondary: { label: "Coverage Guide", icon: BookOpen },
    },
  },
  {
    label: "Services",
    uppercaseTitles: true,
    columns: [
      {
        title: "Care & Repair",
        items: [
          { label: "Maintenance & Repair", icon: Wrench },
          { label: "Inspection & Appraisal", icon: FileSearch },
          { label: "Tires & Installation", icon: CircleDot },
          { label: "Diagnostics", icon: Cpu },
          { label: "Detailing & Cosmetics", icon: SprayCan },
        ],
      },
      {
        title: "Move & Protect",
        items: [
          { label: "Transport & Shipping", icon: Truck },
          { label: "Roadside Assistance", icon: TriangleAlert },
          { label: "Storage", icon: Warehouse },
          { label: "Warranties & Protection", icon: ShieldCheck },
        ],
      },
      {
        title: "Find Providers",
        items: [
          { label: "Near Me", icon: MapPin },
          { label: "By Vehicle", icon: Car },
          { label: "By Service Category", icon: Settings },
          { label: "Available Today", icon: CalendarClock, note: "Near you" },
          { label: "Browse Verified Providers", icon: Users },
        ],
      },
      {
        title: "Trust",
        items: [
          { label: "Provider Verification", icon: ShieldCheck },
          { label: "Licensing / Insurance", icon: FileText },
          { label: "Verified-Transaction Reviews", icon: Star },
          { label: "Pricing Transparency", icon: Tag },
          { label: "Service Disputes", icon: Gavel },
        ],
      },
      {
        title: "For Providers",
        items: [
          { label: "Become a Service Provider", icon: UserPlus },
          { label: "Provider Requirements", icon: ClipboardList },
          { label: "Manage Bookings", icon: CalendarDays, note: "Signed in" },
          { label: "Business Dashboard", icon: ChartColumn },
        ],
      },
    ],
    banner: {
      layout: "split",
      image: "/images/menu/services.jpg",
      primary: "Find Services",
      secondary: { label: "Book an Inspection", icon: CalendarDays },
    },
  },
  {
    label: "For Business",
    uppercaseTitles: true,
    columns: [
      {
        title: "Sell & Operate",
        items: [
          { label: "Dealers & Retailers", icon: Store },
          { label: "Parts Sellers", icon: Settings },
          { label: "Service Providers", icon: Wrench },
          { label: "OEMs / Distributors", icon: Factory },
        ],
      },
      {
        title: "Fleet",
        items: [
          { label: "Fleet Solutions", icon: CarFront },
          { label: "Bulk Acquisition", icon: Car },
          { label: "Vehicle Disposition", icon: Gavel },
          { label: "Parts Procurement", icon: Package },
          { label: "Lifecycle Analytics", icon: ChartColumn },
        ],
      },
      {
        title: "Financial Partners",
        items: [
          { label: "Lenders", icon: Landmark },
          { label: "Insurers", icon: ShieldCheck },
          { label: "Commercial / Fleet Partners", icon: Truck },
          { label: "Partner Standards", icon: FileCheck2 },
        ],
      },
      {
        title: "Growth",
        items: [
          { label: "Advertise on DriverXtra", icon: Megaphone },
          { label: "Sponsored Listing Standards", icon: Award },
          { label: "Dealer Storefronts", icon: Store },
          { label: "Promotions & Analytics", icon: TrendingUp },
        ],
      },
      {
        title: "Build & Integrate",
        items: [
          { label: "API Partners", icon: Share2 },
          { label: "Inventory Feeds", icon: Database },
          { label: "Webhooks", icon: Webhook },
          { label: "CRM / Workshop Integrations", icon: MonitorCog },
          { label: "Developer / Integration Docs", icon: FileCode },
        ],
      },
    ],
    banner: {
      layout: "split",
      image: "/images/menu/business.jpg",
      primary: "Explore Business Solutions",
      secondary: { label: "Become a Partner", icon: Users },
    },
  },
  {
    label: "Trust & Safety",
    uppercaseTitles: true,
    columns: [
      {
        title: "Verification",
        items: [
          { label: "How Verification Works", icon: ShieldCheck },
          { label: "Identity Verified", icon: IdCard },
          { label: "Verified Seller", icon: Award },
          { label: "Business Verified", icon: Building2 },
          { label: "Certified Partner", icon: Users },
          { label: "Parts Seller Verification", icon: FileCheck2 },
        ],
      },
      {
        title: "Transaction Protection",
        items: [
          { label: "Secure Payments", icon: Lock },
          { label: "Escrow — where applicable", icon: Database },
          { label: "Vehicle History", icon: Car },
          { label: "Fitment Confidence", icon: Settings },
          { label: "Secure Document Exchange", icon: FileText },
        ],
      },
      {
        title: "Safety",
        items: [
          { label: "Buyer Safety", icon: Users },
          { label: "Seller Safety", icon: User },
          { label: "Provider Safety", icon: HardHat },
          { label: "Counterfeit Prevention", icon: Package },
          { label: "Account Security", icon: ShieldCheck },
        ],
      },
      {
        title: "Resolve a Problem",
        items: [
          { label: "Disputes & Appeals", icon: MessageSquareMore },
          { label: "Report Fraud", icon: TriangleAlert },
          { label: "Report a Listing", icon: Flag },
          { label: "Identity Support", icon: Headphones },
          { label: "Payment / Order Support", icon: Receipt },
        ],
      },
      {
        title: "Privacy & Compliance",
        items: [
          { label: "Privacy & Data Protection", icon: FileLock2 },
          { label: "Local Compliance", icon: Scale },
          { label: "Accessibility", icon: Accessibility },
          { label: "Prohibited Content", icon: Ban },
          { label: "Transparency / Policies", icon: FileText },
        ],
      },
    ],
    banner: {
      layout: "split",
      image: "/images/menu/trust.jpg",
      primary: "Explore Trust & Safety",
      secondary: { label: "Report a Concern", icon: CircleHelp },
    },
  },
  {
    label: "Insights",
    uppercaseTitles: true,
    columns: [
      {
        title: "Market Intelligence",
        items: [
          { label: "Market Trends", icon: ChartColumn },
          { label: "Price Indices", icon: ChartLine },
          { label: "Regional Reports", icon: MapPin },
          { label: "Supply & Demand", icon: ChartPie },
          { label: "EV Adoption", icon: Leaf },
        ],
      },
      {
        title: "Ownership",
        items: [
          { label: "Ownership Costs", icon: Coins },
          { label: "Depreciation & Resale", icon: CarFront },
          { label: "Charging & Energy", icon: PlugZap },
          { label: "Maintenance Economics", icon: Wrench },
        ],
      },
      {
        title: "Guides",
        items: [
          { label: "Buying Guides", icon: BookOpen },
          { label: "Selling Guides", icon: Tag },
          { label: "Parts & Fitment Guides", icon: Settings },
          { label: "Service & Maintenance Guides", icon: ClipboardList },
          { label: "Finance & Insurance Explainers", icon: ShieldCheck },
        ],
      },
      {
        title: "Research Tools",
        items: [
          { label: "Vehicle Comparison", icon: Scale },
          { label: "Price Trends", icon: ChartColumn },
          { label: "Cost Calculators", icon: Calculator },
          { label: "Brand Directory A–Z", icon: Database },
        ],
      },
      {
        title: "Editorial Standards",
        items: [
          { label: "Editorial Policy", icon: FileText },
          { label: "Methodologies", icon: Search },
          { label: "Sponsored Content Policy", icon: Megaphone },
          { label: "Corrections / Contact", icon: Mail },
        ],
      },
    ],
    banner: {
      layout: "split",
      image: "/images/menu/insights.jpg",
      primary: "View All Insights",
      secondary: { label: "Explore Market Trends", icon: ChartColumn },
      note: "Sponsored content, if present on destination pages, is labeled and separated from independent editorial analysis.",
    },
  },
];
