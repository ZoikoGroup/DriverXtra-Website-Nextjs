import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type ReportFraudHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ReportFraudHeroSection({
  id = "report-fraud-hero",
  eyebrow = "TRUST & SAFETY",
  title = "Report Fraud",
  description = "Concerned about a scam, impersonation or suspicious transaction? Tell us what happened.",
  imageSrc = "/images/fraud/1.png",
  imageAlt = "Person holding smartphone and working on laptop computer",
  className = "bg-[#0B1220] text-white",
}: ReportFraudHeroSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-28 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title & Description */}
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

          {/* Right Column: Hero Laptop/Phone Image */}
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
