import FleetIconBox from "@/components/fleet-solutions/FleetIconBox";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { CONTROLS } from "./data";

export default function PurchaseControlsSection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead eyebrow="Purchase controls" title="Before you commit" id="ppGH" titleSize="text-[37.8px]" />
        <div className="grid w-full gap-[14px] md:grid-cols-3">
          {CONTROLS.map(({ icon, title, text }) => (
            <article
              key={title}
              className="flex flex-col gap-[5px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-4"
            >
              <FleetIconBox src={icon} />
              <h3 className="pt-px text-[15.3px] leading-[18.48px] font-bold tracking-[-0.33px] text-[#172033]">{title}</h3>
              <p className="text-[14.5px] leading-[22.48px] font-normal text-[#4a5670]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
