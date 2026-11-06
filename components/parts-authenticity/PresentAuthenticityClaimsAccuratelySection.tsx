import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SellerStep = {
  number: number;
  title: string;
  description: string;
};

const DEFAULT_SELLER_STEPS: SellerStep[] = [
  {
    number: 1,
    title: "Choose the right category",
    description:
      "OEM, OES, aftermarket, remanufactured or used — as your evidence supports.",
  },
  {
    number: 2,
    title: "Show the evidence",
    description:
      "Part number, issuer, date and scope. Keep private documents private.",
  },
  {
    number: 3,
    title: "Avoid brand assets you can't claim",
    description: "Don't use logos or brand images without the rights to do so.",
  },
  {
    number: 4,
    title: "Keep claims current",
    description:
      "Expired rights remove positive claims; update or withdraw promptly.",
  },
  {
    number: 5,
    title: "Correct mistakes",
    description: "Update a claim through your seller tools — history is kept.",
  },
];

type PresentAuthenticityClaimsAccuratelySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  steps?: SellerStep[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function PresentAuthenticityClaimsAccuratelySection({
  id = "for-sellers",
  eyebrow = "For sellers",
  title = "Present authenticity claims accurately",
  description,
  steps = DEFAULT_SELLER_STEPS,
  imageSrc = "/images/parts/9.png",
  imageAlt = "Presenter leading a business team meeting in a modern office workshop",
  className = "bg-white",
}: PresentAuthenticityClaimsAccuratelySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Workshop Presentation Hero Image */}
          <Reveal direction="zoom" delay={100} className="lg:col-span-6">
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

          {/* Right Column: Numbered Steps with Isolated, Pixel-Perfect Connected Line */}
          <div className="relative lg:col-span-6">
            {/* 
              Continuous background line centered behind the 36px (w-9) circles.
              Starts at 18px (center of first circle) and stops at 18px from the bottom (center of last circle).
              Because it's inside the right column container, it won't overflow or attach to other divs.
            */}
            <div className="absolute left-[17px] top-[18px] bottom-[18px] w-[2px] bg-slate-200" />

            <div className="space-y-6">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={120 + index * 40}>
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Amber Circle Badge sitting directly over the continuous line */}
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F5B400] text-xs font-bold text-ink shadow-2xs">
                      {step.number}
                    </div>

                    <div className="pt-1.5">
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {step.title}
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
