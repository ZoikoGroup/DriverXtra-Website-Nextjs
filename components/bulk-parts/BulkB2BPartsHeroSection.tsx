import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type BulkB2BPartsHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function BulkB2BPartsHeroSection({
  id = "bulk-b2b-parts-hero",
  eyebrow = "PARTS & ACCESSORIES / TRUST & BUSINESS",
  title = "Bulk / B2B Parts",
  subtitle = "Source parts in quantity. Business prices and ordering depend on eligibility and seller terms.",
  imageSrc = "/images/bulk/hero.png",
  imageAlt = "Commercial freight tractor-trailer travelling along open highway under clear blue sky",
  className = "bg-[#0B1220] text-white",
}: BulkB2BPartsHeroSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title & Subtitle (6 cols) */}
          <Reveal delay={50} className="lg:col-span-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#F5B400]" />
                <span className="text-[11px] font-bold tracking-widest text-[#F5B400] uppercase">
                  {eyebrow}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-300/90 sm:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          </Reveal>

          {/* Right Column: Edge-to-Edge Zero-Padding Freight Visual (6 cols) */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 p-0 m-0 shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover p-0 m-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
