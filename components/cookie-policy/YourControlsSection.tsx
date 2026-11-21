"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import PolicySection from "@/components/legal/PolicySection";
import CookieSettingsDialog, { SETTINGS_HASH } from "./CookieSettingsDialog";

const steps = [
  <>
    Select <strong className="text-ink">Open Cookie Settings</strong> on this page or in the site footer.
  </>,
  "Choose which optional categories to allow. Strictly necessary storage can't be turned off because the site needs it.",
  "Save. We'll confirm only once your choice is stored.",
];

export default function YourControlsSection() {
  const [open, setOpen] = useState(false);

  // The footer's "Cookie Settings" link points to /cookie-policy#cookie-settings.
  useEffect(() => {
    const sync = () => window.location.hash === SETTINGS_HASH && setOpen(true);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = () => {
    setOpen(false);
    if (window.location.hash === SETTINGS_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <PolicySection id="controls" title="Your controls">
      <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-slate-600 marker:font-semibold marker:text-ink">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-ink transition-colors hover:bg-brand-dark print:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Open Cookie Settings
      </button>
      <CookieSettingsDialog open={open} onClose={close} />
    </PolicySection>
  );
}
