import type { ReactNode } from "react";
import {
  CircleDot,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  XCircle,
  HelpCircle,
  Lock,
  MinusCircle,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type StatusCard = {
  title: string;
  description: string;
  badgeText: string;
  icon: typeof CircleDot;
  variant: "neutral" | "amber" | "emerald" | "rose";
};

const DEFAULT_STATUSES: StatusCard[] = [
  {
    title: "Not evaluated",
    description:
      "no applicable completed check is recorded for this attribute.",
    badgeText: "Not evaluated",
    icon: CircleDot,
    variant: "neutral",
  },
  {
    title: "In review",
    description: "an assessment is underway; no final result is implied.",
    badgeText: "In review",
    icon: Clock,
    variant: "amber",
  },
  {
    title: "Current for the stated attribute",
    description:
      "reviewed information is current as of the displayed date and scope.",
    badgeText: "Current for the stated attribute",
    icon: CheckCircle2,
    variant: "emerald",
  },
  {
    title: "Attention required",
    description: "information may be incomplete or need further review.",
    badgeText: "Attention required",
    icon: AlertTriangle,
    variant: "amber",
  },
  {
    title: "Expired or stale",
    description: "do not interpret this signal as current.",
    badgeText: "Expired or stale",
    icon: History,
    variant: "rose",
  },
  {
    title: "Not current",
    description: "this indicator has been suspended, revoked or withdrawn.",
    badgeText: "Not current",
    icon: XCircle,
    variant: "rose",
  },
  {
    title: "Source unavailable",
    description: "we cannot confirm a current result at this time.",
    badgeText: "Source unavailable",
    icon: HelpCircle,
    variant: "neutral",
  },
  {
    title: "Details restricted",
    description:
      "further information may require authorization or may not be public.",
    badgeText: "Details restricted",
    icon: Lock,
    variant: "neutral",
  },
  {
    title: "No supported signal",
    description:
      "No verified signal is available for this attribute in the selected context.",
    badgeText: "No supported signal",
    icon: MinusCircle,
    variant: "neutral",
  },
];

type WhatEachStatusMeansSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  statuses?: StatusCard[];
  className?: string;
};

export default function WhatEachStatusMeansSection({
  id = "signal-legend",
  eyebrow = "Signal legend",
  title = "What each status means",
  description = "Every status uses text and a distinct symbol, never color alone.",
  statuses = DEFAULT_STATUSES,
  className = "bg-[#F6F8FB]",
}: WhatEachStatusMeansSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statuses.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                badgeText,
                icon: Icon,
                variant,
              },
              i,
            ) => {
              // Badge color mapping
              let badgeStyles = "border-slate-300 bg-white text-slate-700";
              if (variant === "amber") {
                badgeStyles = "border-amber-300 bg-amber-50 text-amber-800";
              } else if (variant === "emerald") {
                badgeStyles =
                  "border-emerald-300 bg-emerald-50 text-emerald-800";
              } else if (variant === "rose") {
                badgeStyles = "border-rose-300 bg-rose-50 text-rose-800";
              }

              return (
                <Reveal key={cardTitle} delay={(i % 3) * 60}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300">
                    <div>
                      {/* Badge Pill */}
                      <div
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${badgeStyles}`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                        <span className="whitespace-nowrap">{badgeText}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        <strong className="font-semibold text-ink">
                          {cardTitle}
                        </strong>
                        {" — "}
                        <span className="text-slate-500">{cardDesc}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
