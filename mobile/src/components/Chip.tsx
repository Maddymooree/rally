import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipDefault,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.label, { color: selected ? colors.primaryForeground : colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.sm,
  },
});
