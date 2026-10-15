import { Stack } from "expo-router";
import { OnboardingDraftProvider } from "@/state/OnboardingDraft";
import { colors } from "@/theme";

export default function OnboardingLayout() {
  return (
    <OnboardingDraftProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background }, animation: "slide_from_right" }} />
    </OnboardingDraftProvider>
  );
}
