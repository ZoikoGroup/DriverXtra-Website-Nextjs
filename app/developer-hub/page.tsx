import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Flag, Lock } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import CodeSample from "@/components/developer-hub/CodeSample";
import RouteDirectory, { AccessLabel } from "@/components/developer-hub/RouteDirectory";
import DocSearch from "@/components/developer-hub/DocSearch";
import ReadinessChecklist from "@/components/developer-hub/ReadinessChecklist";
import AccessRequestForm from "@/components/developer-hub/AccessRequestForm";
import { accessLevels, accessSteps, credentialRules, faqs, useCases } from "@/components/developer-hub/data";

export const metadata: Metadata = {
  title: "Developer Hub — DriverXtra",
  description: "Explore integration topics, review access requirements and find the right technical reference for your use case.",
};

const relatedLinks = ["Lead & CRM Integrations", "Inventory Feeds", "Dealer Solutions", "Fleet Solutions"];

export default function DeveloperHubPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs tracking-wide uppercase">Developer Hub</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Build integrations with clear documentation.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Explore integration topics, review access requirements and find the right technical reference for your use case.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#integration-routes"
                  className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
                >
                  Find a technical reference <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#request-access"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Request technical access
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/15 blur-3xl" />
              <div className="relative">
                <CodeSample />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="integration-routes" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Integration routes"
            title="Find the right technical reference"
            description="The Developer Hub routes you to the owners of each area. Detailed endpoints and event catalogs live on their own pages."
          />
          <RouteDirectory />
        </div>
      </section>

      <section id="use-cases" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Use cases"
              title="What are you trying to build?"
              description="Choose a use case to see where its maintained reference lives. Only source-backed options are shown as supported."
            />
            <ol className="mt-6 space-y-2.5">
              {useCases.map(({ title, text, href }, i) => (
                <Reveal as="li" key={title} delay={150 + i * 80}>
                  <Link
                    href={href}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</span>
                      <span className="block text-[13px] text-slate-600">{text}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-[365/245] overflow-hidden rounded-2xl">
              <Image
                src="/images/developer-hub/use-cases.webp"
                alt="A team discussing a plan on a screen in an open-plan office"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="access-levels" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Access levels"
            title="What each label means"
            description="Labels come from maintained access-policy records. We never show something as available by visual optimism."
          />
          <Reveal delay={150}>
            <div className="group relative mt-6 aspect-[16/6] overflow-hidden rounded-2xl sm:aspect-[795/228]">
              <Image
                src="/images/developer-hub/access-levels.png"
                alt="A team gathered in an office for a briefing"
                fill
                sizes="(min-width: 1200px) 1150px, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
          </Reveal>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {accessLevels.map(({ access, text }, i) => (
              <Reveal key={access} delay={i * 70} className="h-full">
                <div className="h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                  <AccessLabel access={access} />
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={accessLevels.length * 70} className="h-full">
              <div className="h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                <p className="text-[13px] font-bold text-ink">Version and review dates</p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Each reference shows its version and last review. When unknown: &ldquo;Check current documentation&rdquo;.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="search" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Search"
            title="Search public documentation"
            description="Results respect access before anything is shown — restricted titles, snippets and counts never appear unless you're entitled."
          />
          <Reveal delay={150}>
            <DocSearch />
          </Reveal>
        </div>
      </section>

      <section id="integration-readiness" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Integration readiness" title="Before you request access" />
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
            <Reveal delay={100}>
              <ReadinessChecklist />
            </Reveal>
            <div>
              <Reveal direction="left" delay={150}>
                <div className="group relative aspect-[365/165] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/developer-hub/integration-readiness.png"
                    alt="Two colleagues celebrating at a desk with a laptop"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Reveal>
              <ol className="mt-6">
                {accessSteps.map(({ title, text }, i) => (
                  <Reveal as="li" key={title} delay={i * 90} className="group relative flex gap-4 pb-5 last:pb-0">
                    {i < accessSteps.length - 1 && <span aria-hidden className="absolute top-8 bottom-0 left-[13px] w-px bg-slate-300" />}
                    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                      <p className="mt-0.5 text-[13px] text-slate-600">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="request-access" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Request access"
              title="Request technical access review"
              description="Tell us what you need. We'll record your request and route it to the right owner. There's no promise of issuance or approval time."
            />
            <Reveal direction="right" delay={200}>
              <div className="group relative mt-6 aspect-[365/245] overflow-hidden rounded-2xl">
                <Image
                  src="/images/developer-hub/request-access.webp"
                  alt="Printed reports and a laptop on a desk"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={150}>
            <AccessRequestForm />
          </Reveal>
        </div>
      </section>

      <section id="security-and-privacy" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Security & privacy" title="Built around least privilege" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <div className="relative aspect-[388/146] overflow-hidden">
                  <Image
                    src="/images/developer-hub/credentials-and-secrets.png"
                    alt="A phone and paperwork on a desk"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-ink">
                    <Lock className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">Credentials and secrets</h3>
                  <ul className="mt-2 space-y-2">
                    {credentialRules.map((r) => (
                      <li key={r} className="flex gap-2.5 text-[13px] text-slate-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <div className="relative aspect-[388/146] overflow-hidden">
                  <Image
                    src="/images/developer-hub/report-a-problem.png"
                    alt="A team meeting in an open-plan office"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-ink">
                    <Flag className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">Report a problem</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">
                    Found a documentation error or a security concern? Report it — don&apos;t include secrets or personal data.
                  </p>
                  <Link
                    href={hrefFor("Security & Integration Guidance")}
                    className="group/link mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-blue-700 transition-colors hover:text-ink"
                  >
                    Read security & integration guidance
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection
        id="developer-hub-faqs"
        eyebrow="FAQ"
        title="Developer Hub questions"
        description="Technical examples are illustrative unless an official versioned reference states otherwise."
        faqs={faqs}
      />

      <section className="bg-white py-12">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <Reveal>
            <p className="text-[15px] font-bold text-ink">Integrating as a dealer or fleet?</p>
            <p className="mt-1 text-[13px] text-slate-600">See the business solutions that use these integrations.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((label) => (
                <Link
                  key={label}
                  href={hrefFor(label)}
                  className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
                >
                  {label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
