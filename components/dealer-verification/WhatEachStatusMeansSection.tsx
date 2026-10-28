import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StatusRow = {
  status: string;
  meaning: string;
  dotClass: string;
  textClass: string;
  isOutline?: boolean;
};

const STATUS_DICTIONARY: StatusRow[] = [
  {
    status: "Not started",
    meaning: "No submission yet",
    dotClass: "border border-slate-400 bg-white",
    textClass: "text-slate-600 font-medium",
    isOutline: true,
  },
  {
    status: "Pending",
    meaning: "Submitted, awaiting review",
    dotClass: "bg-amber-500",
    textClass: "text-amber-700 font-semibold",
  },
  {
    status: "In review",
    meaning: "Being reviewed",
    dotClass: "bg-amber-500",
    textClass: "text-amber-700 font-semibold",
  },
  {
    status: "Needs info",
    meaning: "We need additional information to continue your review.",
    dotClass: "bg-red-500",
    textClass: "text-red-700 font-semibold",
  },
  {
    status: "Current",
    meaning: "Verified for the scope and date shown",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-700 font-semibold",
  },
  {
    status: "Expired",
    meaning:
      "This verification is no longer current. Please review renewal requirements.",
    dotClass: "bg-red-500",
    textClass: "text-red-700 font-semibold",
  },
  {
    status: "Restricted",
    meaning: "Some dealer capabilities are restricted.",
    dotClass: "bg-red-500",
    textClass: "text-red-700 font-semibold",
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
        <SectionTitle
          eyebrow="Status dictionary"
          title="What each status means"
        />

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
              {STATUS_DICTIONARY.map((row) => (
                <tr
                  key={row.status}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${row.dotClass}`}
                      />
                      <span className={`text-xs ${row.textClass}`}>
                        {row.status}
                      </span>
                    </div>
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
