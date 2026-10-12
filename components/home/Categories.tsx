import Link from "next/link";
import { ArrowUpRight, Bike, Bus, Car, CarFront, Crown, Gem, Truck, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const categories = [
  { name: "SUVs & Crossovers", count: "412K listings", icon: CarFront },
  { name: "Sedans & Coupes", count: "368K listings", icon: Car },
  { name: "Trucks & Vans", count: "221K listings", icon: Truck },
  { name: "Electric & Hybrid", count: "154K listings", icon: Zap },
  { name: "Luxury & Performance", count: "96K listings", icon: Gem },
  { name: "Classic & Collector", count: "38K listings", icon: Crown },
  { name: "Motorcycles", count: "127K listings", icon: Bike },
  { name: "Commercial & Fleet", count: "84K listings", icon: Bus },
];

export default function Categories() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Browse vehicles"
          title="Find the right vehicle, faster"
          description="Explore millions of new, used and certified vehicles from verified dealers and private sellers."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, count, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 80}>
              <Link
                href="#"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand hover:shadow-[0_24px_48px_-16px_rgba(15,23,42,0.2)]"
              >
                <span className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-brand-light opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
                <span className="relative grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-ink transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-brand">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="relative mt-6 text-lg font-semibold text-ink">{name}</h3>
                <p className="relative mt-1 text-sm text-slate-500">{count}</p>
                <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 text-slate-300 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
