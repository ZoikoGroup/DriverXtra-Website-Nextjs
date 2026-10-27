import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CrmFlowStep = {
  number: string;
  title: string;
};

const CRM_STEPS: CrmFlowStep[] = [
  {
    number: "1",
    title: "Inquiry received",
  },
  {
    number: "2",
    title: "Routed to your team",
  },
  {
    number: "3",
    title: "Permission checked",
  },
  {
    number: "4",
    title: "Delivered to CRM where connected",
  },
];

type LeadAndCrmFlowsSectionProps = {
  id?: string;
  className?: string;
};

export default function LeadAndCrmFlowsSection({
  id,
  className = "bg-white",
}: LeadAndCrmFlowsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Lead and CRM flows"
          title="Make every inquiry easier to handle responsibly."
          description="Understand lead routing, permitted use of shopper information and available CRM connection pathways."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CRM_STEPS.map(({ number, title }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-gold font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>
                <h3 className="text-sm font-bold text-ink leading-snug">
                  {title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
