import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ShippingStep = {
  number: number;
  question: string;
  description: string;
};

const DEFAULT_SHIPPING_STEPS: ShippingStep[] = [
  {
    number: 1,
    question: "Address changed after payment?",
    description:
      "Confirm through the original order channel before dispatching.",
  },
  {
    number: 2,
    question: "New payment link?",
    description: "Don't use it — payments go through the established channel.",
  },
  {
    number: 3,
    question: "Tracking notice from an unknown sender?",
    description: "Check the carrier account directly.",
  },
  {
    number: 4,
    question: "Fitment or provenance question?",
    description: "Answer accurately and see Parts Authenticity guidance.",
  },
];

type KeepPartsShippingVerifiableSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: ShippingStep[];
  imageSrc?: string;
  imageAlt?: string;
  subLinkText?: string;
  subLinkHref?: string;
  className?: string;
};

export default function KeepPartsShippingVerifiableSection({
  id = "parts-shipping",
  eyebrow = "Parts shipping",
  title = "Keep parts shipping and order changes verifiable",
  description = "Check unexpected address changes, new payment links and purported shipping notices through the established order or carrier channel.",
  steps = DEFAULT_SHIPPING_STEPS,
  imageSrc = "/images/seller/12.png",
  imageAlt = "Abstract colorful water droplets on glass texture",
  subLinkText = "Parts Authenticity & Anti-Counterfeit",
  subLinkHref = "#",
  className = "bg-[#F6F8FB]",
}: KeepPartsShippingVerifiableSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Abstract Hero Image & Sub-link */}
          <div className="lg:col-span-6">
            <Reveal direction="zoom" delay={100}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {subLinkText && (
              <div className="mt-4">
                <a
                  href={subLinkHref}
                  className="text-xs text-slate-400 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-ink"
                >
                  {subLinkText}
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Steps with Isolated Connected Vertical Line */}
          <div className="relative lg:col-span-6">
            {/* Isolated continuous background line running strictly from center of step 1 to step 4 */}
            <div className="absolute left-[17px] top-[18px] bottom-[18px] w-[2px] bg-slate-200" />

            <div className="space-y-6">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={120 + index * 40}>
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Amber Circle Badge sitting directly over the line */}
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F5B400] text-xs font-bold text-ink shadow-2xs">
                      {step.number}
                    </div>

                    <div className="pt-1.5">
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {step.question}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
