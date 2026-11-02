import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type OemStepItem = {
  step: number;
  title: string;
  description: string;
};

const DEFAULT_OEM_STEPS: OemStepItem[] = [
  {
    step: 1,
    title: "Check participation",
    description: "Role, brands and market",
  },
  {
    step: 2,
    title: "Create your organization",
    description: "Legal entity and signatory",
  },
  {
    step: 3,
    title: "Declare rights",
    description: "Brands, categories, territories, channels",
  },
  {
    step: 4,
    title: "Submit for review",
    description: "Your receipt isn't authorization",
  },
  {
    step: 5,
    title: "Rights and agreement",
    description: "Confirmed scope, then terms",
  },
  {
    step: 6,
    title: "Catalog rights active",
    description: "For confirmed scope only",
  },
];

type OemCatalogRightsStepsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  steps?: OemStepItem[];
  className?: string;
};

export default function OemCatalogRightsStepsSection({
  id,
  eyebrow = "How it works",
  title = "From application to catalog rights",
  steps = DEFAULT_OEM_STEPS,
  className = "bg-white",
}: OemCatalogRightsStepsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow={eyebrow} title={title} />

        <div className="relative mt-12">
          {/* Horizontal Connecting Line */}
          <div
            className="absolute top-4 hidden h-[2px] w-full bg-brand lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map(({ step, title: stepTitle, description }, i) => (
              <Reveal key={step} delay={i * 80} className="relative z-10">
                <div className="flex flex-col items-start">
                  {/* Step Badge */}
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0B1220] text-xs font-bold text-brand shadow-sm ring-4 ring-white">
                    {step}
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="mt-4 text-xs font-bold text-ink">
                    {stepTitle}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
