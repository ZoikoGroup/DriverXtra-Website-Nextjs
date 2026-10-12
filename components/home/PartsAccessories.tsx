"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Disc3,
  Heart,
  Info,
  MessageSquare,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Wrench,
  Zap,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type Product = {
  id: number;
  name: string;
  sku: string;
  price: string;
  delivery: string;
  seller: string;
  warranty: string;
  condition: "New" | "Refurbished";
  image: string;
  category: string;
};

const categories = [
  { name: "Brakes & Suspension", icon: Disc3 },
  { name: "Engine & Powertrain", icon: Wrench },
  { name: "Exhaust & Emissions", icon: SlidersHorizontal },
  { name: "Tires & Wheels", icon: Disc3 },
  { name: "Interior", icon: Wrench },
  { name: "Exterior", icon: Disc3 },
  { name: "Electronics & Sensors", icon: Zap },
  { name: "EV Components & Chargers", icon: Zap },
  { name: "Tools & Workshop", icon: Wrench },
  { name: "Fluids & Consumables", icon: Info },
];

const products: Product[] = [
  {
    id: 1,
    name: "Brembo Front brake pad set",
    sku: "P 06 102",
    price: "$69.98",
    delivery: "delivered (incl. £4.99 delivery) · 2–3 days",
    seller: "Parts Seller Verified",
    warranty: "2-year warranty · 30-day returns",
    condition: "New",
    image: "/images/home/i-disc.png",
    category: "Brakes & Suspension",
  },
  {
    id: 2,
    name: "BMW OEM Genuine oil filter element",
    sku: "11 42 8 575 211",
    price: "$21.89",
    delivery: "delivered (incl. £3.49 delivery) · 1–2 days",
    seller: "OEM Partner",
    warranty: "Manufacturer warranty · 30-day returns",
    condition: "New",
    image: "/images/home/i-engine.png",
    category: "Engine & Powertrain",
  },
  {
    id: 3,
    name: "Michelin Pilot Sport 5 tyre 225/45 R18 95Y",
    sku: "MPN 112334",
    price: "$142.00",
    delivery: "delivered, free delivery · 3–4 days",
    seller: "Certified Partner",
    warranty: "Manufacturer warranty · 14-day returns, unfitted",
    condition: "New",
    image: "/images/home/i-gauge.png",
    category: "Tires & Wheels",
  },
  {
    id: 4,
    name: "Ohme Home Pro 7.4 kW Type 2 charger",
    sku: "OHM-HP-74",
    price: "$799.00",
    delivery: "delivered, free delivery · 5–7 days",
    seller: "Certified Partner",
    warranty: "3-year warranty · 30-day returns, uninstalled",
    condition: "New",
    image: "/images/home/i-plug.png",
    category: "EV Components & Chargers",
  },
  {
    id: 5,
    name: "Bosch Aerotwin wiper blade set A863S",
    sku: "3 397 007 863",
    price: "$30.49",
    delivery: "delivered (incl. £2.99 delivery) · 1–2 days",
    seller: "Parts Seller Verified",
    warranty: "1-year warranty · 30-day returns",
    condition: "New",
    image: "/images/home/i-mirror.png",
    category: "Exterior",
  },
  {
    id: 6,
    name: "Valeo Remanufactured alternator 150A",
    sku: "440677",
    price: "$195.99",
    delivery: "delivered (incl. £6.99 delivery) · 3–5 days",
    seller: "Certified Refurbisher",
    warranty: "12-month warranty · 30-day returns, core exchange",
    condition: "Refurbished",
    image: "/images/home/i-cpu.png",
    category: "Engine & Powertrain",
  },
];

const vehicleTabs = ["Make & model", "Enter VIN", "Use saved vehicle"];

export default function PartsAccessories() {
  const [activeVehicleTab, setActiveVehicleTab] = useState("Make & model");
  const [activeCategory, setActiveCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2026");
  const [vin, setVin] = useState("");
  const [savedVehicle, setSavedVehicle] = useState("");
  const [vehicleMessage, setVehicleMessage] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        !activeCategory || product.category === activeCategory;

      const matchesSearch =
        !search.trim() ||
        `${product.name} ${product.sku} ${product.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleCart(id: number) {
    setCart((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function selectVehicle() {
    if (activeVehicleTab === "Make & model") {
      if (!make || !model || !year) {
        setVehicleMessage("Please select your make, model and year.");
        return;
      }

      setVehicleMessage(
        `Selected vehicle: ${year} ${make} ${model}. Connect your fitment service to verify compatibility.`
      );
      return;
    }

    if (activeVehicleTab === "Enter VIN") {
      if (vin.trim().length < 5) {
        setVehicleMessage("Please enter a valid VIN.");
        return;
      }

      setVehicleMessage(
        "VIN entered. Connect your vehicle lookup service to verify fitment."
      );
      return;
    }

    if (!savedVehicle) {
      setVehicleMessage("Please select a saved vehicle.");
      return;
    }

    setVehicleMessage(
      `Selected saved vehicle: ${savedVehicle}. Connect your fitment service to verify compatibility.`
    );
  }

  return (
    <section
      id="parts-accessories"
      className="w-full overflow-hidden bg-[#F5F7FA] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section heading */}
        <Reveal>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div className="max-w-[720px]">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-0.5 w-5 rounded-full bg-[#FFB900]" />
                <span className="text-sm font-bold leading-5 text-[#F0A500]">
                  Parts &amp; accessories
                </span>
              </div>

              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[#171F32] sm:text-3xl lg:text-4xl">
                Parts that fit. Before you buy.
              </h2>

              <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#71809A] sm:text-base">
                Shop OEM, aftermarket, refurbished and performance parts with
                vehicle compatibility, trusted sellers, warranties and clear
                returns.
              </p>
            </div>

            <a
              href="#parts-products"
              className="group inline-flex w-fit shrink-0 items-center gap-1 border-b-2 border-[#FFB900] pb-1 text-sm font-semibold text-[#101828] transition-colors duration-300 hover:text-[#C58B00]"
            >
              Browse Parts
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>

        {/* Vehicle selector */}
        <Reveal delay={100}>
          <div className="group/vehicle mb-5 rounded-2xl bg-[#0B1220] p-4 text-white shadow-sm transition-all duration-500 hover:shadow-[0_18px_40px_rgba(11,18,32,0.18)] sm:p-5 lg:flex lg:items-center lg:justify-between lg:gap-6">
            <div className="mb-4 flex items-center gap-3 lg:mb-0 lg:min-w-[260px]">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FFB900] text-[#0B1220] transition-all duration-500 group-hover/vehicle:rotate-[-6deg] group-hover/vehicle:scale-110">
                <Wrench size={21} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="text-sm font-bold">Select your vehicle</h3>
                <p className="mt-1 text-xs leading-5 text-[#A8B2C5]">
                  We&apos;ll check every part against it before you buy.
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap gap-1.5 lg:justify-end">
                {vehicleTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveVehicleTab(tab);
                      setVehicleMessage("");
                    }}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      activeVehicleTab === tab
                        ? "border-[#FFB900] bg-[#FFB900] text-[#0B1220]"
                        : "border-white/15 bg-white/5 text-white hover:border-[#FFB900]/70 hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:justify-end">
                {activeVehicleTab === "Make & model" && (
                  <>
                    <div className="relative min-w-0 lg:w-[150px]">
                      <select
                        aria-label="Vehicle make"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#D8E0EB] bg-white px-3 pr-9 text-sm text-[#171F32] outline-none transition focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        <option value="">Make</option>
                        <option value="BMW">BMW</option>
                        <option value="Audi">Audi</option>
                        <option value="Ford">Ford</option>
                        <option value="Honda">Honda</option>
                        <option value="Kia">Kia</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Tesla">Tesla</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Volvo">Volvo</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71809A]"
                      />
                    </div>

                    <div className="relative min-w-0 lg:w-[150px]">
                      <select
                        aria-label="Vehicle model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#D8E0EB] bg-white px-3 pr-9 text-sm text-[#171F32] outline-none transition focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        <option value="">Model</option>
                        <option value="3 Series">3 Series</option>
                        <option value="5 Series">5 Series</option>
                        <option value="C-Class">C-Class</option>
                        <option value="Model 3">Model 3</option>
                        <option value="RAV4">RAV4</option>
                        <option value="X3">X3</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71809A]"
                      />
                    </div>

                    <div className="relative min-w-0 lg:w-[105px]">
                      <select
                        aria-label="Vehicle year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#D8E0EB] bg-white px-3 pr-9 text-sm text-[#171F32] outline-none transition focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20"
                      >
                        {Array.from({ length: 30 }, (_, i) => 2026 - i).map(
                          (value) => (
                            <option key={value} value={String(value)}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71809A]"
                      />
                    </div>
                  </>
                )}

                {activeVehicleTab === "Enter VIN" && (
                  <input
                    aria-label="Vehicle VIN"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder="Enter VIN"
                    className="h-11 min-w-0 rounded-lg border border-[#D8E0EB] bg-white px-3 text-sm text-[#171F32] outline-none placeholder:text-[#91A0B8] focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20 sm:col-span-2 lg:w-[350px]"
                  />
                )}

                {activeVehicleTab === "Use saved vehicle" && (
                  <select
                    aria-label="Saved vehicle"
                    value={savedVehicle}
                    onChange={(e) => setSavedVehicle(e.target.value)}
                    className="h-11 min-w-0 rounded-lg border border-[#D8E0EB] bg-white px-3 text-sm text-[#171F32] outline-none focus:border-[#FFB900] sm:col-span-2 lg:w-[300px]"
                  >
                    <option value="">Choose saved vehicle</option>
                    <option value="My BMW X3">My BMW X3</option>
                    <option value="My Toyota RAV4">My Toyota RAV4</option>
                  </select>
                )}

                <button
                  type="button"
                  onClick={selectVehicle}
                  className="group/select inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFB900] px-5 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD04D] hover:shadow-[0_6px_20px_rgba(255,185,0,0.18)] active:translate-y-0"
                >
                  Select My Vehicle
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover/select:translate-x-1"
                  />
                </button>
              </div>

              {vehicleMessage && (
                <p
                  role="status"
                  className="mt-3 text-xs leading-5 text-[#FFD04D]"
                >
                  {vehicleMessage}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Parts categories */}
        <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ name, icon: Icon }, i) => {
            const active = activeCategory === name;

            return (
              <Reveal key={name} delay={(i % 5) * 70}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(active ? "" : name)}
                  aria-pressed={active}
                  className={`group flex min-h-12 w-full items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-all duration-500 sm:text-sm ${
                    active
                      ? "border-[#FFB900] bg-[#FFF7DE] text-[#111827] shadow-sm"
                      : "border-[#DCE3ED] bg-white text-[#273247] hover:-translate-y-1 hover:border-[#FFB900] hover:shadow-[0_12px_24px_rgba(11,18,32,0.10)]"
                  }`}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className={`shrink-0 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-125 ${
                      active ? "text-[#D99600]" : "text-[#E9A100]"
                    }`}
                  />
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {name}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Products toolbar */}
        <Reveal delay={100}>
          <div
            id="parts-products"
            className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[#171F32]">
                {activeCategory || "Featured parts"}
              </h3>
              <p className="mt-1 text-xs text-[#71809A]">
                {visibleProducts.length} products shown
              </p>
            </div>

            <label className="group/search relative block w-full sm:max-w-[310px]">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#71809A] transition-colors duration-300 group-focus-within/search:text-[#C58B00]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search parts..."
                className="h-11 w-full rounded-xl border border-[#DCE3ED] bg-white pl-10 pr-3 text-sm text-[#171F32] outline-none transition-all duration-300 focus:border-[#FFB900] focus:ring-2 focus:ring-[#FFB900]/20"
              />
            </label>
          </div>
        </Reveal>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product, index) => {
            const isFavorite = favorites.includes(product.id);
            const inCart = cart.includes(product.id);

            return (
              <Reveal key={product.id} delay={(index % 3) * 100}>
                <article className="group relative flex h-full min-w-0 overflow-hidden rounded-2xl border border-[#DCE3ED] bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#FFB900]/70 hover:shadow-[0_24px_48px_-16px_rgba(11,18,32,0.18)]">
                  {/* Product illustration */}
                  <div className="relative flex w-[94px] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#F2F5F9] to-[#E4EAF2] transition-colors duration-500 group-hover:from-[#FFF8E5] group-hover:to-[#FCECC0] sm:w-[100px] md:w-[112px]">
                    <span className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-[#FFB900] bg-white transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(255,185,0,0.22)] sm:size-14 md:size-[72px]">
                      <Image
                        src={product.image}
                        alt=""
                        aria-hidden="true"
                        width={48}
                        height={48}
                        className="h-7 w-7 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10"
                      />
                    </span>

                    <span
                      className={`absolute left-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        product.condition === "Refurbished"
                          ? "border-[#F5D78B] bg-[#FFF4D6] text-[#916000]"
                          : "border-[#DCE3ED] bg-white/90 text-[#71809A]"
                      }`}
                    >
                      {product.condition}
                    </span>
                  </div>

                  {/* Product information */}
                  <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-3.5">
                    <h4 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#171F32] transition-colors duration-300 group-hover:text-[#B98200]">
                      {product.name}
                    </h4>

                    <p className="mt-0.5 truncate text-[10px] text-[#71809A]">
                      SKU/MPN {product.sku}
                    </p>

                    <div className="mt-2 flex min-h-10 items-start gap-1.5 rounded-lg border border-[#DFE6F0] bg-[#F6F8FB] px-2 py-2 transition-all duration-300 group-hover:border-[#FFB900]/50 group-hover:bg-[#FFFDF6]">
                      <Info
                        size={13}
                        className="mt-0.5 shrink-0 text-[#71809A]"
                      />
                      <span className="text-[10px] font-semibold leading-3.5 text-[#71809A]">
                        Select your vehicle to check fitment
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-extrabold leading-6 tracking-tight text-[#171F32]">
                      {product.price}
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-[#71809A]">
                      {product.delivery}
                    </p>

                    <div className="mt-2 flex items-start gap-1 text-[10px] leading-4 text-[#71809A]">
                      <ShieldCheck
                        size={12}
                        className="mt-0.5 shrink-0 text-[#71809A]"
                      />
                      <span>{product.seller}</span>
                    </div>

                    <p className="mt-0.5 text-[10px] leading-4 text-[#71809A]">
                      {product.warranty}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
                      <button
                        type="button"
                        onClick={() => toggleCart(product.id)}
                        aria-pressed={inCart}
                        className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:px-3 ${
                          inCart
                            ? "bg-[#17865C] text-white hover:bg-[#126D4A]"
                            : "bg-[#FFB900] text-[#0B1220] hover:bg-[#FFD04D] hover:shadow-[0_6px_20px_rgba(255,185,0,0.25)]"
                        }`}
                      >
                        {inCart ? (
                          <Check size={14} />
                        ) : (
                          <ShoppingCart size={14} />
                        )}
                        <span>{inCart ? "Added" : "Add to Cart"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        aria-pressed={isFavorite}
                        className={`group/favorite flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
                          isFavorite
                            ? "border-red-200 bg-red-50 text-red-500"
                            : "border-[#DCE3ED] bg-white text-[#526078] hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={15}
                          fill={isFavorite ? "currentColor" : "none"}
                          className="transition-transform duration-300 group-hover/favorite:scale-125"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Contact support about ${product.name}. Connect your messaging service to enable product enquiries.`
                          )
                        }
                        aria-label={`Ask about ${product.name}`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE3ED] bg-white text-[#526078] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFB900] hover:bg-[#FFF8E5] hover:text-[#B98200]"
                      >
                        <MessageSquare
                          size={15}
                          className="transition-transform duration-300 hover:scale-110"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Empty state */}
        {visibleProducts.length === 0 && (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-[#C9D4E3] bg-white px-5 py-12 text-center">
              <Search size={28} className="mx-auto text-[#9AA8BC]" />
              <h3 className="mt-3 font-bold text-[#171F32]">
                No matching parts found
              </h3>
              <p className="mt-1 text-sm text-[#71809A]">
                Try a different search or clear the selected category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("");
                }}
                className="mt-4 rounded-full bg-[#FFB900] px-5 py-2.5 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD04D] hover:shadow-md"
              >
                Clear filters
              </button>
            </div>
          </Reveal>
        )}

        {/* Footer */}
        <Reveal delay={100}>
          <div className="mt-6 flex flex-col gap-3 text-xs text-[#71809A] sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 leading-5">
              <Info size={14} className="mt-0.5 shrink-0" />
              Example products. Fitment states come from the fitment service in
              production.
            </p>

            <a
              href="#parts-products"
              onClick={() => {
                setActiveCategory("");
                setSearch("");
              }}
              className="group inline-flex w-fit shrink-0 items-center gap-1 border-b-2 border-[#FFB900] pb-1 font-bold text-[#171F32] transition-colors duration-300 hover:text-[#B98200]"
            >
              View all parts
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}