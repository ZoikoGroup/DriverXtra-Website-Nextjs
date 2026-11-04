"use client";

import { useState } from "react";
import { ChevronDown, CircleAlert, CircleCheck, CircleX, KeyRound, RotateCcw, Search } from "lucide-react";

type Outcome = { tone: "ok" | "warn" | "error"; title: string; text: string };

const keyFor = (n: number) => `idem_${String(n).padStart(4, "0")}`;

const toneStyles = {
  ok: { icon: CircleCheck, box: "border-emerald-200 bg-emerald-50", text: "text-emerald-800" },
  warn: { icon: CircleAlert, box: "border-amber-200 bg-amber-50", text: "text-amber-800" },
  error: { icon: CircleX, box: "border-red-200 bg-red-50", text: "text-red-800" },
};

/**
 * A synthetic idempotency demo: the same key and details replay the stored outcome,
 * changed details are rejected and a timeout has to be looked up before retrying.
 */
export default function RetrySimulator() {
  const [keyNo, setKeyNo] = useState(1);
  const [quantity, setQuantity] = useState("1");
  // What the simulated server has stored per idempotency key.
  const [stored, setStored] = useState<Record<string, { quantity: string; txn: string }>>({});
  const [txnCount, setTxnCount] = useState(0);
  const [log, setLog] = useState<(Outcome & { id: number })[]>([]);
  const [unknown, setUnknown] = useState(false);

  const key = keyFor(keyNo);
  const push = (o: Outcome) => setLog((l) => [{ ...o, id: (l[0]?.id ?? 0) + 1 }, ...l].slice(0, 4));

  const send = (timeout: boolean) => {
    const existing = stored[key];
    if (existing && existing.quantity !== quantity) {
      push({ tone: "error", title: "Rejected — key reused with changed details", text: `${key} was first sent with quantity ${existing.quantity}. Use a new key for a new request.` });
      return;
    }
    let txn = existing?.txn;
    if (!txn) {
      txn = `TXN-${String(txnCount + 1).padStart(3, "0")}`;
      setTxnCount((c) => c + 1);
      setStored((s) => ({ ...s, [key]: { quantity, txn: txn! } }));
    }
    if (timeout) {
      setUnknown(true);
      push({ tone: "warn", title: "Network timeout — outcome unknown", text: "The request may have been processed. Look up the key before you retry." });
      return;
    }
    setUnknown(false);
    push(
      existing
        ? { tone: "ok", title: `Replayed — same outcome ${txn}`, text: "The stored result was returned. No second transaction was created." }
        : { tone: "ok", title: `Request received — ${txn}`, text: `Quantity ${quantity} recorded against ${key}.` },
    );
  };

  const lookUp = () => {
    const existing = stored[key];
    setUnknown(false);
    push(
      existing
        ? { tone: "ok", title: `Found ${existing.txn} for ${key}`, text: "It was processed. Don't resend — use this outcome." }
        : { tone: "warn", title: `Nothing stored for ${key}`, text: "It's safe to send again with the same key." },
    );
  };

  const newKey = () => {
    setKeyNo((n) => n + 1);
    setUnknown(false);
  };

  const ghost = "inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          Try it — simulation
          <span className="rounded border border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold uppercase">Synthetic</span>
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[12px] text-slate-500">
          <KeyRound className="h-3.5 w-3.5" /> {key}
        </span>
      </div>

      <label htmlFor="retry-quantity" className="mt-4 block text-[12px] font-semibold text-ink">
        Quantity on the request
      </label>
      <span className="relative mt-1.5 block">
        <select
          id="retry-quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white pr-9 pl-3 text-sm text-ink transition-colors hover:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none"
        >
          {["1", "2", "3", "4"].map((q) => (
            <option key={q}>{q}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => send(false)}
          className="btn-shine inline-flex h-9 items-center rounded-full bg-brand px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
        >
          Send request
        </button>
        <button type="button" onClick={() => send(true)} className={ghost}>
          Send with network timeout
        </button>
        <button type="button" onClick={newKey} className={ghost}>
          <RotateCcw className="h-3.5 w-3.5" /> New key
        </button>
        {unknown && (
          <button type="button" onClick={lookUp} className={`${ghost} animate-pop border-ink bg-ink text-brand hover:bg-ink/90`}>
            <Search className="h-3.5 w-3.5" /> Look up by key
          </button>
        )}
      </div>

      {log.length > 0 && (
        <ul aria-live="polite" className="mt-4 space-y-2">
          {log.map((o, i) => {
            const s = toneStyles[o.tone];
            return (
              <li key={o.id} className={`flex animate-fade-up gap-2 rounded-lg border p-3 ${s.box} ${i > 0 ? "opacity-60" : ""}`}>
                <s.icon className={`mt-0.5 h-4 w-4 shrink-0 ${s.text}`} />
                <span>
                  <span className={`block text-[13px] font-semibold ${s.text}`}>{o.title}</span>
                  <span className="block text-[12px] text-slate-600">{o.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
