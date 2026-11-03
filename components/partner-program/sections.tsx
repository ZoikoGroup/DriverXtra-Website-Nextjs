import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info, Lock, TriangleAlert } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import { partnerIcons, type PartnerIcon } from "./icons";

/** Shared building blocks for the partner program pages. */

const iconTile =
  "grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-ink";
const lightCard =
  "group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]";

export function PartnerHero({
  eyebrow,
  title,
  text,
  badges,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  text: string;
  badges: { icon: PartnerIcon; title: string; text: string }[];
  image: { src: string; alt: string; width: number; height: number };
  actions: { primary: { label: string; href: string }; secondary: { label: string; href: string } };
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <BgImage src="/images/home/hero-bg.jpeg" className="opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Reveal>
            <Eyebrow dark>
              <span className="text-xs tracking-wide uppercase">{eyebrow}</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">{text}</p>
          </Reveal>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {badges.map(({ icon, title, text }, i) => {
              const Icon = partnerIcons[icon];
              return (
                <Reveal key={title} delay={300 + i * 100} className="h-full">
                  <div className="group h-full rounded-xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.07]">
                    <p className="flex items-start gap-2 text-xs font-bold text-white">
                      <Icon className="mt-px h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:scale-125" />
                      {title}
                    </p>
                    <p className="mt-1 pl-6 text-[11px] leading-snug text-slate-400">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={600}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={actions.primary.href}
                className="btn-shine group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
              >
                {actions.primary.label} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={actions.secondary.href}
                className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
              >
                {actions.secondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal direction="left" delay={200}>
          <div className="group relative animate-float-slow">
            <div className="pointer-events-none absolute inset-10 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A notice with the numbered approval stages underneath. */
export function StagesNotice({ notice, stages }: { notice: string; stages: string[] }) {
  return (
    <Reveal delay={150}>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <p className="flex items-start gap-2 text-[13px] font-semibold text-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          {notice}
        </p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {stages.map((stage, i) => (
            <li
              key={stage}
              className="group flex animate-fade-up items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[12px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-ink">
                {i + 1}
              </span>
              {stage}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/** A ticked list for the left column of the eligibility section. */
export function TickList({ items, delay = 250 }: { items: string[]; delay?: number }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((t, i) => (
        <Reveal as="li" key={t} delay={delay + i * 70} className="flex gap-2.5 text-[14px] text-slate-700">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          {t}
        </Reveal>
      ))}
    </ul>
  );
}

/** Requirement cards, ending with the dark "evidence stays private" card. */
export function RequirementsGrid({
  items,
  privacy,
}: {
  items: { icon: PartnerIcon; title: string; text: string }[];
  privacy: { text: string; title?: string; icon?: PartnerIcon };
}) {
  const PrivacyIcon = privacy.icon ? partnerIcons[privacy.icon] : Lock;
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon, title, text }, i) => {
        const Icon = partnerIcons[icon];
        return (
          <Reveal key={title} delay={i * 80} className="h-full">
            <article className={lightCard}>
              <span className={iconTile}>
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
            </article>
          </Reveal>
        );
      })}
      <Reveal delay={items.length * 80} className="h-full">
        <article className="group h-full rounded-2xl bg-ink p-5 text-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.6)]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-ink transition-transform duration-300 group-hover:scale-110">
            <PrivacyIcon className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-[14px] font-bold">{privacy.title ?? "Your evidence stays private"}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{privacy.text}</p>
        </article>
      </Reveal>
    </div>
  );
}

/** Two side-by-side cards, each with a ticked list or a paragraph. A [lead, rest] item shows its lead in bold. */
export function IconCards({ cards }: { cards: { icon: PartnerIcon; title: string; text?: string; list?: (string | [string, string])[] }[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {cards.map(({ icon, title, text, list }, i) => {
        const Icon = partnerIcons[icon];
        return (
          <Reveal key={title} delay={i * 100} className="h-full">
            <article className={lightCard}>
              <span className={iconTile}>
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
              {text && <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{text}</p>}
              {list && (
                <ul className="mt-2 space-y-2">
                  {list.map((d) => (
                    <li key={typeof d === "string" ? d : d[0]} className="flex gap-2.5 text-[13px] text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {typeof d === "string" ? (
                        d
                      ) : (
                        <span>
                          <strong className="font-semibold text-ink">{d[0]}</strong> — {d[1]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/** A table on the left with a yellow warning card beside it. */
export function TableWithNote({
  heading,
  badge,
  columns,
  rows,
  note,
}: {
  heading: string;
  badge?: string;
  columns: string[];
  rows: ReactNode[][];
  note: { title: string; text: string };
}) {
  return (
    <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
      <Reveal delay={100}>
        <h3 className="flex items-center gap-2 text-[13px] font-bold text-ink">
          {heading}
          {badge && (
            <span className="rounded border border-dashed border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold uppercase">{badge}</span>
          )}
        </h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[440px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {columns.map((c, i) => (
                  <th key={c} className={`py-3 font-semibold ${i < columns.length - 1 ? "pr-4" : ""} ${columns.length === 2 && i === 0 ? "w-1/2" : ""}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([first, ...rest], r) => (
                <tr key={r} className="border-b border-slate-200/70 transition-colors hover:bg-brand-light/50">
                  <th scope="row" className="py-3 pr-4 font-semibold text-slate-600">
                    {first}
                  </th>
                  {rest.map((cell, c) => (
                    <td key={c} className={`py-3 text-ink ${c < rest.length - 1 ? "pr-4" : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <Reveal direction="left" delay={200}>
        <article className="group rounded-2xl border border-brand bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(232,172,0,0.45)]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light text-gold transition-transform duration-300 group-hover:animate-shake">
            <TriangleAlert className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-[15px] font-bold text-ink">{note.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{note.text}</p>
        </article>
      </Reveal>
    </div>
  );
}

/** An image with yellow numbered steps beside it. */
export function NumberedSteps({ image, steps }: { image: { src: string; alt: string }; steps: { title: string; text: string }[] }) {
  return (
    <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
      <Reveal direction="right">
        <div className="group relative aspect-[328/246] overflow-hidden rounded-2xl">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
      </Reveal>
      <ol className="space-y-5">
        {steps.map(({ title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 90} className="group flex gap-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-brand">
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
  );
}

const partnerRoutes = [
  "Become a Service Provider",
  "Inspection Partner Program",
  "Transport Partner Program",
  "Finance & Insurance Partners",
  "Become a Parts Seller",
  "OEM & Distributor Program",
];

/** Links to the other partner routes, leaving out the current page. */
export function RelatedPartnerLinks({ current, title, text }: { current: string; title: string; text: string }) {
  return (
    <section className="bg-white py-12">
      <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
        <Reveal>
          <p className="text-[15px] font-bold text-ink">{title}</p>
          <p className="mt-1 text-[13px] text-slate-600">{text}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-3">
            {partnerRoutes
              .filter((label) => label !== current)
              .map((label) => (
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
  );
}
