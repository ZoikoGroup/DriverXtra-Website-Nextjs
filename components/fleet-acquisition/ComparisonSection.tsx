import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { CRITERIA } from "./data";

const CELL = "border-b border-solid border-[#d7dee8] p-[10px] text-left text-[14px] leading-[21.7px]";

export default function ComparisonSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-[32.01px] px-4 pt-[88.8px] pb-[95px] lg:px-20">
      <FleetSectionHead eyebrow="Comparison criteria" title="Compare like with like" id="aqCH" />
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[520px] table-fixed border-collapse">
          <thead>
            <tr>
              <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
                Criterion
              </th>
              <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
                Why it matters
              </th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map(({ criterion, why }) => (
              <tr key={criterion}>
                <th scope="row" className={`${CELL} font-semibold text-[#667085]`}>
                  {criterion}
                </th>
                <td className={`${CELL} font-normal text-[#172033]`}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
