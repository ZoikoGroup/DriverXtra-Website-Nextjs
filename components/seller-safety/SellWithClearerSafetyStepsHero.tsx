import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type SellWithClearerSafetyStepsHeroProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function SellWithClearerSafetyStepsHero({
  id = "seller-safety-hero",
  eyebrow = "SELLER SAFETY",
  title = "Sell with clearer safety steps.",
  description = "Check who you are dealing with, protect your information, confirm payment independently and plan a safer handover. These steps reduce risk; they do not guarantee a safe transaction.",
  imageSrc = "/images/seller/1.png",
  imageAlt = "Front perspective view of a dark high-performance sports car parked outdoors",
  className = "bg-[#0B1220] text-white",
}: SellWithClearerSafetyStepsHeroProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-28 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading, Eyebrow & Intro Text */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#F5B400]" />
                <span className="text-xs font-bold tracking-widest text-[#F5B400] uppercase">
                  {eyebrow}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                {title}
              </h1>

              {description && (
                <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {description}
                </p>
              )}
            </div>
          </Reveal>

          {/* Right Column: High-Fidelity Car Image (/images/seller/1.png) */}
          <Reveal direction="zoom" delay={200} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-800 shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
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
