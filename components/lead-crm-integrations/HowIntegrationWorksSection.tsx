import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type IntegrationStep = {
  number: string;
  title: string;
};

const INTEGRATION_STEPS: IntegrationStep[] = [
  {
    number: "1",
    title: "Inquiry received",
  },
  {
    number: "2",
    title: "Recipient validated",
  },
  {
    number: "3",
    title: "Permission checked",
  },
  {
    number: "4",
    title: "Queued",
  },
  {
    number: "5",
    title: "CRM acknowledged",
  },
  {
    number: "6",
    title: "Team follow-up",
  },
];

type HowIntegrationWorksSectionProps = {
  id?: string;
  className?: string;
};

export default function HowIntegrationWorksSection({
  id,
  className = "bg-white",
}: HowIntegrationWorksSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="How integration works"
          title="From inquiry to follow-up"
        />

        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {INTEGRATION_STEPS.slice(0, 5).map(({ number, title }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-xs shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>
                <h3 className="text-xs font-bold text-ink leading-snug">
                  {title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Second Row for Step 6 */}
        <div className="mt-4 max-w-[calc(20%-0.8rem)]">
          {INTEGRATION_STEPS.slice(5).map(({ number, title }, i) => (
            <Reveal key={number} delay={(i + 5) * 80}>
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-xs shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>
                <h3 className="text-xs font-bold text-ink leading-snug">
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
