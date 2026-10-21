import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import VinHero from "@/components/parts/VinHero";
import ShopCards from "@/components/parts/ShopCards";
import VinLookup from "@/components/parts/VinLookup";
import { labelQuestions, vinFaqs } from "@/components/parts/vin-data";

export const metadata: Metadata = {
  title: "Find Parts by VIN — DriverXtra",
  description:
    "Enter your vehicle identification number to identify your vehicle and narrow your parts search where VIN lookup is available.",
};

export default function FindPartsByVinPage() {
  return (
    <>
      <VinHero />
      <ShopCards active="vin" />
      <VinLookup />
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
        title="Finding parts with a VIN"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={vinFaqs}
        className="bg-white"
      />
    </>
  );
}
