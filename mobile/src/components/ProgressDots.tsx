import { View, StyleSheet } from "react-native";
import { colors } from "@/theme";

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current && styles.dotActive,
            i < current && styles.dotDone,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, justifyContent: "center" },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  dotDone: {
    backgroundColor: "rgba(123,143,255,0.4)",
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.primary,
  },
});
