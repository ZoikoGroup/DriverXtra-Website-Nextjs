import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import PolicySection from "@/components/legal/PolicySection";
import { policyVersions } from "./data";

export default function PolicyChangesSection() {
  return (
    <PolicySection id="changes" title="Changes to this policy">
      <Reveal className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <caption className="sr-only">Cookie Policy versions</caption>
          <thead>
            <tr className="border-b-2 border-ink">
              {["Version", "Effective", "Summary"].map((c) => (
                <th key={c} scope="col" className="px-2 py-2.5 font-semibold text-ink">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {policyVersions.map((v) => (
              <tr key={v.version} className="border-b border-slate-200 align-top">
                <th scope="row" className="px-2 py-3 font-semibold text-ink">
                  {v.version}
                </th>
                <td className="px-2 py-3 text-slate-600">{v.effective}</td>
                <td className="px-2 py-3 text-slate-600">{v.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-4 text-[13px] text-slate-600">
        A new policy version doesn&apos;t change choices you&apos;ve already saved.{" "}
        <Link href="#changes" className="font-semibold text-ink underline underline-offset-2 hover:text-blue-700">
          View previous versions
        </Link>
      </p>
    </PolicySection>
  );
}
