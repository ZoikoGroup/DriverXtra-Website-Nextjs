"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "./InsuranceTabBar";
import { panels, type InPageTabId, type InfoPanel, type TabId } from "./data";

type Props = {
  initialTab: InPageTabId;
  /** Content of the "Compare Insurance" tab (rendered on the server). */
  children: ReactNode;
};

export default function InsuranceTabs({ initialTab, children }: Props) {
  const [tab, setTab] = useState<InPageTabId>(initialTab);
  const barRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Bring the panel's start into view if the visitor had scrolled past the tab bar.
  const revealPanel = () => {
    const bar = barRef.current;
    if (!bar) return;
    const top = bar.parentElement!.getBoundingClientRect().top + window.scrollY;
    const headerOffset = window.innerWidth >= 1024 ? 104 : 56;
    if (window.scrollY > top - headerOffset) window.scrollTo({ top: top - headerOffset, behavior: "smooth" });
  };

  // The bar only calls this for tabs without their own page.
  const select = (id: TabId) => {
    setTab(id as InPageTabId);
    window.history.replaceState(null, "", id === "compare" ? window.location.pathname : `${window.location.pathname}?tab=${id}`);
    revealPanel();
  };

  // Menu links such as ?tab=coverage-guide while already on this page.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setTab(initialTab);
    revealPanel();
  }, [initialTab]);

  return (
    <div>
      <div ref={barRef}>
        <InsuranceTabBar active={tab} onSelect={select} />
      </div>

      <div key={tab} className="animate-fade-up">
        {tab === "compare" ? children : <Panel panel={panels[tab]} onExplore={() => select("compare")} />}
      </div>
    </div>
  );
}

function Panel({ panel, onExplore }: { panel: InfoPanel; onExplore: () => void }) {
  return (
    <section className="bg-white py-16">
      <div className={container}>
        <SectionTitle eyebrow={panel.eyebrow} title={panel.title} className="max-w-3xl" />
        <Reveal delay={150}>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">{panel.intro}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {panel.cards.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <div className="group h-full rounded-2xl border border-slate-200 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light text-gold transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-8 grid items-center gap-6 rounded-2xl bg-slate-50 p-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-[15px] font-bold text-ink">{panel.checklistTitle}</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {panel.checklist.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={onExplore}
              className="btn-shine group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(232,172,0,0.7)]"
            >
              Compare insurance <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
