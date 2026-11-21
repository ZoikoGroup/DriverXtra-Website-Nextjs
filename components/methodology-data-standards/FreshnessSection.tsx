import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { timestamps } from "./data";

export default function FreshnessSection() {
  return (
    <section id="freshness" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Freshness"
          title="Four separate timestamps"
          description="Each published figure keeps these apart. Times are in UTC."
        />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timestamps.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-base font-bold text-brand ring-4 ring-slate-100">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.text}</p>
                <p className="mt-2 flex flex-wrap items-center gap-1 text-sm font-bold text-ink">
                  {t.example}
                  <span className="rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-amber-900 uppercase">
                    Example
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
