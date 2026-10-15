import { useMemo, useState } from "react";
import { View, Text, ScrollView, TextInput, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { colors, fonts, fontSize, spacing } from "@/theme";
import { SectionLabel } from "@/components/SectionLabel";
import { EventCard } from "@/components/EventCard";
import { ShowCard } from "@/components/ShowCard";
import { Chip } from "@/components/Chip";
import { FESTIVALS } from "@/data/festivals";
import { LOCAL_SHOWS } from "@/data/localShows";
import { CITIES } from "@/data/genresArtists";
import { useAppState } from "@/state/AppState";

export default function DiscoverScreen() {
  const { profile } = useAppState();
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string | null>(profile.city || null);

  const filteredFestivals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FESTIVALS.filter((f) => {
      const matchesQuery = !q || f.name.toLowerCase().includes(q) || f.artists.some((a) => a.toLowerCase().includes(q));
      const matchesCity = !cityFilter || f.city.toLowerCase().includes(cityFilter.toLowerCase());
      return matchesQuery && matchesCity;
    });
  }, [query, cityFilter]);

  const filteredShows = useMemo(() => {
    if (!cityFilter) return LOCAL_SHOWS;
    return LOCAL_SHOWS.filter((s) => s.city.toLowerCase().includes(cityFilter.toLowerCase()));
  }, [cityFilter]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>what's the move?</Text>
          <Text style={styles.greetingSub}>
            {profile.displayName ? `hey ${profile.displayName.split(" ")[0]} — ` : ""}here's what rally's tracking right now.
          </Text>
        </View>

        <View style={styles.searchRow}>
          <Search size={16} color={colors.mutedForeground} />
          <View style={{ flex: 1 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="search artists, festivals, shows"
              placeholderTextColor={colors.mutedForeground}
              style={[styles.searchInput, { width: "100%" }]}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityRow}>
          <Chip label="all cities" selected={!cityFilter} onPress={() => setCityFilter(null)} />
          {CITIES.filter((c) => c !== "other").map((c) => (
            <Chip key={c} label={c} selected={cityFilter === c} onPress={() => setCityFilter(c)} />
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionLabel>upcoming festivals</SectionLabel>
          </View>
          <FlatList
            horizontal
            data={filteredFestivals}
            keyExtractor={(f) => f.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl, gap: spacing.md }}
            renderItem={({ item }) => (
              <EventCard
                image={item.image}
                title={item.name}
                subtitle={item.city}
                dateLabel={item.dateLabel}
                interestedCount={item.interestedCount}
                onPress={() => router.push(`/event/${item.id}`)}
              />
            )}
            ListEmptyComponent={<Text style={styles.empty}>no festivals match that search.</Text>}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionLabel>shows near you</SectionLabel>
          </View>
          <View style={styles.showsGrid}>
            {filteredShows.length === 0 && <Text style={styles.empty}>nothing confirmed in this city yet — check back soon.</Text>}
            {filteredShows.map((show) => (
              <ShowCard
                key={show.id}
                image={show.image}
                artist={show.artist}
                venue={show.venue}
                city={show.city}
                dateLabel={show.dateLabel}
                genres={show.genres}
                onFindCrew={() =>
                  router.push({
                    pathname: "/find-crew/[id]",
                    params: { id: show.id, name: show.artist, dateLabel: show.dateLabel, kind: "show" },
                  })
                }
              />
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.featuredBanner]}>
          <SectionLabel>featured rally event</SectionLabel>
          <Text style={styles.featuredTitle}>iii points crews are already forming.</Text>
          <Text style={styles.featuredSub}>412 people on rally are headed to iii points — find yours before doors open.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  greeting: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.display,
    color: colors.foreground,
  },
  greetingSub: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.foreground,
  },
  cityRow: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  section: { marginTop: spacing.xxl },
  sectionHeader: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  empty: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    paddingHorizontal: spacing.xl,
  },
  showsGrid: { paddingHorizontal: spacing.xl, gap: spacing.md },
  featuredBanner: {
    marginHorizontal: spacing.xl,
    backgroundColor: "rgba(123,143,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(123,143,255,0.25)",
    borderRadius: 18,
    padding: spacing.lg,
  },
  featuredTitle: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.lg,
    color: colors.foreground,
    marginTop: spacing.sm,
  },
  featuredSub: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 4,
  },
});
