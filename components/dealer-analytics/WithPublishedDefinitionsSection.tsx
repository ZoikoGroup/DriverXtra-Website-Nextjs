import type { ReactNode } from "react";
import { Eye, MessageSquare, Scale, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type MeasuredCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const MEASURED_ITEMS: MeasuredCard[] = [
  {
    title: "See listing engagement without guessing at sales.",
    icon: Eye,
    description: "Exposures and views, defined separately.",
  },
  {
    title: "Follow inquiry handling across supported steps.",
    icon: MessageSquare,
    description: "Received, assigned and response evidence.",
  },
  {
    title: "Compare periods with transparent denominators.",
    icon: Scale,
    description: "Method version and dates shown.",
  },
];

type WithPublishedDefinitionsSectionProps = {
  id?: string;
  className?: string;
};

export default function WithPublishedDefinitionsSection({
  id,
  className = "bg-[#F6F8FB]",
}: WithPublishedDefinitionsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="What is measured"
          title="With published definitions"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {MEASURED_ITEMS.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon
                      className="h-5 w-5 stroke-[2.5]"
                      style={{ color: "#F5B400" }}
                    />
                  </span>
                  <h3 className="mt-4 text-sm font-bold leading-snug text-ink">
                    {title}
                  </h3>
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
