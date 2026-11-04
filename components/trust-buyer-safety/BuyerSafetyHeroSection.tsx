import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type BuyerSafetyHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function BuyerSafetyHeroSection({
  id = "buyer-safety",
  eyebrow = "BUYER SAFETY",
  title = "Buy with more confidence, one check at a time.",
  description = "Understand listing claims, compare evidence, plan an inspection and recognize suspicious requests before you commit.",
  imageSrc = "/images/trust/1.png",
  imageAlt = "Sleek sedan silhouette lit against a dark background",
  className = "bg-[#0B1220]",
}: BuyerSafetyHeroSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        {/* Left Side: Text Content */}
        <div className="lg:col-span-6">
          <SectionTitle dark={true} eyebrow={eyebrow} title={title} />

          <Reveal delay={100} className="mt-4">
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm lg:text-base">
              {description}
            </p>
          </Reveal>
        </div>

        {/* Right Side: Dark Silhouette Hero Image */}
        <Reveal direction="zoom" delay={150} className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl bg-black">
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
