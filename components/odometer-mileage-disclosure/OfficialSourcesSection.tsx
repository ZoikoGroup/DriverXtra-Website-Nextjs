import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export default function OfficialSourcesSection({ location }: { location: string }) {
  return (
    <section id="official-sources" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Official sources" title="View official disclosure requirements" />

        <Reveal delay={150}>
          <p aria-live="polite" className="mt-10 max-w-2xl text-[13px] leading-relaxed text-slate-500">
            {location ? (
              <>
                No approved official source is listed for {location} in this version. Check the government transport or
                vehicle licensing authority for {location} before you disclose mileage.{" "}
                <a href="#how-to" className="font-semibold text-blue-700 underline-offset-2 hover:underline">
                  Change location
                </a>
              </>
            ) : (
              <>
                Choose where the vehicle is registered to see official sources.{" "}
                <a href="#how-to" className="font-semibold text-blue-700 underline-offset-2 hover:underline">
                  Choose a location
                </a>
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
