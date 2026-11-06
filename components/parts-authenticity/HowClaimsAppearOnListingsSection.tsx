import type { ReactNode } from "react";
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  Info,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ListingStatusCard = {
  badgeText: string;
  description: string;
  icon: typeof HelpCircle;
  variant: "slate" | "amber" | "emerald" | "rose";
};

const DEFAULT_STATUS_CARDS: ListingStatusCard[] = [
  {
    badgeText: "Authenticity not independently established",
    description: "No verified claim exists, or the market isn't supported.",
    icon: HelpCircle,
    variant: "slate",
  },
  {
    badgeText: "Claimed by seller",
    description:
      "The seller made this claim; it hasn't been independently reviewed.",
    icon: Clock,
    variant: "amber",
  },
  {
    badgeText: "Information under review",
    description: "A review is open for this specific claim.",
    icon: Clock,
    variant: "amber",
  },
  {
    badgeText: "Source-confirmed for the stated attribute",
    description:
      "An approved source confirms this attribute, scope and date — nothing broader.",
    icon: CheckCircle2,
    variant: "emerald",
  },
  {
    badgeText: "Authorization may be out of date",
    description:
      "Authorization information may be out of date. Review the current scope before relying on this claim.",
    icon: AlertTriangle,
    variant: "rose",
  },
  {
    badgeText: "Disputed",
    description:
      "Evidence conflicts; strong claims are frozen while it's assessed.",
    icon: XCircle,
    variant: "rose",
  },
  {
    badgeText: "Withdrawn",
    description:
      "The claim's source was withdrawn, or rights expired or were revoked.",
    icon: XCircle,
    variant: "rose",
  },
  {
    badgeText: "Safety alert",
    description:
      "An authoritative safety signal — shown separately from any authenticity claim.",
    icon: ShieldAlert,
    variant: "rose",
  },
];

type HowClaimsAppearOnListingsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  statusCards?: ListingStatusCard[];
  className?: string;
};

export default function HowClaimsAppearOnListingsSection({
  id = "how-claims-appear",
  eyebrow = "Statuses",
  title = "How claims appear on listings",
  description = "Every status uses text and a symbol. Positive badges are never shown without an approved source.",
  statusCards = DEFAULT_STATUS_CARDS,
  className = "bg-[#F6F8FB]",
}: HowClaimsAppearOnListingsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 3-Column Grid of Status Badge Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statusCards.map(
            ({ badgeText, description: cardDesc, icon: Icon, variant }, i) => {
              let badgeStyles = "border-slate-300 bg-slate-50 text-slate-700";
              if (variant === "amber") {
                badgeStyles = "border-amber-300/80 bg-amber-50 text-amber-800";
              } else if (variant === "emerald") {
                badgeStyles =
                  "border-emerald-300 bg-emerald-50 text-emerald-800";
              } else if (variant === "rose") {
                badgeStyles = "border-rose-300 bg-rose-50 text-rose-800";
              }

              return (
                <Reveal key={badgeText} delay={i * 30}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-slate-300">
                    <div>
                      <div
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${badgeStyles}`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                        <span className="whitespace-normal leading-tight">
                          {badgeText}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {cardDesc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            },
          )}
        </div>

        {/* Bottom Panel: Example Listing Provenance Panel */}
        <Reveal delay={240} className="mt-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink sm:text-sm">
                Example listing provenance panel
              </span>
              <span className="rounded-md border border-amber-300/80 bg-amber-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-800 uppercase">
                ILLUSTRATIVE
              </span>
            </div>

            {/* Listing Details */}
            <div className="mt-4">
              <h3 className="text-sm font-bold text-ink sm:text-base">
                Brake pad set - EX-BRK-1180
              </h3>
              <p className="text-xs text-slate-400">
                Seller:{" "}
                <span className="text-slate-600">Example Parts Ltd</span>
              </p>
            </div>

            {/* Attributes Breakdown List */}
            <div className="mt-6 space-y-4 max-w-xl">
              {/* Origin claim */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="w-28 text-xs font-bold text-ink shrink-0">
                  Origin claim
                </span>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                  <Clock className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                  <span>Claimed by seller</span>
                </div>
              </div>

              {/* Rights */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="w-28 text-xs font-bold text-ink shrink-0">
                  Rights
                </span>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                  <span>Authorization may be out of date</span>
                </div>
              </div>

              {/* Fitment */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="w-28 text-xs font-bold text-ink shrink-0">
                  Fitment
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Separate — check your vehicle
                </span>
              </div>

              {/* Recall check */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="w-28 text-xs font-bold text-ink shrink-0">
                  Recall check
                </span>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  <Info className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                  <span>Not available for this market</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
