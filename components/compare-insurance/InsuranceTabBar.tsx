"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { container } from "@/components/ui/SectionTitle";
import { insuranceTabs, type TabId } from "./data";

/** Sticky insurance tab bar shared by all insurance pages. */
export default function InsuranceTabBar({ active }: { active: TabId }) {
  const refs = useRef<Partial<Record<TabId, HTMLAnchorElement | null>>>({});

  // Keep the active tab visible in the scrollable bar on small screens.
  useEffect(() => {
    refs.current[active]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Insurance" className="sticky top-14 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:top-[104px]">
      <div className={`${container} flex gap-6 overflow-x-auto [scrollbar-width:none]`}>
        {insuranceTabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <Link
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative shrink-0 py-4 text-[13px] font-semibold whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "text-ink after:scale-x-100 after:bg-brand" : "text-slate-600 after:scale-x-0 after:bg-slate-300 hover:text-ink hover:after:scale-x-100"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
