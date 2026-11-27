import { FileText, Gauge, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const vehicleTypes = ["Battery-electric (BEV)", "Plug-in hybrid (PHEV)", "Not sure"] as const;
export type VehicleType = (typeof vehicleTypes)[number];
export const conditions = ["New", "Used", "Not sure"] as const;
export type Condition = (typeof conditions)[number];

export const typeCards: { type: VehicleType; text: string; image: string; alt: string; tips: string[] }[] = [
  {
    type: "Battery-electric (BEV)",
    text: "Runs only on electricity from its battery. Charging access matters most.",
    image: "/images/ev-finance/battery-electric.webp",
    alt: "A charging cable plugged into an electric car",
    tips: ["Plan where you'll charge before you commit to a term.", "Battery health matters most for resale and lender valuation."],
  },
  {
    type: "Plug-in hybrid (PHEV)",
    text: "Has a smaller battery plus a fuel engine. Lenders may treat it differently from a BEV.",
    image: "/images/ev-finance/plug-in-hybrid.webp",
    alt: "A grey car photographed from the front at dusk",
    tips: ["Running costs depend on how often you charge versus use fuel.", "Some EV incentives exclude plug-in hybrids — check the terms."],
  },
];

/** Extra guidance for the new/used choice. */
export const conditionTips: Record<Condition, string> = {
  New: "For a new EV, ask whether any incentive is applied by the dealer at the point of sale or claimed later.",
  Used: "For a used EV, ask for a dated battery state-of-health report and check how much battery warranty is left.",
  "Not sure": "New and used EVs can be financed differently. Compare both before you apply.",
};

export const batteryCards: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Battery condition",
    text: "DriverXtra doesn't check batteries. For a used EV, ask for a state-of-health report from the manufacturer or a qualified service, with its date.",
    icon: ShieldCheck,
  },
  {
    title: "Warranty",
    text: "Check the manufacturer or seller warranty, whether it transfers to you, and when it expires. Unknown stays unknown.",
    icon: FileText,
  },
  {
    title: "Range",
    text: "A rated range is a test result, not a guarantee. Real range varies with temperature, speed, terrain, use and battery condition.",
    icon: Gauge,
  },
];

export const chargingOptions = ["At home", "At work", "Public chargers only", "Not sure yet"] as const;
export type ChargingOption = (typeof chargingOptions)[number];

/** Guidance plus a starting public-charging share for the cost estimate below. */
export const chargingTips: Record<ChargingOption, { text: string; publicShare: number }> = {
  "At home": { text: "Home charging is usually the cheapest per kWh. A charger installation is a one-time cost, kept separate from your loan below.", publicShare: 10 },
  "At work": { text: "Ask whether workplace charging is free, metered or time-limited, and what happens if you change jobs.", publicShare: 25 },
  "Public chargers only": { text: "Public charging often costs more per kWh and may add session fees. Factor this into your monthly budget.", publicShare: 100 },
  "Not sure yet": { text: "Try a few public-charging shares in the estimate below to see how much the mix matters.", publicShare: 50 },
};

export const terms = [24, 36, 48, 60, 72, 84];

export const faqs: Faq[] = [
  { q: "What is EV finance?", a: "Financing for an eligible electric or plug-in hybrid vehicle, where a provider and market offer it. This educational page is not an application or lender commitment." },
  { q: "Is EV finance available in my market?", a: "It depends on the providers in your market. Where it isn't offered, standard vehicle finance may still be available." },
  { q: "Does EV finance cover both battery-electric and plug-in hybrids?", a: "Sometimes. Some providers and incentives cover only battery-electric vehicles. Check each offer's eligibility." },
  { q: "Will this page approve me for a loan?", a: "No. The figures here are illustrative only. Approval, rate and term are decided by a lender after you apply." },
  { q: "Is EV finance always cheaper than conventional finance?", a: "No. Rates depend on the lender, your circumstances and the vehicle. Compare the total cost, not just the monthly payment." },
  { q: "How does a battery warranty affect financing?", a: "Some lenders consider remaining battery warranty when valuing a used EV. Ask the lender how they treat it." },
  { q: "Does the website check a used EV battery?", a: "No. Ask the seller for a dated state-of-health report from the manufacturer or a qualified service." },
  { q: "Can I rely on the advertised driving range?", a: "No. Rated range is a test result. Real range varies with temperature, speed, terrain, use and battery condition." },
  { q: "Do I need a charger at home?", a: "Not always. Many drivers use work or public chargers, but costs and convenience differ. Try the charging estimate to compare." },
  { q: "Are charger installation expenses in the loan?", a: "Not in the illustrative loan here — installation is shown separately. Some providers may offer to include it; check the terms." },
  { q: "Can I assume a federal EV tax credit in 2026?", a: "No. Incentives change and have conditions. Only include an incentive if it's documented and applied at the point of sale." },
  { q: "How are local incentives shown?", a: "Only as an amount you enter. Unless you confirm it's documented and applied at the point of sale, it isn't taken off the amount financed." },
  { q: "How is monthly finance cost estimated?", a: "From the amount you'd finance, your example APR and the term, using a standard fixed-rate repayment formula. Fees and insurance you don't enter are excluded." },
  { q: "What about charging savings?", a: "Charging is an ownership cost, not part of the loan. Use the separate charging estimate with your own figures." },
  { q: "What if I only use public chargers?", a: "Set the public-charging share to 100% and enter your public price. Session fees aren't included." },
  { q: "Will exploring costs affect my credit?", a: "No. Nothing on this page runs a credit check or is shared with lenders." },
  { q: "What if battery or lender information is missing?", a: "Treat it as unknown. Ask the seller or lender, and don't assume the best case." },
  { q: "Where can I learn more about APR and loan comparison?", a: "See the APR & Interest Guide and Compare Vehicle Loans pages in Finance." },
];
