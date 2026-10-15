import { Pressable, Text, StyleSheet, ActivityIndicator, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

interface Props {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export function PillButton({ label, onPress, variant = "primary", disabled, loading, style, fullWidth }: Props) {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        fullWidth && { alignSelf: "stretch" },
        isPrimary && { backgroundColor: colors.primary },
        variant === "secondary" && { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border },
        isGhost && { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
        (disabled || loading) && { opacity: 0.5 },
        pressed && !disabled && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.primaryForeground : colors.foreground} />
      ) : (
        <Text
          style={[
            styles.label,
            { color: isPrimary ? colors.primaryForeground : colors.foreground },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.md,
  },
});
