import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { uploadImage } from "./data";

export default function PrivateUploadSection() {
  return (
    <section id="private-upload" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Private upload" title="Add a document to your listing draft" className="max-w-3xl" />

        <Reveal direction="zoom" delay={150} className="mt-8">
          <div className="relative aspect-[1232/609] overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src={uploadImage}
              alt="A seller working on a listing at a desk"
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
