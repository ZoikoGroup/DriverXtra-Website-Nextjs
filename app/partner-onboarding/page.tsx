import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import { partnerIcons } from "@/components/partner-program/icons";
import { HorizontalSteps, IconCards, PartnerHero, RequirementsGrid, TickList } from "@/components/partner-program/sections";
import PathwayFinder from "@/components/partner-onboarding/PathwayFinder";
import { comparison, faqs, onboardingSteps, preparation, programs, statuses, toneStyles } from "@/components/partner-onboarding/data";

export const metadata: Metadata = {
  title: "Partner Onboarding — DriverXtra",
  description: "Find the DriverXtra partner pathway that matches your business role and operating market, then apply once for your organization.",
};

export default function PartnerOnboardingPage() {
  return (
    <>
      <PartnerHero
        eyebrow="Partner Onboarding"
        title="Onboard your organization with DriverXtra."
        text="Find the partner pathway that matches your business role and operating market. Choose a program to see the requirements that may apply, then apply once for your organization."
        badges={[
          { icon: "layers", title: "Six programs", text: "one starting point" },
          { icon: "file", title: "One organization profile", text: "shared across programs" },
          { icon: "scale", title: "Specialist rules kept", text: "each program reviewed on its own" },
        ]}
        image={{
          src: "/images/partner-onboarding/hero-partner-onboarding.webp",
          alt: "A presenter walking a team through a plan in an open-plan office",
          width: 1200,
          height: 1200,
          crop: "aspect-[281/240]",
        }}
        actions={{
          primary: { label: "Find your pathway", href: "#find-your-pathway" },
          secondary: { label: "Compare programs", href: "#compare-programs" },
        }}
      />

      <section id="partner-pathways" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Partner pathways"
            title="Choose a program to see the requirements that may apply."
            description="Programs and market availability come from a verified source. Each program keeps its own rules."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ label, text, icon }, i) => {
              const Icon = partnerIcons[icon];
              return (
                <Reveal key={label} delay={i * 80} className="h-full">
                  <Link
                    href={hrefFor(label)}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{label}</span>
                    <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700">
                      View requirements <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="find-your-pathway" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <SectionTitle
              eyebrow="Find your pathway"
              title="Tell us where and how your organization intends to operate."
              description="Answer two questions and we'll suggest the program to start with. Some organizations need more than one program."
            />
            <TickList items={["A suggestion, not an eligibility decision", "You can apply to more than one program", "Nothing is shared or submitted"]} />
          </div>
          <Reveal direction="left" delay={150}>
            <PathwayFinder />
          </Reveal>
        </div>
      </section>

      <section id="compare-programs" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Compare programs" title="What each program reviews" />
          <Reveal delay={150}>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    {["Program", "Main evidence", "Specialist check", "What activation enables"].map((h) => (
                      <th key={h} className="w-1/4 py-3 pr-4 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([program, evidence, check, enables]) => (
                    <tr key={program} className="border-b border-slate-100 transition-colors hover:bg-brand-light/50">
                      <th scope="row" className="py-3 pr-4 font-semibold">
                        <Link href={hrefFor(program)} className="text-ink underline underline-offset-4 transition-colors hover:text-gold">
                          {program}
                        </Link>
                      </th>
                      <td className="py-3 pr-4 text-ink">{evidence}</td>
                      <td className="py-3 pr-4 text-ink">{check}</td>
                      <td className="py-3 text-ink">{enables}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="how-onboarding-works" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="How onboarding works" title="Shared where it helps, specialist where it matters" />
          <HorizontalSteps steps={onboardingSteps} />
        </div>
      </section>

      <section id="what-youll-need" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="What you'll need" title="Prepare these before you start" />
          <RequirementsGrid
            items={preparation}
            privacy={{
              icon: "check",
              title: "Submit application for review",
              text: "Your receipt does not guarantee approval or activation. Keep your reference to check status.",
            }}
          />
        </div>
      </section>

      <section id="review-statuses" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Review statuses" title="What each status means" description="Every program has its own status — one approval never implies another." />
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statuses.map(({ label, text, tone }, i) => {
              const s = toneStyles[tone];
              return (
                <Reveal as="li" key={label} delay={i * 60} className="h-full">
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                    <p className={`flex items-center gap-1.5 text-[13px] font-semibold ${s.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {label}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="privacy-and-consent" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Privacy & consent" title="How your application information is used" />
          <IconCards
            cards={[
              {
                icon: "lock",
                title: "Purpose",
                text: "We will use your details to assess this partner application. Evidence is stored securely and only authorized reviewers can access it.",
              },
              { icon: "message", title: "Marketing is separate", text: "Optional business updates need their own consent and never affect your application." },
            ]}
          />
        </div>
      </section>

      <FaqSection id="partner-onboarding-faqs" eyebrow="FAQ" title="Partner Onboarding questions" description="Proposed answers, pending legal and market review." faqs={faqs} />
    </>
  );
}
