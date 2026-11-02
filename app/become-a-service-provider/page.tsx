import {
  BecomeServiceProviderHero,
  BuiltForAutomotiveServiceBusinessesSection,
  CheckEligibilitySection,
  KnowWhatYouWillNeedSection,
  ProviderOnboardingStepsSection,
  AgreeWorkBeforeItBeginsSection,
  ServiceAreaAndSafetySection,
  TransparentTermsSection,
  BecomeServiceProviderFaqSection,
} from "@/components/become-a-service-provider";

export default function BecomeAServiceProviderPage() {
  return (
    <main>
      <BecomeServiceProviderHero />
      <BuiltForAutomotiveServiceBusinessesSection />
      <CheckEligibilitySection />
      <KnowWhatYouWillNeedSection />
      <ProviderOnboardingStepsSection />
      <AgreeWorkBeforeItBeginsSection />
      <ServiceAreaAndSafetySection />
      <TransparentTermsSection />
      <BecomeServiceProviderFaqSection />
    </main>
  );
}
