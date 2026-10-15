import { Check, Scale, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const isList = [
  "A global automotive marketplace",
  "A multi-sided commerce platform",
  "A verification and transaction workflow layer",
  "A vehicle-lifecycle commerce platform",
  "An API-enabled business platform",
];

const isNotList = [
  "A vehicle manufacturer",
  "A dealer or inventory owner",
  "A direct lender or insurer",
  "A traditional classifieds-only website",
  "A principal to every transaction",
];

export default function WhoWeAre() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Who we are"
          title="Automotive commerce, connected."
          description="DriverXtra is a global automotive commerce and infrastructure platform designed to modernize how vehicles and vehicle-related products and services are discovered, evaluated, transacted and managed across their lifecycle. We bring consumers, dealers, fleets, parts suppliers, service providers and regulated partners into a single governed marketplace experience."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="group h-full rounded-2xl bg-navy p-7 text-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(11,18,32,0.8)]">
              <p className="flex items-center gap-3 font-semibold">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Check className="h-4 w-4" />
                </span>
                DriverXtra is
              </p>
              <ul className="mt-5 space-y-3">
                {isList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-200 transition-transform duration-300 hover:translate-x-1">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl">
              <p className="flex items-center gap-3 font-semibold text-ink">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-slate-50 transition-transform duration-500 group-hover:rotate-90">
                  <X className="h-4 w-4" />
                </span>
                DriverXtra is not
              </p>
              <ul className="mt-5 space-y-3">
                {isNotList.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600 transition-transform duration-300 hover:translate-x-1">
                    <X className="h-4 w-4 shrink-0 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-5 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600 transition-colors duration-300 hover:border-brand/50">
            <Scale className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" />
            <p>
              DriverXtra provides the marketplace, technology, verification, transaction workflows and governance
              framework that help automotive commerce operate more safely and transparently. The party selling a
              vehicle, supplying a part, delivering a service, or providing a regulated financial product remains
              responsible for that underlying product or service, subject to applicable DriverXtra rules and law.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
