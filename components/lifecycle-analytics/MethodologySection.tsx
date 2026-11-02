import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { SOURCES } from "./data";

const CELL = "border-b border-solid border-[#d7dee8] p-[10px] text-left text-[14px] leading-[21.7px]";

const TONES = {
  pending: { dot: "bg-[#c98200]", text: "text-[#7a5200]" },
  plain: { dot: "", text: "text-[#172033]" },
  none: { dot: "border border-solid border-[#98a2b3] bg-white", text: "text-[#4a5670]" },
};

export default function MethodologySection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 pt-[88px] pb-[100px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3">
        <FleetSectionHead
          eyebrow="Methodology and sources"
          title="How the numbers are built"
          id="anMH"
          titleSize="text-[37.8px]"
        />
        <div className="w-full overflow-x-auto pt-5">
          <table className="w-full min-w-[520px] table-fixed border-collapse">
            <thead>
              <tr>
                <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
                  Source
                </th>
                <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {SOURCES.map(({ source, tone, status }) => (
                <tr key={source}>
                  <th scope="row" className={`${CELL} font-semibold text-[#667085]`}>
                    {source}
                  </th>
                  <td className={`${CELL} font-normal ${TONES[tone].text}`}>
                    <span className="flex items-center gap-[5px]">
                      {tone !== "plain" && <i className={`size-2 shrink-0 rounded-[4px] ${TONES[tone].dot}`} />}
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
