"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export type CatalogItem = { id: string; title: string; text: string; image: string; alt: string };

/** Fired when a catalog card is picked, so the page's request form can preselect it. */
export const CATALOG_EVENT = "services:catalog-pick";

export default function ServiceCatalog({ items, formId, cta }: { items: CatalogItem[]; formId: string; cta: string }) {
  const pick = (id: string) => {
    window.dispatchEvent(new CustomEvent(CATALOG_EVENT, { detail: id }));
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ id, title, text, image, alt }, i) => (
        <Reveal key={id} delay={i * 100} className="h-full">
          <button
            type="button"
            onClick={() => pick(id)}
            className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
          >
            <span className="relative block aspect-[205/128] w-full overflow-hidden">
              <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            </span>
            <span className="flex flex-1 flex-col p-4">
              <span className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</span>
              <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                {cta} <ArrowRight className="h-3.5 w-3.5 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
              </span>
            </span>
          </button>
        </Reveal>
      ))}
    </div>
  );
}
