import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import CoverageExplorer from "@/components/coverage-guide/CoverageExplorer";
import QuestionsChecklist from "@/components/coverage-guide/QuestionsChecklist";
import { faqs, policyParts, workedExample, type Treatment } from "@/components/coverage-guide/data";

export const metadata: Metadata = {
  title: "Coverage Guide — DriverXtra",
  description: "Learn policy terms, compare contract clauses and find questions to ask before deciding.",
};

const treatmentStyle: Record<Treatment, string> = {
  Included: "border-emerald-200 bg-emerald-50 text-emerald-700 [&>i]:bg-emerald-500",
  Conditional: "border-amber-200 bg-amber-50 text-amber-700 [&>i]:bg-amber-500",
  Excluded: "border-red-200 bg-red-50 text-red-700 [&>i]:bg-red-500",
};

export default function CoverageGuidePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Insurance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Coverage Guide</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Learn policy terms, compare contract clauses and find questions to ask before deciding.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/coverage-guide/hero-coverage-guide.png"
                alt="A person signing an insurance document"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabBar active="coverage-guide" />

      <CoverageExplorer />

      <section id="worked-example" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <Reveal>
            <Eyebrow>Worked example</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
              Included, conditional or excluded?
              <span className="rounded border border-dashed border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">DEMO</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-2 text-sm text-slate-500">Hypothetical example for learning — not a real policy.</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="w-[38%] py-3 pr-4 font-semibold">Situation</th>
                    <th className="w-[28%] py-3 pr-4 font-semibold">Typical treatment</th>
                    <th className="py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {workedExample.map(({ situation, treatment, why }) => (
                    <tr key={situation} className="border-b border-slate-100 transition-colors hover:bg-white">
                      <td className="py-3 pr-4 text-ink">{situation}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${treatmentStyle[treatment]}`}>
                          <i className="h-1.5 w-1.5 rounded-full" />
                          {treatment}
                        </span>
                      </td>
                      <td className="py-3 text-ink">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="read-a-policy" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Reading your documents" title="How to read a policy" />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
            <Reveal direction="right">
              <div className="group overflow-hidden rounded-2xl">
                <Image
                  src="/images/coverage-guide/how-to-read-a-policy.png"
                  alt="A person reading and signing a policy document"
                  width={500}
                  height={375}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
            <ol className="space-y-3">
              {policyParts.map(({ name, text }, i) => (
                <Reveal key={name} as="li" delay={i * 90}>
                  <span className="group flex gap-3 text-[14px] leading-relaxed text-slate-600">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-transform duration-500 group-hover:rotate-[360deg]">
                      {i + 1}
                    </span>
                    <span>
                      <strong className="text-ink">{name}</strong> — {text}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="questions-to-ask" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Checklist" title="Questions to ask before deciding" />
          <QuestionsChecklist />
        </div>
      </section>

      <FaqSection id="coverage-guide-faqs" eyebrow="Questions" title="Coverage Guide questions" faqs={faqs} className="bg-white" />
    </>
  );
}
