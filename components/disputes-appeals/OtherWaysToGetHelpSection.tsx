import type { ReactNode } from "react";
import Image from "next/image";
import { CreditCard, Building2, AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type HelpChannelCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: "card" | "building" | "alert";
};

const DEFAULT_HELP_CARDS: HelpChannelCard[] = [
  {
    id: "bank-or-payment-provider",
    title: "Your bank or payment provider",
    description:
      "For charges, chargebacks or refunds, use the provider's official complaint process.",
    imageSrc: "/images/disputes/12.png",
    imageAlt: "Person holding smartphone and working on laptop computer",
    icon: "card",
  },
  {
    id: "consumer-or-regulatory-bodies",
    title: "Consumer or regulatory bodies",
    description:
      "Many markets have independent consumer or dispute-resolution services. Check official sources for yours.",
    imageSrc: "/images/disputes/13.png",
    imageAlt: "Modern glass skyscraper architecture looking up",
    icon: "building",
  },
  {
    id: "emergencies-and-crime",
    title: "Emergencies and crime",
    description:
      "For immediate danger, contact local emergency services. For suspected crime, contact the relevant authority.",
    imageSrc: "/images/disputes/14.png",
    imageAlt: "Top down view of team collaborating around desks with laptops",
    icon: "alert",
  },
];

type OtherWaysToGetHelpSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: HelpChannelCard[];
  className?: string;
};

export default function OtherWaysToGetHelpSection({
  id = "other-ways-to-get-help",
  eyebrow = "Other help",
  title = "Learn about other ways to get help",
  description = "This route doesn't replace legal or provider rights.",
  cards = DEFAULT_HELP_CARDS,
  className = "bg-[#F6F8FB]",
}: OtherWaysToGetHelpSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid for Other Help Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 50}>
              <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs h-full">
                <div>
                  {/* Zero-padding edge-to-edge top image */}
                  <div className="relative aspect-[22/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    {/* Slate Icon Box */}
                    <div className="mb-4 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                      {card.icon === "card" && (
                        <CreditCard className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "building" && (
                        <Building2 className="h-4 w-4 stroke-[2]" />
                      )}
                      {card.icon === "alert" && (
                        <AlertTriangle className="h-4 w-4 stroke-[2]" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-ink sm:text-lg">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
