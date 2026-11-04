import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flag, Zap } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { hrefFor } from "@/lib/navigation";
import { partnerIcons } from "@/components/partner-program/icons";
import { PartnerHero } from "@/components/partner-program/sections";
import TransactionTypes from "@/components/order-and-booking-integrations/TransactionTypes";
import MarketCapabilities from "@/components/order-and-booking-integrations/MarketCapabilities";
import RetrySimulator from "@/components/order-and-booking-integrations/RetrySimulator";
import { businessObjects, decisions, faqs, roles } from "@/components/order-and-booking-integrations/data";

export const metadata: Metadata = {
  title: "Order & Booking Integrations — DriverXtra",
  description: "Design connected order and appointment journeys with explicit states, approvals and evidence.",
};

const img = (file: string) => `/images/order-and-booking-integrations/${file}`;

const card = "rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.3)]";

const tile = "grid h-9 w-9 place-items-center rounded-lg bg-ink text-brand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-ink";

export default function OrderAndBookingIntegrationsPage() {
  return (
    <>
      <PartnerHero
        eyebrow="Order & Booking Integrations"
        title="Order & Booking Integrations"
        text="Design connected order and appointment journeys with explicit states, approvals and evidence."
        badges={[
          { icon: "cart", title: "Orders", text: "line-level acceptance and fulfillment" },
          { icon: "calendar", title: "Bookings", text: "confirmed only by the provider" },
          { icon: "shield", title: "No blind retries", text: "look up before you resend" },
        ]}
        image={{ src: img("hero-order-and-booking.webp"), alt: "A presenter walking a team through a plan in an open-plan office", width: 1200, height: 1200, crop: "aspect-[281/240]" }}
        actions={{
          primary: { label: "Explore requirements", href: "#readiness" },
          secondary: { label: "Request technical access", href: hrefFor("API Partners") },
        }}
      />

      <section id="transaction-types" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle
            eyebrow="Choose a transaction type"
            title="Orders and bookings work differently"
            description="Know which one you're building before you start. There's no shared universal endpoint for both."
          />
          <TransactionTypes />
          <Reveal delay={200}>
            <Link
              href={hrefFor("Inventory & Catalog Integrations")}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors hover:text-gold"
            >
              Inventory & Catalog Integrations <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="business-objects" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Business objects" title="How the pieces relate" description="A simplified model. Each object has its own owner and status." />
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
            <Reveal direction="right">
              <ul aria-hidden className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
                {businessObjects.map(({ label, icon }, i) => {
                  const Icon = partnerIcons[icon];
                  return (
                    <li
                      key={label}
                      className="group flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-white hover:shadow-md"
                    >
                      <span className={tile}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[13px] font-bold text-ink">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <h3 className="text-[13px] font-bold text-ink">Text alternative to the diagram</h3>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-white text-slate-500">
                      {["Object", "Belongs to", "Authority"].map((h) => (
                        <th key={h} className="w-1/3 px-3 py-2.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {businessObjects.map(({ label, belongsTo, authority }) => (
                      <tr key={label} className="border-b border-slate-200 transition-colors hover:bg-brand-light/50">
                        <th scope="row" className="px-3 py-2.5 font-normal text-ink">
                          {label}
                        </th>
                        <td className="px-3 py-2.5 text-slate-700">{belongsTo}</td>
                        <td className="px-3 py-2.5 text-slate-700">{authority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="readiness" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Readiness" title="Explore integration requirements" description="Integration access depends on partner eligibility, market and approved capabilities." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(({ title, text, image, alt }, i) => (
              <Reveal key={title} delay={i * 100} className="h-full">
                <article className={`group h-full overflow-hidden ${card}`}>
                  <div className="relative aspect-[150/86] overflow-hidden">
                    <Image src={img(image)} alt={alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                    <p className="mt-1 text-[13px] text-slate-600">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <h3 className="mt-10 text-[15px] font-bold text-ink">Capability by market</h3>
            <div className="mt-3">
              <MarketCapabilities />
            </div>
            <p className="mt-3 text-[12px] text-slate-500">Demonstration registry · source-versioned · unknown is not universal coverage.</p>
          </Reveal>
        </div>
      </section>

      <section id="stock-slots-payment" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={container}>
          <SectionTitle eyebrow="Stock, slots & payment" title="Who decides what" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {decisions.map(({ title, text, icon, image, alt }, i) => {
              const Icon = partnerIcons[icon];
              return (
                <Reveal key={title} delay={i * 100} className="h-full">
                  <article className={`group h-full overflow-hidden ${card}`}>
                    <div className="relative aspect-[200/72] overflow-hidden">
                      <Image src={img(image)} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </div>
                    <div className="p-5">
                      <span className={tile}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="mt-4 text-[14px] font-bold text-ink transition-colors group-hover:text-gold">{title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="changes-and-events" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Changes, cancellations & events" title="When things change after a request" />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <article className={`group h-full p-5 ${card}`}>
                <span className={tile}>
                  <Flag className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-[14px] font-bold text-ink">Cancellations and refunds</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  Cancellation approval and money returned are separate steps that progress independently. If no supported rule applies, contact support.
                </p>
                <h3 className="mt-5 text-[14px] font-bold text-ink">Partial orders</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  Successful lines keep their outcome; failed lines are listed explicitly. One line never completes the whole order.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <article className={`group h-full p-5 ${card}`}>
                <span className={tile}>
                  <Zap className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-[14px] font-bold text-ink">Events and reconciliation</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  Use webhooks for change notifications and read endpoints to reconcile. Late, duplicate or out-of-order events are expected — exactly-once delivery is never
                  assumed.
                </p>
                <Link
                  href={hrefFor("Webhooks")}
                  className="group/link mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold"
                >
                  Webhooks <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="safe-retries" className="scroll-mt-28 bg-slate-50 py-16">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]`}>
          <div>
            <SectionTitle
              eyebrow="Safe retries"
              title="Look up before you retry"
              description="Every request carries an idempotency key. The same key with the same details returns the same outcome. A changed payload is rejected, so retries never create a second transaction."
            />
            <Reveal direction="right" delay={150}>
              <div className="group relative mt-6 aspect-[276/176] overflow-hidden rounded-2xl">
                <Image src={img("safe-retries.webp")} alt="Printed reports and a laptop on a desk" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <RetrySimulator />
          </Reveal>
        </div>
      </section>

      <section id="examples" className="scroll-mt-28 bg-white py-16">
        <div className={container}>
          <SectionTitle eyebrow="Examples" title="Synthetic request and response" />
          <Reveal delay={150}>
            <div className="group relative mt-6 aspect-[600/290] overflow-hidden rounded-2xl">
              <Image
                src={img("synthetic-examples.webp")}
                alt="A laptop on a desk next to printed reports"
                fill
                sizes="(min-width: 1200px) 1150px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-4 text-[13px] text-slate-600">
              Supported operations and schemas are in{" "}
              <Link href={hrefFor("API Documentation")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                API Documentation
              </Link>
              . Check{" "}
              <Link href={hrefFor("Platform Status")} className="font-semibold text-blue-700 underline underline-offset-4 transition-colors hover:text-gold">
                Platform Status
              </Link>{" "}
              before reporting an outage.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection id="order-and-booking-faqs" eyebrow="FAQ" title="Order & Booking Integrations questions" faqs={faqs} />
    </>
  );
}
