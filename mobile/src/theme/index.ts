// Mirrors the design tokens in the rally website
// (../../src/styles/theme.css) so the app and site feel like the same
// product. Keep these in sync if the site's palette changes.

export const colors = {
  background: "#070c1a",
  card: "#0d1428",
  cardElevated: "#121a35",
  secondary: "#121a35",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.14)",
  foreground: "#eef0ff",
  mutedForeground: "#8186a3",
  faintForeground: "#5a6380",
  primary: "#7b8fff",
  primaryForeground: "#070c1a",
  destructive: "#d4183d",
  success: "#4ade80",

  // translucent primary tints, used the same way color-mix(...) is used on
  // the website (pill backgrounds, borders, glows)
  primaryTint6: "rgba(123,143,255,0.06)",
  primaryTint10: "rgba(123,143,255,0.10)",
  primaryTint18: "rgba(123,143,255,0.18)",
  primaryTint30: "rgba(123,143,255,0.30)",
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Loaded via @expo-google-fonts/outfit and @expo-google-fonts/dm-sans —
// see src/hooks/useAppFonts.ts. Outfit is the display/headline face
// (lowercase wordmark, big editorial type); DM Sans is body/UI text.
export const fonts = {
  display: {
    black: "Outfit_900Black",
    bold: "Outfit_700Bold",
    medium: "Outfit_500Medium",
  },
  body: {
    regular: "DMSans_400Regular",
    medium: "DMSans_500Medium",
    bold: "DMSans_700Bold",
  },
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
  display: 40,
  displayLg: 48,
} as const;
