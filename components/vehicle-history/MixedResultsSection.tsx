import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { mixedResults, statusTone } from "./data";

export default function MixedResultsSection() {
  return (
    <section id="example" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Example" title="How to read mixed results" />

        <ol className="relative mt-8 space-y-4 border-l border-slate-200 pl-6">
          {mixedResults.map(({ title, returned, meaning, status }, i) => {
            const tone = statusTone[status];
            return (
              <Reveal as="li" key={title} delay={Math.min(i, 6) * 60} className="relative">
                <span aria-hidden className="absolute top-5 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-slate-400 bg-white" />
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-slate-300">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-[11px] text-slate-500">Source returned: {returned}</p>
                    <p className="mt-1 text-xs text-slate-700">{meaning}</p>
                  </div>
                  <p className={`flex shrink-0 items-center gap-1.5 text-xs font-semibold ${tone.text}`}>
                    <span aria-hidden className={`h-2 w-2 rounded-full ${tone.dot}`} />
                    <span className="sr-only">Status: </span>
                    {status}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
