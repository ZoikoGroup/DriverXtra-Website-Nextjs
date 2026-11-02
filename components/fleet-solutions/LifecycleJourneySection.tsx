import FleetIconBox from "./FleetIconBox";
import FleetSectionHead from "./FleetSectionHead";
import { JOURNEY } from "./data";

export default function LifecycleJourneySection() {
  return (
    <section id="fleet-solutions" className="flex w-full max-w-[1440px] scroll-mt-28 flex-col gap-8 px-4 py-[66px] lg:px-20">
      <FleetSectionHead eyebrow="Lifecycle journey" title="From planning to disposal" id="flJourH" />
      <ol className="grid w-full grid-cols-2 gap-[10px] sm:grid-cols-4 lg:flex lg:items-stretch">
        {JOURNEY.map(({ icon, title, text }) => (
          <li key={title} className="flex min-w-px flex-1 flex-col justify-center">
            <div className="flex h-full w-full flex-col gap-[6px] rounded-[14px] border border-solid border-[#d7dee8] bg-white p-[14px]">
              <FleetIconBox icon={icon} box={38} />
              <b className="text-[16px] leading-[24.8px] font-bold text-[#172033]">{title}</b>
              <small className="text-[12.5px] leading-[19.38px] font-normal text-[#4a5670]">{text}</small>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
