import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { doesItems, doesntItems, responsibilities } from "./data";

export default function ResponsibilitiesSection() {
  return (
    <PolicySection id="responsibilities" title="Understanding platform and provider responsibilities">
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal className="rounded-xl border border-slate-300 bg-white p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
            <Check aria-hidden className="h-4 w-4" />
            What DriverXtra does
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
            {doesItems.map((item) => (
              <li key={item} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={80} className="rounded-xl border border-slate-300 bg-white p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
            <X aria-hidden className="h-4 w-4" />
            What DriverXtra doesn&apos;t do
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
            {doesntItems.map((item) => (
              <li key={item} className="flex gap-2">
                <X aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[13px]">
          <caption className="pb-2 text-left text-xs font-semibold text-slate-500">Who is responsible for what</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              {["Topic", "DriverXtra", "Seller or provider"].map((c) => (
                <th key={c} scope="col" className="w-1/3 px-2 py-2.5 font-semibold text-ink">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responsibilities.map((r) => (
              <tr key={r.topic} className="border-b border-slate-300 align-top">
                <th scope="row" className="px-2 py-3 font-semibold text-ink">
                  {r.topic}
                </th>
                <td className="px-2 py-3 text-slate-600">{r.driverxtra}</td>
                <td className="px-2 py-3 text-slate-600">{r.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </PolicySection>
  );
}
