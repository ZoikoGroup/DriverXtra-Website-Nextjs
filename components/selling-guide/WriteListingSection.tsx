"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const TITLE_MAX = 80;
const DESC_MAX = 1500;

const YEAR = /\b(19[5-9]\d|20[0-4]\d)\b/;
const MILEAGE = /\b\d[\d,. ]*\s?k?\s?(miles?|mi|km|kms|kilomet(er|re)s?)\b/i;
const SERVICE = /\b(servic(e|ed|ing)|maintenance|maintained|mot)\b/i;
const FAULTS = /\b(faults?|wear|worn|scratch(es)?|dents?|scuffs?|chips?|damage|issues?|rust|no known)\b/i;
const PHONE = /\+?\d[\d\s().-]{8,}\d/;
const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const ADDRESS = /\b\d+[a-z]?\s+(\w+\s+){0,3}(street|st|road|rd|avenue|ave|lane|ln|drive|dr|close|way|crescent|boulevard|blvd)\b/i;

export default function WriteListingSection() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const all = `${title}\n${desc}`;

  const checks = [
    { label: "Title includes the year", pass: YEAR.test(title) },
    { label: "Mileage is stated", pass: MILEAGE.test(all) },
    { label: "Description is detailed (120+ characters)", pass: desc.trim().length >= 120 },
    { label: "Mentions service history", pass: SERVICE.test(desc) },
    { label: "Mentions known faults or wear", pass: FAULTS.test(desc) },
    {
      label: "No phone numbers, emails or street addresses",
      pass: !PHONE.test(all) && !EMAIL.test(all) && !ADDRESS.test(all),
    },
  ];
  const passed = checks.filter((c) => c.pass).length;

  const field =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand/40";

  return (
    <section id="listing" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Step 5"
          title="Write an honest listing"
          description={
            <>
              Try a draft here to check it. Nothing is saved or published — use{" "}
              <Link href="/list-and-manage"className="underline underline-offset-2 hover:text-ink">
                Create a Listing
              </Link>{" "}
              when you&apos;re ready.
            </>
          }
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:p-6">
              <label htmlFor="draft-title" className="text-sm font-bold text-ink">
                Listing title
              </label>
              <input
                id="draft-title"
                value={title}
                maxLength={TITLE_MAX}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 2019 Example Hatchback 1.0, 42,000 miles"
                className={`${field} h-12`}
              />
              <p className="mt-1 text-xs text-slate-500">
                {title.length} / {TITLE_MAX}
              </p>

              <label htmlFor="draft-desc" className="mt-4 block text-sm font-bold text-ink">
                Description
              </label>
              <textarea
                id="draft-desc"
                value={desc}
                maxLength={DESC_MAX}
                rows={6}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Condition, service history, known faults, why you're selling..."
                className={`${field} resize-y`}
              />
              <p className="mt-1 text-xs text-slate-500">
                {desc.length} / {DESC_MAX}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-ink" aria-live="polite">
                Listing check · {passed} of {checks.length}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {checks.map((c) => (
                  <li key={c.label} className="flex gap-2.5 text-[15px] text-ink">
                    {c.pass ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-label="Passed" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-label="Not yet" />
                    )}
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
