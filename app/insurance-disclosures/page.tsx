import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import DisclosureFinder, { PrintButton } from "@/components/insurance-disclosures/DisclosureFinder";
import { faqs, topics } from "@/components/insurance-disclosures/data";

export const metadata: Metadata = {
  title: "Insurance Disclosures — DriverXtra",
  description: "Locate important disclosure topics before you continue toward a provider or policy.",
};

export default async function InsuranceDisclosuresPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const initialTopic = topics.some((t) => t.id === topic) ? topic : undefined;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white print:hidden">
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Insurance Disclosures</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Locate important disclosure topics before you continue toward a provider or policy.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/insurance-disclosures/hero-insurance-disclosures.webp"
                alt="A bronze statue of Lady Justice holding scales"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="print:hidden">
        <InsuranceTabBar active="disclosures" />
      </div>

      <section id="disclosure-topics" className="scroll-mt-40 bg-white py-16 print:py-0">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Disclosure topics" title="Find a disclosure topic" />
            <Reveal delay={150}>
              <PrintButton />
            </Reveal>
          </div>
          <DisclosureFinder initialTopic={initialTopic} />
        </div>
      </section>

      <section id="two-kinds-of-notice" className="scroll-mt-40 bg-slate-50 py-16 print:hidden">
        <div className={container}>
          <SectionTitle eyebrow="Two kinds of notice" title="Educational notice vs transaction notice" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="inline-block rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">Educational notice</span>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                  General explanations on this page. They help you understand topics but don&apos;t describe a specific quote or policy.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Transaction-specific notice
                </span>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                  Required information from the provider about your quote or policy — shown before you agree, and it takes priority.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="missing-notice" className="scroll-mt-40 bg-white py-16 print:hidden">
        <div className={container}>
          <SectionTitle eyebrow="Before continuing" title="When a required notice is missing" />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <Reveal direction="right">
              <div className="group overflow-hidden rounded-2xl">
                <Image
                  src="/images/insurance-disclosures/hero-insurance-disclosures.webp"
                  alt="A bronze statue of Lady Justice holding scales"
                  width={599}
                  height={448}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-[14px] leading-relaxed text-slate-600">
                If a required notice for your market or product isn&apos;t published, any step towards a provider is paused rather than continuing without
                it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <FaqSection id="disclosure-questions" eyebrow="Questions" title="Disclosure questions" faqs={faqs} className="bg-white" />
      </div>
    </>
  );
}
