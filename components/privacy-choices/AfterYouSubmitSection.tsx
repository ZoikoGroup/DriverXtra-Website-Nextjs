import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { afterSteps } from "./data";

export default function AfterYouSubmitSection() {
  return (
    <PolicySection id="after-you-submit" title="What happens after you submit">
      <ol className="grid gap-6 sm:grid-cols-5 sm:gap-4">
        {afterSteps.map((s, i) => {
          const last = i === afterSteps.length - 1;
          // The connector into the final step is grey, as in the design.
          const lineColor = i === afterSteps.length - 2 ? "bg-slate-300" : "bg-brand";
          return (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative flex gap-4 sm:block">
              {!last && (
                <span
                  aria-hidden
                  className={`absolute top-9 bottom-[-1.5rem] left-[15px] w-px sm:top-[15px] sm:right-[-1rem] sm:bottom-auto sm:left-8 sm:h-px sm:w-auto ${lineColor}`}
                />
              )}
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-ink sm:mt-4">{s.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{s.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </PolicySection>
  );
}
