"use client";

import Link from "next/link";
import { Check, Info, Lock } from "lucide-react";
import { partTypes, type Part } from "./data";

type PartCardProps = {
  part: Part;
  /** The vehicle chosen in "Check compatibility", if any. */
  vehicle: { id: string; label: string } | null;
  comparing: boolean;
  onToggleCompare: () => void;
  compareFull: boolean;
  /** Fitment line when no vehicle is chosen. */
  noVehicleText?: string;
};

const formatPrice = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const originLine = {
  reviewed: { text: "Manufacturer-origin evidence reviewed", dot: "bg-emerald-500", tone: "text-emerald-700" },
  unverified: { text: "Product origin not independently verified", dot: "bg-amber-500", tone: "text-amber-700" },
  lapsed: { text: "Origin evidence no longer current", dot: "bg-red-500", tone: "text-red-700" },
} as const;

function StatusLine({ dot, tone, children }: { dot: string; tone: string; children: React.ReactNode }) {
  return (
    <p className={`flex gap-2 text-xs leading-snug ${tone}`}>
      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span>{children}</span>
    </p>
  );
}

export default function PartCard({
  part: p,
  vehicle,
  comparing,
  onToggleCompare,
  compareFull,
  noVehicleText = "Fitment not verified for your vehicle",
}: PartCardProps) {
  const type = partTypes.find((t) => t.id === p.type)!;
  const Icon = type.icon;
  const offered = p.price !== undefined;
  const fitsVehicle = vehicle && p.fits?.includes(vehicle.id as never);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">{type.badge}</span>
        {p.condition && <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{p.condition}</span>}
        {p.sponsored && <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">Sponsored</span>}
      </div>

      <span className="mt-3 grid h-10 w-10 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-3 text-[15px] leading-snug font-bold text-ink transition-colors group-hover:text-gold">{p.name}</h3>
      <p className="mt-1 text-xs text-slate-500">
        {p.brand} · Part no. <span className="font-semibold text-ink">{p.partNo}</span>
      </p>
      {p.spec && <p className="mt-2 text-xs font-semibold text-ink">{p.spec}</p>}

      <div className="mt-2.5 space-y-1.5">
        {p.connectorCheck && (
          <StatusLine dot="bg-blue-500" tone="text-blue-700">
            Check connector, power and installation for your vehicle and supply
          </StatusLine>
        )}
        {p.universal && (
          <StatusLine dot="bg-blue-500" tone="text-blue-700">
            Universal workshop tool — no vehicle fitment needed
          </StatusLine>
        )}
        {p.origin && (
          <StatusLine dot={originLine[p.origin].dot} tone={originLine[p.origin].tone}>
            {originLine[p.origin].text}
          </StatusLine>
        )}
        {!p.universal && !p.connectorCheck &&
          (fitsVehicle ? (
            <p key={vehicle!.id} className="flex animate-fade-up gap-2 text-xs font-semibold text-emerald-700">
              <Check className="h-3.5 w-3.5 shrink-0" /> Fits your {vehicle!.label.split(" · ")[0]} (checked)
            </p>
          ) : (
            <StatusLine dot="border border-slate-400 bg-transparent" tone="text-slate-500">
              {vehicle ? `Not listed for your ${vehicle.label.split(" · ")[0]}` : noVehicleText}
            </StatusLine>
          ))}
      </div>

      {p.restricted && (
        <span
          tabIndex={0}
          className="group/tip relative mt-3 inline-flex w-fit cursor-help items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200 outline-none"
        >
          <Lock className="h-3.5 w-3.5" /> Restricted purchase — see details
          <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 w-60 translate-y-1 rounded-lg bg-navy px-3 py-2 text-[11px] leading-snug font-normal text-white opacity-0 shadow-xl transition-all duration-300 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-visible/tip:translate-y-0 group-focus-visible/tip:opacity-100">
            Sale may be limited by market or buyer type — for example to trade or qualified buyers. Details are on the listing.
          </span>
        </span>
      )}

      {p.notice && (
        <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-snug text-amber-800 ring-1 ring-amber-200">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" /> {p.notice}
        </p>
      )}

      {p.keyNotice && (
        <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-snug text-amber-800 ring-1 ring-amber-200">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" /> Key and security items may need proof of vehicle ownership before dispatch or coding.
        </p>
      )}

      <div className="mt-auto pt-4">
        {offered ? (
          <>
            <p className="text-xl font-extrabold text-ink">
              {formatPrice(p.price!)}
              {p.perUnit && <span className="text-xs font-semibold text-slate-500">each</span>}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              from {p.seller} · final delivery costs shown before purchase where available
            </p>
          </>
        ) : (
          <p className="text-xs text-slate-500">This item is not currently offered in your selected market.</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <Link
            href="#"
            className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
          >
            View Details
          </Link>
          <label
            className={`flex items-center gap-2 text-xs font-medium text-ink ${!comparing && compareFull ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
            title={!comparing && compareFull ? "You can compare up to 3 parts" : undefined}
          >
            <input
              type="checkbox"
              checked={comparing}
              disabled={!comparing && compareFull}
              onChange={onToggleCompare}
              className="h-4 w-4 rounded accent-ink"
            />
            Compare
          </label>
        </div>
      </div>
    </article>
  );
}

export { formatPrice };
