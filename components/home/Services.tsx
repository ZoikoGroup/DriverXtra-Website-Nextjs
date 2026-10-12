import Link from "next/link";
import { ArrowRight, Banknote, ClipboardCheck, Cog, ShieldCheck, Truck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Vehicle Finance",
    text: "Get pre-qualified in minutes and compare loans and leases from regulated lenders.",
    icon: Banknote,
  },
  {
    title: "Insurance",
    text: "Compare personal and fleet cover side by side, with transparent pricing.",
    icon: ShieldCheck,
  },
  {
    title: "Parts & Accessories",
    text: "OEM and aftermarket parts matched to your exact vehicle by VIN.",
    icon: Cog,
  },
  {
    title: "Inspection & Appraisal",
    text: "Independent inspections and valuations before you buy or sell.",
    icon: ClipboardCheck,
  },
  {
    title: "Maintenance & Repair",
    text: "Book trusted workshops for servicing, repairs, tires and detailing.",
    icon: Wrench,
  },
  {
    title: "Transport & Shipping",
    text: "Move vehicles locally or across borders with vetted transport partners.",
    icon: Truck,
  },
];

export default function Services() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Everything in one place"
            title="More than a marketplace"
            description="From the first search to years of ownership, every service you need is connected through DriverXtra."
          />
          <Reveal delay={200}>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, text, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 3) * 100}>
              <Link
                href="#"
                className="group relative block h-full overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:ring-transparent"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Learn more
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
