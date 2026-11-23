"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { categories } from "./data";

const STORAGE_KEY = "dx-cookie-preference";
export const SETTINGS_HASH = "#cookie-settings";

type Preference = { functional: boolean; savedAt: string };

function readPreference(): Preference | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Preference) : null;
  } catch {
    return null;
  }
}

/** Cookie Settings modal. Opens via `open`, or when the URL hash is #cookie-settings (footer link). */
export default function CookieSettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [functional, setFunctional] = useState(true);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) {
      setFunctional(readPreference()?.functional ?? true);
      setStatus("idle");
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  const save = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ functional, savedAt: new Date().toISOString() }));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="cookie-settings-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl p-0 text-ink shadow-2xl backdrop:bg-navy/70"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <h2 id="cookie-settings-title" className="text-xl font-bold">
            Cookie Settings
          </h2>
          <p className="mt-1 text-sm text-slate-600">Choose which optional categories to allow on this device.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Cookie Settings"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 hover:border-slate-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ul className="divide-y divide-slate-200 px-6">
        {categories.map((c) => {
          const locked = c.status !== "active";
          const checked = c.status === "always" || (c.status === "active" && functional);
          return (
            <li key={c.id} className="flex items-start justify-between gap-4 py-4">
              <div>
                <label htmlFor={`setting-${c.id}`} className="text-sm font-bold">
                  {c.name}
                </label>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  {c.status === "always"
                    ? "Always active. The site needs this to work."
                    : c.status === "off"
                      ? "Not in use on this prototype."
                      : c.description}
                </p>
              </div>
              <input
                id={`setting-${c.id}`}
                type="checkbox"
                role="switch"
                checked={checked}
                disabled={locked}
                onChange={(e) => {
                  setFunctional(e.target.checked);
                  setStatus("idle");
                }}
                className="peer relative mt-1 h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-full bg-slate-300 transition-colors before:absolute before:top-0.5 before:left-0.5 before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform checked:bg-ink checked:before:translate-x-5 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              />
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
        <p className="text-sm" role="status">
          {status === "saved" && <span className="font-semibold text-emerald-700">Saved. Your choice is stored on this device.</span>}
          {status === "error" && <span className="font-semibold text-red-700">Couldn&apos;t save. Your browser is blocking storage.</span>}
        </p>
        <button
          type="button"
          onClick={save}
          className="inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-bold text-ink transition-colors hover:bg-brand-dark"
        >
          Save choices
        </button>
      </div>
    </dialog>
  );
}
