import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { Eyebrow, container } from "@/components/ui/SectionTitle";

/** Shared building blocks for the automotive service pages. */

export const DemoBadge = () => (
  <span className="rounded border border-dashed border-brand bg-brand-light px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold">DEMO</span>
);

type Img = { src: string; alt: string; width: number; height: number };

export function ServiceHero({
  eyebrow,
  title,
  text,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: Img;
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
              <span className="text-xs">{eyebrow}</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">{text}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
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

/** Form column with a "What happens next" card beside it. */
export function RequestSection({ id, title, image, children }: { id: string; title: string; image: Omit<Img, "width" | "height">; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-40 bg-white py-16">
      <div className={`${container} grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]`}>
        <div>
          <Reveal>
            <Eyebrow>
              Eligibility &amp; qualification <DemoBadge />
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink">{title}</h2>
          </Reveal>
          <Reveal delay={150} className="mt-3">
            {children}
          </Reveal>
        </div>
        <Reveal direction="left" delay={200}>
          <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
            <div className="relative aspect-[349/217] overflow-hidden">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
            </div>
            <div className="p-4">
              <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">What happens next</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                In a live service, your details would only go to a named, verified provider after you agree. In this prototype nothing is sent.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export type ChargeStatus = "quoted" | "consent" | "conditional";
export type Charge = { charge: string; covers: string; status: ChargeStatus; quotedBy?: string };

const statusStyles: Record<ChargeStatus, { label: string; dot: string; text: string }> = {
  quoted: { label: "Quoted by provider", dot: "border border-slate-400 bg-white", text: "text-slate-600" },
  consent: { label: "Requires consent", dot: "bg-red-600", text: "text-red-700" },
  conditional: { label: "Conditional", dot: "bg-amber-500", text: "text-amber-700" },
};

export function PricingSection({ charges, quotedBy = "provider" }: { charges: Charge[]; quotedBy?: string }) {
  return (
    <section id="pricing-transparency" className="scroll-mt-40 bg-white py-16">
      <div className={container}>
        <SectionTitle
          eyebrow="Pricing transparency"
          title="What you might be charged for"
          description={
            <>
              No prices are shown until a provider quotes them. <DemoBadge />
            </>
          }
        />
        <Reveal delay={150}>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="w-1/3 py-3 pr-4 font-semibold">Charge</th>
                  <th className="w-1/3 py-3 pr-4 font-semibold">What it covers</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {charges.map(({ charge, covers, status }) => {
                  const s = statusStyles[status];
                  return (
                    <tr key={charge} className="border-b border-slate-100 transition-colors hover:bg-brand-light/50">
                      <th scope="row" className="py-3 pr-4 font-semibold text-slate-600">
                        {charge}
                      </th>
                      <td className="py-3 pr-4 text-ink">{covers}</td>
                      <td className={`py-3 ${s.text}`}>
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                          {status === "quoted" ? `Quoted by ${quotedBy}` : s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StepsSection({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <section id="how-it-works" className="scroll-mt-40 bg-slate-50 py-16">
      <div className={container}>
        <SectionTitle eyebrow="Step by step" title="How it works" />
        <ol className="mt-8 max-w-2xl">
          {steps.map(({ title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 100} className="group relative flex gap-4 pb-7 last:pb-0">
              {i < steps.length - 1 && <span aria-hidden className="absolute top-8 bottom-0 left-[13px] w-px bg-slate-300" />}
              <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                <p className="mt-1 text-[13px] text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RecordsSection({ records, image }: { records: string[]; image: Omit<Img, "width" | "height"> }) {
  return (
    <section id="evidence-and-permissions" className="scroll-mt-40 bg-white py-16">
      <div className={container}>
        <SectionTitle eyebrow="Evidence & permissions" title="What should be recorded" />
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="right">
            <div className="group relative aspect-[348/261] overflow-hidden rounded-2xl">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
          </Reveal>
          <div>
            <ul className="space-y-2.5">
              {records.map((r, i) => (
                <Reveal as="li" key={r} delay={i * 70} className="flex gap-2.5 text-[14px] text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {r}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={400}>
              <p className="mt-4 text-xs text-slate-500">You choose who can see records. Sharing would always be shown before it happens.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
