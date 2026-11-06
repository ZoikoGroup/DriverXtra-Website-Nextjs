import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type CaseStageCard = {
  id: string;
  title: string;
  description: string;
  statusType: "needs-info" | "response" | "decision" | "no-appeal";
};

const DEFAULT_CASE_STAGES: CaseStageCard[] = [
  {
    id: "needs-information",
    title: "Needs information",
    description:
      "More information is needed to continue. Review the request and any policy-based deadline.",
    statusType: "needs-info",
  },
  {
    id: "your-response",
    title: "Your response",
    description:
      "You may respond to the details made available to you before a decision is made.",
    statusType: "response",
  },
  {
    id: "decision-available",
    title: "Decision available",
    description:
      "A decision is available. Review its reasons, effect and any eligible next steps.",
    statusType: "decision",
  },
  {
    id: "no-appeal-route",
    title: "No appeal route",
    description:
      "An appeal route is not currently available for this decision under the applicable policy.",
    statusType: "no-appeal",
  },
];

type EachStageIsSeparateSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  stages?: CaseStageCard[];
  className?: string;
};

export default function EachStageIsSeparateSection({
  id = "case-stages",
  eyebrow = "Case stages",
  title = "Each stage is separate",
  description,
  stages = DEFAULT_CASE_STAGES,
  className = "bg-[#F6F8FB]",
}: EachStageIsSeparateSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* 4-Column Grid for Case Stages */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <Reveal key={stage.id} delay={index * 40}>
              <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-slate-300 h-full">
                <div>
                  {/* Status Indicator & Title Header */}
                  <div className="flex items-center gap-2.5">
                    {stage.statusType === "needs-info" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-2xs" />
                    )}
                    {stage.statusType === "response" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-2xs" />
                    )}
                    {stage.statusType === "decision" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shadow-2xs" />
                    )}
                    {stage.statusType === "no-appeal" && (
                      <span className="h-2.5 w-2.5 rounded-full border border-slate-400 bg-white" />
                    )}

                    <h3
                      className={`text-xs font-bold sm:text-sm ${
                        stage.statusType === "needs-info"
                          ? "text-red-700"
                          : stage.statusType === "response"
                            ? "text-amber-800"
                            : stage.statusType === "decision"
                              ? "text-emerald-800"
                              : "text-slate-700"
                      }`}
                    >
                      {stage.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {stage.description}
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
