import Link from "next/link";
import { Check, Globe, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

const globalCapabilities = [
  "Multi-currency commerce",
  "Location-aware search and delivery",
  "Cross-border supplier and logistics support",
  "Global business and API model",
];

const localControls = [
  "Jurisdiction-specific disclosures",
  "Consumer-protection requirements",
  "Vehicle, title and odometer rules where applicable",
  "Privacy and data-rights workflows",
  "Regulated finance and insurance partner rules",
];

function List({ title, icon: Icon, items, delay }: { title: string; icon: typeof Globe; items: string[]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
        <Icon className="h-4 w-4 text-brand-dark" />
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-[13px] leading-snug text-slate-600 transition-transform duration-300 hover:translate-x-1">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function GlobalLocal() {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <Reveal direction="zoom">
          <div className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl lg:grid-cols-[1.1fr_1fr]">
            <div className="p-7 sm:p-10">
              <Reveal>
                <Eyebrow>Global by design. Local by rule.</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-ink">
                  Built for global automotive commerce. <span className="text-gold">Designed to respect local rules.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  DriverXtra is engineered for multi-market operation, with country- and region-aware controls for
                  disclosures, consumer protection, privacy, payments, regulated partner eligibility, vehicle
                  documentation and other local requirements. Feature availability can vary by market as products,
                  partners and regulatory conditions differ.
                </p>
              </Reveal>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <List title="Global capabilities" icon={Globe} items={globalCapabilities} delay={250} />
                <List title="Local controls" icon={MapPin} items={localControls} delay={350} />
              </div>

              <Reveal delay={400}>
                <Link
                  href="#"
                  className="btn-shine mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
                >
                  Choose your region
                </Link>
                <p className="mt-6 border-t border-dashed border-slate-200 pt-5 text-[15px] leading-relaxed text-slate-500">
                  Wherever you are, the facts about DriverXtra stay the same: who operates it, its mission, its trust
                  principles and its role. Availability, terminology, legal text, currency and partner options may
                  change by market.
                </p>
              </Reveal>
            </div>

            <div className="relative min-h-[280px] overflow-hidden">
              {/* The image already fades to white on its left edge */}
              <BgImage
                src="/images/about/global-markets.webp"
                position="left center"
                fallback="linear-gradient(90deg, #ffffff 0%, #0b1220 35%)"
                className="transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
