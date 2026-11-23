import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";

export default function StandardsSection() {
  return (
    <PolicySection id="standards" title="Accessibility standards and assessment status">
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal className="rounded-xl border border-slate-300 bg-white p-4">
          <p className="text-xs font-semibold text-ink">Target</p>
          <p className="mt-3 text-base font-semibold text-ink">WCAG 2.2 Level AA</p>
          <p className="mt-3 text-xs text-slate-500">The standard we design toward.</p>
        </Reveal>
        <Reveal delay={80} className="rounded-xl border border-slate-300 bg-white p-4">
          <p className="text-xs font-semibold text-ink">Assessment status</p>
          <p className="mt-3 flex items-center gap-1.5 text-base font-semibold text-red-700">
            <span aria-hidden className="h-2 w-2 rounded-full bg-red-600" />
            Not formally assessed
          </p>
          <p className="mt-3 text-xs text-slate-500">
            No conformance claim is made. An automated check found issues, listed below.
          </p>
        </Reveal>
      </div>
    </PolicySection>
  );
}
