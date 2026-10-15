import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { hrefFor } from "@/lib/navigation";
import SectionTitle, { container } from "@/components/ui/SectionTitle";
import { methodColumns, methods } from "./data";

type MethodsTableProps = {
  /** The method this page is about — its row is highlighted. */
  highlight?: string;
  className?: string;
};

export default function MethodsTable({ highlight, className = "bg-white" }: MethodsTableProps) {
  return (
    <section id="compare-methods" className={`scroll-mt-28 py-20 md:py-24 ${className}`}>
      <div className={container}>
        <SectionTitle
          eyebrow="How methods compare"
          title="Seller control, parties and costs"
          description="Neutral comparison. Methods not offered in your market say so."
        />

        <Reveal delay={150}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {methodColumns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3.5 text-xs font-semibold text-slate-500">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {methods.map(([method, ...cells]) => {
                  const current = method === highlight;
                  const href = hrefFor(method);
                  return (
                    <tr
                      key={method}
                      className={`group border-t border-slate-200 transition-colors duration-300 ${
                        current ? "bg-brand-light/50 hover:bg-brand-light" : "hover:bg-slate-50"
                      }`}
                    >
                      <th scope="row" className="relative px-4 py-4 font-bold text-ink">
                        <span
                          className={`absolute inset-y-0 left-0 w-1 bg-brand transition-transform duration-300 ${
                            current ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                          }`}
                        />
                        {!current && href !== "#" ? (
                          <Link href={href} className="link-underline transition-colors hover:text-gold">
                            {method}
                          </Link>
                        ) : (
                          method
                        )}
                        {current && (
                          <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-ink">This page</span>
                        )}
                      </th>
                      {cells.map((cell, j) => (
                        <td key={j} className="px-4 py-4 align-top text-slate-600">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
