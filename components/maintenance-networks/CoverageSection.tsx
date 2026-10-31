"use client";

import Image from "next/image";
import { useState } from "react";
import FleetDemoBadge from "@/components/fleet-solutions/FleetDemoBadge";
import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";
import { ICON_CHEVRON_DOWN, REGIONS, SERVICES } from "./data";

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id} className="text-[13px] leading-[20.15px] font-[650] text-[#172033]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[46px] w-full appearance-none rounded-[12px] border border-solid border-[#d7dee8] bg-white py-[10.4px] pr-[34px] pl-3 text-[15px] leading-[23.25px] font-normal text-[#172033] outline-none focus-visible:border-[#0b1220]"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Image
          src={ICON_CHEVRON_DOWN}
          alt=""
          width={14}
          height={14}
          unoptimized
          className="pointer-events-none absolute top-1/2 right-[13px] -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default function CoverageSection() {
  const [service, setService] = useState(SERVICES[0].title);
  const [region, setRegion] = useState(REGIONS[0]);

  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[14px]">
        <FleetSectionHead eyebrow="Coverage by market" title="Explore coverage" id="mnCH" titleSize="text-[37.8px]" />

        <div className="grid w-full max-w-[640px] gap-3 pt-[18px] sm:grid-cols-3">
          <SelectField
            id="mnCat"
            label="Service"
            value={service}
            options={SERVICES.map((s) => s.title)}
            onChange={setService}
          />
          <SelectField id="mnReg" label="Region" value={region} options={REGIONS} onChange={setRegion} />
        </div>

        <div className="flex w-full flex-col gap-[5.99px] rounded-[14px] border-2 border-solid border-[#0b1220] bg-white px-[14px] pt-[13px] pb-[14px]">
          <h3 className="text-[16.7px] leading-[20.16px] font-bold tracking-[-0.36px] text-[#172033]">
            {service} · {region}
          </h3>
          <p className="flex flex-wrap items-end gap-x-1 text-[16px] leading-[24.8px] font-normal text-[#172033]">
            <span>
              Sample: 2 candidate providers listed, checked 3 Oct 2026. Capacity unknown until a provider confirms.
            </span>
            <FleetDemoBadge />
          </p>
        </div>
      </div>
    </section>
  );
}
