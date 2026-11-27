import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type VerifiedPartsSellersHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function VerifiedPartsSellersHeroSection({
  id = "verified-parts-sellers-hero",
  eyebrow = "PARTS & ACCESSORIES / TRUST & BUSINESS",
  title = "Verified Parts Sellers",
  subtitle = "See what has been checked about a parts seller—and what has not.",
  ctaLabel = "What seller verification means",
  ctaHref = "#what-seller-verification-means",
  onCtaClick,
  imageSrc = "/images/part/1.png",
  imageAlt = "Dark vehicle inside lit workshop bay with open door and tools",
  className = "bg-[#0B1220] text-white",
}: VerifiedPartsSellersHeroSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title, Subtitle & Outlined CTA (6 cols) */}
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
                <p className="mt-3 max-w-lg text-xs leading-relaxed text-slate-300/90 sm:text-sm">
                  {subtitle}
                </p>
              )}

              <div className="mt-7">
                {onCtaClick ? (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="rounded-full border border-white/25 bg-transparent px-5 py-2.5 text-xs font-bold text-white transition-colors hover:border-white/50 hover:bg-white/5 sm:text-sm"
                  >
                    {ctaLabel}
                  </button>
                ) : (
                  <a
                    href={ctaHref}
                    className="inline-block rounded-full border border-white/25 bg-transparent px-5 py-2.5 text-xs font-bold text-white transition-colors hover:border-white/50 hover:bg-white/5 sm:text-sm"
                  >
                    {ctaLabel}
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Right Column: Edge-to-Edge Zero-Padding Workshop Visual (6 cols) */}
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
