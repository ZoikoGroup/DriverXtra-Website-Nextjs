import Link from "next/link";
import { Check, Info } from "lucide-react";
import { formatPrice } from "@/components/parts/PartCard";
import type { Part } from "@/components/parts/data";

const originLine = {
  reviewed: { text: "Manufacturer-origin evidence reviewed", dot: "bg-emerald-500", tone: "text-emerald-700" },
  unverified: { text: "Product origin not independently verified", dot: "bg-amber-500", tone: "text-amber-700" },
  lapsed: { text: "Origin evidence no longer current", dot: "bg-red-500", tone: "text-red-700" },
} as const;

const sellerLine = {
  authorized: { text: "Manufacturer-authorized seller", dot: "bg-emerald-500", tone: "text-emerald-700" },
  L4: { text: "Seller verified (L4)", dot: "bg-emerald-500", tone: "text-emerald-700" },
  L3: { text: "Seller verified (L3)", dot: "bg-emerald-500", tone: "text-emerald-700" },
  L2: { text: "L2 Identity Verified", dot: "bg-blue-500", tone: "text-blue-700" },
} as const;

function Row({ label, dot, tone, children }: { label: string; dot?: string; tone: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-2 py-1 text-xs">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`flex gap-1.5 ${tone}`}>
        {dot && <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />}
        <span>{children}</span>
      </dd>
    </div>
  );
}

type OemPartCardProps = {
  part: Part;
  vehicle: { id: string; label: string } | null;
};

export default function OemPartCard({ part: p, vehicle }: OemPartCardProps) {
  const origin = p.origin ? originLine[p.origin] : null;
  const seller = p.sellerCheck ? sellerLine[p.sellerCheck] : null;
  const shortVehicle = vehicle?.label.split(" · ")[0];
  const fits = vehicle && p.fits?.includes(vehicle.id as never);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">OEM-classified</span>
        <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{p.condition ?? "New"}</span>
      </div>
      {p.newerRevision && (
        <span className="mt-2 w-fit rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">Has newer revision</span>
      )}

      <h3 className="mt-2.5 text-[15px] leading-snug font-bold text-ink transition-colors group-hover:text-gold">{p.name}</h3>
      <p className="mt-1 text-xs text-slate-500">
        {p.brand} · Part no. <span className="font-semibold text-ink">{p.partNo}</span>
        {p.revision && ` rev ${p.revision}`}
      </p>

      <dl className="mt-3 border-t border-slate-100 pt-2">
        {origin && (
          <Row label="Origin" dot={origin.dot} tone={origin.tone}>
            {origin.text}
          </Row>
        )}
        {seller && (
          <Row label="Seller" dot={seller.dot} tone={seller.tone}>
            {seller.text}
          </Row>
        )}
        {vehicle ? (
          fits ? (
            <Row label="Fitment" tone="font-semibold text-emerald-700">
              <span key={vehicle.id} className="inline-flex animate-fade-up items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Fits your {shortVehicle}
              </span>
            </Row>
          ) : (
            <Row label="Fitment" tone="text-slate-500">
              Not listed for your {shortVehicle}
            </Row>
          )
        ) : (
          <Row label="Fitment" tone="text-slate-500">
            Select a vehicle to check fitment
          </Row>
        )}
      </dl>

      {p.keyNotice && (
        <p className="mt-3 flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-snug text-amber-800 ring-1 ring-amber-200">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" /> Key and security items may need proof of vehicle ownership before dispatch or coding.
        </p>
      )}

      <div className="mt-auto pt-4">
        {p.price !== undefined ? (
          <>
            <p className="text-xl font-extrabold text-ink">{formatPrice(p.price)}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">from {p.seller}</p>
          </>
        ) : (
          <p className="text-xs text-slate-500">This item is not currently offered for delivery in your selected market.</p>
        )}
        <Link
          href="#"
          className="mt-3 inline-flex h-9 items-center rounded-full bg-ink px-4 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
