import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { disclosureMeta } from "./data";

export default function ComplianceHeroSection() {
  return (
    <section id="compliance-hero" className="relative overflow-hidden bg-navy py-10 text-white md:py-14">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-7">
          <Reveal>
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Compliance Disclosures</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              Find information about how DriverXtra and participating third parties may have different responsibilities.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <dl id="changes" className="mt-2 flex scroll-mt-28 flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
              <div className="flex gap-1">
                <dt>Current disclosure version:</dt>
                <dd>{disclosureMeta.version}</dd>
              </div>
              <div className="flex gap-1">
                <dt>Published:</dt>
                <dd>{disclosureMeta.published}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-300">Disclosure details depend on the product, provider and location.</p>
          </Reveal>
        </div>

        <Reveal direction="zoom" delay={150} className="lg:col-span-5">
          <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <Image
              src="/images/compliance-disclosures/hero-signing-documents.webp"
              alt="A person signing paper documents at a desk"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
