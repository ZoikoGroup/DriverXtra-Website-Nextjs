import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import {
  PartCategoriesSection,
  FitmentSection,
  RfqVsPoSection,
  PurchaseControlsSection,
} from "@/components/parts-procurement";
import { FAQS, HERO_IMAGE } from "@/components/parts-procurement/data";

export const metadata: Metadata = {
  title: "Parts Procurement — DriverXtra",
  description:
    "Look up the vehicle, see candidate parts with fitment confidence, request quotes and route purchase orders for approval.",
};

export default function PartsProcurementPage() {
  return (
    <div className="flex flex-col items-center pb-[88px]">
      <FleetHero
        rowHeight={494.75}
        title="Source fleet parts with fitment checks and governed purchasing steps."
        lede="Look up the vehicle, see candidate parts with fitment confidence, request quotes and route purchase orders for approval."
        image={{ src: HERO_IMAGE, alt: "A mechanic working on an engine" }}
      />
      <div className="mt-[22px] flex w-full flex-col items-center">
        <FleetSubNav />
        <PartCategoriesSection />
        <FitmentSection />
        <RfqVsPoSection />
        <PurchaseControlsSection />
        <FleetFaqSection title={<>Parts Procurement questions</>} faqs={FAQS} className="pt-[90px]" />
      </div>
    </div>
  );
}
