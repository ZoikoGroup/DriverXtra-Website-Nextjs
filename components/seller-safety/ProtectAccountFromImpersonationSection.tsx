import type { ReactNode } from "react";
import Image from "next/image";
import { Lock, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ImpersonationWarningCard = {
  id: string;
  title: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_WARNING_CARDS: ImpersonationWarningCard[] = [
  {
    id: "fake-support",
    title: "Fake support",
    quote: '"DriverXtra here — verify your account via this link."',
    imageSrc: "/images/seller/3.jpg",
    imageAlt: "Two colleagues high fiving over laptop in office",
  },
  {
    id: "verification-fee",
    title: "Verification fee",
    quote: '"Pay a small fee so we can confirm the buyer."',
    imageSrc: "/images/seller/4.jpg",
    imageAlt: "Person reviewing documents and calculator on desk",
  },
  {
    id: "code-request",
    title: "Code request",
    quote: '"Read me the code we just texted you."',
    imageSrc: "/images/seller/5.jpg",
    imageAlt: "Person holding phone next to laptop screen",
  },
  {
    id: "qr-code-payment",
    title: "QR code payment",
    quote: '"Scan this QR code to receive your payment."',
    imageSrc: "/images/seller/6.jpg",
    imageAlt: "Laptop displaying code on screen on office desk",
  },
];

const DEFAULT_HYGIENE_CHECKLIST = [
  "Use strong sign-in and keep it to yourself",
  "Never share one-time codes — no genuine support team will ask",
  "Review signed-in sessions and sign out unknown ones",
  "Contact us only through known official channels",
];

type ProtectAccountFromImpersonationSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ImpersonationWarningCard[];
  hygieneTitle?: string;
  hygieneChecklist?: string[];
  className?: string;
};

export default function ProtectAccountFromImpersonationSection({
  id = "impersonation",
  eyebrow = "Impersonation",
  title = "Protect your account from impersonation",
  description = "Unexpected links, support messages, verification fees, QR codes or requests for login codes can be warning signs. Use known official channels.",
  cards = DEFAULT_WARNING_CARDS,
  hygieneTitle = "Account hygiene",
  hygieneChecklist = DEFAULT_HYGIENE_CHECKLIST,
  className = "bg-[#F6F8FB]",
}: ProtectAccountFromImpersonationSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Stack of Impersonation Cards */}
          <div className="space-y-4 lg:col-span-6">
            {cards.map((card, i) => {
              const isFirst = i === 0;

              return (
                <Reveal key={card.id} delay={i * 40}>
                  <div
                    className={`flex items-stretch overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      isFirst
                        ? "border-slate-300 shadow-xs ring-1 ring-slate-200"
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* Fixed 90px Left Image */}
                    <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden bg-slate-900 sm:w-[105px]">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 640px) 90px, 105px"
                        className="object-cover"
                      />
                    </div>

                    {/* Card Content Right */}
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                      <h3 className="text-sm font-bold text-ink sm:text-base">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-xs italic text-slate-500 sm:text-sm">
                        {card.quote}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Account Hygiene Checklist Box */}
          <Reveal delay={200} className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Lock Icon Header */}
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-2xs">
                <Lock className="h-5 w-5 stroke-[2]" />
              </div>

              <h3 className="text-base font-bold text-ink sm:text-lg">
                {hygieneTitle}
              </h3>

              <div className="mt-6 space-y-4">
                {hygieneChecklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 sm:text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
