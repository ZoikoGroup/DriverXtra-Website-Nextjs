import type { ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

/** Typography primitives for long-form blog articles. */

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-16 scroll-mt-28 text-2xl leading-tight font-extrabold tracking-tight text-ink first:mt-0 sm:text-3xl">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-bold text-ink sm:text-xl">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[16px] leading-[1.8] text-slate-700">{children}</p>;
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-semibold text-gold underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-slate-700">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-dark" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="mt-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 760px" className="object-cover" />
      </div>
      {caption && <figcaption className="mt-3 text-[13px] text-slate-500">{caption}</figcaption>}
    </figure>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-6 rounded-xl border-l-4 border-brand bg-brand-light/60 px-5 py-4 text-[14px] leading-relaxed text-slate-700">
      {children}
    </aside>
  );
}

/** Numbered card used for the "reasons" and "steps" lists. */
export function NumberedCard({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-ink">{n}</span>
      <div>
        <h3 className="text-[17px] font-bold text-ink">{title}</h3>
        <div className="mt-1.5 space-y-2 text-[15px] leading-relaxed text-slate-600">{children}</div>
      </div>
    </div>
  );
}
