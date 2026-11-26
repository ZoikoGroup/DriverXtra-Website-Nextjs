import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import PerformanceBrowser from "@/components/performance-and-tuning/PerformanceBrowser";
import { faqs, intro } from "@/components/performance-and-tuning/data";

export const metadata: Metadata = {
  title: "Performance & Tuning — DriverXtra",
  description: "Browse upgrade parts by family, with fitment, road-use status and installation needs shown separately for each product.",
};

export default function PerformanceAndTuningPage() {
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
                  / Upgrade
                </span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Performance &amp; Tuning</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Browse upgrade parts by family. Each product shows fitment, road-use status and installation needs separately, so you can make an informed choice.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[243/152] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/performance-and-tuning/hero-performance-car.webp"
                alt="A yellow sports car parked under trees"
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

      <section id="browse" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {intro.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="group h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.3)]">
                  <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                    <span className="h-4 w-0.5 rounded-full bg-brand transition-all duration-300 group-hover:h-5" />
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <PerformanceBrowser />
        </div>
      </section>

      <FaqSection id="performance-faqs" eyebrow="FAQ" title="Performance & Tuning questions" faqs={faqs} className="bg-slate-50" />
    </>
  );
}
