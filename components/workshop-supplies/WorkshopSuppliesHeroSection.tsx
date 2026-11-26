"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type WorkshopSuppliesHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  searchLabel?: string;
  searchPlaceholder?: string;
  ctaLabel?: string;
  onSearchSubmit?: (query: string) => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function WorkshopSuppliesHeroSection({
  id = "workshop-supplies-hero",
  eyebrow = "PARTS & ACCESSORIES / EV & WORKSHOP",
  title = "Workshop Supplies",
  description = "Find workshop essentials by task, specification and handling requirements.",
  searchLabel = "Search supplies",
  searchPlaceholder = "Search supplies, SKU or workshop task",
  ctaLabel = "Search",
  onSearchSubmit,
  imageSrc = "/images/workshop/1.png",
  imageAlt = "Technician servicing vehicle dashboard electronics with precision tools",
  className = "bg-[#0B1220] text-white",
}: WorkshopSuppliesHeroSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit?.(query.trim());
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Eyebrow, Title, Subtitle & Search Bar (6 cols) */}
          <Reveal delay={50} className="lg:col-span-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#F5B400]" />
                <span className="text-[11px] font-bold tracking-widest text-[#F5B400] uppercase">
                  {eyebrow}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                {title}
              </h1>

              {description && (
                <p className="mt-3 max-w-lg text-xs leading-relaxed text-slate-300/90 sm:text-sm">
                  {description}
                </p>
              )}

              {/* Search Supplies Form */}
              <form onSubmit={handleSubmit} className="mt-7">
                <label
                  htmlFor="workshop-supplies-search"
                  className="mb-2 block text-xs font-bold text-white"
                >
                  {searchLabel}
                </label>

                <div className="flex items-center gap-2.5">
                  <input
                    id="workshop-supplies-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-ink placeholder-slate-400 shadow-xs transition-all focus:border-[#F5B400] focus:outline-hidden sm:text-sm"
                  />

                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-[#F5B400] px-6 py-3 text-xs font-extrabold text-ink shadow-xs transition-all hover:bg-[#e0a400] sm:text-sm"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Right Column: Edge-to-Edge Zero-Padding Workshop Visual (6 cols) */}
          <Reveal direction="zoom" delay={120} className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 p-0 m-0 shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover p-0 m-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
