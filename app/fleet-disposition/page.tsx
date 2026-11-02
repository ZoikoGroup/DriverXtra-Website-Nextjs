import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import {
  DispositionMethodsSection,
  ReadinessSection,
  ReleaseClearanceSection,
} from "@/components/fleet-disposition";
import { FAQS, HERO_IMAGE } from "@/components/fleet-disposition/data";

export const metadata: Metadata = {
  title: "Fleet Disposition — DriverXtra",
  description:
    "Choose disposition methods, check readiness and keep title, lien and handover steps visible before any vehicle is released.",
};

export default function FleetDispositionPage() {
  return (
    <div className="flex flex-col items-center pb-[88px]">
      <FleetHero
        title="Plan vehicle exits with condition, authority and handover evidence in view."
        lede="Choose disposition methods, check readiness and keep title, lien and handover steps visible before any vehicle is released."
        image={{ src: HERO_IMAGE, alt: "Vehicles parked in a storage facility" }}
      />
      <div className="mt-[22px] flex w-full flex-col items-center">
        <FleetSubNav />
        <DispositionMethodsSection />
        <ReadinessSection />
        <ReleaseClearanceSection />
        <FleetFaqSection title={<>Fleet Disposition questions</>} faqs={FAQS} className="pt-[88px]" />
      </div>
    </div>
  );
}
