import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import InsuranceTabBar from "@/components/compare-insurance/InsuranceTabBar";
import HelpTopics from "@/components/insurance-help/HelpTopics";
import IssueRouter from "@/components/insurance-help/IssueRouter";
import { isHelpTopicId, whoHandles } from "@/components/insurance-help/data";

export const metadata: Metadata = {
  title: "Insurance Help — DriverXtra",
  description: "Find answers, identify who owns an issue, and choose a safe next step.",
};

export default async function InsuranceHelpPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
          <div>
            <Reveal>
              <Eyebrow dark>
                <span className="text-xs">Insurance</span>
              </Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">Insurance Help</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">Find answers, identify who owns an issue, and choose a safe next step.</p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <div className="group relative animate-float-slow">
              <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
              <Image
                src="/images/insurance-help/hero-insurance-help.png"
                alt="Two colleagues celebrating with a high five at a desk"
                width={599}
                height={448}
                priority
                className="relative h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <InsuranceTabBar active="help" />

      <section id="help-topics" className="scroll-mt-40 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Topics" title="What do you need help with?" />
          <HelpTopics initialTopic={isHelpTopicId(topic) ? topic : undefined} />
        </div>
      </section>

      <section id="issue-router" className="scroll-mt-40 bg-slate-50 py-16">
        <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]`}>
          <div>
            <Reveal>
              <Eyebrow>Issue router</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 mb-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Find the right place to go</h2>
            </Reveal>
            <Reveal delay={200}>
              <IssueRouter />
            </Reveal>
          </div>

          <Reveal direction="left" delay={200}>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
              <div className="relative aspect-[500/375] overflow-hidden">
                <Image
                  src="/images/personal-vehicle-insurance/renewal-checklist.webp"
                  alt="Two colleagues celebrating with a high five at a desk"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-ink">Who handles what</h3>
                <dl className="mt-3 divide-y divide-slate-100 text-[13px]">
                  {whoHandles.map(([who, what]) => (
                    <div key={who} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 transition-colors hover:bg-slate-50">
                      <dt className="text-slate-500">{who}</dt>
                      <dd className="text-ink">{what}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
