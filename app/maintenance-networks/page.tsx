import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import {
  ServiceCategoriesSection,
  CoverageSection,
  ProviderEvidenceSection,
  RequestStatusSection,
} from "@/components/maintenance-networks";
import { FAQS, HERO_IMAGE } from "@/components/maintenance-networks/data";

export const metadata: Metadata = {
  title: "Maintenance Networks — DriverXtra",
  description:
    "Find candidate providers by service and coverage, compare their evidence, and move from request to estimate to approval — never straight to a booking.",
};

export default function MaintenanceNetworksPage() {
  return (
    <div className="flex flex-col items-center pb-[88px]">
      <FleetHero
        rowHeight={551.77}
        title="Explore service-network options and coordinate fleet maintenance with clear evidence."
        lede="Find candidate providers by service and coverage, compare their evidence, and move from request to estimate to approval — never straight to a booking."
        image={{ src: HERO_IMAGE, alt: "A technician servicing a vehicle in a workshop" }}
      />
      <div className="mt-[22px] flex w-full flex-col items-center">
        <FleetSubNav />
        <ServiceCategoriesSection />
        <CoverageSection />
        <ProviderEvidenceSection />
        <RequestStatusSection />
        <FleetFaqSection title={<>Maintenance Networks questions</>} faqs={FAQS} className="pt-[89px]" />
      </div>
    </div>
  );
}
