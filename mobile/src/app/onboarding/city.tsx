import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Chip } from "@/components/Chip";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { CITIES } from "@/data/genresArtists";
import { spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function CityStep() {
  const { draft, setField } = useOnboardingDraft();

  return (
    <OnboardingScreen
      step={2}
      totalSteps={TOTAL_STEPS}
      title="what's your home city?"
      subtitle="we'll show you what's happening near you first."
      continueDisabled={!draft.city}
      onContinue={() => router.push("/onboarding/photo")}
    >
      <View style={styles.wrap}>
        {CITIES.map((c) => (
          <Chip key={c} label={c} selected={draft.city === c} onPress={() => setField("city", c)} />
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});
