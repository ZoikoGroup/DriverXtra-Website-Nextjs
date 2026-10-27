import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "1",
    title: "Establish",
    description:
      "Establish your business profile and complete the checks required for your market.",
  },
  {
    number: "2",
    title: "Publish",
    description:
      "Choose how to publish vehicle information and keep it current.",
  },
  {
    number: "3",
    title: "Respond",
    description:
      "Route customer interest to the right people and review what you can measure.",
  },
];

type HowItWorksSectionProps = {
  id?: string;
  className?: string;
};

export default function HowItWorksSection({
  id,
  className = "bg-white",
}: HowItWorksSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="How it works"
          title="A straightforward path from business setup to daily operations."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-gold font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {number}
                  </span>
                  <h3 className="text-base font-bold text-ink">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
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
