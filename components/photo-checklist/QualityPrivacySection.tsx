import Image from "next/image";
import { Check, Lock, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { privacyChecks, qualityDont, qualityDos, qualityImage } from "./data";

export default function QualityPrivacySection() {
  return (
    <section id="quality-privacy" className="scroll-mt-28 bg-slate-50 pb-16 md:pb-20">
      <div className={`${container} grid gap-6 lg:grid-cols-2`}>
        <Reveal direction="zoom">
          <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[8/3] bg-slate-200">
              <Image
                src={qualityImage}
                alt="A car photographed in even daylight"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-ink">Quality basics</h2>
              <ul className="mt-3 space-y-2.5">
                {qualityDos.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
                <li className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>
                    <span className="sr-only">Don&apos;t: </span>
                    {qualityDont}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal direction="zoom" delay={120}>
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <Lock aria-hidden className="h-5 w-5" />
              Before you share a photo
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Check for faces, documents, home addresses, location details and other personal information.
            </p>
            <ul className="mt-4 space-y-2.5" aria-label="Remove or hide">
              {privacyChecks.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Upload only photographs you have permission to use. Never photograph identity or title documents for a public
              listing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
