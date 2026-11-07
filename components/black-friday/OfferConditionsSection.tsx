import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { CONDITIONS, OFFER_MONTHS, OFFER_PERCENT, type ConditionStatus } from "./data";

const STATUS_STYLES: Record<ConditionStatus, string> = {
  Proposed: "border-[#fcd116]/70 bg-[#fcd116]/15 text-[#fcd116]",
  Pending: "border-[#fcd116]/50 bg-[#fcd116]/10 text-[#fcd116]",
  "Not offered": "border-slate-500 bg-slate-500/15 text-slate-300",
  Listed: "border-[#4fb3a5]/60 bg-[#2f8a7e]/20 text-[#7fd3c6]",
};

export default function OfferConditionsSection() {
  return (
    <section id="offer-conditions" className="scroll-mt-28 bg-[#13243c] py-20 text-white md:py-24">
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="bf-display text-4xl leading-[1.05] font-extrabold sm:text-5xl">
                Black Friday
                <br />
                offer conditions
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-slate-300">
                What the proposed offer covers, and what still needs sign-off before it can go live.
              </p>
            </Reveal>

            <Reveal direction="zoom" delay={150}>
              <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0d1829] p-8 sm:p-10">
                <span
                  aria-hidden
                  className="absolute top-8 -right-14 w-60 rotate-[35deg] bg-[#c2410c] py-2 text-center text-xs font-bold text-white sm:top-10 sm:-right-12"
                >
                  Friday sale
                </span>
                <p className="bf-display text-[88px] leading-none font-extrabold text-[#fcd116] italic sm:text-[112px]">
                  {OFFER_PERCENT}%
                </p>
                <p className="bf-display mt-3 max-w-[15rem] text-xl leading-tight font-extrabold">
                  off eligible driver-plan charges for the first {OFFER_MONTHS} months
                </p>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-300">
                  Proposed offer for internal review only. If it isn&apos;t approved, this page shows standard plan
                  prices only.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="border-b border-white/10 lg:col-span-7 lg:col-start-6 lg:self-center lg:pl-8">
            {CONDITIONS.map((c, i) => (
              <Reveal
                key={c.title}
                as="li"
                delay={i * 50}
                className="flex items-center justify-between gap-4 border-t border-white/10 py-5"
              >
                <div>
                  <p className="text-[17px] font-bold">{c.title}</p>
                  <p className="mt-0.5 text-[15px] text-slate-300">{c.detail}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-[13px] font-bold whitespace-nowrap ${STATUS_STYLES[c.status]}`}
                >
                  {c.status}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
