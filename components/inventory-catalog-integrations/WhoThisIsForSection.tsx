import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RoleCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_ROLES: RoleCard[] = [
  {
    title: "Parts seller",
    description: "Product master, offers and stock.",
    imageSrc: "/images/inventory/2.png",
    imageAlt: "Mechanic pouring motor oil into a vehicle engine compartment",
  },
  {
    title: "Dealer",
    description: "Vehicle listing data and media.",
    imageSrc: "/images/inventory/3.png",
    imageAlt: "Luxury sports car parked outdoors",
  },
  {
    title: "Distributor",
    description: "Brand catalogs under delegated rights.",
    imageSrc: "/images/inventory/4.png",
    imageAlt: "Abstract macro image with vibrant industrial colors",
  },
  {
    title: "Developer",
    description: "Building the connection for an approved partner.",
    imageSrc: "/images/inventory/5.png",
    imageAlt: "Laptop screen displaying software code editor",
  },
];

type WhoThisIsForSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  roles?: RoleCard[];
  className?: string;
};

export default function WhoThisIsForSection({
  id,
  eyebrow = "Who this is for",
  title = "Built for partners who own their data",
  description = "Each role has its own eligibility. Unsupported roles see an eligibility note.",
  roles = DEFAULT_ROLES,
  className = "bg-white",
}: WhoThisIsForSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map(
            (
              { title: roleTitle, description: roleDesc, imageSrc, imageAlt },
              i,
            ) => (
              <Reveal key={roleTitle} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col justify-start p-6">
                    <h3 className="text-sm font-bold text-ink">{roleTitle}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {roleDesc}
                    </p>
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
