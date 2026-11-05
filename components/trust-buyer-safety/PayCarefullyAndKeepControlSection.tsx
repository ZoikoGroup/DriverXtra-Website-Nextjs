import type { ReactNode } from "react";
import Image from "next/image";
import {
  CreditCard,
  MessageSquare,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CommItem = {
  text: string;
  type: "check" | "cross";
};

const DEFAULT_COMM_ITEMS: CommItem[] = [
  {
    text: "Use in-platform messaging where it's available",
    type: "check",
  },
  {
    text: "Share only the contact details you need to",
    type: "check",
  },
  {
    text: "Never share one-time codes, passwords or card numbers",
    type: "cross",
  },
];

type PayCarefullyAndKeepControlSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  paymentImageSrc?: string;
  paymentImageAlt?: string;
  commImageSrc?: string;
  commImageAlt?: string;
  commItems?: CommItem[];
  className?: string;
};

export default function PayCarefullyAndKeepControlSection({
  id = "payment-and-communication",
  eyebrow = "Payment & communication",
  title = "Pay carefully and keep control of your details",
  description,
  paymentImageSrc = "/images/trust/6.png",
  paymentImageAlt = "Person working on a laptop while holding a smartphone",
  commImageSrc = "/images/trust/7.png",
  commImageAlt = "Business professionals high-fiving at an office desk",
  commItems = DEFAULT_COMM_ITEMS,
  className = "bg-white",
}: PayCarefullyAndKeepControlSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 2-Column Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Left Card: Before sending money */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[22/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={paymentImageSrc}
                  alt={paymentImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                    <CreditCard className="h-5 w-5 stroke-[2]" />
                  </div>

                  <h3 className="text-base font-bold text-ink">
                    Before sending money
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Before sending money, verify the payee and the method. Be
                    cautious of requests to switch channels, pay unexpected
                    deposits, or share one-time codes.
                  </p>
                </div>

                {/* Callout Notice Box */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 sm:text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 stroke-[2.5]" />
                  <span>
                    Pause before paying if the recipient, account details or
                    payment instructions change unexpectedly.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Communication and privacy */}
          <Reveal delay={180}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300">
              <div className="relative aspect-[22/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={commImageSrc}
                  alt={commImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                    <MessageSquare className="h-5 w-5 stroke-[2]" />
                  </div>

                  <h3 className="text-base font-bold text-ink">
                    Communication and privacy
                  </h3>

                  <ul className="mt-4 space-y-3.5">
                    {commItems.map(({ text, type }) => (
                      <li key={text} className="flex items-start gap-3">
                        {type === "check" ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 stroke-[2.5]" />
                        )}
                        <span className="text-xs font-medium text-slate-700 sm:text-sm">
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
