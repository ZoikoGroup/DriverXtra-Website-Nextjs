import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import OemBrowser from "@/components/oem-parts/OemBrowser";
import { isVehicleId } from "@/components/parts/data";
import { faqs, listingChecks } from "@/components/oem-parts/data";

export const metadata: Metadata = {
  title: "OEM Parts — DriverXtra",
  description:
    "Browse OEM-classified parts from participating sellers. Review the exact part number, product details and evidence before you buy.",
};

type PageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function OemPartsPage({ searchParams }: PageProps) {
  const { vehicle } = await searchParams;

  return (
    <>
      <OemBrowser initialVehicle={isVehicleId(vehicle) ? vehicle : undefined} />
      <ExplainerCards
        eyebrow="Reading a part listing"
        title="Five separate checks on every listing"
        description="“Aftermarket” is a product category — not a quality score, a safety certificate or proof it fits."
        items={listingChecks}
        whatLabel="What it means"
        neverLabel="What it doesn't"
        className="bg-slate-50"
      />
      <FaqSection
        eyebrow="Aftermarket parts questions"
        title="Before you buy OEM parts"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
