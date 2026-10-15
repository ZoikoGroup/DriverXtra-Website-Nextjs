import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Hero from "@/components/instant-offer/Hero";
import OfferWizard from "@/components/instant-offer/OfferWizard";
import MethodsTable from "@/components/selling/MethodsTable";
import SellingSafely from "@/components/selling/SellingSafely";
import { faqs } from "@/components/instant-offer/data";

export const metadata: Metadata = {
  title: "Instant Offer — Sell your vehicle | DriverXtra",
  description:
    "Check whether an eligible third-party buyer can make an instant offer for your vehicle, then request one step by step.",
};

export default function InstantOfferPage() {
  return (
    <>
      <Hero />
      <OfferWizard />
      <MethodsTable highlight="Instant Offer" />
      <SellingSafely />
      <FaqSection
        eyebrow="Selling questions"
        title="Questions about instant offers"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
      />
    </>
  );
}
