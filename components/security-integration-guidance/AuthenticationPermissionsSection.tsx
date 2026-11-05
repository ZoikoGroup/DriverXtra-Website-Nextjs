import type { ReactNode } from "react";
import Image from "next/image";
import { User, ShieldCheck, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

const PERMISSIONS_BULLETS = [
  "Request only the scopes you need",
  "Organization approval is recorded per scope",
  "Consent status comes from its owning system",
  "Revoke access you no longer use",
];

type AuthenticationPermissionsSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  authImageSrc?: string;
  authImageAlt?: string;
  permissionsImageSrc?: string;
  permissionsImageAlt?: string;
  className?: string;
};

export default function AuthenticationPermissionsSection({
  id = "auth",
  eyebrow = "Access",
  title = "Authentication, permissions and consent",
  description,
  authImageSrc = "/images/security/3.png",
  authImageAlt = "Code editor displaying API authentication patterns and syntax",
  permissionsImageSrc = "/images/security/4.png",
  permissionsImageAlt = "Modern open-plan office representing collaborative enterprise permissions and developer environments",
  className = "bg-[#F6F8FB]",
}: AuthenticationPermissionsSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Left Card: Authentication */}
          <Reveal delay={100}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
              {/* Image Container */}
              <div className="relative aspect-[24/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={authImageSrc}
                  alt={authImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col justify-start p-6 sm:p-8">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-brand shadow-sm">
                  <User className="h-5 w-5 stroke-[2.5]" />
                </div>

                <h3 className="mt-5 text-base font-bold text-ink">
                  Authentication
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Authentication patterns are published per operation in the API
                  reference.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Card: Permissions and consent */}
          <Reveal delay={180}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-brand/50 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.08)]">
              {/* Image Container */}
              <div className="relative aspect-[24/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={permissionsImageSrc}
                  alt={permissionsImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col justify-start p-6 sm:p-8">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0B1220] text-brand shadow-sm">
                  <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
                </div>

                <h3 className="mt-5 text-base font-bold text-ink">
                  Permissions and consent
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {PERMISSIONS_BULLETS.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                      <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                        {bullet}
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
