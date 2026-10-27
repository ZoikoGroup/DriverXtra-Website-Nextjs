import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import ProviderNotice from "@/components/services/ProviderNotice";
import { PricingSection, RecordsSection, RequestSection, ServiceHero, StepsSection } from "@/components/services/ServiceParts";
import WorkRequestForm from "@/components/detailing-and-cosmetics/WorkRequestForm";
import { charges, faqs, records, services, steps } from "@/components/detailing-and-cosmetics/data";

export const metadata: Metadata = {
  title: "Detailing & Cosmetics — DriverXtra",
  description: "Explore cleaning, detailing, paint correction and cosmetic service scopes, and what to approve before any add-ons or extra charges.",
};

export default function DetailingAndCosmeticsPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Detailing & Cosmetics"
        title="Explore cleaning, detailing, paint correction and cosmetic service scopes."
        text="Compare what each service actually includes, how providers work, and what to approve before any add-ons or extra charges."
        image={{
          src: "/images/detailing-and-cosmetics/hero-detailing-and-cosmetics.webp",
          alt: "A person hand-washing a black car covered in foam",
          width: 539,
          height: 404,
        }}
        actions={{
          primary: { label: "Describe the work", href: "#describe-the-work" },
          secondary: { label: "What you might be charged for", href: "#pricing-transparency" },
        }}
      />

      <ServicesTabBar active="Detailing & Cosmetics" />

      <section id="service-catalog" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Service catalog" title="Common detailing and cosmetic services" />
          <ServiceCatalog items={services} formId="describe-the-work" cta="Describe this work" />
        </div>
      </section>

      <RequestSection
        id="describe-the-work"
        title="Describe the work"
        image={{ src: "/images/detailing-and-cosmetics/hero-detailing-and-cosmetics.webp", alt: "A person hand-washing a black car covered in foam" }}
      >
        <WorkRequestForm />
      </RequestSection>

      <section id="providers" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Provider discovery" title="Providers" />
          <Reveal delay={150}>
            <ProviderNotice kind="detailing & cosmetics" image="/images/detailing-and-cosmetics/interior-clean.png" alt="A dark sports car parked under a cloudy sky" />
          </Reveal>
        </div>
      </section>

      <PricingSection charges={charges} />

      <StepsSection steps={steps} />

      <RecordsSection records={records} image={{ src: "/images/detailing-and-cosmetics/paint-correction.png", alt: "A black Porsche Panamera driving on a motorway" }} />

      <FaqSection id="detailing-faqs" eyebrow="Questions" title="Detailing & Cosmetics FAQs" faqs={faqs} />
    </>
  );
}
