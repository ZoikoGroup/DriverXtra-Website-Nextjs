"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { container } from "@/components/ui/SectionTitle";

/** Automotive Services tab bar — labels match the footer's Automotive Services column. Add an href as each page is built. */
export const serviceTabs = [
  {
    id: "inspection",
    label: "Inspection & Appraisal",
    href: "/inspection-appraisal",
  },
  {
    id: "maintenance",
    label: "Maintenance & Repair",
    href: "/maintenance-repair",
  },
  { id: "tires", label: "Tires & Installation", href: "/tires-installation" },
  {
    id: "transport",
    label: "Vehicle Transport & Shipping",
    href: "/vehicle-transport-shipping",
  },
  { id: "detailing", label: "Detailing & Cosmetics", href: "#" },
  { id: "storage", label: "Storage", href: "#" },
  { id: "roadside", label: "Roadside Assistance", href: "#" },
] as const;
export type ServiceTabId = (typeof serviceTabs)[number]["id"];

/** Sticky services tab bar shared by all automotive service pages. */
export default function ServicesTabBar({ active }: { active: ServiceTabId }) {
  const refs = useRef<Partial<Record<ServiceTabId, HTMLAnchorElement | null>>>(
    {},
  );

  // Keep the active tab visible in the scrollable bar on small screens.
  useEffect(() => {
    refs.current[active]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Automotive services"
      className="sticky top-14 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:top-[104px]"
    >
      <div
        className={`${container} flex gap-6 overflow-x-auto [scrollbar-width:none]`}
      >
        {serviceTabs.map((tab) => {
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
                isActive
                  ? "text-ink after:scale-x-100 after:bg-brand"
                  : "text-slate-600 after:scale-x-0 after:bg-slate-300 hover:text-ink hover:after:scale-x-100"
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
