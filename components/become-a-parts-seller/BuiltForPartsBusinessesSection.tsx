import Image from "next/image";
import { Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type PartsBusinessCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const PARTS_BUSINESS_CARDS: PartsBusinessCard[] = [
  {
    title: "Parts retailer",
    description: "New aftermarket or OEM-classified parts.",
    imageSrc: "/images/become-a-parts-seller/2.png",
    imageAlt: "Technician pouring motor oil during vehicle maintenance",
  },
  {
    title: "Distributor or wholesaler",
    description: "Supply to trade and consumers at volume.",
    imageSrc: "/images/become-a-parts-seller/3.png",
    imageAlt:
      "Water droplets reflecting fluid protection and chemical supplies",
  },
  {
    title: "Recycler / dismantler",
    description: "Used parts with provenance records.",
    imageSrc: "/images/become-a-parts-seller/4.png",
    imageAlt:
      "Aerial view of vehicle storage yard for dismantlers and recyclers",
  },
  {
    title: "Workshop selling parts",
    description: "Separate from service-provider participation.",
    imageSrc: "/images/become-a-parts-seller/5.png",
    imageAlt: "Automotive workshop bay with rear vehicle lights active",
  },
];

const SELLER_STEPS = [
  { step: 1, label: "Application received" },
  { step: 2, label: "Business verified" },
  { step: 3, label: "Catalog checked" },
  { step: 4, label: "Agreement signed" },
  { step: 5, label: "Selling enabled" },
  { step: 6, label: "Live listings" },
];

type BuiltForPartsBusinessesSectionProps = {
  id?: string;
  className?: string;
};

export default function BuiltForPartsBusinessesSection({
  id,
  className = "bg-white",
}: BuiltForPartsBusinessesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Who can sell"
          title="Built for parts businesses that can show what they sell"
          description="Choose the description that best matches your business. Eligibility depends on your market, categories and review."
        />

        {/* 4 Cards with Images */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PARTS_BUSINESS_CARDS.map(
            ({ title, description, imageSrc, imageAlt }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-start p-5">
                    <h3 className="text-sm font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>

        {/* Status Pipeline Banner Card */}
        <Reveal delay={200} className="mt-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Info className="h-4 w-4 shrink-0 text-amber-500" />
              <span>
                Business review, product checks, inventory and selling
                permissions are separate steps.
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {SELLER_STEPS.map(({ step, label }) => (
                <div
                  key={step}
                  className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 transition-colors hover:bg-slate-100/80"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                    {step}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
