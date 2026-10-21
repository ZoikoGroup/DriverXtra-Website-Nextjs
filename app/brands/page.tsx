import type { Metadata } from "next";
import FaqSection from "@/components/ui/FaqSection";
import BrandDirectory from "@/components/brands/BrandDirectory";
import { faqs } from "@/components/brands/data";

export const metadata: Metadata = {
  title: "All Brands A–Z — DriverXtra",
  description: "Find an automotive brand by name or alias, then explore eligible vehicles in your selected market.",
};

type PageProps = {
  /** Set when /brands/<name> doesn't match a brand, so the search shows what was asked for. */
  searchParams: Promise<{ q?: string }>;
};

export default async function BrandsPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <>
      <BrandDirectory initialQuery={q?.slice(0, 40) ?? ""} />
      <FaqSection
        eyebrow="Brand directory questions"
        title="How the A–Z works"
        description="Names, aliases, markets and what a listing in this directory does and doesn't mean."
        faqs={faqs}
      />
    </>
  );
}
