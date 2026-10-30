import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { STEPS } from "./data";

export default function RfqVsPoSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[93px] pb-[90px] lg:px-20">
      <FleetSectionHead eyebrow="RFQ vs PO" title="Two different steps" id="ppRH" />
      <div className="grid w-full gap-3 md:grid-cols-2">
        {STEPS.map(({ title, text }) => (
          <div
            key={title}
            className="flex flex-col gap-[7.3px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-4"
          >
            <b className="text-[16px] leading-[24.8px] font-bold text-[#172033]">{title}</b>
            <p className="text-[14.5px] leading-[22.48px] font-normal text-[#172033]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
