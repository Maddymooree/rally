import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { ProgressDots } from "./ProgressDots";
import { PillButton } from "./PillButton";

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  skip?: () => void;
}

export function OnboardingScreen({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onContinue,
  continueLabel = "continue",
  continueDisabled,
  skip,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : undefined)}
            hitSlop={12}
            style={[styles.backButton, step === 0 && { opacity: 0 }]}
          >
            <ChevronLeft size={20} color={colors.foreground} />
          </Pressable>
          <ProgressDots total={totalSteps} current={step} />
          {skip ? (
            <Pressable onPress={skip} hitSlop={12}>
              <Text style={styles.skip}>skip</Text>
            </Pressable>
          ) : (
            <View style={{ width: 34 }} />
          )}
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <View style={{ marginTop: spacing.xl }}>{children}</View>
        </ScrollView>

        <View style={styles.footer}>
          <PillButton label={continueLabel} onPress={onContinue} disabled={continueDisabled} fullWidth />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },
  skip: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  body: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xxl,
    color: colors.foreground,
    lineHeight: fontSize.xxl * 1.15,
  },
  subtitle: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.md,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: fontSize.md * 1.5,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
});
