import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SensitiveDataStep = {
  step: number;
  title: string;
  description: string;
};

const DEFAULT_SENSITIVE_DATA_STEPS: SensitiveDataStep[] = [
  {
    step: 1,
    title: "Minimize",
    description: "Request only fields your approved purpose needs.",
  },
  {
    step: 2,
    title: "Mask",
    description: "Show partial values where full values aren't needed.",
  },
  {
    step: 3,
    title: "Protect",
    description: "Encrypt stored sensitive data with managed keys.",
  },
  {
    step: 4,
    title: "Retain",
    description:
      "Retention periods aren't yet confirmed for publication — follow your agreement.",
  },
  {
    step: 5,
    title: "Delete",
    description: "Delete on schedule and when access ends.",
  },
];

type CollectLessKeepItShorterSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: SensitiveDataStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function CollectLessKeepItShorterSection({
  id = "sensitive-data",
  eyebrow = "Sensitive data",
  title = "Collect less, keep it shorter",
  description,
  steps = DEFAULT_SENSITIVE_DATA_STEPS,
  imageSrc = "/images/security/6.png",
  imageAlt = "Person writing on legal documents at a desk representing sensitive data compliance",
  className = "bg-white",
}: CollectLessKeepItShorterSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Image */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl bg-slate-100">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Column: Vertical Timeline Steps */}
          <Reveal delay={180} className="lg:col-span-6">
            <div className="relative space-y-6 pl-2">
              {/* Vertical Connecting Line */}
              <div
                className="absolute top-4 bottom-4 left-[1.375rem] w-[2px] bg-slate-200"
                aria-hidden="true"
              />

              {steps.map(
                ({ step, title: stepTitle, description: stepDesc }) => (
                  <div key={step} className="relative flex items-start gap-5">
                    {/* Step Circle Badge */}
                    <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink shadow-xs">
                      {step}
                    </div>

                    {/* Step Content */}
                    <div className="pt-0.5">
                      <h3 className="text-sm font-bold text-ink">
                        {stepTitle}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {stepDesc}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
