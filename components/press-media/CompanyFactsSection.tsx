import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { COMPANY_FACTS, IMG } from "./data";

export default function CompanyFactsSection() {
  return (
    <section id="company-facts" className="bg-[#f7f9fc] py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Company facts"
          title="Approved company snapshot"
          description="Only facts confirmed by Corporate Communications appear here. We don't estimate size, reach or results."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <dl className="grid h-full content-start gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[150px_1fr]">
              {COMPANY_FACTS.map((f) => (
                <div key={f.label} className="contents">
                  <dt className="text-[15px] font-bold text-ink">{f.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-slate-600">{f.value}</dd>
                </div>
              ))}
              <dt className="text-[15px] font-bold text-ink">Fact sheet</dt>
              <dd className="flex items-center gap-1.5 text-[15px] text-slate-600">
                <span className="h-2 w-2 rounded-full border border-slate-400" />
                Pending update
              </dd>
            </dl>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[602/226]">
                <Image
                  src={`${IMG}/facts-spokespeople.webp`}
                  alt="Blue glass office towers against a clear sky"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[17px] font-bold text-ink">Spokespeople</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  No spokesperson profiles are published in this version. Requests are routed by Corporate
                  Communications.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
