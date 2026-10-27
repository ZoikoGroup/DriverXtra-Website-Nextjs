import Reveal from "@/components/ui/Reveal";
import SectionTitle, { container } from "@/components/ui/SectionTitle";

type MappingRow = {
  inquiryField: string;
  sampleRedacted: string;
  crmField: string;
};

const SECURE_MAPPING_ROWS: MappingRow[] = [
  {
    inquiryField: "Name",
    sampleRedacted: "J*** S****",
    crmField: "Contact name",
  },
  {
    inquiryField: "Email",
    sampleRedacted: "j***@example.com",
    crmField: "Email",
  },
  {
    inquiryField: "Vehicle",
    sampleRedacted: "2021 Example Hatchback",
    crmField: "Vehicle of interest",
  },
  {
    inquiryField: "Contact permission",
    sampleRedacted: "Inquiry only (locked)",
    crmField: "Consent — read-only",
  },
];

type SecureMappingSectionProps = {
  id?: string;
  className?: string;
};

export default function SecureMappingSection({
  id,
  className = "bg-white",
}: SecureMappingSectionProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <div className="max-w-3xl">
          <SectionTitle
            eyebrow="Secure mapping"
            title="Illustrative workflow. Not live customer or provider data."
          />
        </div>

        <Reveal delay={100} className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-xs font-semibold text-slate-500">
                <th scope="col" className="pb-3.5 pr-6 font-semibold w-1/3">
                  Inquiry field
                </th>
                <th scope="col" className="pb-3.5 px-6 font-semibold w-1/3">
                  Sample (redacted)
                </th>
                <th scope="col" className="pb-3.5 pl-6 font-semibold w-1/3">
                  CRM field
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {SECURE_MAPPING_ROWS.map((row) => (
                <tr
                  key={row.inquiryField}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pr-6 font-semibold text-ink">
                    {row.inquiryField}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-600">
                    {row.sampleRedacted}
                  </td>
                  <td className="py-4 pl-6 text-slate-600 font-normal">
                    {row.crmField}
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
