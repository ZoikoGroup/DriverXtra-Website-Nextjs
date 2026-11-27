import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import RateCalculator from "@/components/apr-and-interest-guide/RateCalculator";
import { comparison, faqs, financeCharges, notFinanceCharges, terms, watchOut } from "@/components/apr-and-interest-guide/data";

export const metadata: Metadata = {
  title: "APR & Interest Guide — DriverXtra",
  description: "Understand borrowing rates, fees and the total amount paid. This guide doesn't show real offers.",
};

const cardHover = "transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]";

export default function AprAndInterestGuidePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className={`${container} relative grid items-center gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-16`}>
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="uppercase">
                  <Link href={hrefFor("Compare Vehicle Finance")} className="transition-colors hover:text-white">
                    Finance
                  </Link>{" "}
                  / Understand cost
                </span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">APR &amp; Interest Guide</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">Understand borrowing rates, fees and the total amount paid. This guide doesn&apos;t show real offers.</p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[225/140] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/apr-and-interest-guide/hero-loan-paperwork.webp"
                alt="Loan paperwork, receipts and a calculator on a desk"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="key-terms" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Key terms" title="Six terms to know" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 90} className="h-full">
                <article className={`group h-full rounded-2xl border border-slate-200 bg-white p-5 ${cardHover}`}>
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                    <span className="h-4 w-0.5 rounded-full bg-brand transition-all duration-300 group-hover:h-5" />
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{t.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Comparison" title="APR vs interest rate" />
          <Reveal delay={150}>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th scope="col" className="w-1/3 px-3 py-3">
                      <span className="sr-only">Question</span>
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Interest rate
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      APR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((c) => (
                    <tr key={c.row} className="group border-b border-slate-200 transition-colors hover:bg-white">
                      <th scope="row" className="px-3 py-3 font-semibold text-slate-600 transition-colors group-hover:text-ink">
                        {c.row}
                      </th>
                      <td className="px-3 py-3 text-ink">{c.rate}</td>
                      <td className="px-3 py-3 text-ink">{c.apr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="fees" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Fees"
            title="Which costs are part of the loan?"
            description="Some charges are part of borrowing; others are costs of owning the car. Lenders classify them under local rules."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { title: "May be finance charges", items: financeCharges, yes: true },
              { title: "Usually not finance charges", items: notFinanceCharges, yes: false },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 120} direction={i ? "left" : "right"} className="h-full">
                <article className={`h-full rounded-2xl border border-slate-200 bg-white p-5 ${cardHover}`}>
                  <h3 className="text-[15px] font-bold text-ink">{col.title}</h3>
                  <ul className="mt-3 space-y-2 text-[13px] text-ink">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 transition-transform duration-300 hover:translate-x-1">
                        {col.yes ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />}
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Calculator" title="See how rate and term change what you pay" description="A simple monthly, fixed-rate example using your own hypothetical numbers. Not an offer." />
          <RateCalculator />
        </div>
      </section>

      <section id="watch-out" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Watch out for" title="Things a simple example doesn't cover" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {watchOut.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="h-full">
                <article className={`h-full rounded-2xl border border-slate-200 bg-white p-5 ${cardHover}`}>
                  <h3 className="text-[14px] font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{w.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-[13px] text-slate-600">
              Ready to compare real options?{" "}
              <Link href={hrefFor("Compare Vehicle Finance")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                Compare vehicle finance
              </Link>
              ,{" "}
              <Link href={hrefFor("Get Pre-Qualified")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                get pre-qualified
              </Link>{" "}
              or read the{" "}
              <Link href={hrefFor("Finance Disclosures")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                finance disclosures
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection id="apr-faqs" eyebrow="FAQ" title="APR and interest questions" faqs={faqs} className="bg-slate-50" />
    </>
  );
}
