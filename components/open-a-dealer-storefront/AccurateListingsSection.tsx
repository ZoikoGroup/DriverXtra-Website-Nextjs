import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type TruthItem = {
  title: string;
  description: string;
};

const TRUTH_ITEMS: TruthItem[] = [
  {
    title: "Current status",
    description: "Listings show their own publication status and source.",
  },
  {
    title: "Price and source",
    description: "Each vehicle's price comes from your approved data.",
  },
  {
    title: "No stock guarantee",
    description: "A vehicle can sell or change at any time.",
  },
];

type AccurateListingsSectionProps = {
  id?: string;
  className?: string;
};

export default function AccurateListingsSection({
  id,
  className = "bg-[#F6F8FB]",
}: AccurateListingsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Inventory truth"
          title="Accurate listings, not promises"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TRUTH_ITEMS.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group flex h-full flex-col justify-start rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
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