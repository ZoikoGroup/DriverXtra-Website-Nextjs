import FleetIconBox from "@/components/fleet-solutions/FleetIconBox";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { SERVICES } from "./data";

export default function ServiceCategoriesSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[88px] pb-[89px] lg:px-20">
      <FleetSectionHead eyebrow="Service categories" title="What you can coordinate" id="mnSH" titleSize="text-[37.8px]" />
      <div className="grid w-full gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon, title }) => (
          <article
            key={title}
            className="flex min-h-[104.47px] flex-col gap-[6px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-4"
          >
            <FleetIconBox src={icon} />
            <h3 className="text-[15.7px] leading-[18.48px] font-bold tracking-[-0.33px] whitespace-nowrap text-[#172033]">
              {title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
