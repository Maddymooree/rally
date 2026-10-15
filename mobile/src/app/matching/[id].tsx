import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { Avatar } from "@/components/Avatar";
import { PillButton } from "@/components/PillButton";
import { MEMBERS } from "@/data/members";
import { useAppState, type FindCrewAnswers } from "@/state/AppState";

export default function Matching() {
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    dateLabel: string;
    days: string;
    solo: string;
    crewPreference: string;
    excitedArtists: string;
  }>();
  const { joinCrewForFestival, getCrew } = useAppState();

  const answers: FindCrewAnswers = useMemo(
    () => ({
      days: JSON.parse(params.days || "[]"),
      solo: params.solo === "1",
      crewPreference: params.crewPreference || null,
      excitedArtists: JSON.parse(params.excitedArtists || "[]"),
    }),
    [params.days, params.solo, params.crewPreference, params.excitedArtists]
  );

  const [revealedCount, setRevealedCount] = useState(0);
  const [done, setDone] = useState(false);
  // The matching call mutates AppState (setCrews/setMessagesByCrew), so it
  // must happen in an effect, not during render (useMemo) — calling a
  // setState from a parent provider while a child is rendering is invalid
  // in React 19 and throws "Cannot update a component while rendering a
  // different component".
  const [crew, setCrew] = useState(() => getCrew(params.id));

  useEffect(() => {
    if (!crew) {
      setCrew(joinCrewForFestival(params.id, params.name, params.dateLabel, answers));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const members = crew ? crew.memberIds.map((mid) => MEMBERS.find((m) => m.id === mid)).filter((m): m is NonNullable<typeof m> => !!m) : [];

  useEffect(() => {
    if (!crew) return;
    if (revealedCount >= members.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealedCount((c) => c + 1), 450);
    return () => clearTimeout(t);
  }, [revealedCount, members.length, crew]);

  if (!crew) {
    return <SafeAreaView style={styles.safe} edges={["top", "bottom"]} />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {!done ? (
          <>
            <Text style={styles.matchingLabel}>matching you into a crew...</Text>
            <Text style={styles.matchingSub}>same event · overlapping dates · compatible ages · similar taste</Text>
            <View style={styles.avatarRow}>
              {members.map((m, i) => (
                <View key={m.id} style={{ opacity: i < revealedCount ? 1 : 0.15 }}>
                  <Avatar initials={m.initials} color={m.color} size={56} />
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.resultTitle}>we found your people.</Text>
            <Text style={styles.resultSub}>
              {members.length} rally members headed to {crew.eventName}, matched on dates, vibe, and your crew preference.
            </Text>
            <View style={styles.avatarRow}>
              {members.map((m) => (
                <Avatar key={m.id} initials={m.initials} color={m.color} size={56} />
              ))}
            </View>
            <View style={styles.sampleNotice}>
              <Text style={styles.sampleNoticeText}>
                prototype demo — this match was generated from sample rally members, not a live matching algorithm.
              </Text>
            </View>
            <PillButton
              label="go to crew chat"
              fullWidth
              style={{ marginTop: spacing.xxl }}
              onPress={() => router.replace(`/crew/${crew.id}`)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl },
  matchingLabel: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xl,
    color: colors.foreground,
    textAlign: "center",
  },
  matchingSub: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  avatarRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  resultTitle: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.displayLg,
    color: colors.foreground,
    textAlign: "center",
  },
  resultSub: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.md,
    color: colors.mutedForeground,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: fontSize.md * 1.5,
  },
  sampleNotice: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sampleNoticeText: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.faintForeground,
    textAlign: "center",
    lineHeight: fontSize.xs * 1.5,
  },
});
