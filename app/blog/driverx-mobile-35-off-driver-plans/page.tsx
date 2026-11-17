import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import { ArticleHero, ArticleBody, FinalThoughts, TITLE, DESCRIPTION, FAQS, JSON_LD } from "@/components/blog/driverx-mobile-offer";

export const metadata: Metadata = {
  title: `${TITLE} | DriverXtra Blog`,
  description: DESCRIPTION,
  keywords: [
    "DriverX Mobile",
    "Driver Mobile Plans",
    "35% Mobile Plan Discount",
    "Rideshare Driver Mobile Plans",
    "Delivery Driver Connectivity",
    "Gig Worker Mobile Plans",
    "Fleet Connectivity Solutions",
  ],
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/black-friday/hero-delivery-van.webp"],
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
      />
      <ArticleHero />
      <ArticleBody />
      <FaqSection
        id="faq"
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Common questions about the DriverX Mobile introductory offer."
        faqs={FAQS}
      />
      <FinalThoughts />
    </>
  );
}
