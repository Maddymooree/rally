import { Composition, Folder } from "remotion";
import "./index.css";
import { MyComposition } from "./Composition";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Comparison } from "./scenes/Scene2Comparison";
import { waitForFonts } from "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Folder name="RallyExplainer-Scenes">
        <Composition
          id="Scene1-Hook"
          component={Scene1Hook}
          durationInFrames={105}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
        <Composition
          id="Scene2-Comparison"
          component={Scene2Comparison}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          calculateMetadata={waitForFonts}
        />
      </Folder>
    </>
  );
};
