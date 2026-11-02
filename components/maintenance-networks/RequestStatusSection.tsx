import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { STATUSES } from "./data";

export default function RequestStatusSection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead eyebrow="Request vs appointment" title="What each status means" id="mnRH" titleSize="text-[38px]" />
        <ol className="grid w-full gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
          {STATUSES.map(({ title, text }, i) => (
            <li
              key={title}
              className="flex min-h-[78px] items-start gap-3 rounded-[14px] border border-solid border-[#d7dee8] bg-white p-[14px]"
            >
              <b className="flex size-8 shrink-0 items-center justify-center rounded-[16px] bg-[#0b1220] pt-[3.09px] pb-[3.91px] text-center text-[16px] leading-[24.8px] font-bold text-[#f5b400]">
                {i + 1}
              </b>
              <div className="flex flex-col gap-[2.5px] pb-[1.3px]">
                <strong className="text-[15px] leading-[23.25px] font-bold text-[#172033]">{title}</strong>
                <span className="text-[13.5px] leading-[20.93px] font-normal text-[#4a5670]">{text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
