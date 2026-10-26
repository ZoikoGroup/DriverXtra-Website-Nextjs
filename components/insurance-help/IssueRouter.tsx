"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, UserRound } from "lucide-react";
import { TOPIC_EVENT } from "./HelpTopics";
import { helpTopics, routerResults, routerSteps } from "./data";

/** Walks the visitor to who owns their issue and a safe next step. */
export default function IssueRouter() {
  // Each entry is the option chosen at that step.
  const [path, setPath] = useState<{ step: string; label: string; next: string }[]>([]);

  const current = path.length ? path[path.length - 1].next : "start";
  const step = routerSteps[current];
  const result = routerResults[current];

  const choose = (label: string, next: string) => setPath((p) => [...p, { step: current, label, next }]);
  const back = () => setPath((p) => p.slice(0, -1));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {path.length > 0 && (
        <ol className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
          {path.map((p, i) => (
            <li key={i} className="flex animate-fade-up items-center gap-1.5">
              {i > 0 && <ArrowRight className="h-3 w-3" />}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-ink">{p.label}</span>
            </li>
          ))}
        </ol>
      )}

      <div key={current} className="animate-fade-up">
        {step && (
          <>
            <p className="text-[13px] font-semibold text-ink">
              {path.length + 1}. {step.question}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {step.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => choose(o.label, o.next)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white hover:shadow-md"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </>
        )}

        {result && (
          <div className="rounded-xl bg-slate-50 p-4">
            <span className="inline-flex animate-pop items-center gap-1.5 rounded-full border border-brand/60 bg-brand-light px-2.5 py-0.5 text-[11px] font-bold text-gold">
              <UserRound className="h-3 w-3" /> Handled by: {result.owner}
            </span>
            <h3 className="mt-2 text-[15px] font-bold text-ink">{result.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{result.text}</p>
            {result.topic && (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent(TOPIC_EVENT, { detail: result.topic }))}
                className="group mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-ink underline underline-offset-4 hover:text-gold"
              >
                Read answers on {helpTopics.find((t) => t.id === result.topic)!.label.toLowerCase()}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        )}
      </div>

      {path.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" onClick={back} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back
          </button>
          {result && (
            <button type="button" onClick={() => setPath([])} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink">
              <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" /> Start again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
