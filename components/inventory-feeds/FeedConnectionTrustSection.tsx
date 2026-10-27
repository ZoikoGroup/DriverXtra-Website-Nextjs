import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type TrustStep = {
  number: string;
  title: string;
};

const TRUST_STEPS: TrustStep[] = [
  {
    number: "1",
    title: "Connect an authorized source.",
  },
  {
    number: "2",
    title: "Map, inspect and correct vehicle records.",
  },
  {
    number: "3",
    title: "Approve eligible updates and monitor runs.",
  },
];

type FeedConnectionTrustSectionProps = {
  id?: string;
  className?: string;
};

export default function FeedConnectionTrustSection({
  id,
  className = "bg-[#F6F8FB]",
}: FeedConnectionTrustSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Trust statement"
          title="A feed connection does not automatically publish a vehicle."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TRUST_STEPS.map(({ number, title }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
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
