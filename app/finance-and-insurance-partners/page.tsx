import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import RoleCards from "@/components/partner-program/RoleCards";
import EligibilityChecker, { MarketName } from "@/components/partner-program/EligibilityChecker";
import { IconCards, NumberedSteps, PartnerHero, RelatedPartnerLinks, RequirementsGrid, StagesNotice, TableWithNote, TickList } from "@/components/partner-program/sections";
import {
  approvalStages,
  commonGates,
  compensationModels,
  faqs,
  financeRoles,
  insuranceRoles,
  products,
  referralSteps,
  requirements,
  roleGates,
  roleScope,
  roles,
} from "@/components/finance-and-insurance-partners/data";

export const metadata: Metadata = {
  title: "Finance & Insurance Partners — DriverXtra",
  description: "Explore a finance or insurance partnership with DriverXtra, built around clear roles, disclosed compensation and consent-based referrals.",
};

const consumerPages = ["Compare Vehicle Loans", "Compare Insurance", "Finance Partners", "Insurance Partners"];

export default function FinanceAndInsurancePartnersPage() {
  return (
    <>
      <PartnerHero
        eyebrow="Partner with DriverXtra · Finance & Insurance Partnerships"
        title="Explore a partnership built around clear roles and accountable controls."
        text="Tell us what your organization is authorized to do, where it operates and which products it hopes to support. We will explain the review pathway available for your market."
        badges={[
          { icon: "scale", title: "Distinct roles", text: "lender, intermediary, insurer, broker" },
          { icon: "tag", title: "Disclosed compensation", text: "never changes ranking" },
          { icon: "lock", title: "Consent-based referrals", text: "named partner, stated purpose" },
        ]}
        image={{
          src: "/images/finance-and-insurance-partners/hero-finance-and-insurance-partners.png",
          alt: "A person signing a printed agreement with a pen",
          width: 500,
          height: 375,
        }}
        actions={{
          primary: { label: "Check partnership pathway", href: "#eligibility" },
          secondary: { label: "How compensation is disclosed", href: "#compensation" },
        }}
      />

      <section id="who-its-for" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Who it's for"
            title="Regulated organizations, each in its own role"
            description="Availability and review requirements depend on your entity, role, product and jurisdiction."
            className="max-w-3xl"
          />
          <RoleCards items={roles} cta="Check pathway" />
          <StagesNotice notice="Submitting documents does not confirm authorization, approval or partnership status." stages={approvalStages} />
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Partnership pathway"
              title="How does your organization participate?"
              description={
                <>
                  Tell us your role and the product you hope to support. We will explain the review pathway available for <MarketName />.
                </>
              }
            />
            <TickList
              items={[
                "A lender, lessor or intermediary may have different responsibilities and requirements",
                "An insurer and an insurance intermediary do not serve the same role",
                "Nothing is shared or submitted",
              ]}
            />
          </div>
          <Reveal direction="left" delay={150}>
            <EligibilityChecker
              labels={{ role: "Your organization's role", service: "Product you hope to support", market: "Jurisdiction", submit: "Check partnership pathway" }}
              roles={roles.map(({ id, title }) => ({ id, label: title }))}
              services={products}
              roleGates={roleGates}
              commonGates={commonGates}
              roleScope={roleScope}
            />
          </Reveal>
        </div>
      </section>

      <section id="requirements" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Requirements" title="What your review may involve" description="Evidence is reviewed privately and expires on its own schedule." />
          <RequirementsGrid
            items={requirements}
            privacy={{
              icon: "info",
              title: "Privacy",
              text: "We use information you provide to review this partnership inquiry. Evidence is stored securely with restricted access.",
            }}
          />
        </div>
      </section>

      <section id="roles" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Roles" title="Finance and insurance roles are different" className="max-w-3xl" />
          <IconCards
            cards={[
              { icon: "card", title: "Finance", list: [...financeRoles, "Responsibilities and disclosures differ by role and market"] },
              { icon: "umbrella", title: "Insurance", list: [...insuranceRoles, "A broker application doesn't establish insurer status"] },
            ]}
          />
        </div>
      </section>

      <section id="compensation" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Compensation"
            title="Compensation, placement and conflicts are disclosed"
            description="Payment never changes neutral ordering on DriverXtra."
          />
          <TableWithNote
            heading="Compensation models we may disclose"
            columns={["Model", "What consumers see"]}
            rows={compensationModels}
            note={{ title: "No paid ranking", text: "Compensation can't buy a better position in comparisons. Conflicts of interest are declared and reviewed." }}
          />
        </div>
      </section>

      <section id="leads-and-consent" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Leads & consent" title="Permitted referral and technical handoff only" className="max-w-3xl" />
          <NumberedSteps image={{ src: "/images/finance-and-insurance-partners/referral-handoff.webp", alt: "A team meeting in an open-plan office" }} steps={referralSteps} />
        </div>
      </section>

      <section id="claims-and-expiry" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Claims & expiry" title="Reviewed claims stay current" />
          <IconCards
            cards={[
              {
                icon: "calendar",
                title: "Source registry and expiry",
                text: "Regulatory status and product claims are recorded with their source and review date. Expired or withdrawn status pauses referrals for that scope.",
              },
              {
                icon: "flag",
                title: "Incidents and removal",
                text: "Breaches, complaints or loss of authorization follow a documented playbook, which can include pausing or removing a partner.",
              },
            ]}
          />
        </div>
      </section>

      <FaqSection id="finance-insurance-partner-faqs" eyebrow="FAQ" title="Finance & Insurance Partners questions" description="Proposed answers, pending legal and market review." faqs={faqs} />

      <section className="bg-slate-50 py-12">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <Reveal>
            <p className="text-[15px] font-bold text-ink">See what consumers see</p>
            <p className="mt-1 text-[13px] text-slate-600">How finance and insurance options are compared and shown on DriverXtra today.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3">
              {consumerPages.map((label) => (
                <Link
                  key={label}
                  href={hrefFor(label)}
                  className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
                >
                  {label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPartnerLinks
        current="Finance & Insurance Partners"
        title="Offer other automotive services too?"
        text="See the other partner routes for service providers, inspection, transport, parts sellers and distributors."
      />
    </>
  );
}
