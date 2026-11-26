import { vehicles } from "@/components/parts/data";

/** Session-only garage, shared through sessionStorage so it clears when the tab closes. */
export type GarageVehicle = { uid: string; vehicleId: string; year: number };
export type GarageState = { vehicles: GarageVehicle[]; active: string | null };

const KEY = "dx:garage";
const EMPTY = "";
const listeners = new Set<() => void>();
// Fallback when storage is blocked (private windows), so the garage still works on this page.
let memory = EMPTY;

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  try {
    return sessionStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

export const getServerSnapshot = () => EMPTY;

export function parse(raw: string): GarageState {
  try {
    const value = JSON.parse(raw) as GarageState;
    if (Array.isArray(value.vehicles)) return value;
  } catch {}
  return { vehicles: [], active: null };
}

export function save(state: GarageState) {
  memory = JSON.stringify(state);
  try {
    sessionStorage.setItem(KEY, memory);
  } catch {}
  listeners.forEach((l) => l());
}

/** "Golf 1.5 TSI · 2020–2024" → { model: "Golf 1.5 TSI", years: [2024 … 2020] } */
export function details(id: string) {
  const v = vehicles.find((x) => x.id === id);
  if (!v) return null;
  const [model, range = ""] = v.label.split(" · ");
  const [from, to = from] = range.split("–").map(Number);
  const years = from ? Array.from({ length: to - from + 1 }, (_, i) => to - i) : [];
  return { ...v, model, years };
}
