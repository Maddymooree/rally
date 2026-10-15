import { View, Text, FlatList, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { X, Flag, Ban } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { Avatar } from "@/components/Avatar";
import { SafetyBanner } from "@/components/SafetyPlaceholder";
import { useAppState } from "@/state/AppState";
import { MEMBERS } from "@/data/members";

export default function MembersList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCrew } = useAppState();
  const crew = getCrew(id);

  const members = (crew?.memberIds ?? []).map((mid) => MEMBERS.find((m) => m.id === mid)).filter((m): m is NonNullable<typeof m> => !!m);

  const notReal = (action: string) =>
    Alert.alert("prototype placeholder", `"${action}" isn't wired to a real backend yet — this is a visible placeholder.`);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>{crew?.name ?? "crew"} members</Text>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeButton}>
          <X size={18} color={colors.foreground} />
        </Pressable>
      </View>

      <FlatList
        data={members}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.lg }}>
            <SafetyBanner text="every rally member is 18+ and reviewed before being placed in a crew. you can report or block anyone, anytime." />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Avatar initials={item.initials} color={item.color} size={44} />
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>
                {item.name}, {item.age}
              </Text>
              <Text style={styles.memberMeta}>{item.city}</Text>
              <Text style={styles.memberMeta} numberOfLines={1}>
                {item.favoriteArtists.join(", ")}
              </Text>
            </View>
            <View style={styles.actionsRow}>
              <Pressable onPress={() => notReal("report")} hitSlop={8} style={styles.iconButton}>
                <Flag size={15} color={colors.mutedForeground} />
              </Pressable>
              <Pressable onPress={() => notReal("block")} hitSlop={8} style={styles.iconButton}>
                <Ban size={15} color={colors.mutedForeground} />
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: { fontFamily: fonts.display.black, fontSize: fontSize.xl, color: colors.foreground, textTransform: "lowercase" },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  memberName: { fontFamily: fonts.display.medium, fontSize: fontSize.md, color: colors.foreground, textTransform: "lowercase" },
  memberMeta: { fontFamily: fonts.body.regular, fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 1 },
  actionsRow: { flexDirection: "row", gap: spacing.sm },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
});
