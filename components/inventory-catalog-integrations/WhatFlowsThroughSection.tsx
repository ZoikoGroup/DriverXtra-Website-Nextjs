import type { ReactNode } from "react";
import Image from "next/image";
import { Check, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CategoryItem = {
  label: string;
  description: string;
};

type IdentifierRow = {
  identifier: string;
  ownedBy: string;
  example: string;
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { label: "Parts", description: "Product master, attributes, fitment claims" },
  {
    label: "Vehicles",
    description: "Listing data under verified dealer rights",
  },
  { label: "Media", description: "Images and documents with licensed rights" },
  {
    label: "OEM data",
    description: "Brand designations with approved delegation",
  },
  {
    label: "Stock and offers",
    description: "Quantities, prices and validity — source-gated",
  },
];

const DEFAULT_IDENTIFIERS: IdentifierRow[] = [
  {
    identifier: "Seller SKU",
    ownedBy: "The seller",
    example: "SKU-DEMO-0042",
  },
  {
    identifier: "Brand / MPN",
    ownedBy: "The manufacturer",
    example: "EX-BRK-1180",
  },
  {
    identifier: "GTIN",
    ownedBy: "Global trade item registry",
    example: "00012345678905",
  },
  {
    identifier: "Listing ID",
    ownedBy: "DriverXtra",
    example: "lst_demo_001",
  },
  {
    identifier: "Vehicle taxonomy key",
    ownedBy: "Approved vehicle taxonomy",
    example: "veh_demo_hatch_21",
  },
];

type WhatFlowsThroughSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  categories?: CategoryItem[];
  identifiers?: IdentifierRow[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function WhatFlowsThroughSection({
  id = "data-identifiers",
  eyebrow = "Data & identifiers",
  title = "What flows through, and how it's identified",
  description = "Illustrative field families until a schema is approved.",
  categories = DEFAULT_CATEGORIES,
  identifiers = DEFAULT_IDENTIFIERS,
  imageSrc = "/images/inventory/6.png",
  imageAlt = "Mechanic pouring motor oil into an engine compartment representing product catalog data ingestion",
  className = "bg-white",
}: WhatFlowsThroughSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left Card: Catalog Data Categories */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Catalog data categories
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {categories.map(({ label, description: catDesc }) => (
                      <li key={label} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                        <span className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                          <strong className="font-semibold text-ink">
                            {label}
                          </strong>
                          {" — "}
                          <span className="text-slate-500">{catDesc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 pt-4 text-[11px] leading-relaxed text-slate-400 border-t border-slate-100">
                  Each category keeps its own provenance. Unsupported types are
                  visibly excluded.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Identifiers Table & Info Banner */}
          <Reveal delay={180}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              <div>
                <h3 className="text-base font-bold text-ink">
                  Identifiers are not interchangeable
                </h3>

                <div className="mt-6 overflow-x-auto">
                  <div className="min-w-[480px] divide-y divide-slate-100">
                    {/* Header */}
                    <div className="grid grid-cols-12 pb-3 text-xs font-bold text-slate-400">
                      <span className="col-span-4">Identifier</span>
                      <span className="col-span-4">Owned by</span>
                      <span className="col-span-4">Example</span>
                    </div>

                    {/* Rows */}
                    {identifiers.map(({ identifier, ownedBy, example }) => (
                      <div
                        key={identifier}
                        className="grid grid-cols-12 items-center py-3.5 text-xs text-slate-700 sm:text-sm"
                      >
                        <span className="col-span-4 font-semibold text-slate-700">
                          {identifier}
                        </span>
                        <span className="col-span-4 text-slate-500">
                          {ownedBy}
                        </span>
                        <span className="col-span-4 font-mono text-[11px] text-slate-600 sm:text-xs">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Note Banner */}
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-900 sm:text-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 stroke-[2.5]" />
                <p className="leading-relaxed text-blue-800/90 text-xs">
                  Matching values from different identifier types are never
                  merged automatically. Collisions need a reviewed action.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
