import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import RoleCards from "@/components/partner-program/RoleCards";
import EligibilityChecker, { MarketName } from "@/components/partner-program/EligibilityChecker";
import { HorizontalSteps, IconCards, NumberedSteps, PartnerHero, RelatedPartnerLinks, RequirementsGrid, StagesNotice, TableWithNote, TickList } from "@/components/partner-program/sections";
import ReviewsCallout from "@/components/inspection-partner-program/ReviewsCallout";
import {
  applicantGates,
  applicants,
  approvalStages,
  bookingSteps,
  categories,
  commonGates,
  declarations,
  evidenceSteps,
  faqs,
  reportElements,
  requirements,
} from "@/components/inspection-partner-program/data";

export const metadata: Metadata = {
  title: "Inspection Partner Program — DriverXtra",
  description: "Explore how eligible inspection organizations and qualified inspectors may apply to participate in supported DriverXtra markets.",
};

export default function InspectionPartnerProgramPage() {
  return (
    <>
      <PartnerHero
        eyebrow="Inspection Partner Program"
        title="Bring qualified vehicle inspection expertise to DriverXtra."
        text="Explore how eligible inspection organizations and qualified inspectors may apply to participate in supported markets. Requirements, service categories and approvals vary by location and scope."
        badges={[
          { icon: "eye", title: "Defined methods", text: "what you check and what you don't" },
          { icon: "scale", title: "Declared independence", text: "relationships made visible" },
          { icon: "file", title: "Traceable reports", text: "versioned, never silently changed" },
        ]}
        image={{
          src: "/images/inspection-partner-program/hero-inspection-partner-program.webp",
          alt: "An inspector leaning against a classic car in a workshop",
          width: 623,
          height: 539,
        }}
        actions={{
          primary: { label: "Check partner requirements", href: "#eligibility" },
          secondary: { label: "See inspection services", href: hrefFor("Inspection & Appraisal") },
        }}
      />

      <section id="who-its-for" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Who it's for"
            title="For inspection organizations and qualified inspectors"
            description="Requirements, service categories and approvals vary by location and scope."
          />
          <RoleCards items={applicants} />
          <StagesNotice notice="An inspection report is not automatically a warranty, valuation or statutory safety certificate." stages={approvalStages} />
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Eligibility"
              title="Choose the inspection work you are qualified to provide."
              description={
                <>
                  Select your applicant type and an inspection category to see what may apply in <MarketName />. This is a guide, not a decision.
                </>
              }
            />
            <TickList items={["Each category has its own qualification gates", "Statutory safety testing is regulated separately", "Nothing is shared or submitted"]} />
          </div>
          <Reveal direction="left" delay={150}>
            <EligibilityChecker
              labels={{ role: "Applicant type", service: "Inspection category", market: "Operating market", submit: "Check partner requirements" }}
              roles={applicants.map(({ id, title }) => ({ id, label: title }))}
              services={categories}
              roleGates={applicantGates}
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
            description="Inspector qualifications and site details are reviewed separately from your organization."
          />
          <RequirementsGrid items={requirements} privacy={{ text: "Credentials and site documents are reviewed by authorized roles only and never shown publicly." }} />
        </div>
      </section>

      <section id="method" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Method"
            title="Define what you inspect — and what you cannot confirm."
            description="Methods and exclusions come from an approved source and appear on every report."
          />
          <TableWithNote
            heading="Report elements"
            columns={["Element", "Rule"]}
            rows={reportElements}
            note={{
              title: "Reports have limits",
              text: "An inspection report records observed condition at a point in time. It isn't a warranty, a valuation or a statutory safety certificate.",
            }}
          />
        </div>
      </section>

      <section id="independence" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Independence" title="Make relationships and conflicts visible." description="We never claim all marketplace inspectors are independent." />
          <IconCards
            cards={[
              { icon: "scale", title: "What you declare", list: declarations },
              {
                icon: "eye",
                title: "What customers see",
                text: "Declared relationships are shown on relevant reports, so buyers can weigh them. Undeclared conflicts may lead to suspension.",
              },
            ]}
          />
        </div>
      </section>

      <section id="evidence" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Evidence" title="Make inspection findings traceable." description="Permission, secure capture, an audit trail and corrections are required." />
          <NumberedSteps image={{ src: "/images/inspection-partner-program/traceable-findings.png", alt: "A person signing a printed report with a pen" }} steps={evidenceSteps} />
        </div>
      </section>

      <section id="booking" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Booking" title="Keep availability and acceptance distinct." description="Requests are not scheduled until confirmed by the authorized provider." />
          <HorizontalSteps steps={bookingSteps} />
          <Reveal delay={200} className="mt-10">
            <ReviewsCallout />
          </Reveal>
        </div>
      </section>

      <FaqSection id="inspection-partner-faqs" eyebrow="FAQ" title="Inspection Partner Program questions" description="Proposed answers, pending legal and market review." faqs={faqs} />

      <RelatedPartnerLinks
        current="Inspection Partner Program"
        title="Offer other automotive services too?"
        text="See the other partner routes for service providers, transport, parts sellers and distributors."
      />
    </>
  );
}
