import { CircleDot, Disc3, Ruler, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";
import { parts, type Part } from "@/components/parts/data";

export const tyreWheelParts = parts.filter((p) => p.type === "tyre" || p.type === "wheel");

/* Filter values come from each part's spec line, e.g.
   tyre:  "225/45 R17 · 94 W (XL) · Summer"
   wheel: "18 × 7.5J · 5×112 · ET45" */
const segments = (p: Part) => (p.spec ?? "").split(" · ").map((s) => s.trim());

export const tyreSize = (p: Part) => (p.type === "tyre" ? segments(p)[0] : undefined);
export const tyreSeason = (p: Part) => {
  if (p.type !== "tyre") return undefined;
  const last = segments(p).at(-1) ?? "";
  return ["All-season", "Summer", "Winter"].find((s) => last.startsWith(s));
};
export const wheelDiameter = (p: Part) => (p.type === "wheel" ? `${segments(p)[0].split(" ")[0]}"` : undefined);
export const wheelPcd = (p: Part) => (p.type === "wheel" ? segments(p)[1] : undefined);

const unique = (values: (string | undefined)[]) =>
  Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export const sizeOptions = unique(tyreWheelParts.map(tyreSize));
export const seasonOptions = unique(tyreWheelParts.map(tyreSeason));
export const diameterOptions = unique(tyreWheelParts.map(wheelDiameter));
export const pcdOptions = unique(tyreWheelParts.map(wheelPcd));

export const quickCards: { id: "tyres" | "wheels" | "size"; title: string; text: string; icon: LucideIcon }[] = [
  { id: "tyres", title: "Shop Tires", text: "By vehicle or size", icon: CircleDot },
  { id: "wheels", title: "Shop Wheels", text: "Diameter, PCD, offset", icon: Disc3 },
  { id: "size", title: "Shop by Size", text: "Enter your tyre size", icon: Ruler },
];

export const faqs: Faq[] = [
  {
    q: "How do I find my tire size?",
    a: "Check the tire sidewall and the vehicle manufacturer's specifications. A size code describes dimensions, but correct load and speed ratings and axle requirements must also be confirmed.",
  },
  {
    q: "Can I shop tires without entering a VIN?",
    a: "Yes. Search by size, or browse all tires and wheels. A VIN or your vehicle details help check fitment.",
  },
  {
    q: "Does matching tire size mean a tire fits my vehicle?",
    a: "Not on its own. Load index, speed rating, axle position and any manufacturer approvals also need to match.",
  },
  {
    q: "What is a load index?",
    a: "A number on the sidewall, such as 94, that tells you the maximum load each tire can carry. It must meet or exceed your vehicle's requirement.",
  },
  {
    q: "What is a speed rating?",
    a: "The letter after the load index, such as W or Y, showing the maximum sustained speed the tire is rated for.",
  },
  {
    q: "Can front and rear tire sizes be different?",
    a: "Yes, on some vehicles — called a staggered fitment. Listings marked (rear) or (front) are for that axle only.",
  },
  {
    q: "What measurements matter for wheels?",
    a: "Diameter, width, bolt pattern (PCD), offset (ET) and centre bore. All of them need to suit your vehicle.",
  },
  {
    q: "Are all wheels with the same diameter compatible?",
    a: "No. Two 18\" wheels can have different PCDs, offsets and centre bores, so only one may fit your vehicle.",
  },
  {
    q: "Are used or refurbished tires available?",
    a: "Yes, where sellers list them. Tread depth and condition are measured by the seller and shown on each listing.",
  },
  {
    q: "Does DriverXtra include installation with my tire order?",
    a: "Not automatically. Some sellers offer fitting — it's shown on the listing — or you can book a tire installation service.",
  },
  {
    q: "What does “Fitment Verified” mean?",
    a: "That the exact tire or wheel and your vehicle configuration were checked against a current source.",
  },
  {
    q: "What happens if a tire or wheel does not fit?",
    a: "Returns follow the seller's terms, shown on the listing. Don't fit a part you're unsure about — contact the seller first.",
  },
];
