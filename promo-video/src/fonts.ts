import { loadFont } from "@remotion/fonts";
import { CalculateMetadataFunction, staticFile } from "remotion";

export const displayFont = "Outfit";
export const bodyFont = "DM Sans";

export const fontsLoaded = Promise.all([
  loadFont({
    family: displayFont,
    url: staticFile("fonts/Outfit-800.ttf"),
    weight: "800",
  }),
  loadFont({
    family: displayFont,
    url: staticFile("fonts/Outfit-900.ttf"),
    weight: "900",
  }),
  loadFont({
    family: bodyFont,
    url: staticFile("fonts/DMSans-400.ttf"),
    weight: "400",
  }),
  loadFont({
    family: bodyFont,
    url: staticFile("fonts/DMSans-500.ttf"),
    weight: "500",
  }),
  loadFont({
    family: bodyFont,
    url: staticFile("fonts/DMSans-600.ttf"),
    weight: "600",
  }),
]);

export const waitForFonts: CalculateMetadataFunction<
  Record<string, unknown>
> = async () => {
  await fontsLoaded;
  return {};
};
