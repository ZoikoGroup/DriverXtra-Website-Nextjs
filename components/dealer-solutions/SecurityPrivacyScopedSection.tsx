import type { ReactNode } from "react";
import { Lock, User, ShieldCheck, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SecurityScopeCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const SCOPE_ITEMS: SecurityScopeCard[] = [
  {
    title: "Organization scope",
    icon: Lock,
    description: "Teams see only their organization and permitted rooftops.",
  },
  {
    title: "Shopper data",
    icon: User,
    description:
      "Used for the inquiry purpose; promotional consent is separate.",
  },
  {
    title: "Evidence",
    icon: ShieldCheck,
    description: "Verification documents are never shown publicly.",
  },
];

type SecurityPrivacyScopedSectionProps = {
  id?: string;
  className?: string;
};

export default function SecurityPrivacyScopedSection({
  id,
  className = "bg-white",
}: SecurityPrivacyScopedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Security and customer privacy"
          title="How business and shopper information is scoped"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {SCOPE_ITEMS.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-gold shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
