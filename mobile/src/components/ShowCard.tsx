import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { PillButton } from "./PillButton";

interface Props {
  image: string;
  artist: string;
  venue: string;
  city: string;
  dateLabel: string;
  genres: string[];
  onFindCrew?: () => void;
}

/** Wide card used in the "shows near you" grid on Discover. */
export function ShowCard({ image, artist, venue, city, dateLabel, genres, onFindCrew }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.genreRow}>
        {genres.slice(0, 2).map((g) => (
          <View key={g} style={styles.genrePill}>
            <Text style={styles.genreText}>{g}</Text>
          </View>
        ))}
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {artist}
        </Text>
        <Text style={styles.meta}>
          {venue}, {city} · {dateLabel}
        </Text>
        <PillButton label="find my crew" onPress={onFindCrew} style={{ marginTop: spacing.md, paddingVertical: 12 }} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 140,
  },
  genreRow: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: "row",
    gap: 6,
  },
  genrePill: {
    backgroundColor: "rgba(7,12,26,0.65)",
    borderWidth: 1,
    borderColor: "rgba(123,143,255,0.35)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  genreText: {
    fontFamily: fonts.body.bold,
    fontSize: 9,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  body: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.lg,
    color: colors.foreground,
    textTransform: "lowercase",
  },
  meta: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 4,
  },
});
