import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import WhyDriverXtra from "@/components/home/WhyDriverXtra";
import ForBusiness from "@/components/home/ForBusiness";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Services />
      <HowItWorks />
      <WhyDriverXtra />
      <ForBusiness />
      <FAQ />
      <CTA />
    </>
  );
}
