import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ClaimsCarryTheirEvidenceSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  fitmentImageSrc?: string;
  fitmentImageAlt?: string;
  inventoryImageSrc?: string;
  inventoryImageAlt?: string;
  priceImageSrc?: string;
  priceImageAlt?: string;
  className?: string;
};

export default function ClaimsCarryTheirEvidenceSection({
  id = "evidence",
  eyebrow = "Fitment, stock & price",
  title = "Claims carry their evidence",
  description,
  fitmentImageSrc = "/images/inventory/7.png",
  fitmentImageAlt = "Car tail lights in an auto repair workshop",
  inventoryImageSrc = "/images/inventory/8.png",
  inventoryImageAlt = "Aisle of tall warehouse shelves stocked with inventory boxes",
  priceImageSrc = "/images/inventory/9.png",
  priceImageAlt = "Desk with invoices, financial documents, and a calculator",
  className = "bg-[#F6F8FB]",
}: ClaimsCarryTheirEvidenceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Card 1: Fitment */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={fitmentImageSrc}
                  alt={fitmentImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">Fitment</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Vehicle compatibility requires supporting evidence. Review
                    the specific item before relying on a fitment claim.
                  </p>

                  <div className="mt-6 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      <span className="font-semibold text-emerald-600">
                        Verified — attributable evidence
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-amber-600">
                        Candidate — needs review
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full border border-slate-400 bg-transparent" />
                      <span className="font-normal text-slate-400">
                        Fitment unverified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Inventory freshness */}
          <Reveal delay={180}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={inventoryImageSrc}
                  alt={inventoryImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Inventory freshness
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Published availability shows when it was observed and by
                    which source.
                  </p>

                  <div className="mt-5">
                    <p className="text-[11px] font-bold text-ink">
                      Hours since the source last reported stock
                    </p>
                    <span className="mt-1 inline-block rounded-xs bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-800 border border-amber-300/60">
                      SIMULATION
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-600 sm:text-sm">
                      In stock (source-reported)
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Observed 2 h ago · Source: seller warehouse feed (demo)
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Price and offer */}
          <Reveal delay={260}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={priceImageSrc}
                  alt={priceImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-base font-bold text-ink">
                    Price and offer
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Prices and taxes may vary by market, seller and order terms.
                    A list price isn&apos;t a sellable offer.
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                        Currency, market and validity dates carried separately
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                        Tax included or excluded stated explicitly
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                        Missing approval → no price shown
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
