import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SetupStep = {
  number: string;
  title: string;
  description: string;
};

const SETUP_STEPS: SetupStep[] = [
  {
    number: "1",
    title: "Create your account",
    description: "Organization and authorized representative",
  },
  {
    number: "2",
    title: "Complete business checks",
    description: "Market-specific requirements",
  },
  {
    number: "3",
    title: "Set up storefront and inventory",
    description: "Drafts stay private until approved",
  },
  {
    number: "4",
    title: "Go live when approved",
    description: "No approval timing promise",
  },
];

type DealerSetupJourneySectionProps = {
  id?: string;
  className?: string;
};

export default function DealerSetupJourneySection({
  id,
  className = "bg-white",
}: DealerSetupJourneySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Dealer success journey"
          title="What setup involves"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SETUP_STEPS.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-ink leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
