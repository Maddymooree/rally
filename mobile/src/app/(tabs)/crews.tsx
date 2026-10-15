import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { CrewCard } from "@/components/CrewCard";
import { useAppState } from "@/state/AppState";
import { MEMBERS } from "@/data/members";

export default function CrewsScreen() {
  const { crews } = useAppState();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>my crews</Text>
        <Text style={styles.subtitle}>every event you've been matched into.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {crews.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>no crews yet</Text>
            <Text style={styles.emptyBody}>head to discover and hit "find my crew" on a show to get matched.</Text>
          </View>
        )}

        {crews.map((crew) => {
          const members = crew.memberIds.map((id) => MEMBERS.find((m) => m.id === id)).filter((m): m is NonNullable<typeof m> => !!m);
          return (
            <CrewCard
              key={crew.id}
              crewName={crew.name}
              eventName={crew.eventName}
              eventDateLabel={crew.eventDateLabel}
              members={members}
              onPress={() => router.push(`/crew/${crew.id}`)}
              onOpenChat={() => router.push(`/crew/${crew.id}`)}
            />
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
  list: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  emptyState: {
    paddingVertical: spacing.xxxl,
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: fonts.display.medium,
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
  emptyBody: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    textAlign: "center",
    maxWidth: 260,
  },
});
