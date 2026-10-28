import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ChannelRow = {
  channel: string;
  status: string;
};

const CHANNELS_DATA: ChannelRow[] = [
  {
    channel: "Help articles",
    status: "Available",
  },
  {
    channel: "Support cases (signed in)",
    status: "Available in this prototype — demonstration only",
  },
  {
    channel: "Live chat",
    status: "Not offered — no approved operating schedule",
  },
  {
    channel: "Phone",
    status: "Not shown — no approved hours",
  },
];

type SupportAvailabilitySectionProps = {
  id?: string;
  className?: string;
};

export default function SupportAvailabilitySection({
  id,
  className = "bg-white",
}: SupportAvailabilitySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Support availability" title="Channels" />

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-8 font-semibold w-1/3">
                  Channel
                </th>
                <th scope="col" className="pb-3.5 pl-4 font-semibold w-2/3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CHANNELS_DATA.map((row) => (
                <tr
                  key={row.channel}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8 font-semibold text-slate-700 text-xs">
                    {row.channel}
                  </td>
                  <td className="py-4 pl-4 text-slate-600 font-normal">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs font-medium text-slate-400">
            Last reviewed: pending approval.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
