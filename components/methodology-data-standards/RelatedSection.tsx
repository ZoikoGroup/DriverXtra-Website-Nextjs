import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";
import { hrefFor } from "@/lib/navigation";

const IMG = "/images/methodology-data-standards";

const related = [
  { title: "Automotive Insights", image: `${IMG}/related-automotive-insights.webp`, alt: "A driver's hands on a steering wheel" },
  { title: "Market Trends & Price Indices", image: `${IMG}/related-market-trends.webp`, alt: "A data dashboard on a monitor" },
  { title: "Ownership Cost Guides", image: `${IMG}/related-ownership-costs.webp`, alt: "Paperwork and a calculator" },
  { title: "EV & Charging Guides", image: `${IMG}/related-ev-charging.webp`, alt: "An electric car charging" },
];

export default function RelatedSection() {
  return (
    <section id="related" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <PressHeading eyebrow="Related" title="Where these methods are used" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 80}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white px-[22px] pb-6">
                <div className="relative">
                  <div className="relative aspect-[23/10] overflow-hidden">
                    <Image src={r.image} alt={r.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <span className="absolute -bottom-7 left-0 grid h-12 w-12 place-items-center rounded-xl bg-navy text-brand ring-4 ring-white">
                    <FileText className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-12 text-base font-bold text-ink">{r.title}</h3>
                <Link
                  href={hrefFor(r.title)}
                  className="group mt-4 inline-flex items-center gap-2 text-base font-bold text-blue-700 hover:text-blue-900"
                >
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
