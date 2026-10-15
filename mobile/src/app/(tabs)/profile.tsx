import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Settings, AtSign } from "lucide-react-native";
import { colors, fonts, fontSize, spacing, radius } from "@/theme";
import { SectionLabel } from "@/components/SectionLabel";
import { Chip } from "@/components/Chip";
import { Avatar } from "@/components/Avatar";
import { useAppState } from "@/state/AppState";

export default function ProfileScreen() {
  const { profile, crews } = useAppState();
  const age = calculateAgeFromISO(profile.birthdate);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>profile</Text>
          <Pressable hitSlop={10} onPress={() => router.push("/settings")}>
            <Settings size={20} color={colors.mutedForeground} />
          </Pressable>
        </View>

        <View style={styles.identity}>
          {profile.photoUri ? (
            <Image source={{ uri: profile.photoUri }} style={styles.photo} />
          ) : (
            <Avatar initials={profile.displayName ? profile.displayName.slice(0, 2).toUpperCase() : "YOU"} color={colors.primary} size={88} />
          )}
          <Text style={styles.name}>
            {profile.displayName || "your name"}
            {age ? `, ${age}` : ""}
          </Text>
          <Text style={styles.city}>{profile.city || "city not set"}</Text>

          {profile.instagram ? (
            <View style={styles.igRow}>
              <AtSign size={13} color={colors.primary} />
              <Text style={styles.igHandle}>@{profile.instagram}</Text>
            </View>
          ) : null}

          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonLabel}>edit profile</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <SectionLabel>favorite genres</SectionLabel>
          <View style={styles.chipsWrap}>
            {(profile.genres.length ? profile.genres : ["house", "techno"]).map((g) => (
              <Chip key={g} label={g} selected />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionLabel>favorite artists</SectionLabel>
          <View style={styles.chipsWrap}>
            {(profile.favoriteArtists.length ? profile.favoriteArtists : ["fisher", "john summit"]).map((a) => (
              <Chip key={a} label={a} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionLabel>current crews</SectionLabel>
          {crews.length === 0 && <Text style={styles.mutedText}>no crews yet.</Text>}
          {crews.map((c) => (
            <View key={c.id} style={styles.listRow}>
              <Text style={styles.listRowTitle}>{c.name}</Text>
              <Text style={styles.listRowMeta}>{c.eventDateLabel}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <SectionLabel>past events</SectionLabel>
          <View style={styles.listRow}>
            <Text style={styles.listRowTitle}>ultra miami '25</Text>
            <Text style={styles.listRowMeta}>mar 2025</Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listRowTitle}>edc orlando '25</Text>
            <Text style={styles.listRowMeta}>nov 2025</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function calculateAgeFromISO(birthdate: string): number | null {
  if (!birthdate) return null;
  const dob = new Date(birthdate);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthday = today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  title: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xxl,
    color: colors.foreground,
  },
  identity: { alignItems: "center", paddingVertical: spacing.xl },
  photo: { width: 88, height: 88, borderRadius: 44 },
  name: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xl,
    color: colors.foreground,
    marginTop: spacing.md,
  },
  city: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: 2,
    textTransform: "lowercase",
  },
  igRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: spacing.sm },
  igHandle: { fontFamily: fonts.body.medium, fontSize: fontSize.sm, color: colors.primary },
  editButton: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
  },
  editButtonLabel: { fontFamily: fonts.body.bold, fontSize: fontSize.sm, color: colors.foreground },
  section: { paddingHorizontal: spacing.xl, marginTop: spacing.xl },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  mutedText: { fontFamily: fonts.body.regular, fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listRowTitle: { fontFamily: fonts.body.medium, fontSize: fontSize.md, color: colors.foreground, textTransform: "lowercase" },
  listRowMeta: { fontFamily: fonts.body.regular, fontSize: fontSize.sm, color: colors.mutedForeground },
});
