import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import RelatedLinksSection from "@/components/ui/RelatedLinksSection";
import {
  ChecklistSection,
  CoverageSection,
  IdentifierSection,
  MixedResultsSection,
  OfficialChecksSection,
  VehicleHistoryHeroSection,
} from "@/components/vehicle-history";
import { relatedLinks, vehicleHistoryFaqs } from "@/components/vehicle-history/data";

export const metadata: Metadata = {
  title: "Vehicle History | DriverXtra",
  description:
    "Understand what a vehicle history report may show, how to read mixed results, where to run official checks and what to verify before buying.",
};

export default function VehicleHistoryPage() {
  return (
    <main>
      <VehicleHistoryHeroSection />
      <CoverageSection />
      <IdentifierSection />
      <OfficialChecksSection />
      <MixedResultsSection />
      <ChecklistSection />
      <FaqSection
        id="faq"
        eyebrow="FAQ"
        title="Vehicle History FAQs"
        description="General information, not legal advice."
        faqs={vehicleHistoryFaqs}
        className="bg-white"
      />
      <RelatedLinksSection title="Keep researching before you buy" links={relatedLinks} className="bg-slate-50" />
    </main>
  );
}
