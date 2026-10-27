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
  charges,
  faqs,
  formFields,
  helpTypes,
  img,
  recordedItems,
  steps,
} from "@/components/maintenance-repair/data";

export const metadata: Metadata = {
  title: "Maintenance & Repair — DriverXtra",
  description:
    "Understand the difference between a service, a diagnosis, an estimate and the work you authorize — and what records to keep afterwards.",
};

export default function MaintenanceRepairPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Maintenance & Repair"
        title="Explore maintenance, diagnostics, repair estimates and authorized work."
        text="Understand the difference between a service, a diagnosis, an estimate and the work you authorize — and what records to keep afterwards."
        image={img("hero-mechanic-engine.webp")}
        imageAlt="A mechanic working on a car engine"
      />

      <ServicesTabBar active="maintenance" />

      <ServiceSection id="help-types" className="bg-slate-50">
        <SectionTitle
          eyebrow="Maintenance and diagnostics"
          title="What kind of help do you need?"
        />
        <ServiceCards cards={helpTypes} />
      </ServiceSection>

      <ServiceSection id="service-request">
        <ServiceRequestForm
          title="Tell us what's needed"
          fields={formFields}
          image={img("what-happens-next.webp")}
          imageAlt="A grey sports saloon parked outside at dusk"
        />
      </ServiceSection>

      <ServiceSection id="providers" className="bg-slate-50">
        <SectionTitle eyebrow="Provider discovery" title="Providers" />
        <ProviderEmptyState
          subject="maintenance & repair providers"
          image={img("no-providers-yet.webp")}
          imageAlt="A mechanic pouring oil into an engine"
        />
      </ServiceSection>

      <PricingSection charges={charges} />

      <StepsSection steps={steps} />

      <EvidenceSection
        items={recordedItems}
        image={img("what-should-be-recorded.webp")}
        imageAlt="A car in a dim workshop with its tail lights on"
      />

      <FaqSection
        id="maintenance-repair-faqs"
        eyebrow="Questions"
        title="Maintenance & Repair FAQs"
        faqs={faqs}
        className="bg-slate-50"
      />
    </>
  );
}
