"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { partnerIcons, type PartnerIcon } from "./icons";

export type RoleCard = { id: string; title: string; text: string; image?: string; alt?: string; icon: PartnerIcon };

/** Fired when a role card is picked, so the eligibility checker can preselect it. */
export const ROLE_EVENT = "partner-program:role";

export default function RoleCards({ items, cta = "Check requirements" }: { items: RoleCard[]; cta?: string }) {
  const pick = (id: string) => {
    window.dispatchEvent(new CustomEvent(ROLE_EVENT, { detail: id }));
    document.getElementById("eligibility")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`mt-6 grid gap-4 ${items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map(({ id, title, text, image, alt, icon }, i) => {
        const Icon = partnerIcons[icon];
        return (
          <Reveal key={id} delay={i * 100} className="h-full">
            <button
              type="button"
              onClick={() => pick(id)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]"
            >
              {image && (
                <span className="relative block aspect-[219/136] w-full overflow-hidden">
                  <Image src={image} alt={alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                </span>
              )}
              <span className={`relative flex flex-1 flex-col px-4 pb-4 ${image ? "pt-7" : "pt-4"}`}>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-ink ${
                    image ? "absolute -top-5 left-4 border-2 border-white shadow-md" : "mb-4"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</span>
                <span className="mt-1.5 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {cta} <ArrowRight className="h-3.5 w-3.5 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
