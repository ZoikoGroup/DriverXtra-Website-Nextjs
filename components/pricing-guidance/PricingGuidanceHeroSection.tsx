import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type PricingGuidanceHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function PricingGuidanceHeroSection({
  id = "pricing-guidance-hero",
  eyebrow = "SELL VEHICLES / SELLER TOOLS",
  title = "Pricing Guidance",
  description = "Make a more informed asking-price decision using available market context. Guidance is not an offer or guaranteed sale price.",
  className = "bg-[#0B1220] text-white",
}: PricingGuidanceHeroSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#F5B400]" />
              <span className="text-[11px] font-bold tracking-widest text-[#F5B400] uppercase">
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-tight">
              {title}
            </h1>

            {description && (
              <p className="mt-3 text-xs leading-relaxed text-slate-300/90 sm:text-sm max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
