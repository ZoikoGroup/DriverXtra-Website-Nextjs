import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import GarageManager from "@/components/use-my-garage/GarageManager";
import { faqs, fitmentStates, toneStyles } from "@/components/use-my-garage/data";

export const metadata: Metadata = {
  title: "Use My Garage — DriverXtra",
  description: "Save the vehicles you shop for, choose one, and see parts with fitment information where it's available.",
};

export default function UseMyGaragePage() {
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
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Use My Garage</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-300">
                Save the vehicles you shop for, choose one, and see parts with fitment information where it&apos;s available.
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[243/152] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/use-my-garage/hero-garage.webp"
                alt="A car parked in a well-lit workshop with tool chests and tyres"
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

      <section id="my-garage" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <GarageManager />
        </div>
      </section>

      <section id="fitment" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Fitment"
            title="How fitment information is shown"
            description="A selected vehicle helps filter parts. Each part shows one of these states — never “guaranteed to fit”."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fitmentStates.map((s, i) => {
              const tone = toneStyles[s.tone];
              return (
                <Reveal key={s.title} delay={i * 80} className="h-full">
                  <article className={`group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.3)] ${tone.ring}`}>
                    <h3 className={`flex items-center gap-2 text-[14px] font-semibold ${tone.text}`}>
                      <span className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150 ${tone.dot}`} />
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{s.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-[13px] text-slate-600">
              Not sure what a label means?{" "}
              <Link href={hrefFor("Fitment Help")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                Check a part in Fitment Help
              </Link>
              ,{" "}
              <Link href={hrefFor("Performance & Tuning")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                browse upgrades
              </Link>{" "}
              or{" "}
              <Link href={hrefFor("Enter VIN")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                find parts by VIN
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection id="garage-faqs" eyebrow="FAQ" title="Garage questions" faqs={faqs} className="bg-white" />
    </>
  );
}
