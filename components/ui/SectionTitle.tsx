import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type SectionTitleProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  dark?: boolean;
  className?: string;
};

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold ${dark ? "text-brand" : "text-gold"}`}>
      <span className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

export default function SectionTitle({ eyebrow, title, description, dark = false, className = "max-w-2xl" }: SectionTitleProps) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={200}>
          <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

export const container = "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8";
