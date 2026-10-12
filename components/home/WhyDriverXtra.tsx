import { BadgeCheck, Globe2, Lock, Scale } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    title: "Verified participants",
    text: "Dealers, sellers and service providers pass identity and compliance checks before they can transact.",
    icon: BadgeCheck,
  },
  {
    title: "Protected transactions",
    text: "Secure messaging, payment safeguards and clear dispute processes on every deal.",
    icon: Lock,
  },
  {
    title: "Regulated partners",
    text: "Finance and insurance offered only through authorised, regulated providers.",
    icon: Scale,
  },
  {
    title: "Built for global markets",
    text: "Local languages, currencies and regulations across 40+ markets.",
    icon: Globe2,
  },
];

const stats = [
  { value: "99.2%", label: "Listings verified" },
  { value: "4.8/5", label: "Average buyer rating" },
  { value: "< 2 min", label: "Finance pre-qualification" },
  { value: "24/7", label: "Fraud monitoring" },
];

export default function WhyDriverXtra() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="Why DriverXtra"
          title="Trust is built into every transaction"
          description="We combine verification, regulated partners and transparent data so you can buy, sell and own with confidence."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand/50 hover:bg-white/[0.06]">
                <Icon className="h-9 w-9 text-brand transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} direction="zoom" className="bg-navy">
              <div className="group p-8 text-center transition-colors duration-300 hover:bg-white/[0.04]">
                <p className="text-3xl font-extrabold text-brand transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
