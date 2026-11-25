import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart } from "lucide-react";
import { formatGbp, formatListed, formatMiles, type VerifiedListing } from "./data";

type Props = { listing: VerifiedListing; saved: boolean; onToggleSave: () => void; priority?: boolean };

export default function VerifiedListingCard({ listing: l, saved, onToggleSave, priority }: Props) {
  const title = `${l.year} ${l.make} ${l.model}`;
  const history =
    l.history === "new"
      ? "Vehicle history: new vehicle — no prior history"
      : "Vehicle history: records available — reviewed separately from the seller badge";

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
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-bold text-ink">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {l.condition} · {formatMiles(l.mileage)} · {l.fuel} · Listed {formatListed(l.listed)}
        </p>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="text-xs font-semibold text-slate-500">Current advertised price</span>
          <span className="text-xl font-extrabold text-ink">{formatGbp(l.price)}</span>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm font-bold text-ink">{l.seller}</p>
          <p className="text-xs text-slate-500">
            {l.sellerType} · {l.city}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
              <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-600" />
              <BadgeCheck aria-hidden className="h-4 w-4" />
              Verified Seller
            </span>
            <Link href="/dealer-verification" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900">
              What does this verification cover?
            </Link>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Checks may change or expire. Review the seller and vehicle details before proceeding.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{history}</p>
          <Link href="/trust-buyer-safety" className="mt-1 inline-block text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900">
            Check safety recalls for this vehicle
          </Link>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
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
          <Link href="/report-a-listing" className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900">
            Report this listing
          </Link>
        </div>
      </div>
    </article>
  );
}
