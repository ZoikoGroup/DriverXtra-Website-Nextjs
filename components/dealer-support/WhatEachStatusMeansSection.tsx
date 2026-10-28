import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CaseStatusRow = {
  status: string;
  meaning: string;
};

const CASE_STATUSES_DATA: CaseStatusRow[] = [
  {
    status: "Received",
    meaning: "We've recorded your request",
  },
  {
    status: "In review",
    meaning: "Support is looking at it",
  },
  {
    status: "Awaiting dealer",
    meaning: "We need something from you",
  },
  {
    status: "Investigating",
    meaning: "Specialists are checking",
  },
  {
    status: "Resolved",
    meaning: "Marked resolved — you can reopen",
  },
  {
    status: "Closed",
    meaning: "No further action",
  },
];

type WhatEachStatusMeansSectionProps = {
  id?: string;
  className?: string;
};

export default function WhatEachStatusMeansSection({
  id,
  className = "bg-white",
}: WhatEachStatusMeansSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Case statuses" title="What each status means" />

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-8 font-semibold w-1/3">
                  Status
                </th>
                <th scope="col" className="pb-3.5 pl-4 font-semibold w-2/3">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CASE_STATUSES_DATA.map((row) => (
                <tr
                  key={row.status}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8 font-semibold text-slate-700 text-xs">
                    {row.status}
                  </td>
                  <td className="py-4 pl-4 text-slate-600 font-normal">
                    {row.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
