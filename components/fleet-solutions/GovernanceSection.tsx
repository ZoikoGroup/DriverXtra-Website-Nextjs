import Image from "next/image";
import FleetSectionHead from "./FleetSectionHead";
import { GOVERNANCE, SCALE_ICON } from "./data";

export default function GovernanceSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-[32.01px] px-4 py-[66px] lg:px-20">
      <FleetSectionHead eyebrow="Governance" title="Decisions stay accountable" id="flGovH" titleSize="text-[37.8px]" />
      <div className="grid w-full gap-[10px] sm:grid-cols-2 lg:grid-cols-3">
        {GOVERNANCE.map((text) => (
          <div
            key={text}
            className="flex min-h-[48.47px] items-center gap-2 rounded-[12px] border border-solid border-[#d7dee8] bg-white p-3"
          >
            <Image src={SCALE_ICON} alt="" width={16} height={16} unoptimized className="shrink-0" />
            <span className="text-[14.5px] leading-[22.48px] font-[650] text-[#172033]">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
