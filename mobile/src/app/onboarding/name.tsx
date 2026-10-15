import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function NameStep() {
  const { draft, setField } = useOnboardingDraft();
  const [value, setValue] = useState(draft.displayName);

  return (
    <OnboardingScreen
      step={0}
      totalSteps={TOTAL_STEPS}
      title="what should we call you?"
      subtitle="this is what your future crew will see."
      continueDisabled={value.trim().length < 2}
      onContinue={() => {
        setField("displayName", value.trim());
        router.push("/onboarding/birthday");
      }}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="display name"
        placeholderTextColor={colors.mutedForeground}
        style={styles.input}
        autoFocus
        maxLength={30}
      />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 16,
    fontFamily: fonts.body.regular,
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
});
