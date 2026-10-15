import { useEffect, useCallback } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useAppFonts } from "@/hooks/useAppFonts";
import { AppStateProvider } from "@/state/AppState";
import { colors } from "@/theme";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaProvider>
        <AppStateProvider>
          <StatusBar style="light" />
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="event/[id]" options={{ presentation: "card" }} />
              <Stack.Screen name="find-crew/[id]" options={{ presentation: "modal" }} />
              <Stack.Screen name="matching/[id]" options={{ presentation: "modal", gestureEnabled: false }} />
              <Stack.Screen name="crew/[id]" options={{ presentation: "card" }} />
              <Stack.Screen name="archives/[id]" options={{ presentation: "card" }} />
              <Stack.Screen name="members/[id]" options={{ presentation: "modal" }} />
              <Stack.Screen name="settings/index" options={{ presentation: "modal" }} />
            </Stack>
          </View>
        </AppStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
