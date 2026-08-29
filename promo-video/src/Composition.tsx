import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Comparison } from "./scenes/Scene2Comparison";
import { waitForFonts } from "./fonts";

// Scenes 3-6 (core pitch, how it works, trust, CTA) get appended here as
// they're built.
export const MyComposition = () => {
  return (
    <Composition
      id="RallyExplainer"
      component={RallyExplainer}
      durationInFrames={105 + 180 - 15}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={waitForFonts}
    />
  );
};

const RallyExplainer: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={105} name="Scene 1 - Hook">
        <Scene1Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence
        durationInFrames={180}
        name="Scene 2 - Comparison"
      >
        <Scene2Comparison />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
