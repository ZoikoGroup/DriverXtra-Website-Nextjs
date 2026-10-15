import { Code, Crosshair, Eye, FileText, Flag, Globe, Layers, Scale, ShieldCheck, User } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const capabilities = [
  { title: "Whole-ecosystem commerce", icon: Layers, text: "Vehicles, parts, services and partner products share one discovery and trust layer." },
  { title: "Verification tied to action", icon: ShieldCheck, text: "Identity and business checks become stronger as risk and transaction authority increase." },
  { title: "Compatibility-first parts commerce", icon: Crosshair, text: "Fitment is a core commerce requirement, not a search filter afterthought." },
  { title: "Governed transaction evidence", icon: FileText, text: "Messages, documents, offers and disputes can remain within traceable workflows." },
  { title: "Neutral platform role", icon: Scale, text: "DriverXtra does not need to own inventory to improve commerce quality." },
  { title: "Global-local architecture", icon: Globe, text: "Disclosures, eligibility, currency and market rules can localize." },
  { title: "Consumer + enterprise model", icon: User, text: "The same marketplace supports individual journeys and institutional workflows." },
  { title: "API-first integration", icon: Code, text: "Businesses can connect inventory, orders, availability and status into existing systems." },
  { title: "Separated commercial influence", icon: Eye, text: "Sponsored content and paid placement are labeled and kept distinct from independent insights." },
  { title: "Trust & disputes by design", icon: Flag, text: "Fraud reporting, evidence and resolution are part of the product architecture." },
];

export default function Differentiators() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="What makes DriverXtra different"
          title="Ten capabilities, each with proof"
          description="Every difference below maps to something you can see in the product."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2">
          {capabilities.map(({ title, icon: Icon, text }, i) => (
            <div key={title} className="bg-white transition-colors duration-300 hover:bg-slate-50">
              <Reveal delay={(i % 2) * 100} className="h-full">
                <div className="group relative flex h-full gap-4 p-5 sm:p-6">
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand/40 bg-brand-light text-brand-dark transition-all duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{text}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
