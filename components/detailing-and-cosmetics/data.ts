import type { Faq } from "@/components/ui/FaqSection";
import type { CatalogItem } from "@/components/services/ServiceCatalog";
import type { Charge } from "@/components/services/ServiceParts";

export const services: CatalogItem[] = [
  {
    id: "interior-clean",
    title: "Interior clean",
    text: "Vacuuming, surfaces and upholstery cleaning to a stated scope.",
    image: "/images/detailing-and-cosmetics/interior-clean.png",
    alt: "A dark sports car parked under a cloudy sky",
  },
  {
    id: "exterior-wash",
    title: "Exterior wash & protect",
    text: "Hand wash, decontamination and a protective layer.",
    image: "/images/detailing-and-cosmetics/hero-detailing-and-cosmetics.webp",
    alt: "A person hand-washing a black car covered in foam",
  },
  {
    id: "paint-correction",
    title: "Paint correction",
    text: "Machine polishing to reduce swirls and light scratches. Results depend on paint depth.",
    image: "/images/detailing-and-cosmetics/paint-correction.png",
    alt: "A black Porsche Panamera driving on a motorway",
  },
  {
    id: "smart-repair",
    title: "Smart repair",
    text: "Small cosmetic repairs such as kerbed wheels or minor scuffs.",
    image: "/images/detailing-and-cosmetics/smart-repair.png",
    alt: "A grey BMW coupe parked at dusk",
  },
];

export const vehicleTypes = ["Small car", "Family car / estate", "SUV / 4x4", "Van", "Motorcycle", "Other"];

export const charges: Charge[] = [
  { charge: "Base service", covers: "For the stated scope and vehicle size", status: "quoted" },
  { charge: "Condition surcharge", covers: "For heavy soiling, pet hair or similar", status: "consent" },
  { charge: "Add-ons", covers: "Ceramic coating, odour treatment, etc.", status: "consent" },
  { charge: "Mobile visit", covers: "Only if the provider comes to you", status: "conditional" },
];

export const steps = [
  { title: "Service catalog", text: "Pick the service and the scope you're after." },
  { title: "Provider methods and evidence", text: "Providers would explain products, methods and examples." },
  { title: "Approve scope and add-ons", text: "Any add-on or extra charge needs your consent first." },
  { title: "Before/after and aftercare", text: "Photos at handover, and how to care for the finish." },
];

export const records = [
  "Agreed scope and any add-ons you approved",
  "Before photos at drop-off",
  "After photos at handover",
  "Products used, where the provider shares them",
  "Aftercare instructions",
];

export const faqs: Faq[] = [
  { q: "Will paint correction remove every scratch?", a: "Not necessarily. Deep scratches may need paint repair; results depend on the paint." },
  {
    q: "Is a ceramic coating permanent?",
    a: "No. Coatings wear over time. The provider should state how long theirs is expected to last and what aftercare it needs.",
  },
  {
    q: "Can the price change on the day?",
    a: "Only with your consent. If the vehicle's condition differs from what was described, the provider must explain any surcharge before doing the work.",
  },
  {
    q: "Does detailing fix damage?",
    a: "Detailing improves appearance. Dents, deep scratches or panel damage usually need a smart repair or bodywork specialist.",
  },
  {
    q: "Should I remove personal items?",
    a: "Yes. Remove valuables and personal items before drop-off or a mobile visit, so nothing is lost or damaged during cleaning.",
  },
  {
    q: "What if I'm unhappy with the result?",
    a: "Raise it with the provider at handover and compare against the agreed scope and before photos. If it isn't resolved, you can open a service dispute.",
  },
];
