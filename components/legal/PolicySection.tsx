import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/** A titled block in the policy's main column, separated by a rule. */
export default function PolicySection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-b border-slate-200 py-10 first:pt-0">
      <Reveal>
        <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
          {title}
        </h2>
        {intro && <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{intro}</p>}
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}
