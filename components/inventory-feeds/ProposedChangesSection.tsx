import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ProposedChangeMetric = {
  label: string;
  count: number | string;
};

const PROPOSED_CHANGES: ProposedChangeMetric[] = [
  {
    label: "Add",
    count: 6,
  },
  {
    label: "Update",
    count: 31,
  },
  {
    label: "Hold",
    count: 3,
  },
  {
    label: "Remove",
    count: 2,
  },
];

type ProposedChangesSectionProps = {
  id?: string;
  className?: string;
};

export default function ProposedChangesSection({
  id,
  className = "bg-white",
}: ProposedChangesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Preview before confirming"
          title="Proposed changes"
        />

        <div className="mt-3">
          <span className="inline-block rounded border border-dashed border-amber-400 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold tracking-wider text-amber-800 uppercase">
            Demonstration data
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROPOSED_CHANGES.map(({ label, count }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
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
