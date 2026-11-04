"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PresetReference = {
  title: string;
  subtitle: string;
  refCode: string;
};

const DEFAULT_PRESETS: PresetReference[] = [
  {
    title: "Business identity",
    subtitle: "Example Motors Ltd (dealer)",
    refCode: "DX-DEMO-1001",
  },
  {
    title: "Operating authority",
    subtitle: "Example Motors Ltd (dealer)",
    refCode: "DX-DEMO-1002",
  },
  {
    title: "Seller identity",
    subtitle: "Private seller",
    refCode: "DX-DEMO-1003",
  },
];

type ReadTheScopeBehindASignalSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  presets?: PresetReference[];
  className?: string;
};

export default function ReadTheScopeBehindASignalSection({
  id = "inspect-status",
  eyebrow = "Inspect a status",
  title = "Read the scope behind a signal",
  description = "Signals on DriverXtra link to an explanation like this. Try a demonstration reference.",
  presets = DEFAULT_PRESETS,
  className = "bg-white",
}: ReadTheScopeBehindASignalSectionProps) {
  const [signalRef, setSignalRef] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleSelectPreset = (refCode: string) => {
    setSignalRef(refCode);
    setActivePreset(refCode);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!signalRef) return;
    // Handle inspection lookup action
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Section Header & Preset Buttons */}
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            {/* Quick Select Presets */}
            <div className="mt-8 space-y-4 max-w-lg">
              {presets.map(({ title: presetTitle, subtitle, refCode }) => {
                const isSelected = activePreset === refCode;

                return (
                  <Reveal key={refCode} delay={100}>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset(refCode)}
                      className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-slate-400 bg-slate-50/80 shadow-xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                      }`}
                    >
                      <h4 className="text-sm font-bold text-ink sm:text-base">
                        {presetTitle}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        {subtitle} ·{" "}
                        <span className="font-mono text-slate-400">
                          {refCode}
                        </span>
                      </p>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Signal Reference Inspection Card */}
          <Reveal delay={180} className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="signal-reference"
                    className="block text-xs font-bold text-ink sm:text-sm"
                  >
                    Signal reference
                  </label>
                  <div className="mt-2">
                    <input
                      id="signal-reference"
                      type="text"
                      placeholder="e.g. DX-DEMO-1001"
                      value={signalRef}
                      onChange={(e) => {
                        setSignalRef(e.target.value);
                        setActivePreset(null);
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-mono text-ink placeholder:text-slate-400 placeholder:font-sans outline-none transition-colors focus:border-slate-400 sm:text-sm"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Shown with a signal on a profile or listing.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#0B1220] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90 sm:text-sm"
                  >
                    Show explanation
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
