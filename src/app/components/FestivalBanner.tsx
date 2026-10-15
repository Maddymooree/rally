import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mascot } from "./Mascot";
import { FESTIVALS, type Festival } from "../lib/festivals";

// Update as applications come in. Not tracked per-festival since it's
// manually set and resets to 0 whenever the banner rolls to the next one.
const APPLICANT_COUNT = 0;

// The soonest "applications open" festival that hasn't ended yet, so the
// banner automatically rolls from one festival to the next without needing
// a manual swap each time one passes.
function getNextOpenFestival(): Festival | undefined {
  const todayStr = new Date().toISOString().slice(0, 10);
  return FESTIVALS.filter(
    (f) => f.status === "open" && f.startDate && (!f.endDate || f.endDate >= todayStr)
  ).sort((a, b) => a.startDate!.localeCompare(b.startDate!))[0];
}

function countdownLabel(startDate: string) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysOut = Math.ceil((new Date(`${startDate}T00:00:00`).getTime() - Date.now()) / msPerDay);
  if (daysOut <= 0) return "today";
  if (daysOut <= 7) return daysOut + (daysOut === 1 ? " day out" : " days out");
  const weeksOut = Math.ceil(daysOut / 7);
  return weeksOut + (weeksOut === 1 ? " week out" : " weeks out");
}

export function FestivalBanner() {
  const navigate = useNavigate();
  const [festival, setFestival] = useState<Festival | undefined>(undefined);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const next = getNextOpenFestival();
    setFestival(next);
    if (next?.startDate) setLabel(countdownLabel(next.startDate));
  }, []);

  if (!festival) return null;

  return (
    <div
      className="w-full"
      style={{ background: "color-mix(in srgb, var(--primary) 6%, transparent)", borderBottom: "1px solid var(--border)" }}
    >
      <button
        onClick={() => navigate(`/apply?festival=${encodeURIComponent(festival.slug)}`)}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-6 py-3 text-center cursor-pointer transition-colors hover:bg-white/[0.02]"
      >
        <span className="flex items-center gap-2">
          <Mascot size={15} color="var(--primary)" />
          <span className="font-body text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            {festival.name} is next — {label || "counting down"}
            {APPLICANT_COUNT > 0 && (
              <span style={{ color: "var(--muted-foreground)" }}>
                {" "}
                · {APPLICANT_COUNT} {APPLICANT_COUNT === 1 ? "person" : "people"} already applied
              </span>
            )}
          </span>
        </span>
        <span className="font-body text-xs font-bold" style={{ color: "var(--primary)" }}>
          apply for {festival.name} →
        </span>
      </button>
    </div>
  );
}
