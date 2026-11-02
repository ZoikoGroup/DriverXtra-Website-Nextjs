import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RightsScopeRow = {
  dimension: string;
  whatsChecked: string;
  example: string;
  status: string;
  statusType: "confirmed" | "pending" | "tracked";
};

const DEFAULT_SCOPE_ROWS: RightsScopeRow[] = [
  {
    dimension: "Brand",
    whatsChecked: "The specific trademark or brand",
    example: "Example Brand",
    status: "Confirmed",
    statusType: "confirmed",
  },
  {
    dimension: "Product category",
    whatsChecked: "Which product lines the rights cover",
    example: "Brakes, filters",
    status: "Confirmed",
    statusType: "confirmed",
  },
  {
    dimension: "Territory",
    whatsChecked: "Markets where rights apply",
    example: "United Kingdom",
    status: "Confirmed",
    statusType: "confirmed",
  },
  {
    dimension: "Channel",
    whatsChecked: "Online marketplace, trade, retail",
    example: "Online marketplace",
    status: "Pending",
    statusType: "pending",
  },
  {
    dimension: "Validity",
    whatsChecked: "Start and expiry dates",
    example: "Until 31 Dec 2027",
    status: "Expiry tracked",
    statusType: "tracked",
  },
];

type RightsScopeSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  scopeRows?: RightsScopeRow[];
  warningTitle?: string;
  warningDescription?: string;
  className?: string;
};

export default function RightsScopeSection({
  id,
  eyebrow = "Rights scope",
  title = "Rights are assessed by brand, product category, market and permitted channel.",
  description = "Availability is not universal. Each dimension is confirmed separately.",
  scopeRows = DEFAULT_SCOPE_ROWS,
  warningTitle = "One gap pauses the scope",
  warningDescription = "If any dimension isn't confirmed — for example, the channel — catalog rights aren't activated for that scope.",
  className = "bg-[#F6F8FB]",
}: RightsScopeSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Rights Scope Table */}
          <Reveal delay={100} className="lg:col-span-8">
            <div className="">
              <div className="flex items-center gap-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                  Example rights scope
                </h3>
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-amber-800">
                  Demo Data
                </span>
              </div>

              {/* Table avoiding CSS grid/flexbox instead of colspan/rowspan */}
              <div className="mt-6 divide-y divide-slate-100 overflow-x-auto">
                <div className="grid min-w-[500px] grid-cols-4 pb-3 text-xs font-bold text-slate-400">
                  <span>Dimension</span>
                  <span>What&apos;s checked</span>
                  <span>Example</span>
                  <span>Status</span>
                </div>

                {scopeRows.map(
                  ({
                    dimension,
                    whatsChecked,
                    example,
                    status,
                    statusType,
                  }) => (
                    <div
                      key={dimension}
                      className="grid min-w-[500px] grid-cols-4 items-center py-3.5 text-xs text-slate-700"
                    >
                      <span className="font-semibold text-ink">
                        {dimension}
                      </span>
                      <span className="text-slate-500">{whatsChecked}</span>
                      <span className="text-slate-600">{example}</span>
                      <div className="flex items-center gap-1.5 font-semibold">
                        {statusType === "confirmed" && (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-emerald-600">{status}</span>
                          </>
                        )}
                        {statusType === "pending" && (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                            <span className="text-amber-700">{status}</span>
                          </>
                        )}
                        {statusType === "tracked" && (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full border border-slate-400 bg-transparent" />
                            <span className="text-slate-500">{status}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          {/* Right Side: Warning Callout Box */}
          <Reveal delay={180} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-brand border-t-4 border-t-brand bg-white p-6 shadow-sm sm:p-8">
              <div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">
                  {warningTitle}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {warningDescription}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
