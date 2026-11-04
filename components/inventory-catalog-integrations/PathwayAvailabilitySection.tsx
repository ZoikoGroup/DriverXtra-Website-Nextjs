import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PathwayStatus =
  | "Pilot"
  | "To be confirmed"
  | "Available"
  | "Unsupported";

export type PathwayRow = {
  pathway: string;
  whatItIs: string;
  status: PathwayStatus;
};

const DEFAULT_PATHWAYS: PathwayRow[] = [
  {
    pathway: "Batch file",
    whatItIs: "Scheduled snapshot or delta files",
    status: "Pilot",
  },
  {
    pathway: "Partner feed",
    whatItIs: "An approved, continuously updated feed",
    status: "Pilot",
  },
  {
    pathway: "API",
    whatItIs: "Authorized system-to-system updates",
    status: "To be confirmed",
  },
];

type PathwayAvailabilitySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  marketName?: string;
  pathways?: PathwayRow[];
  className?: string;
};

export default function PathwayAvailabilitySection({
  id = "pathways",
  eyebrow = "Supported pathways",
  title = "Pathway availability for United Kingdom",
  description = 'Shown only where availability is approved for your market. Unknown is "To be confirmed" — there are no fake toggles.',
  marketName = "United Kingdom",
  pathways = DEFAULT_PATHWAYS,
  className = "bg-white",
}: PathwayAvailabilitySectionProps) {
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
                <div className="grid grid-cols-12 pb-3.5 text-xs font-bold text-slate-400">
                  <span className="col-span-3">Pathway</span>
                  <span className="col-span-6">What it is</span>
                  <span className="col-span-3">{marketName}</span>
                </div>

                {/* Table Rows */}
                {pathways.map(({ pathway, whatItIs, status }) => {
                  const isPilot = status === "Pilot";
                  const isTbc = status === "To be confirmed";

                  return (
                    <div
                      key={pathway}
                      className="grid grid-cols-12 items-center py-4 text-xs text-slate-700"
                    >
                      <span className="col-span-3 font-semibold text-ink sm:text-sm">
                        {pathway}
                      </span>
                      <span className="col-span-6 pr-4 leading-relaxed text-slate-500 sm:text-sm">
                        {whatItIs}
                      </span>
                      <div className="col-span-3 flex items-center gap-2 sm:text-sm">
                        {isPilot && (
                          <>
                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                            <span className="font-semibold text-amber-600">
                              Pilot
                            </span>
                          </>
                        )}
                        {isTbc && (
                          <>
                            <span className="h-2 w-2 rounded-full border border-slate-400 bg-transparent" />
                            <span className="font-normal text-slate-400">
                              To be confirmed
                            </span>
                          </>
                        )}
                        {!isPilot && !isTbc && (
                          <span className="font-medium text-slate-600">
                            {status}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
