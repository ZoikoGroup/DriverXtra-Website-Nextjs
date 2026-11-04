import type { ReactNode } from "react";
import { CheckCircle2, HelpCircle, History } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CheckScopeCard = {
  title: string;
  description: string;
};

export type StatusPreviewItem = {
  badgeText: string;
  description: string;
  icon: typeof CheckCircle2;
  variant: "emerald" | "neutral" | "rose";
};

const DEFAULT_SCOPES: CheckScopeCard[] = [
  {
    title: "Identity",
    description: "Who an account belongs to",
  },
  {
    title: "Business",
    description: "A registered business",
  },
  {
    title: "Listing",
    description: "Selected listing details",
  },
  {
    title: "Vehicle",
    description: "Specific vehicle records",
  },
  {
    title: "Parts",
    description: "Source or fitment evidence",
  },
  {
    title: "Payment",
    description: "Shown only by the payment provider",
  },
];

const DEFAULT_STATUS_PREVIEWS: StatusPreviewItem[] = [
  {
    badgeText: "Current for the stated attribute",
    description: "Checked for that one detail, as of the date shown.",
    icon: CheckCircle2,
    variant: "emerald",
  },
  {
    badgeText: "Not verified",
    description:
      "This information has not been verified for this item. Ask for supporting details and use caution.",
    icon: HelpCircle,
    variant: "neutral",
  },
  {
    badgeText: "May be out of date",
    description:
      "This information may be out of date. Check the source and most recent status before relying on it.",
    icon: History,
    variant: "rose",
  },
];

type CheckConfirmsWhatItDescribesSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  scopes?: CheckScopeCard[];
  statusPreviews?: StatusPreviewItem[];
  className?: string;
};

export default function CheckConfirmsWhatItDescribesSection({
  id = "what-checks-mean",
  eyebrow = "What checks mean",
  title = "A check confirms only what it describes",
  description = "A check may confirm only the specific information described. It does not guarantee ownership, condition, authenticity or a safe transaction.",
  scopes = DEFAULT_SCOPES,
  statusPreviews = DEFAULT_STATUS_PREVIEWS,
  className = "bg-[#F6F8FB]",
}: CheckConfirmsWhatItDescribesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Side: 2-Column Grid of 6 Check Attribute Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {scopes.map(({ title: scopeTitle, description: scopeDesc }, i) => (
              <Reveal key={scopeTitle} delay={i * 40}>
                <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-slate-300">
                  <h3 className="text-sm font-bold text-ink sm:text-base">
                    {scopeTitle}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{scopeDesc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Side: Illustrative Status Card Box */}
          <Reveal delay={160} className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
              {/* Header Label with Illustrative Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink sm:text-sm">
                  How statuses look
                </span>
                <span className="rounded-md border border-amber-300/80 bg-amber-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-800 uppercase">
                  ILLUSTRATIVE
                </span>
              </div>

              {/* Status List Items with Dividers */}
              <div className="mt-6 divide-y divide-slate-100 space-y-6">
                {statusPreviews.map(
                  ({
                    badgeText,
                    description: statusDesc,
                    icon: Icon,
                    variant,
                  }) => {
                    let badgeStyles =
                      "border-slate-300 bg-white text-slate-700";
                    if (variant === "emerald") {
                      badgeStyles =
                        "border-emerald-300 bg-emerald-50 text-emerald-800";
                    } else if (variant === "rose") {
                      badgeStyles = "border-rose-300 bg-rose-50 text-rose-800";
                    }

                    return (
                      <div key={badgeText} className="pt-6 first:pt-0">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${badgeStyles}`}
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                          <span className="whitespace-nowrap">{badgeText}</span>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                          {statusDesc}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
