"use client";

import { Check, Printer } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { questionsToAsk } from "./data";

/** Printing opens a clean window with just the questions. */
export default function QuestionsChecklist() {
  const print = () => {
    const win = window.open("", "_blank", "width=720,height=640");
    if (!win) return window.print();
    const items = questionsToAsk.map((q) => `<li>${q}</li>`).join("");
    win.document.write(
      `<!doctype html><title>Questions to ask before deciding — DriverXtra</title>` +
        `<style>body{font-family:system-ui,sans-serif;padding:32px;color:#0f172a}h1{font-size:20px}li{margin:10px 0;padding-left:4px}li::marker{content:"☐  "}</style>` +
        `<h1>Questions to ask before deciding</h1><ul>${items}</ul><p style="color:#64748b;font-size:12px">General guidance from DriverXtra. Your insurer's policy wording is what applies.</p>`,
    );
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <Reveal delay={100}>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <ul className="space-y-2.5">
          {questionsToAsk.map((q, i) => (
            <Reveal key={q} as="li" delay={i * 60}>
              <span className="group flex gap-2.5 text-[13px] text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="transition-transform duration-300 group-hover:translate-x-1">{q}</span>
              </span>
            </Reveal>
          ))}
        </ul>
        <button
          type="button"
          onClick={print}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
        >
          <Printer className="h-4 w-4" /> Print checklist
        </button>
      </div>
    </Reveal>
  );
}
