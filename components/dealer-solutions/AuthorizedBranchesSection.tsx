import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type BranchMemberRole = {
  role: string;
  permissions: string;
};

const ROLES_DATA: BranchMemberRole[] = [
  {
    role: "Owner / admin",
    permissions: "Organization settings, members, publishing",
  },
  {
    role: "Manager",
    permissions: "Assigned rooftops, listings, leads",
  },
  {
    role: "Read-only",
    permissions: "View permitted reports and records",
  },
];

type AuthorizedBranchesSectionProps = {
  id?: string;
  className?: string;
};

export default function AuthorizedBranchesSection({
  id,
  className = "bg-[#F6F8FB]",
}: AuthorizedBranchesSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="Locations and team controls"
          title="Authorized branches and members"
        />

        <Reveal delay={100} className="mt-10">
          <div className="overflow-x-auto bg-[#F6F8FB]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Typical permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {ROLES_DATA.map(({ role, permissions }) => (
                  <tr
                    key={role}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-6 font-semibold text-ink">{role}</td>
                    <td className="py-4 px-6 text-slate-600">{permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
