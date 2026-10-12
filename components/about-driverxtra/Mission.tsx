import { Accessibility, Cpu, Eye, Globe, Plug, Scale, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "./SectionTitle";

const statements = [
  {
    label: "Our vision",
    text: "A world where automotive commerce is connected, transparent and trusted across every market and every stage of vehicle ownership.",
  },
  {
    label: "Our mission",
    text: "To eliminate fragmentation, opacity and trust gaps from the global automotive economy by providing the governed infrastructure for secure, transparent and lifecycle automotive commerce.",
    featured: true,
  },
  {
    label: "Our purpose",
    text: "To make automotive commerce easier to discover, safer to transact and simpler to manage for people and organizations.",
  },
];

const principles = [
  {
    title: "Trust by design",
    icon: ShieldCheck,
    text: "Verification, evidence, dispute handling and monitoring are designed into workflows rather than added after launch.",
  },
  {
    title: "Transparency by default",
    icon: Eye,
    text: "Prices, fees, sponsored placement, provider role and material disclosures are clear before commitment.",
  },
  {
    title: "Neutrality",
    icon: Scale,
    text: "DriverXtra provides infrastructure and rules without pretending to be the underlying seller, lender, insurer or service operator.",
  },
  {
    title: "Global architecture, local rules",
    icon: Globe,
    text: "One scalable platform with market-specific policy, disclosures and eligibility.",
  },
  {
    title: "Interoperability",
    icon: Plug,
    text: "APIs, feeds and webhooks let businesses connect existing systems rather than rebuild around a closed marketplace.",
  },
  {
    title: "Responsible automation",
    icon: Cpu,
    text: "AI can assist pricing, fitment, anomaly detection and support; high-impact decisions stay bounded by policy, evidence and law.",
  },
  {
    title: "Accessibility",
    icon: Accessibility,
    text: "Core journeys are designed to WCAG 2.2 AA and inclusive interaction standards.",
  },
];

export default function Mission() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Vision, mission & purpose"
          title="What we're building toward"
          description="The long-term ambition behind the platform, and the principles we hold ourselves to while getting there."
        />

        <div className="mt-10 grid overflow-hidden rounded-2xl border border-slate-200 md:grid-cols-3">
          {statements.map(({ label, text, featured }, i) => (
            <Reveal key={label} delay={i * 120} direction="zoom" className="h-full">
              <div
                className={`group h-full p-7 transition-colors duration-500 ${
                  featured ? "bg-navy text-white" : "bg-white text-ink hover:bg-brand-light/50"
                }`}
              >
                <p className="text-xs font-semibold text-brand-dark">{label}</p>
                <p className="mt-3 text-lg leading-snug font-bold transition-transform duration-500 group-hover:-translate-y-1">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-14 text-lg font-bold text-ink">Operating principles</h3>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ title, icon: Icon, text }, i) => (
            <Reveal key={title} delay={(i % 4) * 80}>
              <div className="group h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-lg">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  {title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
