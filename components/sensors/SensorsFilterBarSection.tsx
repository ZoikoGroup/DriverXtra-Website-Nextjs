"use client";

import { useState, type ReactNode } from "react";
import { CarFront, ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export type SensorVehicleOption = {
  value: string;
  label: string;
};

export type SensorMarketOption = {
  value: string;
  label: string;
};

const DEFAULT_VEHICLE_OPTIONS: SensorVehicleOption[] = [
  { value: "", label: "Choose a vehicle" },
  {
    value: "volkswagen-id3-2023",
    label: "2023 Volkswagen ID.3 Pro Performance",
  },
  { value: "tesla-model3-2022", label: "2022 Tesla Model 3 Long Range" },
  { value: "ford-puma-2021", label: "2021 Ford Puma 1.0 EcoBoost Hybrid" },
  { value: "bmw-320d-2020", label: "2020 BMW 320d M Sport" },
  { value: "hyundai-ioniq5-2024", label: "2024 Hyundai IONIQ 5 77.4 kWh" },
];

const DEFAULT_MARKET_OPTIONS: SensorMarketOption[] = [
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "eu", label: "European Union" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

type SensorsFilterBarSectionProps = {
  id?: string;
  emptyVehicleTitle?: string;
  emptyVehicleSubtitle?: string;
  selectedVehicleLabel?: (vehicleLabel: string) => string;
  selectedVehicleSubtitle?: string;
  vehicleSelectLabel?: ReactNode;
  garageLinkLabel?: string;
  onUseMyGarage?: () => void;
  marketLabel?: ReactNode;
  marketHelperText?: ReactNode;
  vehicleOptions?: SensorVehicleOption[];
  marketOptions?: SensorMarketOption[];
  selectedVehicle?: string;
  selectedMarket?: string;
  onVehicleChange?: (vehicleValue: string) => void;
  onMarketChange?: (marketValue: string) => void;
  className?: string;
};

export default function SensorsFilterBarSection({
  id = "sensors-filter-bar",
  emptyVehicleTitle = "No vehicle selected",
  emptyVehicleSubtitle = "Results aren't filtered by vehicle",
  selectedVehicleLabel = (label) => `Selected: ${label}`,
  selectedVehicleSubtitle = "Filtering compatibility notes by selected vehicle",
  vehicleSelectLabel = "Choose a vehicle",
  garageLinkLabel = "Use My Garage",
  onUseMyGarage,
  marketLabel = "Market",
  marketHelperText = "Prices and availability are shown only for a chosen market.",
  vehicleOptions = DEFAULT_VEHICLE_OPTIONS,
  marketOptions = DEFAULT_MARKET_OPTIONS,
  selectedVehicle: controlledVehicle,
  selectedMarket: controlledMarket,
  onVehicleChange,
  onMarketChange,
  className = "bg-white",
}: SensorsFilterBarSectionProps) {
  const [internalVehicle, setInternalVehicle] = useState<string>("");
  const [internalMarket, setInternalMarket] = useState<string>("uk");

  const currentVehicle = controlledVehicle ?? internalVehicle;
  const currentMarket = controlledMarket ?? internalMarket;

  const activeVehicleObj = vehicleOptions.find(
    (opt) => opt.value === currentVehicle && opt.value !== "",
  );

  const handleVehicleSelect = (value: string) => {
    setInternalVehicle(value);
    onVehicleChange?.(value);
  };

  const handleMarketSelect = (value: string) => {
    setInternalMarket(value);
    onMarketChange?.(value);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-12 md:py-16 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Card: Vehicle Selector & Status Banner */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50/90 px-4 py-3.5">
                <CarFront className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 stroke-[2.2]" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-ink sm:text-sm">
                    {activeVehicleObj
                      ? selectedVehicleLabel(activeVehicleObj.label)
                      : emptyVehicleTitle}
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                    {activeVehicleObj
                      ? selectedVehicleSubtitle
                      : emptyVehicleSubtitle}
                  </p>
                </div>
              </div>

              <label
                htmlFor="sensors-vehicle-select"
                className="mt-5 block text-xs font-bold text-ink sm:text-sm"
              >
                {vehicleSelectLabel}
              </label>

              <div className="relative mt-2.5">
                <select
                  id="sensors-vehicle-select"
                  value={currentVehicle}
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                >
                  {vehicleOptions.map((option) => (
                    <option key={option.value || "empty"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>

              <div className="mt-3.5">
                {onUseMyGarage ? (
                  <button
                    type="button"
                    onClick={onUseMyGarage}
                    className="text-xs font-semibold text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700"
                  >
                    {garageLinkLabel}
                  </button>
                ) : (
                  <a
                    href="#my-garage"
                    className="text-xs font-semibold text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-700"
                  >
                    {garageLinkLabel}
                  </a>
                )}
              </div>
            </div>

            {/* Right Card: Market Selector */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
              <div>
                <label
                  htmlFor="sensors-market-select"
                  className="block text-xs font-bold text-ink sm:text-sm"
                >
                  {marketLabel}
                </label>

                <div className="relative mt-3">
                  <select
                    id="sensors-market-select"
                    value={currentMarket}
                    onChange={(e) => handleMarketSelect(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200/90 bg-white py-3.5 pl-4 pr-10 text-xs font-medium text-ink shadow-2xs transition-all focus:border-slate-400 focus:outline-hidden sm:text-sm"
                  >
                    {marketOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>

                {marketHelperText && (
                  <p className="mt-4 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                    {marketHelperText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
