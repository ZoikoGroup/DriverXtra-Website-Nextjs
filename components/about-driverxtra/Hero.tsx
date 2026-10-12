import Link from "next/link";
import { Car, Check, ClipboardCheck, FileText, Lock, Settings, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "./SectionTitle";

const timeline = [
  { title: "Offer accepted", note: "Recorded", done: true },
  { title: "Documents exchanged", note: "Redacted copy", done: true },
  { title: "Payment secured", note: "Where available", done: true },
  { title: "Collection", note: "Scheduled", done: false },
];

const card =
  "h-full rounded-xl bg-white p-3.5 text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-18px_rgba(0,0,0,0.7)]";

function Chip({ icon: Icon, children }: { icon: typeof Check; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

function CardLabel({ icon: Icon, children }: { icon: typeof Check; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
      <Icon className="h-3.5 w-3.5 text-brand-dark" />
      {children}
    </p>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/about/hero-background.jpg" className="opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />

        <div className={`${container} relative grid items-center gap-10 pt-16 pb-36 lg:grid-cols-[1.12fr_1fr] lg:gap-14 lg:pt-20 lg:pb-40`}>
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">About DriverXtra · Global Automotive Commerce Infrastructure</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[56px]">
                Building the Infrastructure for <span className="text-brand">Global Automotive Commerce</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-300">
                DriverXtra connects the automotive ecosystem through one governed marketplace for vehicles, parts,
                accessories, services, finance and insurance — built around verified participation, transparent
                economics, secure workflows and local compliance.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#"
                  className="btn-shine rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
                >
                  Explore the Marketplace
                </Link>
                <Link
                  href="#"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
                >
                  For Business
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Product preview cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.05fr] sm:grid-rows-[auto_auto_auto]">
            <Reveal direction="left" delay={200} className="sm:row-span-2 sm:h-full">
              <div className={card}>
                <CardLabel icon={Car}>Vehicle listing</CardLabel>
                <div className="group relative mt-2 aspect-[16/9] overflow-hidden rounded-lg">
                  <BgImage
                    src="/images/about/hero-vehicle-listing.png"
                    fallback="linear-gradient(135deg, #f2b37a 0%, #c46a3c 60%, #7c3f22 100%)"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-2.5 text-[13px] leading-snug font-semibold">2024 Toyota RAV4 2.5 Hybrid Design</p>
                <p className="mt-2 text-lg font-bold">$31,450</p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-blue-700">
                  <span className="h-2 w-2 rounded-[2px] bg-blue-600" /> Within market
                </p>
                <div className="mt-2 flex flex-col items-start gap-1.5">
                  <Chip icon={ShieldCheck}>L4 Business Verified</Chip>
                  <Chip icon={FileText}>History report available</Chip>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={300} className="sm:h-full">
              <div className={card}>
                <CardLabel icon={Settings}>Fitment-verified part</CardLabel>
                <p className="mt-1.5 text-[13px] font-semibold">Brembo front brake pad set</p>
                <p className="mt-2 flex gap-1.5 rounded-md bg-emerald-50 px-2.5 py-2 text-[11px] leading-snug font-semibold text-emerald-700">
                  <Check className="mt-0.5 h-3 w-3 shrink-0" /> Fits your 2024 BMW X3 xDrive30i
                </p>
                <p className="mt-2 text-[11px] text-slate-500">2-year warranty · 30-day returns</p>
              </div>
            </Reveal>

            <Reveal direction="left" delay={400} className="sm:h-full">
              <div className={card}>
                <CardLabel icon={ClipboardCheck}>Verified service provider</CardLabel>
                <p className="mt-1.5 text-[13px] font-semibold">Northgate Vehicle Inspections</p>
                <div className="mt-2">
                  <Chip icon={ShieldCheck}>L4 Business Verified</Chip>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Insured inspector · Next: tomorrow 9:00</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={500} className="sm:col-span-2">
              <div className={card}>
                <CardLabel icon={Lock}>Governed transaction record</CardLabel>
                <ol className="mt-3 grid grid-cols-4 gap-2">
                  {timeline.map((step, i) => (
                    <li key={step.title} className="relative">
                      <div className="flex items-center">
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                            step.done ? "bg-emerald-600" : "border-2 border-brand bg-white"
                          }`}
                        />
                        {i < timeline.length - 1 && <span className="h-0.5 flex-1 bg-emerald-600" />}
                      </div>
                      <p className="mt-1.5 text-[11px] leading-tight font-semibold">{step.title}</p>
                      <p className="text-[10px] text-slate-500">{step.note}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* "What is DriverXtra?" summary card overlapping the hero */}
      <div className="bg-white">
        <div className={`${container} relative z-10 -mt-20`}>
          <Reveal>
            <div className="rounded-2xl border border-slate-200 border-l-4 border-l-brand bg-white p-6 shadow-[0_24px_50px_-20px_rgba(15,23,42,0.3)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.4)] sm:p-7">
              <p className="text-xs font-semibold text-slate-500">What is DriverXtra?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
                <strong className="text-ink">
                  DriverXtra is a global automotive marketplace and commerce infrastructure platform.
                </strong>{" "}
                It enables consumers and organizations to buy and sell vehicles, source compatible parts, access
                automotive services, and compare third-party finance and insurance options through governed,
                role-appropriate verification and transparent transaction workflows.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
