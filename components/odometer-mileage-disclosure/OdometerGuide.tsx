"use client";

import { useState } from "react";
import HowToSection from "./HowToSection";
import OfficialSourcesSection from "./OfficialSourcesSection";
import UncertaintySection from "./UncertaintySection";
import UnitsSection from "./UnitsSection";

/** Holds the registration location shared by the how-to selector and official sources. */
export default function OdometerGuide() {
  const [location, setLocation] = useState("");

  return (
    <>
      <HowToSection location={location} onLocationChange={setLocation} />
      <UnitsSection />
      <UncertaintySection />
      <OfficialSourcesSection location={location} />
    </>
  );
}
