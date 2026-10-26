import { FileText, Scale, Tag, type LucideIcon } from "lucide-react";
import type { Faq } from "@/components/ui/FaqSection";

export const productTypes = ["Personal motor", "Commercial & fleet", "Motorcycle", "Breakdown cover", "Gap insurance"];
export const partnerRoles = ["Insurer", "Broker or intermediary", "Comparison platform", "Claims handler"];

export const roles = [
  {
    title: "Insurer",
    text: "Carries the risk, sets the price and terms, and handles claims.",
    image: "/images/insurance-partners/role-insurer.png",
    alt: "Glass office towers against a blue sky",
  },
  {
    title: "Broker or intermediary",
    text: "Arranges cover with insurers on your behalf and may be paid commission.",
    image: "/images/insurance-partners/role-broker.png",
    alt: "Two people shaking hands across a desk",
  },
  {
    title: "Comparison platform",
    text: "Shows options from providers. DriverXtra would play this role where supported.",
    image: "/images/insurance-partners/role-comparison-platform.png",
    alt: "A team listening to a presentation in an office",
  },
  {
    title: "Claims handler",
    text: "May manage claims for an insurer. The insurer remains responsible.",
    image: "/images/insurance-partners/role-claims-handler.png",
    alt: "Two colleagues celebrating with a high five",
  },
];

export const fairness: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Order", text: "When records exist, partners are listed alphabetically. Payment never changes the order.", icon: Scale },
  { title: "Sponsorship", text: "Any sponsored placement would be labelled clearly and kept separate.", icon: Tag },
  {
    title: "Evidence",
    text: "Each profile would show its legal entity, verified role, market scope and when evidence was last reviewed.",
    icon: FileText,
  },
];

export const continueSteps = [
  "We show the partner's legal name and what they'll do.",
  "We list exactly what would be shared, and why.",
  "You agree — or choose to stay on DriverXtra.",
  "The partner explains its own process. Nothing is bought until you agree with them.",
];

export const faqs: Faq[] = [
  {
    q: "Why are no partners listed?",
    a: "We only list organisations we've verified. No verified insurance partners are published in this demonstration, so we show none rather than invent them.",
  },
  {
    q: "Does a listing mean you recommend a partner?",
    a: "No. A listing means the organisation's identity, role and market scope have been verified — not that it's the best choice for you.",
  },
  {
    q: "Will DriverXtra earn money if I continue?",
    a: "Possibly. Where a referral fee or commission applies, the partner's profile would say so before you continue. It never changes the order.",
  },
  {
    q: "Who handles my claim?",
    a: "Your insurer, or a claims handler acting for it. The insurer stays responsible for your claim — DriverXtra doesn't handle claims.",
  },
];
