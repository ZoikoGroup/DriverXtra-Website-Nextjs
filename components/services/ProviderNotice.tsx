"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RegionPicker from "@/components/ui/RegionPicker";
import { useRegion } from "@/lib/region";
import { hrefFor } from "@/lib/navigation";

/** Empty state for the selected market — no placeholder providers are shown. */
export default function ProviderNotice({ kind, image, alt }: { kind: string; image: string; alt: string }) {
  const region = useRegion();

  return (
    <div className="group mt-6 grid overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white transition-all duration-500 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.25)] md:grid-cols-[2fr_3fr]">
      <div className="relative aspect-[338/190] overflow-hidden md:aspect-auto md:min-h-[190px]">
        <Image src={image} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <h3 key={region} className="animate-fade-up text-[16px] font-bold text-ink">
          No verified {kind} providers are published for {region} yet.
        </h3>
        <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
          We only list providers once their identity, qualifications, service area and terms are verified. We won&apos;t show placeholder businesses, ratings or
          prices.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <RegionPicker label="Change market" buttonClassName="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink" />
          <Link href={hrefFor("Become a Service Provider")} className="group/link inline-flex items-center gap-1.5 font-semibold text-ink transition-colors hover:text-gold">
            Become a service provider
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
