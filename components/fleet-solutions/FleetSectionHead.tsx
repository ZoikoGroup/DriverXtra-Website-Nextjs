import type { ReactNode } from "react";

type FleetSectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  /** Figma uses 37.5px–37.8px depending on the section; default is the journey heading. */
  titleSize?: string;
};

/** Eyebrow + H2 used by every Fleet Solutions section. */
export default function FleetSectionHead({ eyebrow, title, id, titleSize = "text-[37.7px]" }: FleetSectionHeadProps) {
  return (
    <div className="flex w-full flex-wrap items-end gap-y-6">
      <div className="flex max-w-[720px] min-w-px flex-1 flex-col gap-[12.85px] pt-[7.5px]">
        <FleetEyebrow>{eyebrow}</FleetEyebrow>
        <h2
          id={id}
          className={`pb-[0.8px] ${titleSize} leading-[44.8px] font-extrabold tracking-[-0.8px] text-[#172033] max-sm:text-[28px] max-sm:leading-[34px]`}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export function FleetEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex max-w-[620px] items-center gap-2 text-[17px] leading-[26.35px] font-bold text-[#8a5c00]">
      <span className="h-[2px] w-[22px] shrink-0 rounded-[2px] bg-[#f5b400]" />
      {children}
    </p>
  );
}
