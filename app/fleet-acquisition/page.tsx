import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import { ProcessSection, ComparisonSection, ProcurementControlsSection } from "@/components/fleet-acquisition";
import { FAQS, HERO_IMAGE } from "@/components/fleet-acquisition/data";

export const metadata: Metadata = {
  title: "Fleet Acquisition — DriverXtra",
  description:
    "Turn fleet needs into structured requests, see supplier responses side by side, and keep approvals visible before any external handoff.",
};

export default function FleetAcquisitionPage() {
  return (
    <div className="flex flex-col items-center pb-[88px]">
      <FleetHero
        title="Define vehicle requirements and compare sourcing options with accountable approvals."
        lede="Turn fleet needs into structured requests, see supplier responses side by side, and keep approvals visible before any external handoff."
        image={{ src: HERO_IMAGE, alt: "A commercial truck on a highway" }}
      />
      <div className="mt-[22px] flex w-full flex-col items-center">
        <FleetSubNav />
        <ProcessSection />
        <ComparisonSection />
        <ProcurementControlsSection />
        <FleetFaqSection
          title={<>Fleet Acquisition questions</>}
          faqs={FAQS}
          className="pt-[90px]"
        />
      </div>
    </div>
  );
}
