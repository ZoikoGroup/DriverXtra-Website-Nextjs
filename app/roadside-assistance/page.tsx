import type { Metadata } from "next";
import { MapPin, MessageSquare, TriangleAlert } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import ServicesTabBar from "@/components/services/ServicesTabBar";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import ProviderNotice from "@/components/services/ProviderNotice";
import { PricingSection, RecordsSection, RequestSection, ServiceHero, StepsSection } from "@/components/services/ServiceParts";
import RoadsideRequestForm from "@/components/roadside-assistance/RoadsideRequestForm";
import { charges, faqs, needs, records, safetySteps, steps } from "@/components/roadside-assistance/data";

export const metadata: Metadata = {
  title: "Roadside Assistance — DriverXtra",
  description: "Explore roadside support categories and safe request pathways, how requests and dispatch work, and what charges and handover to expect.",
};

const safetyIcons = { "get-safe": TriangleAlert, "call-for-help": MessageSquare, "know-where": MapPin };

export default function RoadsideAssistancePage() {
  return (
    <>
      <ServiceHero
        eyebrow="Roadside Assistance"
        title="Explore roadside support categories and safe request pathways."
        text="Understand what roadside help can cover, how requests and dispatch work, and what charges and handover to expect."
        image={{ src: "/images/roadside-assistance/hero-roadside-assistance.png", alt: "A driver's hand on the steering wheel at dusk", width: 500, height: 375 }}
        actions={{
          primary: { label: "Describe what you need", href: "#describe-what-you-need" },
          secondary: { label: "Safety guidance first", href: "#safety-guidance" },
        }}
      />

      <ServicesTabBar active="Roadside Assistance" />

      <section id="safety-guidance" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Safety guidance first" title="Before anything else" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {safetySteps.map(({ id, title, text }, i) => {
              const Icon = safetyIcons[id];
              return (
                <Reveal key={id} delay={i * 100} className="h-full">
                  <article className="group h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                    <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">
                      <Icon className="h-4 w-4 text-gold transition-transform duration-300 group-hover:scale-125" />
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="assistance-categories" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Available assistance categories" title="Common roadside needs" />
          <ServiceCatalog items={needs} formId="describe-what-you-need" cta="Request this help" />
        </div>
      </section>

      <RequestSection
        id="describe-what-you-need"
        title="Describe what you need"
        image={{ src: "/images/roadside-assistance/battery-jump-start.png", alt: "The silhouette of a black saloon car in low light" }}
      >
        <RoadsideRequestForm />
      </RequestSection>

      <section id="providers" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Provider discovery" title="Providers" />
          <Reveal delay={150}>
            <ProviderNotice kind="roadside assistance" image="/images/roadside-assistance/flat-tire.png" alt="A black Porsche driving on a motorway" />
          </Reveal>
        </div>
      </section>

      <PricingSection charges={charges} />

      <StepsSection steps={steps} />

      <RecordsSection records={records} image={{ src: "/images/roadside-assistance/lockout.png", alt: "A grey BMW coupe parked at dusk" }} />

      <FaqSection id="roadside-faqs" eyebrow="Questions" title="Roadside Assistance FAQs" faqs={faqs} />
    </>
  );
}
