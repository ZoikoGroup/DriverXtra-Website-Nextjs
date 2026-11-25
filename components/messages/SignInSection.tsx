import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { container } from "@/components/ui/SectionTitle";
import { inboxImage } from "./data";

export default function SignInSection() {
  return (
    <section id="sign-in" className="bg-white py-12 md:py-16">
      <div className={`${container} grid items-center gap-10 lg:grid-cols-2`}>
        <Reveal>
          <h2 className="text-xl font-bold text-ink">Sign in to view your messages</h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-slate-700">
            Messages are private to your account. Nothing from your inbox is shown until you sign in.
          </p>
          <Link
            href="/sign-in"
            className="mt-2 inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg"
          >
            Sign in
          </Link>
        </Reveal>

        <Reveal direction="zoom" delay={150}>
          <div className="relative aspect-[8/5] overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src={inboxImage}
              alt="A seller reading messages on a laptop"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
