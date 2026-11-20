import SearchableFaqSection from "@/components/ui/SearchableFaqSection";
import { methodologyFaqs } from "./data";

export default function MethodologyFaqSection() {
  return <SearchableFaqSection id="faq" title="Methodology questions" faqs={methodologyFaqs} />;
}
