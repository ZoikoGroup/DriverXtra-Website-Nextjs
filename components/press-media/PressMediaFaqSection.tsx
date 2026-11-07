import FaqSection from "@/components/ui/FaqSection";
import { PRESS_FAQS } from "./data";

export default function PressMediaFaqSection() {
  return (
    <FaqSection
      id="faq"
      eyebrow="FAQ"
      title="Press & Media questions"
      description={
        <>
          Draft answers, pending owner approval.
          <span className="mt-3 block text-[13px] text-slate-500">{PRESS_FAQS.length} questions</span>
        </>
      }
      faqs={PRESS_FAQS}
      className="bg-white"
    />
  );
}
