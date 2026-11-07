import Image from "next/image";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { IMG } from "./data";

type Tile = {
  title: string;
  body: string;
  image?: string;
  alt?: string;
  className: string;
  link?: { href: string; label: string };
};

const TILES: Tile[] = [
  {
    title: "Rideshare drivers",
    body: "Stay reachable for pickups across a full shift.",
    image: `${IMG}/audience-rideshare-driver.webp`,
    alt: "Driver's hand on a steering wheel with city lights at dusk",
    className: "min-h-[22rem] md:row-span-2 md:min-h-0",
  },
  {
    title: "Delivery and couriers",
    body: "Confirm drop-offs and keep in touch with customers.",
    image: `${IMG}/audience-courier-delivery.webp`,
    alt: "Courier handing over a cardboard parcel",
    className: "min-h-[16rem]",
  },
  {
    // No photo supplied for this tile yet, so it uses a branded gradient until one is added.
    title: "Gig workers and contractors",
    body: "Run several work apps from one plan.",
    className: "min-h-[16rem]",
  },
  {
    title: "Dispatch and small fleets",
    body: "Keep drivers and dispatch on the same page.",
    image: `${IMG}/audience-fleet-truck.webp`,
    alt: "Commercial truck on a mountain highway",
    className: "min-h-[22rem] md:col-start-3 md:row-span-2 md:row-start-1 md:min-h-0",
    link: { href: "/fleet-solutions", label: "Fleet plans" },
  },
];

export default function AudienceSection() {
  return (
    <section id="who-its-for" className="bg-[#13243c] py-20 text-white md:py-24">
      <div className={container}>
        <Reveal>
          <h2 className="bf-display max-w-xl text-3xl leading-[1.05] font-extrabold sm:text-5xl">
            For people whose phone is a work tool
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">
            When your phone runs the job, downtime matters. DriverX Mobile is built for drivers, couriers and the
            teams that dispatch them.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 md:h-[34rem] md:grid-cols-[1.25fr_1fr_1.1fr] md:grid-rows-2">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} direction="zoom" className={t.className}>
              <article className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#1f5c4c,#13243c_70%)] p-5 sm:p-6">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt={t.alt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Smartphone aria-hidden className="absolute top-6 right-6 -z-10 h-24 w-24 text-white/10" strokeWidth={1.25} />
                )}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d1829]/90 via-[#0d1829]/30 to-transparent" />
                <h3 className="bf-display text-xl font-extrabold">{t.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-200">{t.body}</p>
                {t.link && (
                  <Link
                    href={t.link.href}
                    className="link-underline mt-1 self-start text-[15px] text-slate-200 hover:text-[#fcd116]"
                  >
                    {t.link.label}
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
