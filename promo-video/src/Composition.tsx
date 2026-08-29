import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { IntroScene } from "./scenes/IntroScene";
import { ComparisonScene } from "./scenes/ComparisonScene";
import { FestivalsScene } from "./scenes/FestivalsScene";
import { CtaScene } from "./scenes/CtaScene";
import { waitForFonts } from "./fonts";

type Props = {};

export const MyComposition = () => {
  return (
    <Composition
      id="RallyPromo"
      component={MyComponent}
      durationInFrames={75 + 90 + 75 + 90 - 15 * 3}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={waitForFonts}
    />
  );
};

export const MyComponent: React.FC<Props> = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75} name="Intro">
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={90} name="Comparison">
        <ComparisonScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={75} name="Festivals">
        <FestivalsScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={90} name="CTA">
        <CtaScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
