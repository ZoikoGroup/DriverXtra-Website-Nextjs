import type { ReactNode } from "react";
import Image from "next/image";
import { Check, X, AlertTriangle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

export type ConnectorRow = {
  connector: string;
  charging: string;
  whereToSee: string;
};

export type AdapterItem = {
  id: string;
  type: "check" | "cross";
  text: ReactNode;
};

const DEFAULT_CONNECTORS: ConnectorRow[] = [
  {
    connector: "Type 1 (J1772)",
    charging: "AC",
    whereToSee: "Older North American and some Asian vehicles",
  },
  {
    connector: "Type 2",
    charging: "AC",
    whereToSee: "Common across UK and Europe",
  },
  {
    connector: "CCS1 / CCS2",
    charging: "DC (with AC)",
    whereToSee: "Combined fast charging, region-specific",
  },
  {
    connector: "NACS (SAE J3400)",
    charging: "AC and DC",
    whereToSee: "Increasingly used in North America",
  },
  {
    connector: "CHAdeMO",
    charging: "DC",
    whereToSee: "Some older models",
  },
];

const DEFAULT_ADAPTERS: AdapterItem[] = [
  {
    id: "adapter-1",
    type: "check",
    text: "Use only adapters your vehicle maker and charge operator permit",
  },
  {
    id: "adapter-2",
    type: "cross",
    text: "An unknown adapter may affect warranty, safety or fire risk",
  },
  {
    id: "adapter-3",
    type: "check",
    text: "Ratings, weather protection and software can restrict use",
  },
];

type ConnectorsAndCompatibilitySectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  connectors?: ConnectorRow[];
  adapters?: AdapterItem[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function ConnectorsAndCompatibilitySection({
  id = "connectors-and-compatibility",
  eyebrow = "Connectors",
  title = "Connectors and compatibility",
  description = "A plug match is only one part of compatibility. Check your vehicle, charging equipment, access rules, and any adapter with their official guidance.",
  connectors = DEFAULT_CONNECTORS,
  adapters = DEFAULT_ADAPTERS,
  imageSrc = "/images/ev/3.png",
  imageAlt = "White electric sports car displayed at showroom",
  className = "bg-[#F6F8FB]",
}: ConnectorsAndCompatibilitySectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Eyebrow, Title, Description & Connectors Table (7 cols) */}
          <div className="space-y-8 lg:col-span-7">
            <Reveal delay={50}>
              <SectionTitle
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </Reveal>

            {/* Connectors Table Container */}
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-3xl bg-[#F6F8FB]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                        <th className="py-3.5 pl-6 pr-4">Connector</th>
                        <th className="px-4 py-3.5">Charging</th>
                        <th className="py-3.5 pl-4 pr-6">
                          Where you&apos;ll see it
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {connectors.map((row) => (
                        <tr
                          key={row.connector}
                          className="transition-colors"
                        >
                          <td className="py-4 pl-6 pr-4 font-bold text-ink">
                            {row.connector}
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-600">
                            {row.charging}
                          </td>
                          <td className="py-4 pl-4 pr-6 font-medium text-slate-500">
                            {row.whereToSee}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Zero-padding Image & Adapters Card (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Edge-to-edge top image container */}
            <Reveal direction="zoom" delay={120}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {/* Adapters Safety Warning Box */}
            <Reveal delay={160}>
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7">
                <div className="flex items-center gap-2">
                  <span className="text-[#F5B400]">
                    <AlertTriangle className="h-4 w-4 stroke-[2.2]" />
                  </span>
                  <h3 className="text-sm font-bold text-ink sm:text-base">
                    Adapters
                  </h3>
                </div>

                <div className="mt-5 space-y-3.5">
                  {adapters.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="mt-0.5 shrink-0">
                        {item.type === "check" ? (
                          <Check className="h-4 w-4 text-emerald-600 stroke-[2.5]" />
                        ) : (
                          <X className="h-4 w-4 text-rose-500 stroke-[2.5]" />
                        )}
                      </span>
                      <p className="font-medium text-slate-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
