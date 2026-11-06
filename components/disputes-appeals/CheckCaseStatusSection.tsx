import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type CheckCaseStatusSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  placeholder?: string;
  hintText?: string;
  className?: string;
};

export default function CheckCaseStatusSection({
  id = "check-case-status",
  eyebrow = "Check a case",
  title = "Where's my case?",
  description = "Enter your case reference. We show limited details to protect everyone involved — never the other party's private information or reviewer deliberations.",
  imageSrc = "/images/disputes/11.png",
  imageAlt = "Analytics dashboard displayed on a laptop screen showing performance charts",
  placeholder = "DA-XXXXXX",
  hintText = "Try DA-DEMO01 for an example in progress.",
  className = "bg-white",
}: CheckCaseStatusSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Eyebrow, Title, Description & Analytics Dashboard Image */}
          <div className="space-y-8 lg:col-span-6">
            <Reveal delay={50}>
              <SectionTitle
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </Reveal>

            {/* Zero-padding Dashboard Image */}
            <Reveal direction="zoom" delay={120}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xs">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Case Status Input Card */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10">
              <label
                htmlFor="case-reference"
                className="block text-xs font-bold text-ink sm:text-sm"
              >
                Case reference
              </label>

              <div className="mt-3">
                <input
                  type="text"
                  id="case-reference"
                  name="caseReference"
                  defaultValue=""
                  placeholder={placeholder}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs text-ink placeholder-slate-400 focus:outline-hidden sm:text-sm"
                />
              </div>

              {hintText && (
                <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                  {hintText}
                </p>
              )}

              <div className="mt-8">
                <button
                  type="button"
                  className="w-full rounded-full bg-[#0B1220] py-3.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-slate-800 sm:text-sm"
                >
                  Check status
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
