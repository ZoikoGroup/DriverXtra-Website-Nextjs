import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SafeExamplePatternSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function SafeExamplePatternSection({
  id = "what-you-saw",
  eyebrow = "Examples",
  title = "Safe example pattern",
  description,
  imageSrc = "/images/security/7.png",
  imageAlt = "Laptop showing secure encrypted data transfer pattern with document and database security shields",
  className = "bg-[#F6F8FB]",
}: SafeExamplePatternSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Reveal delay={100} className="mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 shadow-xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
