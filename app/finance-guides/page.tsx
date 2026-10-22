import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import GuidesBrowser from "@/components/finance-guides/GuidesBrowser";
import { educationCards, faqs, glossary } from "@/components/finance-guides/data";

export const metadata: Metadata = {
  title: "Finance Guides — DriverXtra",
  description:
    "Learn vehicle-finance terms, compare key choices and understand common costs. Educational guides, not lender offers or personal financial advice.",
};

export default async function FinanceGuidesPage({ searchParams }: { searchParams: Promise<{ guide?: string }> }) {
  const { guide } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Finance Guides</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Understand vehicle financing before you decide.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Learn the terms, compare key choices and understand common costs. Our guides explain the process; they are not a lender offer or
                personal financial advice.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/finance-calculator/hero-finance-calculator.webp"
                alt="A couple reviewing vehicle-finance options with an advisor"
                width={544}
                height={281}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <GuidesBrowser initialGuide={guide} />

      <section className="bg-slate-50 py-16">
        <div className={container}>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Education, estimate or offer?</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {educationCards.map(({ title, text, icon: Icon, link }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                    <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                    {title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  <Link href={link.href} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink underline underline-offset-4 transition-colors hover:text-gold">
                    {link.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Glossary spotlight</h2>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {glossary.map(({ term, text }, i) => (
              <Reveal key={term} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                  <h3 className="text-[15px] font-bold text-ink">{term}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection id="guides-faqs" eyebrow="Finance Guides" title="Reader questions" faqs={faqs} />
    </>
  );
}
