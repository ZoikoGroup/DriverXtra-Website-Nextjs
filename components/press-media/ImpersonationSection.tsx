import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import PressHeading from "./PressHeading";
import { IMG } from "./data";

const POINTS = [
  "We don't ask journalists for payment to publish or receive material.",
  "Embargoed material is never shared through public channels.",
];

export default function ImpersonationSection() {
  return (
    <section id="impersonation" className="bg-[#f7f9fc] py-16 md:py-20">
      <div className={container}>
        <PressHeading eyebrow="Impersonation" title="Verify anyone claiming to represent DriverXtra" className="max-w-xl" />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="zoom">
            <div className="relative aspect-[592/444] overflow-hidden rounded-2xl">
              <Image
                src={`${IMG}/impersonation-verify-contact.webp`}
                alt="Person checking a phone while working on a laptop in a café"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[16px] leading-relaxed text-ink">
              Verify anyone claiming to represent DriverXtra. Report suspicious requests directly.
            </p>
            <ul className="mt-1 space-y-2">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
