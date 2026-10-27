import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import ProviderNotice from "@/components/services/ProviderNotice";
import { PricingSection, RecordsSection, RequestSection, ServiceHero, StepsSection } from "@/components/services/ServiceParts";
import StorageRequestForm from "@/components/storage/StorageRequestForm";
import { charges, faqs, records, steps, storageTypes } from "@/components/storage/data";

export const metadata: Metadata = {
  title: "Vehicle Storage — DriverXtra",
  description: "Compare storage types, access, pricing and vehicle custody arrangements, and how release of your vehicle works.",
};

export default function StoragePage() {
  return (
    <>
      <ServiceHero
        eyebrow="Vehicle Storage"
        title="Compare storage types, access, pricing and vehicle custody arrangements."
        text="Understand indoor and outdoor storage options, what security and access a facility actually offers, and how release of your vehicle works."
        image={{ src: "/images/storage/hero-storage.webp", alt: "An aerial view of cars parked on an open parking deck", width: 539, height: 404 }}
        actions={{
          primary: { label: "Check storage options", href: "#check-storage-options" },
          secondary: { label: "What you might be charged for", href: "#pricing-transparency" },
        }}
      />

      <ServicesTabBar active="Storage" />

      <section id="storage-types" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Storage types and fit" title="Which kind of storage fits?" />
          <ServiceCatalog items={storageTypes} formId="check-storage-options" cta="Check this option" />
        </div>
      </section>

      <RequestSection
        id="check-storage-options"
        title="Check storage options"
        image={{ src: "/images/storage/hero-storage.webp", alt: "An aerial view of cars parked on an open parking deck" }}
      >
        <StorageRequestForm />
      </RequestSection>

      <section id="providers" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Provider discovery" title="Providers" />
          <Reveal delay={150}>
            <ProviderNotice kind="storage" image="/images/storage/storage-providers.webp" alt="Rows of cars parked in a dimly lit indoor garage" />
          </Reveal>
        </div>
      </section>

      <PricingSection charges={charges} quotedBy="facility" />

      <StepsSection steps={steps} />

      <RecordsSection records={records} image={{ src: "/images/storage/condition-record.png", alt: "A black Porsche Panamera driving on a motorway" }} />

      <FaqSection id="storage-faqs" eyebrow="Questions" title="Storage FAQs" faqs={faqs} />
    </>
  );
}
