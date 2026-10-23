import Link from "next/link";
import { ArrowRight, CalendarDays, CreditCard, TriangleAlert, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const included: { label: string; text: string; icon: LucideIcon }[] = [
  {
    label: "Loans:",
    text: "representative APR and its basis, term, deposit, itemised fees and total payable — when the provider supplies all of them.",
    icon: CreditCard,
  },
  {
    label: "Leases:",
    text: "initial rental, monthly rental, term, mileage allowance, excess-mileage charge and end-of-contract fees. Leases aren't ranked by APR.",
    icon: CalendarDays,
  },
  {
    label: "Missing information",
    text: "shows as “Not provided”, and that option isn't included in cost sorting.",
    icon: TriangleAlert,
  },
];

export function UnderstandingFigures() {
  return (
    <section id="understanding-figures" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start`}>
        <div>
          <SectionTitle eyebrow="Understanding the figures" title="What is included in these figures?" />
          <ul className="mt-6 space-y-3">
            {included.map(({ label, text, icon: Icon }, i) => (
              <Reveal key={label} as="li" delay={150 + i * 100}>
                <span className="group flex gap-3 text-sm leading-relaxed text-slate-600">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-300 group-hover:scale-125" />
                  <span>
                    <strong className="text-ink">{label}</strong> {text}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal direction="left" delay={200}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-500 hover:border-brand/60 hover:shadow-lg">
            <h3 className="text-base font-bold text-ink">How these options are compared</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Default order is alphabetical by provider — not a recommendation. You can sort by total payable or monthly
              cost, but only options with the same basis and complete costs are sorted. Variable-rate products can&apos;t
              show a fixed total. Sponsored options are labelled and shown separately; payment never changes the order.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinanceDisclosures() {
  return (
    <section id="finance-disclosures" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle eyebrow="Finance Disclosures" title="Important information" />
        <Reveal delay={150}>
          <div className="mt-6 max-w-4xl space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko Group company. DriverXtra is not a lender and
              does not provide credit or financial advice. Finance and leases are provided by the third-party providers
              named on each option, subject to status, their eligibility criteria and terms. Providers make all decisions
              and issue all documents.
            </p>
            <p>
              Figures marked &quot;representative&quot; or &quot;indicative&quot; are supplied by providers and may not
              reflect the terms you&apos;re offered. Payment estimates calculated from your assumptions are illustrative
              and are not offers. Comparing options on DriverXtra is not an application and doesn&apos;t involve a credit
              check.
            </p>
            <Link
              href="/finance-disclosures"
              className="group inline-flex items-center gap-1.5 font-semibold text-ink underline underline-offset-4 transition-colors hover:text-gold"
            >
              Read the full finance disclosures
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs text-slate-400">
              Example provider data for design review. Regulatory status statements must be confirmed by Legal for each
              market before launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
