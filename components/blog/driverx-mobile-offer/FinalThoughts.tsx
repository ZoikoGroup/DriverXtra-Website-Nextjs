import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { DRIVERX_URL, IMG } from "./data";

export default function FinalThoughts() {
  return (
    <section id="final-thoughts" className="relative scroll-mt-28 overflow-hidden bg-navy py-20 text-white md:py-24">
      <Image src={`${IMG}/steps-car-on-road.webp`} alt="" fill sizes="100vw" className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b1220_35%,rgb(11_18_32/0.6))]" />

      <div className={`relative ${container}`}>
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-sm font-semibold text-brand">
            <span className="h-px w-6 bg-brand" />
            Final thoughts
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            Drive Smarter and Make More of Your Mobile Plan
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-slate-300">
            <p>
              Reliable mobile connectivity is an important part of modern professional driving. Whether you work in
              rideshare, delivery, logistics or another mobile profession, having a suitable mobile plan can help you
              stay connected to the digital tools that support your work.
            </p>
            <p>
              DriverX Mobile focuses on providing connectivity solutions for drivers and mobile professionals, with
              services designed around different working requirements.
            </p>
            <p>
              Its introductory promotion offers an opportunity for eligible customers to receive 35% off eligible
              driver-plan charges for the first three months, with a potential activation-fee waiver for qualifying new
              lines subject to commercial approval.
            </p>
            <p>
              If you are exploring a driver-focused mobile solution, take the time to compare available plans, review
              the promotional conditions and choose an option that suits your needs.
            </p>
          </div>
          <p className="mt-8 font-condensed text-2xl font-bold text-brand sm:text-3xl">
            Drive smarter. Stay connected. Save more with DriverX Mobile.
          </p>
          <a
            href={DRIVERX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-[15px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
          >
            Explore the official website <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
