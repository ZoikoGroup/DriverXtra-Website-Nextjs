import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import {
  BlackFridayHero,
  DriverPlansSection,
  OfferConditionsSection,
  DowntimeSection,
  PlanFeaturesSection,
  AudienceSection,
  ThreeStepsSection,
  BlackFridayFaqSection,
  OfferUpdatesSection,
  DriverXHeader,
  DriverXFooter,
} from "@/components/black-friday";

// Campaign typefaces, scoped to this page only.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Black Friday Driver Plans — DriverX Mobile | DriverXtra",
  description:
    "Mobile plans for rideshare drivers, couriers and small fleets. Compare DriverX Mobile driver plans and the proposed Black Friday offer.",
};

export default function BlackFridayPage() {
  return (
    <div className={`black-friday bg-[#13243c] ${archivo.variable} ${publicSans.variable}`}>
      <DriverXHeader />
      <BlackFridayHero />
      <DriverPlansSection />
      <ThreeStepsSection />
      <AudienceSection />
      <DowntimeSection />
      <PlanFeaturesSection />
      <OfferConditionsSection />
      <BlackFridayFaqSection />
      <OfferUpdatesSection />
      <DriverXFooter />
    </div>
  );
}
