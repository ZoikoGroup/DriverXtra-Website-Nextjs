import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import SectionTitle from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ServiceRequestForm from "@/components/services/ServiceRequestForm";
import ProviderEmptyState from "@/components/services/ProviderEmptyState";
import {
  EvidenceSection,
  PricingSection,
  ServiceCards,
  ServiceHero,
  ServiceSection,
  StepsSection,
} from "@/components/services/sections";
import {
  assessmentKinds,
  charges,
  faqs,
  formFields,
  img,
  recordedItems,
  steps,
} from "@/components/inspection-appraisal/data";

export const metadata: Metadata = {
  title: "Inspection & Appraisal — DriverXtra",
  description:
    "Learn what an inspection checks, how an appraisal values a vehicle, and what evidence a report should include — before you buy, sell or insure.",
};

export default function InspectionAppraisalPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Inspection & Appraisal"
        title="Understand vehicle condition, inspection scope and appraisal evidence."
        text="Learn what an inspection checks, how an appraisal values a vehicle, and what evidence a report should include — before you buy, sell or insure."
        image={img("hero-technician-inspecting.webp")}
        imageAlt="A technician inspecting a car in a workshop"
      />

      <ServicesTabBar active="Inspection & Appraisal" />

      <ServiceSection id="kinds-of-assessment" className="bg-slate-50">
        <SectionTitle
          eyebrow="Inspection vs appraisal"
          title="Four different kinds of assessment"
        />
        <ServiceCards cards={assessmentKinds} />
      </ServiceSection>

      <ServiceSection id="assessment-request">
        <ServiceRequestForm
          title="Select assessment type"
          fields={formFields}
          image={img("what-happens-next.webp")}
          imageAlt="Paperwork and a calculator on a desk"
        />
      </ServiceSection>

      <ServiceSection id="providers" className="bg-slate-50">
        <SectionTitle eyebrow="Provider discovery" title="Providers" />
        <ProviderEmptyState
          subject="inspection & appraisal providers"
          image={img("no-providers-yet.webp")}
          imageAlt="A technician looking under a car in a dim workshop"
        />
      </ServiceSection>

      <PricingSection charges={charges} />

      <StepsSection steps={steps} />

      <EvidenceSection
        items={recordedItems}
        image={img("what-should-be-recorded.webp")}
        imageAlt="A person reviewing and signing documents"
      />

      <FaqSection
        id="inspection-appraisal-faqs"
        eyebrow="Questions"
        title="Inspection & Appraisal FAQs"
        faqs={faqs}
        className="bg-slate-50"
      />
    </>
  );
}
