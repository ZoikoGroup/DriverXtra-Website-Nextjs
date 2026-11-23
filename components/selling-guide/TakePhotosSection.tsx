import Image from "next/image";
import { Check, Lock, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { photoShots } from "./data";

const privacyTips = [
  { ok: false, text: "Don't show your house number or street name" },
  { ok: false, text: "Cover or blur documents and personal items" },
  { ok: true, text: "Check your market's rules before hiding the number plate" },
];

export default function TakePhotosSection() {
  return (
    <section id="photos" className="scroll-mt-28 bg-white py-20 md:py-24">
      <div className={container}>
        <SectionTitle
          eyebrow="Step 3"
          title="Take photos buyers can trust"
          description="Clear, honest photos help buyers decide — and reduce disputes later."
        />

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {photoShots.map((shot, i) => (
            <Reveal as="li" key={shot.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-base font-bold text-brand ring-4 ring-slate-100">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-sm font-bold text-ink">{shot.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{shot.hint}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal direction="zoom">
            <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[8/3]">
                <Image
                  src="/images/selling-guide/step-photos-daylight.webp"
                  alt="A car photographed in daylight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink">Good light, plain background</h3>
                <p className="mt-2 text-[15px] text-slate-600">
                  Overcast daylight avoids harsh reflections. Move the car away from clutter.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Lock className="h-5 w-5" /> Protect your privacy
              </h3>
              <ul className="mt-4 space-y-2.5">
                {privacyTips.map((tip) => (
                  <li key={tip.text} className="flex gap-2.5 text-[15px] text-ink">
                    {tip.ok ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-label="Do" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-label="Don't" />
                    )}
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
