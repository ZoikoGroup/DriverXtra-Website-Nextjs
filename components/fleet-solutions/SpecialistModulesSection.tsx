import FleetIconBox from "./FleetIconBox";
import FleetSectionHead from "./FleetSectionHead";
import { MODULES } from "./data";

export default function SpecialistModulesSection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead eyebrow="Specialist modules" title="Choose where to start" id="flSpecH" titleSize="text-[37.8px]" />
        <div className="grid w-full gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ icon, title, text, href }) => (
            <article
              key={title}
              className="flex flex-col gap-[5.2px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-4"
            >
              <FleetIconBox icon={icon} />
              <h3 className="pt-[0.8px] text-[15.3px] leading-[18.48px] font-bold tracking-[-0.33px] text-[#172033]">
                {title}
              </h3>
              <p className="pb-[0.705px] text-[14.5px] leading-[22.48px] font-normal text-[#4a5670]">{text}</p>
              <a
                href={href}
                className="pt-[0.8px] text-[13px] leading-[20.15px] font-semibold text-[#1d5fd1] underline decoration-solid [text-underline-position:from-font]"
              >
                {title}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
