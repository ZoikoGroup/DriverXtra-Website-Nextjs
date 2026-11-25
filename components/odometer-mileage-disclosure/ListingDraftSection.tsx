import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { draftImage } from "./data";

export default function ListingDraftSection() {
  return (
    <section id="listing-draft" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className={container}>
        <SectionTitle
          eyebrow="Your listing draft"
          title="Record the reading in your private draft"
          description="Nothing you type on this public page is kept unless you sign in and save it to your own draft."
          className="max-w-3xl"
        />

        <Reveal direction="zoom" delay={150} className="mt-8">
          <div className="relative aspect-[1232/377] overflow-hidden rounded-2xl bg-black">
            <Image
              src={draftImage}
              alt="A seller beside their car"
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
