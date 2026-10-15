import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { ShieldAlert } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

/**
 * Visible placeholder for a safety action (report, block, delete account,
 * privacy preference, consent, age verification). Per the brief, these are
 * NOT wired to a real backend in this prototype — tapping one explains
 * that plainly instead of silently pretending to work.
 */
export function SafetyPlaceholderAction({ label, description }: { label: string; description?: string }) {
  return (
    <Pressable
      onPress={() =>
        Alert.alert(
          "prototype placeholder",
          `"${label}" isn't wired up yet — this is a visible placeholder for a feature that needs a real backend before it ships.`
        )
      }
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <Text style={styles.label}>{label}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </Pressable>
  );
}

export function SafetyBanner({ text }: { text: string }) {
  return (
    <View style={styles.banner}>
      <ShieldAlert size={15} color={colors.primary} />
      <Text style={styles.bannerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.md,
    color: colors.foreground,
  },
  description: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primaryTint10,
    borderWidth: 1,
    borderColor: colors.primaryTint30,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  bannerText: {
    flex: 1,
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    lineHeight: fontSize.xs * 1.5,
  },
});
