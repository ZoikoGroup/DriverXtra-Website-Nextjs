import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type MappingRow = {
  yourColumn: string;
  sampleValue: string;
  driverXtraField: string;
};

const MAPPING_ROWS: MappingRow[] = [
  {
    yourColumn: "stock_no",
    sampleValue: "EX-10422",
    driverXtraField: "Stock number",
  },
  {
    yourColumn: "mk",
    sampleValue: "Example",
    driverXtraField: "Make",
  },
  {
    yourColumn: "price_gbp",
    sampleValue: "18,995",
    driverXtraField: "Price (GBP)",
  },
  {
    yourColumn: "status",
    sampleValue: "AVAIL",
    driverXtraField: "Availability",
  },
];

type MappingOverviewSectionProps = {
  id?: string;
  className?: string;
};

export default function MappingOverviewSection({
  id,
  className = "bg-white",
}: MappingOverviewSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="max-w-3xl">
          <SectionTitle
            eyebrow="Mapping overview"
            title="Keep the source values visible while you choose how DriverXtra should interpret them."
          />

          <div className="mt-4">
            <span className="inline-block rounded border border-dashed border-amber-400 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold tracking-wider text-amber-800 uppercase">
              Demonstration data
            </span>
          </div>
        </div>

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3 pr-6 font-semibold">
                  Your column
                </th>
                <th scope="col" className="pb-3 px-6 font-semibold">
                  Sample value
                </th>
                <th scope="col" className="pb-3 pl-6 font-semibold">
                  DriverXtra field
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {MAPPING_ROWS.map((row) => (
                <tr key={row.yourColumn} className="hover:bg-slate-50/50">
                  <td className="py-4 pr-6 font-mono text-xs text-slate-600">
                    {row.yourColumn}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {row.sampleValue}
                  </td>
                  <td className="py-4 pl-6 font-semibold text-ink">
                    {row.driverXtraField}
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
