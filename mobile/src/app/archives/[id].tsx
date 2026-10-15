import { View, Text, Image, FlatList, Pressable, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeft, Plus } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { SafetyBanner } from "@/components/SafetyPlaceholder";
import { useAppState } from "@/state/AppState";

const GAP = 3;
const COLUMNS = 3;
const TILE_SIZE = (Dimensions.get("window").width - spacing.xl * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

export default function RallyArchives() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCrew, addArchivePhoto } = useAppState();
  const crew = getCrew(id);

  const addPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("photo access needed", "rally archives needs photo library access to add a photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.7 });
    if (!result.canceled && result.assets[0] && crew) {
      Alert.alert(
        "share with the crew?",
        "everyone in this crew will be able to see this photo in rally archives.",
        [
          { text: "cancel", style: "cancel" },
          { text: "share", onPress: () => addArchivePhoto(crew.id, result.assets[0].uri) },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <ChevronLeft size={20} color={colors.foreground} />
        </Pressable>
        <Text style={styles.title}>rally archives</Text>
        <Pressable onPress={addPhoto} hitSlop={10} style={styles.addButton}>
          <Plus size={18} color={colors.primaryForeground} />
        </Pressable>
      </View>

      <Text style={styles.subtitle}>{crew?.name ?? "crew"} · shared memories from this crew</Text>

      <View style={{ paddingHorizontal: spacing.xl, marginVertical: spacing.md }}>
        <SafetyBanner text="photos here are visible to everyone in this crew only. sharing a photo asks for your confirmation first." />
      </View>

      <FlatList
        data={crew?.archivePhotos ?? []}
        keyExtractor={(uri, i) => `${uri}-${i}`}
        numColumns={COLUMNS}
        contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl }}
        columnWrapperStyle={{ gap: GAP, marginBottom: GAP }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>no photos yet — be the first to add one from this crew.</Text>
          </View>
        }
        renderItem={({ item }) => <Image source={{ uri: item }} style={{ width: TILE_SIZE, height: TILE_SIZE, borderRadius: radius.sm }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  title: { fontFamily: fonts.display.black, fontSize: fontSize.lg, color: colors.foreground, textTransform: "lowercase" },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    paddingHorizontal: spacing.xl,
    marginTop: 4,
  },
  empty: { paddingVertical: spacing.xxxl, alignItems: "center" },
  emptyText: { fontFamily: fonts.body.regular, fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center" },
});
