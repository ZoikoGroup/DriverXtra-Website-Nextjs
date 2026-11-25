import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { exampleAlerts } from "./data";

export default function ExampleAlertsSection() {
  return (
    <section id="examples" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Examples" title="What an alert looks like" description="Synthetic samples — not real prices or sellers." />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {exampleAlerts.map(({ channel, icon: Icon, title, body, footer, muted }, i) => (
            <Reveal key={channel} delay={i * 100}>
              <article className="h-full rounded-xl border border-slate-200 bg-white p-4 transition-shadow duration-300 hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.35)]">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <Icon aria-hidden className="h-3.5 w-3.5" />
                  {channel} ·
                  <span className="rounded bg-brand-light px-1.5 py-px text-[9px] font-bold tracking-wide text-ink ring-1 ring-brand">
                    SAMPLE
                  </span>
                </p>
                <h3 className="mt-2 text-[13px] leading-snug font-bold text-ink">{title}</h3>
                <div className={`mt-2 space-y-0.5 leading-relaxed ${muted ? "text-[11px] text-slate-500" : "text-[13px] text-slate-700"}`}>
                  {body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {footer && <p className="mt-2 text-[11px] text-slate-400">{footer}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
