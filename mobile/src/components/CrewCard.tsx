import { View, Text, Pressable, StyleSheet } from "react-native";
import { MessageCircle } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { AvatarStack } from "./Avatar";
import type { Member } from "@/data/members";

interface Props {
  crewName: string;
  eventName: string;
  eventDateLabel: string;
  members: Member[];
  onPress?: () => void;
  onOpenChat?: () => void;
}

export function CrewCard({ crewName, eventName, eventDateLabel, members, onPress, onOpenChat }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={styles.crewName}>{crewName}</Text>
        </View>
        <View style={styles.datePill}>
          <Text style={styles.dateText}>{eventDateLabel}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.membersBlock}>
          <AvatarStack members={members} />
          <Text style={styles.memberCount}>{members.length} members</Text>
        </View>
        <Pressable onPress={onOpenChat} style={styles.chatButton} hitSlop={8}>
          <MessageCircle size={15} color={colors.primary} />
          <Text style={styles.chatButtonLabel}>chat</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: "rgba(123,143,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(123,143,255,0.25)",
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventName: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.xs,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  crewName: {
    fontFamily: fonts.display.black,
    fontSize: fontSize.xl,
    color: colors.foreground,
    textTransform: "lowercase",
    marginTop: 2,
  },
  datePill: {
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  dateText: {
    fontFamily: fonts.body.medium,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.lg,
  },
  membersBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  memberCount: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  chatButtonLabel: {
    fontFamily: fonts.body.bold,
    fontSize: fontSize.xs,
    color: colors.primary,
  },
});
