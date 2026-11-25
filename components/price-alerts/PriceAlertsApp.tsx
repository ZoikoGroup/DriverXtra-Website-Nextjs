"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { BellRing, Pause, Play, Trash2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { useRegion } from "@/lib/region";
import { currencySymbol, formatMoney, regionCurrency } from "@/components/by-monthly-budget/data";
import {
  channelLabel,
  channels,
  loadDemo,
  parseListing,
  saveDemo,
  savedListings,
  savedSearches,
  type Channel,
  type DemoState,
  type PriceAlert,
  type Rule,
} from "./data";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";
const groupLabel = "text-xs font-bold text-ink";

export default function PriceAlertsApp() {
  const region = useRegion();
  const ids = useId();
  const [demo, setDemo] = useState<DemoState>({ signedIn: false, alerts: [] });
  const [loaded, setLoaded] = useState(false);

  const [kind, setKind] = useState<"vehicle" | "search">("vehicle");
  const [listingInput, setListingInput] = useState("");
  const [searchId, setSearchId] = useState("");
  const [rule, setRule] = useState<Rule>("decrease");
  const [target, setTarget] = useState("");
  const [chosen, setChosen] = useState<Channel[]>(["account"]);
  const [promo, setPromo] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDemo(loadDemo());
    setLoaded(true);
  }, []);

  const update = (next: DemoState) => {
    setDemo(next);
    saveDemo(next);
  };

  const market = `${region} · ${regionCurrency[region].code}`;
  const listing = kind === "vehicle" ? parseListing(listingInput) : null;
  const search = kind === "search" ? savedSearches.find((s) => s.id === searchId) : undefined;
  const watchTitle = listing?.title ?? search?.title ?? null;
  const targetValue = Number(target.replace(/[^0-9.]/g, ""));

  const ruleText =
    rule === "decrease"
      ? `When a verified ${kind === "vehicle" ? "listing" : "matching listing"} price decreases`
      : targetValue > 0
        ? `When the price is at or below ${formatMoney(region, targetValue)}`
        : "When the price is at or below my target";

  const toggleChannel = (c: Channel) =>
    setChosen((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("");
    if (!watchTitle) {
      setError(
        kind === "vehicle"
          ? "Paste a listing link or ID like DX-L-1001, or choose a saved listing."
          : "Choose a saved vehicle search.",
      );
      return;
    }
    if (rule === "target" && !(targetValue > 0)) {
      setError("Enter a target price greater than 0.");
      return;
    }
    if (chosen.length === 0) {
      setError("Choose at least one way to be notified.");
      return;
    }
    setError("");

    const alert: PriceAlert = {
      id: `${Date.now()}`,
      kind,
      title: watchTitle,
      rule,
      target: rule === "target" ? targetValue : undefined,
      channels: chosen,
      market,
      createdAt: new Date().toISOString(),
      paused: false,
    };
    update({ signedIn: true, alerts: [alert, ...demo.alerts] });
    setStatus(`Alert created for ${watchTitle}${demo.signedIn ? "" : " — you're now signed in to the demo account"}.`);
    setListingInput("");
    setSearchId("");
    setTarget("");
  };

  const setPaused = (id: string, paused: boolean) =>
    update({ ...demo, alerts: demo.alerts.map((a) => (a.id === id ? { ...a, paused } : a)) });
  const remove = (id: string) => update({ ...demo, alerts: demo.alerts.filter((a) => a.id !== id) });

  return (
    <>
      {/* ---------- Create ---------- */}
      <section id="create-alert" className="scroll-mt-28 bg-white py-14 md:py-16">
        <div className={container}>
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">Create a price alert</h2>
          </Reveal>

          <form onSubmit={onSubmit} noValidate className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
            <div className="space-y-8">
              <fieldset>
                <legend className={groupLabel}>What would you like to watch?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      ["vehicle", "A specific vehicle"],
                      ["search", "My saved vehicle search"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={kind === value}
                      onClick={() => {
                        setKind(value);
                        setError("");
                      }}
                      className={`h-9 rounded-full px-4 text-xs font-semibold transition-colors ${
                        kind === value ? "bg-ink text-white" : "border border-slate-300 text-ink hover:border-ink"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {kind === "vehicle" ? (
                  <div className="mt-5">
                    <label htmlFor={`${ids}-listing`} className={groupLabel}>
                      Paste a DriverXtra vehicle listing link or select a saved listing.
                    </label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <input
                        id={`${ids}-listing`}
                        value={listingInput}
                        onChange={(e) => setListingInput(e.target.value)}
                        placeholder="e.g. DX-L-1001"
                        autoComplete="off"
                        className={inputClass}
                      />
                      <select
                        aria-label="Saved listings (example)"
                        value={savedListings.some((l) => l.id === listing?.id) ? listing!.id : ""}
                        onChange={(e) => setListingInput(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Saved listings (example)</option>
                        {savedListings.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.title} · {l.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5">
                    <label htmlFor={`${ids}-search`} className={groupLabel}>
                      Choose one of your saved vehicle searches.
                    </label>
                    <select
                      id={`${ids}-search`}
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className={`${inputClass} mt-2 sm:max-w-sm`}
                    >
                      <option value="">Saved searches (example)</option>
                      {savedSearches.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className={groupLabel}>When should we notify you?</legend>
                <div className="mt-3 space-y-2.5">
                  {(
                    [
                      ["decrease", "When a verified listing price decreases"],
                      ["target", "When the price is at or below my target"],
                    ] as const
                  ).map(([value, label]) => (
                    <label key={value} className="flex items-center gap-3 text-[13px] text-slate-700">
                      <input
                        type="radio"
                        name={`${ids}-rule`}
                        checked={rule === value}
                        onChange={() => setRule(value)}
                        className="h-4 w-4 accent-ink"
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {rule === "target" && (
                  <div className="mt-3 sm:max-w-xs">
                    <label htmlFor={`${ids}-target`} className={groupLabel}>
                      Target price
                    </label>
                    <div className="relative mt-1.5">
                      <span aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                        {currencySymbol(region)}
                      </span>
                      <input
                        id={`${ids}-target`}
                        inputMode="decimal"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="16,000"
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className={groupLabel}>Where should we send alerts?</legend>
                <div className="mt-3 space-y-2.5">
                  {channels.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-center gap-3 text-[13px] ${c.offered ? "text-slate-700" : "text-slate-400"}`}
                    >
                      <input
                        type="checkbox"
                        disabled={!c.offered}
                        checked={c.offered && chosen.includes(c.id as Channel)}
                        onChange={() => toggleChannel(c.id as Channel)}
                        className="h-4 w-4 accent-ink"
                      />
                      {c.label}
                    </label>
                  ))}
                </div>
                <p className={`mt-2 text-[13px] ${chosen.length === 0 ? "font-semibold text-red-600" : "text-slate-600"}`}>
                  Choose at least one way to be notified.
                </p>
              </fieldset>

              <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                <input type="checkbox" checked={promo} onChange={(e) => setPromo(e.target.checked)} className="h-4 w-4 accent-ink" />
                Send me separate promotional updates (optional).
              </label>

              <p className="text-[11px] text-slate-500">
                You can pause or stop alerts at any time. See our{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
                  Privacy Notice
                </Link>{" "}
                for how we handle alert data.
              </p>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)] lg:sticky lg:top-28">
              <h3 className="text-[13px] font-bold text-ink">Review your alert</h3>
              <dl className="mt-3 grid grid-cols-[110px_1fr] gap-x-4 gap-y-3 text-xs">
                <dt className="font-bold text-ink">Vehicle or search</dt>
                <dd className={watchTitle ? "font-semibold text-ink" : "text-slate-500"}>{watchTitle ?? "No vehicle chosen yet"}</dd>
                <dt className="font-bold text-ink">Price rule</dt>
                <dd className="text-slate-600">{ruleText}</dd>
                <dt className="font-bold text-ink">Market</dt>
                <dd className="text-slate-600">{market}</dd>
                <dt className="font-bold text-ink">Notification method</dt>
                <dd className="text-slate-600">
                  {chosen.length ? chosen.map((c) => channelLabel[c]).join(", ") : "None chosen"}
                </dd>
              </dl>
              <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
                Only changes after you create the alert count. Earlier price history isn&apos;t replayed.
              </p>
              {error && (
                <p role="alert" className="mt-3 text-xs font-semibold text-red-600">
                  {error}
                </p>
              )}
              <p aria-live="polite" className={status ? "mt-3 text-xs font-semibold text-emerald-700" : "sr-only"}>
                {status}
              </p>
              <button
                type="submit"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-brand text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
              >
                {demo.signedIn ? "Create this alert" : "Sign in to create this alert"}
              </button>
            </aside>
          </form>
        </div>
      </section>

      {/* ---------- My alerts ---------- */}
      <section id="my-alerts" className="scroll-mt-28 bg-slate-50 py-14 md:py-16">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">My price alerts</h2>
              <p className="mt-2 text-sm text-slate-600">Saved on this device for the demo account. No messages are actually sent.</p>
            </div>
            {demo.signedIn && (
              <button
                type="button"
                onClick={() => update({ ...demo, signedIn: false })}
                className="text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                Sign out of demo
              </button>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            {!loaded ? (
              <div className="skeleton mx-auto h-20 max-w-md rounded-xl" />
            ) : !demo.signedIn ? (
              <div className="py-6 text-center">
                <h3 className="text-sm font-bold text-ink">Sign in to see your alerts</h3>
                <p className="mx-auto mt-1 max-w-sm text-[13px] text-slate-500">
                  Alerts belong to your account. In this prototype, a demo account keeps them on this device.
                </p>
                <button
                  type="button"
                  onClick={() => update({ ...demo, signedIn: true })}
                  className="mt-4 inline-flex h-9 items-center rounded-full border border-slate-300 px-4 text-xs font-semibold text-ink transition-colors hover:border-ink"
                >
                  Sign in
                </button>
              </div>
            ) : demo.alerts.length === 0 ? (
              <div className="py-6 text-center">
                <h3 className="text-sm font-bold text-ink">No alerts yet</h3>
                <p className="mt-1 text-[13px] text-slate-500">Create one above and it will appear here.</p>
                <a href="#create-alert" className="mt-4 inline-flex h-9 items-center rounded-full bg-brand px-4 text-xs font-bold text-ink">
                  Create a price alert
                </a>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {demo.alerts.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex min-w-0 gap-3">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${a.paused ? "bg-slate-100 text-slate-400" : "bg-navy text-brand"}`}
                      >
                        <BellRing aria-hidden className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-ink">
                          {a.title}{" "}
                          <span
                            className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              a.paused ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {a.paused ? "Paused" : "Active"}
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {a.rule === "decrease" ? "Verified price decrease" : `At or below ${formatMoney(region, a.target ?? 0)}`} ·{" "}
                          {a.channels.map((c) => channelLabel[c]).join(", ")} · {a.market}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPaused(a.id, !a.paused)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-semibold text-ink hover:border-ink"
                      >
                        {a.paused ? <Play aria-hidden className="h-3.5 w-3.5" /> : <Pause aria-hidden className="h-3.5 w-3.5" />}
                        {a.paused ? "Resume" : "Pause"}
                        <span className="sr-only"> alert for {a.title}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(a.id)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-slate-300 px-3 text-xs font-semibold text-red-600 hover:border-red-500"
                      >
                        <Trash2 aria-hidden className="h-3.5 w-3.5" />
                        Delete
                        <span className="sr-only"> alert for {a.title}</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
