import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import EvidenceBadge from "./EvidenceBadge";
import type { Evidence } from "./data";

const cards: { title: string; evidence: Evidence; text: string; image: string; alt: string }[] = [
  {
    title: "Asking price",
    evidence: "observed",
    text: "What a seller advertises at a point in time. Negotiation, relisting and concessions aren't captured.",
    image: "/images/methodology-data-standards/asking-price.webp",
    alt: "A car for sale on a forecourt",
  },
  {
    title: "Sold price",
    evidence: "notEvaluated",
    text: "A verified completed-sale amount from an entitled source. No approved sold-price source exists yet, so none is published.",
    image: "/images/methodology-data-standards/sold-price.webp",
    alt: "A completed sale agreement being signed",
  },
];

export default function AskingVsSoldSection() {
  return (
    <section id="asking-vs-sold" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <PressHeading
          eyebrow="Asking vs sold"
          title="Asking prices and sold prices are different measures"
          description="They're never combined or compared without a shared, approved method."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="relative aspect-[8/3]">
                  <Image src={c.image} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="flex flex-wrap items-center gap-x-2 text-lg font-bold text-ink">
                    {c.title}
                    <EvidenceBadge evidence={c.evidence} className="text-lg font-bold" />
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
