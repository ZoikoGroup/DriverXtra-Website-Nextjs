import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type HowVerificationWorksHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function HowVerificationWorksHeroSection({
  id = "how-verification-works",
  eyebrow = "TRUST & SAFETY",
  title = "How Verification Works",
  subtitle = "Understand the checks behind a verification signal—and what it cannot tell you.",
  description = "Different checks may apply to different people, businesses, vehicles and parts. When a signal is available, review its scope, source and last checked date before relying on it.",
  imageSrc = "/images/how/1.png",
  imageAlt = "Professional signing verification documents on a clipboard at a desk",
  className = "bg-[#0B1220]",
}: HowVerificationWorksHeroSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        {/* Left Side: Text Content */}
        <div className="lg:col-span-6">
          <SectionTitle dark={true} eyebrow={eyebrow} title={title} />

          <Reveal delay={80} className="mt-4">
            <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
              {subtitle}
            </h3>
          </Reveal>

          <Reveal delay={120} className="mt-4">
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm lg:text-base">
              {description}
            </p>
          </Reveal>
        </div>

        {/* Right Side: Hero Image */}
        <Reveal direction="zoom" delay={150} className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl bg-slate-900">
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
    </section>
  );
}
