import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import { MessagesHeroSection, SignInSection } from "@/components/messages";
import { messageFaqs } from "@/components/messages/data";

export const metadata: Metadata = {
  title: "Messages | DriverXtra",
  description: "Conversations about your listings stay here. Sign in to view your private messages.",
};

export default function MessagesPage() {
  return (
    <main>
      <MessagesHeroSection />
      <SignInSection />
      <FaqSection id="faq" eyebrow="FAQ" title="Messages questions" faqs={messageFaqs} />
    </main>
  );
}
