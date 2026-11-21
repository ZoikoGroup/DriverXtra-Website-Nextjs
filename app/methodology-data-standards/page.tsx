import type { Metadata } from "next";
import {
  MethodologyHeroSection,
  EvidenceLabelsSection,
  MetricDefinitionsSection,
  AskingVsSoldSection,
  IndexConstructionSection,
  FreshnessSection,
  RevisionHistorySection,
  GlossarySection,
  ReuseCorrectionsSection,
  RelatedSection,
  MethodologyFaqSection,
} from "@/components/methodology-data-standards";

export const metadata: Metadata = {
  title: "Methodology & Data Standards | DriverXtra",
  description:
    "How DriverXtra's published figures, estimates and comparisons are defined, sourced, checked and updated.",
};

export default function MethodologyDataStandardsPage() {
  return (
    <main>
      <MethodologyHeroSection />
      <EvidenceLabelsSection />
      <MetricDefinitionsSection />
      <AskingVsSoldSection />
      <IndexConstructionSection />
      <FreshnessSection />
      <RevisionHistorySection />
      <GlossarySection />
      <ReuseCorrectionsSection />
      <RelatedSection />
      <MethodologyFaqSection />
    </main>
  );
}
