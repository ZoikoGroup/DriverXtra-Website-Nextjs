import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import TyresBrowser from "@/components/tires-and-wheels/TyresBrowser";
import { isVehicleId } from "@/components/parts/data";
import { labelQuestions } from "@/components/parts/vin-data";
import { faqs } from "@/components/tires-and-wheels/data";

export const metadata: Metadata = {
  title: "Tires & Wheels — DriverXtra",
  description:
    "Find tire and wheel options by vehicle details or product specifications — size, season, diameter and bolt pattern. Confirm fitment before ordering.",
};

type PageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function TiresAndWheelsPage({ searchParams }: PageProps) {
  const { vehicle } = await searchParams;

  return (
    <>
      <TyresBrowser initialVehicle={isVehicleId(vehicle) ? vehicle : undefined} />
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
        title="Tyres & wheels questions"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
