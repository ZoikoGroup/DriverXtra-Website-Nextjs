import Image from "next/image";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { CLEARANCE_IMAGE } from "./data";

export default function ReleaseClearanceSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[88.9px] pb-[85px] lg:px-20">
      <FleetSectionHead
        eyebrow="Title, lien and handover"
        title="Release is blocked until clearance"
        id="dpTH"
        titleSize="text-[37.5px]"
      />
      <div className="grid w-full items-center gap-8 lg:h-[375px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <figure className="relative h-[300px] w-full self-center overflow-clip rounded-[20px] lg:h-[375px]">
          <Image
            src={CLEARANCE_IMAGE}
            alt="Documents being reviewed"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </figure>
        <div className="flex flex-col gap-3 self-center pb-3">
          <p className="text-[16px] leading-[24.8px] font-normal text-[#172033]">
            If title or lien status is unresolved, release is blocked. Handover records who released the vehicle, to
            whom and when.
          </p>
        </div>
      </div>
    </section>
  );
}
