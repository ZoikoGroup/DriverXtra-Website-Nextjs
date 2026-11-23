import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { scope } from "./data";

export default function ScopeSection() {
  return (
    <PolicySection id="scope" title="What this statement covers">
      <Reveal as="ul" className="space-y-1.5 text-sm leading-relaxed text-slate-600">
        <li className="flex gap-2">
          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            <strong className="text-ink">Covered:</strong> {scope.covered}
          </span>
        </li>
        <li className="flex gap-2">
          <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>
            <strong className="text-ink">Not covered:</strong> {scope.notCovered}
          </span>
        </li>
      </Reveal>
    </PolicySection>
  );
}
