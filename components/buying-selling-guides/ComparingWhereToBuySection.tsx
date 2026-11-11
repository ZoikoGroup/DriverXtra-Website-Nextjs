import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PurchaseChannelRow = {
  channel: string;
  whatYouMayGet: string;
  whatToCheck: string;
};

const DEFAULT_PURCHASE_CHANNELS: PurchaseChannelRow[] = [
  {
    channel: "Private seller",
    whatYouMayGet:
      "Direct contact with the owner; sometimes lower asking prices",
    whatToCheck:
      "Ownership, finance status, condition — you do more of the checks",
  },
  {
    channel: "Dealer",
    whatYouMayGet: "Prepared vehicles; may offer warranties or finance",
    whatToCheck:
      "What any warranty actually covers; fees; dealer verification scope",
  },
  {
    channel: "Trade-in",
    whatYouMayGet: "Convenience when buying another vehicle",
    whatToCheck: "The trade-in value is an offer, not a market valuation",
  },
  {
    channel: "Fleet or remarketing",
    whatYouMayGet: "Records from a single owner",
    whatToCheck: "Usage history and any disposal conditions",
  },
];

type ComparingWhereToBuySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  channels?: PurchaseChannelRow[];
  className?: string;
};

export default function ComparingWhereToBuySection({
  id = "comparing-where-to-buy",
  eyebrow = "Ways to buy",
  title = "Comparing where to buy",
  description = "An objective overview. Protections vary by market and seller — no blanket legal claims.",
  channels = DEFAULT_PURCHASE_CHANNELS,
  className = "bg-white",
}: ComparingWhereToBuySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Header */}
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* Purchase Channels Comparison Table */}
        <Reveal delay={100} className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    <th className="py-4 pl-6 pr-4 font-bold">Channel</th>
                    <th className="px-4 py-4 font-bold">What you may get</th>
                    <th className="py-4 pl-4 pr-6 font-bold">What to check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {channels.map((row) => (
                    <tr
                      key={row.channel}
                      className="transition-colors hover:bg-slate-50/50"
                    >
                      <td className="py-5 pl-6 pr-4 font-bold text-ink whitespace-nowrap">
                        {row.channel}
                      </td>
                      <td className="px-4 py-5 font-medium text-slate-600">
                        {row.whatYouMayGet}
                      </td>
                      <td className="py-5 pl-4 pr-6 font-medium text-slate-500">
                        {row.whatToCheck}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
