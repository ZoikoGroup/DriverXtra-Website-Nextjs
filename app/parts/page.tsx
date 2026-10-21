import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import PartsBrowser from "@/components/parts/PartsBrowser";
import ChoosingParts from "@/components/parts/ChoosingParts";
import { categoryPresets, faqs, isVehicleId, partQuestions, typePresets } from "@/components/parts/data";

export const metadata: Metadata = {
  title: "Shop All Parts & Accessories — DriverXtra",
  description:
    "Shop OEM, aftermarket, refurbished and performance parts. Check compatibility with your vehicle and review fitment before you buy.",
};

type PageProps = {
  /** From footer / menu links, e.g. /parts?type=oem or /parts?category=filters. */
  searchParams: Promise<{ type?: string; category?: string; q?: string; vehicle?: string }>;
};

export default async function PartsPage({ searchParams }: PageProps) {
  const { type, category, q, vehicle } = await searchParams;

  return (
    <>
      <PartsBrowser
        initialVehicle={isVehicleId(vehicle) ? vehicle : undefined}
        initialTypes={type ? typePresets[type] : undefined}
        initialCategories={category ? categoryPresets[category] : undefined}
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
