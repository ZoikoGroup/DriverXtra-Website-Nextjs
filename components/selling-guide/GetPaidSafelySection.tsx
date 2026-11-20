import Link from "next/link";
import { Check, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { handoverChecklist, paymentLadder } from "./data";

const tone = {
  bad: { card: "border-slate-200", status: "text-red-700", dot: "bg-red-600" },
  warn: { card: "border-slate-200", status: "text-amber-700", dot: "bg-amber-600" },
  good: { card: "border-emerald-600 border-2", status: "text-emerald-700", dot: "bg-emerald-600" },
};

export default function GetPaidSafelySection() {
  return (
    <section id="get-paid" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle eyebrow="Step 7" title="Get paid safely and hand over" />

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paymentLadder.map((step, i) => {
            const t = tone[step.tone];
            return (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <div className={`flex h-full gap-3 rounded-2xl border bg-white p-4 ${t.card}`}>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-brand">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">{step.title}</h3>
                    <p className={`mt-1 flex items-center gap-1.5 text-sm font-medium ${t.status}`}>
                      <span className={`h-2 w-2 rounded-full ${t.dot}`} aria-hidden />
                      {step.status}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
              <h3 className="text-lg font-bold text-ink">Handover checklist</h3>
              <ul className="mt-3 space-y-2">
                {handoverChecklist.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">A checklist doesn&apos;t prove ownership has legally transferred.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <TriangleAlert className="h-5 w-5" /> Overpaid? Pause.
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Don&apos;t send money back because a buyer says they overpaid. That&apos;s a common scam.
              </p>
              <Link
                href="/report-a-fraud"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-brand text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
              >
                Report Fraud
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
