import Image from "next/image";
import { Check, TriangleAlert, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type Tip = { kind: "do" | "dont" | "warn"; text: string };

const cards: { title: string; imageSrc: string; imageAlt: string; tips: Tip[] }[] = [
  {
    title: "Messages",
    imageSrc: "/images/selling-guide/step-buyer-messages.webp",
    imageAlt: "A seller replying to messages on a laptop",
    tips: [
      { kind: "do", text: "Keep conversations on the platform where you can" },
      { kind: "dont", text: "Never share one-time codes or login details" },
      { kind: "warn", text: "Be wary of buyers who won't view the car but want to pay at once" },
    ],
  },
  {
    title: "Viewings and test drives",
    imageSrc: "/images/selling-guide/step-viewings.webp",
    imageAlt: "People meeting for a viewing",
    tips: [
      { kind: "do", text: "Meet somewhere you're comfortable, and tell someone where you'll be" },
      { kind: "do", text: "Check your insurance covers the buyer before a test drive" },
      { kind: "do", text: "Keep the keys until you're in the car" },
    ],
  },
];

function TipIcon({ kind }: { kind: Tip["kind"] }) {
  const cls = "mt-0.5 h-4 w-4 shrink-0";
  if (kind === "dont") return <X className={`${cls} text-red-600`} aria-label="Don't" />;
  if (kind === "warn") return <TriangleAlert className={`${cls} text-emerald-700`} aria-label="Caution" />;
  return <Check className={`${cls} text-emerald-600`} aria-label="Do" />;
}

export default function RespondToBuyersSection() {
  return (
    <section id="buyers" className="scroll-mt-28 bg-[#F6F8FB] py-20 md:py-24">
      <div className={container}>
        <SectionTitle eyebrow="Step 6" title="Respond to buyers and plan viewings" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[8/3] overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                  <ul className="mt-3 space-y-2.5">
                    {card.tips.map((tip) => (
                      <li key={tip.text} className="flex gap-2.5 text-[15px] text-ink">
                        <TipIcon kind={tip.kind} />
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
