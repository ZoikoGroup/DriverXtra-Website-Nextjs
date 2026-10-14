"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  Check,
  CircleCheck,
  Clock,
  FileText,
  Gauge,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Tag,
  TriangleAlert,
  Truck,
  User,
  type LucideIcon,
} from "lucide-react";
import { formatMileage, formatPrice, powertrainLabel, verificationLabel, type Listing } from "./data";

const sellerIcon: Record<Listing["seller"], LucideIcon> = { Dealer: Store, Private: User, Fleet: Truck };

const historyBadge = {
  available: { label: "History report available", icon: FileText, tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  new: { label: "New vehicle — no prior history", icon: Sparkles, tone: "bg-blue-50 text-blue-700 ring-blue-200" },
  pending: { label: "History report pending", icon: Clock, tone: "bg-amber-50 text-amber-700 ring-amber-200" },
} as const;

type VehicleCardProps = {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
  comparing: boolean;
  onToggleCompare: () => void;
  compareFull: boolean;
  priority?: boolean;
};

export default function VehicleCard({
  listing: l,
  saved,
  onToggleSave,
  comparing,
  onToggleCompare,
  compareFull,
  priority,
}: VehicleCardProps) {
  const title = `${l.year} ${l.make} ${l.model}`;
  const SellerIcon = sellerIcon[l.seller];
  const history = historyBadge[l.history];
  const verificationTone = l.verification === "L2" ? "bg-blue-50 text-blue-700 ring-blue-200" : "bg-emerald-50 text-emerald-700 ring-emerald-200";

  const meta = [
    { icon: Gauge, text: formatMileage(l.mileage) },
    { icon: MapPin, text: l.location },
    { icon: SellerIcon, text: l.seller },
    { icon: Tag, text: l.condition === "new" ? "New" : "Used" },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.4)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={l.image}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <button
          type="button"
          onClick={onToggleSave}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-md transition-all duration-300 hover:scale-110"
        >
          <Heart
            key={String(saved)}
            className={`h-4 w-4 ${saved ? "animate-pop fill-red-500 text-red-500" : "text-ink"}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {l.sponsored && (
          <span className="mb-2 w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
            Sponsored
          </span>
        )}
        <h3 className="text-[15px] leading-snug font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-xl font-extrabold text-ink">{formatPrice(l.price)}</p>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
            {powertrainLabel[l.powertrain]}
          </span>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-500">
          {meta.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <dd className="truncate">{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 flex flex-col items-start gap-1.5">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${verificationTone}`}>
            <ShieldCheck className="h-3 w-3" />
            Seller: {verificationLabel[l.verification]}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${history.tone}`}>
            <history.icon className="h-3 w-3" />
            {history.label}
          </span>
        </div>

        {l.certification && (
          <p
            className={`mt-2 flex gap-1.5 text-[11px] leading-snug ${
              l.certification.status === "certified" ? "text-emerald-700" : "text-orange-700"
            }`}
          >
            {l.certification.status === "certified" ? (
              <CircleCheck className="mt-px h-3.5 w-3.5 shrink-0" />
            ) : (
              <TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0" />
            )}
            {l.certification.text}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={onToggleCompare}
            disabled={!comparing && compareFull}
            aria-pressed={comparing}
            title={!comparing && compareFull ? "You can compare up to 3 vehicles" : undefined}
            className={`inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border text-xs font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
              comparing
                ? "border-brand bg-brand-light text-ink"
                : "border-transparent text-ink hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {comparing ? <Check className="h-3.5 w-3.5 animate-pop" /> : <ArrowLeftRight className="h-3.5 w-3.5" />}
            {comparing ? "Comparing" : "Compare"}
          </button>
          <Link
            href="#"
            className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lg"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VehicleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="skeleton aspect-[16/10]" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-6 w-1/2 rounded" />
        <div className="grid grid-cols-2 gap-2">
          <div className="skeleton h-3 rounded" />
          <div className="skeleton h-3 rounded" />
          <div className="skeleton h-3 rounded" />
          <div className="skeleton h-3 rounded" />
        </div>
        <div className="skeleton h-4 w-3/5 rounded-full" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-9 flex-1 rounded-full" />
          <div className="skeleton h-9 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}
