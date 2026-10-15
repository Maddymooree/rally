import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Users, Calendar, MapPin } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { SectionLabel } from "@/components/SectionLabel";
import { Chip } from "@/components/Chip";
import { PillButton } from "@/components/PillButton";
import { FESTIVALS } from "@/data/festivals";
import { useAppState, crewIdForFestival } from "@/state/AppState";

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const festival = FESTIVALS.find((f) => f.id === id);
  const { crews } = useAppState();
  const matchedCrewId = crewIdForFestival(id ?? "");
  const alreadyMatched = crews.some((c) => c.id === matchedCrewId);

  if (!festival) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>event not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: festival.image }} style={styles.hero} resizeMode="cover" />
          <View style={styles.heroScrim} />
          <SafeAreaView edges={["top"]} style={styles.heroHeader}>
            <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
              <ChevronLeft size={20} color="#fff" />
            </Pressable>
          </SafeAreaView>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>{festival.name}</Text>
            <View style={styles.heroMetaRow}>
              <Calendar size={13} color="rgba(255,255,255,0.75)" />
              <Text style={styles.heroMeta}>{festival.dateLabel}</Text>
              <MapPin size={13} color="rgba(255,255,255,0.75)" style={{ marginLeft: spacing.md }} />
              <Text style={styles.heroMeta}>{festival.city}</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.description}>{festival.description}</Text>

          <View style={styles.activityCard}>
            <Users size={16} color={colors.primary} />
            <Text style={styles.activityText}>
              <Text style={{ fontFamily: fonts.body.bold, color: colors.foreground }}>{festival.interestedCount} rally members</Text>{" "}
              are headed here — crew matching is open.
            </Text>
          </View>

          <View style={styles.section}>
            <SectionLabel>artists performing</SectionLabel>
            <View style={styles.chipsWrap}>
              {festival.artists.map((a) => (
                <Chip key={a} label={a} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionLabel>sample data</SectionLabel>
            <Text style={styles.sampleNote}>
              this is prototype content — lineup, dates, and member counts are placeholder data, not a live rally listing.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PillButton
          label={alreadyMatched ? "go to your crew" : "find my crew"}
          fullWidth
          onPress={() =>
            alreadyMatched
              ? router.push(`/crew/${matchedCrewId}`)
              : router.push({
                  pathname: "/find-crew/[id]",
                  params: { id: festival.id, name: festival.name, dateLabel: festival.dateLabel, kind: "festival" },
                })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  notFound: { color: colors.mutedForeground, textAlign: "center", marginTop: 100 },
  heroWrap: { height: 340 },
  hero: { ...StyleSheet.absoluteFill },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(7,12,26,0.25)",
  },
  heroHeader: { paddingHorizontal: spacing.lg },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(7,12,26,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
    backgroundColor: "rgba(7,12,26,0.5)",
  },
  heroTitle: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.displayLg,
    color: "#fff",
    textTransform: "lowercase",
  },
  heroMetaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: spacing.sm },
  heroMeta: { fontFamily: fonts.body.medium, fontSize: fontSize.sm, color: "rgba(255,255,255,0.85)" },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  description: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.md,
    color: colors.mutedForeground,
    lineHeight: fontSize.md * 1.55,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primaryTint10,
    borderWidth: 1,
    borderColor: colors.primaryTint30,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  activityText: { flex: 1, fontFamily: fonts.body.regular, fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: fontSize.sm * 1.5 },
  section: { marginTop: spacing.xl },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  sampleNote: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.faintForeground,
    marginTop: spacing.sm,
    lineHeight: fontSize.xs * 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
