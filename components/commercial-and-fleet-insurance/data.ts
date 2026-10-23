import type { Faq } from "@/components/ui/FaqSection";

export const businessOptions = [
  {
    id: "single",
    title: "A single business vehicle",
    text: "A van, car or pickup used for work",
    detailTitle: "A single business vehicle",
    detail:
      "Tell the insurer exactly how it's used — for example visiting customers, carrying tools or making deliveries. Business use usually isn't covered by a personal policy.",
    points: ["Who drives it, and for what work", "Tools or equipment kept in it", "Where it's kept overnight"],
  },
  {
    id: "fleet",
    title: "A fleet",
    text: "Several vehicles under one business",
    detailTitle: "A fleet",
    detail:
      "A fleet policy can cover several vehicles under one agreement. Insurers look at the whole operation — vehicle types, drivers and claims across the fleet.",
    points: ["How many vehicles, and of which types", "Who's authorised to drive them", "Claims history across the fleet", "Driver checks, telematics or maintenance records"],
  },
] as const;

export type BusinessOptionId = (typeof businessOptions)[number]["id"];

export const risks = [
  {
    title: "Liability on the road",
    text: "Damage or injury your drivers cause while working. Limits may need to be higher for business use.",
    image: "/images/commercial-and-fleet-insurance/liability-on-the-road.webp",
    alt: "A white lorry driving along a sunny highway",
  },
  {
    title: "Vehicles and equipment",
    text: "Damage to the vehicles, plus tools or fitted equipment where the policy includes it.",
    image: "/images/commercial-and-fleet-insurance/vehicles-and-equipment.webp",
    alt: "Water droplets on glass in teal and orange light",
  },
  {
    title: "Goods in transit",
    text: "Loss of or damage to goods you carry — often separate cover.",
    image: "/images/commercial-and-fleet-insurance/goods-in-transit.webp",
    alt: "A covered truck driving along a mountain road",
  },
];

export const matrix: [string, string, string][] = [
  ["Who can drive", "Named drivers", "Often any authorised employee, with conditions"],
  ["Policy structure", "One vehicle policy", "One policy covering many vehicles"],
  ["Claims history", "The vehicle and driver", "Across the whole fleet"],
  ["Risk management", "Basic", "Driver checks, telematics and maintenance records may be asked for"],
  ["Territory", "Where the vehicle operates", "Every operating area must be declared"],
];

export const businessTypes = ["Trades and services", "Delivery and courier", "Haulage and logistics", "Passenger transport", "Construction", "Rental or leasing", "Other"];
export const operatingAreas = ["Local (one town or city)", "Regional", "National", "International"];
export const vehicleClasses = ["Cars", "Vans", "Pickups", "Trucks", "Minibuses"];

export const faqs: Faq[] = [
  {
    q: "Can I get an instant commercial quote here?",
    a: "No. Commercial cover depends on your business and is assessed by insurers or brokers. This page helps you prepare.",
  },
  {
    q: "Is my personal policy enough for work driving?",
    a: "Usually not. Most personal policies exclude business use beyond commuting. Check your policy and tell your insurer how the vehicle is used.",
  },
  {
    q: "What's a fleet policy?",
    a: "One policy that covers several vehicles under one business, often with more flexible driver rules. The number of vehicles needed varies by insurer.",
  },
  {
    q: "Do I need goods-in-transit cover?",
    a: "If you carry goods for your business or for customers, motor cover often won't pay for loss or damage to them. Goods-in-transit cover is usually separate.",
  },
  {
    q: "Who decides the terms?",
    a: "The insurer, sometimes through a broker. DriverXtra doesn't set prices, terms or eligibility.",
  },
];
