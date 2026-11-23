import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "@/components/press-media/PressHeading";

export default function PressInquiriesSection() {
  return (
    <section id="press-inquiries" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-12`}>
        <Reveal direction="left">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:rounded-l-none">
            <Image
              src="/images/newsroom/press-inquiries.webp"
              alt="A spokesperson speaking to a small group"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <PressHeading
          eyebrow="For journalists"
          title="Press inquiries"
          description="Journalists and media organizations can send requests through Press & Media. No response time is promised."
        />
      </div>
    </section>
  );
}
