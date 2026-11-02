import FleetSectionHead from "@/components/fleet-solutions/FleetSectionHead";

export default function PrivacySection() {
  return (
    <section className="flex w-full flex-col bg-[#f6f8fb] px-4 py-[88px] lg:px-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <FleetSectionHead
          eyebrow="Privacy and consent"
          title="How we use your enquiry"
          id="ecPrivH"
          titleSize="text-[37.8px]"
        />
        <p className="text-[16px] leading-[24.8px] font-normal text-[#172033]">
          We use your details to respond to this enquiry. Marketing consent is separate and optional.
        </p>
      </div>
    </section>
  );
}
