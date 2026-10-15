import { Globe } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import type { RegionName } from "@/lib/region";
import RegionPicker from "@/components/ui/RegionPicker";
import { tabs, type TabId } from "./data";

type BrowseHeroProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  region: RegionName;
};

export default function BrowseHero({ activeTab, onTabChange, region }: BrowseHeroProps) {
  return (
    <section className="relative z-20 bg-navy text-white">
      {/* Background is clipped on its own so the region dropdown can overflow the section */}
      <div className="absolute inset-0 overflow-hidden">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-40" position="center 60%" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 pt-12 pb-8 sm:px-6 lg:px-8 lg:pt-16">
        <Reveal>
          <h1 className="max-w-xl text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-[42px]">
            Browse vehicles that match your needs.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            Vehicles listed by private sellers, dealers and fleets. Every card shows the seller&apos;s verification level
            and the vehicle&apos;s history status.
          </p>
        </Reveal>
        <Reveal delay={200} className="relative z-30">
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-brand" />
              Showing vehicles listed in{" "}
              <strong key={region} className="inline-block animate-fade-up text-white">
                {region}
              </strong>
            </span>
            <span>Prices are shown in each listing&apos;s own currency.</span>
            <RegionPicker />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div role="tablist" aria-label="Vehicle categories" className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 xl:overflow-visible">
            {tabs.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onTabChange(tab.id)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-center text-xs font-semibold whitespace-nowrap transition-all duration-300 xl:flex-auto xl:text-[13px] ${
                    active
                      ? "border-brand bg-brand text-ink shadow-[0_8px_20px_-8px_rgba(255,194,14,0.8)]"
                      : "border-white/20 bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
