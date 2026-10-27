import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ProviderEmptyState from "@/components/services/ProviderEmptyState";
import { ServiceHero, ServiceSection } from "@/components/services/sections";
import TireFinder from "@/components/tires-installation/TireFinder";
import Checklist from "@/components/services/Checklist";
import {
  afterFitting,
  faqs,
  img,
  sidewallParts,
  visitChecklist,
} from "@/components/tires-installation/data";

export const metadata: Metadata = {
  title: "Tires & Installation — DriverXtra",
  description:
    "Start with your vehicle or tire size. Explore product details and nearby fitting options, then check compatibility and total cost before you commit.",
};

export default function TiresInstallationPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Tires & Installation"
        title="Find tires and fitting options with confidence."
        text="Start with your vehicle or tire size. Explore product details and nearby fitting options, then check compatibility and total cost before you commit."
        image={img("hero-tire-wheel.webp")}
        imageAlt="A close-up of a car tire and alloy wheel"
      />

      <ServicesTabBar active="tires" />

      <ServiceSection id="find-tires">
        <SectionTitle
          eyebrow="Start here"
          title="Find the right tire"
          description="We use your vehicle details to help find products and fitting options. You can browse by tire size without providing a VIN."
        />
        <TireFinder />
      </ServiceSection>

      <ServiceSection id="tire-size" className="bg-slate-50">
        <SectionTitle
          eyebrow="How to read tire size"
          title="What the sidewall code means"
          description={
            <>
              Illustrative example:{" "}
              <strong className="font-bold">225/45 R17 94W</strong>
            </>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {sidewallParts.map(({ code, text }, i) => (
            <Reveal key={code} delay={i * 70} className="h-full">
              <div className="group h-full rounded-xl border border-t-4 border-brand bg-white px-3 pt-2.5 pb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(15,23,42,0.3)]">
                <p className="text-2xl leading-10 font-bold text-ink transition-transform duration-300 group-hover:scale-110 origin-left">
                  {code}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection id="installers">
        <SectionTitle
          eyebrow="Where to fit"
          title="Installers"
          description="Service options and appointment availability are supplied by the provider and may change."
        />
        <ProviderEmptyState
          subject="installers"
          image={img("no-installers-yet.webp")}
          imageAlt="A mechanic working in a tire workshop"
          text="We only list fitters once their location, service capability and market availability are verified. We cannot confirm this item or appointment right now. You can request availability or try another provider."
          actions={[
            { label: "Prepare for your visit", href: "#visit-preparation" },
          ]}
        />
      </ServiceSection>

      <ServiceSection id="visit-preparation" className="bg-slate-50">
        <SectionTitle
          eyebrow="Visit preparation"
          title="Before your fitting appointment"
          description="Subject to the provider's rules. Tick items as you go — nothing is saved."
        />
        <Checklist
          items={visitChecklist}
          image={img("visit-preparation.webp")}
          imageAlt="A tire being fitted to a wheel in a workshop"
        />
      </ServiceSection>

      <ServiceSection id="after-fitting">
        <SectionTitle
          eyebrow="After fitting"
          title="Records, warranty and returns"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {afterFitting.map(({ title, text }, i) => (
            <Reveal key={title} delay={i * 90} className="h-full">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <h3 className="text-[14px] font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </ServiceSection>

      <FaqSection
        id="tires-installation-faqs"
        eyebrow="Tire questions"
        title="Tires & installation FAQs"
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
