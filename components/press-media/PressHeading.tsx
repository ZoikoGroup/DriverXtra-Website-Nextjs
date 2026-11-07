import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/** "— Eyebrow" + title + intro, as used across the Press & Media sections. */
export default function PressHeading({
  eyebrow,
  title,
  description,
  className = "max-w-3xl",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="flex items-center gap-3 text-[15px] font-semibold text-slate-600">
        <span className="h-0.5 w-5 bg-brand" />
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-[34px]">{title}</h2>
      {description && <div className="mt-3 text-[16px] leading-relaxed text-slate-600">{description}</div>}
    </Reveal>
  );
}
