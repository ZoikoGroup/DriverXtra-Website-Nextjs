import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { policyMeta } from "./data";

export default function CookiePolicyHeroSection() {
  return (
    <section id="cookie-policy-hero" className="relative overflow-hidden bg-navy py-10 text-white md:py-14">
      <div className={container}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <li>
              <Link href="/" className="text-white hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white">Legal, Accessibility &amp; Global</li>
            <li aria-hidden>/</li>
            <li aria-current="page">Cookie Policy</li>
          </ol>
        </nav>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">Cookie Policy</h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
                Learn about the technologies used on DriverXtra and how to access the available controls.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
                <div className="flex gap-1">
                  <dt>Policy version:</dt>
                  <dd>{policyMeta.version}</dd>
                </div>
                <div className="flex gap-1">
                  <dt>Effective:</dt>
                  <dd>{policyMeta.effective}</dd>
                </div>
                <div className="flex w-full gap-1 pt-2">
                  <dt>Last reviewed:</dt>
                  <dd>{policyMeta.lastReviewed}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal direction="zoom" delay={150} className="lg:col-span-5">
            <div className="relative aspect-[8/5] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <Image
                src="/images/cookie-policy/hero-laptop-phone.webp"
                alt="A person using a laptop and a phone at a café table"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
