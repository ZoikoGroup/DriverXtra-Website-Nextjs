import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SecurityHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function SecurityHeroSection({
  id,
  eyebrow = "SECURITY & INTEGRATION GUIDANCE",
  title = "Connect securely. Understand every trust boundary.",
  description = "Use this guidance to plan access, protect credentials, validate events and handle sensitive data.",
  imageSrc = "/images/security/1.png",
  imageAlt = "Professional working on laptop and smartphone with secure connection context",
  className = "bg-[#0B1220]",
}: SecurityHeroSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        {/* Left Side: Content */}
        <div>
          <SectionTitle
            dark={true}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </div>

        {/* Right Side: Image */}
        <Reveal direction="zoom" delay={150} className="w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
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
