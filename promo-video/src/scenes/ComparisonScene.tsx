import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { displayFont, bodyFont } from "../fonts";

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Comparison background"
      style={{
        backgroundColor: "#070c1a",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 100,
        paddingRight: 100,
        flexDirection: "column",
      }}
    >
      <Interactive.Div
        name="Rally is heading"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 34,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "2px solid rgba(123,143,255,0.4)",
            backgroundColor: "rgba(123,143,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: bodyFont,
            fontSize: 32,
            color: "#7b8fff",
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 64,
            color: "white",
          }}
        >
          rally is
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Rally is item"
        style={{
          fontFamily: bodyFont,
          fontWeight: 500,
          fontSize: 44,
          color: "rgba(238,240,255,0.75)",
          textAlign: "center",
          marginBottom: 68,
          opacity: interpolate(
            frame,
            [0.5 * fps, 0.9 * fps],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [0.5 * fps, 0.9 * fps],
            ["0px 14px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        vetted people, headed to the same show as you.
      </Interactive.Div>

      <Interactive.Div
        name="Rally is not heading"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 34,
          opacity: interpolate(
            frame,
            [1.1 * fps, 1.5 * fps],
            [0, 1],
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
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "2px solid rgba(212,24,61,0.35)",
            backgroundColor: "rgba(212,24,61,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: bodyFont,
            fontSize: 30,
            color: "rgba(212,24,61,0.75)",
          }}
        >
          ✕
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 64,
            color: "white",
          }}
        >
          rally is not
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Rally is not item"
        style={{
          fontFamily: bodyFont,
          fontWeight: 500,
          fontSize: 44,
          color: "rgba(238,240,255,0.22)",
          textAlign: "center",
          textDecoration: "line-through",
          opacity: interpolate(
            frame,
            [1.6 * fps, 2 * fps],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [1.6 * fps, 2 * fps],
            ["0px 14px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        a dating app
      </Interactive.Div>
    </AbsoluteFill>
  );
};
