import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ResponsibilityRow = {
  area: string;
  driverXtra: string;
  yourOrganization: string;
};

const DEFAULT_RESPONSIBILITIES: ResponsibilityRow[] = [
  {
    area: "Identity and access",
    driverXtra:
      "Issues credentials through approved flows; enforces permissions server-side",
    yourOrganization: "Assigns least-privilege roles; removes leavers promptly",
  },
  {
    area: "Credentials",
    driverXtra:
      "Shows secrets once where designed; supports rotation and revocation",
    yourOrganization: "Stores secrets securely; never shares or embeds them",
  },
  {
    area: "Events",
    driverXtra: "Signs deliveries per the published contract",
    yourOrganization:
      "Verifies signatures and rejects stale or replayed events",
  },
  {
    area: "Data",
    driverXtra:
      "Minimizes what's shared; publishes handling rules when approved",
    yourOrganization:
      "Uses data only for the approved purpose; deletes on schedule",
  },
  {
    area: "Incidents",
    driverXtra: "Runs private intake and triage",
    yourOrganization: "Reports suspected issues promptly and privately",
  },
];

type WhoProtectsWhatSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  rows?: ResponsibilityRow[];
  className?: string;
};

export default function WhoProtectsWhatSection({
  id,
  eyebrow = "Shared responsibility",
  title = "Who protects what",
  description,
  rows = DEFAULT_RESPONSIBILITIES,
  className = "bg-white",
}: WhoProtectsWhatSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Reveal delay={100} className="mt-10">
          <div className="bg-white">
            <div className="overflow-x-auto">
              <div className="min-w-[640px] divide-y divide-slate-100">
                {/* Table Header */}
                <div className="grid grid-cols-12 pb-3 text-xs font-bold text-slate-400">
                  <span className="col-span-3">Area</span>
                  <span className="col-span-4">DriverXtra</span>
                  <span className="col-span-5">Your organization</span>
                </div>

                {/* Table Rows */}
                {rows.map(({ area, driverXtra, yourOrganization }) => (
                  <div
                    key={area}
                    className="grid grid-cols-12 items-center py-4 text-xs text-slate-700"
                  >
                    <span className="col-span-3 font-semibold text-ink">
                      {area}
                    </span>
                    <span className="col-span-4 pr-4 leading-relaxed text-slate-500">
                      {driverXtra}
                    </span>
                    <span className="col-span-5 leading-relaxed text-slate-500">
                      {yourOrganization}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
