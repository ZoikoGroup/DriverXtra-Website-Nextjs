import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type StartWhenYouAreReadySectionProps = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function StartWhenYouAreReadySection({
  id = "start-when-you-are-ready",
  title = "Start when you're ready",
  description = "Sign in to save or resume your private listing draft. You can read every step without signing in.",
  primaryCtaLabel = "Start a private draft",
  primaryCtaHref = "#draft-builder",
  onPrimaryCtaClick,
  secondaryCtaLabel = "View the preparation checklist",
  secondaryCtaHref = "#preparation-checklist",
  imageSrc = "/images/auto/5.png",
  imageAlt = "Luxury black coupe silhouette in dark studio setting",
  className = "bg-white",
}: StartWhenYouAreReadySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading, Copy & Action Buttons (5 cols) */}
          <Reveal delay={50} className="lg:col-span-5">
            <div className="max-w-md">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {title}
              </h2>

              {description && (
                <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  {description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {onPrimaryCtaClick ? (
                  <button
                    type="button"
                    onClick={onPrimaryCtaClick}
                    className="rounded-full bg-[#F5B400] px-6 py-3 text-xs font-extrabold text-ink shadow-2xs transition-all hover:bg-[#e0a400] sm:text-sm"
                  >
                    {primaryCtaLabel}
                  </button>
                ) : (
                  <a
                    href={primaryCtaHref}
                    className="rounded-full bg-[#F5B400] px-6 py-3 text-xs font-extrabold text-ink shadow-2xs transition-all hover:bg-[#e0a400] sm:text-sm"
                  >
                    {primaryCtaLabel}
                  </a>
                )}

                <a
                  href={secondaryCtaHref}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:text-ink sm:text-sm"
                >
                  {secondaryCtaLabel}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Edge-to-Edge Studio Car Visual (7 cols) */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-950 shadow-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
