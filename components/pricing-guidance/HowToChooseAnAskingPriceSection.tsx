import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type AskingPriceGuidelineCard = {
  id: string;
  title: string;
  description: string;
};

const DEFAULT_GUIDELINE_CARDS: AskingPriceGuidelineCard[] = [
  {
    id: "start-inside-the-range",
    title: "Start inside the range",
    description:
      "A price within the range is easier to justify with comparable listings.",
  },
  {
    id: "describe-the-car-honestly",
    title: "Describe the car honestly",
    description:
      "Accurate condition and history help buyers trust the price — and avoid disputes later.",
  },
  {
    id: "decide-your-lowest-price-first",
    title: "Decide your lowest price first",
    description:
      "Know your walk-away figure before you talk to buyers. No sale time is guaranteed.",
  },
];

type HowToChooseAnAskingPriceSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: AskingPriceGuidelineCard[];
  className?: string;
};

export default function HowToChooseAnAskingPriceSection({
  id = "how-to-choose-an-asking-price",
  eyebrow = "Choosing a price",
  title = "How to choose an asking price",
  description,
  cards = DEFAULT_GUIDELINE_CARDS,
  className = "bg-white",
}: HowToChooseAnAskingPriceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <Reveal delay={50}>
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        {/* 3-Column Grid for Price Guidance Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 50}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                <div>
                  <h3 className="text-sm font-bold text-ink sm:text-base">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
