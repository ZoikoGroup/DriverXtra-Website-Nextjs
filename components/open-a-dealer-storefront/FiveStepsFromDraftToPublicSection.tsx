import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type StepItem = {
  number: string;
  title: string;
  description: string;
};

const STEPS: StepItem[] = [
  {
    number: "1",
    title: "Use your approved business details.",
    description:
      "Canonical organization and location — never ID documents on a public page.",
  },
  {
    number: "2",
    title: "Choose your storefront identity and locations.",
    description: "Logo, cover, text, hours, business contact and services.",
  },
  {
    number: "3",
    title: "Select eligible vehicle inventory.",
    description: "Via Inventory Feeds and listing policy.",
  },
  {
    number: "4",
    title: "Preview your page and request review.",
    description:
      "Automated checks, and human review where required — no automatic approval.",
  },
  {
    number: "5",
    title: "Publish when your storefront is approved.",
    description: "A separate, explicit action after approval.",
  },
];

type FiveStepsFromDraftToPublicSectionProps = {
  id?: string;
  className?: string;
};

export default function FiveStepsFromDraftToPublicSection({
  id,
  className = "bg-white",
}: FiveStepsFromDraftToPublicSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="How it works"
          title="Five steps from draft to public"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={i * 80}>
              <div className="group flex h-full flex-col justify-start rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[#F5B400] font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink leading-snug">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
