import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import MethodsTable from "@/components/selling/MethodsTable";
import SellingSafely from "@/components/selling/SellingSafely";
import Hero from "@/components/trade-in/Hero";
import TradeInWizard from "@/components/trade-in/TradeInWizard";
import { faqs } from "@/components/trade-in/data";

export const metadata: Metadata = {
  title: "Trade-In — Sell your vehicle | DriverXtra",
  description:
    "Check whether an eligible dealer can consider your current vehicle toward a separate purchase, then request trade-in terms step by step.",
};

export default function TradeInPage() {
  return (
    <>
      <Hero />
      <TradeInWizard />
      <MethodsTable highlight="Trade-In" />
      <SellingSafely />
      <FaqSection
        eyebrow="Selling questions"
        title="Questions about trade-ins"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
      />
    </>
  );
}
