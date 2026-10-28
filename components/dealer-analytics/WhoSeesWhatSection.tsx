import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type RoleAccessRow = {
  role: string;
  access: string;
};

const ROLE_ACCESS_DATA: RoleAccessRow[] = [
  {
    role: "Owner",
    access: "All permitted rooftops and exports",
  },
  {
    role: "Manager",
    access: "Assigned rooftops",
  },
  {
    role: "Read-only",
    access: "View only — no exports",
  },
];

type WhoSeesWhatSectionProps = {
  id?: string;
  className?: string;
};

export default function WhoSeesWhatSection({
  id,
  className = "bg-white",
}: WhoSeesWhatSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle eyebrow="Role visibility" title="Who sees what" />

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-8 font-semibold w-1/3">
                  Role
                </th>
                <th scope="col" className="pb-3.5 pl-4 font-semibold w-2/3">
                  Access
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROLE_ACCESS_DATA.map((row) => (
                <tr
                  key={row.role}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-8 font-semibold text-slate-700 text-xs">
                    {row.role}
                  </td>
                  <td className="py-4 pl-4 text-slate-600 font-normal">
                    {row.access}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
