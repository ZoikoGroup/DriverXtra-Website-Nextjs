"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, RotateCcw, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { routeQuiz, saleRoutes, type RouteId } from "./data";

export default function FindRightWayToSellSection() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answeredCount = Object.keys(answers).length;

  const bestMatch = useMemo<RouteId | null>(() => {
    if (answeredCount < routeQuiz.length) return null;
    const totals: Record<RouteId, number> = { private: 0, instant: 0, tradeIn: 0, consignment: 0 };
    for (const q of routeQuiz) {
      const scores = q.options[answers[q.id]]?.scores ?? {};
      for (const [id, pts] of Object.entries(scores)) totals[id as RouteId] += pts ?? 0;
    }
    return (Object.keys(totals) as RouteId[]).reduce((a, b) => (totals[b] > totals[a] ? b : a));
  }, [answers, answeredCount]);

  const bestTitle = saleRoutes.find((r) => r.id === bestMatch)?.title;

  return (
    <section id="find-the-right-way" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Step 1"
          title="Find the right way to sell"
          description="Answer three quick questions, or compare the routes yourself. Nothing is saved or sent."
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
              <div className="space-y-3">
                {routeQuiz.map((q) => (
                  <fieldset key={q.id} className="rounded-2xl border border-slate-200 p-4">
                    <legend className="px-1 text-[15px] font-bold text-ink">{q.question}</legend>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {q.options.map((opt, i) => {
                        const selected = answers[q.id] === i;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                            className={`h-11 rounded-full border px-4 text-sm font-semibold transition-all ${
                              selected
                                ? "border-ink bg-ink text-white"
                                : "border-slate-200 text-ink hover:-translate-y-0.5 hover:border-slate-400"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>

              <div aria-live="polite" className="mt-4 min-h-6 text-sm">
                {bestTitle ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-light px-4 py-3">
                    <p className="text-ink">
                      Worth a look first: <strong>{bestTitle}</strong>. Compare the others too.
                    </p>
                    <button
                      type="button"
                      onClick={() => setAnswers({})}
                      className="inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Start again
                    </button>
                  </div>
                ) : (
                  answeredCount > 0 && (
                    <p className="text-slate-500">
                      {routeQuiz.length - answeredCount} more to go.
                    </p>
                  )
                )}
              </div>
            </div>
          </Reveal>

          <ul className="space-y-3">
            {saleRoutes.map((route, i) => {
              const isBest = route.id === bestMatch;
              return (
                <Reveal as="li" key={route.id} delay={i * 80}>
                  <article
                    className={`relative flex overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:shadow-md ${
                      isBest ? "border-brand ring-2 ring-brand" : "border-slate-200"
                    }`}
                  >
                    <div className="relative w-28 shrink-0 bg-slate-900 sm:w-36">
                      <Image src={route.imageSrc} alt={route.imageAlt} fill sizes="144px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink">{route.title}</h3>
                        {isBest && (
                          <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-ink">
                            Best match
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{route.description}</p>
                      <ul className="mt-2 space-y-1 text-sm text-ink">
                        <li className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          {route.pro}
                        </li>
                        <li className="flex gap-2">
                          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                          {route.con}
                        </li>
                      </ul>
                      <Link
                        href={route.href}
                        className="mt-2 inline-block text-sm font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                      >
                        {route.linkLabel}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
