import type { ReactNode } from "react";
import Image from "next/image";
import { Bookmark, Scale, Lock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FeatureCard = {
  title: string;
  description: string;
  icon: typeof Bookmark;
};

const DEFAULT_FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Three supply roles",
    description: "brand owner, distributor, importer",
    icon: Bookmark,
  },
  {
    title: "Scoped rights",
    description: "brand, category, market, channel",
    icon: Scale,
  },
  {
    title: "Private evidence",
    description: "rights documents never public",
    icon: Lock,
  },
];

type OemDistributorHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  featureCards?: FeatureCard[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function OemDistributorHeroSection({
  id,
  eyebrow = "OEM & DISTRIBUTOR PROGRAM",
  title = "Bring authorized automotive supply to the right markets.",
  description = "Explore how manufacturers, brand owners, authorized distributors and eligible importers may participate in DriverXtra, subject to current market, rights and program review.",
  featureCards = DEFAULT_FEATURE_CARDS,
  imageSrc = "/images/oem-distributer-program/1.png",
  imageAlt = "Modern architectural corporate glass skyscrapers representing enterprise OEM and distributor operations",
  className = "bg-[#0B1220]",
}: OemDistributorHeroSectionProps) {
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

          {/* 3 Dark Feature Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {featureCards.map(
              ({ title: cardTitle, description: cardDesc, icon: Icon }, i) => (
                <Reveal key={cardTitle} delay={i * 100}>
                  <div className="flex h-full flex-col justify-start rounded-xl border border-slate-800 bg-[#131C2E] p-4 transition-all duration-300 hover:border-slate-700">
                    <Icon className="h-4 w-4 shrink-0 text-brand stroke-[2.5]" />
                    <h3 className="mt-3 text-xs font-bold text-white leading-snug">
                      {cardTitle}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      {cardDesc}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
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
