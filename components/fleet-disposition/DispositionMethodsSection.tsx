import FleetIconBox from "@/components/fleet-solutions/FleetIconBox";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { METHODS } from "./data";

export default function DispositionMethodsSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[88px] pb-[89px] lg:px-20">
      <FleetSectionHead eyebrow="Disposition methods" title="Ways to exit a vehicle" id="dpMH" titleSize="text-[37.5px]" />
      <div className="grid w-full gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {METHODS.map(({ icon, title, text }) => (
          <article
            key={title}
            className="flex flex-col gap-[5.2px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-4"
          >
            <FleetIconBox src={icon} />
            <h3 className="pt-[0.8px] text-[15.3px] leading-[18.48px] font-bold tracking-[-0.33px] text-[#172033]">
              {title}
            </h3>
            <p className="pb-[0.705px] text-[14.5px] leading-[22.48px] font-normal text-[#4a5670]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
