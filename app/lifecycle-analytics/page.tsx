import type { Metadata } from "next";
import { FleetHero, FleetSubNav, FleetFaqSection } from "@/components/fleet-solutions";
import { AnalyticsPreviewSection, MethodologySection } from "@/components/lifecycle-analytics";
import { FAQS, HERO_IMAGE } from "@/components/lifecycle-analytics/data";

export const metadata: Metadata = {
  title: "Lifecycle Analytics — DriverXtra",
  description:
    "See cost, downtime, utilization and replacement indicators with their time window, source and completeness — and missing data marked unknown.",
};

export default function LifecycleAnalyticsPage() {
  return (
    <div className="flex flex-col items-center pb-[88px]">
      <FleetHero
        rowHeight={499.94}
        title="Understand fleet lifecycle performance with transparent data coverage."
        lede="See cost, downtime, utilization and replacement indicators with their time window, source and completeness — and missing data marked unknown."
        image={{ src: HERO_IMAGE, alt: "Reports and charts on a desk" }}
      />
      <div className="mt-[22px] flex w-full flex-col items-center">
        <FleetSubNav />
        <AnalyticsPreviewSection />
        <MethodologySection />
        <FleetFaqSection title={<>Lifecycle Analytics questions</>} faqs={FAQS} className="pt-[146.6px]" />
      </div>
    </div>
  );
}
