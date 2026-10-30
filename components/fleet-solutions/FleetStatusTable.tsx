export type StatusTone = "ok" | "pending" | "none";

export type StatusRow = { tone: StatusTone; label: string; meaning: string };

const CELL = "border-b border-solid border-[#d7dee8] p-[10px] text-left text-[14px] leading-[21.7px]";

const TONES: Record<StatusTone, { dot: string; text: string }> = {
  ok: { dot: "bg-[#0f7b55]", text: "text-[#0f7b55]" },
  pending: { dot: "bg-[#c98200]", text: "text-[#7a5200]" },
  none: { dot: "border border-solid border-[#98a2b3] bg-white", text: "text-[#4a5670]" },
};

/** Two-column "Label / Meaning" table where each label carries a coloured status dot. */
export default function FleetStatusTable({ rows }: { rows: StatusRow[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[520px] table-fixed border-collapse">
        <thead>
          <tr>
            <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
              Label
            </th>
            <th scope="col" className={`${CELL} font-semibold text-[#667085]`}>
              Meaning
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ tone, label, meaning }) => (
            <tr key={label}>
              <th scope="row" className={`${CELL} font-semibold ${TONES[tone].text}`}>
                <span className="flex items-center gap-[5px]">
                  <i className={`size-2 shrink-0 rounded-[4px] ${TONES[tone].dot}`} />
                  {label}
                </span>
              </th>
              <td className={`${CELL} font-normal text-[#172033]`}>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
