"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LOADER_DONE_EVENT } from "@/components/ui/Reveal";

const MIN_VISIBLE_MS = 1400;
/** Never trap visitors behind the loader if an asset hangs. */
const MAX_VISIBLE_MS = 6000;
const EXIT_MS = 900;

/**
 * Full-screen intro shown on a hard page load. It's server-rendered so it covers
 * the page from the very first paint, then lifts away once the page has loaded.
 */
export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const minTime = reduceMotion ? 300 : MIN_VISIBLE_MS;
    document.body.style.overflow = "hidden";

    let frame = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      window.setTimeout(
        () => {
          setPhase("exit");
          document.body.style.overflow = "";
          // Let page animations start as the curtain lifts.
          delete document.documentElement.dataset.loading;
          window.dispatchEvent(new Event(LOADER_DONE_EVENT));
          window.setTimeout(() => setPhase("done"), reduceMotion ? 0 : EXIT_MS);
        },
        reduceMotion ? 0 : 350,
      );
    };

    // Ease toward 90% while loading; jump to 100% once the page and minimum time are done.
    const tick = () => {
      const elapsed = performance.now() - start;
      setProgress((p) => {
        const target = loaded.current ? 100 : 90;
        return Math.min(target, p + Math.max(0.4, (target - p) * 0.06));
      });
      if (loaded.current && elapsed >= minTime) {
        finish();
        return;
      }
      if (elapsed >= MAX_VISIBLE_MS) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onLoad = () => {
      loaded.current = true;
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const percent = Math.round(progress);

  return (
    <div
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label={`Loading DriverXtra, ${percent}%`}
      className="dx-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy text-white"
    >
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="dx-loader-glow pointer-events-none absolute h-[460px] w-[460px] rounded-full bg-brand/25 blur-3xl" />

      <div className="dx-loader-content relative flex w-[min(340px,80vw)] flex-col items-center">
        <div className="dx-loader-logo relative overflow-hidden rounded-full bg-white px-7 py-3.5 shadow-[0_20px_60px_-15px_rgba(255,194,14,0.45)]">
          <Image src="/logo.png" alt="DriverXtra" width={684} height={120} priority className="h-8 w-auto sm:h-9" />
        </div>

        <p className="dx-loader-rise mt-6 text-center text-xs font-medium tracking-[0.2em] text-slate-400 uppercase [animation-delay:0.25s]">
          Global Automotive Commerce
        </p>

        {/* Road progress with a car riding the leading edge */}
        <div className="dx-loader-rise relative mt-10 w-full [animation-delay:0.4s]">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="nf-road-line absolute inset-0 opacity-15" />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-dark to-brand shadow-[0_0_14px_rgba(255,194,14,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="absolute -top-[26px] -translate-x-1/2" style={{ left: `${progress}%` }} aria-hidden="true">
            <svg viewBox="0 0 64 28" className="h-6 w-14 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              <path d="M4 18c0-3 2-5 5-5.5l9-2 8-6c2-1.5 4-2 6.5-2h12c3 0 5.5 1 7.5 3l6 6 6 1.2c2.4.5 4 2.5 4 5V20c0 1-1 2-2 2H6c-1 0-2-1-2-2v-2z" fill="#ffc20e" />
              <path d="M28 6.5c1.5-1 3-1.5 5-1.5h5v7H22l6-5.5zM41 5h4c2 0 4 1 5.5 2.4L55 12H41V5z" fill="#0b1220" opacity="0.85" />
              {[16, 50].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy="22" r="5" fill="#0b1220" />
                  <g className="nf-spin">
                    <circle cx={cx} cy="22" r="2.6" fill="#cbd5e1" />
                    <path d={`M${cx} 19.4v5.2M${cx - 2.6} 22h5.2`} stroke="#64748b" strokeWidth="0.9" />
                  </g>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="dx-loader-rise mt-4 flex w-full items-center justify-between text-xs [animation-delay:0.5s]">
          <span className="text-slate-400">{percent < 100 ? "Preparing your experience" : "Ready"}</span>
          <span className="font-bold text-brand tabular-nums">{percent}%</span>
        </div>
      </div>

      {/* Yellow edge that trails the curtain as it lifts */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-brand" />
    </div>
  );
}
