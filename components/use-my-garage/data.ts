import type { Faq } from "@/components/ui/FaqSection";

export type FitmentTone = "green" | "amber" | "grey" | "red";

export const fitmentStates: { title: string; text: string; tone: FitmentTone }[] = [
  { title: "Fitment indicated for your vehicle", text: "Application data covers your year, make, model and configuration. Never a guarantee.", tone: "green" },
  { title: "This part may fit", text: "Confirm a listed option, engine or production detail before ordering.", tone: "amber" },
  { title: "Fitment unknown", text: "Key vehicle or part details are missing.", tone: "grey" },
  { title: "Not listed for this vehicle", text: "Application data excludes your variant.", tone: "red" },
  { title: "Fitment needs verification", text: "Sources disagree or data is out of date. No positive badge is shown.", tone: "red" },
  { title: "Cannot check fitment right now", text: "Browse, but verify before ordering.", tone: "grey" },
];

export const toneStyles: Record<FitmentTone, { dot: string; text: string; ring: string }> = {
  green: { dot: "bg-emerald-600", text: "text-emerald-700", ring: "hover:border-emerald-300" },
  amber: { dot: "bg-amber-600", text: "text-amber-700", ring: "hover:border-amber-300" },
  grey: { dot: "border border-slate-400 bg-white", text: "text-slate-600", ring: "hover:border-slate-400" },
  red: { dot: "bg-red-600", text: "text-red-700", ring: "hover:border-red-300" },
};

export const faqs: Faq[] = [
  { q: "What is Use My Garage?", a: "A vehicle context manager designed to help you find relevant parts; not proof every part fits." },
  { q: "Do I need to sign in?", a: "No. You can add vehicles for this session without an account. Sign in if you want to save them for next time." },
  { q: "Can I add more than one vehicle?", a: "Yes. Add as many as you shop for, then choose which one is active. Only the active vehicle filters parts." },
  { q: "Why does the site ask for a trim or engine?", a: "Parts often differ between engines, trims and production dates. The more detail you give, the clearer the fitment information." },
  { q: "Can I enter VIN?", a: "Yes — use Find Parts by VIN where VIN lookup is available. It identifies your vehicle so you don't have to choose each detail." },
  { q: "What if I do not know my VIN?", a: "Choose your make, model and year instead. You'll find the VIN on your registration document or at the base of the windscreen if you need it later." },
  { q: "What if VIN lookup fails?", a: "Pick your vehicle by make, model and year. Fitment for some parts may show as unknown until the details are confirmed." },
  { q: "Is a saved car ownership proof?", a: "No. A vehicle in your garage is only a shopping filter. It doesn't prove ownership, registration or history." },
  { q: "Does selected mean a part fits?", a: "No. Selecting a vehicle filters listings and shows fitment information where it's available. Always check the listing before ordering." },
  { q: "Can Garage work for an older vehicle?", a: "Yes, but application data is thinner for older and classic vehicles, so more parts may show as fitment unknown." },
  { q: "What if a vehicle appears twice?", a: "We won't add the same vehicle and year twice. If you see a near-duplicate, remove the one you don't need." },
  { q: "Why are some listings marked unknown?", a: "The seller or data source hasn't supplied enough detail to compare against your vehicle. Ask the seller before ordering." },
  { q: "How do I change the active car?", a: "Select “Use this vehicle” on any vehicle in your garage. Parts results then filter for that vehicle." },
  { q: "Will changes apply to my previous results?", a: "Results already open won't change on their own. Open parts again after switching vehicles to see updated fitment." },
  { q: "Can I delete a saved vehicle?", a: "Yes. Select Remove on the vehicle. Session vehicles also clear when you close the browser tab." },
  { q: "Can I browse without a vehicle?", a: "Yes. Parts show without vehicle filtering, and each listing still shows the seller's fitment details." },
  { q: "Can I use Garage for my fleet?", a: "Garage is built for personal shopping. Fleet operators should look at Fleet Solutions for managing many vehicles." },
  { q: "How do I report fitment issues?", a: "Use Report on the part listing or contact Help Center with the listing and your vehicle details." },
];
