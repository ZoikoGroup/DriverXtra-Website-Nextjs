import type { ReactNode } from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle2, Eye } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FeatureCard = {
  title: string;
  description: string;
  icon: typeof ShieldCheck;
};

const DEFAULT_FEATURES: FeatureCard[] = [
  {
    title: "Authorized sources",
    description: "rights checked before intake",
    icon: ShieldCheck,
  },
  {
    title: "Item-level validation",
    description: "accepted, held or rejected",
    icon: CheckCircle2,
  },
  {
    title: "Reviewed publication",
    description: "upload ⇄ live listing",
    icon: Eye,
  },
];

type InventoryHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  features?: FeatureCard[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function InventoryHeroSection({
  id,
  eyebrow = "INVENTORY & CATALOG INTEGRATIONS",
  title = "Inventory & Catalog Integrations",
  description = "Connect authorized catalog and inventory sources with clear validation, synchronization and review steps.",
  features = DEFAULT_FEATURES,
  imageSrc = "/images/inventory/1.png",
  imageAlt = "Laptop and monitor displaying inventory catalog dashboard and cloud synchronization workflow in a warehouse setting",
  className = "bg-[#0B1220]",
}: InventoryHeroSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 text-white ${className}`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-12`}>
        {/* Left Side: Content & Feature Cards */}
        <div className="lg:col-span-6">
          <SectionTitle
            dark={true}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          {/* Three Feature Cards Row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {features.map(
              ({ title: cardTitle, description: cardDesc, icon: Icon }, i) => (
                <Reveal key={cardTitle} delay={100 + i * 60}>
                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-brand/50">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xs font-bold text-white">
                        {cardTitle}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                        {cardDesc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>

        {/* Right Side: Image */}
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
