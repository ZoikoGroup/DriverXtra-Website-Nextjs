import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { revisions } from "./data";

const columns = ["Version", "Affected period", "What changed", "Effect", "Approved by", "Published"];

export default function RevisionHistorySection() {
  return (
    <section id="revisions" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Revisions"
          title="Revision history"
          description="This methodology was updated. Review the change log and affected periods before comparing historical figures."
        />
        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {columns.map((c) => (
                  <th key={c} scope="col" className="px-2.5 py-3 font-semibold text-slate-500">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revisions.map((r) => (
                <tr key={r.version} className="border-b border-slate-200 align-top">
                  <th scope="row" className="px-2.5 py-3 font-semibold text-slate-500">
                    {r.version}
                  </th>
                  <td className="px-2.5 py-3 text-ink">{r.period}</td>
                  <td className="px-2.5 py-3 text-ink">{r.change}</td>
                  <td className="px-2.5 py-3 text-ink">{r.effect}</td>
                  <td className="px-2.5 py-3 text-ink">{r.approvedBy}</td>
                  <td className="px-2.5 py-3 text-ink">{r.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
