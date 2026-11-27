import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import LoanEstimator from "@/components/finance-tools/LoanEstimator";
import VehicleDetails from "@/components/used-vehicle-finance/VehicleDetails";
import { checks, costLines, faqs } from "@/components/used-vehicle-finance/data";

export const metadata: Metadata = {
  title: "Used Vehicle Finance — DriverXtra",
  description: "Explore used-car borrowing costs and the factors that can affect financing. Lenders decide eligibility, rates and terms.",
};

export default function UsedVehicleFinancePage() {
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Used Vehicle Finance</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Explore used-car borrowing costs and the factors that can affect financing. Lenders decide eligibility, rates and terms.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[222/140] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/used-vehicle-finance/hero-used-car.webp"
                alt="A grey coupe parked on a road at dusk"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="your-vehicle" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Your vehicle"
            title="Tell us about the used vehicle (optional)"
            description="These details help explain what lenders may look at. They don't change the payment maths, and they're never treated as a lending decision."
          />
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
            <Reveal>
              <VehicleDetails />
            </Reveal>
            <Reveal direction="left" delay={150}>
              <div className="group relative aspect-[312/195] overflow-hidden rounded-2xl">
                <Image
                  src="/images/used-vehicle-finance/used-vehicle-on-road.webp"
                  alt="A black saloon driving on a motorway"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="before-you-finance" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Before you finance" title="Title, history, inspection and recalls" description="These are separate checks. A finance approval doesn't confirm any of them." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {checks.map(({ title, text, icon: Icon, link, linkLabel }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <Link
                  href={hrefFor(link)}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-bold text-ink">{title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-slate-500 transition-colors group-hover:text-gold">
                    {linkLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="costs" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Costs" title="What you pay, line by line" description="Each of these is separate. Lenders may treat them differently." />
          <Reveal delay={150}>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th scope="col" className="w-1/2 px-3 py-3 font-semibold">
                      Line
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      What it means
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costLines.map(({ line, meaning }, i) => (
                    <tr key={line} className={`group border-b border-slate-200 transition-colors hover:bg-brand-light/50 ${i === costLines.length - 1 ? "font-semibold" : ""}`}>
                      <th scope="row" className="px-3 py-3 font-semibold text-slate-600 transition-colors group-hover:text-ink">
                        {line}
                      </th>
                      <td className="px-3 py-3 text-ink">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="borrowing-cost" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Borrowing cost" title="Explore an illustrative used-car loan" description="Enter your own example figures. No lender rate is pre-filled." />
          <LoanEstimator
            idPrefix="used-loan"
            incentive={false}
            labels={{ price: "Asking price", feesHint: "Don't include optional products unless you've chosen them.", down: "Down payment", tradeIn: "Trade-in allowance" }}
            placeholder="Enter an asking price and an example APR to see a payment and the total cost."
            excluded={["Optional products you haven't entered (warranty, GAP, service plans)", "Insurance", "Maintenance and repairs"]}
          />
        </div>
      </section>

      <FaqSection id="used-finance-faqs" eyebrow="FAQ" title="Used vehicle finance questions" faqs={faqs} className="bg-white" />
    </>
  );
}
