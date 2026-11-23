import { evidenceName, type Evidence } from "./data";

export const evidenceTone: Record<Evidence, { text: string; dot: string }> = {
  observed: { text: "text-emerald-700", dot: "bg-emerald-600" },
  calculated: { text: "text-amber-700", dot: "bg-amber-600" },
  modeled: { text: "text-amber-700", dot: "bg-amber-600" },
  withheld: { text: "text-red-700", dot: "bg-red-700" },
  notEvaluated: { text: "text-slate-500", dot: "border border-slate-400 bg-transparent" },
};

/** Coloured dot + label, e.g. "● Observed". */
export default function EvidenceBadge({
  evidence,
  className = "text-[15px]",
}: {
  evidence: Evidence;
  className?: string;
}) {
  const tone = evidenceTone[evidence];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${tone.text} ${className}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden />
      {evidenceName[evidence]}
    </span>
  );
}
