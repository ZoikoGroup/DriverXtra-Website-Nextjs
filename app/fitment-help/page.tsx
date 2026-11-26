import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import FitmentChecker from "@/components/fitment-help/FitmentChecker";
import { faqs, statuses, troubleshooting, type FitStatus } from "@/components/fitment-help/data";

export const metadata: Metadata = {
  title: "Fitment Help — DriverXtra",
  description: "Check vehicle, part and application details before you buy, and learn what each fitment status means.",
};

export default function FitmentHelpPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className={`${container} relative grid items-center gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-16`}>
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="uppercase">
                  <Link href={hrefFor("Shop All Parts & Accessories")} className="transition-colors hover:text-white">
                    Parts &amp; Accessories
                  </Link>{" "}
                  / Shop by vehicle
                </span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Fitment Help</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">Check vehicle, part and application details before you buy.</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#check"
                  className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
                >
                  Check a part for my vehicle <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#statuses"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Understand fitment statuses
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[243/152] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/fitment-help/hero-fitment-help.webp"
                alt="A mechanic topping up engine oil under an open bonnet"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="check" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Check"
            title="Check a part for my vehicle"
            description="An example checker using synthetic application data, so you can see how fitment information should be read."
          />
          <FitmentChecker />
        </div>
      </section>

      <section id="statuses" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Statuses" title="What fitment statuses mean" description="Colour is never the only signal — every status has a written label and reason." />
          <Reveal delay={150}>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    {["Status", "What it means", "What to do"].map((h) => (
                      <th key={h} scope="col" className="px-3 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(statuses) as FitStatus[]).map((key) => {
                    const s = statuses[key];
                    return (
                      <tr key={key} className="group border-b border-slate-200 transition-colors hover:bg-white">
                        <th scope="row" className={`px-3 py-3 font-semibold ${s.text}`}>
                          <span className="flex items-center gap-2">
                            <span className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150 ${s.dot}`} />
                            {s.label}
                          </span>
                        </th>
                        <td className="px-3 py-3 text-ink">{s.meaning}</td>
                        <td className="px-3 py-3 text-ink">{s.action}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="troubleshoot" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Troubleshoot" title="Resolve a fitment problem" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {troubleshooting.map((t, i) => (
              <Reveal key={t.title} delay={i * 80} className="h-full">
                <Link
                  href={hrefFor(t.link)}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)]"
                >
                  <h3 className="text-[14px] font-bold text-ink">{t.title}</h3>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">{t.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-slate-500 transition-colors group-hover:text-gold">
                    {t.link} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection id="fitment-faqs" eyebrow="FAQ" title="Fitment questions" faqs={faqs} className="bg-slate-50" />
    </>
  );
}
