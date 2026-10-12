import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
            dark ? "bg-white/10 text-brand" : "bg-brand-light text-ink"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={200}>
          <p className={`mt-4 text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
