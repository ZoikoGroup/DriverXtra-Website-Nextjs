import { useSyncExternalStore } from "react";

export const regions = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "India", code: "IN" },
  { name: "Australia", code: "AU" },
  { name: "UAE", code: "AE" },
] as const;

export type RegionName = (typeof regions)[number]["name"];

export const DEFAULT_REGION: RegionName = "United Kingdom";

const STORAGE_KEY = "dx-region";
const CHANGE_EVENT = "dx-region-change";

let memoryRegion: RegionName | null = null;

const isRegion = (value: string | null): value is RegionName => regions.some((r) => r.name === value);

function readRegion(): RegionName {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isRegion(stored) ? stored : DEFAULT_REGION;
  } catch {
    return DEFAULT_REGION;
  }
}

/** Updates the region everywhere on the site (footer, listings, …) and remembers it. */
export function setRegion(name: RegionName) {
  try {
    window.localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // Storage unavailable — the change still applies for this page view.
    memoryRegion = name;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The visitor's selected region, kept in sync across every component that uses it. */
export function useRegion(): RegionName {
  return useSyncExternalStore(subscribe, () => memoryRegion ?? readRegion(), () => DEFAULT_REGION);
}
