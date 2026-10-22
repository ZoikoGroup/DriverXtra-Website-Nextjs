import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import EvBrowser from "@/components/ev-components/EvBrowser";
import { isVehicleId } from "@/components/parts/data";
import { labelQuestions } from "@/components/parts/vin-data";
import type { Faq } from "@/components/ui/FaqSection";

export const metadata: Metadata = {
  title: "EV Components & Chargers — DriverXtra",
  description:
    "Browse charging equipment, cables and adapters from participating sellers. Check connector, power and installation requirements before ordering.",
};

const faqs: Faq[] = [
  {
    q: "Will a charger work with my car?",
    a: "Check the connector type, supported charging power and your home supply. We don't mark chargers as compatible without evidence for your exact vehicle and setup.",
  },
  {
    q: "Do home chargers need professional installation?",
    a: "Usually, yes. Fixed wallboxes generally need a qualified electrician and may need to meet local wiring and notification rules. Portable chargers plug into a suitable socket.",
  },
  {
    q: "Why can't I buy high-voltage components?",
    a: "High-voltage EV parts can be dangerous to fit and are often restricted to qualified buyers or trade accounts, depending on the market.",
  },
  {
    q: "Are certifications shown for every product?",
    a: "Only where the seller has provided them and they've been reviewed. If a certification isn't shown, don't assume the product has it.",
  },
];

type PageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function EvComponentsPage({ searchParams }: PageProps) {
  const { vehicle } = await searchParams;

  return (
    <>
      <EvBrowser initialVehicle={isVehicleId(vehicle) ? vehicle : undefined} />
      <ExplainerCards
        eyebrow="Reading a part listing"
        title="Each label answers a different question"
        description="“Aftermarket” is a product category — not a quality score, a safety certificate or proof it fits."
        items={labelQuestions}
        whatLabel="What it means"
        neverLabel="What it doesn't"
        className="bg-slate-50"
      />
      <FaqSection
        eyebrow="Aftermarket parts questions"
        title="EV components questions (proposed)"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
