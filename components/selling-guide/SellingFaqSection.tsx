import SearchableFaqSection from "@/components/ui/SearchableFaqSection";
import { sellingFaqs } from "./data";

export default function SellingFaqSection() {
  return <SearchableFaqSection id="faq" title="Selling questions" faqs={sellingFaqs} />;
}
