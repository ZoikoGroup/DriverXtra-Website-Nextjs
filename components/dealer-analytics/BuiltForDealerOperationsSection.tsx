import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type AudienceCard = {
  title: string;
  description: string;
};

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    title: "Single rooftop",
    description: "One location's listings and inquiries.",
  },
  {
    title: "Multi-location",
    description: "Compare permitted rooftops.",
  },
  {
    title: "Independent dealer",
    description: "Practical views without enterprise setup.",
  },
];

type BuiltForDealerOperationsSectionProps = {
  id?: string;
  className?: string;
};

export default function BuiltForDealerOperationsSection({
  id,
  className = "bg-white",
}: BuiltForDealerOperationsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Who it serves"
          title="Built for dealer operations"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {AUDIENCE_CARDS.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group flex h-full flex-col justify-start rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
