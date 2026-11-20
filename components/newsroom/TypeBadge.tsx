import type { ReactNode } from "react";

export default function TypeBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block w-fit rounded-md bg-navy px-2 py-1 text-xs font-bold tracking-wide text-brand uppercase">
      {children}
    </span>
  );
}
