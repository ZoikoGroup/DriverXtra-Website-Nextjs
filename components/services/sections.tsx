import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";
import type { Charge, ChargeStatus, ServiceCard, Step } from "./types";

/** Section blocks shared by the Automotive Services pages. */

export function ServiceHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs">{eyebrow}</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-[2rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl sm:leading-[1.08]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
              {text}
            </p>
          </Reveal>
        </div>
        {/* Capped on tablets so the stacked image doesn't fill the whole screen. */}
        <Reveal
          direction="left"
          delay={200}
          className="w-full max-w-xl lg:max-w-none"
        >
          <div className="group relative overflow-hidden rounded-2xl bg-navy-700 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <Image
              src={image}
              alt={imageAlt}
              width={539}
              height={404}
              priority
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Wraps a page section with the standard spacing, background and container. */
export function ServiceSection({
  id,
  className = "bg-white",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      // overflow-x-clip: cards that slide in from the side must not widen the page on phones.
      className={`scroll-mt-40 overflow-x-clip py-12 sm:py-16 md:py-20 ${className}`}
    >
      <div className={container}>{children}</div>
    </section>
  );
}

export function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, text, image, alt }, i) => (
        <Reveal key={title} delay={i * 90} className="h-full">
          <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
            <div className="relative aspect-[294/184] overflow-hidden">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">
                {title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                {text}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

const chargeStatus: Record<
  ChargeStatus,
  { label: string; dot: string; text: string }
> = {
  quoted: {
    label: "Quoted by provider",
    dot: "border border-slate-400 bg-white",
    text: "text-slate-600",
  },
  conditional: {
    label: "Conditional",
    dot: "bg-amber-600",
    text: "text-amber-800",
  },
  consent: {
    label: "Requires consent",
    dot: "bg-red-600",
    text: "text-red-700",
  },
  "new-consent": {
    label: "Requires new consent",
    dot: "bg-red-600",
    text: "text-red-700",
  },
  included: {
    label: "Included",
    dot: "bg-emerald-700",
    text: "text-emerald-700",
  },
  unknown: {
    label: "Unknown until quoted",
    dot: "border border-slate-400 bg-white",
    text: "text-slate-600",
  },
  "not-confirmed": {
    label: "Not confirmed",
    dot: "border border-slate-400 bg-white",
    text: "text-slate-600",
  },
};

const DemoBadge = () => (
  <span className="rounded border border-brand/60 bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">
    DEMO
  </span>
);

type PricingSectionProps = {
  charges: Charge[];
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  /** Pass null to hide. */
  description?: ReactNode;
  /** Header labels for the first two columns. */
  columns?: [string, string];
  /** Show the DEMO badge next to the "Status" header instead of in the description. */
  demoInHeader?: boolean;
};

export function PricingSection({
  charges,
  id = "pricing",
  className = "bg-white",
  eyebrow = "Pricing transparency",
  title = "What you might be charged for",
  description = (
    <span className="inline-flex flex-wrap items-center gap-2">
      No prices are shown until a provider quotes them.
      <DemoBadge />
    </span>
  ),
  columns = ["Charge", "What it covers"],
  demoInHeader = false,
}: PricingSectionProps) {
  return (
    <ServiceSection id={id} className={className}>
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />
      {/* Phones: one card per charge instead of a sideways-scrolling table. */}
      {demoInHeader && (
        <p className="mt-4 sm:hidden">
          <DemoBadge />
        </p>
      )}
      <ul className="mt-6 space-y-3 sm:hidden">
        {charges.map(({ charge, covers, status }, i) => {
          const s = chargeStatus[status];
          return (
            <Reveal key={charge} as="li" delay={i * 60}>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className="text-[14px] font-bold text-ink">{charge}</p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[12px] ${s.text}`}
                  >
                    <span className={`h-2 w-2 rounded-sm ${s.dot}`} />
                    {s.label}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  {covers}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={150} className="hidden sm:block">
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-2.5 py-2.5 font-semibold">{columns[0]}</th>
                <th className="px-2.5 py-2.5 font-semibold">{columns[1]}</th>
                <th className="px-2.5 py-2.5 font-semibold">
                  <span className="inline-flex items-center gap-2">
                    Status {demoInHeader && <DemoBadge />}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {charges.map(({ charge, covers, status }) => {
                const s = chargeStatus[status];
                return (
                  <tr
                    key={charge}
                    className="border-b border-slate-200 transition-colors hover:bg-slate-50"
                  >
                    <th
                      scope="row"
                      className="px-2.5 py-3 font-semibold text-slate-500"
                    >
                      {charge}
                    </th>
                    <td className="px-2.5 py-3 text-ink">{covers}</td>
                    <td className="px-2.5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 ${s.text}`}
                      >
                        <span className={`h-2 w-2 rounded-sm ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
    </ServiceSection>
  );
}

type StepsSectionProps = {
  steps: Step[];
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
};

export function StepsSection({
  steps,
  id = "how-it-works",
  className = "bg-slate-50",
  eyebrow = "Step by step",
  title = "How it works",
  description,
}: StepsSectionProps) {
  return (
    <ServiceSection id={id} className={className}>
      <SectionTitle eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-8">
        {steps.map(({ title, text, meta }, i) => (
          <Reveal key={title} as="li" delay={i * 100}>
            <div className="group relative flex gap-5 pb-6">
              {i < steps.length - 1 && (
                <span className="absolute top-9 bottom-0 left-[17px] w-0.5 bg-slate-200" />
              )}
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-navy font-extrabold text-brand transition-transform duration-500 group-hover:scale-110">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-[15px] font-bold text-ink">{title}</h3>
                <p className="mt-0.5 text-[14px] leading-relaxed text-slate-600">
                  {text}
                </p>
                {meta && (
                  <p className="mt-1 text-[12px] text-slate-500">{meta}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </ServiceSection>
  );
}

export function EvidenceSection({
  items,
  image,
  imageAlt,
}: {
  items: string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <ServiceSection id="evidence">
      <SectionTitle
        eyebrow="Evidence & permissions"
        title="What should be recorded"
      />
      <div className="mt-8 grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_1.25fr]">
        <Reveal direction="right">
          <div className="group overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={imageAlt}
              width={500}
              height={375}
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
        <div>
          <ul className="space-y-2.5">
            {items.map((item, i) => (
              <Reveal key={item} as="li" delay={100 + i * 80}>
                <span className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={550}>
            <p className="mt-4 text-[12px] text-slate-500">
              You choose who can see records. Sharing would always be shown
              before it happens.
            </p>
          </Reveal>
        </div>
      </div>
    </ServiceSection>
  );
}
