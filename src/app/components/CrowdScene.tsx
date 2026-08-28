// Minimal line-drawn crowd, built from the same stick-figure language as
// Mascot.tsx. Each figure bounces in a loop; on `scattered` they animate
// off-screen as the intro hands off to the discovery view.

interface FigurePose {
  ra: string; // right arm
  la: string; // left arm
  rl: string; // right leg
  ll: string; // left leg
}

const POSES: FigurePose[] = [
  { ra: "M26 27 L40 12", la: "M26 27 L12 12", rl: "M26 47 L35 65", ll: "M26 47 L17 65" },
  { ra: "M26 26 L44 20", la: "M26 26 L8 20", rl: "M26 47 L40 62", ll: "M26 47 L12 62" },
  { ra: "M26 25 L34 8", la: "M26 25 L18 8", rl: "M26 47 L31 64", ll: "M26 47 L21 64" },
  { ra: "M26 28 L39 17", la: "M26 28 L13 38", rl: "M26 47 L35 65", ll: "M26 47 L17 65" },
];

interface Figure {
  pose: FigurePose;
  left: string;
  bottom: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  scatterX: string;
}

const FIGURES: Figure[] = [
  { pose: POSES[1], left: "6%", bottom: "4%", size: 46, opacity: 0.9, duration: 1.7, delay: 0, scatterX: "-40px" },
  { pose: POSES[2], left: "16%", bottom: "0%", size: 34, opacity: 0.5, duration: 1.9, delay: 0.3, scatterX: "-70px" },
  { pose: POSES[0], left: "27%", bottom: "6%", size: 54, opacity: 1, duration: 1.5, delay: 0.15, scatterX: "-20px" },
  { pose: POSES[3], left: "39%", bottom: "1%", size: 38, opacity: 0.65, duration: 2.1, delay: 0.5, scatterX: "-10px" },
  { pose: POSES[2], left: "50%", bottom: "5%", size: 58, opacity: 1, duration: 1.6, delay: 0.1, scatterX: "6px" },
  { pose: POSES[1], left: "61%", bottom: "0%", size: 36, opacity: 0.55, duration: 1.85, delay: 0.4, scatterX: "20px" },
  { pose: POSES[0], left: "72%", bottom: "6%", size: 50, opacity: 0.95, duration: 1.65, delay: 0.25, scatterX: "40px" },
  { pose: POSES[3], left: "83%", bottom: "2%", size: 32, opacity: 0.5, duration: 2, delay: 0.55, scatterX: "70px" },
  { pose: POSES[2], left: "92%", bottom: "5%", size: 44, opacity: 0.8, duration: 1.75, delay: 0.2, scatterX: "50px" },
];

function StickFigure({ pose, color }: { pose: FigurePose; color: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 52 75" fill="none" preserveAspectRatio="xMidYMax meet">
      <circle cx="26" cy="13" r="8" stroke={color} strokeWidth="2.5" />
      <line x1="26" y1="21" x2="26" y2="47" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={pose.ra} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={pose.la} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={pose.rl} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={pose.ll} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CrowdScene({ scattered }: { scattered: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {FIGURES.map((f, i) => (
        <div
          key={i}
          className={scattered ? "crowd-figure crowd-scattered" : "crowd-figure crowd-dancing"}
          style={
            {
              left: f.left,
              bottom: f.bottom,
              width: f.size,
              height: f.size * 1.44,
              opacity: scattered ? 0 : f.opacity,
              "--dance-duration": `${f.duration}s`,
              "--dance-delay": `${f.delay}s`,
              "--scatter-x": f.scatterX,
              "--scatter-delay": `${i * 0.03}s`,
            } as React.CSSProperties
          }
        >
          <StickFigure pose={f.pose} color={i % 3 === 0 ? "var(--primary)" : "white"} />
        </div>
      ))}
    </div>
  );
}
