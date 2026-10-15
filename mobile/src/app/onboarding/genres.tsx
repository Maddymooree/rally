import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Chip } from "@/components/Chip";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { GENRES } from "@/data/genresArtists";
import { spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function GenresStep() {
  const { draft, setField } = useOnboardingDraft();

  const toggle = (genre: string) => {
    const has = draft.genres.includes(genre);
    setField("genres", has ? draft.genres.filter((g) => g !== genre) : [...draft.genres, genre]);
  };

  return (
    <OnboardingScreen
      step={5}
      totalSteps={TOTAL_STEPS}
      title="what do you listen to?"
      subtitle="house, techno, bass — pick everything that fits."
      continueDisabled={draft.genres.length === 0}
      onContinue={() => router.push("/onboarding/instagram")}
    >
      <View style={styles.wrap}>
        {GENRES.map((g) => (
          <Chip key={g} label={g} selected={draft.genres.includes(g)} onPress={() => toggle(g)} />
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});
