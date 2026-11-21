import { Gauge, Layers, Tag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const tips = [
  {
    icon: Gauge,
    title: "Start with a valuation",
    text: "An estimate based on similar vehicles. Treat it as a guide, not a promise.",
  },
  {
    icon: Layers,
    title: "Compare like with like",
    text: "Look at similar cars — same age, mileage, condition and spec. Asking prices aren't sold prices.",
  },
  {
    icon: Tag,
    title: "Leave room to negotiate",
    text: "Decide your lowest acceptable price before you talk to buyers.",
  },
];

export default function SetAskingPriceSection() {
  return (
    <section id="price" className="scroll-mt-28 bg-[#F6F8FB] py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Step 4"
          title="Set a realistic asking price"
          description="An asking price is what you hope to get. It isn't a valuation or a completed sale."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tips.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-brand transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
