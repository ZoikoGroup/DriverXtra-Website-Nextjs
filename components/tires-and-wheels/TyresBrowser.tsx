"use client";

import CategoryBrowser, { type FilterGroup, type QuickCard } from "@/components/parts/CategoryBrowser";
import type { VehicleId } from "@/components/parts/data";
import {
  diameterOptions,
  pcdOptions,
  quickCards,
  seasonOptions,
  sizeOptions,
  tyreSeason,
  tyreSize,
  tyreWheelParts,
  wheelDiameter,
  wheelPcd,
} from "./data";

const isTyre = (p: { type: string }) => p.type === "tyre";
const isWheel = (p: { type: string }) => p.type === "wheel";

// Tyre-only and wheel-only groups never hide the other product.
const groups: FilterGroup[] = [
  { title: "Product", options: ["Tires", "Wheels"], valueOf: (p) => (isTyre(p) ? "Tires" : "Wheels") },
  { title: "Tyre size", options: sizeOptions, valueOf: tyreSize, appliesTo: isTyre },
  { title: "Season", options: seasonOptions, valueOf: tyreSeason, appliesTo: isTyre },
  { title: "Wheel diameter", options: diameterOptions, valueOf: wheelDiameter, appliesTo: isWheel },
  { title: "Bolt pattern (PCD)", options: pcdOptions, valueOf: wheelPcd, appliesTo: isWheel },
];

const cards: QuickCard[] = quickCards.map((c) => ({
  ...c,
  action: c.id === "size" ? "search" : { group: "Product", option: c.id === "tyres" ? "Tires" : "Wheels" },
}));

export default function TyresBrowser({ initialVehicle }: { initialVehicle?: VehicleId }) {
  return (
    <CategoryBrowser
      activeCard="tyres-wheels"
      sectionId="explore-tyres"
      title="Tires & Wheels"
      description="Find tire and wheel options by vehicle details or product specifications. Confirm fitment before ordering."
      parts={tyreWheelParts}
      groups={groups}
      quickCards={cards}
      searchLabel="Search tyres, wheels, sizes or part numbers"
      searchHint={'Try a size like "225/45 R17" or a part number.'}
      resultsTitle="Tyres & wheels"
      countLabel={(n) => `${n} tyre and wheel ${n === 1 ? "part" : "parts"}`}
      emptyText="Try another size, season or bolt pattern."
      initialVehicle={initialVehicle}
    />
  );
}
