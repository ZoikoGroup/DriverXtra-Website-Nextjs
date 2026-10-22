"use client";

import CategoryBrowser, { type FilterGroup } from "@/components/parts/CategoryBrowser";
import { parts, type VehicleId } from "@/components/parts/data";

const toolParts = parts.filter((p) => p.type === "tools");

/** Task, power source and category per workshop listing. */
const toolInfo: Record<string, { task: string; power: string; category: string }> = {
  "trolley-jack": { task: "Lifting", power: "Manual", category: "Lifting equipment" },
  "torque-wrench": { task: "Wheels & tyres", power: "Manual", category: "Hand tools" },
  "obd-scanner": { task: "Diagnostics", power: "Vehicle (OBD port)", category: "Diagnostics" },
  "impact-wrench": { task: "Wheels & tyres", power: "Battery 18 V", category: "Power tools" },
  "vehicle-lift": { task: "Lifting", power: "Mains 400 V", category: "Lifting equipment" },
  "tool-chest": { task: "Storage", power: "None", category: "Storage" },
};

const groups: FilterGroup[] = [
  { title: "Task", options: ["Diagnostics", "Lifting", "Storage", "Wheels & tyres"], valueOf: (p) => toolInfo[p.id]?.task },
  {
    title: "Power source",
    options: ["Battery 18 V", "Mains 400 V", "Manual", "None", "Vehicle (OBD port)"],
    valueOf: (p) => toolInfo[p.id]?.power,
  },
  {
    title: "Category",
    options: ["Hand tools", "Power tools", "Diagnostics", "Lifting equipment", "Storage"],
    valueOf: (p) => toolInfo[p.id]?.category,
  },
];

export default function ToolsBrowser({ initialVehicle }: { initialVehicle?: VehicleId }) {
  return (
    <CategoryBrowser
      activeCard="tools"
      sectionId="explore-tools"
      title="Tools & Workshop Equipment"
      description="Browse hand tools, power tools, diagnostics, lifting equipment and storage from participating sellers. Review ratings and safety notes before ordering."
      parts={toolParts}
      groups={groups}
      searchLabel="Search parts or manufacturer part number"
      searchHint="Enter a part name or part number."
      resultsTitle="Tools & workshop equipment"
      countLabel={(n) => `${n} workshop ${n === 1 ? "item" : "items"}`}
      emptyText="Try another task, power source or category."
      initialVehicle={initialVehicle}
    />
  );
}
