"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";

const TABS = ["Login", "Register", "Reset Password"] as const;
type Tab = (typeof TABS)[number];

const FOOTER_LINKS = ["Privacy", "Terms", "Accessibility", "Help"] as const;

const LABEL = "text-sm font-medium text-[#1B1F25]";
const INPUT =
  "h-11 w-full rounded-md border border-[#DDE3EA] bg-white px-3.5 text-sm text-[#1B1F25] outline-none transition placeholder:text-[#94A3B8] focus:border-[#338A83] focus:ring-2 focus:ring-[#338A83]/20";
const PRIMARY_BUTTON =
  "h-12 w-full rounded-md bg-[#338A83] text-base font-semibold text-white shadow-[0_8px_18px_-10px_rgba(10,110,189,0.7)] transition hover:bg-[#2C7A74] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#338A83]";
const TEXT_LINK = "text-[#338A83] transition hover:text-[#2C7A74] hover:underline";

function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-6" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function SocialButton({ logo, children }: { logo: ReactNode; children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center gap-5 rounded-md border border-[#DADFE6] bg-white px-4 text-left font-[family-name:var(--font-poppins)] transition hover:bg-[#F7FAFC]"
    >
      {logo}
      <span className="flex-1 text-sm font-medium text-[#1C2333]">{children}</span>
      <ChevronRight className="size-4 text-[#64748B]" aria-hidden="true" />
    </button>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({ id, autoComplete, placeholder }: { id: string; autoComplete: string; placeholder: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${INPUT} pr-12`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-lg text-[#475569] transition hover:bg-[#F2F8FC]"
      >
        {show ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
      </button>
    </div>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pb-5">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-extrabold leading-10 text-[#1B1F25] sm:text-4xl">
        {title}
      </h2>
      <p className="pt-2 text-base text-[#64748B]">{subtitle}</p>
    </div>
  );
}

function SwitchPrompt({ text, action, onClick }: { text: string; action: string; onClick: () => void }) {
  return (
    <p className="mt-5 flex flex-wrap justify-center gap-1.5 text-base text-[#1B1F25]">
      {text}
      <button type="button" onClick={onClick} className={`font-semibold ${TEXT_LINK}`}>
        {action}
      </button>
    </p>
  );
}

function LoginForm({ goTo }: { goTo: (t: Tab) => void }) {
  return (
    <>
      <Heading title="Welcome back!" subtitle="Sign in to your DriverXmobile account." />
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
        <Field id="signin-email" label="Email address">
          <input id="signin-email" type="email" required autoComplete="email" placeholder="name@company.com" className={INPUT} />
        </Field>
        <Field id="signin-password" label="Password">
          <PasswordInput id="signin-password" autoComplete="current-password" placeholder="Enter your password" />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#1B1F25]">
            <input type="checkbox" defaultChecked className="size-5 cursor-pointer rounded-sm accent-[#338A83]" />
            Remember me for 30 days
          </label>
          <button type="button" onClick={() => goTo("Reset Password")} className={`text-sm ${TEXT_LINK}`}>
            Forgot password?
          </button>
        </div>
        <button type="submit" className={PRIMARY_BUTTON}>
          Log In
        </button>
      </form>

      <div className="flex items-center gap-2.5 pb-4 pt-6" aria-hidden="true">
        <span className="h-px flex-1 bg-[#DDE3EA]" />
        <span className="text-xs text-[#6B7280]">or continue with</span>
        <span className="h-px flex-1 bg-[#DDE3EA]" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialButton logo={<MicrosoftLogo />}>Continue with Microsoft</SocialButton>
        <SocialButton logo={<GoogleLogo />}>Continue with Google</SocialButton>
      </div>

      <SwitchPrompt text="New to DriverXmobile?" action="Register" onClick={() => goTo("Register")} />
    </>
  );
}

function RegisterForm({ goTo }: { goTo: (t: Tab) => void }) {
  return (
    <>
      <Heading title="Create account" subtitle="Join DriverXmobile and start driving." />
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
        <Field id="register-name" label="Full name">
          <input id="register-name" type="text" required autoComplete="name" placeholder="Your full name" className={INPUT} />
        </Field>
        <Field id="register-email" label="Email address">
          <input id="register-email" type="email" required autoComplete="email" placeholder="name@company.com" className={INPUT} />
        </Field>
        <Field id="register-password" label="Password">
          <PasswordInput id="register-password" autoComplete="new-password" placeholder="Create a password" />
        </Field>
        <label className="flex cursor-pointer items-start gap-2.5 pb-1.5 pt-1 text-sm text-[#1B1F25]">
          <input type="checkbox" required className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm accent-[#338A83]" />
          <span>
            I agree to the{" "}
            <Link href="#" className={TEXT_LINK}>Terms</Link> and{" "}
            <Link href="#" className={TEXT_LINK}>Privacy Policy</Link>
          </span>
        </label>
        <button type="submit" className={PRIMARY_BUTTON}>
          Create account
        </button>
      </form>
      <SwitchPrompt text="Already have an account?" action="Log in" onClick={() => goTo("Login")} />
    </>
  );
}

function ResetForm({ goTo }: { goTo: (t: Tab) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Heading title="Reset password" subtitle="We'll email you a link to set a new password." />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="flex flex-col gap-3"
      >
        <Field id="reset-email" label="Email address">
          <input id="reset-email" type="email" required autoComplete="email" placeholder="name@company.com" className={INPUT} />
        </Field>
        {sent && (
          <p role="status" className="rounded-md bg-[#338A83]/10 px-3.5 py-2.5 text-sm text-[#2C7A74]">
            If an account exists for that email, a reset link is on its way.
          </p>
        )}
        <button type="submit" className={`${PRIMARY_BUTTON} mt-1.5`}>
          Send reset link
        </button>
      </form>
      <SwitchPrompt text="Remembered it?" action="Back to login" onClick={() => goTo("Login")} />
    </>
  );
}

export default function SignInPanel() {
  const [tab, setTab] = useState<Tab>("Login");

  return (
    <section className="flex items-center justify-center bg-[#F2F8FC] px-4 py-10 sm:px-12 lg:py-12">
      <div className="flex w-full max-w-[473px] flex-col rounded-3xl bg-white px-4 pb-4 pt-1 shadow-[0_24px_60px_-30px_rgba(15,30,60,0.18),0_1px_2px_rgba(15,30,60,0.04)] sm:px-5 lg:min-h-[806px]">
        <div role="tablist" aria-label="Account" className="flex px-0 sm:px-4">
          {TABS.map((t, i) => {
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                id={`tab-${i}`}
                aria-selected={active}
                aria-controls="signin-tabpanel"
                onClick={() => setTab(t)}
                className={`relative min-h-10 flex-1 whitespace-nowrap px-2 pb-3.5 pt-4 text-sm font-medium transition-colors sm:text-base ${
                  active ? "font-semibold text-[#338A83]" : "text-[#1B1F25] hover:text-[#338A83]"
                } ${i === 2 ? "before:absolute before:left-0 before:top-4 before:h-5 before:w-px before:bg-[#DDE3EA]" : ""}`}
              >
                {t}
                {active && <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-xs bg-[#338A83]" />}
              </button>
            );
          })}
        </div>

        <div
          id="signin-tabpanel"
          role="tabpanel"
          aria-labelledby={`tab-${TABS.indexOf(tab)}`}
          className="mt-1 flex-1 rounded-2xl bg-white px-5 py-6 shadow-[0_10px_30px_-18px_rgba(15,30,60,0.14),0_0_0_1px_rgba(240,243,247,1)] sm:px-8"
        >
          {tab === "Login" && <LoginForm goTo={setTab} />}
          {tab === "Register" && <RegisterForm goTo={setTab} />}
          {tab === "Reset Password" && <ResetForm goTo={setTab} />}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1 pb-2 pt-6 text-xs text-[#475569]">
          <ul className="flex items-center">
            {FOOTER_LINKS.map((l, i) => (
              <li key={l} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="px-2 text-[#94A3B8]">•</span>}
                <Link href="#" className="py-1 transition hover:text-[#1B1F25]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <span>© 2026 DriverXmobile Inc.</span>
        </footer>
      </div>
    </section>
  );
}
