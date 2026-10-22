import type { Metadata } from "next";
import FaqSection, { type Faq } from "@/components/ui/FaqSection";
import ExplainerCards from "@/components/ui/ExplainerCards";
import ToolsBrowser from "@/components/tools/ToolsBrowser";
import { isVehicleId } from "@/components/parts/data";
import { labelQuestions } from "@/components/parts/vin-data";

export const metadata: Metadata = {
  title: "Tools & Workshop Equipment — DriverXtra",
  description:
    "Browse hand tools, power tools, diagnostics, lifting equipment and storage from participating sellers. Review ratings and safety notes before ordering.",
};

const faqs: Faq[] = [
  {
    q: "Do workshop tools need a vehicle selected?",
    a: "Most don't. Vehicle compatibility is only shown for tools that depend on it, such as diagnostic scanners.",
  },
  {
    q: "Are capacity ratings verified?",
    a: "Not by default. Ratings like lifting capacity or torque are the manufacturer's statement unless a listing shows reviewed technical evidence.",
  },
  {
    q: "Why are some items business-only?",
    a: "Equipment such as two-post lifts needs professional installation and safe-use training, so some sellers restrict it to trade buyers in certain markets.",
  },
  {
    q: "Can I compare tools?",
    a: "Yes. Tick Compare on up to three items to see their specifications, condition and seller side by side.",
  },
];

type PageProps = {
  searchParams: Promise<{ vehicle?: string }>;
};

export default async function ToolsPage({ searchParams }: PageProps) {
  const { vehicle } = await searchParams;

  return (
    <>
      <ToolsBrowser initialVehicle={isVehicleId(vehicle) ? vehicle : undefined} />
      <ExplainerCards
        eyebrow="Reading a part listing"
        title="Each label answers a different question"
        description="“Aftermarket” is a product category — not a quality score, a safety certificate or proof it fits."
        items={labelQuestions}
        whatLabel="What it means"
        neverLabel="What it doesn't"
        className="bg-slate-50"
      />
      <FaqSection
        eyebrow="Aftermarket parts questions"
        title="Workshop equipment questions (proposed)"
        description="Fitment, claims, legality and returns — what's checked and what isn't."
        faqs={faqs}
        className="bg-white"
      />
    </>
  );
}
