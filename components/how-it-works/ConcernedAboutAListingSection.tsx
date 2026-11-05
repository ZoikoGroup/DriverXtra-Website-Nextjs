import type { ReactNode } from "react";
import Image from "next/image";
import { Flag, AlertTriangle, Scale } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ConcernCard = {
  title: string;
  description: string;
  icon: typeof Flag;
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_CONCERNS: ConcernCard[] = [
  {
    title: "Report a Listing",
    description: "Something in a listing looks wrong or misleading.",
    icon: Flag,
    imageSrc: "/images/how/10.png",
    imageAlt: "Luxury grey sports car parked outdoors",
  },
  {
    title: "Report Fraud",
    description: "Someone asked for money, documents or account details.",
    icon: AlertTriangle,
    imageSrc: "/images/how/11.png",
    imageAlt: "Person working on a laptop and holding a mobile phone",
  },
  {
    title: "Learn about Disputes & Appeals",
    description: "Correct a signal or challenge a decision.",
    icon: Scale,
    imageSrc: "/images/how/12.png",
    imageAlt:
      "Team in a modern office meeting room reviewing presentation data",
  },
];

type ConcernedAboutAListingSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  concerns?: ConcernCard[];
  className?: string;
};

export default function ConcernedAboutAListingSection({
  id = "concerns",
  eyebrow = "Concerns",
  title = "Concerned about a listing or someone contacting you?",
  description = "Choose the route that best matches your concern. If you're in immediate danger, contact local emergency services first.",
  concerns = DEFAULT_CONCERNS,
  className = "bg-white",
}: ConcernedAboutAListingSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {concerns.map(
            (
              {
                title: cardTitle,
                description: cardDesc,
                icon: Icon,
                imageSrc,
                imageAlt,
              },
              i,
            ) => (
              <Reveal key={cardTitle} delay={i * 80}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md">
                  {/* Clean Image Container */}
                  <div className="relative aspect-[20/9] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Content Body with Inline Icon Box */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Dark Icon Box inside content area */}
                      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-[#F5B400] shadow-sm">
                        <Icon className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="text-base font-bold text-ink">
                        {cardTitle}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {cardDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
