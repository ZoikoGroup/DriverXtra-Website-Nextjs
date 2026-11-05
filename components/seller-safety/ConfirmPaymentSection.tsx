import type { ReactNode } from "react";
import Image from "next/image";
import { XCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type PaymentCard = {
  step: number;
  title: string;
  badgeText: string;
  badgeType: "not-proof" | "not-cleared" | "check-it";
  description: string;
};

export type BottomCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_PAYMENT_CARDS: PaymentCard[] = [
  {
    step: 1,
    title: "Screenshot of a transfer",
    badgeText: "Not proof",
    badgeType: "not-proof",
    description:
      "An image can be edited and doesn't show money in your account.",
  },
  {
    step: 2,
    title: 'Email "payment confirmation"',
    badgeText: "Not proof",
    badgeType: "not-proof",
    description:
      "Emails can be faked. Check your own bank or provider account.",
  },
  {
    step: 3,
    title: "Check or scheduled transfer",
    badgeText: "Not cleared",
    badgeType: "not-cleared",
    description: "Funds may not have cleared and can still be reversed.",
  },
  {
    step: 4,
    title: "Pending payment",
    badgeText: "Not cleared",
    badgeType: "not-cleared",
    description: "Pending isn't available or final.",
  },
  {
    step: 5,
    title: "Cleared funds in your account",
    badgeText: "Check it yourself",
    badgeType: "check-it",
    description:
      "Confirm directly with your bank or the applicable payment provider.",
  },
];

const DEFAULT_BOTTOM_CARDS: BottomCard[] = [
  {
    title: "Be cautious about extra payments and refund requests",
    description:
      "Do not send money back or pay a courier or third party solely because someone claims they overpaid.",
    imageSrc: "/images/seller/4.jpg",
    imageAlt: "Person reviewing tax documents and calculator",
  },
  {
    title: "Deposits and negotiation",
    description:
      "An inquiry, an agreement, deposit instructions and a completed payment are different stages. Don't treat any of them as the next one.",
    imageSrc: "/images/seller/7.jpg",
    imageAlt: "Person writing notes on financial contract with a pen",
  },
];

type ConfirmPaymentSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  paymentCards?: PaymentCard[];
  bottomCards?: BottomCard[];
  className?: string;
};

export default function ConfirmPaymentSection({
  id = "payments",
  eyebrow = "Payments",
  title = "Confirm payment in the account you control",
  description = "A screenshot, email, check, scheduled transfer or pending payment does not prove money has cleared. Confirm directly with your bank or the applicable payment provider.",
  paymentCards = DEFAULT_PAYMENT_CARDS,
  bottomCards = DEFAULT_BOTTOM_CARDS,
  className = "bg-white",
}: ConfirmPaymentSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 5-Column Grid for Payment Steps */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {paymentCards.map((card, index) => {
            const isLast = index === paymentCards.length - 1;

            return (
              <Reveal key={card.step} delay={index * 50}>
                <div
                  className={`flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-300 h-full ${
                    isLast
                      ? "border-emerald-600/60 shadow-xs ring-1 ring-emerald-600/20"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div>
                    {/* Top Row: Step Number Badge & Title */}
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0B1220] text-xs font-bold text-[#F5B400] shadow-2xs">
                        {card.step}
                      </div>
                      <h3 className="text-xs font-bold text-ink sm:text-sm">
                        {card.title}
                      </h3>
                    </div>

                    {/* Status Pill Badge */}
                    <div className="mt-4">
                      {card.badgeType === "not-proof" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 border border-rose-200/80">
                          <XCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{card.badgeText}</span>
                        </span>
                      )}

                      {card.badgeType === "not-cleared" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200/80">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{card.badgeText}</span>
                        </span>
                      )}

                      {card.badgeType === "check-it" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/80">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          <span>{card.badgeText}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom 2-Column Cards with Zero-Padding Image Containers */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {bottomCards.map((bCard, i) => (
            <Reveal key={i} delay={300 + i * 50}>
              <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
                {/* Edge-to-Edge Image Header (Zero Padding) */}
                <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={bCard.imageSrc}
                    alt={bCard.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Text Content Block */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    {bCard.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {bCard.description}
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
