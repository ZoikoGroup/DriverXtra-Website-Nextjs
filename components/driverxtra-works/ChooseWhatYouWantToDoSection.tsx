import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CreditCard, Key, ShieldCheck, Tag, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface OptionCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Key;
  href: string;
  isHighlighted?: boolean;
}

const actionOptions: OptionCard[] = [
  {
    id: "find-vehicle",
    title: "Find a vehicle",
    description: "Search and compare listings, then review what is known before contacting a seller.",
    imageSrc: "/images/DriverXtra-Works/w2.png",
    imageAlt: "Sports car for sale",
    icon: Key,
    href: "#find-vehicle",
    isHighlighted: true,
  },
  {
    id: "sell-vehicle",
    title: "Sell a vehicle",
    description: "Prepare your listing, follow review requirements, and handle inquiries safely.",
    imageSrc: "/images/DriverXtra-Works/w3.png",
    imageAlt: "Blue sports coupe ready to sell",
    icon: Tag,
    href: "#sell-vehicle",
  },
  {
    id: "find-parts",
    title: "Find parts",
    description: "Search products and check fitment, seller claims and return conditions.",
    imageSrc: "/images/DriverXtra-Works/w4.png",
    imageAlt: "Vehicle engine maintenance and parts",
    icon: ShieldCheck,
    href: "#find-parts",
  },
  {
    id: "arrange-service",
    title: "Arrange a service",
    description: "Find an eligible provider and request details or an appointment.",
    imageSrc: "/images/DriverXtra-Works/w5.png",
    imageAlt: "Vehicle in repair garage",
    icon: Wrench,
    href: "#arrange-service",
  },
  {
    id: "finance-insurance",
    title: "Explore finance and insurance",
    description: "Learn the costs, choices and questions to ask providers.",
    imageSrc: "/images/DriverXtra-Works/w6.png",
    imageAlt: "Paperwork, calculations and financing plans",
    icon: CreditCard,
    href: "#finance-insurance",
  },
  {
    id: "business-partners",
    title: "Business and partners",
    description: "Find fleet, dealer, supplier and integration pathways.",
    imageSrc: "/images/DriverXtra-Works/w7.png",
    imageAlt: "Commercial transport truck on highway",
    icon: Building2,
    href: "#business-partners",
  },
];

export default function ChooseWhatYouWantToDoSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={container}>
        {/* Section Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Get started</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Choose what you want to do
            </h2>
          </Reveal>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionOptions.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={index * 60}>
                <div
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-lg ${
                    card.isHighlighted
                      ? "border-2 border-[#eab308] shadow-sm"
                      : "border border-slate-200 hover:border-slate-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-amber-500" />
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {card.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 flex-1">
                      {card.description}
                    </p>

                    <div className="mt-4 sm:mt-5 pt-1">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span>See the steps</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
