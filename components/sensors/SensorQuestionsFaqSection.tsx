"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type SensorFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const DEFAULT_SENSOR_FAQS: SensorFaqItem[] = [
  {
    id: "what-is-a-vehicle-sensor",
    question: "What is a vehicle sensor?",
    answer:
      "A sensor measures or detects a condition for a specific vehicle system. The precise part and role depend on the model and configuration.",
  },
  {
    id: "can-i-find-a-sensor-without-a-vin",
    question: "Can I find a sensor without a VIN?",
    answer:
      "Yes. You can browse, filter, and search sensors by name, brand, part number, family, or protocol without a VIN, though exact fitment and trim matching may require vehicle or VIN verification.",
  },
  {
    id: "does-adding-my-vehicle-to-garage-guarantee-a-match",
    question: "Does adding my vehicle to Garage guarantee a match?",
    answer:
      "No. Selecting a vehicle in Garage helps narrow notes and context, but regional specs, mid-year changes, option packages, and harness revisions still need to be checked against the part number and service manual.",
  },
  {
    id: "why-does-a-result-say-check-details",
    question: "Why does a result say Check details?",
    answer:
      "A 'Check details' or unconfirmed prompt means part fitment, calibration requirements, market availability, or specification notes need manual verification before ordering or fitting.",
  },
  {
    id: "how-is-unknown-different-from-incompatible",
    question: "How is Unknown different from Incompatible?",
    answer:
      "'Unknown' means there isn't enough verified evidence or manual data yet to confirm fitment or calibration, whereas 'Incompatible' indicates a known mismatch for the selected configuration or market.",
  },
  {
    id: "will-every-tpms-sensor-work-with-my-car",
    question: "Will every TPMS sensor work with my car?",
    answer:
      "No. TPMS sensors depend on carrier frequency (such as 433 MHz), sensor protocol, valve/stem style, and whether the vehicle's control module supports the replacement unit.",
  },
  {
    id: "will-a-new-tpms-sensor-need-relearning",
    question: "Will a new TPMS sensor need relearning?",
    answer:
      "Often yes. Many vehicles require a sensor ID registration or relearn procedure after installation so the ECU recognizes each wheel position.",
  },
  {
    id: "do-replacement-adas-sensors-require-calibration",
    question: "Do replacement ADAS sensors require calibration?",
    answer:
      "Frequently yes. Cameras, radar units, and ultrasonic modules often require static, dynamic, or software calibration after mounting or alignment work—always follow manufacturer service procedures.",
  },
  {
    id: "are-parking-sensors-the-same-as-adas-sensors",
    question: "Are parking sensors the same as ADAS sensors?",
    answer:
      "Not always. Ultrasonic parking sensors handle close-range obstacle detection, while forward radar or camera modules support ADAS features such as adaptive cruise control or lane assistance, though some systems share data.",
  },
  {
    id: "can-i-install-an-abs-wheel-speed-sensor-myself",
    question: "Can I install an ABS wheel speed sensor myself?",
    answer:
      "While physically accessible on some hubs, seizing, wiring routing, air-gap/tone-ring clearance, and safety system implications mean professional service is often advised.",
  },
  {
    id: "can-i-work-on-an-ev-battery-sensor-at-home",
    question: "Can I work on an EV battery sensor at home?",
    answer:
      "High-voltage battery pack and thermal monitoring components involve hazardous electrical energy and strict safety protocols—qualified HV technicians should carry out or supervise that work.",
  },
  {
    id: "is-an-oem-reference-proof-that-a-part-is-genuine",
    question: "Is an OEM reference proof that a part is genuine?",
    answer:
      "No. A cross-reference or OEM part number indicates intended equivalence or reference compatibility, not that an item is an authentic OEM-packaged part or verified genuine in this catalog.",
  },
  {
    id: "does-fits-mean-legally-approved-in-my-market",
    question: "Does 'fits' mean legally approved in my market?",
    answer:
      "No. Physical or electronic compatibility does not automatically guarantee road-legal approval, emissions compliance, or type approval in your region.",
  },
  {
    id: "what-if-a-product-listing-lacks-connector-details",
    question: "What if a product listing lacks connector details?",
    answer:
      "Do not guess pinouts or plug shapes if connector details aren't shown—verify the physical connector housing, terminal count, and wiring diagram before purchasing.",
  },
  {
    id: "are-calibration-tools-included-with-a-sensor",
    question: "Are calibration tools included with a sensor?",
    answer:
      "No. Replacement sensors are typically sold as hardware units without diagnostic scan tools, calibration targets, or programming subscriptions unless explicitly stated.",
  },
  {
    id: "why-did-the-status-change-after-i-selected-a-new-vehicle",
    question: "Why did the status change after I selected a new vehicle?",
    answer:
      "Changing the selected vehicle updates how fitment context and compatibility notes are evaluated against that specific vehicle entry.",
  },
  {
    id: "can-i-compare-sensors-from-different-sellers",
    question: "Can I compare sensors from different sellers?",
    answer:
      "Yes. You can tick Compare on multiple cards to review their part numbers, calibration notes, safety flags, and prices side by side.",
  },
  {
    id: "what-should-i-do-if-i-cannot-confirm-the-right-sensor",
    question: "What should I do if I cannot confirm the right sensor?",
    answer:
      "Pause before ordering and check your vehicle's factory parts catalogue, build specification, or a qualified technician or supplier rather than relying on an unconfirmed match.",
  },
];

type SensorQuestionsFaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  faqs?: SensorFaqItem[];
  className?: string;
};

export default function SensorQuestionsFaqSection({
  id = "sensor-questions-faq",
  eyebrow = "FAQ",
  title = "Sensor questions",
  description,
  faqs = DEFAULT_SENSOR_FAQS,
  className = "bg-white",
}: SensorQuestionsFaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    "what-is-a-vehicle-sensor",
  );

  const toggleFaq = (faqId: string) => {
    setOpenId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Sticky Eyebrow & Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>

          {/* Right Column: Clean Divider Accordion List */}
          <div className="divide-y divide-slate-200/80 border-b border-slate-200/80 lg:col-span-8">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <Reveal key={faq.id} delay={index * 15}>
                  <div className="py-5 first:pt-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span
                        className={`text-xs font-bold sm:text-sm ${
                          isOpen ? "text-ink" : "text-slate-800 hover:text-ink"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen
                            ? "bg-[#F5B400] text-ink shadow-2xs"
                            : "border border-slate-200 bg-slate-50/70 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {isOpen ? (
                          <X className="h-3.5 w-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-3 pr-10 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
