import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type FeaturedIndependentInsightSectionProps = {
  id?: string;
  eyebrow?: string;
  badge?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function FeaturedIndependentInsightSection({
  id = "featured-insight",
  eyebrow = "Featured independent insight",
  badge = "MARKET ANALYSIS - UNITED KINGDOM",
  title = "Asking prices and sold prices aren't the same thing",
  description = "Why listing prices and completed sales tell different stories — and how to read each.",
  imageSrc = "/images/auto/8.png",
  imageAlt = "Green luxury performance coupe parked outdoors during sunset",
  className = "bg-[#F6F8FB]",
}: FeaturedIndependentInsightSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Eyebrow */}
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#F5B400]" />
          <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">
            {eyebrow}
          </span>
        </div>

        {/* Featured Card Wrapper */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="grid lg:grid-cols-12 lg:items-center">
              {/* Left Column: Edge-to-edge Zero Padding Image (7 cols) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-6 lg:aspect-[3/3]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              {/* Right Column: Content (5 cols) */}
              <div className="p-8 sm:p-12 lg:col-span-6">
                {badge && (
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    {badge}
                  </span>
                )}

                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-ink sm:text-2xl lg:text-3xl lg:leading-tight">
                  {title}
                </h3>

                {description && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
