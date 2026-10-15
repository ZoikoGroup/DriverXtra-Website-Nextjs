import { Check, Clock, Code, Crosshair, FileText, Globe, Layers, ShieldCheck, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const problems = [
  {
    title: "Fragmented commerce",
    icon: Layers,
    text: "Vehicle discovery, parts, services and ownership tools live in separate experiences.",
    solution: "DriverXtra unifies the journey without forcing every provider into the same business model.",
  },
  {
    title: "Trust and fraud gaps",
    icon: ShieldCheck,
    text: "Identity, ownership, business credentials and product authenticity can be difficult to evaluate.",
    solution: "DriverXtra applies role-based verification, monitoring, reporting and evidence workflows.",
  },
  {
    title: "Opaque economics",
    icon: Tag,
    text: "Headline prices can hide fees, delivery costs, finance costs or service exclusions.",
    solution: "DriverXtra is designed around comparable offers, visible disclosures and total-cost context.",
  },
  {
    title: "Parts fitment uncertainty",
    icon: Crosshair,
    text: "Wrong-part purchases create waste, returns, downtime and safety risk.",
    solution: "VIN, make, model, year and trim matching with fitment confidence are core parts-commerce capabilities.",
  },
  {
    title: "Disconnected transaction evidence",
    icon: FileText,
    text: "Messages, documents, offers, payments and disputes are often scattered across channels.",
    solution: "DriverXtra brings governed messaging, documents and transaction records into one workflow.",
  },
  {
    title: "Local compliance complexity",
    icon: Globe,
    text: "Automotive and financial-services rules vary by jurisdiction.",
    solution: "DriverXtra is designed for market-aware disclosures, eligibility and policy controls.",
  },
  {
    title: "Business integration gaps",
    icon: Code,
    text: "Dealers, fleets, workshops and suppliers need systems, not just listings.",
    solution: "Feeds, APIs, webhooks, analytics, bulk procurement and business workspaces support institutional users.",
  },
  {
    title: "Lifecycle discontinuity",
    icon: Clock,
    text: "Marketplaces often stop after the sale.",
    solution: "DriverXtra is designed to support acquisition, ownership, maintenance, upgrades and exit.",
  },
];

export default function TheProblem() {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Why DriverXtra exists"
          title="The problems we solve"
          description="The automotive economy is enormous, but the customer journey is still fragmented. Buying a vehicle, verifying a seller, finding the right part, arranging service, comparing finance, securing insurance and managing resale often happen across disconnected systems with inconsistent standards. DriverXtra is designed to connect those journeys."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ title, icon: Icon, text, solution }, i) => (
            <Reveal key={title} delay={(i % 4) * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="mt-4 text-[15px] leading-snug font-bold text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">{text}</p>
                <p className="mt-4 flex gap-2 border-t border-dashed border-slate-200 pt-4 text-[13px] leading-relaxed text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-300 group-hover:scale-125" />
                  {solution}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
