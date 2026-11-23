import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function PrivacyPolicyHeroSection() {
  return (
    <section id="privacy-policy-hero" className="bg-navy py-10 text-white md:py-9">
      <div className={container}>
        <Reveal>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Understand how DriverXtra describes its handling of personal information.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
