import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import { helpLinks } from "./data";

export default function SitemapHelpSection() {
  return (
    <section id="sitemap-help" aria-label="Search engines, help and safety" className="bg-white py-14 md:py-16">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 sm:px-6 md:grid-cols-2">
        <Reveal as="article" className="rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-lg font-bold text-ink">For search engines</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
            This page is a sitemap for people. A machine-readable XML sitemap isn&apos;t deployed for this prototype, so
            none is linked.
          </p>
        </Reveal>
        <Reveal as="article" delay={80} className="rounded-2xl border border-slate-200 bg-white p-7">
          <h2 className="text-lg font-bold text-ink">Help and safety</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {helpLinks.map((l) => (
              <li key={l}>
                <Link
                  href={hrefFor(l)}
                  className="inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-4 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
