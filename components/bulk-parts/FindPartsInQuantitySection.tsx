"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type BulkAvailabilityTone = "indicative" | "unknown";

export type BulkPartRowItem = {
  id: string;
  sku: string;
  partName: string;
  brandSubtitle: string;
  fitmentHref?: string;
  sellerName: string;
  sellerStatusHref?: string;
  packLabel: string;
  moqLabel: string;
  minUnits: number;
  priceNote: string;
  availabilityTone: BulkAvailabilityTone;
  availabilityLabel: string;
  availabilitySubtext?: string;
  markets: string[];
};

const DEFAULT_BULK_PARTS: BulkPartRowItem[] = [
  {
    id: "bulk-ws-bc-500",
    sku: "WS-BC-500",
    partName: "Brake cleaner aerosol, 500 ml",
    brandSubtitle: "Sample Chemicals",
    sellerName: "Example Motor Parts",
    sellerStatusHref: "#seller-example-motor-parts",
    packLabel: "Pack of 12",
    moqLabel: "Min. 24 units",
    minUnits: 24,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "indicative",
    availabilityLabel: "Indicative",
    availabilitySubtext: "Not reserved",
    markets: ["uk", "us", "eu"],
  },
  {
    id: "bulk-ws-gl-nit",
    sku: "WS-GL-NIT",
    partName: "Nitrile gloves, box of 100",
    brandSubtitle: "Example Safety",
    sellerName: "Example Motor Parts",
    sellerStatusHref: "#seller-example-motor-parts",
    packLabel: "Pack of 10",
    moqLabel: "Min. 20 units",
    minUnits: 20,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "indicative",
    availabilityLabel: "Indicative",
    availabilitySubtext: "Not reserved",
    markets: ["uk", "us", "eu"],
  },
  {
    id: "bulk-dx-of-114",
    sku: "DX-OF-114",
    partName: "Oil filter",
    brandSubtitle: "Example Filters",
    fitmentHref: "#check-fitment-dx-of-114",
    sellerName: "Northside OEM",
    sellerStatusHref: "#seller-northside-oem",
    packLabel: "Pack of 20",
    moqLabel: "Min. 40 units",
    minUnits: 40,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "indicative",
    availabilityLabel: "Indicative",
    availabilitySubtext: "Not reserved",
    markets: ["uk", "eu"],
  },
  {
    id: "bulk-sn-ct-01",
    sku: "SN-CT-01",
    partName: "Coolant temperature sensor",
    brandSubtitle: "Sample Parts",
    fitmentHref: "#check-fitment-sn-ct-01",
    sellerName: "Sample Auto Spares",
    sellerStatusHref: "#seller-sample-auto-spares",
    packLabel: "Pack of 5",
    moqLabel: "Min. 10 units",
    minUnits: 10,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "unknown",
    availabilityLabel: "Unknown",
    markets: ["uk", "us"],
  },
  {
    id: "bulk-dx-brk-312",
    sku: "DX-BRK-312",
    partName: "Front brake disc pair, 312 mm",
    brandSubtitle: "Example Brakes",
    fitmentHref: "#check-fitment-dx-brk-312",
    sellerName: "Northside OEM",
    sellerStatusHref: "#seller-northside-oem",
    packLabel: "Pack of 2",
    moqLabel: "Min. 4 units",
    minUnits: 4,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "indicative",
    availabilityLabel: "Indicative",
    availabilitySubtext: "Not reserved",
    markets: ["uk", "eu"],
  },
  {
    id: "bulk-ws-rg-roll",
    sku: "WS-RG-ROLL",
    partName: "Workshop paper roll, pack of 6",
    brandSubtitle: "Example Supplies",
    sellerName: "Example Motor Parts",
    sellerStatusHref: "#seller-example-motor-parts",
    packLabel: "Pack of 1",
    moqLabel: "Min. 5 units",
    minUnits: 5,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "indicative",
    availabilityLabel: "Indicative",
    availabilitySubtext: "Not reserved",
    markets: ["uk", "us", "eu"],
  },
  {
    id: "bulk-sn-o2-up",
    sku: "SN-O2-UP",
    partName: "Oxygen sensor, upstream",
    brandSubtitle: "Example Sensors",
    sellerName: "Sample Auto Spares",
    sellerStatusHref: "#seller-sample-auto-spares",
    packLabel: "Pack of 4",
    moqLabel: "Min. 8 units",
    minUnits: 8,
    priceNote: "Sign in to see business pricing",
    availabilityTone: "unknown",
    availabilityLabel: "Unknown",
    markets: ["uk", "us"],
  },
];

type FindPartsInQuantitySectionProps = {
  id?: string;
  heading?: ReactNode;
  marketLabel?: string;
  marketHelperText?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  skuPasteTitle?: string;
  skuPasteSubtitle?: string;
  items?: BulkPartRowItem[];
  onApplySkuList?: (rawLines: string) => void;
  className?: string;
};

export default function FindPartsInQuantitySection({
  id = "find-parts-in-quantity",
  heading = "Find parts in quantity",
  marketLabel = "Ship-to market",
  marketHelperText = "Required before any business price or availability is shown.",
  searchLabel = "Search by keyword, SKU or OEM reference",
  searchPlaceholder = "",
  skuPasteTitle = "Paste a list of SKUs",
  skuPasteSubtitle = 'One per line — "SKU, quantity"',
  items = DEFAULT_BULK_PARTS,
  onApplySkuList,
  className = "bg-white",
}: FindPartsInQuantitySectionProps) {
  const [shipToMarket, setShipToMarket] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedQuery, setAppliedQuery] = useState<string>("");
  const [skuBoxOpen, setSkuBoxOpen] = useState<boolean>(false);
  const [skuText, setSkuText] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const marketSelected = shipToMarket !== "";

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedQuery(searchInput.trim());
  };

  const filteredItems = useMemo(() => {
    const q = appliedQuery.toLowerCase();

    return items.filter((item) => {
      const matchesMarket =
        !shipToMarket || item.markets.includes(shipToMarket);

      const matchesQuery =
        !q ||
        item.sku.toLowerCase().includes(q) ||
        item.partName.toLowerCase().includes(q) ||
        item.brandSubtitle.toLowerCase().includes(q) ||
        item.sellerName.toLowerCase().includes(q);

      return matchesMarket && matchesQuery;
    });
  }, [items, shipToMarket, appliedQuery]);

  const handleQuantityStep = (item: BulkPartRowItem, delta: number) => {
    setQuantities((prev) => {
      const current = prev[item.id] ?? item.minUnits;
      const next = Math.max(item.minUnits, current + delta);
      return { ...prev, [item.id]: next };
    });
  };

  const handleSkuApply = () => {
    onApplySkuList?.(skuText);
    const firstToken = skuText
      .split(/\r?\n/)
      .map((line) => line.split(",")[0]?.trim())
      .find(Boolean);
    if (firstToken) {
      setSearchInput(firstToken);
      setAppliedQuery(firstToken);
    }
  };

  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-20 ${className}`}>
      <div className={container}>
        {/* Section Heading */}
        <Reveal delay={40}>
          <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            {heading}
          </h2>
        </Reveal>

        {/* Top Filter Row: Ship-to Market + Keyword/SKU Search */}
        <Reveal delay={70}>
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 grid gap-4 md:grid-cols-12 md:items-start"
          >
            <div className="md:col-span-4">
              <label
                htmlFor="bulk-ship-to-market"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                {marketLabel}
              </label>

              <div className="relative">
                <select
                  id="bulk-ship-to-market"
                  value={shipToMarket}
                  onChange={(e) => setShipToMarket(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-xs font-medium text-ink shadow-2xs transition-colors focus:border-slate-400 focus:outline-hidden"
                >
                  <option value="">Choose a market</option>
                  <option value="uk">United Kingdom</option>
                  <option value="us">United States</option>
                  <option value="eu">European Union</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>

              {marketHelperText && (
                <p className="mt-1.5 text-[10px] text-slate-400">
                  {marketHelperText}
                </p>
              )}
            </div>

            <div className="md:col-span-8">
              <label
                htmlFor="bulk-keyword-sku-search"
                className="mb-1.5 block text-[11px] font-bold text-ink"
              >
                {searchLabel}
              </label>

              <div className="flex items-center gap-2.5">
                <input
                  id="bulk-keyword-sku-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInput(val);
                    if (val.trim() === "") {
                      setAppliedQuery("");
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-ink shadow-2xs transition-colors focus:border-slate-400 focus:outline-hidden"
                />

                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[#0B1220] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </Reveal>

        {/* Collapsible "Paste a list of SKUs" Bar */}
        <Reveal delay={100}>
          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => setSkuBoxOpen((prev) => !prev)}
              aria-expanded={skuBoxOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
            >
              <div>
                <div className="text-xs font-bold text-ink">
                  {skuPasteTitle}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  {skuPasteSubtitle}
                </div>
              </div>

              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                <Plus
                  className={`h-3.5 w-3.5 transition-transform ${
                    skuBoxOpen ? "rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            {skuBoxOpen && (
              <div className="border-t border-slate-100 px-5 pb-4 pt-3">
                <textarea
                  rows={4}
                  value={skuText}
                  onChange={(e) => setSkuText(e.target.value)}
                  placeholder={"WS-BC-500, 24\nDX-OF-114, 40"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 p-3 font-mono text-xs text-ink focus:border-slate-400 focus:bg-white focus:outline-hidden"
                />
                <div className="mt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSkuText("");
                      setAppliedQuery("");
                      setSearchInput("");
                    }}
                    className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleSkuApply}
                    className="rounded-full bg-[#0B1220] px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    Filter by SKUs
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Count & Prototype Disclaimer */}
        <div className="mt-6">
          <p className="text-xs font-medium text-slate-600">
            <strong className="font-extrabold text-ink">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "part" : "parts"}
            </strong>{" "}
            · <span className="text-slate-400">not a live stock list</span>
          </p>
        </div>

        {/* Bulk Parts Table */}
        <Reveal delay={130}>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-600">
                  <th scope="col" className="py-3 pr-4 font-bold">
                    SKU
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    Part
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    Seller
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    Pack · MOQ
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    Price
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold">
                    Availability
                  </th>
                  <th scope="col" className="py-3 font-bold">
                    Quantity
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/80 border-b border-slate-200/80 text-xs">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-xs text-slate-500"
                    >
                      No bulk parts match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const currentQty = quantities[item.id] ?? null;

                    return (
                      <tr
                        key={item.id}
                        className="align-top transition-colors hover:bg-slate-50/40"
                      >
                        {/* SKU */}
                        <td className="py-3.5 pr-4 font-medium text-slate-700 whitespace-nowrap">
                          {item.sku}
                        </td>

                        {/* Part + Brand + Optional Check fitment */}
                        <td className="py-3.5 pr-4">
                          <div className="font-semibold text-ink">
                            {item.partName}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {item.brandSubtitle}
                            {item.fitmentHref && (
                              <>
                                {" · "}
                                <a
                                  href={item.fitmentHref}
                                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                                >
                                  Check fitment
                                </a>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Seller + Seller status */}
                        <td className="py-3.5 pr-4">
                          <div className="font-medium text-slate-700">
                            {item.sellerName}
                          </div>
                          <a
                            href={item.sellerStatusHref ?? "#seller-status"}
                            className="mt-0.5 inline-block text-[11px] font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                          >
                            Seller status
                          </a>
                        </td>

                        {/* Pack · MOQ */}
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          <div className="font-medium text-slate-700">
                            {item.packLabel}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {item.moqLabel}
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 pr-4 text-[11px] leading-snug text-slate-400">
                          {marketSelected ? item.priceNote : item.priceNote}
                        </td>

                        {/* Availability */}
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          {item.availabilityTone === "indicative" ? (
                            <div className="inline-flex items-center gap-1.5 font-semibold text-amber-800">
                              <span
                                aria-hidden="true"
                                className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"
                              />
                              <span>{item.availabilityLabel}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 font-medium text-slate-500">
                              <span
                                aria-hidden="true"
                                className="inline-block h-1.5 w-1.5 rounded-full border border-slate-400"
                              />
                              <span>{item.availabilityLabel}</span>
                            </div>
                          )}

                          {item.availabilitySubtext && (
                            <div className="mt-0.5 text-[11px] text-slate-400">
                              {item.availabilitySubtext}
                            </div>
                          )}
                        </td>

                        {/* Quantity */}
                        <td className="py-3.5 whitespace-nowrap">
                          {currentQty === null ? (
                            <button
                              type="button"
                              onClick={() =>
                                setQuantities((prev) => ({
                                  ...prev,
                                  [item.id]: item.minUnits,
                                }))
                              }
                              title={`Set quantity (min ${item.minUnits})`}
                              className="text-xs font-medium text-slate-400 transition-colors hover:text-ink"
                            >
                              —
                            </button>
                          ) : (
                            <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                              <button
                                type="button"
                                aria-label={`Decrease quantity for ${item.sku}`}
                                onClick={() => handleQuantityStep(item, -1)}
                                className="grid h-6 w-6 place-items-center text-slate-500 hover:text-ink"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-[11px] font-semibold text-ink">
                                {currentQty}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity for ${item.sku}`}
                                onClick={() => handleQuantityStep(item, 1)}
                                className="grid h-6 w-6 place-items-center text-slate-500 hover:text-ink"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11px] text-slate-400">
            Scroll sideways to see all columns on small screens.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
