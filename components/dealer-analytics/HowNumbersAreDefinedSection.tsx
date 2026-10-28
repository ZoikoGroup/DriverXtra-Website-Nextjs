import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type MethodologyRow = {
  metric: string;
  numerator: string;
  denominatorRule: string;
};

const METHODOLOGY_DATA: MethodologyRow[] = [
  {
    metric: "Listing views",
    numerator: "Eligible listing displays",
    denominatorRule: "Per published measurement rules",
  },
  {
    metric: "Inquiry rate",
    numerator: "Inquiries received",
    denominatorRule: "Listing views in the same window",
  },
  {
    metric: "CRM acknowledgement rate",
    numerator: "Acknowledged deliveries",
    denominatorRule: "Delivery attempts",
  },
];

type HowNumbersAreDefinedSectionProps = {
  id?: string;
  className?: string;
};

export default function HowNumbersAreDefinedSection({
  id,
  className = "bg-[#F6F8FB]",
}: HowNumbersAreDefinedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Methodology"
          title="How the numbers are defined"
        />

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-8 font-semibold w-1/4">
                  Metric
                </th>
                <th scope="col" className="pb-3.5 px-4 font-semibold w-3/8">
                  Numerator
                </th>
                <th scope="col" className="pb-3.5 pl-4 font-semibold w-3/8">
                  Denominator / rule
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {METHODOLOGY_DATA.map((row) => (
                <tr
                  key={row.metric}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8 font-semibold text-slate-700 text-xs">
                    {row.metric}
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-normal">
                    {row.numerator}
                  </td>
                  <td className="py-4 pl-4 text-slate-600 font-normal">
                    {row.denominatorRule}
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
