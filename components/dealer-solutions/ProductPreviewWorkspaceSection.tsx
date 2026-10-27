import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StatusRow = {
  label: string;
  count: number;
};

const INVENTORY_STATUSES: StatusRow[] = [
  { label: "Published", count: 42 },
  { label: "Held for review", count: 3 },
  { label: "Paused", count: 5 },
];

type ProductPreviewWorkspaceSectionProps = {
  id?: string;
  className?: string;
};

export default function ProductPreviewWorkspaceSection({
  id,
  className = "bg-[#F6F8FB]",
}: ProductPreviewWorkspaceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div>
          <SectionTitle
            eyebrow="Product preview"
            title="What the workspace looks like"
          />
          <Reveal delay={100} className="mt-3 inline-block">
            <span className="inline-block rounded-md border border-dashed border-amber-400 bg-amber-50 px-2.5 py-1 text-[11px] font-bold tracking-wider text-amber-800 uppercase">
              Demonstration data
            </span>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-8 max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row">
            {/* Dark Sidebar / Left Card */}
            <div className="bg-[#0B1220] p-6 md:w-56 shrink-0 text-white flex flex-col justify-center">
              <h3 className="text-base font-bold text-white leading-snug">
                Example Motors Group
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                Leeds rooftop
              </p>
            </div>

            {/* Right Status List */}
            <div className="flex-1 p-6">
              <p className="text-xs font-bold text-slate-700">
                Inventory status — synthetic
              </p>
              <div className="mt-4 divide-y divide-slate-100">
                {INVENTORY_STATUSES.map(({ label, count }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="font-medium text-slate-600">{label}</span>
                    <span className="font-bold text-ink">{count}</span>
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
