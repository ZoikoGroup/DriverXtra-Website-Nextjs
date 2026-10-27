import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SourceCard = {
  title: string;
};

const LEAD_SOURCES: SourceCard[] = [
  { title: "Vehicle listings" },
  { title: "Dealer storefront" },
  { title: "Contact dealer" },
  { title: "Availability requests" },
];

type ProposedSupportedSourcesSectionProps = {
  id?: string;
  className?: string;
};

export default function ProposedSupportedSourcesSection({
  id,
  className = "bg-white",
}: ProposedSupportedSourcesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Lead sources"
          title="Proposed supported sources"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LEAD_SOURCES.map(({ title }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group flex h-full items-center rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <h3 className="text-sm font-bold text-ink">{title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
