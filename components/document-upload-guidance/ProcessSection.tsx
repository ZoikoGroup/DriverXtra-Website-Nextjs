import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { uploadSteps } from "./data";

export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Process"
          title="How upload works"
          description="Each step is separate. A file that’s received hasn’t been checked, reviewed or accepted."
        />

        <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {uploadSteps.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 60}>
              <div className="flex h-full min-h-[100px] flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all duration-500 hover:-translate-y-1 hover:border-brand/60">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] font-bold text-brand">
                  {i + 1}
                </span>
                <span className="my-auto pt-2 text-sm leading-snug font-semibold text-ink">{step}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
