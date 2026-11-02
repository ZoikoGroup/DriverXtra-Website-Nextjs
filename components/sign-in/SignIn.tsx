"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Globe,
  Lock,
  ShieldCheck,
  Crosshair,
  ChevronRight,
} from "lucide-react";

const TABS = ["Login", "Register", "Reset Password"] as const;

const FEATURES = [
  {
    title: "Verified Sellers",
    text: "See how verification works",
    icon: ShieldCheck,
  },
  {
    title: "Fitment-Verified Parts",
    text: "How fitment confidence works",
    icon: Crosshair,
  },
  { title: "Secure Payments", text: "Scope by market and product", icon: Lock },
  { title: "Local Compliance", text: "Rules for your region", icon: Globe },
] as const;

const FOOTER_LINKS = ["Privacy", "Terms", "Accessibility", "Help"] as const;

const INPUT =
  "mt-2 block w-full rounded-lg border border-[#E1E6EC] bg-white px-4 py-3 text-sm text-[#0F1E40] outline-none placeholder:text-[#8A94A6] focus-visible:ring-2 focus-visible:ring-[#FDB913]";

function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 23 23" className="h-5 w-5" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M12 1h10v10H12z" />
      <path fill="#00A4EF" d="M1 12h10v10H1z" />
      <path fill="#FFB900" d="M12 12h10v10H12z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

export default function SignIn() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Login");
  const [show, setShow] = useState(false);

  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-[#F2F5F9] font-sans text-[#0F1E40] lg:h-screen lg:grid-cols-[0.5fr_0.5fr] lg:overflow-hidden">
      <section className="relative min-h-[560px] overflow-hidden text-white lg:min-h-0">
        <Image
          src="/images/auth/sign.png"
          alt="Black luxury car driving on a city highway at sunset"
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B1633]/80 via-[#0B1633]/40 to-transparent"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col px-6 py-8 sm:px-10 lg:px-[65px] lg:py-[55px]">
          <Link
            href="/"
            aria-label="DriverXtra home"
            className="w-fit rounded-xl bg-white px-4 py-2.5"
          >
            <Image
              src="/logo.png"
              alt="DriverXtra"
              width={160}
              height={40}
              priority
              className="h-auto w-[160px]"
            />
          </Link>

          <h1 className="mt-14 text-[38px] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[44px] lg:mt-16 lg:text-[44px]">
            Everything automotive.
            <span className="block bg-gradient-to-r from-[#F9AE11] to-[#FDCA07] bg-clip-text text-transparent">
              One connected <br /> marketplace.
            </span>
          </h1>

          <p className="mt-6 max-w-[470px] text-base leading-relaxed text-white/85">
            Buy, sell, finance, insure, service and manage vehicles, parts and
            mobility solutions on one trusted global platform.
          </p>

          <ul className="mt-10 grid max-w-[505px] grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <li
                  key={f.title}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 text-[#0F1E40] shadow-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FDB913] text-[#FDB913]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-[#8A94A6]">
                      {f.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-6 sm:px-8 lg:h-screen lg:px-8 lg:py-4">
        <div className="flex w-full max-w-[540px] flex-col rounded-3xl bg-white shadow-[0_10px_40px_rgba(15,30,64,0.08)] lg:max-h-[calc(100vh-32px)]">
          <div role="tablist" className="grid shrink-0 grid-cols-3 px-8 pt-5">
            {TABS.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t)}
                  className={`px-2 pb-3 text-sm font-medium transition-colors sm:text-base ${
                    active
                      ? "border-b-2 border-[#FDB913] text-[#E0A200]"
                      : "border-b border-transparent text-[#0F1E40] hover:text-[#E0A200]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mx-5 mt-3 flex min-h-0 flex-col justify-center rounded-2xl border border-[#EDF0F4] px-8 py-5 lg:py-[2.2vh]">
            <h2 className="text-[34px] font-bold leading-none tracking-[-0.02em] text-[#0F1E40] lg:text-[38px]">
              Welcome back!
            </h2>
            <p className="mt-2 text-base text-[#6B7487]">
              Sign in to your DriverXtra account.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-4">
              <label
                htmlFor="dx-email"
                className="block text-sm font-medium sm:text-base"
              >
                Email address
              </label>
              <input
                id="dx-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                className={`${INPUT} py-3 text-base`}
              />

              <label
                htmlFor="dx-password"
                className="mt-3 block text-sm font-medium sm:text-base"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="dx-password"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`${INPUT} py-3 pr-11 text-base`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-[#3C4660]"
                >
                  {show ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#FDB913]"
                  />
                  Remember me for 30 days
                </label>
                <Link
                  href="#"
                  className="font-medium text-[#E0A200] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#FDB913] py-3 text-base font-semibold text-white shadow-[0_8px_18px_rgba(253,185,19,0.35)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDB913]"
              >
                Log In
              </button>
            </form>

            <div className="my-4 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[#E1E6EC]" />
              <span className="text-sm text-[#6B7487]">or continue with</span>
              <span className="h-px flex-1 bg-[#E1E6EC]" />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center gap-4 rounded-lg border border-[#E1E6EC] bg-white px-4 py-3 text-base font-medium transition-colors hover:bg-[#F7F9FB]"
              >
                <MicrosoftLogo />
                <span className="flex-1 text-center">
                  Continue with Microsoft
                </span>
                <ChevronRight
                  className="h-4 w-4 text-[#6B7487]"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="flex items-center gap-4 rounded-lg border border-[#E1E6EC] bg-white px-4 py-3 text-base font-medium transition-colors hover:bg-[#F7F9FB]"
              >
                <GoogleLogo />
                <span className="flex-1 text-center">Continue with Google</span>
                <ChevronRight
                  className="h-4 w-4 text-[#6B7487]"
                  aria-hidden="true"
                />
              </button>
            </div>

            <p className="mt-4 text-center text-base">
              New to DriverXtra?{" "}
              <Link
                href="#"
                className="font-semibold text-[#E0A200] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-8 py-4 text-sm text-[#5B6478]">
            <ul className="flex items-center gap-2">
              {FOOTER_LINKS.map((l, i) => (
                <li key={l} className="flex items-center gap-2">
                  <Link href="#" className="hover:text-[#0F1E40]">
                    {l}
                  </Link>
                  {i < FOOTER_LINKS.length - 1 ? (
                    <span
                      className="h-1 w-1 rounded-full bg-[#B8C0CE]"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
            <span>© 2026 Zoiko Tech Inc.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
