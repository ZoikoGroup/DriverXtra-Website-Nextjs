import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { coverageItems } from "./data";

export default function CoverageSection() {
  return (
    <section id="coverage" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Coverage"
          title="What a vehicle history might include"
          description="Each source captures only the events reported to it. An empty result does not mean nothing happened."
        />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coverageItems.map(({ title, text, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 80}>
              <div className="group h-full rounded-xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.3)]">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
