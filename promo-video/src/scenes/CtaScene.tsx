import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mascot } from "../Mascot";
import { displayFont, bodyFont } from "../fonts";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="CTA background"
      style={{
        backgroundColor: "#070c1a",
        backgroundImage:
          "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(123,143,255,0.2) 0%, rgba(7,12,26,0) 70%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Interactive.Div
        name="Mascot"
        style={{
          marginBottom: 40,
          scale: interpolate(frame, [0, 0.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 10 }),
            output: "perceptual-scale",
          }),
        }}
      >
        <Mascot size={150} color="white" />
      </Interactive.Div>

      <Interactive.Div
        name="Wordmark"
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 108,
          color: "white",
          letterSpacing: -2,
          marginBottom: 20,
          opacity: interpolate(frame, [0.3 * fps, 0.9 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        rally
      </Interactive.Div>

      <Interactive.Div
        name="Tagline"
        style={{
          fontFamily: bodyFont,
          fontWeight: 500,
          fontSize: 40,
          color: "rgba(238,240,255,0.55)",
          marginBottom: 76,
          opacity: interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        just go. we'll find your people.
      </Interactive.Div>

      <Interactive.Div
        name="CTA button"
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 42,
          color: "#070c1a",
          backgroundColor: "#7b8fff",
          padding: "28px 68px",
          borderRadius: 999,
          opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [1 * fps, 1.5 * fps], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
          }),
        }}
      >
        find my crew →
      </Interactive.Div>
    </AbsoluteFill>
  );
};
