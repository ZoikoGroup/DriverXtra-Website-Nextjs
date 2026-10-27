import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type FeedPathway = {
  method: string;
  whatItIs: string;
  availability: string;
};

const FEED_PATHWAYS: FeedPathway[] = [
  {
    method: "Manual / CSV",
    whatItIs: "Upload a structured file",
    availability: "Subject to approval",
  },
  {
    method: "Scheduled transfer",
    whatItIs: "Regular file transfer from your system",
    availability: "Subject to approval",
  },
  {
    method: "API",
    whatItIs: "Authorized system-to-system updates",
    availability: "Subject to approval",
  },
];

type FeedPathwaysSectionProps = {
  id?: string;
  className?: string;
};

export default function FeedPathwaysSection({
  id,
  className = "bg-[#F6F8FB]",
}: FeedPathwaysSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Feed pathways"
          title="How inventory can reach DriverXtra"
        />

        <Reveal delay={100} className="mt-10">
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Method</th>
                  <th className="py-4 px-6">What it is</th>
                  <th className="py-4 px-6">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {FEED_PATHWAYS.map(({ method, whatItIs, availability }) => (
                  <tr
                    key={method}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-6 font-semibold text-ink">
                      {method}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{whatItIs}</td>
                    <td className="py-4 px-6 text-slate-600">{availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
