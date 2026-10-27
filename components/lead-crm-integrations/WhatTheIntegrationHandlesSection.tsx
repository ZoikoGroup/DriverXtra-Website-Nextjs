import type { ReactNode } from "react";
import { MapPin, Lock, Building2, Check, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CapabilityCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const CAPABILITIES: CapabilityCard[] = [
  {
    title: "See where an inquiry came from.",
    icon: MapPin,
    description: "Source context without exposing private origins.",
  },
  {
    title: "Keep contact choices attached to the lead.",
    icon: Lock,
    description: "Consent travels with the inquiry.",
  },
  {
    title: "Send inquiries to the right dealership team.",
    icon: Building2,
    description: "Route by rooftop and availability.",
  },
  {
    title: "Know when a delivery was acknowledged—or needs action.",
    icon: Check,
    description: "Only source-backed statuses.",
  },
];

type WhatTheIntegrationHandlesSectionProps = {
  id?: string;
  className?: string;
};

export default function WhatTheIntegrationHandlesSection({
  id,
  className = "bg-[#F6F8FB]",
}: WhatTheIntegrationHandlesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Core capabilities"
          title="What the integration handles"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 80}>
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
