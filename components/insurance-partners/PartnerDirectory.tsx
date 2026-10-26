"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RegionPicker from "@/components/ui/RegionPicker";
import { regions, setRegion, useRegion, type RegionName } from "@/lib/region";
import { partnerRoles, productTypes } from "./data";

/** No partners are verified yet, so every filter combination shows the empty state. */
export default function PartnerDirectory() {
  const region = useRegion();
  const [product, setProduct] = useState("all");
  const [role, setRole] = useState("all");

  const filters = [product !== "all" && product.toLowerCase(), role !== "all" && role.toLowerCase()].filter(Boolean).join(" · ");

  return (
    <>
      <Reveal delay={150}>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1.8fr]">
          <div>
            <Select label="Market" value={region} onChange={(v) => setRegion(v as RegionName)} options={regions.map((r) => [r.name, r.name] as const)} />
            <div className="mt-1.5">
              <RegionPicker label="Change market" buttonClassName="text-xs font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink" />
            </div>
          </div>
          <Select label="Product type" value={product} onChange={setProduct} options={[["all", "All products"], ...productTypes.map((p) => [p, p] as const)]} />
          <Select label="Partner role" value={role} onChange={setRole} options={[["all", "All roles"], ...partnerRoles.map((r) => [r, r] as const)]} />
        </div>
      </Reveal>

      <p className="mt-3 text-xs text-slate-500" aria-live="polite">
        0 verified partners for <span className="font-semibold text-ink">{region}</span>
        {filters && <> · {filters}</>}
      </p>

      <Reveal delay={200}>
        <div key={`${region}-${product}-${role}`} className="group mt-2 grid animate-fade-up overflow-hidden rounded-2xl border border-dashed border-slate-300 md:grid-cols-[1fr_1.6fr]">
          <div className="relative aspect-[484/303] overflow-hidden bg-black md:aspect-auto md:min-h-[220px]">
            <Image
              src="/images/insurance-partners/no-partners-yet.png"
              alt="A black car lit from the side in a dark studio"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h3 className="text-[15px] font-bold text-ink">No verified insurance partners are published for {region} yet.</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
              We only list organisations once their identity, role and market scope are verified. We won&apos;t show placeholder insurers or logos.
            </p>
          </div>
        </div>
      </Reveal>
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: (readonly [string, string])[] }) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-ink">{label}</span>
      <span className="relative mt-1.5 flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
        >
          {options.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500" />
      </span>
    </label>
  );
}
