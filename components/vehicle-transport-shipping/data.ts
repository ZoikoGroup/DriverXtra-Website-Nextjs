import type { Faq } from "@/components/ui/FaqSection";
import type { Charge, ServiceCard, Step } from "@/components/services/types";

export const img = (name: string) =>
  `/images/vehicle-transport-shipping/${name}`;

export const situations: ServiceCard[] = [
  {
    title: "Personal buyer or seller",
    text: "One vehicle, released by its owner or an authorised person.",
    image: img("card-personal.webp"),
    alt: "The side profile of a dark car",
  },
  {
    title: "Dealer transfer",
    text: "Stock moving between sites or to a buyer, with release instructions.",
    image: img("card-dealer.webp"),
    alt: "A grey sports saloon parked outside",
  },
  {
    title: "Fleet transfer",
    text: "Several vehicles with per-vehicle IDs and authorised recipients.",
    image: img("card-fleet.webp"),
    alt: "A lorry on a road under a blue sky",
  },
  {
    title: "Collector vehicle",
    text: "Classic or high-value vehicles that may need enclosed transport.",
    image: img("card-collector.webp"),
    alt: "A black sports car driving on a road",
  },
];

export const serviceTypes = [
  {
    id: "open",
    title: "Open transport",
    text: "Uncovered carrier",
    points: [
      "Uses an uncovered trailer — the vehicle is exposed to outdoor conditions.",
      "Commonly available for standard cars, where providers support the route.",
      "Handling and equipment depend on the provider.",
    ],
  },
  {
    id: "enclosed",
    title: "Enclosed transport",
    text: "Covered equipment",
    points: [
      "Uses a covered trailer or container — the vehicle is protected from weather and road debris.",
      "Often chosen for classic, high-value or low-clearance vehicles.",
      "Usually fewer slots and a higher price than open transport, depending on the provider.",
    ],
  },
  {
    id: "pickup",
    title: "Pickup & delivery",
    text: "Door-to-door or terminal",
    points: [
      "Door-to-door: the carrier collects and delivers as close to the address as is safe and legal.",
      "Terminal: you drop off or collect the vehicle at the provider's depot.",
      "Access, timing and any storage charges depend on the provider.",
    ],
  },
] as const;
export type ServiceTypeId = (typeof serviceTypes)[number]["id"];

export const vehicleTypes = ["Car", "SUV / 4x4", "Van", "Motorcycle", "Other"];
export const transportTypes = [
  "Open transport",
  "Enclosed transport",
  "No preference",
];
export const flexibility = [
  "Exact date",
  "Within a few days",
  "Within 2 weeks",
  "Flexible",
];

export const quoteLines: Charge[] = [
  {
    charge: "Base freight",
    covers: "The route, vehicle and service type it covers",
    status: "included",
  },
  {
    charge: "Options",
    covers: "Enclosed equipment, top loading, expedited windows",
    status: "conditional",
  },
  {
    charge: "Accessorial charges",
    covers: "Inoperable handling, limited access, extra stops",
    status: "conditional",
  },
  {
    charge: "Fuel and tolls",
    covers: "Whether they're included or added later",
    status: "unknown",
  },
  {
    charge: "Storage",
    covers: "Terminal or delay storage, and when it starts",
    status: "conditional",
  },
  { charge: "Taxes", covers: "Which taxes apply", status: "unknown" },
  {
    charge: "Total",
    covers: "Only called final when every mandatory fee is known",
    status: "not-confirmed",
  },
];

export const shipmentSteps: Step[] = [
  {
    title: "Requested",
    text: "You sent a quote request. Nothing is booked.",
    meta: "Reported by: You",
  },
  {
    title: "Offered",
    text: "A named provider offers terms, a window and an expiry.",
    meta: "Reported by: Provider",
  },
  {
    title: "Accepted",
    text: "You accept the exact quote version. Changes need new acceptance.",
    meta: "Reported by: You",
  },
  {
    title: "Confirmed",
    text: "The carrier confirms the arrangement and pickup window.",
    meta: "Reported by: Carrier",
  },
  {
    title: "Picked up",
    text: "Pickup condition record — captured at vehicle handover.",
    meta: "Reported by: Carrier and releaser",
  },
  {
    title: "In transit",
    text: "Milestones from the provider. Not necessarily live location.",
    meta: "Reported by: Carrier",
  },
  {
    title: "Delivered",
    text: "You inspect and record any differences before acknowledging.",
    meta: "Reported by: Carrier and receiver",
  },
];

export const pickupChecklist = [
  "Read the assigned provider's current instructions",
  "Remove valuables and follow the personal-items policy",
  "Have the keys the carrier needs ready",
  "Disclose anything that affects starting, rolling, steering or braking",
  "Photograph the vehicle's visible condition before handover",
  "Confirm safe, legal access for loading",
];

export const faqs: Faq[] = [
  {
    q: "How does vehicle transport through DriverXtra work?",
    a: "Explore transport methods and give basic route and vehicle details. Where participating providers support the request, you can ask for a quotation or continue to a named provider. The performing carrier, exact scope, booking and payment terms must be confirmed before transport is arranged.",
  },
  {
    q: "What is the difference between open and enclosed transport?",
    a: "Open transport uses an uncovered trailer, so the vehicle is exposed to weather and road conditions. Enclosed transport uses covered equipment and is often chosen for classic or high-value vehicles. Availability and price depend on the provider and route.",
  },
  {
    q: "Can I ship a car that does not start?",
    a: "Often yes, but tell the provider first. Vehicles that don't start, roll, steer or brake may need a winch or special equipment, which can add an accessorial charge.",
  },
  {
    q: "Can you transport an electric vehicle?",
    a: "Many providers can. Tell them it's electric, its weight and charge level, and whether it can be driven on and off. Some carriers have their own charge-level rules.",
  },
  {
    q: "Do I need to know the exact pickup and delivery address for an estimate?",
    a: "No. A city or postal area is enough to start. The exact address is only needed later, when a named provider prepares a quotation or booking.",
  },
  {
    q: "How long will my vehicle take to arrive?",
    a: "It depends on the distance, route, service type and the provider's schedule. The provider should give a pickup and delivery window — treat it as an estimate unless it's confirmed in writing.",
  },
  {
    q: "Can I choose a guaranteed pickup date?",
    a: "Some providers offer guaranteed or expedited windows, usually at an extra cost. Check exactly what is guaranteed and what happens if it's missed.",
  },
  {
    q: "How much does vehicle shipping cost?",
    a: "Prices aren't shown here until a provider quotes them. Cost usually depends on distance, vehicle size and condition, open or enclosed equipment, access and timing.",
  },
  {
    q: "Are taxes, fuel surcharges and other fees included?",
    a: "Not always. A quotation should list base freight, options, accessorial charges, fuel, tolls, storage and taxes separately. Only treat the total as final when every mandatory fee is known.",
  },
  {
    q: "Will my car be insured while being transported?",
    a: "Carriers usually have liability cover, but its limits and terms differ. Ask for the provider's current cover documents, and check whether your own insurance applies during transport.",
  },
  {
    q: "Can I leave personal items inside the car?",
    a: "Follow the provider's personal-items policy. Many don't allow personal items or don't cover them, so remove valuables before handover.",
  },
  {
    q: "What should I prepare for vehicle pickup?",
    a: "Read the provider's instructions, remove valuables, have the right keys ready, disclose any mechanical issues, photograph the vehicle and make sure there's safe access for loading.",
  },
  {
    q: "What is a pickup condition report?",
    a: "A record of the vehicle's visible condition at handover, usually with photos, agreed by the carrier and the person releasing the vehicle. It's compared with the vehicle's condition at delivery.",
  },
  {
    q: "Can I track my vehicle live?",
    a: "Not necessarily. Providers may share milestones such as pickup and delivery updates rather than a live location. Check what tracking the provider actually offers.",
  },
  {
    q: "What if the carrier changes the quote after I request transport?",
    a: "A changed quote is a new version. You'd need to review and accept it again before it applies — the earlier acceptance doesn't carry over.",
  },
  {
    q: "Can I cancel or change a confirmed shipment?",
    a: "It depends on the provider's terms. Check cancellation windows and any fees before you accept a quote.",
  },
  {
    q: "What should I do if my car arrives damaged?",
    a: "Record the damage on the delivery condition report before you sign, take photos, and contact the provider straight away. Claims follow the provider's liability terms.",
  },
  {
    q: "Does DriverXtra itself operate the trucks or guarantee delivery?",
    a: "No. DriverXtra helps you explore options and contact participating providers. The named carrier or broker is responsible for the transport and its terms.",
  },
];
