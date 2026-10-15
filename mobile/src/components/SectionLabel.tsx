import { Text, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "@/theme";

export function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.xs,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
