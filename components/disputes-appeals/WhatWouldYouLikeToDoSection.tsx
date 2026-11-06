import type { ReactNode } from "react";
import Image from "next/image";
import { Scale, FileText, Globe, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type DisputeActionOption = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "scale" | "review" | "help";
};

const DEFAULT_DISPUTE_ACTIONS: DisputeActionOption[] = [
  {
    id: "raise-dispute",
    title: "Raise a dispute about a marketplace transaction or service",
    description:
      "Vehicle, parts, service, transport, commercial or payment matters.",
    imageSrc: "/images/disputes/3.png",
    imageAlt: "Green high-performance luxury coupe parked outdoors during dusk",
    icon: "scale",
  },
  {
    id: "ask-review-decision",
    title: "Ask for review of a platform decision",
    description: "A listing, account, verification or enforcement decision.",
    imageSrc: "/images/disputes/4.png",
    imageAlt: "Person writing notes on financial contract with a pen",
    icon: "review",
  },
  {
    id: "learn-other-help",
    title: "Learn about other ways to get help",
    description: "Banks, payment providers, consumer bodies and emergencies.",
    imageSrc: "/images/disputes/5.png",
    imageAlt: "Modern glass office building architecture looking up",
    icon: "help",
  },
];

const DEFAULT_GOOD_TO_KNOW = [
  "A request isn't an entitlement to an outcome.",
  "Deadlines come from the policy that applies — we don't guess them.",
  "Payment refunds may need your bank or payment provider.",
];

type WhatWouldYouLikeToDoSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  actions?: DisputeActionOption[];
  rightImageSrc?: string;
  rightImageAlt?: string;
  className?: string;
};

export default function WhatWouldYouLikeToDoSection({
  id = "what-would-you-like-to-do",
  eyebrow = "Start",
  title = "What would you like to do?",
  description,
  actions = DEFAULT_DISPUTE_ACTIONS,
  rightImageSrc = "/images/disputes/2.png",
  rightImageAlt = "Two colleagues high-fiving over laptop in office workspace",
  className = "bg-white",
}: WhatWouldYouLikeToDoSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Main 2-Column Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Static Cards Stack (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            {actions.map((action, index) => (
              <Reveal key={action.id} delay={index * 40}>
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 shadow-xs">
                  <div className="flex items-center gap-4">
                    {/* Zero padding edge-to-edge image flush to the left */}
                    <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden bg-slate-900 sm:w-[130px]">
                      <Image
                        src={action.imageSrc}
                        alt={action.imageAlt}
                        fill
                        sizes="(max-width: 640px) 110px, 130px"
                        className="object-cover"
                      />
                    </div>

                    {/* Icon, Title, and Description */}
                    <div className="py-4 pr-6">
                      <div className="mb-2 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#0B1220] text-[#F5B400] shadow-2xs">
                        {action.icon === "scale" && (
                          <Scale className="h-3.5 w-3.5 stroke-[2]" />
                        )}
                        {action.icon === "review" && (
                          <FileText className="h-3.5 w-3.5 stroke-[2]" />
                        )}
                        {action.icon === "help" && (
                          <Globe className="h-3.5 w-3.5 stroke-[2]" />
                        )}
                      </div>

                      <h3 className="text-xs font-bold text-ink sm:text-sm">
                        {action.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Column: Image + Good to know Box (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Top Right Image */}
            <Reveal direction="zoom" delay={100}>
              <div className="relative aspect-[18/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <Image
                  src={rightImageSrc}
                  alt={rightImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Good to know Box */}
            <Reveal delay={150}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
                <h3 className="text-base font-bold text-ink sm:text-lg">
                  Good to know
                </h3>
                <ul className="mt-4 space-y-3">
                  {DEFAULT_GOOD_TO_KNOW.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-xs leading-relaxed text-slate-600 sm:text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
