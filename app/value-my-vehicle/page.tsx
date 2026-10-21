import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import SellingSafely from "@/components/selling/SellingSafely";
import Hero from "@/components/value-my-vehicle/Hero";
import ValuationWizard from "@/components/value-my-vehicle/ValuationWizard";
import { faqs, isLookupMode } from "@/components/value-my-vehicle/data";

export const metadata: Metadata = {
  title: "Value My Vehicle — DriverXtra",
  description:
    "Get a market-informed valuation range for your vehicle in four short steps, then choose how you want to sell.",
};

type PageProps = {
  /** Sent by the home page valuation form. */
  searchParams: Promise<{ method?: string; identifier?: string; make?: string; model?: string; mileage?: string }>;
};

export default async function ValueMyVehiclePage({ searchParams }: PageProps) {
  const { method, identifier, make, model, mileage } = await searchParams;

  return (
    <>
      <Hero />
      <ValuationWizard
        prefill={{
          mode: isLookupMode(method) ? method : undefined,
          identifier: identifier?.slice(0, 17),
          make: make?.slice(0, 40),
          model: model?.slice(0, 60),
          mileage: mileage && /^\d+$/.test(mileage) ? mileage : undefined,
        }}
      />
      <SellingSafely className="bg-white py-20 md:py-24" />
      <FaqSection
        eyebrow="Selling questions"
        title="Questions about valuations"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
