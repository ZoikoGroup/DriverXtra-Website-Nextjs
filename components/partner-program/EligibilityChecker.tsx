"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ClipboardList, Info, Pencil } from "lucide-react";
import RegionPicker from "@/components/ui/RegionPicker";
import { useRegion } from "@/lib/region";
import { ROLE_EVENT } from "./RoleCards";

/** The selected market, for use inside server-rendered text. */
export function MarketName({ className = "font-semibold text-ink" }: { className?: string }) {
  return <strong className={className}>{useRegion()}</strong>;
}

export type EligibilityOption = { id: string; label: string };
export type ServiceRule = EligibilityOption & { gates: string[]; note?: string };

type Props = {
  labels: { role: string; service: string; market: string; submit: string };
  roles: EligibilityOption[];
  services: ServiceRule[];
  roleGates: Record<string, string[]>;
  /** Requirements that apply whatever the role and service. */
  commonGates: string[];
  /** Services each role can support; any other pairing shows the note instead of requirements. */
  roleScope?: { allowed: Record<string, string[]>; note: string };
};

/** A guide to what may apply — nothing is shared or submitted. */
export default function EligibilityChecker({ labels, roles, services, roleGates, commonGates, roleScope }: Props) {
  const region = useRegion();
  const [role, setRole] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<{ role?: string; service?: string }>({});
  const [result, setResult] = useState<{ role: string; service: string } | null>(null);

  // Picking a "Who it's for" card preselects the role.
  useEffect(() => {
    const onPick = (e: Event) => {
      setRole((e as CustomEvent<string>).detail);
      setErrors((er) => ({ ...er, role: undefined }));
      setResult(null);
    };
    window.addEventListener(ROLE_EVENT, onPick);
    return () => window.removeEventListener(ROLE_EVENT, onPick);
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const choose = (label: string) => `Choose ${/^[aeiou]/i.test(label) ? "an" : "a"} ${label.toLowerCase()}.`;
    setErrors({ role: role ? undefined : choose(labels.role), service: service ? undefined : choose(labels.service) });
    if (role && service) setResult({ role, service });
  };

  const selectClass = (error?: string) =>
    `h-11 w-full cursor-pointer appearance-none rounded-lg border bg-white pr-9 pl-3 text-sm text-ink transition-colors focus:ring-2 focus:ring-brand/40 focus:outline-none ${
      error ? "border-red-400" : "border-slate-300 hover:border-ink"
    }`;

  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-6";

  if (result) {
    const s = services.find((x) => x.id === result.service)!;
    const r = roles.find((x) => x.id === result.role)!;
    const outOfScope = !!roleScope && !roleScope.allowed[r.id]?.includes(s.id);
    const items = s.gates.length && !outOfScope ? [...(roleGates[r.id] ?? []), ...s.gates, ...commonGates] : [];
    const note = outOfScope ? roleScope.note : s.note;
    return (
      <div className={`animate-fade-up ${card}`}>
        <div className="flex items-center gap-3">
          <span className={`grid h-10 w-10 shrink-0 animate-pop place-items-center rounded-xl ${items.length ? "bg-brand-light text-gold" : "bg-amber-50 text-amber-600"}`}>
            {items.length ? <ClipboardList className="h-5 w-5" /> : <Info className="h-5 w-5" />}
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-ink">
              {r.label} · {s.label}
            </h3>
            <p className="text-xs text-slate-500">A guide for {region}, not a decision. Nothing was shared or submitted.</p>
          </div>
        </div>
        {items.length > 0 && (
          <>
            <p className="mt-4 text-[13px] font-semibold text-ink">Your application may need:</p>
            <ul className="mt-2 space-y-2">
              {items.map((item, i) => (
                <li key={item} className="flex animate-fade-up gap-2.5 text-[13px] leading-relaxed text-slate-700" style={{ animationDelay: `${i * 60}ms` }}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        {note && <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[13px] leading-relaxed text-amber-900">{note}</p>}
        <button
          type="button"
          onClick={() => setResult(null)}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-ink"
        >
          <Pencil className="h-4 w-4 transition-transform group-hover:-rotate-12" /> Change answers
        </button>
      </div>
    );
  }

  const field = (id: string, label: string, value: string, onChange: (v: string) => void, options: EligibilityOption[], error?: string) => (
    <div>
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label}
      </label>
      <span className="relative mt-2 block">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={selectClass(error)}>
          <option value="">Choose</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </span>
      {error && <p className="mt-1.5 animate-fade-up text-xs text-red-600">{error}</p>}
    </div>
  );

  return (
    <form noValidate onSubmit={check} className={`space-y-4 ${card}`}>
      {field(
        "partner-role",
        labels.role,
        role,
        (v) => {
          setRole(v);
          setErrors((er) => ({ ...er, role: undefined }));
        },
        roles,
        errors.role,
      )}
      {field(
        "partner-service",
        labels.service,
        service,
        (v) => {
          setService(v);
          setErrors((er) => ({ ...er, service: undefined }));
        },
        services,
        errors.service,
      )}

      <div>
        <p className="text-[13px] font-semibold text-ink">{labels.market}</p>
        <div className="mt-2 flex h-11 items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3">
          <strong key={region} className="animate-fade-up text-sm text-ink">
            {region}
          </strong>
          <RegionPicker label="Change" buttonClassName="text-xs font-semibold text-blue-700 underline underline-offset-2 transition-colors hover:text-ink" />
        </div>
      </div>

      <button
        type="submit"
        className="btn-shine h-11 w-full rounded-full bg-brand text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_8px_20px_-6px_rgba(232,172,0,0.7)]"
      >
        {labels.submit}
      </button>
    </form>
  );
}
