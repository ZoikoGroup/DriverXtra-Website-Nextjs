import Link from "next/link";
import { Check, Lock, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hiddenDetailChecks } from "./data";

export default function PrivacySection() {
  return (
    <section id="privacy" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Privacy" title="Protect your personal information" />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Lock aria-hidden className="h-5 w-5" />
                Files can carry hidden details
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Files and photos may contain personal details or location metadata.
              </p>
              <ul className="mt-4 space-y-2.5">
                {hiddenDetailChecks.map(({ text, ok }) => (
                  <li key={text} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    {ok ? (
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    )}
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-ink">Who can see your documents</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Documents in a private draft are for you and authorized reviewers — never shown on a public listing. Download
                links would expire.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                PII Redaction guidance isn&apos;t published yet. Any information detected in an image must be reviewed before
                use.
              </p>
              <Link
                href="/report-a-fraud"
                className="mt-4 inline-block text-xs font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              >
                Report suspicious document requests
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
