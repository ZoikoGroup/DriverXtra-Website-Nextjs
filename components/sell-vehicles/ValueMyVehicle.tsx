import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { valuationNeeds } from "./data";

export default function ValueMyVehicle() {
  return (
    <section id="value-my-vehicle" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-2`}>
        <div>
          <SectionTitle
            eyebrow="Value My Vehicle"
            title="Check an estimated market range"
            description={
              <>
                Where valuation coverage is available, you&apos;ll get a range with its method, date and confidence — not a
                single &quot;price we&apos;ll pay&quot;.
              </>
            }
          />
          <Reveal delay={300}>
            <div className="mt-7 flex flex-wrap gap-3">
              {/* Valuation starts from the vehicle finder at the top of the page */}
              <Link
                href="#sell-start"
                className="btn-shine rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
              >
                Get My Valuation
              </Link>
              <Link
                href="#selling-methods"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
              >
                Return to methods
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={150}>
          <div className="rounded-2xl border border-slate-200 p-6 transition-all duration-500 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
            <h3 className="font-bold text-ink">What you&apos;ll need</h3>
            <ul className="mt-4 space-y-3">
              {valuationNeeds.map(({ text, icon: Icon }, i) => (
                <Reveal key={text} as="li" direction="left" delay={250 + i * 100}>
                  <span className="group flex items-center gap-3 text-sm text-slate-700">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    {text}
                  </span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500">No account or marketing sign-up needed to see an estimate.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
