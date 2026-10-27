import type { Faq } from "@/components/ui/FaqSection";
import type { CatalogItem } from "@/components/services/ServiceCatalog";
import type { Charge } from "@/components/services/ServiceParts";

export const storageTypes: CatalogItem[] = [
  {
    id: "outdoor-parking",
    title: "Outdoor parking",
    text: "An open space on a secured lot. Exposed to weather.",
    image: "/images/storage/outdoor-parking.png",
    alt: "Rows of cars parked in a dimly lit car park",
  },
  {
    id: "covered-storage",
    title: "Covered storage",
    text: "A roof but open sides — some weather protection.",
    image: "/images/storage/covered-storage.png",
    alt: "An aerial view of cars on a parking structure",
  },
  {
    id: "indoor-storage",
    title: "Indoor storage",
    text: "Inside a building, often with more controlled access.",
    image: "/images/storage/indoor-storage.png",
    alt: "A black Porsche Panamera driving on a motorway",
  },
  {
    id: "climate-controlled",
    title: "Climate-controlled",
    text: "Indoor with managed temperature or humidity, where offered.",
    image: "/images/storage/climate-controlled.png",
    alt: "A grey BMW coupe parked at dusk",
  },
];

export const vehicleSizes = ["Motorcycle", "Small car", "Family car / estate", "SUV / 4x4", "Van", "Motorhome / caravan", "Classic or high-value vehicle"];

export const durations = ["Under 1 week", "1–4 weeks", "1–3 months", "3–6 months", "6–12 months", "Over 12 months"];

export const charges: Charge[] = [
  { charge: "Storage rate", covers: "Per day, week or month, for a stated space", status: "quoted" },
  { charge: "Deposit", covers: "If required, and how it's returned", status: "quoted" },
  { charge: "Access fees", covers: "For out-of-hours or extra visits", status: "conditional" },
  { charge: "Battery care / services", covers: "Only if offered and requested", status: "consent" },
];

export const steps = [
  { title: "Storage types and fit", text: "Match the vehicle and duration to a storage type." },
  { title: "Facility terms and security evidence", text: "Facilities would show their access hours, security and terms." },
  { title: "Reservation and custody", text: "A reservation exists only when the facility confirms it." },
  { title: "Access, release and disputes", text: "Only authorized people can collect; disputes follow the facility's process." },
];

export const records = [
  "Facility's current terms and access hours",
  "Condition record at drop-off (photos, mileage, fuel)",
  "Who is authorized to collect the vehicle",
  "Insurance position — the facility's, and your own",
  "Release record when the vehicle leaves",
];

export const faqs: Faq[] = [
  { q: "Is my vehicle insured while stored?", a: "Not automatically. Check the facility's terms and your own policy." },
  {
    q: "Can someone else collect my vehicle?",
    a: "Only if you've named them as authorized in advance. The facility should check their identity before releasing the vehicle.",
  },
  {
    q: "Is an inquiry a reservation?",
    a: "No. Saving a request or asking about space doesn't hold a spot. A reservation exists only when the facility confirms it in writing.",
  },
  {
    q: "Do I need to keep the battery charged?",
    a: "For longer stays it helps. Some facilities offer battery care as a paid extra — it should only be added with your consent.",
  },
  {
    q: "Can I visit my vehicle?",
    a: "It depends on the facility's access hours. Out-of-hours or extra visits may carry an access fee, which should be stated upfront.",
  },
  {
    q: "What if there's damage during storage?",
    a: "Compare the vehicle against the drop-off condition record and raise it with the facility straight away. Unresolved issues follow the facility's dispute process.",
  },
];
