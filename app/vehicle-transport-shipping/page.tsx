import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ProviderEmptyState from "@/components/services/ProviderEmptyState";
import Checklist from "@/components/services/Checklist";
import {
  PricingSection,
  ServiceCards,
  ServiceHero,
  ServiceSection,
  StepsSection,
} from "@/components/services/sections";
import ServiceTypes from "@/components/vehicle-transport-shipping/ServiceTypes";
import QuoteWizard from "@/components/vehicle-transport-shipping/QuoteWizard";
import {
  faqs,
  img,
  pickupChecklist,
  quoteLines,
  shipmentSteps,
  situations,
} from "@/components/vehicle-transport-shipping/data";

export const metadata: Metadata = {
  title: "Vehicle Transport & Shipping — DriverXtra",
  description:
    "Explore available transport methods, check the details a carrier may need, and request a quote from participating providers where supported.",
};

export default function VehicleTransportShippingPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Vehicle Transport & Shipping"
        title="Plan your vehicle move with clear options and responsibilities."
        text="Explore available transport methods, check the details a carrier may need, and request a quote from participating providers where supported."
        image={img("hero-car-carrier.webp")}
        imageAlt="A covered lorry driving along a mountain road"
      />

      <ServicesTabBar active="Vehicle Transport & Shipping" />

      <ServiceSection id="your-situation">
        <SectionTitle
          eyebrow="Who is moving the vehicle"
          title="Start with your situation"
        />
        <ServiceCards cards={situations} />
      </ServiceSection>

      <ServiceSection id="service-types" className="bg-slate-50">
        <SectionTitle
          eyebrow="Service types"
          title="Open or enclosed transport?"
        />
        <ServiceTypes />
      </ServiceSection>

      <ServiceSection id="quote-request">
        <QuoteWizard />
      </ServiceSection>

      <PricingSection
        id="reading-a-quote"
        className="bg-slate-50"
        eyebrow="Reading a quote"
        title="What a provider quotation should show"
        description={null}
        columns={["Line", "What to check"]}
        demoInHeader
        charges={quoteLines}
      />

      <ServiceSection id="providers">
        <SectionTitle
          eyebrow="Providers"
          title="Transport providers"
          description="Providers would show their legal name, operating role (carrier or broker), sourced credentials, serviced routes and equipment."
        />
        <ProviderEmptyState
          subject="transport providers"
          image={img("no-providers-yet.webp")}
          imageAlt="A driver's hand on the steering wheel at dusk"
          text="We only list carriers and brokers once their identity, role, credentials and serviced regions are verified. We won't show placeholder companies, logos or ratings."
          actions={[
            { label: "Prepare for pickup", href: "#pickup-preparation" },
            { label: "Transport questions", href: "#transport-faqs" },
          ]}
        />
      </ServiceSection>

      <StepsSection
        id="shipment-progress"
        eyebrow="From booking to delivery"
        title="How a shipment would progress"
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            Each step is shown with who reported it and when.
            <span className="rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">
              DEMO
            </span>
          </span>
        }
        steps={shipmentSteps}
      />

      <ServiceSection id="pickup-preparation">
        <SectionTitle
          eyebrow="Pickup preparation"
          title="Get the vehicle ready for handover"
          description="Review the carrier's instructions before handover. Check personal-item rules, access, keys and vehicle operability. Tick items as you go — nothing is saved."
        />
        <Checklist
          items={pickupChecklist}
          image={img("pickup-preparation.webp")}
          imageAlt="A blue coupé parked outside a building, ready for collection"
        />
      </ServiceSection>

      <ServiceSection id="delivery" className="bg-slate-50">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <SectionTitle
              eyebrow="Delivery and issues"
              title="Inspect at delivery, report differences"
              className="max-w-none"
            />
            <Reveal delay={200}>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                Inspect the vehicle at delivery and record any differences
                before completing the condition acknowledgment.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                Carrier liability terms and any separate coverage products
                differ. Review the specific provider&apos;s current documents.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={150}>
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src={img("delivery-inspection.webp")}
                alt="A person signing paperwork"
                width={500}
                height={375}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </ServiceSection>

      <FaqSection
        id="transport-faqs"
        eyebrow="Transport questions"
        title="Vehicle transport & shipping FAQs"
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
