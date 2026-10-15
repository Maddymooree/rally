import { View, Text, StyleSheet } from "react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { Avatar } from "./Avatar";
import type { Member } from "@/data/members";

interface Props {
  text: string;
  isSelf: boolean;
  author?: Member;
  timeLabel: string;
}

export function ChatBubble({ text, isSelf, author, timeLabel }: Props) {
  return (
    <View style={[styles.row, isSelf && styles.rowSelf]}>
      {!isSelf && author && <Avatar initials={author.initials} color={author.color} size={28} />}
      <View style={{ maxWidth: "76%" }}>
        {!isSelf && author && <Text style={styles.authorName}>{author.name}</Text>}
        <View style={[styles.bubble, isSelf ? styles.bubbleSelf : styles.bubbleOther]}>
          <Text style={[styles.text, { color: isSelf ? colors.primaryForeground : colors.foreground }]}>{text}</Text>
        </View>
        <Text style={[styles.time, isSelf && { textAlign: "right" }]}>{timeLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  rowSelf: {
    flexDirection: "row-reverse",
  },
  authorName: {
    fontFamily: fonts.body.bold,
    fontSize: 11,
    color: colors.primary,
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  bubbleOther: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  bubbleSelf: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  text: {
    fontFamily: fonts.body.regular,
    fontSize: fontSize.md,
    lineHeight: fontSize.md * 1.4,
  },
  time: {
    fontFamily: fonts.body.regular,
    fontSize: 10,
    color: colors.faintForeground,
    marginTop: 3,
    marginHorizontal: 4,
  },
});
