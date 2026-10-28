import { Check, AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const CHECK_ITEMS = [
  "Dealership and rooftop",
  "Issue type and affected record (feed, listing, connection)",
  "Error reference and time",
];

type BeforeYouOpenACaseSectionProps = {
  id?: string;
  className?: string;
};

export default function BeforeYouOpenACaseSection({
  id,
  className = "bg-[#F6F8FB]",
}: BeforeYouOpenACaseSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Prepare your details"
          title="Before you open a case"
        />

        <Reveal delay={100} className="mt-8 max-w-xl">
          <ul className="space-y-4">
            {CHECK_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                <span className="text-sm font-semibold text-slate-700">
                  {item}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 pt-1">
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#0F7B55] stroke-[2.5]" />
              <span className="text-sm font-semibold text-slate-700">
                Never include passwords or payment card details
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
