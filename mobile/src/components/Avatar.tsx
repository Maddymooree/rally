import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "@/theme";
import type { Member } from "@/data/members";

interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
  ringColor?: string;
}

export function Avatar({ initials, color, size = 36, ringColor }: AvatarProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderColor: ringColor ?? colors.background,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.34 }]}>{initials.slice(0, 2)}</Text>
    </View>
  );
}

export function AvatarStack({ members, max = 4, size = 28 }: { members: Member[]; max?: number; size?: number }) {
  const shown = members.slice(0, max);
  const overflow = members.length - shown.length;

  return (
    <View style={styles.stackRow}>
      {shown.map((m, i) => (
        <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -size * 0.35 }}>
          <Avatar initials={m.initials} color={m.color} size={size} ringColor={colors.card} />
        </View>
      ))}
      {overflow > 0 && (
        <View style={{ marginLeft: -size * 0.35 }}>
          <View
            style={[
              styles.circle,
              { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.secondary, borderColor: colors.card },
            ]}
          >
            <Text style={[styles.initials, { fontSize: size * 0.32, color: colors.mutedForeground }]}>+{overflow}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  initials: {
    fontFamily: fonts.body.bold,
    color: "#ffffff",
  },
  stackRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
