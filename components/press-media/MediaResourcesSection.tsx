"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { RESOURCES, RESOURCE_TYPES, STATUS_LABEL, type MediaResource, type ResourceStatus } from "./data";

const STATUS_STYLE: Record<ResourceStatus, { dot: string; text: string }> = {
  usage: { dot: "bg-emerald-600", text: "text-emerald-700" },
  permission: { dot: "bg-amber-500", text: "text-amber-700" },
  unavailable: { dot: "border border-slate-400", text: "text-slate-600" },
};

function ResourceCard({ r }: { r: MediaResource }) {
  const [open, setOpen] = useState(false);
  const s = STATUS_STYLE[r.status];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-[397/224] overflow-hidden">
        <Image src={r.image} alt={r.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[16px] font-bold text-ink">{r.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-4 text-[14px] text-slate-600">
          <span>{r.type}</span>
          <span>{r.formats}</span>
          <span>{r.version}</span>
        </p>
        <p className={`mt-3 flex items-center gap-1.5 text-[15px] ${s.text}`}>
          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
          {STATUS_LABEL[r.status]}
        </p>

        {open && <p className="mt-3 animate-fade-up rounded-lg bg-slate-50 p-3 text-[13px] leading-relaxed text-slate-600">{r.terms}</p>}

        <div className="mt-auto pt-3">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="h-9 rounded-full border border-slate-300 px-4 text-[14px] font-semibold text-ink transition-colors hover:border-ink"
          >
            {open ? "Hide" : r.status === "unavailable" ? "View details" : "Review usage terms"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MediaResourcesSection() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [applied, setApplied] = useState({ query: "", type: "all" });

  const q = applied.query.trim().toLowerCase();
  const results = RESOURCES.filter(
    (r) =>
      (applied.type === "all" || r.type === applied.type) &&
      (!q || `${r.title} ${r.type} ${r.formats}`.toLowerCase().includes(q)),
  );

  return (
    <section id="media-resources" className="scroll-mt-28 bg-[#f7f9fc] py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Media resources"
          title="Approved media resources"
          description={
            <p>
              Rights and version are shown beside each resource. Review usage terms before downloading.{" "}
              <span className="ml-1 inline-block rounded border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 align-middle text-[11px] font-bold tracking-wide text-amber-800 uppercase">
                Demonstration assets
              </span>
            </p>
          }
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setApplied({ query, type });
          }}
          className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:grid-cols-[1fr_360px_auto] md:items-end"
        >
          <label className="block">
            <span className="text-[13px] font-semibold text-ink">Search media resources</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-[15px] text-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[13px] font-semibold text-ink">Resource type</span>
            <span className="relative mt-2 block">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-9 text-[15px] text-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              >
                <option value="all">All types</option>
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </label>
          <button type="submit" className="h-11 rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-navy-700">
            Search
          </button>
        </form>

        <p className="mt-5 text-[13px] text-slate-500" aria-live="polite">
          {results.length} {results.length === 1 ? "resource" : "resources"}
        </p>

        {results.length > 0 ? (
          <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <Reveal key={r.id} delay={i * 60} className="h-full">
                <ResourceCard r={r} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-[15px] text-slate-600">
            No resources match your search.
          </p>
        )}
      </div>
    </section>
  );
}
