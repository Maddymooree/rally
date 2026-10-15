import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { useOnboardingDraft } from "@/state/OnboardingDraft";
import { colors, fonts, fontSize, spacing } from "@/theme";

const TOTAL_STEPS = 8;

export default function PhotoStep() {
  const { draft, setField } = useOnboardingDraft();

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("photo access needed", "rally needs photo library access to set a profile picture. you can skip this for now.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setField("photoUri", result.assets[0].uri);
    }
  };

  return (
    <OnboardingScreen
      step={3}
      totalSteps={TOTAL_STEPS}
      title="add a profile photo"
      subtitle="crews meet up in person — a real photo helps everyone recognize each other."
      skip={() => router.push("/onboarding/artists")}
      continueDisabled={!draft.photoUri}
      onContinue={() => router.push("/onboarding/artists")}
    >
      <Pressable onPress={pickPhoto} style={styles.photoWrap}>
        {draft.photoUri ? (
          <Image source={{ uri: draft.photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Camera size={28} color={colors.mutedForeground} />
            <Text style={styles.placeholderText}>tap to add photo</Text>
          </View>
        )}
      </Pressable>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  photoWrap: { alignItems: "center" },
  photo: { width: 180, height: 180, borderRadius: 90 },
  placeholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  placeholderText: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
});
