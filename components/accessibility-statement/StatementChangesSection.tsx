import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { statementVersions } from "./data";

export default function StatementChangesSection() {
  return (
    <PolicySection id="changes" title="Changes to this statement">
      <Reveal className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <caption className="sr-only">Accessibility Statement versions</caption>
          <thead>
            <tr className="border-b border-slate-300">
              {["Version", "Published", "What changed"].map((c) => (
                <th key={c} scope="col" className="w-1/3 px-2 py-2.5 font-semibold text-slate-500">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statementVersions.map((v) => (
              <tr key={v.version} className="border-b border-slate-200 align-top">
                <th scope="row" className="px-2 py-3 font-semibold text-slate-600">
                  {v.version}
                </th>
                <td className="px-2 py-3 text-ink">{v.published}</td>
                <td className="px-2 py-3 text-ink">{v.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </PolicySection>
  );
}
