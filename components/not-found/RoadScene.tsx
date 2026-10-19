/** One 400px skyline tile; it repeats and scrolls seamlessly behind the road. */
const SKYLINE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="64" fill="#1a2440">
      <rect x="0" y="34" width="38" height="30"/><rect x="44" y="18" width="30" height="46"/>
      <rect x="80" y="40" width="46" height="24"/><rect x="132" y="8" width="24" height="56"/>
      <rect x="162" y="28" width="40" height="36"/><rect x="208" y="44" width="34" height="20"/>
      <rect x="248" y="14" width="36" height="50"/><rect x="290" y="36" width="28" height="28"/>
      <rect x="324" y="22" width="42" height="42"/><rect x="372" y="40" width="28" height="24"/>
    </svg>`,
  );

/** A car driving along an endless road — the road moves, the wheels spin, the car bobs. */
export default function RoadScene() {
  return (
    <div className="relative h-40 overflow-hidden sm:h-48" aria-hidden="true">
      {/* Distant skyline drifting slowly */}
      <div
        className="nf-scenery absolute inset-x-0 bottom-16 h-16 opacity-60"
        style={{ backgroundImage: `url("${SKYLINE}")`, backgroundSize: "400px 64px", backgroundRepeat: "repeat-x" }}
      />

      {/* Road */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[#151d2e]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="nf-road-line absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 opacity-80" />
      </div>

      {/* Car */}
      <div className="absolute bottom-9 left-1/2 w-[220px] -translate-x-1/2 sm:w-[260px]">
        {/* Exhaust puffs */}
        <span className="nf-puff absolute bottom-3 -left-1 h-4 w-4 rounded-full bg-white/40" />
        <span className="nf-puff absolute bottom-3 -left-1 h-4 w-4 rounded-full bg-white/30 [animation-delay:0.4s]" />
        <span className="nf-puff absolute bottom-3 -left-1 h-4 w-4 rounded-full bg-white/20 [animation-delay:0.8s]" />

        <svg viewBox="0 0 260 96" className="nf-car relative w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.5)]">
          {/* Body drawn facing left — mirrored so the car faces forward; lights and wheels stay put */}
          <g transform="translate(260 0) scale(-1 1)">
            {/* Body */}
            <path
              d="M18 62c0-9 6-15 15-17l34-7 30-22c7-5 15-7 24-7h48c11 0 20 4 27 11l22 21 25 5c9 2 15 9 15 18v8c0 4-3 7-7 7H25c-4 0-7-3-7-7v-10z"
              fill="#ffc20e"
            />
            {/* Windows */}
            <path d="M104 22c5-4 11-6 18-6h22v25H80l24-19z" fill="#0b1220" opacity="0.85" />
            <path d="M153 16h18c8 0 15 3 20 8l17 17h-55V16z" fill="#0b1220" opacity="0.85" />
            {/* Door line + handle */}
            <path d="M149 41v32" stroke="#0b1220" strokeOpacity="0.25" strokeWidth="2" />
            <rect x="160" y="48" width="12" height="3" rx="1.5" fill="#0b1220" opacity="0.4" />
          </g>
          {/* Lights */}
          <rect x="240" y="56" width="12" height="6" rx="3" fill="#fff" />
          <rect x="18" y="58" width="8" height="6" rx="3" fill="#ef4444" />
          {/* Wheels */}
          {[66, 198].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="78" r="17" fill="#0b1220" />
              <g className="nf-spin">
                <circle cx={cx} cy="78" r="9" fill="#cbd5e1" />
                <path
                  d={`M${cx} 69v18M${cx - 9} 78h18M${cx - 6.4} 71.6l12.8 12.8M${cx + 6.4} 71.6l-12.8 12.8`}
                  stroke="#64748b"
                  strokeWidth="2"
                />
                <circle cx={cx} cy="78" r="2.5" fill="#0b1220" />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
