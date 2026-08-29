import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Deterministic pseudo-random in [0, 1) so every particle's look is stable
// across frames/renders without needing Math.random() at render time.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const PARTICLE_COUNT = 36;

export const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Particle field" style={{ pointerEvents: "none" }}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const seedX = seededRandom(i * 7.13);
        const seedY = seededRandom(i * 3.71 + 1);
        const seedSize = seededRandom(i * 5.37 + 2);
        const seedSpeed = seededRandom(i * 9.91 + 3);
        const seedOpacity = seededRandom(i * 2.63 + 4);
        const seedColor = seededRandom(i * 4.19 + 5);

        const size = 3 + seedSize * 7;
        const speedPxPerSecond = 14 + seedSpeed * 20;
        const wrapHeight = height + 100;
        const startY = seedY * wrapHeight;
        const travel = (frame / fps) * speedPxPerSecond;
        const y = (((startY - travel) % wrapHeight) + wrapHeight) % wrapHeight - 50;
        const x = seedX * width;
        const opacity = 0.08 + seedOpacity * 0.22;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: 999,
              backgroundColor: seedColor > 0.5 ? "#8b93f5" : "#ffffff",
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
