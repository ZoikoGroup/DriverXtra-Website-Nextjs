import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SyncItem = {
  title: string;
  description: string;
};

const SYNC_ITEMS: SyncItem[] = [
  {
    title: "Vehicle identity",
    description: "Make, model, trim, year and identifier.",
  },
  {
    title: "Price",
    description: "Your asking price and currency.",
  },
  {
    title: "Stock status",
    description: "Available, reserved, sold.",
  },
  {
    title: "Selected imagery",
    description: "Images you have rights to use.",
  },
];

type VehicleDataSyncSectionProps = {
  id?: string;
  className?: string;
};

export default function VehicleDataSyncSection({
  id,
  className = "bg-white",
}: VehicleDataSyncSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="What can synchronize"
          title="Vehicle data, within source rules"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SYNC_ITEMS.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group flex h-full flex-col justify-start rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <h3 className="text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
