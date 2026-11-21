import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { doneItems } from "./data";

export default function WhatWeveDoneSection() {
  return (
    <PolicySection id="done" title="What we've done">
      <Reveal as="ul" className="space-y-2 text-sm leading-relaxed text-slate-600">
        {doneItems.map((item) => (
          <li key={item} className="flex gap-2">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </Reveal>
    </PolicySection>
  );
}
