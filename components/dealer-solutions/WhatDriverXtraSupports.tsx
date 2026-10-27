import type { ReactNode } from "react";
import {
  Building2,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Gauge,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SupportCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const SUPPORT_ITEMS: SupportCard[] = [
  {
    title: "Storefront",
    icon: Building2,
    description: "Present your dealership with a clearer storefront.",
  },
  {
    title: "Inventory",
    icon: ClipboardList,
    description: "Keep vehicle data accurate across your selling workflow.",
  },
  {
    title: "Leads & CRM",
    icon: MessageSquare,
    description: "Make every inquiry easier to handle responsibly.",
  },
  {
    title: "Verification",
    icon: ShieldCheck,
    description: "Explain your business credentials without overstating trust.",
  },
  {
    title: "Analytics",
    icon: Gauge,
    description: "Measure the work with accountable definitions.",
  },
  {
    title: "Support",
    icon: HelpCircle,
    description: "Topic-led help for dealer teams.",
  },
];

type WhatDriverXtraSupportsProps = {
  id?: string;
  className?: string;
};

export default function WhatDriverXtraSupports({
  id,
  className = "bg-[#F6F8FB]",
}: WhatDriverXtraSupportsProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="What DriverXtra supports"
          title="Proof without guarantee"
          description="Capabilities and operational context — no fictional performance figures."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_ITEMS.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-gold shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
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
