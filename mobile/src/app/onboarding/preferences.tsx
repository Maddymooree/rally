import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { useAppState } from "@/state/AppState";
import { CREW_PREFERENCES } from "@/data/genresArtists";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function PreferencesStep() {
  const { draft, setField } = useOnboardingDraft();
  const { completeOnboarding } = useAppState();

  return (
    <OnboardingScreen
      step={7}
      totalSteps={TOTAL_STEPS}
      title="what kind of crew are you after?"
      subtitle="we'll prioritize this when matching you — you can always adjust later."
      continueDisabled={!draft.crewPreference}
      continueLabel="find my crew"
      onContinue={() => {
        completeOnboarding(draft);
        router.replace("/(tabs)/discover");
      }}
    >
      <View style={{ gap: spacing.sm }}>
        {CREW_PREFERENCES.map((p) => {
          const selected = draft.crewPreference === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => setField("crewPreference", p.id)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={[styles.optionLabel, selected && { color: colors.primary }]}>{p.label}</Text>
              <Text style={styles.optionDescription}>{p.description}</Text>
            </Pressable>
          );
        })}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  optionSelected: {
    borderColor: "rgba(123,143,255,0.5)",
    backgroundColor: "rgba(123,143,255,0.08)",
  },
  optionLabel: {
    fontFamily: fonts.display.medium,
    fontSize: fontSize.md,
    color: colors.foreground,
    textTransform: "lowercase",
  },
  optionDescription: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
});
