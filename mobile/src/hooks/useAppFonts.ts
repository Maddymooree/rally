import { useFonts } from "expo-font";
import { Outfit_500Medium, Outfit_700Bold, Outfit_900Black } from "@expo-google-fonts/outfit";
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from "@expo-google-fonts/dm-sans";

export function useAppFonts() {
  return useFonts({
    Outfit_900Black,
    Outfit_700Bold,
    Outfit_500Medium,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
}
