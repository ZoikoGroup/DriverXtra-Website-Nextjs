"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";

const pseudocode = `// Pseudocode — see API Documentation for real contracts
request  = build_request(resource: "listings",
                         version: "check current docs")
response = send(request, auth: YOUR_APPROVED_CREDENTIAL)

if response.status is error:
    log(response.request_id)   // never log secrets
    retry_with_backoff()`;

type Props = { code?: string; filename?: string; label?: string; copyLabel?: string };

/** Dark code card with a copy button. Defaults to the illustrative Developer Hub pseudocode. */
export default function CodeSample({ code = pseudocode, filename = "example.pseudo", label = "Illustrative · not executable", copyLabel = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/25" />
            ))}
          </span>
          <span className="text-xs font-semibold text-white">{filename}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] font-semibold text-brand sm:inline">{label}</span>
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/20 px-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
          >
            {copied ? <Check className="h-3.5 w-3.5 animate-pop text-emerald-400" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : copyLabel}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-relaxed text-slate-300 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
