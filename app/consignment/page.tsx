import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import MethodsTable from "@/components/selling/MethodsTable";
import SellingSafely from "@/components/selling/SellingSafely";
import Hero from "@/components/consignment/Hero";
import ConsignmentWizard from "@/components/consignment/ConsignmentWizard";
import { faqs } from "@/components/consignment/data";

export const metadata: Metadata = {
  title: "Consignment — Sell your vehicle | DriverXtra",
  description:
    "Check whether an authorised provider can market and sell your vehicle under a written consignment agreement, then send an enquiry step by step.",
};

export default function ConsignmentPage() {
  return (
    <>
      <Hero />
      <ConsignmentWizard />
      <MethodsTable highlight="Consignment" className="bg-slate-50" />
      <SellingSafely />
      <FaqSection
        eyebrow="Selling questions"
        title="Questions about consignment"
        description="DriverXtra is a marketplace operated by Zoiko Mobility Inc. We don't buy vehicles ourselves."
        faqs={faqs}
      />
    </>
  );
}
