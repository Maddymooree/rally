import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mascot } from "./Mascot";

const ACL_DATE = new Date("2026-10-16T00:00:00");
// Update as applications come in.
const ACL_APPLICANT_COUNT = 0;

function countdownLabel() {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysOut = Math.ceil((ACL_DATE.getTime() - Date.now()) / msPerDay);
  if (daysOut <= 0) return "today";
  if (daysOut <= 7) return daysOut + (daysOut === 1 ? " day out" : " days out");
  const weeksOut = Math.ceil(daysOut / 7);
  return weeksOut + (weeksOut === 1 ? " week out" : " weeks out");
}

export function AclBanner() {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(countdownLabel());
  }, []);

  return (
    <div
      className="w-full"
      style={{ background: "color-mix(in srgb, var(--primary) 6%, transparent)", borderBottom: "1px solid var(--border)" }}
    >
      <button
        onClick={() => navigate("/apply?festival=iii%20points")}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-6 py-3 text-center cursor-pointer transition-colors hover:bg-white/[0.02]"
      >
        <span className="flex items-center gap-2">
          <Mascot size={15} color="var(--primary)" />
          <span className="font-body text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            iii points is next — {label || "counting down"}
            {ACL_APPLICANT_COUNT > 0 && (
              <span style={{ color: "var(--muted-foreground)" }}>
                {" "}
                · {ACL_APPLICANT_COUNT} {ACL_APPLICANT_COUNT === 1 ? "person" : "people"} already applied
              </span>
            )}
          </span>
        </span>
        <span className="font-body text-xs font-bold" style={{ color: "var(--primary)" }}>
          apply for iii points →
        </span>
      </button>
    </div>
  );
}
