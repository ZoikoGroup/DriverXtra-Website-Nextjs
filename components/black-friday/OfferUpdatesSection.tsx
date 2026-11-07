"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import { container } from "@/components/ui/SectionTitle";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OfferUpdatesSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setError(true);
    setSent(true);
  };

  return (
    <section id="offer-updates" className="bg-[#13243c] py-20 text-white md:py-24">
      <div className={`grid items-center gap-8 lg:grid-cols-2 ${container}`}>
        <div>
          <h2 className="bf-display text-3xl font-extrabold sm:text-4xl">Get Black Friday offer updates</h2>
          <p className="mt-2 text-[16px] text-slate-300">
            We&apos;ll email you when driver-plan offer terms are confirmed.
          </p>
        </div>

        {sent ? (
          <div role="status" className="flex animate-fade-up items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1829] p-5">
            <span className="grid h-11 w-11 shrink-0 animate-pop place-items-center rounded-full bg-[#fcd116] text-[#13243c]">
              <MailCheck className="h-5 w-5" />
            </span>
            <p className="text-[15px] text-slate-200">
              Thanks. We&apos;ll email <strong className="text-white">{email.trim()}</strong> once the offer terms are
              confirmed.{" "}
              <button type="button" onClick={() => setSent(false)} className="font-semibold text-[#fcd116] underline underline-offset-2">
                Change email
              </button>
            </p>
          </div>
        ) : (
          <form noValidate onSubmit={submit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="bf-email" className="sr-only">
                Email address
              </label>
              <input
                id="bf-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                aria-invalid={error}
                aria-describedby={error ? "bf-email-error" : undefined}
                className={`h-[52px] flex-1 rounded-full border bg-[#0d1829] px-5 text-[16px] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#fcd116]/50 focus:outline-none ${
                  error ? "animate-shake border-red-400" : "border-white/15 hover:border-white/30"
                }`}
              />
              <button
                type="submit"
                className="btn-shine h-[52px] rounded-full bg-[#fcd116] px-7 text-[15px] font-bold text-[#13243c] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(252,209,22,0.7)]"
              >
                Get updates
              </button>
            </div>
            {error && (
              <p id="bf-email-error" className="mt-2 animate-fade-up pl-5 text-sm text-red-300">
                Enter a valid email address.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
