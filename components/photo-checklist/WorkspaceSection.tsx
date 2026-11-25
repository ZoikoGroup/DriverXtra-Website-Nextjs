import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { workspaceImage } from "./data";

export default function WorkspaceSection() {
  return (
    <section id="add-photos" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className={container}>
        <SectionTitle eyebrow="Private workspace" title="Add photos to my listing draft" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <Reveal delay={100}>
            <p className="max-w-md text-[15px] leading-relaxed text-slate-700">
              Sign in to add photos to a private listing draft. You can read the checklist without signing in.
            </p>
            <Link
              href="/sign-in"
              className="mt-4 inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
            >
              Sign in to add photos
            </Link>
          </Reveal>

          <Reveal direction="zoom" delay={150}>
            <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-200">
              <Image
                src={workspaceImage}
                alt="A seller choosing photos on a laptop"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
