"use client";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type DealerContactSectionProps = {
  id?: string;
  className?: string;
};

export default function DealerContactSection({
  id,
  className = "bg-white",
}: DealerContactSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        {/* Section Header */}
        <div className="max-w-2xl">
          <SectionTitle
            eyebrow="Contact"
            title="See the next step for your dealership."
            description="Tell us a little about your operating market and the workflow you want to improve. We will route your request to the appropriate dealer team where this service is supported."
          />
        </div>

        {/* Main Grid: Form on Left, Image + What happens next on Right */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left: Contact Form Card */}
          <Reveal delay={100} className="w-full">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="business-name"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Business name
                    </label>
                    <input
                      id="business-name"
                      type="text"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="your-role"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Your role
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="your-role"
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        <option value="independent-dealer">
                          Independent dealer
                        </option>
                        <option value="dealer-group">Dealer group</option>
                        <option value="inventory-team">Inventory team</option>
                        <option value="integrations-lead">
                          Integrations lead
                        </option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="business-email"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Business email
                  </label>
                  <input
                    id="business-email"
                    type="email"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="workflow-improve"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Workflow to improve
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      id="workflow-improve"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                      <option value="" disabled>
                        Choose
                      </option>
                      <option value="storefront">Storefront</option>
                      <option value="inventory">Inventory Feeds</option>
                      <option value="crm">Leads & CRM Integrations</option>
                      <option value="verification">Dealer Verification</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
                      ▼
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-slate-600 leading-relaxed"
                  >
                    I agree DriverXtra may contact me about this inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-ink transition-colors hover:bg-brand-dark hover:text-white shadow-sm"
                >
                  Send Dealer Inquiry
                </button>
              </form>
            </div>
          </Reveal>

          {/* Right: Image & What Happens Next Card */}
          <Reveal delay={150} direction="zoom" className="w-full">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/dealer-solutions/3.png"
                  alt="Dealer team collaborating in a modern workspace environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-bold text-ink">
                  What happens next
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  An inquiry is not an account approval or activation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
