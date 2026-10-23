import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import DisclosureTopics from "@/components/finance-disclosures/DisclosureTopics";
import { checklist, faqs, steps } from "@/components/finance-disclosures/data";

export const metadata: Metadata = {
  title: "Finance Disclosures — DriverXtra",
  description:
    "Understand interest, fees, repayment commitments and important conditions before you finance a vehicle. Review the provider's current documents before deciding.",
};

export default function FinanceDisclosuresPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Finance Disclosures</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Understand the terms before you finance.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Vehicle finance can involve interest, fees, repayment commitments and important conditions. Explore the terms, compare estimates
                carefully and review the specific provider&apos;s current documents before deciding.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              {/* Mirrored so the advisor sits on the right, as in the design. */}
              <div className="relative -scale-x-100">
                <Image
                  src="/images/vehicle-loan-or-lease/hero-vehicle-loan-or-lease.webp"
                  alt="A couple reviewing finance terms with an advisor at a dealership"
                  width={544}
                  height={281}
                  priority
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pt-16 pb-12">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">How to use this page</h2>
          </Reveal>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((text, i) => (
              <Reveal key={text} as="li" delay={i * 100}>
                <div className="group flex h-full items-start gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                    {i + 1}
                  </span>
                  <span className="text-[13px] leading-relaxed text-slate-600">{text}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <DisclosureTopics />

      <section id="estimate-or-offer" className="scroll-mt-28 bg-white pb-12">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Estimate or offer?</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                  Illustrative estimate — not a finance offer
                </span>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                  Calculated from assumptions you enter or examples we provide. Doesn&apos;t reflect your eligibility or a provider&apos;s terms.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-slate-200 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Provider offer — review the current terms
                </span>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                  Issued by a named provider, with its own terms and expiry. Only this is an actual offer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="costs-checklist" className="scroll-mt-28 bg-white pb-20">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Costs and obligations checklist</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 pr-4 font-semibold">Check</th>
                    <th className="py-3 pr-4 font-semibold">Loan</th>
                    <th className="py-3 font-semibold">Lease</th>
                  </tr>
                </thead>
                <tbody>
                  {checklist.map(([check, loan, lease]) => (
                    <tr key={check} className="border-b border-slate-100 transition-colors hover:bg-brand-light/50">
                      <th scope="row" className="py-3 pr-4 font-semibold text-slate-600">
                        {check}
                      </th>
                      <td className="py-3 pr-4 text-ink">{loan}</td>
                      <td className="py-3 text-ink">{lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection id="disclosure-faqs" eyebrow="Finance Disclosures" title="Finance disclosure questions" faqs={faqs} />
    </>
  );
}
