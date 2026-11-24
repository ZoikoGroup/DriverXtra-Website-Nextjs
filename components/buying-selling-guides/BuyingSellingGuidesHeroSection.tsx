"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ShoppingCart, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

type HeroTabOption = "buying" | "selling";

type BuyingSellingGuidesHeroSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  defaultTab?: HeroTabOption;
  onTabChange?: (tab: HeroTabOption) => void;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function BuyingSellingGuidesHeroSection({
  id = "buying-selling-guides-hero",
  eyebrow = "RESOURCES & INSIGHTS",
  title = "Buying & Selling Guides",
  description = "Understand each step, check important evidence and use safer ways to buy or sell a vehicle.",
  defaultTab = "buying",
  onTabChange,
  imageSrc = "/images/buy/1.png",
  imageAlt = "Luxury black sedan in showroom studio background",
  className = "bg-[#0B1220] text-white",
}: BuyingSellingGuidesHeroSectionProps) {
  const [activeTab, setActiveTab] = useState<HeroTabOption>(defaultTab);

  const handleTabClick = (tab: HeroTabOption) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <section
      id={id}
      className={`scroll-mt-28 py-16 sm:py-20 md:py-28 ${className}`}
    >
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Eyebrow, Title, Description, and Toggle Button Pill Group */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#F5B400]" />
                <span className="text-xs font-bold tracking-widest text-[#F5B400] uppercase">
                  {eyebrow}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                {title}
              </h1>

              {description && (
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base">
                  {description}
                </p>
              )}

              {/* Segmented Toggle Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl sm:rounded-full border border-slate-700/80 bg-slate-900/90 p-1.5 w-full sm:w-fit">
                <button
                  type="button"
                  onClick={() => handleTabClick("buying")}
                  className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl sm:rounded-full px-4 sm:px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    activeTab === "buying"
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ShoppingCart
                    className={`h-4 w-4 shrink-0 ${
                      activeTab === "buying"
                        ? "text-amber-600"
                        : "text-slate-400"
                    }`}
                  />
                  <span className="whitespace-nowrap">
                    I&apos;m buying a vehicle
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick("selling")}
                  className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl sm:rounded-full px-4 sm:px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    activeTab === "selling"
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Tag
                    className={`h-4 w-4 shrink-0 ${
                      activeTab === "selling"
                        ? "text-amber-600"
                        : "text-slate-400"
                    }`}
                  />
                  <span className="whitespace-nowrap">
                    I&apos;m selling a vehicle
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Studio Car Image Container */}
          <Reveal direction="zoom" delay={200} className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
