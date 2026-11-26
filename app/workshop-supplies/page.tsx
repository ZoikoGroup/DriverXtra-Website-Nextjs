import {
  WorkshopSuppliesHeroSection,
  WorkshopSuppliesFilterBarSection,
  WorkshopSuppliesCatalogSection,
  WorkshopSuppliesFaqSection,
} from "@/components/workshop-supplies";

export default function WorkshopSuppliesPage() {
  return (
    <main>
      <WorkshopSuppliesHeroSection />
      <WorkshopSuppliesFilterBarSection />
      <WorkshopSuppliesCatalogSection />
      <WorkshopSuppliesFaqSection />
    </main>
  );
}
