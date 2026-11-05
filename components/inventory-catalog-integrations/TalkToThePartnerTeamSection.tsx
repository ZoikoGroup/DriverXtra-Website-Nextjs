"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const ROLE_OPTIONS = [
  "Parts Seller",
  "Dealer",
  "Distributor",
  "Developer / Technical Lead",
  "Other",
];

const DATA_OPTIONS = [
  "Parts & Product Master",
  "Vehicle Listing Data",
  "Brand Catalogs",
  "Full Inventory Feed",
  "Other Integration Scope",
];

type TalkToThePartnerTeamSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export default function TalkToThePartnerTeamSection({
  id = "partner-contact",
  eyebrow = "Contact",
  title = "Talk to the partner team",
  description = (
    <>
      Partner eligibility and approval are owned by the partner team. Product
      incidents go to{" "}
      <a href="#platform-status" className="underline hover:text-ink">
        Platform Status
      </a>
      ; data corrections use your integration&apos;s correction route.
    </>
  ),
  imageSrc = "/images/inventory/14.png",
  imageAlt = "Team in a modern office meeting room reviewing presentation data on screen",
  className = "bg-[#F6F8FB]",
}: TalkToThePartnerTeamSectionProps) {
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [dataType, setDataType] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Title, Description & Image */}
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <Reveal direction="zoom" delay={100} className="mt-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl bg-slate-900">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <Reveal delay={180} className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600 font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    Inquiry submitted successfully
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    Thank you for reaching out. The partner team will review
                    your details and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization Legal Name */}
                  <div>
                    <label
                      htmlFor="org-name"
                      className="block text-xs font-bold text-ink"
                    >
                      Organization (legal name)
                    </label>
                    <div className="mt-2">
                      <input
                        id="org-name"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-ink sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Your Role Select */}
                  <div>
                    <label
                      htmlFor="partner-role"
                      className="block text-xs font-bold text-ink"
                    >
                      Your role
                    </label>
                    <div className="mt-2">
                      <select
                        id="partner-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-ink outline-none transition-colors focus:border-ink sm:text-sm"
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Data You Want to Connect Select */}
                  <div>
                    <label
                      htmlFor="data-scope"
                      className="block text-xs font-bold text-ink"
                    >
                      Data you want to connect
                    </label>
                    <div className="mt-2">
                      <select
                        id="data-scope"
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-ink outline-none transition-colors focus:border-ink sm:text-sm"
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        {DATA_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="work-email"
                      className="block text-xs font-bold text-ink"
                    >
                      Work email
                    </label>
                    <div className="mt-2">
                      <input
                        id="work-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-ink sm:text-sm"
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Don&apos;t attach catalog files, customer data or
                      credentials.
                    </p>
                  </div>

                  {/* Optional Checkbox */}
                  <div>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200/80 p-4 transition-colors hover:border-slate-300">
                      <input
                        type="checkbox"
                        checked={subscribe}
                        onChange={(e) => setSubscribe(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-ink focus:ring-slate-900"
                      />
                      <span className="text-xs font-medium text-slate-700 sm:text-sm">
                        Optional; send me partner program updates.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#F5B400] px-6 py-3.5 text-xs font-bold text-ink shadow-sm transition-opacity hover:opacity-90"
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
