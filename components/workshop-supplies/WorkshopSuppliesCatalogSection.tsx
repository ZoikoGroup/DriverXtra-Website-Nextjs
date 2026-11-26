"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  Minus,
  Plus,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type WorkshopSupplySortOption =
  | "relevance"
  | "price-low-high"
  | "price-high-low"
  | "name-az";

export type SpecRow = {
  label: string;
  value: string;
};

export type StatusItem = {
  tone: "ok" | "warn" | "muted";
  title: string;
  detail?: string;
  badge?: string;
};

export type WorkshopSupplyItem = {
  id: string;
  badgeLabel: string;
  title: string;
  supplier: string;
  sku: string;
  category: string;
  jobFamily: string;
  specs: SpecRow[];
  safetyData: StatusItem;
  certification: StatusItem;
  delivery: StatusItem;
  warningNote?: string;
  priceLabel: string;
  price: number;
  unitLabel: string;
  packMultiplier?: number;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

const DEFAULT_WORKSHOP_SUPPLIES: WorkshopSupplyItem[] = [
  {
    id: "click-torque-wrench-half-inch",
    badgeLabel: "EXAMPLE",
    title: 'Click torque wrench, 1/2" drive',
    supplier: "Example Tools",
    sku: "WS-TW-1/2",
    category: "Hand & torque tools",
    jobFamily: "brakes-suspension",
    specs: [
      { label: "Drive", value: "1/2 in" },
      { label: "Range", value: "40–210 N·m" },
      {
        label: "Calibration",
        value: "Every 5,000 cycles or 12 months (manufacturer)",
      },
      { label: "Sold as", value: "each" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "ok",
      title: "ISO 6789-2 calibration certificate",
      detail:
        "Issued by Example Calibration Lab · 14 Aug 2026 · example record",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    priceLabel: "Price per each",
    price: 89,
    unitLabel: "Quantity (each)",
    imageSrc: "/images/workshop/2.png",
    imageAlt: "Technician handling vehicle electronics and wiring with tools",
  },
  {
    id: "brake-cleaner-aerosol-500ml",
    badgeLabel: "EXAMPLE",
    title: "Brake cleaner aerosol, 500 ml",
    supplier: "Sample Chemicals",
    sku: "WS-BC-500",
    category: "Cleaning, lubricants & chemicals",
    jobFamily: "fluids-lubricants",
    specs: [
      { label: "Volume", value: "500 ml per can" },
      { label: "Formulation", value: "Non-chlorinated (example)" },
      { label: "Shelf life", value: "36 months" },
      { label: "Sold as", value: "case of 12" },
    ],
    safetyData: {
      tone: "ok",
      title: "Safety data sheet available",
      detail: "SDS v3.1 · English · revised 2 Jul 2025 · PDF —",
      badge: "EXAMPLE, NOT DOWNLOADABLE",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote:
      "Flammable aerosol. Delivery options and restrictions will be confirmed for your location.",
    priceLabel: "Price per case of 12",
    price: 54,
    unitLabel: "Quantity (case of 12)",
    packMultiplier: 12,
    imageSrc: "/images/workshop/3.png",
    imageAlt:
      "Workshop technician in hard hat and safety glasses near electrical panel",
  },
  {
    id: "nitrile-gloves-box-of-100",
    badgeLabel: "EXAMPLE",
    title: "Nitrile gloves, box of 100",
    supplier: "Example Safety",
    sku: "WS-GL-NIT",
    category: "PPE & safety",
    jobFamily: "bodywork-detailing",
    specs: [
      { label: "Material", value: "Nitrile, 5 mil" },
      { label: "Sizes", value: "S, M, L, XL" },
      { label: "Sold as", value: "box of 100" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote: "Choose PPE based on your own workplace risk assessment.",
    priceLabel: "Price per box of 100",
    price: 12,
    unitLabel: "Quantity (box of 100)",
    packMultiplier: 100,
    imageSrc: "/images/workshop/4.png",
    imageAlt: "Folded protective masks resting on light workshop surface",
  },
  {
    id: "axle-stands-3-tonne-pair",
    badgeLabel: "EXAMPLE",
    title: "Axle stands, 3 tonne (pair)",
    supplier: "Sample Lifting",
    sku: "WS-JS-3T",
    category: "Lifting & support",
    jobFamily: "brakes-suspension",
    specs: [
      { label: "Rated capacity", value: "3,000 kg per pair (6,614 lb)" },
      { label: "Height range", value: "295–425 mm" },
      { label: "Sold as", value: "pair" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote:
      "Use only on level, solid ground at the vehicle maker's lifting points.",
    priceLabel: "Price per pair",
    price: 69,
    unitLabel: "Quantity (pair)",
    packMultiplier: 2,
    imageSrc: "/images/workshop/5.png",
    imageAlt: "Vehicle inside illuminated workshop bay beside tool chests",
  },
  {
    id: "insulating-gloves-class-0",
    badgeLabel: "EXAMPLE",
    title: "Insulating gloves, Class 0",
    supplier: "Example Safety",
    sku: "WS-HV-G0",
    category: "EV / HV service supplies",
    jobFamily: "ev-high-voltage",
    specs: [
      {
        label: "Max working voltage",
        value: "1,000 V AC / 1,500 V DC (manufacturer)",
      },
      { label: "Sizes", value: "9, 10, 11" },
      { label: "Sold as", value: "pair" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote:
      "For qualified high-voltage technicians only. This page doesn't provide HV training or safe-work instructions.",
    priceLabel: "Price per pair",
    price: 79,
    unitLabel: "Quantity (pair)",
    imageSrc: "/images/workshop/9.png",
    imageAlt: "Charging plug connected to an electric vehicle charging port",
  },
  {
    id: "ac-manifold-gauge-set-r1234yf",
    badgeLabel: "EXAMPLE",
    title: "A/C manifold gauge set (R1234yf)",
    supplier: "Sample HVAC",
    sku: "WS-AC-R1234",
    category: "HVAC & refrigerant tools",
    jobFamily: "fluids-lubricants",
    specs: [
      { label: "Refrigerant", value: "R1234yf only" },
      { label: "Hoses", value: "1.5 m" },
      { label: "Sold as", value: "each" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote:
      "Handling refrigerants may require certification in your market. Check before ordering.",
    priceLabel: "Price per each",
    price: 189,
    unitLabel: "Quantity (each)",
    imageSrc: "/images/workshop/10.png",
    imageAlt: "Laptop screen displaying dark diagnostic charts and metrics",
  },
  {
    id: "workshop-paper-roll-2-ply",
    badgeLabel: "EXAMPLE",
    title: "Workshop paper roll, 2-ply",
    supplier: "Example Supplies",
    sku: "WS-RG-ROLL",
    category: "Disposable consumables",
    jobFamily: "bodywork-detailing",
    specs: [
      { label: "Roll length", value: "300 m" },
      { label: "Width", value: "370 mm" },
      { label: "Sold as", value: "pack of 6 rolls" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    priceLabel: "Price per pack of 6 rolls",
    price: 39,
    unitLabel: "Quantity (pack of 6 rolls)",
    packMultiplier: 6,
    imageSrc: "/images/workshop/6.png",
    imageAlt:
      "Technician in high-visibility vest holding tablet beside control cabinets",
  },
  {
    id: "obd-ii-extension-cable",
    badgeLabel: "EXAMPLE",
    title: "OBD-II extension cable",
    supplier: "Sample Electronics",
    sku: "WS-OBD-EXT",
    category: "Diagnostics accessories",
    jobFamily: "diagnostics-electronics",
    specs: [
      { label: "Connector", value: "SAE J1962, 16-pin" },
      { label: "Length", value: "1.5 m" },
      { label: "Sold as", value: "each" },
    ],
    safetyData: {
      tone: "muted",
      title: "Not applicable",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote:
      "A cable doesn't diagnose a vehicle. Check your scan tool's protocol support.",
    priceLabel: "Price per each",
    price: 19,
    unitLabel: "Quantity (each)",
    imageSrc: "/images/workshop/7.png",
    imageAlt:
      "Analytics dashboard showing charts, regional map and performance stats",
  },
  {
    id: "oil-drain-pan-15l",
    badgeLabel: "EXAMPLE",
    title: "Oil drain pan, 15 L",
    supplier: "Example Supplies",
    sku: "WS-OIL-DRN",
    category: "Cleaning, lubricants & chemicals",
    jobFamily: "fluids-lubricants",
    specs: [
      { label: "Capacity", value: "15 L (4 US gal)" },
      { label: "Sold as", value: "each" },
    ],
    safetyData: {
      tone: "warn",
      title: "Not confirmed",
      detail: "Safety information for this product has not been confirmed.",
    },
    certification: {
      tone: "muted",
      title: "Not available",
      detail: "Certification details are not available for this model.",
    },
    delivery: {
      tone: "muted",
      title: "To be confirmed",
      detail: "Delivery options will be confirmed for your location.",
    },
    warningNote: "Dispose of used oil through a licensed collection point.",
    priceLabel: "Price per each",
    price: 24,
    unitLabel: "Quantity (each)",
    imageSrc: "/images/workshop/8.png",
    imageAlt: "Classic dark coupe inside workshop bay with warm lighting",
  },
];

function StatusRow({
  label,
  status,
  showSheetIcon = false,
}: {
  label: string;
  status: StatusItem;
  showSheetIcon?: boolean;
}) {
  return (
    <div className="grid grid-cols-[96px_1fr] items-start gap-2 border-t border-slate-100 pt-2.5">
      <dt className="text-[11px] font-medium text-slate-500">{label}</dt>
      <dd className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          {status.tone === "ok" && (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          )}
          {status.tone === "warn" && (
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
          )}
          {status.tone === "muted" && (
            <Circle className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          )}

          {showSheetIcon && status.tone === "ok" && (
            <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
          )}

          <span
            className={
              status.tone === "ok"
                ? "text-emerald-700"
                : status.tone === "warn"
                  ? "text-rose-600"
                  : "text-slate-500"
            }
          >
            {status.title}
          </span>
        </div>

        {status.detail && (
          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
            {status.detail}
          </p>
        )}

        {status.badge && (
          <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-amber-900 uppercase">
            {status.badge}
          </span>
        )}
      </dd>
    </div>
  );
}

type WorkshopSuppliesCatalogSectionProps = {
  id?: string;
  heading?: ReactNode;
  sortLabel?: string;
  items?: WorkshopSupplyItem[];
  selectedJob?: string;
  selectedMarket?: string;
  searchQuery?: string;
  currencySymbol?: string;
  onViewDetails?: (item: WorkshopSupplyItem) => void;
  onCompareToggle?: (itemId: string, checked: boolean) => void;
  className?: string;
};

export default function WorkshopSuppliesCatalogSection({
  id = "workshop-supplies-catalog",
  heading = "Supplies",
  sortLabel = "Sort",
  items = DEFAULT_WORKSHOP_SUPPLIES,
  selectedJob = "any",
  searchQuery = "",
  currencySymbol = "£",
  onViewDetails,
  onCompareToggle,
  className = "bg-[#F6F8FB]",
}: WorkshopSuppliesCatalogSectionProps) {
  const [sortBy, setSortBy] = useState<WorkshopSupplySortOption>("relevance");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [comparedIds, setComparedIds] = useState<Record<string, boolean>>({});

  const filteredAndSortedItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesJob =
        !selectedJob || selectedJob === "any" || item.jobFamily === selectedJob;

      const matchesQuery =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.supplier.toLowerCase().includes(normalizedQuery) ||
        item.sku.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.specs.some(
          (s) =>
            s.label.toLowerCase().includes(normalizedQuery) ||
            s.value.toLowerCase().includes(normalizedQuery),
        );

      return matchesJob && matchesQuery;
    });

    const sorted = [...filtered];
    if (sortBy === "price-low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [items, selectedJob, searchQuery, sortBy]);

  const updateQty = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] ?? 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const handleCompareChange = (itemId: string, checked: boolean) => {
    setComparedIds((prev) => ({ ...prev, [itemId]: checked }));
    onCompareToggle?.(itemId, checked);
  };

  return (
    <section
      id={id}
      className={`scroll-mt-28 py-20 pt-4 md:py-24 ${className}`}
    >
      <div className={container}>
        {/* Header Bar: Title + Count on Left, Sort Dropdown on Right */}
        <Reveal delay={50}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {heading}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredAndSortedItems.length}{" "}
                {filteredAndSortedItems.length === 1 ? "product" : "products"} ·{" "}
                <span className="text-slate-400">not a live stock list</span>
              </p>
            </div>

            <div className="flex flex-col items-start gap-1 self-start sm:self-auto">
              <label
                htmlFor="workshop-supplies-sort"
                className="text-[11px] font-bold text-slate-600"
              >
                {sortLabel}
              </label>

              <div className="relative">
                <select
                  id="workshop-supplies-sort"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as WorkshopSupplySortOption)
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-xs font-medium text-ink shadow-2xs transition-colors focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-high">Price: Low to high</option>
                  <option value="price-high-low">Price: High to low</option>
                  <option value="name-az">Name: A to Z</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2-Column Supply Cards Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50/60 p-10 text-center">
            <p className="text-sm font-bold text-ink">
              No workshop supplies match your current filter.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try clearing your search term or selecting another job family.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredAndSortedItems.map((item, index) => {
              const qty = quantities[item.id] ?? 1;
              const isChecked = Boolean(comparedIds[item.id]);
              const totalItems = item.packMultiplier
                ? qty * item.packMultiplier
                : null;

              return (
                <Reveal key={item.id} delay={index * 35}>
                  <article className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-0 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
                    <div className="p-0">
                      {/* Zero-Padding Edge-to-Edge Top Image with EXAMPLE Pill */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-slate-900 p-0 m-0">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="h-full w-full object-cover p-0 m-0"
                        />

                        <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-md bg-amber-100/95 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-900 uppercase shadow-2xs">
                          {item.badgeLabel}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-7">
                        <h3 className="text-sm font-extrabold tracking-tight text-ink sm:text-base">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {item.supplier} · SKU {item.sku} · {item.category}
                        </p>

                        {/* Specs & Status Rows */}
                        <dl className="mt-4 space-y-2.5">
                          {item.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="grid grid-cols-[96px_1fr] items-baseline gap-2 border-t border-slate-100 pt-2.5 first:border-t-0 first:pt-0"
                            >
                              <dt className="text-[11px] font-medium text-slate-500">
                                {spec.label}
                              </dt>
                              <dd className="text-xs font-medium text-ink">
                                {spec.value}
                              </dd>
                            </div>
                          ))}

                          <StatusRow
                            label="Safety data"
                            status={item.safetyData}
                            showSheetIcon
                          />
                          <StatusRow
                            label="Certification"
                            status={item.certification}
                          />
                          <StatusRow label="Delivery" status={item.delivery} />
                        </dl>

                        {/* Soft Amber Note Banner */}
                        {item.warningNote && (
                          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3.5 py-2.5 text-[11px] text-amber-950">
                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                            <p className="leading-relaxed">
                              {item.warningNote}
                            </p>
                          </div>
                        )}

                        {/* Price Line */}
                        <div className="mt-5 flex items-baseline justify-between gap-4">
                          <span className="text-[11px] font-medium text-slate-500">
                            {item.priceLabel}
                          </span>
                          <span className="text-sm font-extrabold text-ink sm:text-base">
                            {currencySymbol}
                            {item.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="mt-3">
                          <span className="block text-[11px] font-bold text-ink">
                            {item.unitLabel}
                          </span>

                          <div className="mt-2 inline-flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs">
                            <button
                              type="button"
                              aria-label={`Decrease quantity for ${item.title}`}
                              onClick={() => updateQty(item.id, -1)}
                              className="grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <input
                              type="number"
                              min={1}
                              aria-label={`Quantity for ${item.title}`}
                              value={qty}
                              onChange={(e) => {
                                const parsed = parseInt(e.target.value, 10);
                                setQuantities((prev) => ({
                                  ...prev,
                                  [item.id]:
                                    Number.isFinite(parsed) && parsed >= 1
                                      ? parsed
                                      : 1,
                                }));
                              }}
                              className="w-11 border-0 bg-transparent text-center text-xs font-semibold text-ink focus:outline-hidden [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            <button
                              type="button"
                              aria-label={`Increase quantity for ${item.title}`}
                              onClick={() => updateQty(item.id, 1)}
                              className="grid h-7 w-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {totalItems !== null && item.packMultiplier && (
                            <p className="mt-1.5 text-[11px] text-slate-500">
                              {qty} ×{" "}
                              {item.specs.find((s) => s.label === "Sold as")
                                ?.value ?? "pack"}{" "}
                              = {totalItems.toLocaleString()} items
                            </p>
                          )}
                        </div>

                        {/* Action Row: View details Pill + Compare Checkbox */}
                        <div className="mt-5 flex items-center gap-4">
                          {item.href ? (
                            <a
                              href={item.href}
                              onClick={() => onViewDetails?.(item)}
                              className="rounded-full bg-[#0B1220] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                            >
                              View details
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onViewDetails?.(item)}
                              className="rounded-full bg-[#0B1220] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                            >
                              View details
                            </button>
                          )}

                          <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                handleCompareChange(item.id, e.target.checked)
                              }
                              className="h-3.5 w-3.5 rounded border-slate-300 text-ink focus:ring-ink"
                            />
                            <span>Compare</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Footer Prototype Note */}
                    <div className="px-6 pb-5 pt-0 sm:px-7">
                      <p className="text-[11px] text-slate-400">
                        Ordering isn&apos;t available in this prototype.
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
