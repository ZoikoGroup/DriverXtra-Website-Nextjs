import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import BusinessTypeSelector from "@/components/commercial-and-fleet-insurance/BusinessTypeSelector";
import FleetChecklistBuilder from "@/components/commercial-and-fleet-insurance/FleetChecklistBuilder";
import { faqs, matrix, risks } from "@/components/commercial-and-fleet-insurance/data";

export const metadata: Metadata = {
  title: "Commercial & Fleet Insurance — DriverXtra",
  description: "Understand business vehicle risks, fleet types and a responsible provider handoff.",
};

export default function CommercialFleetInsurancePage() {
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Commercial &amp; Fleet Insurance</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Understand business vehicle risks, fleet types and a responsible provider handoff.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/commercial-and-fleet-insurance/hero-commercial-fleet-insurance.webp"
                  alt="A covered truck driving along a mountain highway"
                  width={539}
                  height={404}
                  priority
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabBar active="commercial" />

      <section id="your-business" className="scroll-mt-40 bg-white pt-16 pb-14">
        <div className={container}>
          <SectionTitle eyebrow="Your business" title="One vehicle or a fleet?" />
          <BusinessTypeSelector />
        </div>
      </section>

      <section id="core-coverage" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Core coverage" title="Risks to think about by vehicle use" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {risks.map(({ title, text, image, alt }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <div className="relative aspect-[398/249] overflow-hidden">
                    <Image src={image} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="coverage-matrix" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Coverage matrix" title="How needs change with use" />
          <Reveal delay={150}>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="w-1/3 py-3 pr-4 font-semibold">Consideration</th>
                    <th className="w-1/3 py-3 pr-4 font-semibold">Single vehicle</th>
                    <th className="py-3 font-semibold">Fleet</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map(([consideration, single, fleet]) => (
                    <tr key={consideration} className="border-b border-slate-100 transition-colors hover:bg-brand-light/50">
                      <th scope="row" className="py-3 pr-4 font-semibold text-slate-600">
                        {consideration}
                      </th>
                      <td className="py-3 pr-4 text-ink">{single}</td>
                      <td className="py-3 text-ink">{fleet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="prepare" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Prepare" title="Get your fleet information ready" />
          <Reveal delay={150}>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Answer a few non-sensitive questions to build a checklist for your insurer or broker. Nothing is sent.{" "}
              <span className="rounded border border-dashed border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">DEMO</span>
            </p>
          </Reveal>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Reveal delay={100}>
              <FleetChecklistBuilder />
            </Reveal>
            <Reveal direction="left" delay={200}>
              <div className="group overflow-hidden rounded-2xl">
                <Image
                  src="/images/commercial-and-fleet-insurance/prepare-fleet-information.webp"
                  alt="A business team meeting in an open-plan office"
                  width={502}
                  height={377}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="next-step" className="scroll-mt-40 bg-white py-16">
        <div className={`${container} grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]`}>
          <Reveal direction="right">
            <div className="group overflow-hidden rounded-2xl">
              <Image
                src="/images/commercial-and-fleet-insurance/next-step-provider.webp"
                alt="Glass office towers against a blue sky"
                width={500}
                height={375}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Next step</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 text-xl font-extrabold tracking-tight text-ink">Continuing to a provider</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                In a supported market, you&apos;d choose a verified insurer or broker, see exactly what would be shared and agree first. No verified commercial
                provider is connected in this demonstration.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection id="commercial-fleet-faqs" eyebrow="Questions" title="Commercial & fleet questions" faqs={faqs} className="bg-white" />
    </>
  );
}
