"use client";

import CategoryBrowser, { type FilterGroup } from "@/components/parts/CategoryBrowser";
import { parts, type Part, type VehicleId } from "@/components/parts/data";

const evParts = parts.filter((p) => p.type === "ev");

/** Product type and category per EV listing. */
const kind: Record<string, { type: string; category: string }> = {
  wallbox: { type: "Wallbox", category: "Chargers" },
  "t2-cable": { type: "Cable", category: "Cables & adapters" },
  "granny-cable": { type: "Portable charger", category: "Chargers" },
  "hv-module": { type: "High-voltage component", category: "High-voltage components" },
};

/* Spec line, e.g. "Type 2 · 7.4 kW (AC, single-phase)" — connector, then power rating. */
const segment = (p: Part, i: number) => (p.spec ?? "").split(" · ")[i]?.trim() || undefined;

const groups: FilterGroup[] = [
  { title: "Product type", options: ["Cable", "High-voltage component", "Portable charger", "Wallbox"], valueOf: (p) => kind[p.id]?.type },
  { title: "Connector", options: ["Type 2", "—"], valueOf: (p) => segment(p, 0) },
  {
    title: "Power rating",
    options: ["2.3 kW (10 A)", "7.4 kW (AC, single-phase)", "Up to 22 kW (AC, three-phase)", "—"],
    valueOf: (p) => segment(p, 1),
  },
  { title: "Category", options: ["Chargers", "Cables & adapters", "High-voltage components"], valueOf: (p) => kind[p.id]?.category },
];

export default function EvBrowser({ initialVehicle }: { initialVehicle?: VehicleId }) {
  return (
    <CategoryBrowser
      activeCard="ev"
      sectionId="explore-ev"
      title="EV Components & Chargers"
      description="Browse charging equipment, cables and adapters from participating sellers. Check connector, power and installation requirements before ordering."
      parts={evParts}
      groups={groups}
      searchLabel="Search parts or manufacturer part number"
      searchHint="Enter a part name or part number."
      resultsTitle="EV components & chargers"
      countLabel={(n) => `${n} EV ${n === 1 ? "part" : "parts"}`}
      emptyText="Try another connector, power rating or category."
      initialVehicle={initialVehicle}
    />
  );
}
