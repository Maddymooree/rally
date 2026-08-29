import { Composition } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { waitForFonts } from "./fonts";

// Scenes 2-6 (clarifier, core pitch, how it works, trust, CTA) get appended
// here as they're built. For now this holds Scene 1 alone.
export const MyComposition = () => {
  return (
    <Composition
      id="RallyExplainer"
      component={Scene1Hook}
      durationInFrames={105}
      fps={30}
      width={1080}
      height={1920}
      calculateMetadata={waitForFonts}
    />
  );
};
