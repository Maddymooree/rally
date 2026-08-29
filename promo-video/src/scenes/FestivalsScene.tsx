import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { displayFont, bodyFont } from "../fonts";

const ROW_1 = ["coachella", "·", "acl", "·", "edc las vegas", "·", "lollapalooza", "·"];
const ROW_1_TRIPLED = [...ROW_1, ...ROW_1, ...ROW_1];

const ROW_2 = ["tomorrowland", "·", "ultra", "·", "rolling loud", "·", "burning man", "·"];
const ROW_2_TRIPLED = [...ROW_2, ...ROW_2, ...ROW_2];

export const FestivalsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Festivals background"
      style={{
        backgroundColor: "#070c1a",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Interactive.Div
        name="Happening soon label"
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 30,
          textTransform: "uppercase",
          letterSpacing: 5,
          color: "#7b8fff",
          marginBottom: 26,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        happening soon
      </Interactive.Div>

      <Interactive.Div
        name="Find your crew heading"
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 96,
          color: "white",
          marginBottom: 90,
          opacity: interpolate(
            frame,
            [0.2 * fps, 0.7 * fps],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        find your crew.
      </Interactive.Div>

      <div style={{ position: "relative", width, height: 210, overflow: "hidden" }}>
        <Interactive.Div
          name="Festival row 1"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            gap: 40,
            whiteSpace: "nowrap",
            translate: interpolate(frame, [0, 300], ["0px 0px", "-900px 0px"], {
              extrapolateLeft: "extend",
              extrapolateRight: "extend",
              easing: Easing.linear,
            }),
          }}
        >
          {ROW_1_TRIPLED.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: bodyFont,
                fontWeight: 700,
                fontSize: 40,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: item === "·" ? "#7b8fff" : "rgba(238,240,255,0.3)",
              }}
            >
              {item}
            </span>
          ))}
        </Interactive.Div>

        <Interactive.Div
          name="Festival row 2"
          style={{
            position: "absolute",
            top: 110,
            left: 0,
            display: "flex",
            gap: 40,
            whiteSpace: "nowrap",
            translate: interpolate(frame, [0, 300], ["-900px 0px", "0px 0px"], {
              extrapolateLeft: "extend",
              extrapolateRight: "extend",
              easing: Easing.linear,
            }),
          }}
        >
          {ROW_2_TRIPLED.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: bodyFont,
                fontWeight: 700,
                fontSize: 40,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: item === "·" ? "#7b8fff" : "rgba(238,240,255,0.3)",
              }}
            >
              {item}
            </span>
          ))}
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
