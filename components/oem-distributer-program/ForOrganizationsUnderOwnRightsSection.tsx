import type { ReactNode } from "react";
import Image from "next/image";
import { Info, Bookmark, ShieldCheck, Globe } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type SupplyRoleCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Bookmark;
};

const DEFAULT_SUPPLY_ROLES: SupplyRoleCard[] = [
  {
    title: "I manufacture or own a brand",
    description:
      "Manufacturer or brand owner. You control the trademark and product specifications.",
    imageSrc: "/images/oem-distributer-program/2.png",
    imageAlt:
      "Corporate Glass Skyscrapers representing OEM brand owners and manufacturers",
    icon: Bookmark,
  },
  {
    title: "I hold distribution rights from a manufacturer or rights holder",
    description:
      "Authorized distributor. You'll name the rights holder and the scope you're authorized for.",
    imageSrc: "/images/oem-distributer-program/3.png",
    imageAlt:
      "Fluids and chemical products representing authorized distribution rights",
    icon: ShieldCheck,
  },
  {
    title: "I am an importer or regional channel partner",
    description:
      "Importer or channel partner. Rights are assessed per market and channel.",
    imageSrc: "/images/oem-distributer-program/4.png",
    imageAlt:
      "Freight transport vehicle on highway representing regional importers and logisticians",
    icon: Globe,
  },
];

const OEM_PIPELINE_STEPS = [
  { step: 1, label: "Application received" },
  { step: 2, label: "Entity verified" },
  { step: 3, label: "Rights confirmed" },
  { step: 4, label: "Agreement signed" },
  { step: 5, label: "Catalog rights active" },
  { step: 6, label: "Products live" },
];

type ForOrganizationsUnderOwnRightsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  roles?: SupplyRoleCard[];
  className?: string;
};

export default function ForOrganizationsUnderOwnRightsSection({
  id,
  eyebrow = "Who it's for",
  title = "For organizations that supply under their own rights",
  description = "Select the role you can substantiate with current legal and commercial evidence.",
  roles = DEFAULT_SUPPLY_ROLES,
  className = "bg-white",
}: ForOrganizationsUnderOwnRightsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3 Supply Role Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {roles.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                imageSrc,
                imageAlt,
                icon: Icon,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 100}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Container with Overlapping Icon Badge */}
                  <div className="relative flex flex-1 flex-col justify-start p-5 pt-8">
                    {/* Floating Icon overlapping between image and text */}
                    <div className="absolute -top-5 left-5 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-brand shadow-md ring-4 ring-white">
                      <Icon className="h-5 w-5 stroke-[2.5]" />
                    </div>

                    <h3 className="text-sm font-bold text-ink">{cardTitle}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {cardDesc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>

        {/* Status Pipeline Banner Card */}
        <Reveal delay={200} className="mt-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Info className="h-4 w-4 shrink-0 text-amber-500" />
              <span>
                Entity verification, rights, agreement and marketplace access
                are independent steps.
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {OEM_PIPELINE_STEPS.map(({ step, label }) => (
                <div
                  key={step}
                  className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 transition-colors hover:bg-slate-100/80"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {step}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
