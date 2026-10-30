import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import FleetStatusTable from "@/components/fleet-solutions/FleetStatusTable";
import { FITMENT } from "./data";

export default function FitmentSection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead eyebrow="Vehicle compatibility" title="Fitment confidence" id="ppFH" titleSize="text-[37.8px]" />
        <FleetStatusTable rows={FITMENT} />
      </div>
    </section>
  );
}
