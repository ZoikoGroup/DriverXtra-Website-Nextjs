import {
  SensorsHeroSection,
  SensorsFilterBarSection,
  SensorsCatalogSection,
  SensorQuestionsFaqSection,
} from "@/components/sensors";

export default function SensorsPage() {
  return (
    <main>
      <SensorsHeroSection />
      <SensorsFilterBarSection />
      <SensorsCatalogSection />
      <SensorQuestionsFaqSection />
    </main>
  );
}
