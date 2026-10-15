import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { PillButton } from "@/components/PillButton";

export default function Welcome() {
  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/seed/rally-hero/1200/2400" }}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={styles.scrim} />
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.wordmarkRow}>
          <Text style={styles.wordmark}>rally</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>
            you shouldn't have to <Text style={{ color: colors.primary }}>rally</Text> alone.
          </Text>
          <Text style={styles.subtext}>connecting you with people headed to the same shows as you.</Text>

          <PillButton label="let's rally" onPress={() => router.push("/onboarding/name")} fullWidth style={{ marginTop: spacing.xxl }} />

          <Text style={styles.disclaimer}>by continuing you agree you're 18+ — rally reviews every application before you're placed in a crew.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(7,12,26,0.78)",
  },
  safe: { flex: 1, justifyContent: "space-between" },
  wordmarkRow: { paddingTop: spacing.lg, paddingHorizontal: spacing.xl },
  wordmark: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xl,
    color: colors.foreground,
    textTransform: "lowercase",
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headline: {
    fontFamily: fonts.display.black,
    fontSize: 44,
    lineHeight: 46,
    color: colors.foreground,
  },
  subtext: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.md,
    color: "rgba(238,240,255,0.7)",
    marginTop: spacing.md,
    lineHeight: fontSize.md * 1.5,
  },
  disclaimer: {
    fontFamily: fonts.body.regular,
    fontSize: 11,
    color: "rgba(238,240,255,0.45)",
    marginTop: spacing.lg,
    lineHeight: 15,
  },
});
