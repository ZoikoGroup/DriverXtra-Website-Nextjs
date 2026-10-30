import Image from "next/image";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { ICON_CHECK, READINESS } from "./data";

export default function ReadinessSection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead eyebrow="Readiness checklist" title="Before release" id="dpRH" />
        <ul className="flex w-full flex-col gap-2">
          {READINESS.map((item) => (
            <li key={item} className="flex items-start gap-[10px]">
              <Image src={ICON_CHECK} alt="" width={16} height={16} unoptimized className="shrink-0" />
              <span className="text-[15px] leading-[23.25px] font-normal text-[#172033]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
