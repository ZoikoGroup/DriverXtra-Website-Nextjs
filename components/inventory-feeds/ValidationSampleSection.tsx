import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ValidationMetric = {
  label: string;
  count: number | string;
};

const VALIDATION_METRICS: ValidationMetric[] = [
  {
    label: "Records received",
    count: 120,
  },
  {
    label: "Valid",
    count: 112,
  },
  {
    label: "Warnings",
    count: 5,
  },
  {
    label: "Blocked",
    count: 3,
  },
];

type ValidationSampleSectionProps = {
  id?: string;
  className?: string;
};

export default function ValidationSampleSection({
  id,
  className = "bg-[#F6F8FB]",
}: ValidationSampleSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Validation sample" title="Example results" />

        <div className="mt-3">
          <span className="inline-block rounded border border-dashed border-amber-400 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold tracking-wider text-amber-800 uppercase">
            Demonstration data
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALIDATION_METRICS.map(({ label, count }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="text-xs font-semibold text-slate-500">
                  {label}
                </span>
                <span className="mt-4 text-3xl font-extrabold text-ink tracking-tight">
                  {count}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
