import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import ServiceStatus from "@/components/platform-status/ServiceStatus";
import IncidentHistory from "@/components/platform-status/IncidentHistory";
import LocalTime from "@/components/platform-status/LocalTime";
import StatusUpdatesForm from "@/components/platform-status/StatusUpdatesForm";
import { LAST_VERIFIED, channels, faqs, maintenance } from "@/components/platform-status/data";

export const metadata: Metadata = {
  title: "Platform Status — DriverXtra",
  description: "Current health of DriverXtra consumer and developer services, planned maintenance and disclosed incident history.",
};

export default function PlatformStatusPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal delay={100}>
              <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">DriverXtra Platform Status</h1>
            </Reveal>
            <Reveal delay={250}>
              <div
                role="status"
                className="group mt-7 overflow-hidden rounded-2xl border-l-[6px] border-emerald-600 bg-white p-5 text-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-1"
              >
                <p className="flex items-center gap-3 text-[17px] font-bold">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-600" />
                  </span>
                  All monitored services are operational.
                </p>
                <p className="mt-2 pl-[26px] text-[12px] text-slate-600">Last verified: {LAST_VERIFIED} · Source: status registry (demonstration)</p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#status-updates"
                  className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
                >
                  Get status updates <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#incident-history"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Incident history
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/platform-status/hero-platform-status.webp"
                alt="Server racks with green status lights and fibre cabling"
                width={623}
                height={539}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Services" title="Current status by service" description="Public service categories only. Select a service for details." />
          <ServiceStatus />
        </div>
      </section>

      <section id="planned-maintenance" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Planned maintenance" title="Scheduled maintenance" description="Times are shown in UTC and your local time. Tentative windows are marked." />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {maintenance.map((m, i) => (
              <Reveal key={m.ref} delay={i * 120} className="h-full">
                <article className="group flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                  <div className="relative hidden w-[30%] shrink-0 overflow-hidden sm:block">
                    <Image src={m.image} alt={m.alt} fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[15px] font-bold text-blue-800">{m.title}</h3>
                      <span className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-blue-800">
                        <span className="h-2 w-2 rounded-full bg-blue-700" /> {m.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-slate-500">
                      {m.ref} · {m.service}
                    </p>
                    <p className="mt-2 text-[13px] font-bold text-blue-800">{m.window}</p>
                    <p className="text-[12px] text-slate-500">
                      Your time: <LocalTime iso={m.startsAt} />
                    </p>
                    <p className="mt-2 text-[13px] text-blue-700">{m.impact}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-500">Changes to this window are posted here with a visible revision note.</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="incident-history" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="History" title="Incident history" description="Disclosed records only. The archive may not be complete for every period." />
          <IncidentHistory />
        </div>
      </section>

      <section id="status-updates" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
          <div>
            <SectionTitle
              eyebrow="Notifications"
              title="Get status updates"
              description="Choose the services you care about. We'll ask you to verify your email before anything is sent."
            />
            <Reveal delay={150}>
              <dl className="mt-6 divide-y divide-slate-200 border-b border-slate-200 text-[13px]">
                {channels.map(({ label, offered }) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] py-2.5 transition-colors hover:bg-white">
                    <dt className="text-ink">{label}</dt>
                    <dd className={`flex items-center gap-1.5 ${offered ? "text-emerald-700" : "text-slate-600"}`}>
                      <span className={`h-2 w-2 rounded-full ${offered ? "bg-emerald-600" : "border border-slate-400"}`} />
                      {offered ? "Offered" : "Not offered"}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal direction="right" delay={250}>
              <div className="group relative mt-6 aspect-[416/250] overflow-hidden rounded-2xl">
                <Image
                  src="/images/platform-status/status-updates.webp"
                  alt="Printed reports and a laptop on a desk"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <StatusUpdatesForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-white pt-16">
        <div className={container}>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-[15px] font-bold text-ink">Building an integration?</h2>
                <p className="mt-1 text-[13px] text-slate-600">Technical details, event delivery and problem reports live in the developer pages.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Developer Hub", "API Documentation", "Webhooks"].map((label) => (
                  <Link
                    key={label}
                    href={hrefFor(label)}
                    className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand"
                  >
                    {label} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection id="platform-status-faqs" eyebrow="FAQ" title="Platform Status questions" faqs={faqs} className="bg-white" />
    </>
  );
}
