import type { ReactNode } from "react";
import { Layers, Lock, Zap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ConnectionCard = {
  title: string;
  description: string;
  icon: typeof Layers;
  linkText?: string;
  linkHref?: string;
};

const DEFAULT_CONNECTION_CARDS: ConnectionCard[] = [
  {
    title: "Separate environments",
    description:
      "Keep non-production and production credentials, data and callbacks apart. Test actions must never reach unapproved production resources.",
    icon: Layers,
  },
  {
    title: "Protected transport",
    description:
      "Use HTTPS and validate the host you connect to. Specific protocol and cipher requirements are confirmed by engineering before publication.",
    icon: Lock,
  },
  {
    title: "Webhook messages",
    description:
      "Verify signatures before processing and bound replay windows, following the exact published version.",
    icon: Zap,
    linkText: "View Webhooks",
    linkHref: "#webhooks",
  },
];

type ProtectEveryConnectionSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  cards?: ConnectionCard[];
  className?: string;
};

export default function ProtectEveryConnectionSection({
  id = "environments",
  eyebrow = "Transport, environments & webhooks",
  title = "Protect every connection",
  description,
  cards = DEFAULT_CONNECTION_CARDS,
  className = "bg-[#F6F8FB]",
}: ProtectEveryConnectionSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                icon: Icon,
                linkText,
                linkHref,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)] sm:p-8">
                  <div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400]">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-ink">
                      {cardTitle}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      {cardDesc}
                    </p>
                  </div>

                  {linkText && linkHref && (
                    <div className="mt-6 pt-2">
                      <a
                        href={linkHref}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        {linkText}
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
