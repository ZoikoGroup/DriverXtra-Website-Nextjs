import type { Metadata } from "next";
import {
  FleetHero,
  FleetSubNav,
  LifecycleJourneySection,
  SpecialistModulesSection,
  GovernanceSection,
  RolesSection,
  FleetFaqSection,
} from "@/components/fleet-solutions";
import { FAQS, HERO_IMAGE } from "@/components/fleet-solutions/data";

export const metadata: Metadata = {
  title: "Fleet Solutions — DriverXtra",
  description:
    "One front door for fleet sourcing, maintenance, parts, analytics and vehicle exits — with approvals and evidence kept in view.",
};

export default function FleetSolutionsPage() {
  return (
    <div className="flex flex-col items-center gap-[22px] pb-[88px]">
      <FleetHero
        title="Plan, operate and evolve your fleet with clearer decision paths."
        lede="One front door for sourcing, maintenance, parts, analytics and vehicle exits — with approvals and evidence kept in view."
        image={{ src: HERO_IMAGE, alt: "A row of white fleet vans at a depot" }}
      />
      <FleetSubNav />
      <LifecycleJourneySection />
      <SpecialistModulesSection />
      <GovernanceSection />
      <RolesSection />
      <FleetFaqSection title={<>Fleet Solutions questions</>} faqs={FAQS} />
    </div>
  );
}
