import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { uncertainCases } from "./data";

export default function UncertaintySection() {
  return (
    <section id="uncertainty" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Uncertainty"
          title="When the reading is uncertain"
          description="These are general situations. Market-specific legal options are shown only when an official rule has been approved — none is in this version."
        />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {uncertainCases.map(({ title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]">
                <h3 className="text-sm leading-snug font-bold text-ink">{title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
