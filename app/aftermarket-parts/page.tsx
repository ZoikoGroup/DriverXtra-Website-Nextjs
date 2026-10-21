import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import PartsBrowser from "@/components/parts/PartsBrowser";
import ChoosingParts from "@/components/parts/ChoosingParts";
import { faqs, isVehicleId, partQuestions } from "@/components/parts/data";

export const metadata: Metadata = {
  title: "Aftermarket Parts — DriverXtra",
  description:
    "Shop aftermarket, refurbished and performance parts from participating sellers, and review fitment and road-use notes before you buy.",
};

type PageProps = {
  searchParams: Promise<{ vehicle?: string; q?: string }>;
};

export default async function AftermarketPartsPage({ searchParams }: PageProps) {
  const { vehicle, q } = await searchParams;

  return (
    <>
      <PartsBrowser
        activeCard="aftermarket"
        shortTypeLabels
        initialVehicle={isVehicleId(vehicle) ? vehicle : undefined}
        initialQuery={q?.slice(0, 60)}
      />
      <ExplainerCards
        eyebrow="Reading a part listing"
        title="Four separate questions for every part"
        description="“Aftermarket” is a product category — not a quality score, a safety certificate or proof it fits."
        items={partQuestions}
        whatLabel="What it means"
        neverLabel="What it doesn't"
        className="bg-slate-50"
      />
      <ChoosingParts />
      <FaqSection
        eyebrow="Aftermarket parts questions"
        title="Shopping parts on DriverXtra"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
