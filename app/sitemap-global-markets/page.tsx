import type { Metadata } from "next";
import SearchableFaqSection from "@/components/ui/SearchableFaqSection";
import SitemapHeroSection from "@/components/sitemap-global-markets/SitemapHeroSection";
import SiteDirectorySection from "@/components/sitemap-global-markets/SiteDirectorySection";
import GlobalMarketsSection from "@/components/sitemap-global-markets/GlobalMarketsSection";
import SitemapHelpSection from "@/components/sitemap-global-markets/SitemapHelpSection";
import { sitemapFaqs } from "@/components/sitemap-global-markets/data";

export const metadata: Metadata = {
  title: "Sitemap & Global Markets | DriverXtra",
  description: "Explore every DriverXtra section and choose how to browse your market.",
};

export default function SitemapGlobalMarketsPage() {
  return (
    <main>
      <SitemapHeroSection />
      <SiteDirectorySection />
      <GlobalMarketsSection />
      <SitemapHelpSection />
      <SearchableFaqSection title="Sitemap questions" faqs={sitemapFaqs} />
    </main>
  );
}
