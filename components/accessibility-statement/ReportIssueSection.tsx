"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PolicySection from "@/components/legal/PolicySection";
import { hrefFor } from "@/lib/navigation";
import { reportPages } from "./data";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-ink focus:ring-2 focus:ring-brand/40 focus:outline-none";

export default function ReportIssueSection() {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [notConfirmed, setNotConfirmed] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const status = useRef<HTMLDivElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError(true);
      textarea.current?.focus();
      return;
    }
    setError(false);
    // There's no feedback service in this prototype, so receipt can't be confirmed.
    // The text stays in the form so the person can send it another way.
    setNotConfirmed(true);
    requestAnimationFrame(() => status.current?.focus());
  };

  return (
    <PolicySection
      id="report"
      title="Report an accessibility issue"
      intro={
        <>
          Tell us about anything that made a task difficult. We won&apos;t ask about your health or disability.{" "}
          <Link href={hrefFor("Privacy Policy")} className="text-ink underline underline-offset-2 hover:text-blue-700">
            How we handle information submitted here
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={submit} className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
        <label htmlFor="report-page" className="text-xs font-bold text-ink">
          Where did the issue happen?
        </label>
        <div className="relative mt-2">
          <select id="report-page" defaultValue="" className={`${field} h-10 appearance-none pr-9`}>
            <option value="">Choose a page (optional)</option>
            {reportPages.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        <label htmlFor="report-description" className="mt-8 block text-xs font-bold text-ink">
          What made the task difficult or inaccessible?
        </label>
        <textarea
          ref={textarea}
          id="report-description"
          rows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={error}
          aria-describedby="report-description-hint report-description-error"
          className={`${field} mt-2 py-2.5 ${error ? "border-red-600" : ""}`}
        />
        <p id="report-description-hint" className="mt-1.5 text-[11px] text-slate-500">
          For example: what you were trying to do, and what happened.
        </p>
        {error && (
          <p id="report-description-error" className="mt-1 text-xs font-semibold text-red-700">
            Describe the issue before sending.
          </p>
        )}

        <label htmlFor="report-email" className="mt-5 block text-xs font-bold text-ink">
          How may we contact you about this report? (optional)
        </label>
        <input
          id="report-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          aria-describedby="report-email-hint"
          className={`${field} mt-2 h-10`}
        />
        <p id="report-email-hint" className="mt-1.5 text-[11px] text-slate-500">
          Leave empty to report anonymously.
        </p>

        <button
          type="submit"
          className="mt-6 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink transition-colors hover:bg-brand-dark"
        >
          Send accessibility feedback
        </button>

        {notConfirmed && (
          <div
            ref={status}
            tabIndex={-1}
            role="status"
            className="mt-5 rounded-xl border border-brand-dark bg-brand-light p-4 text-sm text-ink focus:outline-none"
          >
            <p className="font-bold">Receipt not confirmed</p>
            <p className="mt-1 text-slate-700">
              We couldn&apos;t confirm your report was received. Your text is still in the form — copy it and send it
              through the{" "}
              <Link href={hrefFor("Help Center")} className="font-semibold underline underline-offset-2">
                Help Center
              </Link>{" "}
              or{" "}
              <Link href={hrefFor("Contact DriverXtra")} className="font-semibold underline underline-offset-2">
                Contact DriverXtra
              </Link>
              .
            </p>
          </div>
        )}
      </form>
    </PolicySection>
  );
}
