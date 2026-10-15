import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, fonts, fontSize, spacing, radius } from "@/theme";
import { AvatarStack } from "@/components/Avatar";
import { useAppState } from "@/state/AppState";
import { MEMBERS } from "@/data/members";
import { timeAgoLabel } from "@/utils/time";

export default function ChatsScreen() {
  const { crews, messagesByCrew } = useAppState();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>chats</Text>
        <Text style={styles.subtitle}>one group per crew — no DMs, no noise.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {crews.length === 0 && (
          <Text style={styles.empty}>your crew chats will show up here once you're matched into one.</Text>
        )}

        {crews.map((crew) => {
          const members = crew.memberIds.map((id) => MEMBERS.find((m) => m.id === id)).filter((m): m is NonNullable<typeof m> => !!m);
          const messages = messagesByCrew[crew.id] ?? [];
          const last = messages[messages.length - 1];

          return (
            <Pressable key={crew.id} onPress={() => router.push(`/crew/${crew.id}`)} style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}>
              <AvatarStack members={members} max={3} size={40} />
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.crewName}>{crew.name}</Text>
                  {last && <Text style={styles.time}>{timeAgoLabel(last.minutesAgo)}</Text>}
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {last ? `${last.authorId === "you" ? "you: " : ""}${last.text}` : "say hi to your new crew 👋"}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.lg },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.display,
    color: colors.foreground,
  },
  subtitle: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 4,
  },
  list: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  crewName: {
    fontFamily: fonts.display.medium,
    fontSize: fontSize.md,
    color: colors.foreground,
    textTransform: "lowercase",
  },
  time: {
    fontFamily: fonts.body.regular,
    fontSize: 11,
    color: colors.faintForeground,
  },
  lastMessage: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  empty: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    paddingVertical: spacing.xxxl,
    textAlign: "center",
  },
});
