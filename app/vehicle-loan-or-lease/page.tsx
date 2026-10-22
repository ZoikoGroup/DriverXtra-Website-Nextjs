import type { Metadata } from "next";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import ExplainList from "@/components/loan-or-lease/ExplainList";
import { faqs, leaseItems, leaseJourney, loanItems, loanJourney, topics, tradeoffs } from "@/components/loan-or-lease/data";

export const metadata: Metadata = {
  title: "Vehicle Loan or Lease? — DriverXtra",
  description:
    "Compare how vehicle loans and leases work, what may be included in your payments, and the obligations to check before choosing an offer.",
};

function Journey({ title, steps, note }: { title: string; steps: { title: string; text: string }[]; note: string }) {
  return (
    <div className="rounded-2xl bg-navy p-6 text-white shadow-[0_24px_48px_-24px_rgba(11,18,32,0.8)]">
      <h3 className="text-base font-bold">{title}</h3>
      <ol className="relative mt-5 space-y-4">
        <span className="absolute top-3 bottom-3 left-[11px] w-px bg-brand/30" />
        {steps.map((s, i) => (
          <Reveal key={s.title} as="li" direction="left" delay={150 + i * 120}>
            <span className="group relative flex gap-3">
              <span className="relative mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-125">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 [animation-duration:2.5s]" style={{ animationDelay: `${i * 0.6}s` }} />
              </span>
              <span>
                <span className="block text-sm font-bold">{s.title}</span>
                <span className="block text-xs text-slate-400">{s.text}</span>
              </span>
            </span>
          </Reveal>
        ))}
      </ol>
      <p className="mt-5 text-xs text-slate-400">{note}</p>
    </div>
  );
}

export default function VehicleLoanOrLeasePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Vehicle Finance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
                Vehicle loan or lease? Understand your options.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Compare how vehicle loans and leases work, what may be included in your payments, and the obligations to
                check before choosing an offer.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/vehicle-loan-or-lease/hero-vehicle-loan-or-lease.webp"
                alt="A finance advisor talking a couple through options at a dealership"
                width={544}
                height={280}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Topic cards */}
      <section className="bg-white pt-14 pb-6">
        <div className={`${container} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 90}>
              <a
                href="#tradeoffs"
                className="group block h-full rounded-xl border border-brand/40 border-t-4 border-t-brand bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
              >
                <span className="block text-sm font-bold text-ink transition-colors group-hover:text-gold">{t.title}</span>
                <span className="mt-1.5 block text-xs text-slate-500">{t.text}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Loans */}
      <section id="vehicle-loans" className="scroll-mt-28 bg-white py-14">
        <div className={`${container} grid gap-10 lg:grid-cols-[1.4fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Vehicle loans"
              title="How a vehicle loan works"
              description="A vehicle loan can spread the purchase price over agreed payments. Interest, fees, security rights and ownership arrangements depend on the agreement."
            />
            <ExplainList items={loanItems} />
          </div>
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Reveal direction="left" delay={150}>
              <Journey title="A typical loan journey" steps={loanJourney} note="Simplified. Your agreement sets the actual steps." />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leases */}
      <section id="vehicle-leases" className="scroll-mt-28 bg-slate-50 py-14">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.4fr]`}>
          <div className="order-2 lg:sticky lg:top-36 lg:order-1 lg:self-start">
            <Reveal direction="right" delay={150}>
              <Journey title="A typical lease journey" steps={leaseJourney} note="No buyout is guaranteed. Your contract sets the options." />
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <SectionTitle
              eyebrow="Vehicle leases"
              title="How a vehicle lease works"
              description="A lease generally lets you use a vehicle for an agreed term, with payments and conditions defined by a contract. Return and purchase rights vary."
            />
            <ExplainList items={leaseItems} />
            <Reveal>
              <p className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                Review any applicable return, mileage, wear, purchase and early-termination terms in the contract.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tradeoffs */}
      <section id="tradeoffs" className="scroll-mt-28 bg-white py-20 md:py-24">
        <div className={container}>
          <SectionTitle
            eyebrow="Loan vs lease"
            title="Understand the tradeoffs before comparing offers."
            description="Neutral, general information. Neither option is better for everyone."
            className="max-w-3xl"
          />
          <Reveal delay={150}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Topic", "Vehicle loan", "Vehicle lease"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3.5 text-xs font-semibold text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tradeoffs.map(([topic, loan, lease]) => (
                    <tr key={topic} className="group border-t border-slate-200 transition-colors duration-300 hover:bg-brand-light/30">
                      <th scope="row" className="relative px-4 py-4 align-top font-bold text-ink">
                        <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
                        {topic}
                      </th>
                      <td className="px-4 py-4 align-top text-slate-600">{loan}</td>
                      <td className="px-4 py-4 align-top text-slate-600">{lease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection
        id="loan-lease-faqs"
        eyebrow="Vehicle finance questions"
        title="Loan and lease questions"
        description="Plain answers before you compare offers."
        faqs={faqs}
      />
    </>
  );
}
