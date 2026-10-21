"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import { PARTS_COUNTRY, parts, shopCards, type PartType } from "./data";

type ShopCardsProps = {
  /** Id of the card for the current page (e.g. "vin", "oem") — highlighted and links to its section. */
  active?: string;
  /** On the parts page, cards filter the results in place instead of navigating. */
  onSelectTypes?: (types: PartType[]) => void;
};

const cardClass = (active: boolean) =>
  `group flex h-full w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)] ${
    active ? "border-brand shadow-[0_0_0_3px_rgba(255,194,14,0.2)]" : "border-slate-200 hover:border-brand/60"
  }`;

export default function ShopCards({ active, onSelectTypes }: ShopCardsProps) {
  const region = useRegion();
  const countIn = (ts: PartType[]) => (region === PARTS_COUNTRY ? parts.filter((p) => ts.includes(p.type)).length : 0);

  return (
    <section className="bg-white pt-16 pb-6">
      <div className={container}>
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Shop All Parts &amp; Accessories</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shopCards.map(({ id, title, text, icon: Icon, types, preset, page, anchor }, i) => {
            const isActive = id === active;
            const content: ReactNode = (
              <>
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                    isActive ? "bg-brand text-ink" : "bg-navy text-brand group-hover:bg-brand group-hover:text-ink"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className={`block text-sm font-bold ${isActive ? "text-brand-dark" : "text-ink"}`}>{title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{text(countIn, region)}</span>
                </span>
              </>
            );
            return (
              <Reveal key={title} delay={(i % 3) * 90}>
                {isActive ? (
                  <a href={`#${anchor}`} className={cardClass(true)} aria-current="page">
                    {content}
                  </a>
                ) : page ? (
                  <Link href={page} className={cardClass(false)}>
                    {content}
                  </Link>
                ) : onSelectTypes ? (
                  <button type="button" onClick={() => onSelectTypes(types ?? [])} className={cardClass(false)}>
                    {content}
                  </button>
                ) : (
                  <Link href={`/parts?type=${preset}#all-parts`} className={cardClass(false)}>
                    {content}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
