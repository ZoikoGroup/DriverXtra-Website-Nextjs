import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { statementMeta } from "./data";

export default function AccessibilityHeroSection() {
  return (
    <section id="accessibility-hero" className="relative overflow-hidden bg-navy py-10 text-white md:py-14">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-8">
          <Reveal>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Accessibility Statement</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              This page explains the accessibility information available for DriverXtra and how to request help.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              <div className="rounded-full border border-dashed border-slate-400 bg-white px-2.5 py-0.5 text-xs font-bold text-ink">
                <dt className="inline">Covers: </dt>
                <dd className="inline">{statementMeta.covers}</dd>
              </div>
              <div className="flex gap-1">
                <dt>Statement version:</dt>
                <dd>{statementMeta.version}</dd>
              </div>
              <div className="flex gap-1">
                <dt>Published:</dt>
                <dd>{statementMeta.published}</dd>
              </div>
              <div className="flex gap-1">
                <dt>Last reviewed:</dt>
                <dd>{statementMeta.lastReviewed}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-4">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src="/images/accessibility-statement/hero-laptop-desk.webp"
              alt="A laptop showing code on a white desk beside a plant"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
