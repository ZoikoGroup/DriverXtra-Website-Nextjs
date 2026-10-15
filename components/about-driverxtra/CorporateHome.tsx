import { MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const facts = [
  { label: "Trading name", value: "DriverXtra" },
  { label: "Corporate home", value: "Zoiko Mobility Inc." },
  { label: "Group", value: "Zoiko Group" },
  { label: "Operating model", value: "Technology marketplace and commerce infrastructure; asset-light by design" },
  {
    label: "Public role",
    value: "Marketplace operator and technology / governance layer; not automatically the underlying seller, lender, insurer or service provider",
  },
];

const offices = [
  { title: "Headquarters", lines: ["1401 21st Street, Suite R", "Sacramento, CA 95811", "United States"] },
  { title: "European Headquarters", lines: ["167–169 Great Portland Street, 5th Floor", "London W1W 5PF", "United Kingdom"] },
];

export default function CorporateHome() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Corporate home & governance"
          title="Part of Zoiko Mobility. Built within Zoiko Group."
          description="DriverXtra is a trading name of Zoiko Mobility Inc., a Zoiko Group company. This reflects DriverXtra's role in the Group's mobility and automotive commerce portfolio, while DriverXtra operates as a distinct marketplace brand with its own customer experience, trust framework and commercial ecosystem."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal direction="right">
            <dl className="overflow-hidden rounded-2xl border border-slate-200">
              {facts.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[140px_1fr] border-b border-slate-200 transition-colors duration-300 last:border-b-0 hover:bg-brand-light/40 sm:grid-cols-[160px_1fr]"
                >
                  <dt className="bg-slate-50 px-4 py-3.5 text-[13px] font-semibold text-slate-600">{label}</dt>
                  <dd className="px-4 py-3.5 text-[13px] leading-relaxed text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h3 className="text-lg font-bold text-ink">Governance</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                DriverXtra is designed around clear marketplace rules, participant accountability, privacy and data
                protection, accessibility, transparent commercial influence, structured dispute handling and
                market-specific compliance. Governance is treated as product infrastructure: the controls users depend on
                must be reflected in the interface, transaction flow, evidence and operational process — not only in
                legal terms.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {offices.map((o, i) => (
                <Reveal key={o.title} delay={200 + i * 100}>
                  <div className="group h-full rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg">
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                      <MapPin className="h-4 w-4 text-brand-dark transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                      {o.title}
                    </p>
                    <address className="mt-2 text-[13px] leading-relaxed text-slate-600 not-italic">
                      {o.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
