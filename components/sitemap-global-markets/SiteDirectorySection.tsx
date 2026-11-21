import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { footerColumns, hrefFor } from "@/lib/navigation";
import { columnSummaries } from "./data";

const CURRENT_PAGE = "Sitemap & Global Markets";
const num = (i: number) => String(i + 1).padStart(2, "0");
const anchor = (i: number) => `directory-${num(i)}`;

/** Every footer destination, in footer order, built from the footer's own data. */
export default function SiteDirectorySection() {
  return (
    <section id="directory" aria-labelledby="directory-title" className="scroll-mt-28 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal>
          <h2 id="directory-title" className="text-3xl font-bold tracking-tight text-ink sm:text-[34px]">
            Site directory
          </h2>
          <p className="mt-3 text-[16px] text-slate-600">Every destination in the site footer, in the same order.</p>
        </Reveal>

        {/* Jump list */}
        <nav aria-label="Directory sections" className="mt-8">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col, i) => (
              <li key={col.title}>
                <a
                  href={`#${anchor(i)}`}
                  className="flex items-center gap-2 rounded-lg bg-[#F6F8FB] px-3 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-slate-200"
                >
                  <span className="text-xs text-gold">{num(i)}</span>
                  <span className="flex-1">{col.title}</span>
                  <span className="text-xs font-normal text-slate-500">
                    {col.links.length}
                    <span className="sr-only"> links</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col, i) => (
            <Reveal
              as="li"
              key={col.title}
              delay={(i % 4) * 60}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <section id={anchor(i)} aria-labelledby={`${anchor(i)}-title`} className="scroll-mt-28">
                <h3 id={`${anchor(i)}-title`} className="flex items-baseline gap-2 text-base font-bold text-ink">
                  <span className="text-xs text-gold">{num(i)}</span>
                  {col.title}
                </h3>
                <p className="mt-1 text-[13px] text-slate-500">{columnSummaries[col.title]}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((label) => {
                    const href = hrefFor(label);
                    if (label === CURRENT_PAGE) {
                      return (
                        <li key={label}>
                          <span aria-current="page" className="text-[15px] font-bold text-ink">
                            {label}
                          </span>
                        </li>
                      );
                    }
                    if (href === "#") {
                      return (
                        <li key={label}>
                          <span className="text-[15px] text-slate-500">{label}</span>
                          <span className="block text-[11px] text-slate-500">Page not available yet</span>
                        </li>
                      );
                    }
                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-[15px] text-ink underline underline-offset-4 transition-colors hover:text-blue-700"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
