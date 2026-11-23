import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { glossary } from "./data";

export default function GlossarySection() {
  return (
    <PolicySection id="glossary" title="Plain-language terms">
      <dl className="grid gap-3 sm:grid-cols-2">
        {glossary.map((g, i) => (
          <Reveal key={g.term} delay={Math.min(i, 5) * 50} className="rounded-xl border border-slate-300 bg-white p-4">
            <dt className="text-sm font-bold text-ink">{g.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-600">{g.definition}</dd>
          </Reveal>
        ))}
      </dl>
    </PolicySection>
  );
}
