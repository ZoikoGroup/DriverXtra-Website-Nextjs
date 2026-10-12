import Link from "next/link";
import { ArrowRight, CirclePlus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center sm:px-12 md:py-20">
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border-[40px] border-white/20" />
            <div className="pointer-events-none absolute -right-16 -bottom-28 h-80 w-80 rounded-full border-[48px] border-ink/5" />

            <Reveal delay={150}>
              <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Ready to make your next move?
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="relative mx-auto mt-5 max-w-xl text-base text-ink/75 sm:text-lg">
                List your vehicle in minutes or start browsing millions of verified listings today.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CirclePlus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                  Sell your vehicle
                </Link>
                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-white"
                >
                  Browse vehicles
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
