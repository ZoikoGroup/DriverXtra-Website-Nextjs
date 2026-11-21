import type { Metadata } from "next";
import { container } from "@/components/ui/SectionTitle";
import PolicySidebar from "@/components/legal/PolicySidebar";
import PolicyFaqSection from "@/components/legal/PolicyFaqSection";
import {
  AccessibilityHeroSection,
  ScopeSection,
  StandardsSection,
  WhatWeveDoneSection,
  KnownLimitationsSection,
  OtherWaysSection,
  CompatibilitySection,
  AssessmentSection,
  ReportIssueSection,
  StatementChangesSection,
  RelatedPoliciesSection,
} from "@/components/accessibility-statement";
import { accessibilityFaqs, tocSections } from "@/components/accessibility-statement/data";

export const metadata: Metadata = {
  title: "Accessibility Statement | DriverXtra",
  description:
    "DriverXtra's accessibility target, assessment status, known limitations and how to report an accessibility issue.",
};

export default function AccessibilityStatementPage() {
  return (
    <main>
      <AccessibilityHeroSection />
      <div className={`${container} grid gap-10 py-12 md:py-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14`}>
        <PolicySidebar sections={tocSections} printLabel="Print this statement" />
        <div className="max-w-205">
          <ScopeSection />
          <StandardsSection />
          <WhatWeveDoneSection />
          <KnownLimitationsSection />
          <OtherWaysSection />
          <CompatibilitySection />
          <AssessmentSection />
          <ReportIssueSection />
          <StatementChangesSection />
          <RelatedPoliciesSection />
          <PolicyFaqSection title="Accessibility questions" faqs={accessibilityFaqs} />
        </div>
      </div>
    </main>
  );
}
