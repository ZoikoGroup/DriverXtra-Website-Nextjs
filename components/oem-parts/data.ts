import { BadgeCheck, ClipboardCheck, CreditCard, ShieldCheck, Tag } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const listingChecks = [
  {
    title: "OEM-classified",
    icon: Tag,
    what: "A catalogue category; the classification may come from the seller.",
    never: "That this item is genuine.",
  },
  {
    title: "Origin evidence",
    icon: ClipboardCheck,
    what: "Whether manufacturer-origin evidence was reviewed, with its date and scope.",
    never: "Fitment, condition or warranty.",
  },
  {
    title: "Seller proof",
    icon: ShieldCheck,
    what: "Seller identity checks — and, separately, any manufacturer authorization with its territory.",
    never: "That every item they sell is genuine.",
  },
  {
    title: "Fitment",
    icon: BadgeCheck,
    what: "Whether this exact part and your vehicle configuration were checked.",
    never: "Origin or authenticity.",
  },
  {
    title: "Offer & returns",
    icon: CreditCard,
    what: "Price, warranty provider and returns from this seller.",
    never: "An automatic factory warranty.",
  },
];

export const faqs: Faq[] = [
  {
    q: "What are OEM parts?",
    a: "OEM commonly refers to parts associated with the original equipment manufacturer. On DriverXtra, an OEM category helps you find products classified that way; review each listing for the exact part, manufacturer information, evidence and seller terms.",
  },
  {
    q: "Are all parts under OEM Parts verified genuine?",
    a: "No. OEM-classified is a catalogue category. Each listing shows separately whether manufacturer-origin evidence was reviewed.",
  },
  {
    q: "Does a Verified Seller badge mean a part is OEM-authentic?",
    a: "No. Seller verification checks the seller's identity or business, not the origin of each item.",
  },
  {
    q: "Does OEM mean a seller is manufacturer-authorized?",
    a: "No. Manufacturer authorization is a separate check, shown as “Manufacturer-authorized seller” with its territory where it applies.",
  },
  {
    q: "Do I need a VIN to shop OEM parts?",
    a: "No. You can browse without one. A VIN or your vehicle details help check fitment for a specific part.",
  },
  {
    q: "Does entering a VIN prove an OEM part will fit?",
    a: "No. It identifies your vehicle. A part is only shown as fitting when the exact product and your vehicle configuration have been checked.",
  },
  {
    q: "Can I search using a manufacturer part number?",
    a: "Yes. Enter the part number in the search box — with or without spaces and dashes.",
  },
  {
    q: "What does a superseded OEM part number mean?",
    a: "The manufacturer has replaced it with a newer revision. Listings marked “Has newer revision” may still be correct for your vehicle, but check the latest number first.",
  },
  {
    q: "Are OEM parts always new?",
    a: "No. Listings can be new, used or remanufactured — the condition is shown on each card.",
  },
  {
    q: "Do OEM parts automatically include a factory warranty?",
    a: "No. The warranty provider and terms come from the seller and are shown on each listing.",
  },
  {
    q: "What if an OEM product listing has no authenticity evidence?",
    a: "It says “Product origin not independently verified”. You can ask the seller for evidence, or choose a listing where origin evidence was reviewed.",
  },
  {
    q: "How can I report a suspected counterfeit part?",
    a: "Use “Report a fitment or listing concern” on the listing. Reports are reviewed by our trust and safety team.",
  },
];
