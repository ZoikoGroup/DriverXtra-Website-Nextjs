
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { megaMenus, type MegaMenu as MegaMenuData } from "@/lib/megaMenu";

const CLOSE_DELAY = 150;
const VIEWPORT_GUTTER = 16;

export default function MegaMenu() {
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const open = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setActive(label);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(
      () => setActive(null),
      CLOSE_DELAY
    );
  };

  const close = () => {
    window.clearTimeout(closeTimer.current);
    setActive(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  // Align the dropdown panel with the first and last navigation items.
  useEffect(() => {
    const nav = navRef.current;
    const list = listRef.current;

    if (!nav || !list) return;

    const measure = () => {
      const first = list.firstElementChild?.getBoundingClientRect();
      const last = list.lastElementChild?.getBoundingClientRect();

      if (!first || !last) return;

      const navRect = nav.getBoundingClientRect();

      const left = Math.max(
        first.left - navRect.left,
        VIEWPORT_GUTTER
      );

      const right = Math.min(
        last.right - navRect.left,
        navRect.width - VIEWPORT_GUTTER
      );

      nav.style.setProperty("--mega-left", `${left}px`);
      nav.style.setProperty("--mega-width", `${right - left}px`);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    observer.observe(list);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative hidden bg-brand lg:block"
      onMouseLeave={scheduleClose}
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-[1440px] items-center justify-center px-4 xl:gap-1 xl:px-6"
      >
        {megaMenus.map((menu) => {
          const isOpen = active === menu.label;

          return (
            <li
              key={menu.label}
              onMouseEnter={() => open(menu.label)}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => (isOpen ? close() : open(menu.label))}
                className={`group relative flex h-12 items-center gap-1 px-2 font-condensed text-[16px] leading-none font-normal whitespace-nowrap transition-colors duration-300 xl:gap-1.5 xl:px-3 xl:text-[18px] 2xl:px-4 ${
                  isOpen
                    ? "text-white"
                    : "text-nav hover:text-white"
                }`}
              >
                {menu.label}

                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 xl:h-4 xl:w-4 ${
                    isOpen
                      ? "rotate-180"
                      : "group-hover:translate-y-0.5"
                  }`}
                />

                {/* Caret pointing into the open panel */}
                <span
                  className={`absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[7px] border-x-transparent border-b-white transition-all duration-300 ${
                    isOpen
                      ? "opacity-100"
                      : "translate-y-1 opacity-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {megaMenus.map((menu) => (
        <MegaPanel
          key={menu.label}
          menu={menu}
          isOpen={active === menu.label}
          onNavigate={close}
        />
      ))}
    </nav>
  );
}

type MegaPanelProps = {
  menu: MegaMenuData;
  isOpen: boolean;
  onNavigate: () => void;
};

const delay = (ms: number) =>
  ({ "--d": `${ms}ms` }) as CSSProperties;

function MegaPanel({
  menu,
  isOpen,
  onNavigate,
}: MegaPanelProps) {
  return (
    <div
      data-open={isOpen}
      aria-hidden={!isOpen}
      className="mega-panel font-condensed absolute top-full left-[var(--mega-left,1.5rem)] z-40 w-[var(--mega-width,calc(100%-3rem))] overflow-hidden rounded-b-2xl bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/5"
    >
      <div className="grid grid-cols-5 divide-x divide-slate-200">
        {menu.columns.map((col, c) => (
          <div
            key={col.title}
            className="group/col px-3 pt-6 pb-5 xl:px-5"
          >
            <h3
              className={`mega-stagger text-[20px] leading-none font-bold text-ink ${
                menu.uppercaseTitles
                  ? "tracking-wide uppercase"
                  : ""
              }`}
              style={delay(80 + c * 60)}
            >
              {col.title}

              <span className="mt-1.5 block h-[3px] w-6 rounded-full bg-brand transition-all duration-500 group-hover/col:w-12" />
            </h3>

            <ul className="mt-4 space-y-0.5">
              {col.items.map(({ label, icon: Icon, note }, i) => (
                <li
                  key={label}
                  className="mega-stagger"
                  style={delay(120 + c * 60 + i * 35)}
                >
                  <Link
                    href="#"
                    onClick={onNavigate}
                    tabIndex={isOpen ? 0 : -1}
                    className="group/item -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-300 hover:bg-brand-light/70"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink transition-all duration-300 group-hover/item:-rotate-6 group-hover/item:scale-110 group-hover/item:bg-white group-hover/item:text-brand-dark group-hover/item:shadow-sm">
                      <Icon
                        className="h-[22px] w-[22px]"
                        strokeWidth={1.5}
                      />
                    </span>

                    <span className="min-w-0 flex-1 transition-transform duration-300 group-hover/item:translate-x-0.5">
                      <span className="block text-[14px] leading-[1.15] font-normal text-nav transition-colors group-hover/item:text-ink">
                        {label}
                      </span>

                      {note && (
                        <span className="mt-0.5 block text-[11px] leading-none text-slate-400">
                          {note}
                        </span>
                      )}
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MegaBanner
        menu={menu}
        isOpen={isOpen}
        onNavigate={onNavigate}
      />
    </div>
  );
}

function MegaBanner({
  menu,
  isOpen,
  onNavigate,
}: MegaPanelProps) {
  const { banner } = menu;
  const tab = isOpen ? 0 : -1;

  const buttons = (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="#"
        onClick={onNavigate}
        tabIndex={tab}
        className="btn-shine group/btn inline-flex h-11 items-center gap-2 rounded-md bg-brand px-5 text-[18px] font-bold text-ink shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
      >
        {banner.primary}

        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Link>

      {banner.secondary && (
        <Link
          href="#"
          onClick={onNavigate}
          tabIndex={tab}
          className="group/btn inline-flex h-11 items-center gap-2 rounded-md border border-ink bg-white px-4 text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white hover:shadow-lg"
        >
          <banner.secondary.icon className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />

          {banner.secondary.label}
        </Link>
      )}
    </div>
  );

  // One common background image for every dropdown's bottom banner.
 const commonBackground: CSSProperties = {
  backgroundImage:
    "url('/images/menu/mega-menu-bg.jpeg'), linear-gradient(120deg, #0b1220 0%, #1a2440 55%, #2b3550 100%)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

  if (banner.layout === "full") {
    return (
      <div
        className="mega-stagger group/banner relative h-[130px] overflow-hidden"
        style={{
          ...delay(320),
          ...commonBackground,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Existing yellow brand stripes */}
        <span className="absolute -top-6 right-24 h-48 w-10 rotate-[35deg] bg-brand/90 transition-transform duration-700 group-hover/banner:translate-x-3" />

        <span className="absolute -top-6 right-6 h-48 w-16 rotate-[35deg] bg-brand transition-transform duration-700 group-hover/banner:translate-x-3" />

        <div className="relative flex h-full items-center px-7">
          {buttons}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mega-stagger group/banner relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-stretch overflow-hidden"
      style={{
        ...delay(320),
        ...commonBackground,
      }}
    >
      {/* Subtle overlay keeps the button area readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center gap-4 px-7 py-6">
        {buttons}

        {banner.note && (
          <p className="max-w-sm text-[12px] leading-snug text-slate-600">
            {banner.note}
          </p>
        )}
      </div>

      {/* The shared background remains visible on the right */}
      <div className="relative min-h-[140px]" />
    </div>
  );
}
