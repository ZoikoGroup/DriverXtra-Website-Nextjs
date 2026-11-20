import SearchableFaqSection from "@/components/ui/SearchableFaqSection";
import { newsroomFaqs } from "./data";

export default function NewsroomFaqSection() {
  return <SearchableFaqSection id="faq" title="Newsroom questions" faqs={newsroomFaqs} />;
}
