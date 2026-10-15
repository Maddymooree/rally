import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function InstagramStep() {
  const { draft, setField } = useOnboardingDraft();
  const [value, setValue] = useState(draft.instagram);

  return (
    <OnboardingScreen
      step={6}
      totalSteps={TOTAL_STEPS}
      title="what's your instagram?"
      subtitle="optional, but it's how your crew actually connects once you're matched."
      skip={() => router.push("/onboarding/preferences")}
      onContinue={() => {
        setField("instagram", value.trim());
        router.push("/onboarding/preferences");
      }}
    >
      <View style={styles.inputRow}>
        <Text style={styles.at}>@</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="yourhandle"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            autoFocus
            style={[styles.input, { width: "100%" }]}
          />
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  at: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.lg,
    color: colors.mutedForeground,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 4,
    fontFamily: fonts.body.regular,
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
});
