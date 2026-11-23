import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { evidenceLabels } from "./data";
import EvidenceBadge from "./EvidenceBadge";

export default function EvidenceLabelsSection() {
  return (
    <section id="evidence-labels" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Evidence labels"
          title="What each label means"
          description="These describe where a figure comes from. They aren't quality scores."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {evidenceLabels.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 60}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-4">
                <EvidenceBadge evidence={e.id} className="text-base" />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{e.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
