import type { ReactNode } from "react";
import {
  AlertTriangle,
  Scale,
  Lock,
  Flag,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ControlCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const CONTROLS: ControlCard[] = [
  {
    title: "Pause",
    icon: AlertTriangle,
    description: "Stop future imports without deleting listings.",
  },
  {
    title: "Review conflicts",
    icon: Scale,
    description: "Resolve duplicates and mismatches.",
  },
  {
    title: "Quarantine",
    icon: Lock,
    description: "Hold suspicious records.",
  },
  {
    title: "High-removal warning",
    icon: Flag,
    description: "Unusual removals need review before continuing.",
  },
];

type ControlsBeforeGoLiveSectionProps = {
  id?: string;
  className?: string;
};

export default function ControlsBeforeGoLiveSection({
  id,
  className = "bg-[#F6F8FB]",
}: ControlsBeforeGoLiveSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Protection against bad imports"
          title="Controls before anything goes live"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTROLS.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-[#F5B400] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
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
