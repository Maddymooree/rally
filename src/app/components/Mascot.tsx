import { useState } from "react";

type Pose = "idle" | "wave" | "dance" | "celebrate";
const POSE_SEQ: Pose[] = ["idle", "wave", "dance", "celebrate"];
const POSES: Record<Pose, { ra: string; la: string; rl: string; ll: string; sx: number; sy: number }> = {
  idle: { ra: "M26 28 L39 17", la: "M26 28 L13 38", rl: "M26 47 L35 65", ll: "M26 47 L17 65", sx: 41, sy: 14 },
  wave: { ra: "M26 27 L40 12", la: "M26 27 L12 12", rl: "M26 47 L35 65", ll: "M26 47 L17 65", sx: 42, sy: 9 },
  dance: { ra: "M26 26 L44 20", la: "M26 26 L8 20", rl: "M26 47 L40 62", ll: "M26 47 L12 62", sx: 46, sy: 17 },
  celebrate: { ra: "M26 25 L34 8", la: "M26 25 L18 8", rl: "M26 47 L31 64", ll: "M26 47 L21 64", sx: 36, sy: 5 },
};
const POSE_MSG: Record<Pose, string | null> = { idle: null, wave: "hey!! 👋", dance: "let's go!!", celebrate: "see you there ✦" };
const POSE_ANIM: Record<Pose, string> = { idle: "", wave: "anim-bounce", dance: "anim-bounce", celebrate: "anim-spin" };

function MascotSVG({ p, size }: { p: (typeof POSES)[Pose]; size: number }) {
  const { sx, sy } = p;
  const star = `M${sx} ${sy + 3} L${sx + 1} ${sy + 0.5} L${sx + 3.5} ${sy + 0.5} L${sx + 1.5} ${sy + 2} L${sx + 2.2} ${sy + 4.5} L${sx} ${sy + 3} L${sx - 2.2} ${sy + 4.5} L${sx - 1.5} ${sy + 2} L${sx - 3.5} ${sy + 0.5} L${sx - 1} ${sy + 0.5} Z`;
  return (
    <svg width={size} height={Math.round(size * 1.44)} viewBox="0 0 52 75" fill="none">
      <circle cx="26" cy="13" r="8" stroke="white" strokeWidth="2.5" />
      <line x1="26" y1="21" x2="26" y2="47" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.ra} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.la} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.rl} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.ll} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d={star} fill="var(--primary)" />
    </svg>
  );
}

export function InteractiveMascot({ size = 64 }: { size?: number }) {
  const [pose, setPose] = useState<Pose>("idle");
  const [key, setKey] = useState(0);
  const click = () => {
    const next = POSE_SEQ[(POSE_SEQ.indexOf(pose) + 1) % POSE_SEQ.length];
    setPose(next);
    setKey((k) => k + 1);
  };
  const msg = POSE_MSG[pose];
  return (
    <div className="relative inline-flex flex-col items-center cursor-pointer select-none" onClick={click}>
      <div style={{ height: "30px", marginBottom: "4px", display: "flex", alignItems: "center" }}>
        {msg ? (
          <div
            key={msg}
            className="anim-bubble px-3 py-1 rounded-full text-xs font-bold font-body"
            style={{
              background: "color-mix(in srgb, var(--primary) 14%, transparent)",
              color: "var(--primary)",
              border: "1px solid color-mix(in srgb, var(--primary) 28%, transparent)",
              whiteSpace: "nowrap",
            }}
          >
            {msg}
          </div>
        ) : (
          <div
            className="px-3 py-1 rounded-full text-[11px] font-body"
            style={{
              color: "color-mix(in srgb, var(--foreground) 28%, transparent)",
              border: "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
            }}
          >
            tap me ↑
          </div>
        )}
      </div>
      <div key={key} className={POSE_ANIM[pose]} style={{ transformOrigin: "center bottom" }}>
        <MascotSVG p={POSES[pose]} size={size} />
      </div>
    </div>
  );
}

export function Mascot({ size = 36, className = "", color = "currentColor" }: { size?: number; className?: string; color?: string }) {
  const p = POSES.idle;
  return (
    <svg width={size} height={Math.round(size * 1.44)} viewBox="0 0 52 75" fill="none" className={className} aria-hidden>
      <circle cx="26" cy="13" r="8" stroke={color} strokeWidth="2.5" />
      <line x1="26" y1="21" x2="26" y2="47" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.ra} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.la} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.rl} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={p.ll} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
