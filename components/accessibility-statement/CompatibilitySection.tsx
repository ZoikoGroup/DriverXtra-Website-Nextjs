import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { compatibility, type CompatStatus } from "./data";

const statusStyle: Record<CompatStatus, { label: string; text: string; dot: string }> = {
  tested: { label: "Tested", text: "text-emerald-700", dot: "bg-emerald-600" },
  partial: { label: "Partly tested", text: "text-gold", dot: "bg-brand-dark" },
  none: { label: "Not tested", text: "text-slate-500", dot: "border border-slate-400" },
  notReal: { label: "Not tested on real devices", text: "text-slate-500", dot: "border border-slate-400" },
};

export default function CompatibilitySection() {
  return (
    <PolicySection id="compatibility" title="Technology compatibility">
      <Reveal className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <caption className="sr-only">Browsers and assistive technologies tested</caption>
          <thead>
            <tr className="border-b border-slate-300">
              {["Environment", "Status", "Notes"].map((c) => (
                <th key={c} scope="col" className="px-2 py-2.5 font-semibold text-slate-500">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compatibility.map((row) => {
              const s = statusStyle[row.status];
              return (
                <tr key={row.environment} className="border-b border-slate-200 align-top">
                  <th scope="row" className="w-[34%] px-2 py-3 font-semibold text-slate-600">
                    {row.environment}
                  </th>
                  <td className={`w-[33%] px-2 py-3 ${s.text}`}>
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-ink">{row.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Reveal>
    </PolicySection>
  );
}
