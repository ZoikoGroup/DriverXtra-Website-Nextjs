import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import CompareCards from "@/components/compare-insurance/CompareCards";
import InsuranceWizard from "@/components/compare-insurance/InsuranceWizard";
import InsuranceTabs from "@/components/compare-insurance/InsuranceTabs";
import { faqs, fairness, howItWorks, isTabId } from "@/components/compare-insurance/data";
import { hrefFor } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Compare Insurance — DriverXtra",
  description: "Understand coverage, pricing concepts and actual providers before a supported vehicle-insurance comparison.",
};

export default async function CompareInsurancePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;

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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Compare Insurance</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Understand coverage, pricing concepts and actual providers before a supported comparison.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/compare-insurance/hero-compare-insurance.png"
                alt="A driver's hands on the steering wheel at dusk"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabs initialTab={isTabId(tab) ? tab : "compare"}>
        <section id="how-it-works" className="scroll-mt-40 bg-white pt-16 pb-12">
          <div className={container}>
            <SectionTitle eyebrow="How it works" title="Four steps, no personal data" />
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map(({ title, text }, i) => (
                <Reveal key={title} as="li" delay={i * 100}>
                  <div className="group flex h-full items-start gap-3 rounded-xl border border-slate-200 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[14px] font-bold text-ink">{title}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-600">{text}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="what-you-can-compare" className="scroll-mt-40 bg-slate-50 py-16">
          <div className={container}>
            <SectionTitle eyebrow="What you can compare" title="Look past the headline price" />
            <Reveal delay={150}>
              <p className="mt-2 text-sm text-slate-500">
                Tap a card to see what it means. Full definitions are in the{" "}
                <Link href={hrefFor("Coverage Guide")} scroll={false} className="link-underline font-medium text-ink underline underline-offset-4 hover:text-gold">
                  Coverage Guide
                </Link>
                .
              </p>
            </Reveal>
            <CompareCards />
          </div>
        </section>

        <InsuranceWizard />

        <section id="fairness" className="scroll-mt-40 bg-slate-50 py-16">
          <div className={container}>
            <SectionTitle eyebrow="Fairness" title="How options would be ordered" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {fairness.map(({ title, text, icon: Icon }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                    <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                      <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                      {title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </InsuranceTabs>

      <FaqSection id="compare-insurance-faqs" eyebrow="Questions" title="Compare Insurance questions" faqs={faqs} className="bg-white" />
    </>
  );
}
