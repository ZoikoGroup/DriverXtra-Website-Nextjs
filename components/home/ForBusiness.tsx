import Link from "next/link";
import { ArrowRight, Building2, Check, Store, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const audiences = [
  {
    title: "Dealers & Retailers",
    icon: Store,
    points: ["Branded dealer storefront", "Inventory feeds & CRM integrations", "Lead and performance analytics"],
    cta: "Explore dealer solutions",
  },
  {
    title: "Fleets & Enterprise",
    icon: Building2,
    points: ["Fleet acquisition & disposition", "Maintenance networks", "Lifecycle cost analytics"],
    cta: "Explore fleet solutions",
    featured: true,
  },
  {
    title: "Providers & Parts Sellers",
    icon: Wrench,
    points: ["Reach verified vehicle owners", "Booking & order integrations", "Partner onboarding support"],
    cta: "Become a partner",
  },
];

export default function ForBusiness() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="For business"
          title="Grow on DriverXtra"
          description="Tools and integrations for every business across the automotive lifecycle."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {audiences.map(({ title, icon: Icon, points, cta, featured }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  featured
                    ? "bg-brand text-ink shadow-[0_30px_60px_-20px_rgba(232,172,0,0.6)]"
                    : "border border-slate-200 bg-white hover:border-ink hover:shadow-xl"
                }`}
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                    featured ? "bg-ink text-brand" : "bg-brand-light text-ink"
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <ul className="mt-6 flex-1 space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-ink" : "text-brand-dark"}`} />
                      <span className={featured ? "text-ink/80" : "text-slate-600"}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                    featured ? "bg-ink text-white hover:bg-navy-700" : "bg-slate-100 text-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
