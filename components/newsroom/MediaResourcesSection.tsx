import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";

export default function MediaResourcesSection() {
  return (
    <section id="media-resources" className="scroll-mt-28 bg-[#F6F8FB] py-16 md:py-[72px]">
      <div className={`${container} grid items-start gap-10 lg:grid-cols-2`}>
        <PressHeading
          eyebrow="Media resources"
          title="Logos, imagery and press materials"
          description="Review asset usage and attribution restrictions before reuse."
        />
        <Reveal direction="zoom" delay={150}>
          <div className="relative aspect-[8/5] overflow-hidden rounded-3xl bg-slate-200">
            <Image
              src="/images/newsroom/media-resources.webp"
              alt="Abstract colour study used as a media materials backdrop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
