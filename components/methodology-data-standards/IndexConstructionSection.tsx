import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { illustrativeIndex, indexRows } from "./data";

/** Bar height in px: 80px at the base value of 100, 4px per index point. */
const barHeight = (v: number) => 80 + (v - 100) * 4;

export default function IndexConstructionSection() {
  return (
    <section id="index-construction" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Index construction"
          title="How an index is built"
          description="Concept illustration only — the numbers below are not live figures."
        />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[160px_1fr]">
              {indexRows.map((r) => (
                <div key={r.term} className="contents">
                  <dt className="text-[15px] font-bold text-ink">{r.term}</dt>
                  <dd className="mb-2 text-[15px] text-slate-600 sm:mb-0">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <figure className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <figcaption className="text-[15px] font-bold text-ink">Illustrative index</figcaption>
                <span className="rounded border border-dashed border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-amber-900 uppercase">
                  Concept only — synthetic
                </span>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4 border-b-2 border-slate-200 pb-2" aria-hidden>
                {illustrativeIndex.map((p) => (
                  <div key={p.period} className="flex flex-col items-center justify-end">
                    <div className="w-full max-w-[84px] rounded-t-lg bg-navy" style={{ height: barHeight(p.value) }} />
                    <span className="mt-2 text-sm font-bold text-ink">{p.value}</span>
                    <span className="mt-1 text-xs text-slate-500">{p.period}</span>
                  </div>
                ))}
              </div>

              <details className="group mt-3">
                <summary className="cursor-pointer list-none text-[15px] font-bold text-blue-700 hover:text-blue-900 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Show as a table</span>
                  <span className="hidden group-open:inline">Hide table</span>
                </summary>
                <table className="mt-3 w-full text-left text-sm">
                  <caption className="sr-only">Illustrative index values (synthetic)</caption>
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th scope="col" className="py-2 font-semibold">Period</th>
                      <th scope="col" className="py-2 font-semibold">Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {illustrativeIndex.map((p) => (
                      <tr key={p.period} className="border-b border-slate-100">
                        <td className="py-2 text-ink">{p.period}</td>
                        <td className="py-2 text-ink">{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
