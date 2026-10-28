import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type MetricCard = {
  label: string;
  value: string;
  subtext: string;
};

const METRIC_CARDS: MetricCard[] = [
  {
    label: "Listing views",
    value: "1,240",
    subtext: "views of eligible listing content",
  },
  {
    label: "Inquiries received",
    value: "38",
    subtext: "accepted by DriverXtra",
  },
  {
    label: "CRM acknowledged",
    value: "31",
    subtext: "of 38 delivered",
  },
  {
    label: "Responded (reported)",
    value: "—",
    subtext: "not configured",
  },
];

type IllustrativeDashboardSectionProps = {
  id?: string;
  className?: string;
};

export default function IllustrativeDashboardSection({
  id,
  className = "bg-[#F6F8FB]",
}: IllustrativeDashboardSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Sample workspace"
          title="Illustrative dashboard — synthetic data"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRIC_CARDS.map(({ label, value, subtext }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <div>
                  <span className="text-xs font-semibold text-slate-500">
                    {label}
                  </span>
                  <div className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
                    {value}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {subtext}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
