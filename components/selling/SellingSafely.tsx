import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { safetyTips } from "./data";

type SellingSafelyProps = {
  /** Adds a "Report a concern" link to the scam-warning card. */
  reportLink?: boolean;
  className?: string;
};

export default function SellingSafely({ reportLink = false, className = "bg-white pb-20 md:pb-24" }: SellingSafelyProps) {
  return (
    <section className={className}>
      <div className={container}>
        <SectionTitle eyebrow="Trust, fees & safety" title="Selling safely" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {safetyTips.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 90}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <Icon className="h-4 w-4 text-brand-dark transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                  {title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                  {text}
                  {reportLink && title === "Something suspicious?" && (
                    <>
                      {" "}
                      <Link href="#" className="font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink">
                        Report a concern
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
