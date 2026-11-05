import type { ReactNode } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ReviewItem = {
  label: string;
  description: string;
};

const DEFAULT_MAY_BE_REVIEWED: ReviewItem[] = [
  {
    label: "Business identity",
    description: "Registered business details",
  },
  {
    label: "Operating authority",
    description: "Trade permissions, where the market requires them",
  },
  {
    label: "Locations",
    description: "Operating sites, reviewed separately",
  },
];

const DEFAULT_NOT_ESTABLISHED: string[] = [
  "That every listing is accurate",
  "Vehicle condition or warranty",
];

type ChooseWhoOrWhatSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  mayBeReviewed?: ReviewItem[];
  notEstablished?: string[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ChooseWhoOrWhatSection({
  id = "choose-who-or-what",
  eyebrow = "What may be reviewed",
  title = "Choose who or what you're looking at",
  description = (
    <>
      Applicability depends on market and category. Markets:{" "}
      <strong className="font-semibold text-ink">United Kingdom</strong> —
      information available.
    </>
  ),
  mayBeReviewed = DEFAULT_MAY_BE_REVIEWED,
  notEstablished = DEFAULT_NOT_ESTABLISHED,
  imageSrc = "/images/how/5.png",
  imageAlt = "Luxury grey sports car parked outdoors",
  className = "bg-[#F6F8FB]",
}: ChooseWhoOrWhatSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Image Card */}
          <Reveal delay={100} className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right Column: Criteria Lists */}
          <Reveal delay={180} className="lg:col-span-6">
            <div className="space-y-8">
              {/* May be reviewed block */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                  May be reviewed
                </h3>

                <ul className="mt-4 space-y-3">
                  {mayBeReviewed.map(({ label, description: itemDesc }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs text-slate-700 sm:text-sm">
                        <strong className="font-semibold text-ink">
                          {label}
                        </strong>
                        {" — "}
                        <span className="text-slate-500">{itemDesc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not established by these checks block */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                  Not established by these checks
                </h3>

                <ul className="mt-4 space-y-3">
                  {notEstablished.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <X className="h-4 w-4 shrink-0 text-rose-500 stroke-[2.5]" />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
