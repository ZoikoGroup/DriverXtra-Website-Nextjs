import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { assessment } from "./data";

export default function AssessmentSection() {
  return (
    <PolicySection id="assessment" title="How accessibility was assessed">
      <Reveal as="dl" className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[140px_1fr]">
        {assessment.map((a) => (
          <div key={a.label} className="contents">
            <dt className="font-bold text-ink">{a.label}</dt>
            <dd className="text-slate-600">{a.value}</dd>
          </div>
        ))}
      </Reveal>
    </PolicySection>
  );
}
