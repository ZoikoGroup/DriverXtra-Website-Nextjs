"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  CalendarClock,
  Eye,
  EyeOff,
  Globe,
  HeartHandshake,
  Lock,
  Mail,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const TABS = ["Login", "Register", "Reset Password"] as const;

const FEATURES = [
  {
    title: "Earn more",
    text: "Competitive fares and transparent pay.",
    icon: BarChart3,
  },
  {
    title: "Total flexibility",
    text: "Work when you want, where you want.",
    icon: CalendarClock,
  },
  {
    title: "Drive with confidence",
    text: "Verified riders and in-app safety tools.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 driver support",
    text: "Real people, real help.",
    icon: HeartHandshake,
  },
] as const;

const STATS = [
  { value: "1M+", label: "Drivers worldwide", icon: Users },
  { value: "500+", label: "Cities and growing", icon: Globe },
  { value: "4.8/5", label: "Driver satisfaction", icon: Star },
] as const;

const FOOTER_LINKS = ["Privacy", "Terms", "Accessibility", "Help"] as const;

const INPUT_WRAP =
  "flex items-center gap-3 rounded-xl border border-[#E3E8E6] px-4 py-3 focus-within:ring-2 focus-within:ring-[#2E8B80]";

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

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#111"
        d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.9zM14.2 5.6c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z"
      />
    </svg>
  );
}

export default function Login() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Login");
  const [show, setShow] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-sans text-[#14201C]">
      <Image
        src="/images/auth/login.png"
        alt="Smiling driver standing beside a car at sunset with a city skyline behind"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:px-[70px]">
        <div className="flex flex-col">
          <Link
            href="/"
            aria-label="DriverXmobile home"
            className="w-fit rounded-2xl bg-white px-4 py-3 shadow-lg"
          >
            <Image
              src="/logo.png"
              alt="DriverXmobile"
              width={170}
              height={52}
              priority
              className="h-auto w-[170px]"
            />
          </Link>

          <div className="mt-16 lg:mt-24">
            <h1 className="text-[44px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[54px]">
              Your drive.
              <span className="block text-[#2E8B80]">
                Greater opportunities.
              </span>
            </h1>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed sm:text-lg">
              The all-in-one platform for drivers. Flexible work. Fair earnings.
              Real support. On the road and in your corner.
            </p>
          </div>

          <ul className="mt-8 grid max-w-[640px] grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <li
                  key={f.title}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E3F1EE] text-[#2E8B80]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-[#4B5650]">
                      {f.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="mt-6 grid max-w-[600px] grid-cols-1 gap-4 rounded-2xl bg-[#1B1F25]/80 p-5 text-white sm:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-semibold leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-white/80">{s.label}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-end lg:justify-start">
          <div className="w-full max-w-[550px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div
              role="tablist"
              className="grid grid-cols-3 border-b border-[#E3E8E6]"
            >
              {TABS.map((t) => {
                const active = tab === t;
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t)}
                    className={`px-2 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "border-b-2 border-[#2E8B80] text-[#2E8B80]"
                        : "text-[#4B5650] hover:text-[#14201C]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="px-6 pb-6 pt-6">
              <h2 className="text-center text-lg font-bold">Welcome back.</h2>
              <p className="mt-1 text-center text-sm text-[#4B5650]">
                Sign in to your DriverXmobile account.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E3E8E6] bg-white px-3 py-3 text-xs font-medium transition-colors hover:bg-[#F7F9F8]"
                >
                  <GoogleLogo />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E3E8E6] bg-white px-3 py-3 text-xs font-medium transition-colors hover:bg-[#F7F9F8]"
                >
                  <AppleLogo />
                  Continue with Apple
                </button>
              </div>

              <div className="my-5 flex items-center gap-3" aria-hidden="true">
                <span className="h-px flex-1 bg-[#E3E8E6]" />
                <span className="text-[11px] text-[#6B746F]">
                  or sign in with email
                </span>
                <span className="h-px flex-1 bg-[#E3E8E6]" />
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="text-sm font-semibold"
                  >
                    Email address
                  </label>
                  <div className={`${INPUT_WRAP} mt-2`}>
                    <Mail
                      className="h-5 w-5 shrink-0 text-[#4B5650]"
                      aria-hidden="true"
                    />
                    <input
                      id="login-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@example.com"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8A938E]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>
                  <div className={`${INPUT_WRAP} mt-2`}>
                    <Lock
                      className="h-5 w-5 shrink-0 text-[#4B5650]"
                      aria-hidden="true"
                    />
                    <input
                      id="login-password"
                      type={show ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8A938E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Hide password" : "Show password"}
                      className="text-[#4B5650]"
                    >
                      {show ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-[#4B5650]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#C9D1CE]"
                  />
                  Remember me
                </label>

                <button
                  type="submit"
                  className="rounded-xl bg-[#2E8B80] py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E8B80]"
                >
                  Log In
                </button>

                <p className="flex items-center justify-center gap-2 text-xs text-[#4B5650]">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Secure to DriverXmobile
                </p>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F0F2F1] px-6 py-4 text-xs text-[#4B5650]">
              <ul className="flex items-center divide-x divide-[#D5DAD8]">
                {FOOTER_LINKS.map((l) => (
                  <li key={l} className="px-2.5 first:pl-0">
                    <Link
                      href="#"
                      className="transition-colors hover:text-[#14201C]"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
              <span>© 2026 DriverXmobile Inc.</span>
            </div>
          </div>

          <Link
            href="/"
            className="mt-6 rounded-full border border-[#2E8B80] bg-white px-8 py-2.5 text-sm font-medium text-[#2E8B80] shadow-md transition-colors hover:bg-[#F0F8F6]"
          >
            Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}
