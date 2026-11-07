"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Standalone campaign pages that bring their own header and footer,
 * so the global DriverXtra site chrome is hidden on them.
 */
export const STANDALONE_ROUTES = ["/black-friday"];

export default function HideOnRoutes({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
