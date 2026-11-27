import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import NewLoanCalculator from "@/components/new-vehicle-finance/NewLoanCalculator";
import PlanningChecklist from "@/components/new-vehicle-finance/PlanningChecklist";
import { differences, faqs, guides } from "@/components/new-vehicle-finance/data";

export const metadata: Metadata = {
  title: "New Vehicle Finance — DriverXtra",
  description: "Explore costs and financing paths for a new vehicle. This is education — applying is a separate step with a lender.",
};

export default function NewVehicleFinancePage() {
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">New Vehicle Finance</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Explore costs and financing paths for a new vehicle. This is education — applying is a separate step with a lender.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[218/136] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/new-vehicle-finance/hero-new-car-showroom.webp"
                alt="A new white sports car on display in a showroom"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="illustrate" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Example, no credit check"
            title="Illustrate the cost of a new-vehicle loan"
            description="Use your own figures. No lender rate is assumed, and unknown costs stay unknown rather than being counted as zero."
          />
          <NewLoanCalculator />
        </div>
      </section>

      <section id="new-vehicles" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="New vehicles" title="What's different about financing a new vehicle" description="Rules depend on the specific finance program, dealer and manufacturer." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differences.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <article className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </article>
              </Reveal>
            ))}
            {guides.map((g, i) => (
              <Reveal key={g.title} delay={(i + 3) * 100} className="h-full">
                <Link
                  href={hrefFor(g.link)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]"
                >
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <Image src={g.image} alt={g.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <span className="absolute bottom-0 left-0 grid h-9 w-9 place-items-center rounded-tr-lg bg-navy text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold text-ink transition-colors group-hover:text-gold">{g.title}</h3>
                    <p className="mt-1.5 text-[13px] text-slate-600">{g.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="planning" className="scroll-mt-28 bg-white py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <SectionTitle eyebrow="Planning" title="A realistic planning checklist" description="Monthly finance is only part of what a new car costs." />
            <Reveal delay={150}>
              <PlanningChecklist />
            </Reveal>
          </div>
          <Reveal direction="left" delay={150}>
            <div className="group relative aspect-[306/190] overflow-hidden rounded-2xl">
              <Image
                src="/images/new-vehicle-finance/planning-checklist.webp"
                alt="A driver's hand on a steering wheel at dusk"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="credit" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Credit" title="Credit checks and pre-qualification" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]">
                <h3 className="text-[15px] font-bold text-ink">This page</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Using this illustration doesn&apos;t run a credit check or share your figures. Nothing you enter leaves this browser tab.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]">
                <h3 className="text-[15px] font-bold text-ink">Pre-qualification</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">
                  Pre-qualification is a separate service. It explains its own steps, what it checks and whether it affects your credit before you start. A lender makes the final decision.
                </p>
                <Link
                  href={hrefFor("Get Pre-Qualified")}
                  className="group mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-slate-300 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand"
                >
                  Get Pre-Qualified <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection id="new-finance-faqs" eyebrow="FAQ" title="New vehicle finance questions" faqs={faqs} className="bg-white" />
    </>
  );
}
