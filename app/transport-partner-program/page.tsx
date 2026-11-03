import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import RoleCards from "@/components/partner-program/RoleCards";
import EligibilityChecker, { MarketName } from "@/components/partner-program/EligibilityChecker";
import { IconCards, NumberedSteps, PartnerHero, RelatedPartnerLinks, RequirementsGrid, StagesNotice, TableWithNote, TickList } from "@/components/partner-program/sections";
import {
  approvalStages,
  brokerDuties,
  capacity,
  capacityStyles,
  carrierDuties,
  commonGates,
  custodySteps,
  faqs,
  requirements,
  roleGates,
  roles,
  services,
} from "@/components/transport-partner-program/data";

export const metadata: Metadata = {
  title: "Transport Partner Program — DriverXtra",
  description: "Explore joining DriverXtra as a vehicle transport carrier or broker, and see the application requirements that may apply in your market.",
};

export default function TransportPartnerProgramPage() {
  const capacityRows = capacity.map(({ item, declared, status }) => {
    const s = capacityStyles[status];
    return [
      item,
      declared ?? <MarketName className="font-normal" />,
      <span key="status" className={`inline-flex items-center gap-1.5 ${s.text}`}>
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        {s.label}
      </span>,
    ];
  });

  return (
    <>
      <PartnerHero
        eyebrow="Transport Partner Program"
        title="Explore joining DriverXtra as a transport partner."
        text="Tell us about your organization, transport role, operating markets and equipment. We'll show the application requirements that may apply. Applying is not approval to accept jobs."
        badges={[
          { icon: "truck", title: "Carrier or broker", text: "roles reviewed separately" },
          { icon: "shield", title: "Authority & insurance", text: "checked for your market" },
          { icon: "clipboard", title: "Custody evidence", text: "pickup to delivery records" },
        ]}
        image={{
          src: "/images/transport-partner-program/hero-transport-partner-program.webp",
          alt: "A covered truck driving along a mountain highway",
          width: 539,
          height: 404,
        }}
        actions={{
          primary: { label: "Review eligibility", href: "#eligibility" },
          secondary: { label: "See transport services", href: hrefFor("Vehicle Transport & Shipping") },
        }}
      />

      <section id="who-its-for" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Who it's for"
            title="For organizations that move vehicles — or arrange it"
            description="Participation depends on market, qualifications, contractual terms and approved capacity."
          />
          <RoleCards items={roles} />
          <StagesNotice
            notice="We received your application. This does not mean your business is approved or available for transport assignments."
            stages={approvalStages}
          />
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Eligibility"
              title="What role does your organization perform?"
              description={
                <>
                  Choose your role and main service to see the requirements that may apply in <MarketName />. This is a guide, not a decision.
                </>
              }
            />
            <TickList items={["Where are you authorized to operate? We check by market", "Cross-border transport needs separate review", "Nothing is shared or submitted"]} />
          </div>
          <Reveal direction="left" delay={150}>
            <EligibilityChecker
              labels={{ role: "Transport role", service: "Main service", market: "Where are you authorized to operate?", submit: "Review eligibility and requirements" }}
              roles={roles.map(({ id, title }) => ({ id, label: title }))}
              services={services}
              roleGates={roleGates}
              commonGates={commonGates}
            />
          </Reveal>
        </div>
      </section>

      <section id="requirements" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Requirements"
            title="What your application may need"
            description="Our review may request operating authority, vehicle, driver and insurance evidence applicable to your market."
          />
          <RequirementsGrid items={requirements} privacy={{ text: "Authority, driver and insurance documents are reviewed by authorized roles only." }} />
        </div>
      </section>

      <section id="carrier-vs-broker" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Carrier vs broker"
            title="Brokerage and carrier responsibilities are different."
            description="We will review your declared role and relevant authorization."
          />
          <IconCards
            cards={[
              { icon: "truck", title: "Carrier", list: carrierDuties },
              { icon: "scale", title: "Broker", list: brokerDuties },
            ]}
          />
        </div>
      </section>

      <section id="capacity" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Capacity"
            title="Approved capacity, not assumed capacity"
            description="Dispatch eligibility depends on verified equipment, drivers and markets — and can change."
          />
          <TableWithNote
            heading="Example capacity profile"
            badge="Demo data"
            columns={["Item", "Declared", "Status"]}
            rows={capacityRows}
            note={{
              title: "Pending means not dispatched",
              text: "Equipment or drivers still pending can't be assigned jobs. Expired insurance pauses dispatch eligibility.",
            }}
          />
        </div>
      </section>

      <section id="custody" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Custody" title="Vehicle pickup, custody and delivery evidence" />
          <NumberedSteps image={{ src: "/images/transport-partner-program/custody-evidence.webp", alt: "Water droplets on glass in teal and orange light" }} steps={custodySteps} />
        </div>
      </section>

      <section id="claims-and-terms" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Claims & terms" title="Clear responsibilities when things go wrong" />
          <IconCards
            cards={[
              {
                icon: "flag",
                title: "Claims and fraud",
                text: "Damage, loss and fraud reports follow a documented process. Carrier liability and any separate coverage products differ — your agreement sets out the responsibilities.",
              },
              {
                icon: "tag",
                title: "Pricing and commercial terms",
                text: "Rates, fees and payout timing depend on your role, market and approved agreement. None are shown until approved terms exist.",
              },
            ]}
          />
        </div>
      </section>

      <FaqSection id="transport-partner-faqs" eyebrow="FAQ" title="Transport Partner Program questions" description="Proposed answers, pending legal and market review." faqs={faqs} />

      <RelatedPartnerLinks
        current="Transport Partner Program"
        title="Offer other automotive services too?"
        text="See the other partner routes for service providers, inspection, parts sellers and distributors."
      />
    </>
  );
}
