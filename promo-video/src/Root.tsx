import { Composition, Folder } from "remotion";
import "./index.css";
import { MyComposition } from "./Composition";
import { Scene1Hook } from "./scenes/Scene1Hook";
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
      </Folder>
    </>
  );
};
