import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type AuditRow = {
  field: string;
  meaning: string;
};

const AUDIT_ROWS: AuditRow[] = [
  {
    field: "Last attempted",
    meaning: "When a run last started",
  },
  {
    field: "Last completed",
    meaning: "When a run last finished successfully",
  },
  {
    field: "Source snapshot",
    meaning: "What was received, kept for review",
  },
];

type EveryRunIsRecordedSectionProps = {
  id?: string;
  className?: string;
};

export default function EveryRunIsRecordedSection({
  id,
  className = "bg-white",
}: EveryRunIsRecordedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Freshness and auditability"
          title="Every run is recorded"
        />

        <Reveal delay={100} className="mt-8 overflow-x-auto max-w-4xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-8 font-semibold w-1/3">
                  Field
                </th>
                <th scope="col" className="pb-3.5 pl-4 font-semibold w-2/3">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_ROWS.map((row) => (
                <tr
                  key={row.field}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8 font-semibold text-ink">
                    {row.field}
                  </td>
                  <td className="py-4 pl-4 text-slate-600 font-normal">
                    {row.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
