import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type PartsAuthenticityHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function PartsAuthenticityHeroSection({
  id = "parts-authenticity",
  eyebrow = "PARTS AUTHENTICITY & ANTI-COUNTERFEIT",
  title = "Parts Authenticity & Anti-Counterfeit",
  description = "Understand parts authenticity claims—before you buy or sell. Learn what different parts claims mean, what evidence can help, and when to flag a concerning listing. No single mark or badge proves a part is genuine or safe.",
  imageSrc = "/images/parts/1.png",
  imageAlt = "Mechanic checking vehicle oil dipstick in a professional workshop",
  className = "bg-[#0B1220]",
}: PartsAuthenticityHeroSectionProps) {
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

        {/* Right Side: Hero Image Card */}
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
