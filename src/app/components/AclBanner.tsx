import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mascot } from "./Mascot";

const ACL_DATE = new Date("2026-10-02T00:00:00");
// Update as applications come in.
const ACL_APPLICANT_COUNT = 0;

function weeksOutLabel() {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksOut = Math.max(1, Math.ceil((ACL_DATE.getTime() - Date.now()) / msPerWeek));
  return weeksOut + (weeksOut === 1 ? " week out" : " weeks out");
}

export function AclBanner() {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(weeksOutLabel());
  }, []);

  return (
    <div
      className="w-full"
      style={{ background: "color-mix(in srgb, var(--primary) 6%, transparent)", borderBottom: "1px solid var(--border)" }}
    >
      <button
        onClick={() => navigate("/?festival=austin%20city%20limits#apply")}
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-6 py-3 text-center cursor-pointer transition-colors hover:bg-white/[0.02]"
      >
        <span className="flex items-center gap-2">
          <Mascot size={15} color="var(--primary)" />
          <span className="font-body text-xs font-semibold" style={{ color: "var(--foreground)" }}>
            austin city limits is next — {label || "counting down"}
            {ACL_APPLICANT_COUNT > 0 && (
              <span style={{ color: "var(--muted-foreground)" }}>
                {" "}
                · {ACL_APPLICANT_COUNT} {ACL_APPLICANT_COUNT === 1 ? "person" : "people"} already applied
              </span>
            )}
          </span>
        </span>
        <span className="font-body text-xs font-bold" style={{ color: "var(--primary)" }}>
          apply for ACL →
        </span>
      </button>
    </div>
  );
}
