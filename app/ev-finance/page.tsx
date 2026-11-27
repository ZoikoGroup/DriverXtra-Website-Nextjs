import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import EvBasics from "@/components/ev-finance/EvBasics";
import CostTools from "@/components/ev-finance/CostTools";
import { batteryCards, faqs } from "@/components/ev-finance/data";

export const metadata: Metadata = {
  title: "EV Finance — DriverXtra",
  description: "Understand EV borrowing costs, charging factors and conditional incentives before you apply.",
};

export default function EvFinancePage() {
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
                  / By need
                </span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">
                EV Finance
                <span className="animate-pop rounded-full bg-brand px-3 py-1 text-[12px] font-bold tracking-normal text-ink">Where available</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Understand EV borrowing costs, charging factors and conditional incentives before you apply.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[312/195] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/ev-finance/hero-ev-charging.webp"
                alt="A charging cable plugged into an electric car"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ev-basics" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="EV basics"
            title="Battery-electric or plug-in hybrid?"
            description="These are separate choices. A vehicle type doesn't by itself make you eligible for any finance product."
          />
          <EvBasics />
        </div>
      </section>

      <section id="battery-and-range" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Battery & range" title="Battery condition, warranty and range" description="Battery evidence, warranty and finance approval are separate things." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {batteryCards.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-[13px] text-slate-600">
              Shopping for an EV?{" "}
              <Link href={hrefFor("EV & Charging Guides")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                Read the EV charging guides
              </Link>{" "}
              or{" "}
              <Link href={hrefFor("Vehicle History")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                check a vehicle&apos;s history
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CostTools />

      <FaqSection id="ev-finance-faqs" eyebrow="FAQ" title="EV finance questions" faqs={faqs} className="bg-slate-50" />
    </>
  );
}
