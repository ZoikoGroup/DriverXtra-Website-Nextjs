"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Building2,
  Car,
  ChartColumn,
  ChevronRight,
  Code,
  Handshake,
  LayoutGrid,
  Settings,
  ShieldCheck,
  ShieldPlus,
  Star,
  Store,
  Tag,
  Truck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { footerColumns, hrefFor, type LinkGroup } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";

/** How many links each column shows before "View More". */
const VISIBLE_LINKS = 4;
const CLOSE_MS = 300;

/** Column order and icons, matching the footer design (5 per row). */
const columnLayout: { title: string; icon: LucideIcon }[] = [
  { title: "Buy Vehicles", icon: Car },
  { title: "Sell Vehicles", icon: Tag },
  { title: "Vehicle Categories", icon: LayoutGrid },
  { title: "Brands & Discovery", icon: Star },
  { title: "Parts & Accessories", icon: Wrench },
  { title: "Insurance", icon: ShieldPlus },
  { title: "Automotive Services", icon: Settings },
  { title: "Dealers & Retailers", icon: Store },
  { title: "Fleets & Enterprise", icon: Truck },
  { title: "Providers & Parts Sellers", icon: Handshake },
  { title: "Resources & Insights", icon: ChartColumn },
  { title: "Company & Support", icon: Building2 },
  { title: "Developers & Integrations", icon: Code },
  { title: "Vehicle Finance", icon: Banknote },
  { title: "Trust & Safety", icon: ShieldCheck },
];

const columns = columnLayout.map(({ title, icon }) => {
  const group = footerColumns.find((c) => c.title === title);
  if (!group) throw new Error(`Unknown footer column: ${title}`);
  return { ...group, icon };
});

type Column = LinkGroup & { icon: LucideIcon };

export default function FooterLinks() {
  const [active, setActive] = useState<Column | null>(null);
  const [visible, setVisible] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const open = (col: Column) => {
    window.clearTimeout(closeTimer.current);
    setActive(col);
  };

  const close = useCallback(() => {
    setVisible(false);
    closeTimer.current = window.setTimeout(() => setActive(null), CLOSE_MS);
  }, []);

  // Mount first, then flip `visible` on the next frame so the open transition plays.
  useEffect(() => {
    if (!active) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {columns.map((col, i) => {
          const Icon = col.icon;
          const hasMore = col.links.length > VISIBLE_LINKS;
          return (
            <Reveal key={col.title} delay={(i % 5) * 70}>
              <h3 className="group flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-brand/30 bg-brand/10 text-brand transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-ink">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.slice(0, VISIBLE_LINKS).map((link) => (
                  <li key={link}>
                    <Link
                      href={hrefFor(link)}
                      className="link-underline inline text-[13px] leading-snug text-slate-400 hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <button
                  type="button"
                  onClick={() => open(col)}
                  aria-haspopup="dialog"
                  className="group/more mt-2.5 inline-flex items-center gap-1 text-[13px] font-medium text-brand transition-colors hover:text-brand-light"
                >
                  View More...
                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100" />
                </button>
              )}
            </Reveal>
          );
        })}
      </div>

      {active && <LinksModal column={active} visible={visible} onClose={close} />}
    </>
  );
}

type LinksModalProps = {
  column: Column;
  visible: boolean;
  onClose: () => void;
};

function LinksModal({ column, visible, onClose }: LinksModalProps) {
  const Icon = column.icon;
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="footer-links-title"
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-navy-800 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        {/* Top accent bar that draws in */}
        <span
          className={`absolute inset-x-0 top-0 h-1 origin-left bg-brand transition-transform delay-150 duration-700 ease-out ${
            visible ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <h2 id="footer-links-title" className="flex items-center gap-3 text-lg font-bold">
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl bg-brand text-ink transition-transform delay-100 duration-500 ${
                visible ? "scale-100 rotate-0" : "scale-50 -rotate-45"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span>
              {column.title}
              <span className="block text-xs font-normal text-slate-400">{column.links.length} links</span>
            </span>
          </h2>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 hover:rotate-90 hover:border-brand hover:bg-brand hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="relative grid gap-1 p-4 sm:grid-cols-2">
          {column.links.map((link, i) => (
            <li
              key={link}
              className={`transition-all duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              style={{ transitionDelay: visible ? `${150 + i * 45}ms` : "0ms" } as CSSProperties}
            >
              <Link
                href={hrefFor(link)}
                onClick={onClose}
                className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
              >
                <span className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand/50 transition-all duration-300 group-hover:w-3 group-hover:bg-brand" />
                  {link}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-2 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
