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
    <button
      onClick={() => navigate("/?festival=austin%20city%20limits#apply")}
      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 py-2.5 sm:py-2 rounded-2xl sm:rounded-full mb-8 transition-all hover:opacity-90 active:scale-95 cursor-pointer text-center"
      style={{
        border: "1px solid color-mix(in srgb, var(--primary) 35%, transparent)",
        background: "color-mix(in srgb, var(--primary) 8%, transparent)",
      }}
    >
      <span className="flex items-center gap-2">
        <Mascot size={16} color="var(--primary)" />
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
  );
}
