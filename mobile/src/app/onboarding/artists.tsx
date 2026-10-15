import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Chip } from "@/components/Chip";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { SAMPLE_ARTISTS } from "@/data/genresArtists";
import { spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function ArtistsStep() {
  const { draft, setField } = useOnboardingDraft();

  const toggle = (artist: string) => {
    const has = draft.favoriteArtists.includes(artist);
    setField("favoriteArtists", has ? draft.favoriteArtists.filter((a) => a !== artist) : [...draft.favoriteArtists, artist]);
  };

  return (
    <OnboardingScreen
      step={4}
      totalSteps={TOTAL_STEPS}
      title="who are you excited to see?"
      subtitle="pick a few favorite artists — this helps us match your taste, not just your dates."
      continueDisabled={draft.favoriteArtists.length === 0}
      onContinue={() => router.push("/onboarding/genres")}
    >
      <View style={styles.wrap}>
        {SAMPLE_ARTISTS.map((a) => (
          <Chip key={a} label={a} selected={draft.favoriteArtists.includes(a)} onPress={() => toggle(a)} />
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});
