"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, Search, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import { continueNote, customerTypes, partners, productTypes, type Customer, type Partner } from "./data";

type Props = { initialProduct?: string; initialCustomer?: Customer };

export default function PartnerDirectory({ initialProduct, initialCustomer }: Props) {
  const region = useRegion();
  const [product, setProduct] = useState(initialProduct ?? "all");
  const [customer, setCustomer] = useState<"all" | Customer>(initialCustomer ?? "all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partners.filter(
      (p) =>
        (product === "all" || p.product === product) &&
        (customer === "all" || p.customers === customer) &&
        (!q || p.name.toLowerCase().includes(q) || p.legalName.toLowerCase().includes(q)),
    );
  }, [product, customer, query]);

  const selected = partners.find((p) => p.id === openId) ?? null;
  const reset = () => {
    setProduct("all");
    setCustomer("all");
    setQuery("");
  };

  return (
    <section id="participating-providers" className="scroll-mt-28 bg-white py-16">
      <div className={container}>
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Participating finance providers</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 text-[13px] text-slate-500">
            Sample directory for design review — names are examples, not real lenders. Ordered alphabetically; no paid placement.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1.6fr]">
            <SelectField label="Product type" value={product} onChange={setProduct} options={[["all", "All products"], ...productTypes.map((p) => [p, p] as const)]} />
            <SelectField label="Customer type" value={customer} onChange={(v) => setCustomer(v as typeof customer)} options={[["all", "All"], ...customerTypes.map((c) => [c, c] as const)]} />
            <label className="block">
              <span className="text-[13px] font-semibold text-ink">Search providers by name</span>
              <span className="relative mt-1.5 flex items-center">
                <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Example Bank"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-9 text-sm text-ink transition-colors placeholder:text-slate-400 hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
                />
              </span>
            </label>
          </div>
        </Reveal>

        <p className="mt-3 text-xs text-slate-500" aria-live="polite">
          <span key={results.length} className="inline-block animate-pop font-semibold text-ink">
            {results.length}
          </span>{" "}
          {results.length === 1 ? "provider" : "providers"} in {region}
        </p>

        {results.length === 0 ? (
          <div className="mt-4 animate-fade-up rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
            <p className="text-sm text-slate-500">No providers match these filters.</p>
            <button type="button" onClick={reset} className="mt-3 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold">
              Clear filters
            </button>
          </div>
        ) : (
          <div key={`${product}-${customer}-${query}`} className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                <PartnerCard partner={p} region={region} onOpen={() => setOpenId(p.id)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && <PartnerDetails partner={selected} region={region} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: (readonly [string, string])[] }) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold text-ink">{label}</span>
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

function PartnerCard({ partner: p, region, onOpen }: { partner: Partner; region: string; onOpen: () => void }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-bold text-ink transition-colors group-hover:text-gold">{p.name}</h3>
          <p className="text-[11px] text-slate-500">{p.legalName}</p>
        </div>
        <span className="shrink-0 rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">SAMPLE</span>
      </div>
      <div className="mt-3 border-t border-slate-100 pt-3">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
          <div>
            <dt className="text-[11px] text-slate-500">Role</dt>
            <dd className="text-ink">{p.role} (sample)</dd>
          </div>
          <div>
            <dt className="text-[11px] text-slate-500">Customers</dt>
            <dd className="text-ink">{p.customers}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[11px] text-slate-500">Products in {region}</dt>
            <dd className="text-ink">{p.product}</dd>
          </div>
        </dl>
      </div>
      <p className="mt-3 flex-1 border-t border-slate-100 pt-3 text-[13px] leading-relaxed text-slate-600">{continueNote(p)}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
      >
        View Partner Details
        <ArrowRight className="h-3.5 w-0 opacity-0 transition-all duration-300 group-hover:w-3.5 group-hover:opacity-100" />
      </button>
    </article>
  );
}

/** Pop-up profile: role, products and what happens before continuing. */
function PartnerDetails({ partner: p, region, onClose }: { partner: Partner; region: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setVisible(false);
    window.setTimeout(onClose, 250);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per open
  }, []);

  const rows: [string, string][] = [
    ["Legal name", p.legalName],
    ["Role", `${p.role} (sample)`],
    ["Customers", p.customers],
    [`Products in ${region}`, p.product],
    ["Referral fee", p.sharesDetails ? "DriverXtra may receive a fee if you continue." : "No referral fee applies."],
  ];

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="partner-title">
      <div onClick={close} className={`absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} />
      <div
        className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-2xl ${
          visible ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-8 opacity-0 sm:scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-gold">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h2 id="partner-title" className="text-lg font-extrabold text-ink">
                {p.name}
              </h2>
              <span className="text-[10px] font-bold tracking-wide text-gold">SAMPLE PROFILE</span>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close partner details" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 transition-all hover:rotate-90 hover:bg-ink hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <dl className="divide-y divide-slate-100 px-6">
          {rows.map(([label, value], i) => (
            <div
              key={label}
              className={`grid grid-cols-[9rem_1fr] gap-3 py-3 text-[13px] transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
              style={{ transitionDelay: visible ? `${150 + i * 60}ms` : "0ms" }}
            >
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mx-6 mb-5 rounded-xl bg-slate-50 p-4">
          <p className="text-[13px] font-semibold text-ink">Before you continue</p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
            {p.sharesDetails
              ? "We'll show exactly which details would be shared and ask for your approval first. The provider then makes its own decision."
              : "You'll leave DriverXtra for the provider's website. Nothing you've entered here is sent."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 px-6 py-4">
          <button type="button" disabled className="cursor-not-allowed rounded-full bg-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-500">
            Continue to provider (sample)
          </button>
          <Link href="/compare-vehicle-finance" onClick={() => document.body.style.removeProperty("overflow")} className="group inline-flex items-center gap-1 text-[13px] font-semibold text-ink underline underline-offset-4 hover:text-gold">
            Compare finance offers <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
