import { CarFront, FileCheck2, Handshake, Search } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { title: "Search & compare", text: "Filter millions of listings by price, location, history and more.", icon: Search },
  { title: "Verify with confidence", text: "Check seller verification, history reports and independent inspections.", icon: FileCheck2 },
  { title: "Finance & insure", text: "Get pre-qualified and compare cover without leaving the listing.", icon: Handshake },
  { title: "Drive away", text: "Complete securely and arrange delivery or collection on your terms.", icon: CarFront },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="How it works"
          title="From search to keys in four steps"
          description="A simple, transparent journey backed by verified partners at every stage."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="absolute top-8 right-[12%] left-[12%] hidden h-px border-t-2 border-dashed border-slate-200 lg:block" />
          {steps.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="group relative flex flex-col items-center text-center">
                <span className="relative grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-ink text-brand shadow-lg ring-1 ring-slate-200 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-ink">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-ink ring-2 ring-white transition-colors duration-500 group-hover:bg-ink group-hover:text-brand">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
