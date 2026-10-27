"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { useRegion } from "@/lib/region";

type ProviderEmptyStateProps = {
  /** Who isn't published yet, e.g. "inspection & appraisal providers" or "installers". */
  subject: string;
  image: string;
  imageAlt: string;
  /** Overrides the default explanation under the heading. */
  text?: string;
  /** Optional buttons, e.g. jump links to other sections. The first is the yellow primary one. */
  actions?: { label: string; href: string }[];
};

const defaultText =
  "We only list providers once their identity, qualifications, service area and terms are verified. We won't show placeholder businesses, ratings or prices.";

/** No providers are verified yet, so this always shows the empty state for the visitor's market. */
export default function ProviderEmptyState({
  subject,
  image,
  imageAlt,
  text = defaultText,
  actions = [],
}: ProviderEmptyStateProps) {
  const region = useRegion();

  return (
    <Reveal delay={150}>
      <div className="group mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[1fr_1.6fr]">
        <div className="relative aspect-[484/300] overflow-hidden bg-black md:aspect-auto md:min-h-[260px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col items-start justify-center p-6 md:p-8">
          <h3 className="text-[16px] font-bold text-ink">
            No verified {subject} are published for {region} yet.
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
            {text}
          </p>
          {actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map(({ label, href }, i) => (
                <a
                  key={href}
                  href={href}
                  className={
                    i === 0
                      ? "btn-shine inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                      : "inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-[14px] font-semibold text-ink transition-colors hover:border-ink"
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
