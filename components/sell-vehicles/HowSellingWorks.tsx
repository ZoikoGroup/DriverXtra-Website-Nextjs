import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { sellingSteps } from "./data";

export default function HowSellingWorks() {
  return (
    <section id="how-selling-works" className="scroll-mt-28 bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="How selling works"
          title="From your first step to a buyer's message"
          description="Timings vary by method and market. We don't promise a sale or a buyer."
        />

        <div className="relative mt-10">
          {/* Connector line behind the cards on large screens */}
          <span className="absolute top-[38px] right-[10%] left-[10%] hidden h-px border-t-2 border-dashed border-slate-300 lg:block" />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sellingSteps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 110} className="relative">
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-brand transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{s.text}</p>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
