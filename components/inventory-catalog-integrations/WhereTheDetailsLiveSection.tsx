import type { ReactNode } from "react";
import Image from "next/image";
import { Code, Zap, Shield, Gauge, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type TechReferenceCard = {
  title: string;
  description: string;
  icon: typeof Code;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const DEFAULT_REFERENCES: TechReferenceCard[] = [
  {
    title: "API Documentation",
    description: "Operations, schemas and versions.",
    icon: Code,
    imageSrc: "/images/inventory/10.png",
    imageAlt: "Developer IDE showing API code editor",
    href: "#api-docs",
  },
  {
    title: "Webhooks",
    description: "Change notifications for runs and items.",
    icon: Zap,
    imageSrc: "/images/inventory/11.png",
    imageAlt: "Server rack wiring representing event webhooks",
    href: "#webhooks",
  },
  {
    title: "Security & Integration Guidance",
    description: "Credentials, scopes and safe handling.",
    icon: Shield,
    imageSrc: "/images/inventory/12.png",
    imageAlt: "Developer using mobile device and laptop securely",
    href: "#security-guidance",
  },
  {
    title: "Platform Status",
    description: "Current service health.",
    icon: Gauge,
    imageSrc: "/images/inventory/13.png",
    imageAlt: "Analytics dashboard with system performance monitoring metrics",
    href: "#platform-status",
  },
];

type WhereTheDetailsLiveSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  references?: TechReferenceCard[];
  className?: string;
};

export default function WhereTheDetailsLiveSection({
  id = "technical-references",
  eyebrow = "Technical references",
  title = "Where the details live",
  description,
  references = DEFAULT_REFERENCES,
  className = "bg-white",
}: WhereTheDetailsLiveSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {references.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                icon: Icon,
                imageSrc,
                imageAlt,
                href,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg">
                  {/* Image & Floating Overlay Icon Badge */}
                  <div className="relative aspect-[20/9] w-full bg-slate-900 rounded-t-2xl">
                    <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                    </div>

                    {/* Dark Floating Icon Box (Overlapping Bottom Left) */}
                    <div className="absolute left-5 -bottom-4 z-10 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-md border border-slate-800">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 pt-8 sm:p-7 sm:pt-8">
                    <div>
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {cardTitle}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed sm:text-sm">
                        {cardDesc}
                      </p>
                    </div>

                    <div className="mt-6">
                      <a
                        href={href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                      >
                        Open
                        <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
