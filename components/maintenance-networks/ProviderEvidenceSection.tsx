import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import FleetStatusTable from "@/components/fleet-solutions/FleetStatusTable";
import { EVIDENCE } from "./data";

export default function ProviderEvidenceSection() {
  return (
    <section className="flex w-full max-w-[1440px] flex-col gap-8 px-4 pt-[89.6px] pb-[93px] lg:px-20">
      <FleetSectionHead eyebrow="Provider evidence" title="Capability and freshness labels" id="mnEH" />
      <FleetStatusTable rows={EVIDENCE} />
    </section>
  );
}
