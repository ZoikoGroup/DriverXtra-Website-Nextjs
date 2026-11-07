"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, MailCheck, Pencil } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { IMG, REQUEST_TYPES, WHAT_TO_INCLUDE } from "./data";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "type" | "name" | "org" | "email" | "message" | "consent";
type Form = { type: string; name: string; org: string; email: string; deadline: string; tz: string; message: string; consent: boolean };

const EMPTY: Form = { type: "", name: "", org: "", email: "", deadline: "", tz: "UTC", message: "", consent: false };

const input =
  "mt-2 h-11 w-full rounded-lg border bg-white px-3 text-[15px] text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none";
const border = (bad?: boolean) => (bad ? "border-red-400" : "border-slate-300 hover:border-slate-400");
const label = "text-[13px] font-semibold text-ink";

export default function MediaInquirySection() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      type: !form.type,
      name: !form.name.trim(),
      org: !form.org.trim(),
      email: !EMAIL.test(form.email.trim()),
      message: !form.message.trim(),
      consent: !form.consent,
    };
    setErrors(next);
    if (!Object.values(next).some(Boolean)) setSent(true);
  };

  return (
    <section id="media-inquiry" className="scroll-mt-28 bg-whitepy-16 md:py-20">
      <div className={`grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12 ${container}`}>
        <div>
          <PressHeading
            eyebrow="Media inquiry"
            title="Media inquiry"
            description="For journalists and media organizations. There's no response guarantee."
          />

          {sent ? (
            <div role="status" className="mt-5 animate-fade-up rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <span className="mx-auto grid h-12 w-12 animate-pop place-items-center rounded-full bg-brand-light text-gold">
                <MailCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-[17px] font-bold text-ink">Inquiry received</h3>
              <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-slate-600">
                Thanks, {form.name.trim()}. If we can help, Corporate Communications will reply to{" "}
                <strong className="font-semibold text-ink">{form.email.trim()}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY);
                  setSent(false);
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-slate-600 hover:text-ink"
              >
                <Pencil className="h-4 w-4" /> Send another inquiry
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <fieldset>
                <legend className={label}>What is your request about?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {REQUEST_TYPES.map((t) => {
                    const checked = form.type === t;
                    return (
                      <label
                        key={t}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-[15px] text-ink transition-colors ${
                          checked ? "border-ink bg-slate-50" : errors.type ? "border-red-300" : "border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="request-type"
                          value={t}
                          checked={checked}
                          onChange={() => set("type", t)}
                          className="h-4 w-4 accent-ink"
                        />
                        {t}
                      </label>
                    );
                  })}
                </div>
                <p className={`mt-1.5 text-[15px] ${errors.type ? "text-red-600" : "text-ink"}`}>
                  Choose what your request is about.
                </p>
              </fieldset>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["name", "Your name", "text", "name"],
                    ["org", "Publication or organization", "text", "organization"],
                    ["email", "Reply email address", "email", "email"],
                  ] as const
                ).map(([key, text, type, auto]) => (
                  <label key={key} className="block">
                    <span className={label}>{text}</span>
                    <input
                      type={type}
                      autoComplete={auto}
                      value={form[key]}
                      onChange={(e) => set(key, e.target.value)}
                      aria-invalid={errors[key]}
                      className={`${input} ${border(errors[key])}`}
                    />
                    {errors[key] && (
                      <span className="mt-1 block text-xs text-red-600">
                        {key === "email" ? "Enter a valid email address." : "This field is required."}
                      </span>
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <p className={label}>
                  Requested deadline and time zone
                  <br />
                  (optional)
                </p>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    aria-label="Requested deadline"
                    value={form.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                    className={`${input} ${border()} max-w-[240px]`}
                  />
                  <input
                    type="text"
                    aria-label="Time zone"
                    value={form.tz}
                    onChange={(e) => set("tz", e.target.value)}
                    className={`${input} ${border()} w-16 px-2 text-center`}
                  />
                </div>
                <p className="mt-1.5 max-w-[180px] text-[12px] leading-snug text-slate-500">
                  Not an accepted turnaround commitment.
                </p>
              </div>

              <label className="mt-6 block">
                <span className={label}>How can we help?</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={errors.message}
                  className={`${input} ${border(errors.message)} h-auto py-2.5`}
                />
                {errors.message && <span className="mt-1 block text-xs text-red-600">Tell us how we can help.</span>}
              </label>
              <p className="mt-1.5 text-[12px] text-slate-500">
                Don&apos;t include sensitive personal data, or anything under embargo.
              </p>

              <Link href="#faq" className="mt-8 inline-block text-[13px] text-slate-600 underline underline-offset-2 hover:text-ink">
                Read how media inquiry information is handled.
              </Link>

              <label
                className={`mt-3 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[15px] text-ink ${
                  errors.consent ? "border-red-300 bg-red-50/50" : "border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-brand/50 ${
                    form.consent ? "border-ink bg-ink text-brand" : "border-slate-500 bg-white"
                  }`}
                >
                  {form.consent && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                I understand how my information will be used to handle this inquiry.
              </label>
              {errors.consent && <p className="mt-1 text-xs text-red-600">Tick the box to continue.</p>}

              <div className="mt-5 border-t border-slate-200 pt-5">
                <button
                  type="submit"
                  className="btn-shine h-12 rounded-full bg-brand px-6 text-[15px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Send media inquiry
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-3">
          <Reveal direction="zoom">
            <div className="relative aspect-[420/263] overflow-hidden rounded-2xl">
              <Image
                src={`${IMG}/inquiry-press-briefing.webp`}
                alt="Speaker presenting to colleagues in a brick-walled office"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[15px] font-bold text-ink">What to include</h3>
              <ul className="mt-4 space-y-2">
                {WHAT_TO_INCLUDE.map((w) => (
                  <li key={w} className="flex gap-3 text-[15px] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                A deadline isn&apos;t an accepted turnaround. Embargoed material isn&apos;t shared through this form.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[15px] font-bold text-ink">Not a media request?</h3>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-600">
                Support:{" "}
                <Link href="/enterprise-contact" className="underline underline-offset-2 hover:text-ink">
                  Contact DriverXtra
                </Link>{" "}
                · Jobs:{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-ink">
                  Careers
                </Link>{" "}
                · Partnerships:{" "}
                <Link href="/partner-onboarding" className="underline underline-offset-2 hover:text-ink">
                  Partner With Us
                </Link>
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
