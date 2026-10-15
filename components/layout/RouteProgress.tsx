"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Thin yellow bar across the top of the screen while moving between pages. */
export default function RouteProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Start when an internal link to a different page is clicked.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      clearTimers();
      setVisible(true);
      setWidth(12);
      timers.current.push(window.setTimeout(() => setWidth(45), 120));
      timers.current.push(window.setTimeout(() => setWidth(75), 600));
      timers.current.push(window.setTimeout(() => setWidth(88), 1600));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Finish when the new page is showing.
  useEffect(() => {
    if (!visible) return;
    clearTimers();
    setWidth(100);
    timers.current.push(window.setTimeout(() => setVisible(false), 350));
    timers.current.push(window.setTimeout(() => setWidth(0), 700));
  }, [pathname]);

  useEffect(() => clearTimers, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]">
      <div
        className={`h-full bg-gradient-to-r from-brand-dark via-brand to-brand-light shadow-[0_0_10px_rgba(255,194,14,0.9)] transition-[width,opacity] ease-out ${
          visible ? "opacity-100 duration-500" : "opacity-0 duration-300"
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
