"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Shows a UTC instant in the visitor's own time zone; falls back to UTC while rendering on the server. */
export default function LocalTime({ iso }: { iso: string }) {
  const zone = useSyncExternalStore(
    noop,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    () => "UTC",
  );
  const text = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: zone, timeZoneName: "short" }).format(
    new Date(iso),
  );
  return <time dateTime={iso}>{text}</time>;
}
