import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { displayFont, bodyFont } from "../fonts";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Intro background"
      style={{
        backgroundColor: "#070c1a",
        backgroundImage:
          "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(123,143,255,0.16) 0%, rgba(7,12,26,0) 70%)",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 90,
        paddingRight: 90,
      }}
    >
      <Interactive.Div
        name="Not a dating app pill"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 30px",
          borderRadius: 999,
          border: "1.5px solid rgba(123,143,255,0.4)",
          backgroundColor: "rgba(123,143,255,0.08)",
          marginBottom: 46,
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 0.5 * fps],
            ["0px 16px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: "#7b8fff",
          }}
        />
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 28,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#7b8fff",
          }}
        >
          not a dating app
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Headline"
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 118,
          lineHeight: 1.06,
          letterSpacing: -2,
          textAlign: "center",
          color: "white",
          maxWidth: width - 140,
          opacity: interpolate(frame, [0.3 * fps, 1 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0.3 * fps, 1 * fps],
            ["0px 26px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        you shouldn't have to{" "}
        <span style={{ color: "#7b8fff" }}>rally</span> alone.
      </Interactive.Div>

      <Interactive.Div
        name="Subtext"
        style={{
          fontFamily: bodyFont,
          fontWeight: 500,
          fontSize: 42,
          lineHeight: 1.5,
          textAlign: "center",
          color: "rgba(238,240,255,0.55)",
          maxWidth: width - 340,
          marginTop: 44,
          opacity: interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        no swiping. no profiles. just your people, headed to the same
        show.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
