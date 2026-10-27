import type { ReactNode } from "react";
import {
  Building2,
  Car,
  MessageSquare,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StorefrontPart = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const STOREFRONT_PARTS: StorefrontPart[] = [
  {
    title: "Storefront identity",
    icon: Building2,
    description: "Trading name, public summary, logo and cover image.",
  },
  {
    title: "Eligible vehicles",
    icon: Car,
    description: "Listings you choose from your published inventory.",
  },
  {
    title: "Contact channels",
    icon: MessageSquare,
    description: "How customers can reach your team.",
  },
  {
    title: "Locations",
    icon: MapPin,
    description: "Rooftops, hours and public contact details.",
  },
];

type StorefrontFourPartsSectionProps = {
  id?: string;
  className?: string;
};

export default function StorefrontFourPartsSection({
  id,
  className = "bg-white",
}: StorefrontFourPartsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="What you can set up"
          title="Your storefront, in four parts"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STOREFRONT_PARTS.map(({ title, icon: Icon, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-gold shadow-sm transition-transform duration-300 group-hover:scale-105">
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
