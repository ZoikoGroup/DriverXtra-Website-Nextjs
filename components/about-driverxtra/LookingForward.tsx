import Reveal from "@/components/ui/Reveal";
import BgImage from "@/components/ui/BgImage";
import { Eyebrow, container } from "@/components/ui/SectionTitle";

export default function LookingForward() {
  return (
    <section className="group relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <BgImage
        src="/images/about/looking-forward-background.webp"
        position="right center"
        className="transition-transform duration-[2s] group-hover:scale-105"
      />

      <div className={`${container} relative`}>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow dark>
              <span className="text-slate-300">Looking forward</span>
            </Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-[42px]">
              The next generation of automotive commerce will be more connected.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-300">
              Vehicles are becoming increasingly electrified, software-defined and data-enabled. Parts supply, service
              networks, charging, fleet operations and ownership models are changing with them. DriverXtra is being
              built to evolve with that market — extending the same principles of trusted participation, compatibility,
              transparency and governed commerce into the next generation of mobility.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
