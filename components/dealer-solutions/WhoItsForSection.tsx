import type { ReactNode } from "react";
import { Car, Building2, ClipboardCheck, Code2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RoleCard = {
  title: string;
  icon: React.ElementType;
};

const ROLES: RoleCard[] = [
  {
    title: "Independent dealer",
    icon: Car,
  },
  {
    title: "Dealer group",
    icon: Building2,
  },
  {
    title: "Inventory team",
    icon: ClipboardCheck,
  },
  {
    title: "Integrations lead",
    icon: Code2,
  },
];

type WhoItsForSectionProps = {
  id?: string;
  className?: string;
};

export default function WhoItsForSection({
  id,
  className = "bg-white",
}: WhoItsForSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Who it's for"
          title="Choose what describes you best"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map(({ title, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-3">
                  <Icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-sm font-bold text-ink">{title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
