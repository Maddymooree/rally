import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { Chip } from "@/components/Chip";
import { PillButton } from "@/components/PillButton";
import { SAMPLE_ARTISTS, CREW_PREFERENCES } from "@/data/genresArtists";

const DAY_OPTIONS = ["friday", "saturday", "sunday", "all days"];

export default function FindCrewQuestionnaire() {
  const { id, name, dateLabel } = useLocalSearchParams<{ id: string; name: string; dateLabel: string }>();

  const [days, setDays] = useState<string[]>([]);
  const [solo, setSolo] = useState<boolean | null>(null);
  const [crewPreference, setCrewPreference] = useState<string | null>(null);
  const [excitedArtists, setExcitedArtists] = useState<string[]>([]);

  const toggleDay = (d: string) => setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  const toggleArtist = (a: string) =>
    setExcitedArtists((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const canSubmit = days.length > 0 && solo !== null && crewPreference !== null && excitedArtists.length > 0;

  const submit = () => {
    router.replace({
      pathname: "/matching/[id]",
      params: {
        id,
        name,
        dateLabel,
        days: JSON.stringify(days),
        solo: solo ? "1" : "0",
        crewPreference: crewPreference ?? "",
        excitedArtists: JSON.stringify(excitedArtists),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>find my crew</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeButton}>
          <X size={18} color={colors.foreground} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Question title="which days are you attending?">
          <View style={styles.chipsWrap}>
            {DAY_OPTIONS.map((d) => (
              <Chip key={d} label={d} selected={days.includes(d)} onPress={() => toggleDay(d)} />
            ))}
          </View>
        </Question>

        <Question title="are you attending solo?">
          <View style={styles.chipsWrap}>
            <Chip label="yes, solo" selected={solo === true} onPress={() => setSolo(true)} />
            <Chip label="no, with people" selected={solo === false} onPress={() => setSolo(false)} />
          </View>
        </Question>

        <Question title="what kind of crew are you looking for?">
          <View style={{ gap: spacing.sm }}>
            {CREW_PREFERENCES.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => setCrewPreference(p.id)}
                style={[styles.prefOption, crewPreference === p.id && styles.prefOptionSelected]}
              >
                <Text style={[styles.prefLabel, crewPreference === p.id && { color: colors.primary }]}>{p.label}</Text>
                <Text style={styles.prefDescription}>{p.description}</Text>
              </Pressable>
            ))}
          </View>
        </Question>

        <Question title="which artists are you most excited to see?">
          <View style={styles.chipsWrap}>
            {SAMPLE_ARTISTS.map((a) => (
              <Chip key={a} label={a} selected={excitedArtists.includes(a)} onPress={() => toggleArtist(a)} />
            ))}
          </View>
        </Question>
      </ScrollView>

      <View style={styles.footer}>
        <PillButton label="find my crew" fullWidth disabled={!canSubmit} onPress={submit} />
      </View>
    </SafeAreaView>
  );
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.question}>
      <Text style={styles.questionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  eyebrow: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.xs,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xl,
    color: colors.foreground,
    textTransform: "lowercase",
    marginTop: 4,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.xxxl },
  question: { marginBottom: spacing.xxl },
  questionTitle: {
    fontFamily: fonts.display.medium,
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  prefOption: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  prefOptionSelected: {
    borderColor: "rgba(123,143,255,0.5)",
    backgroundColor: "rgba(123,143,255,0.08)",
  },
  prefLabel: {
    fontFamily: fonts.display.medium,
    fontSize: fontSize.md,
    color: colors.foreground,
    textTransform: "lowercase",
  },
  prefDescription: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
});
