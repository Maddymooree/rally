import { useMemo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

const TOTAL_STEPS = 8;

function calculateAge(month: string, day: string, year: string): number | null {
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  const y = parseInt(year, 10);
  if (!m || !d || !y || y < 1930 || m > 12 || d > 31) return null;
  const dob = new Date(y, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear = today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

export default function BirthdayStep() {
  const { setField } = useOnboardingDraft();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const age = useMemo(() => calculateAge(month, day, year), [month, day, year]);
  const isUnder18 = age !== null && age < 18;

  return (
    <OnboardingScreen
      step={1}
      totalSteps={TOTAL_STEPS}
      title="when's your birthday?"
      subtitle="rally crews are 18+ only — we verify this for everyone's safety."
      continueDisabled={age === null || isUnder18}
      onContinue={() => {
        setField("birthdate", `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
        router.push("/onboarding/city");
      }}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={month}
            onChangeText={setMonth}
            placeholder="MM"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, { width: "100%" }]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={day}
            onChangeText={setDay}
            placeholder="DD"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, { width: "100%" }]}
          />
        </View>
        <View style={{ flex: 1.6 }}>
          <TextInput
            value={year}
            onChangeText={setYear}
            placeholder="YYYY"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.input, { width: "100%" }]}
          />
        </View>
      </View>

      {isUnder18 && <Text style={styles.error}>you must be 18 or older to use rally.</Text>}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: spacing.sm },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 16,
    textAlign: "center",
    fontFamily: fonts.body.regular,
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
  inputSmall: { flex: 1 },
  inputLarge: { flex: 1.6 },
  error: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.sm,
    color: colors.destructive,
    marginTop: spacing.md,
  },
});
