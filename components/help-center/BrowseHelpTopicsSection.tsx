import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CreditCard,
  FileCheck2,
  Key,
  ShoppingCart,
  Tag,
  User,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

interface TopicCard {
  id: string;
  title: string;
  articleCount: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Key;
  href: string;
}

const helpTopics: TopicCard[] = [
  {
    id: "buying-a-vehicle",
    title: "Buying a vehicle",
    articleCount: "3 articles",
    imageSrc: "/images/Help-Center/hc2.png",
    imageAlt: "Sports car for sale",
    icon: Key,
    href: "#buying-a-vehicle",
  },
  {
    id: "selling-a-vehicle",
    title: "Selling a vehicle",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc3.png",
    imageAlt: "Vehicle valuation and listing",
    icon: Tag,
    href: "#selling-a-vehicle",
  },
  {
    id: "parts-and-accessories",
    title: "Parts and accessories",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc4.png",
    imageAlt: "Automotive replacement parts",
    icon: FileCheck2,
    href: "#parts-and-accessories",
  },
  {
    id: "services-and-bookings",
    title: "Services and bookings",
    articleCount: "1 article",
    imageSrc: "/images/Help-Center/hc5.png",
    imageAlt: "Automotive repair garage service",
    icon: Wrench,
    href: "#services-and-bookings",
  },
  {
    id: "finance-and-insurance",
    title: "Finance and insurance",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc6.png",
    imageAlt: "Finance and loan consultation",
    icon: CreditCard,
    href: "#finance-and-insurance",
  },
  {
    id: "orders-payments-and-returns",
    title: "Orders, payments and returns",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc7.png",
    imageAlt: "Secure checkout and returns",
    icon: ShoppingCart,
    href: "#orders-payments-and-returns",
  },
  {
    id: "accounts-and-verification",
    title: "Accounts and verification",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc8.png",
    imageAlt: "Account credentials and verification",
    icon: User,
    href: "#accounts-and-verification",
  },
  {
    id: "dealer-fleet-and-business",
    title: "Dealer, fleet and business",
    articleCount: "2 articles",
    imageSrc: "/images/Help-Center/hc9.png",
    imageAlt: "Commercial transport and enterprise management",
    icon: Building2,
    href: "#dealer-fleet-and-business",
  },
];

export default function BrowseHelpTopicsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={container}>
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ffc20e]" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Browse</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Browse help topics
            </h2>
          </Reveal>
        </div>

        {/* 8-Card Grid (4 cols on desktop) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {helpTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Reveal key={topic.id} delay={index * 50}>
                <Link
                  href={topic.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-lg hover:border-slate-300"
                >
                  {/* Top Image */}
                  <div className="relative aspect-[2/1] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={topic.imageSrc}
                      alt={topic.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-amber-500" />
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-amber-600 transition-colors">
                        {topic.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-[11px] sm:text-xs text-slate-500">
                      {topic.articleCount}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
