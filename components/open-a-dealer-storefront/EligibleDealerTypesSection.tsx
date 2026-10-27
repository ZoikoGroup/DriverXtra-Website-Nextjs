import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type DealerTypeCard = {
  title: string;
  description: string;
};

const DEALER_TYPES: DealerTypeCard[] = [
  {
    title: "Independent dealer",
    description: "A single rooftop with its own stock.",
  },
  {
    title: "Dealer group",
    description: "Several rooftops under one organization.",
  },
  {
    title: "Franchised dealer",
    description: "Where eligible in your market.",
  },
  {
    title: "Verified agent",
    description: "Acting for a dealer with authority.",
  },
];

type EligibleDealerTypesSectionProps = {
  id?: string;
  className?: string;
};

export default function EligibleDealerTypesSection({
  id,
  className = "bg-[#F6F8FB]",
}: EligibleDealerTypesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Who it's for" title="Eligible dealer types" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEALER_TYPES.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
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
