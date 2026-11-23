import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function TermsHeroSection() {
  return (
    <section id="terms-hero" className="bg-navy py-10 text-white md:py-12">
      <div className={container}>
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-200 uppercase">
            <span aria-hidden className="h-0.5 w-5 bg-brand" />
            DriverXtra / Legal
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Terms of Use</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Read the Terms of Use available for your selected region and language.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
