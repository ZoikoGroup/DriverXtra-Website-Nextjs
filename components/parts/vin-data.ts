import { BadgeCheck, ClipboardCheck, Info, ShieldCheck, Tag, Car, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";
import { vehicles, type VehicleId } from "./data";

export const whyVin: { text: string; icon: LucideIcon }[] = [
  { text: "Helps identify the year, model and engine without scrolling through lists.", icon: Car },
  { text: "It doesn't always show trim or equipment — you may be asked one or two questions.", icon: Info },
  { text: "Finding your vehicle isn't a fitment check. Each part shows its own status.", icon: ShieldCheck },
];

export const labelQuestions = [
  {
    title: "Aftermarket",
    icon: Tag,
    what: "A catalogue category for parts outside the original-equipment supply.",
    never: "Quality, safety, legality or fit.",
  },
  {
    title: "Fitment Verified",
    icon: BadgeCheck,
    what: "The exact part and your vehicle configuration were checked against a current source.",
    never: "Performance gains or road-legal use.",
  },
  {
    title: "Reviewed technical evidence",
    icon: ClipboardCheck,
    what: "A specific claim backed by a reviewed test, with its method, date and scope.",
    never: "That every claim on the listing is proven.",
  },
  {
    title: "Seller details verified",
    icon: ShieldCheck,
    what: "Checks on the seller's identity or business.",
    never: "That the product is tested, genuine or fits.",
  },
];

/**
 * There's no VIN-decoding service yet, so a lookup returns example vehicles,
 * picked from the VIN so it's stable. Some VINs return two candidates, to show
 * the "more than one vehicle" step.
 */
export function exampleVinLookup(vin: string): VehicleId[] {
  const sum = [...vin.toUpperCase()].reduce((total, ch) => total + ch.charCodeAt(0), 0);
  const first = vehicles[sum % vehicles.length];
  if (sum % 3 !== 0) return [first.id];
  const sibling = vehicles.find((v) => v.make === first.make && v.id !== first.id);
  return sibling ? [first.id, sibling.id] : [first.id];
}

export const isValidVin = (vin: string) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);

export const vinFaqs: Faq[] = [
  {
    q: "Can I find parts with my VIN?",
    a: "A VIN can help identify your vehicle where lookup is supported. You may still need to confirm its trim, engine or other details. A part is only shown as fitting when the specific product and vehicle have supporting compatibility evidence.",
  },
  {
    q: "Do I need a VIN to browse parts?",
    a: "No. You can browse every part without a VIN, or choose your vehicle by make and model instead.",
  },
  {
    q: "Does entering a VIN guarantee that a part will fit?",
    a: "No. Identifying your vehicle isn't a fitment check. Each part shows its own fitment status.",
  },
  {
    q: "Why is my VIN not recognized?",
    a: "Check that it's exactly 17 characters with no letters I, O or Q. Some vehicles and markets aren't covered yet — you can choose your vehicle manually instead.",
  },
  {
    q: "What should I do if more than one vehicle appears?",
    a: "Choose the one that matches your registration document. If you're unsure, check the engine code or trim on the document.",
  },
  {
    q: "Can I use VIN lookup in every country?",
    a: "No. VIN lookup depends on data coverage in your market. Where it isn't available, choose your vehicle manually.",
  },
  {
    q: "Is my VIN saved automatically?",
    a: "No. We use the VIN you submit to identify your vehicle for this request. It's only saved if you add the vehicle to My Garage.",
  },
  {
    q: "What if my engine or trim is missing?",
    a: "Choose the closest match and check each part's fitment notes, or ask the seller before you buy.",
  },
  {
    q: "Why do parts still say “Fitment not verified”?",
    a: "Because no current compatibility evidence links that exact part to your vehicle yet. It may still fit — check the details or ask the seller.",
  },
  {
    q: "Does a verified seller mean the part is genuine OEM?",
    a: "No. Seller verification checks the business. Part origin is shown separately on each listing.",
  },
  {
    q: "Can I use My Garage instead of entering a VIN?",
    a: "Yes. If you've saved your vehicle to My Garage, you can pick it instead of entering the VIN again.",
  },
  {
    q: "What if a part shown for my VIN is incorrect?",
    a: "Use “Report a fitment or listing concern” on the part. Reports are reviewed by our trust and safety team.",
  },
];
