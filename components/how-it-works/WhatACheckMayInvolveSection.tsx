import type { ReactNode } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CheckStep = {
  step: number;
  title: string;
  description: string;
};

const DEFAULT_STEPS: CheckStep[] = [
  {
    step: 1,
    title: "Submitted",
    description: "Information provided through a secure route",
  },
  {
    step: 2,
    title: "Validation",
    description: "Format and completeness checks",
  },
  {
    step: 3,
    title: "Source checks",
    description: "Compared with a named source, where available",
  },
  {
    step: 4,
    title: "Review",
    description: "Assessed by an authorized reviewer, where required",
  },
  {
    step: 5,
    title: "Current",
    description: "Shown for the stated attribute and date",
  },
  {
    step: 6,
    title: "Exception",
    description: "Attention, expiry or withdrawal",
  },
];

type WhatACheckMayInvolveSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: CheckStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function WhatACheckMayInvolveSection({
  id = "what-a-check-may-involve",
  eyebrow = "What a check may involve",
  title = "Requirements, evidence review and source checks vary by verification type and supported market.",
  description,
  steps = DEFAULT_STEPS,
  imageSrc = "/images/how/6.png",
  imageAlt = "Person working on a laptop while holding a mobile phone in a modern workspace",
  className = "bg-white",
}: WhatACheckMayInvolveSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Stepper Header Sequence */}
        <Reveal delay={100} className="mt-12">
          <div className="relative">
            {/* Horizontal Connecting Line for Desktop */}
            <div
              className="absolute top-4 left-4 right-4 hidden h-[2px] bg-slate-200 lg:block"
              aria-hidden="true"
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {steps.map(
                ({ step, title: stepTitle, description: stepDesc }) => (
                  <div
                    key={step}
                    className="relative flex flex-col items-start"
                  >
                    {/* Step Badge */}
                    <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B1220] text-xs font-bold text-brand shadow-xs">
                      {step}
                    </div>

                    {/* Step Text */}
                    <div className="mt-3">
                      <h4 className="text-xs font-bold text-ink sm:text-sm">
                        {stepTitle}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </Reveal>

        {/* Bottom Section: Evidence Stays Private Card + Image */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Card: Evidence Stays Private */}
          <Reveal delay={180} className="lg:col-span-6">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                <Lock className="h-5 w-5 stroke-[2]" />
              </div>

              <h3 className="text-base font-bold text-ink sm:text-lg">
                Evidence stays private
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                Submitted identity documents and internal review notes are not
                displayed on public profiles. Public pages show only approved
                claims: the attribute, scope, market and date.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Hero Image */}
          <Reveal delay={240} className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
