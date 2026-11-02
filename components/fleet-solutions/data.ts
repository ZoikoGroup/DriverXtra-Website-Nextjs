const ICONS = "/images/fleet-solutions/icons";

export type FleetIcon = "sliders" | "truck" | "car" | "wrench" | "clip" | "gauge" | "flag" | "msg" | "building" | "card";

export const iconSrc = (name: FleetIcon) => `${ICONS}/icon-${name}.svg`;
export const SCALE_ICON = `${ICONS}/icon-scale.svg`;
export const PLUS_ICON = `${ICONS}/icon-plus.svg`;
export const PLUS_OPEN_ICON = `${ICONS}/icon-plus-open.svg`;

export const HERO_IMAGE = "/images/fleet-solutions/fleet-hero-vans-depot.webp";

export const SUB_NAV = [
  { label: "Fleet Solutions", href: "/fleet-solutions" },
  { label: "Fleet Acquisition", href: "/fleet-acquisition" },
  { label: "Fleet Disposition", href: "/fleet-disposition" },
  { label: "Maintenance Networks", href: "/maintenance-networks" },
  { label: "Parts Procurement", href: "/parts-procurement" },
  { label: "Lifecycle Analytics", href: "/lifecycle-analytics" },
  { label: "Enterprise Contact", href: "/enterprise-contact" },
];

export const JOURNEY: { icon: FleetIcon; title: string; text: string }[] = [
  { icon: "sliders", title: "1. Plan", text: "Define needs and governance" },
  { icon: "truck", title: "2. Acquire", text: "Requirements and sourcing" },
  { icon: "car", title: "3. Operate", text: "Day-to-day fleet use" },
  { icon: "wrench", title: "4. Maintain", text: "Service-network coordination" },
  { icon: "clip", title: "5. Procure parts", text: "Fitment-aware sourcing" },
  { icon: "gauge", title: "6. Analyze", text: "Source-labelled reporting" },
  { icon: "flag", title: "7. Dispose", text: "Exits with evidence" },
];

export const MODULES: { icon: FleetIcon; title: string; text: string; href: string }[] = [
  {
    icon: "truck",
    title: "Fleet Acquisition",
    text: "Define vehicle requirements and compare sourcing responses with approvals.",
    href: "/fleet-acquisition",
  },
  {
    icon: "flag",
    title: "Fleet Disposition",
    text: "Plan exits with condition, authority and handover evidence.",
    href: "/fleet-disposition",
  },
  {
    icon: "wrench",
    title: "Maintenance Networks",
    text: "Explore service-network options and coordinate maintenance.",
    href: "/maintenance-networks",
  },
  {
    icon: "clip",
    title: "Parts Procurement",
    text: "Source parts with fitment checks and governed purchasing.",
    href: "/parts-procurement",
  },
  {
    icon: "gauge",
    title: "Lifecycle Analytics",
    text: "Fleet reporting with transparent data coverage.",
    href: "/lifecycle-analytics",
  },
  {
    icon: "msg",
    title: "Enterprise Contact",
    text: "Reach the right enterprise team.",
    href: "/enterprise-contact",
  },
];

export const GOVERNANCE = [
  "Enquiry ≠ quote ≠ contract",
  "Sourcing request ≠ supplier response ≠ award",
  "Estimate ≠ approved work",
  "Candidate part match ≠ verified fitment",
  "Valuation ≠ sale price",
  "Missing metric ≠ zero",
];

export const ROLES: { icon: FleetIcon; title: string; text: string }[] = [
  { icon: "building", title: "Fleet Director", text: "Scoped overview and approvals." },
  { icon: "card", title: "Procurement Manager", text: "Requests, RFQs and supplier responses." },
  { icon: "wrench", title: "Maintenance Manager", text: "Service cases and estimates." },
  { icon: "flag", title: "Asset Manager", text: "Disposition drafts and evidence." },
];

// Figma only provides the first answer; the rest are collapsed and have no copy yet.
export const FAQS = [
  {
    q: "What is Fleet Solutions?",
    a: "A front door to DriverXtra's fleet modules: acquisition, maintenance networks, parts procurement, analytics and disposition.",
  },
  { q: "Is this a managed fleet service?", a: "" },
  { q: "Can I see real data in the workspace?", a: "" },
  { q: "Who approves decisions?", a: "" },
  { q: "Is every module available in my market?", a: "" },
  { q: "How do I start?", a: "" },
];
