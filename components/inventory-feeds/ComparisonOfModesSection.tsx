import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ComparisonRow = {
  feature: string;
  csv: string;
  scheduledTransfer: string;
  api: string;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Setup",
    csv: "Upload in your account",
    scheduledTransfer: "Approved transfer location",
    api: "Approved credentials",
  },
  {
    feature: "Frequency",
    csv: "When you upload",
    scheduledTransfer: "Scheduled",
    api: "As changes occur, where supported",
  },
  {
    feature: "Availability",
    csv: "Subject to approval",
    scheduledTransfer: "Subject to approval",
    api: "Subject to approval",
  },
];

type ComparisonOfModesSectionProps = {
  id?: string;
  className?: string;
};

export default function ComparisonOfModesSection({
  id,
  className = "bg-[#F6F8FB]",
}: ComparisonOfModesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Comparison of modes"
          title="Manual, scheduled or API"
        />

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-6 font-semibold w-1/4">
                  {/* Empty header for row labels */}
                </th>
                <th scope="col" className="pb-3.5 px-6 font-semibold w-1/4">
                  CSV
                </th>
                <th scope="col" className="pb-3.5 px-6 font-semibold w-1/4">
                  Scheduled transfer
                </th>
                <th scope="col" className="pb-3.5 pl-6 font-semibold w-1/4">
                  API
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-6 font-semibold text-ink">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-normal">
                    {row.csv}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-normal">
                    {row.scheduledTransfer}
                  </td>
                  <td className="py-4 pl-6 text-slate-600 font-normal">
                    {row.api}
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
