"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Clock, Heart, Info, Tag } from "lucide-react";
import { formatDate, formatGbp, formatMiles, reduction, reductionPct, type ReducedListing } from "./data";

type Props = { listing: ReducedListing; saved: boolean; onToggleSave: () => void; priority?: boolean };

const linkClass = "text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900";

export default function PriceReducedCard({ listing: l, saved, onToggleSave, priority }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();
  const title = `${l.year} ${l.make} ${l.model}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.4)]">
      <div className="relative aspect-[8/5] overflow-hidden bg-slate-100">
        <Image
          src={l.image}
          alt={`Example photo for ${title}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-md bg-brand-light px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink ring-1 ring-brand">
          EXAMPLE
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-ink">
          <Tag aria-hidden className="h-3 w-3" />
          Price reduced
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-bold text-ink">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {l.condition} · {formatMiles(l.mileage)} · {l.fuel}
        </p>

        <dl className="mt-4 space-y-0.5">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-xs font-semibold text-slate-500">Current advertised price</dt>
            <dd className="text-xl font-extrabold text-ink">{formatGbp(l.price)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-xs text-slate-500">Previous public asking price</dt>
            <dd className="text-xs text-slate-500 line-through">{formatGbp(l.previousPrice)}</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2">
          <p className="text-sm font-bold text-emerald-800">Price reduced by {formatGbp(reduction(l))}</p>
          <p className="text-[11px] text-emerald-800/80">
            {reductionPct(l).toFixed(1)}% lower than the verified previous asking price
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock aria-hidden className="h-3.5 w-3.5" />
          Price reduced on {formatDate(l.reducedOn)}
        </p>

        <button
          type="button"
          onClick={() => setDetailsOpen((o) => !o)}
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
        >
          Price and fee details
          <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
        </button>
        <div id={detailsId} hidden={!detailsOpen} className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          Both prices include mandatory seller fees. Taxes, registration, delivery and optional extras may be extra.
          The previous price was public for at least 14 days before the reduction.
        </div>

        {l.conditionalOffer && (
          <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
            <Info aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
            Additional incentives may require eligibility. A {formatGbp(l.conditionalOffer)} conditional offer isn&apos;t
            part of the price above.
          </p>
        )}

        <div className="mt-3 space-y-1 text-xs text-slate-500">
          <p>
            Seller: {l.sellerType} · {l.seller} · {l.city}
          </p>
          <Link href="/dealer-verification" className={linkClass}>
            Learn what seller verification means
          </Link>
          <p>Vehicle history: available</p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/buy-vehicles"
              className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-xs font-semibold text-white transition-colors hover:bg-navy-700"
            >
              View vehicle details
            </Link>
            <button
              type="button"
              onClick={onToggleSave}
              aria-pressed={saved}
              aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink"
            >
              <Heart key={String(saved)} aria-hidden className={`h-4 w-4 ${saved ? "animate-pop fill-red-500 text-red-500" : ""}`} />
              {saved ? "Saved" : "Save vehicle"}
            </button>
          </div>
          <Link href="/report-a-listing" className={`${linkClass} mt-3 inline-block`}>
            Report an incorrect price
          </Link>
        </div>
      </div>
    </article>
  );
}
