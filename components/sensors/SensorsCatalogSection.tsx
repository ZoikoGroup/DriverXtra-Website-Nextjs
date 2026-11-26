"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AlertTriangle, CheckCircle2, ChevronDown, Circle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type SensorSortOption =
  | "relevance"
  | "price-low-high"
  | "price-high-low"
  | "name-az";

export type SensorStatusRow = {
  tone: "ok" | "warn" | "danger" | "muted";
  label: string;
  detail?: string;
  linkLabel?: string;
  linkHref?: string;
};

export type SensorCatalogItem = {
  id: string;
  badgeLabel: string;
  title: string;
  brand: string;
  partNumber: string;
  location: string;
  family: string;
  protocol: string;
  calibrationStatus: string;
  fitment: SensorStatusRow;
  calibration: SensorStatusRow;
  safety: SensorStatusRow;
  offer: SensorStatusRow;
  warningBanner?: string;
  price?: number;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

const DEFAULT_SENSOR_ITEMS: SensorCatalogItem[] = [
  {
    id: "tpms-sensor-433mhz",
    badgeLabel: "EXAMPLE",
    title: "TPMS sensor, 433 MHz",
    brand: "Example Sensors",
    partNumber: "SNS-SN-TP-433",
    location: "Any wheel",
    family: "wheel-chassis",
    protocol: "rf-433",
    calibrationStatus: "may-be-required",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "warn",
      label: "May be required",
      detail: "A sensor ID relearn may be needed after fitting.",
    },
    safety: {
      tone: "muted",
      label: "No special source flag",
    },
    offer: {
      tone: "ok",
      label: "Available",
    },
    price: 39,
    imageSrc: "/Images/sensors/2.png",
    imageAlt: "Dark performance coupe driving along open road at dusk",
  },
  {
    id: "wheel-speed-abs-sensor-front-left",
    badgeLabel: "EXAMPLE",
    title: "Wheel speed (ABS) sensor, front left",
    brand: "Sample Parts",
    partNumber: "SNS-SA-WS-FL",
    location: "Front left",
    family: "wheel-chassis",
    protocol: "can-bus",
    calibrationStatus: "not-indicated",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "muted",
      label: "Not indicated by current evidence",
    },
    safety: {
      tone: "warn",
      label: "Professional service advised",
    },
    offer: {
      tone: "ok",
      label: "Available",
    },
    price: 34,
    imageSrc: "/Images/sensors/3.png",
    imageAlt: "Vehicle parked inside lit workshop bay beside tool cabinets",
  },
  {
    id: "parking-sensor-ultrasonic",
    badgeLabel: "EXAMPLE",
    title: "Parking sensor (ultrasonic)",
    brand: "Example Sensors",
    partNumber: "SNS-SN-PK-UL",
    location: "Rear bumper",
    family: "adas-camera-radar",
    protocol: "lin-bus",
    calibrationStatus: "may-be-required",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "warn",
      label: "May be required",
      detail:
        "Vehicle-specific calibration or coding may be required. Check the approved service instructions.",
    },
    safety: {
      tone: "muted",
      label: "No special source flag",
    },
    offer: {
      tone: "warn",
      label: "Availability and pricing need confirmation",
      detail: "Checked 1 Nov 2026 09:26",
    },
    price: 58,
    imageSrc: "/Images/sensors/4.png",
    imageAlt: "Front view of dark muscle coupe parked outdoors",
  },
  {
    id: "front-radar-sensor-acc",
    badgeLabel: "EXAMPLE",
    title: "Front radar sensor (ACC)",
    brand: "Sample Parts",
    partNumber: "SNS-SA-RD-FR",
    location: "Front grille",
    family: "adas-camera-radar",
    protocol: "can-bus",
    calibrationStatus: "required",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "danger",
      label: "Calibration required",
      detail:
        "Radar or dynamic calibration is needed after fitting. Check the approved service instructions.",
    },
    safety: {
      tone: "warn",
      label: "Professional service advised",
    },
    offer: {
      tone: "ok",
      label: "Available",
    },
    price: 640,
    imageSrc: "/Images/sensors/4.png",
    imageAlt: "Front grille perspective of dark coupe in daylight",
  },
  {
    id: "oxygen-sensor-upstream",
    badgeLabel: "EXAMPLE",
    title: "Oxygen sensor, upstream",
    brand: "Example Sensors",
    partNumber: "SNS-SN-OX-UP",
    location: "Before catalyst",
    family: "powertrain-exhaust",
    protocol: "analog-pwm",
    calibrationStatus: "not-indicated",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "muted",
      label: "Not indicated by current evidence",
    },
    safety: {
      tone: "muted",
      label: "No special source flag",
    },
    offer: {
      tone: "danger",
      label: "Market-restricted",
    },
    warningBanner: "This sensor can't be offered in the selected market.",
    imageSrc: "/Images/sensors/5.png",
    imageAlt: "Light coupe parked inside multi-level automotive storage bay",
  },
  {
    id: "coolant-temperature-sensor",
    badgeLabel: "EXAMPLE",
    title: "Coolant temperature sensor",
    brand: "Sample Parts",
    partNumber: "SNS-SA-CT-01",
    location: "Thermostat housing",
    family: "powertrain-exhaust",
    protocol: "analog-pwm",
    calibrationStatus: "not-indicated",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "muted",
      label: "Not indicated by current evidence",
    },
    safety: {
      tone: "muted",
      label: "No special source flag",
    },
    offer: {
      tone: "ok",
      label: "Available",
    },
    price: 18,
    imageSrc: "/Images/sensors/6.png",
    imageAlt: "Driver hands on steering wheel at sunset",
  },
  {
    id: "battery-temperature-sensor",
    badgeLabel: "EXAMPLE",
    title: "Battery temperature sensor",
    brand: "Example Sensors",
    partNumber: "SNS-SN-BT-HV",
    location: "HV battery pack",
    family: "ev-hv-thermal",
    protocol: "can-bus",
    calibrationStatus: "unknown",
    fitment: {
      tone: "muted",
      label: "Fitment unknown",
      detail: "Choose a vehicle to check fitment.",
      linkLabel: "Fitment help",
      linkHref: "#fitment-help",
    },
    calibration: {
      tone: "muted",
      label: "Unknown",
    },
    safety: {
      tone: "danger",
      label: "Qualified HV handling required",
      detail: "High-voltage systems can require qualified service.",
    },
    offer: {
      tone: "ok",
      label: "Available",
    },
    price: 95,
    imageSrc: "/Images/sensors/7.png",
    imageAlt: "Electric vehicle charging port connected to plug",
  },
];

function SensorStatusValue({ status }: { status: SensorStatusRow }) {
  const textColor =
    status.tone === "ok"
      ? "text-emerald-700"
      : status.tone === "warn"
        ? "text-amber-700"
        : status.tone === "danger"
          ? "text-rose-600"
          : "text-slate-500";

  return (
    <dd className="min-w-0">
      <div
        className={`flex items-center gap-1.5 text-xs font-semibold ${textColor}`}
      >
        {status.tone === "ok" && (
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
        )}
        {(status.tone === "warn" || status.tone === "danger") && (
          <AlertTriangle
            className={`h-3.5 w-3.5 shrink-0 ${
              status.tone === "danger" ? "text-rose-500" : "text-amber-500"
            }`}
          />
        )}
        {status.tone === "muted" && (
          <Circle className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        )}
        <span>{status.label}</span>
      </div>

      {status.detail && (
        <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
          {status.detail}
        </p>
      )}

      {status.linkLabel && (
        <a
          href={status.linkHref ?? "#fitment-help"}
          className="mt-0.5 inline-block text-[11px] font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
        >
          {status.linkLabel}
        </a>
      )}
    </dd>
  );
}

type SensorsCatalogSectionProps = {
  id?: string;
  heading?: ReactNode;
  sortLabel?: string;
  items?: SensorCatalogItem[];
  selectedVehicle?: string;
  selectedMarket?: string;
  searchQuery?: string;
  currencySymbol?: string;
  onViewSensorDetails?: (item: SensorCatalogItem) => void;
  onCompareToggle?: (itemId: string, checked: boolean) => void;
  className?: string;
};

export default function SensorsCatalogSection({
  id = "sensors-catalog",
  heading = "Sensors",
  sortLabel = "Sort",
  items = DEFAULT_SENSOR_ITEMS,
  selectedVehicle = "",
  searchQuery = "",
  currencySymbol = "£",
  onViewSensorDetails,
  onCompareToggle,
  className = "bg-[#F6F8FB]",
}: SensorsCatalogSectionProps) {
  const [familyFilter, setFamilyFilter] = useState<string>("any");
  const [protocolFilter, setProtocolFilter] = useState<string>("any");
  const [calibrationFilter, setCalibrationFilter] = useState<string>("any");
  const [sortBy, setSortBy] = useState<SensorSortOption>("relevance");
  const [comparedIds, setComparedIds] = useState<Record<string, boolean>>({});

  const hasActiveFilters =
    familyFilter !== "any" ||
    protocolFilter !== "any" ||
    calibrationFilter !== "any" ||
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setFamilyFilter("any");
    setProtocolFilter("any");
    setCalibrationFilter("any");
    setSortBy("relevance");
  };

  const filteredAndSortedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesFamily =
        familyFilter === "any" || item.family === familyFilter;
      const matchesProtocol =
        protocolFilter === "any" || item.protocol === protocolFilter;
      const matchesCalibration =
        calibrationFilter === "any" ||
        item.calibrationStatus === calibrationFilter;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.partNumber.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);

      return (
        matchesFamily && matchesProtocol && matchesCalibration && matchesQuery
      );
    });

    const sorted = [...filtered];
    if (sortBy === "price-low-high") {
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sortBy === "price-high-low") {
      sorted.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    } else if (sortBy === "name-az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [
    items,
    familyFilter,
    protocolFilter,
    calibrationFilter,
    searchQuery,
    sortBy,
  ]);

  const handleCompareChange = (itemId: string, checked: boolean) => {
    setComparedIds((prev) => ({ ...prev, [itemId]: checked }));
    onCompareToggle?.(itemId, checked);
  };

  return (
    <section
      id={id}
      className={`scroll-mt-28 pb-20 pt-2 md:pb-24 ${className}`}
    >
      <div className={container}>
        {/* Top Header Row: Title + Count on Left, Sort Dropdown on Right */}
        <Reveal delay={50}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {heading}
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-600">
                {filteredAndSortedItems.length}{" "}
                {filteredAndSortedItems.length === 1 ? "sensor" : "sensors"}
              </p>
            </div>

            <div className="flex flex-col items-start gap-1 self-start sm:self-auto">
              <label
                htmlFor="sensors-sort-select"
                className="text-[11px] font-bold text-slate-700"
              >
                {sortLabel}
              </label>
              <div className="relative">
                <select
                  id="sensors-sort-select"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SensorSortOption)
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

        {/* 12-Column Layout: Left Sidebar (3 cols) + 2-Column Sensor Grid (9 cols) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Filter Sidebar */}
          <aside className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs lg:col-span-3 lg:sticky lg:top-28">
            <h3 className="text-xs font-extrabold text-ink">Filter sensors</h3>

            <div className="mt-4 space-y-4">
              {/* Family Filter */}
              <div>
                <label
                  htmlFor="sensor-family-select"
                  className="block text-[11px] font-bold text-slate-700"
                >
                  Family
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="sensor-family-select"
                    value={familyFilter}
                    onChange={(e) => setFamilyFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-ink focus:border-slate-400 focus:outline-hidden"
                  >
                    <option value="any">Any (7)</option>
                    <option value="wheel-chassis">Wheel &amp; chassis</option>
                    <option value="adas-camera-radar">
                      ADAS, camera &amp; radar
                    </option>
                    <option value="powertrain-exhaust">
                      Powertrain &amp; exhaust
                    </option>
                    <option value="ev-hv-thermal">EV / HV &amp; thermal</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Protocol Filter */}
              <div>
                <label
                  htmlFor="sensor-protocol-select"
                  className="block text-[11px] font-bold text-slate-700"
                >
                  Protocol
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="sensor-protocol-select"
                    value={protocolFilter}
                    onChange={(e) => setProtocolFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-ink focus:border-slate-400 focus:outline-hidden"
                  >
                    <option value="any">Any (7)</option>
                    <option value="can-bus">CAN bus</option>
                    <option value="lin-bus">LIN bus</option>
                    <option value="rf-433">RF 433 MHz</option>
                    <option value="analog-pwm">Analog / PWM</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Calibration / Coding Filter */}
              <div>
                <label
                  htmlFor="sensor-calibration-select"
                  className="block text-[11px] font-bold text-slate-700"
                >
                  Calibration / coding
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="sensor-calibration-select"
                    value={calibrationFilter}
                    onChange={(e) => setCalibrationFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-ink focus:border-slate-400 focus:outline-hidden"
                  >
                    <option value="any">Any (7)</option>
                    <option value="required">Calibration required</option>
                    <option value="may-be-required">May be required</option>
                    <option value="not-indicated">Not indicated</option>
                    <option value="unknown">Unknown</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-slate-400">
              &ldquo;Unknown&rdquo; filters show sensors whose manual
              hasn&apos;t been verified.
            </p>

            <button
              type="button"
              onClick={clearAllFilters}
              disabled={!hasActiveFilters && sortBy === "relevance"}
              className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear all filters
            </button>
          </aside>

          {/* Right 2-Column Sensor Cards Grid */}
          <div className="lg:col-span-9">
            {filteredAndSortedItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-10 text-center">
                <p className="text-sm font-bold text-ink">
                  No sensors match your current filter.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Reset the sidebar filters or search by part number.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredAndSortedItems.map((item, index) => {
                  const isChecked = Boolean(comparedIds[item.id]);
                  const fitmentStatus: SensorStatusRow = selectedVehicle
                    ? {
                        tone: "ok",
                        label: "Check compatibility note",
                        detail:
                          "Verify exact OEM trim & harness before ordering.",
                        linkLabel: "Fitment help",
                        linkHref: item.fitment.linkHref,
                      }
                    : item.fitment;

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
                              sizes="(max-width: 1024px) 100vw, 35vw"
                              className="h-full w-full object-cover p-0 m-0"
                            />

                            <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-md bg-amber-100/95 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-amber-900 uppercase shadow-2xs">
                              {item.badgeLabel}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 sm:p-6">
                            <h3 className="text-sm font-extrabold tracking-tight text-ink">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {item.brand} · {item.partNumber} · {item.location}
                            </p>

                            {/* Key-Value Status Rows */}
                            <dl className="mt-4 space-y-2.5">
                              <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                                <dt className="text-[11px] font-medium text-slate-500">
                                  Fitment
                                </dt>
                                <SensorStatusValue status={fitmentStatus} />
                              </div>

                              <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                                <dt className="text-[11px] font-medium text-slate-500">
                                  Calibration
                                </dt>
                                <SensorStatusValue status={item.calibration} />
                              </div>

                              <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                                <dt className="text-[11px] font-medium text-slate-500">
                                  Safety
                                </dt>
                                <SensorStatusValue status={item.safety} />
                              </div>

                              <div className="grid grid-cols-[84px_1fr] items-start gap-2">
                                <dt className="text-[11px] font-medium text-slate-500">
                                  Offer
                                </dt>
                                <SensorStatusValue status={item.offer} />
                              </div>
                            </dl>

                            {/* Optional Market Restriction Banner */}
                            {item.warningBanner && (
                              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-[11px] font-medium text-amber-950">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                                <span>{item.warningBanner}</span>
                              </div>
                            )}

                            {/* Price Row */}
                            <div className="mt-5 flex items-baseline justify-between gap-4">
                              <span className="text-[11px] font-medium text-slate-500">
                                Price
                              </span>
                              {typeof item.price === "number" ? (
                                <span className="text-sm font-extrabold text-ink">
                                  {currencySymbol}
                                  {item.price.toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-xs font-medium text-slate-400">
                                  —
                                </span>
                              )}
                            </div>

                            {/* Action Row: View sensor details Pill + Compare Checkbox */}
                            <div className="mt-4 flex items-center gap-4">
                              {item.href ? (
                                <a
                                  href={item.href}
                                  onClick={() => onViewSensorDetails?.(item)}
                                  className="rounded-full bg-[#0B1220] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                                >
                                  View sensor details
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => onViewSensorDetails?.(item)}
                                  className="rounded-full bg-[#0B1220] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                                >
                                  View sensor details
                                </button>
                              )}

                              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) =>
                                    handleCompareChange(
                                      item.id,
                                      e.target.checked,
                                    )
                                  }
                                  className="h-3.5 w-3.5 rounded border-slate-300 text-ink focus:ring-ink"
                                />
                                <span>Compare</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
