"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type ReadingItem = {
  label: string;
  href: string;
};

type RoleOption = {
  id: string;
  label: string;
  headline: string;
  links: ReadingItem[];
};

const ROLES_DATA: RoleOption[] = [
  {
    id: "developer",
    label: "Developer",
    headline: "Developer — Build and test an integration",
    links: [
      { label: "Prepare before requesting access", href: "#prepare" },
      { label: "Authentication, permissions and consent", href: "#auth" },
      { label: "Handle credentials safely", href: "#credentials" },
      { label: "Separate environments", href: "#environments" },
      { label: "Webhook messages", href: "#webhooks" },
      { label: "What did you see?", href: "#what-you-saw" },
    ],
  },
  {
    id: "admin",
    label: "Organization admin",
    headline: "Organization admin — Manage access and administrative controls",
    links: [
      { label: "Prepare before requesting access", href: "#prepare" },
      { label: "Authentication, permissions and consent", href: "#auth" },
      { label: "Handle credentials safely", href: "#credentials" },
      { label: "Security contact guidelines", href: "#security-contact" },
    ],
  },
  {
    id: "reviewer",
    label: "Partner reviewer",
    headline:
      "Partner reviewer — Validate security and compliance requirements",
    links: [
      { label: "Authentication, permissions and consent", href: "#auth" },
      { label: "Separate environments", href: "#environments" },
      { label: "Data classification & retention", href: "#data-retention" },
    ],
  },
  {
    id: "security",
    label: "Security contact",
    headline: "Security contact — Handle vulnerabilities and incident response",
    links: [
      { label: "Handle credentials safely", href: "#credentials" },
      { label: "Webhook messages", href: "#webhooks" },
      { label: "Security contact guidelines", href: "#security-contact" },
    ],
  },
];

type WhatBringsYouHereSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  roles?: RoleOption[];
  className?: string;
};

export default function WhatBringsYouHereSection({
  id,
  eyebrow = "Your role",
  title = "What brings you here?",
  description = "Pick a role to see a suggested reading order. Nothing is personalized or stored.",
  roles = ROLES_DATA,
  className = "bg-white",
}: WhatBringsYouHereSectionProps) {
  const [activeRoleId, setActiveRoleId] = useState<string>(
    roles[0]?.id || "developer",
  );

  const activeRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Pill Selection Tabs */}
        <Reveal delay={100} className="mt-8">
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm">
            {roles.map((role) => {
              const isActive = role.id === activeRoleId;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRoleId(role.id)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-ink shadow-sm"
                      : "text-slate-600 hover:text-ink"
                  }`}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Selected Role Content Card */}
        <Reveal delay={180} className="mt-6">
          <div className="rounded-2xl border border-slate-900 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-sm font-bold text-ink">
              {activeRole.headline}
            </h3>

            <ol className="mt-5 space-y-2.5 list-decimal list-inside text-xs sm:text-sm">
              {activeRole.links.map((link) => (
                <li key={link.label} className="text-slate-400">
                  <a
                    href={link.href}
                    className="font-medium text-slate-700 underline underline-offset-4 decoration-slate-300 transition-colors hover:text-ink hover:decoration-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
