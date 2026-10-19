import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";

export default function Hero() {
  return (
    <section className="bg-[#F6F8FB]">
      <div className={`${container} py-20 md:py-28`}>
        <div className="max-w-[640px]">
          <Reveal>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">Manage your listings.</h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-2 text-base leading-7 text-slate-600">Sign in to view and manage listings associated with your account.</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* No sign-in page yet */}
              <Link
                href="#"
                className="btn-shine inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_24px_-8px_rgba(255,194,14,0.7)]"
              >
                Sign In
              </Link>
              <Link
                href="/sell-vehicles"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
              >
                Back to Sell Vehicles
              </Link>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Your workspace is private. Listing details, messages and counts only appear after you sign in.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
