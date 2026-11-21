import type { Metadata } from "next";
import PolicyFaqSection from "@/components/legal/PolicyFaqSection";
import {
  ComplianceHeroSection,
  ComplianceBody,
  ResponsibilitiesSection,
  ProviderDocumentsSection,
  GlossarySection,
  ComplianceHelpSection,
} from "@/components/compliance-disclosures";
import { complianceFaqs } from "@/components/compliance-disclosures/data";

export const metadata: Metadata = {
  title: "Compliance Disclosures | DriverXtra",
  description:
    "How responsibilities are split between DriverXtra and participating sellers, dealers, lenders, insurers and service providers.",
};

export default function ComplianceDisclosuresPage() {
  return (
    <main>
      <ComplianceHeroSection />
      <ComplianceBody responsibilities={<ResponsibilitiesSection />}>
        <ProviderDocumentsSection />
        <GlossarySection />
        <ComplianceHelpSection />
        <PolicyFaqSection title="Compliance Disclosures questions" faqs={complianceFaqs} />
      </ComplianceBody>
    </main>
  );
}
