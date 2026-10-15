import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { SectionLabel } from "@/components/SectionLabel";
import { SafetyPlaceholderAction, SafetyBanner } from "@/components/SafetyPlaceholder";

export default function Settings() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <ChevronLeft size={20} color={colors.foreground} />
        </Pressable>
        <Text style={styles.title}>settings</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <SafetyBanner text="these settings are visible placeholders for this prototype — nothing here is wired to a real backend yet." />

        <View style={styles.section}>
          <SectionLabel>account</SectionLabel>
          <SafetyPlaceholderAction label="age verification" description="verified 18+ at sign-up" />
          <SafetyPlaceholderAction label="delete my account" description="permanently removes your profile and crew memberships" />
        </View>

        <View style={styles.section}>
          <SectionLabel>privacy & safety</SectionLabel>
          <SafetyPlaceholderAction label="group privacy preferences" description="control who can see your crews and activity" />
          <SafetyPlaceholderAction label="blocked members" description="manage who you've blocked" />
          <SafetyPlaceholderAction label="report history" description="see reports you've submitted" />
          <SafetyPlaceholderAction label="photo sharing consent" description="require confirmation before crew photos are shared" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  title: { fontFamily: fonts.display.medium, fontSize: fontSize.lg, color: colors.foreground, textTransform: "lowercase" },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.xxxl },
  section: { marginTop: spacing.xl },
});
