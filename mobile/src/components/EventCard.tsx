import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { Users } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";

interface Props {
  image: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  interestedCount: number;
  onPress?: () => void;
  width?: number;
}

/** Image-based card for festivals (Discover screen "upcoming festivals" rail). */
export function EventCard({ image, title, subtitle, dateLabel, interestedCount, onPress, width = 220 }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, { width }, pressed && { opacity: 0.9 }]}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.imageOverlay} />
      <View style={styles.badge}>
        <Users size={10} color={colors.primary} />
        <Text style={styles.badgeText}>{interestedCount} interested</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {dateLabel} · {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 280,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.card,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(7,12,26,0.15)",
  },
  badge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(7,12,26,0.65)",
    borderWidth: 1,
    borderColor: "rgba(123,143,255,0.35)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontFamily: fonts.body.bold,
    fontSize: 10,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  textBlock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: "rgba(7,12,26,0.55)",
  },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.lg,
    color: "#ffffff",
    textTransform: "lowercase",
  },
  meta: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
});
