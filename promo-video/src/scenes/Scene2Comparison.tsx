import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ParticleField } from "../components/ParticleField";
import { displayFont, bodyFont } from "../fonts";

export const Scene2Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Comparison background"
      style={{
        backgroundColor: "#0a0e1a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ParticleField />

      {/* Phase A: rally is */}
      <Interactive.Div
        name="Rally is group"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: 90,
          paddingRight: 90,
          opacity: interpolate(frame, [82, 94], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [82, 94], ["0px 0px", "0px -30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Interactive.Div
          name="Rally is heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 54,
            opacity: interpolate(frame, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 999,
              border: "2px solid rgba(139,147,245,0.45)",
              backgroundColor: "rgba(139,147,245,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              color: "#8b93f5",
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 900,
              fontSize: 60,
              color: "#ffffff",
            }}
          >
            rally is
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Rally is item 1"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [15, 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [15, 25], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          grouped by vibe, experience, and logistics
        </Interactive.Div>

        <Interactive.Div
          name="Rally is item 2"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [27, 37], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [27, 37], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          group-first — you meet everyone at once
        </Interactive.Div>

        <Interactive.Div
          name="Rally is item 3"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [39, 49], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [39, 49], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          vetted applicants, real intros, actual plans
        </Interactive.Div>

        <Interactive.Div
          name="Rally is item 4"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: width - 180,
            opacity: interpolate(frame, [51, 61], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [51, 61], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          people headed to the same place
        </Interactive.Div>
      </Interactive.Div>

      {/* Phase B: rally is not */}
      <Interactive.Div
        name="Rally is not group"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: 90,
          paddingRight: 90,
          opacity: interpolate(frame, [95, 107], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Interactive.Div
          name="Rally is not heading"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 54,
            opacity: interpolate(frame, [95, 107], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            ✕
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 900,
              fontSize: 60,
              color: "#ffffff",
            }}
          >
            rally is not
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Rally is not item 1"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.32)",
            textAlign: "center",
            textDecoration: "line-through",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [110, 122], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [110, 122],
              ["0px 16px", "0px 0px"],
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

        <Interactive.Div
          name="Rally is not item 2"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.32)",
            textAlign: "center",
            textDecoration: "line-through",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [124, 136], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [124, 136],
              ["0px 16px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          a group chat you never show up to
        </Interactive.Div>

        <Interactive.Div
          name="Rally is not item 3"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.32)",
            textAlign: "center",
            textDecoration: "line-through",
            marginBottom: 26,
            maxWidth: width - 180,
            opacity: interpolate(frame, [138, 150], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [138, 150],
              ["0px 16px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          awkward one-on-one matching
        </Interactive.Div>

        <Interactive.Div
          name="Rally is not item 4"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 40,
            color: "rgba(255,255,255,0.32)",
            textAlign: "center",
            textDecoration: "line-through",
            maxWidth: width - 180,
            opacity: interpolate(frame, [152, 164], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [152, 164],
              ["0px 16px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          waiting for your friends to commit
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
