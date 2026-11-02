import FleetDemoBadge from "@/components/fleet-solutions/FleetDemoBadge";
import { FleetEyebrow } from "@/components/fleet-solutions/FleetSectionHead";
import { COST_SHARE, COST_TABLE, KPIS } from "./data";

const CELL = "border-b border-solid border-[#d7dee8] p-[10px] text-left text-[14px] leading-[21.7px]";

const BAR_LABEL = "w-[110px] shrink-0 text-[14px] leading-[21.7px] font-normal text-[#172033]";

export default function AnalyticsPreviewSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-[14px] px-4 pt-[88px] pb-[95px] lg:px-20">
      <div className="flex w-full flex-wrap items-end gap-y-6">
        <div className="flex max-w-[720px] min-w-px flex-1 flex-col gap-2 pt-[7.5px]">
          <FleetEyebrow>Analytics preview</FleetEyebrow>
          <h2
            id="anPH"
            className="pt-[4.84px] pb-[0.8px] text-[37.8px] leading-[44.8px] font-extrabold tracking-[-0.8px] text-[#172033] max-sm:text-[28px] max-sm:leading-[34px]"
          >
            Sample charts
          </h2>
          <p className="max-w-[620px] pt-[3.22px] pb-[0.85px]">
            <FleetDemoBadge />
          </p>
        </div>
      </div>

      <div className="grid w-full gap-[10px] pt-[18px] sm:grid-cols-2 lg:grid-cols-5">
        {KPIS.map(({ title, window, source, completeness }) => (
          <div
            key={title}
            className="flex flex-col gap-[2px] self-start rounded-[12px] border border-solid border-[#d7dee8] bg-white p-3"
          >
            <b className="text-[16px] leading-[24.8px] font-bold text-[#172033]">{title}</b>
            <small className="pb-[0.59px] text-[12px] leading-[18.6px] font-normal text-[#4a5670]">Window: {window}</small>
            <small className="pb-[0.59px] text-[12px] leading-[18.6px] font-normal text-[#4a5670]">Source: {source}</small>
            <small className="pb-[0.59px] text-[12px] leading-[18.6px] font-normal text-[#4a5670]">
              Completeness: {completeness}
            </small>
          </div>
        ))}
      </div>

      <figure className="flex w-full flex-col gap-2">
        <figcaption id="anBarCap" className="pb-1 text-[16px] leading-[24.8px] font-bold text-[#172033]">
          Cost share by category (sample, %)
        </figcaption>
        {COST_SHARE.map(({ label, percent }) => (
          <div key={label} className="flex items-center gap-[10px]">
            <span className={BAR_LABEL}>{label}</span>
            <div className="min-w-0 flex-1">
              <i
                className="block h-[14px] rounded-[7px] bg-[#2458b8]"
                // Figma draws bars at 2x the percentage of the track, so 42% fills 84%.
                style={{ width: `${percent * 2}%` }}
              />
            </div>
            <em className="w-[34px] shrink-0 text-right text-[14px] leading-[21.7px] font-bold text-[#172033] not-italic">
              {percent}%
            </em>
          </div>
        ))}
        <div className="flex items-center gap-[10px]">
          <span className={BAR_LABEL}>Fuel</span>
          <i
            className="block min-h-[23.38px] flex-1 rounded-[7px] px-2 pt-[1.5px] pb-[1.88px] text-[12.5px] leading-[19.38px] font-normal text-[#4a5670] not-italic"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #e4e8ef 0 6px, #ffffff 6px 12px)",
            }}
          >
            Unknown — source not connected
          </i>
        </div>
      </figure>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[520px] table-fixed border-collapse">
          <thead>
            <tr>
              {["Category", "Share", "Value category"].map((h) => (
                <th key={h} scope="col" className={`${CELL} font-semibold text-[#667085]`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COST_TABLE.map(({ category, share, value }) => (
              <tr key={category}>
                <th scope="row" className={`${CELL} font-semibold text-[#667085]`}>
                  {category}
                </th>
                <td className={`${CELL} font-normal text-[#172033]`}>{share}</td>
                <td className={CELL}>
                  <span
                    className={`inline-block rounded-[4px] border border-solid px-[7px] pb-[1.05px] text-[11px] leading-[17px] font-extrabold whitespace-nowrap ${
                      value === "Estimated"
                        ? "border-[#b96b13] text-[#b96b13]"
                        : "border-dashed border-[#66758a] text-[#66758a]"
                    }`}
                  >
                    {value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
