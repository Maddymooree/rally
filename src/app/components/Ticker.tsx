const TICKER_ITEMS = [
  "coachella", "·", "acl", "·", "iii points", "·", "rolling loud", "·",
  "edc las vegas", "·", "lollapalooza", "·",
  "tomorrowland", "·", "ultra", "·", "burning man", "·",
];

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="ticker-track gap-6 whitespace-nowrap w-max py-3">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase inline-block"
            style={{ color: item === "·" ? "var(--primary)" : "color-mix(in srgb,var(--foreground) 28%,transparent)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
