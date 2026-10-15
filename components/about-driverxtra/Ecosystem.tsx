import Link from "next/link";
import { ArrowRight, Car, CreditCard, Crosshair, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const categories = [
  {
    title: "Vehicles",
    icon: Car,
    image: "/images/about/ecosystem-vehicles.png",
    items: [
      "New and used vehicles",
      "Certified inventory",
      "Electric and hybrid",
      "Commercial and fleet",
      "Luxury and collector",
      "Motorcycles and powersports where supported",
    ],
    cta: "Browse vehicles",
  },
  {
    title: "Parts & Accessories",
    icon: Crosshair,
    image: "/images/about/ecosystem-parts.png",
    items: [
      "OEM and aftermarket",
      "New, refurbished and used",
      "Performance and tuning",
      "Tires and wheels",
      "EV components and charging",
      "Tools, garage equipment and consumables",
    ],
    cta: "Find parts that fit",
  },
  {
    title: "Services",
    icon: Wrench,
    image: "/images/about/ecosystem-services.png",
    items: [
      "Inspection and appraisal",
      "Maintenance and repair",
      "Tires and installation",
      "Detailing",
      "Transport and shipping",
      "Storage and roadside support",
    ],
    cta: "Find services",
  },
  {
    title: "Finance & Insurance",
    icon: CreditCard,
    image: "/images/about/ecosystem-finance.png",
    items: [
      "Pre-qualification where permitted",
      "Loan and lease comparison",
      "Insurance comparison",
      "Commercial and fleet options",
      "Third-party regulated providers",
      "Clear disclosures and provider attribution",
    ],
    cta: "Compare options",
  },
];

export default function Ecosystem() {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="One automotive ecosystem"
          title="Vehicles, parts, services and ownership — unified."
          description="Traditional automotive platforms often specialize in one moment: finding a car, selling a part, booking a repair or generating a lead. DriverXtra is designed around the whole commerce journey, allowing each category to remain specialized while sharing common trust, identity, discovery and transaction infrastructure."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ title, icon: Icon, image, items, cta }, i) => (
            <Reveal key={title} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:-translate-y-2 hover:border-brand hover:shadow-[0_28px_50px_-24px_rgba(15,23,42,0.4)] hover:ring-transparent">
                <div className="relative h-40 overflow-hidden">
                  <BgImage src={image} className="transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/40 bg-brand-light text-brand-dark transition-all duration-500 group-hover:bg-brand group-hover:text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    {title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2 text-[13px] leading-snug text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#"
                    className="mt-5 inline-flex w-fit items-center gap-1.5 border-b-2 border-brand pb-1 text-sm font-semibold text-ink"
                  >
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
