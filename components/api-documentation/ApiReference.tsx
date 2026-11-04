"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, Lock, ThumbsDown, ThumbsUp, TriangleAlert } from "lucide-react";
import CodeSample from "@/components/developer-hub/CodeSample";
import { hrefFor } from "@/lib/navigation";
import { accessClasses, families, guides, operations, tocSections, versions, type AccessClass, type Guide, type Operation } from "./data";

type View = { kind: "operation"; id: string } | { kind: "guide"; id: string };

const methodStyle = { GET: "bg-brand text-ink", POST: "bg-sky-100 text-sky-800" };

function AccessDot({ access, className = "" }: { access: AccessClass; className?: string }) {
  const s = accessClasses[access];
  return (
    <span className={`inline-flex items-center gap-1.5 ${s.text} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const th = "py-3 pr-4 text-left font-semibold text-slate-500";
const td = "py-3 pr-4 align-top";
const sectionClass = "scroll-mt-40 border-t border-slate-200 pt-6";

/** Three-column API reference: navigation, the selected page, and "On this page". */
export default function ApiReference() {
  const [view, setView] = useState<View>({ kind: "operation", id: "list-listings" });
  const [version, setVersion] = useState(versions[0].id);
  const [activeSection, setActiveSection] = useState(tocSections[0].id);
  const [navOpen, setNavOpen] = useState(false);

  const operation = view.kind === "operation" ? operations.find((o) => o.id === view.id)! : null;
  const guide = view.kind === "guide" ? guides.find((g) => g.id === view.id)! : null;
  const showToc = !!operation && operation.access === "public";

  // Highlight the section currently in view.
  useEffect(() => {
    if (!showToc) return;
    const els = tocSections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showToc, view, version]);

  const open = (next: View) => {
    setView(next);
    setNavOpen(false);
    setActiveSection(tocSections[0].id);
    document.getElementById("reference")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItem = (active: boolean) =>
    `flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-300 ${
      active ? "bg-ink text-white shadow" : "text-ink hover:translate-x-1 hover:bg-slate-100"
    }`;

  return (
    <div id="reference" className="grid scroll-mt-28 gap-8 lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_170px]">
      <aside className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto">
        <button
          type="button"
          onClick={() => setNavOpen((o) => !o)}
          aria-expanded={navOpen}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink lg:hidden"
        >
          Reference menu
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${navOpen ? "rotate-180" : ""}`} />
        </button>
        <div className={`${navOpen ? "mt-4 block" : "hidden"} space-y-5 lg:block`}>
          <div>
            <label htmlFor="api-family" className="text-[12px] font-bold text-ink">
              API family
            </label>
            <span className="relative mt-1.5 block">
              <select
                id="api-family"
                defaultValue="listings"
                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              >
                {families.map((f) => (
                  <option key={f.id} value={f.id} disabled={!f.published}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </div>
          <div>
            <label htmlFor="api-version" className="text-[12px] font-bold text-ink">
              Version
            </label>
            <span className="relative mt-1.5 block">
              <select
                id="api-version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
              >
                {versions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </span>
          </div>

          <nav aria-label="Reference">
            <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">Reference</p>
            <ul className="mt-2 space-y-1">
              {operations.map((o) => {
                const active = view.kind === "operation" && view.id === o.id;
                return (
                  <li key={o.id}>
                    <button type="button" onClick={() => open({ kind: "operation", id: o.id })} aria-current={active ? "page" : undefined} className={navItem(active)}>
                      {o.access === "public" ? (
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${active ? methodStyle[o.method] : "bg-emerald-50 text-emerald-700"}`}>{o.method}</span>
                      ) : (
                        <Lock className="h-3.5 w-3.5" />
                      )}
                      {o.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">Guides</p>
            <ul className="mt-2 space-y-1">
              {guides.map((g) => {
                const active = view.kind === "guide" && view.id === g.id;
                return (
                  <li key={g.id}>
                    <button type="button" onClick={() => open({ kind: "guide", id: g.id })} aria-current={active ? "page" : undefined} className={navItem(active)}>
                      <FileText className="h-4 w-4" />
                      {g.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">Access classes</p>
            <ul className="mt-2 space-y-1.5 text-[13px]">
              {(Object.keys(accessClasses) as AccessClass[]).map((a) => (
                <li key={a}>
                  <AccessDot access={a} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <article key={`${view.kind}-${view.id}-${version}`} className="min-w-0 animate-fade-up">
        <div className="relative aspect-[507/95] overflow-hidden rounded-2xl">
          <Image src="/images/api-documentation/reference-banner.webp" alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-navy/10" />
        </div>
        {version !== versions[0].id && (
          <p role="status" className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[13px] text-amber-900">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            You&apos;re viewing a deprecated version. It keeps working for a published period, then is retired — switch to {versions[0].id} for new work.
          </p>
        )}
        {operation ? <OperationView op={operation} version={version} /> : guide && <GuideView guide={guide} />}
        <Feedback key={`${view.kind}-${view.id}`} />
      </article>

      {showToc && (
        <nav aria-label="On this page" className="hidden xl:sticky xl:top-32 xl:block xl:self-start">
          <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">On this page</p>
          <ul className="mt-3 space-y-0.5 border-l border-slate-200">
            {tocSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`-ml-px block border-l-2 py-1 pl-3 text-[13px] transition-colors ${
                    activeSection === s.id ? "border-brand font-semibold text-ink" : "border-transparent text-slate-500 hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function Header({ op }: { op: Operation }) {
  return (
    <>
      <p className="mt-5 flex flex-wrap items-center gap-3 text-[13px] font-semibold text-gold">
        <span className="h-px w-6 bg-brand" />
        Listings (demo) · Reference
        <span className="rounded border border-dashed border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">Demonstration reference</span>
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{op.title}</h2>
      <p className="mt-3 flex flex-wrap items-center gap-2 text-[14px] text-slate-600">
        <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-bold ${methodStyle[op.method]}`}>{op.method}</span>
        <code className="font-mono text-[13px] text-ink">{op.path}</code>
      </p>
      <p className="mt-2 text-[15px] text-slate-700">{op.summary}</p>
    </>
  );
}

function OperationView({ op, version }: { op: Operation; version: string }) {
  if (op.access !== "public") {
    return (
      <>
        <Header op={op} />
        <div className="mt-6 animate-fade-up rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <Lock className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-[16px] font-bold text-ink">Partner-restricted reference</h3>
          <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-slate-700">
            Parameters, schemas and examples for this operation are shown only to verified organizations with the{" "}
            <code className="rounded bg-white px-1 font-mono text-[12px]">{op.scope}</code> scope approved.
          </p>
          <Link
            href={`${hrefFor("Developer Hub")}#request-access`}
            className="btn-shine group mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Request technical access
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </>
    );
  }

  const params = op.params.filter((p) => !p.since || p.since <= version);
  const changes = op.changes.filter((c) => c.version <= version).reverse();
  const isCurrent = version === versions[0].id;

  return (
    <>
      <Header op={op} />
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Version", version],
          ["Status", isCurrent ? "Current" : "Deprecated"],
          ["Owner", op.owner],
          ["Last reviewed", op.reviewed],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60">
            <dt className="text-[11px] font-semibold text-slate-500">{label}</dt>
            <dd className={`mt-1.5 text-[13px] ${label === "Status" ? (isCurrent ? "text-emerald-700" : "text-amber-700") : "text-ink"}`}>
              {label === "Status" && <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${isCurrent ? "bg-emerald-500" : "bg-amber-500"}`} />}
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-slate-500">
        <AccessDot access={op.access} /> · Lifecycle: Stable · Environments: demonstration only
      </p>

      <div className="mt-8 space-y-8">
        <section id="authentication" className="scroll-mt-40">
          <h3 className="text-lg font-bold text-ink">Authentication</h3>
          <p className="mt-2 text-[14px] text-slate-700">
            Bearer token with scope <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px] text-ink">{op.scope}</code>
          </p>
        </section>

        <section id="parameters" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Parameters</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead className="border-b border-slate-200">
                <tr>
                  {["Name", "In", "Type", "Required", "Description"].map((h) => (
                    <th key={h} className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {params.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 transition-colors hover:bg-brand-light/40">
                    <td className={`${td} font-mono text-[12px] text-slate-700`}>{p.name}</td>
                    <td className={td}>{p.in}</td>
                    <td className={td}>{p.type}</td>
                    <td className={td}>{p.required ? "Required" : "Optional"}</td>
                    <td className={`${td} max-w-[220px] text-slate-600`}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="request-body" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Request body</h3>
          <p className="mt-2 text-[14px] text-slate-700">{op.requestBody}</p>
        </section>

        <section id="responses" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Responses</h3>
          <div className="mt-3 border-b border-slate-200">
            <span className="inline-block border-b-2 border-brand px-3 pb-2 text-sm font-bold text-ink">{op.responseStatus}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead className="border-b border-slate-200">
                <tr>
                  {["Property", "Type", "Presence", "Description"].map((h) => (
                    <th key={h} className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {op.properties.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 transition-colors hover:bg-brand-light/40">
                    <td className={`${td} font-mono text-[12px] text-slate-700 ${p.nested ? "pl-4" : ""}`}>{p.name}</td>
                    <td className={td}>{p.type}</td>
                    <td className={td}>{p.presence}</td>
                    <td className={`${td} max-w-[220px] text-slate-600`}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="example" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Example</h3>
          <div className="mt-3">
            <CodeSample code={op.example} filename="HTTP" label="Synthetic" copyLabel="Copy example" />
          </div>
        </section>

        <section id="errors" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Errors</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead className="border-b border-slate-200">
                <tr>
                  {["Status", "Code", "Meaning", "Safe to retry?"].map((h) => (
                    <th key={h} className={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {op.errors.map((e) => (
                  <tr key={e.status} className="border-b border-slate-100 transition-colors hover:bg-brand-light/40">
                    <td className={`${td} font-semibold text-slate-600`}>{e.status}</td>
                    <td className={`${td} font-mono text-[12px]`}>{e.code}</td>
                    <td className={`${td} text-slate-600`}>{e.meaning}</td>
                    <td className={td}>{e.retry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="pagination" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Pagination &amp; retries</h3>
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-ink">Pagination</dt>
            <dd className="text-slate-700">{op.pagination}</dd>
            <dt className="font-semibold text-ink">Idempotency</dt>
            <dd className="text-slate-700">{op.idempotency}</dd>
          </dl>
        </section>

        <section id="limits" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Limits</h3>
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-ink">Rate limit</dt>
            <dd className="text-slate-700">Not specified. Rate-limit details are not documented for this operation. Confirm current terms before relying on any assumed limit.</dd>
            <dt className="font-semibold text-ink">Timeout</dt>
            <dd className="text-slate-700">Not specified.</dd>
            <dt className="font-semibold text-ink">Service health</dt>
            <dd>
              <Link href={hrefFor("Platform Status")} className="text-ink underline underline-offset-4 transition-colors hover:text-gold">
                View Platform Status
              </Link>
            </dd>
          </dl>
        </section>

        <section id="compatibility" className={sectionClass}>
          <h3 className="text-lg font-bold text-ink">Compatibility &amp; changes</h3>
          <ul className="mt-3 space-y-3">
            {changes.map((c) => (
              <li key={c.version} className="border-l-2 border-slate-300 pl-3 transition-colors hover:border-brand">
                <p className="text-[15px] font-bold text-ink">{c.version}</p>
                <p className="text-[12px] text-slate-500">
                  {c.note}
                  {versions.find((v) => v.id === c.version)?.status === "deprecated" && " — deprecated"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function GuideView({ guide }: { guide: Guide }) {
  return (
    <>
      <p className="mt-5 flex items-center gap-3 text-[13px] font-semibold text-gold">
        <span className="h-px w-6 bg-brand" />
        Listings (demo) · Guide
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">{guide.title}</h2>
      <p className="mt-2 text-[15px] text-slate-700">{guide.summary}</p>
      <div className="mt-8 space-y-8">
        {guide.sections.map((s, i) => (
          <section key={s.heading} className={i ? "border-t border-slate-200 pt-6" : ""}>
            <h3 className="text-lg font-bold text-ink">{s.heading}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{s.body}</p>
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] text-slate-700 marker:text-brand-dark">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

function Feedback() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-10 border-t border-slate-200 pt-6">
      {answer ? (
        <p role="status" className="animate-fade-up text-[14px] font-semibold text-ink">
          {answer === "yes" ? "Thanks — glad it helped." : "Thanks — we'll use this to improve the page."}
        </p>
      ) : (
        <>
          <p className="text-[14px] font-semibold text-ink">Did this page help you find what you needed?</p>
          <div className="mt-3 flex gap-2">
            {(["yes", "no"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAnswer(a)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink capitalize transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
              >
                {a === "yes" ? <ThumbsUp className="h-3.5 w-3.5" /> : <ThumbsDown className="h-3.5 w-3.5" />}
                {a}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-slate-500">Anonymous. Never include keys, tokens or personal data.</p>
    </div>
  );
}
