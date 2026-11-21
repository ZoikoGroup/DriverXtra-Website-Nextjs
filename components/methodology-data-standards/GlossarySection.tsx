import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { glossary } from "./data";

export default function GlossarySection() {
  return (
    <section id="glossary" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <PressHeading eyebrow="Glossary" title="Terms used on DriverXtra" />
        <dl className="mt-8 grid gap-3 md:grid-cols-2">
          {glossary.map((g, i) => (
            <Reveal key={g.term} delay={Math.min(i, 6) * 50}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <dt className="text-[15px] font-bold text-ink">{g.term}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-slate-600">{g.text}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
