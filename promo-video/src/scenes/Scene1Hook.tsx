import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ParticleField } from "../components/ParticleField";
import { displayFont } from "../fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Hook background"
      style={{
        backgroundColor: "#0a0e1a",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 90,
        paddingRight: 90,
      }}
    >
      <ParticleField />

      <Interactive.Div
        name="Hook headline"
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 116,
          lineHeight: 1.08,
          letterSpacing: -2,
          textAlign: "center",
          color: "#ffffff",
          maxWidth: width - 140,
          opacity: interpolate(frame, [0, 0.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 0.7 * fps],
            ["0px 34px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        you shouldn't have to{" "}
        <span style={{ color: "#8b93f5" }}>rally</span> alone.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
