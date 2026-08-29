import { Composition, Folder } from "remotion";
import "./index.css";
import { MyComposition } from "./Composition";
import { IntroScene } from "./scenes/IntroScene";
import { ComparisonScene } from "./scenes/ComparisonScene";
import { FestivalsScene } from "./scenes/FestivalsScene";
import { CtaScene } from "./scenes/CtaScene";
import { waitForFonts } from "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Folder name="RallyPromo-Scenes">
        <Composition
          id="Intro"
          component={IntroScene}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
        <Composition
          id="Comparison"
          component={ComparisonScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
        <Composition
          id="Festivals"
          component={FestivalsScene}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
        <Composition
          id="CTA"
          component={CtaScene}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
      </Folder>
    </>
  );
};
