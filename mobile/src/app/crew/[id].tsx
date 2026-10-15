import { useRef, useState } from "react";
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Users, Image as ImageIcon, Send, MoreVertical } from "lucide-react-native";
import { colors, radius, fonts, fontSize, spacing } from "@/theme";
import { Avatar, AvatarStack } from "@/components/Avatar";
import { ChatBubble } from "@/components/ChatBubble";
import { useAppState } from "@/state/AppState";
import { MEMBERS } from "@/data/members";
import { CONVERSATION_STARTERS } from "@/data/messages";
import { timeAgoLabel } from "@/utils/time";

export default function CrewChat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCrew, messagesByCrew, sendMessage } = useAppState();
  const crew = getCrew(id);
  const [draft, setDraft] = useState("");
  const listRef = useRef<FlatList>(null);

  if (!crew) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>crew not found.</Text>
      </SafeAreaView>
    );
  }

  const members = crew.memberIds.map((mid) => MEMBERS.find((m) => m.id === mid)).filter((m): m is NonNullable<typeof m> => !!m);
  const messages = messagesByCrew[crew.id] ?? [];

  const handleSend = () => {
    if (!draft.trim()) return;
    sendMessage(crew.id, draft);
    setDraft("");
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const showMenu = () => {
    Alert.alert(crew.name, undefined, [
      { text: "view rally archives", onPress: () => router.push(`/archives/${crew.id}`) },
      { text: "view members", onPress: () => router.push(`/members/${crew.id}`) },
      { text: "report a member", style: "destructive", onPress: () => reportPlaceholder() },
      { text: "block a member", style: "destructive", onPress: () => reportPlaceholder() },
      { text: "cancel", style: "cancel" },
    ]);
  };

  const reportPlaceholder = () =>
    Alert.alert("prototype placeholder", "reporting/blocking isn't wired to a real backend yet in this prototype.");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }} keyboardVerticalOffset={8}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <ChevronLeft size={20} color={colors.foreground} />
          </Pressable>
          <Pressable style={styles.headerCenter} onPress={() => router.push(`/members/${crew.id}`)}>
            <AvatarStack members={members} max={3} size={26} />
            <View>
              <Text style={styles.headerTitle}>{crew.name}</Text>
              <Text style={styles.headerSubtitle}>{members.length} members</Text>
            </View>
          </Pressable>
          <Pressable onPress={showMenu} hitSlop={10}>
            <MoreVertical size={20} color={colors.foreground} />
          </Pressable>
        </View>

        {crew.pinnedPlan ? (
          <View style={styles.pinnedBar}>
            <Text style={styles.pinnedLabel}>pinned plan</Text>
            <Text style={styles.pinnedText} numberOfLines={2}>
              {crew.pinnedPlan}
            </Text>
          </View>
        ) : null}

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View style={styles.startersWrap}>
              <Text style={styles.startersTitle}>break the ice</Text>
              {CONVERSATION_STARTERS.map((s) => (
                <Pressable key={s} onPress={() => sendMessage(crew.id, s)} style={styles.starterChip}>
                  <Text style={styles.starterText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          }
          renderItem={({ item }) => (
            <ChatBubble
              text={item.text}
              isSelf={item.authorId === "you"}
              author={members.find((m) => m.id === item.authorId)}
              timeLabel={timeAgoLabel(item.minutesAgo)}
            />
          )}
        />

        <View style={styles.composer}>
          <Pressable onPress={() => router.push(`/archives/${crew.id}`)} hitSlop={8} style={styles.composerIcon}>
            <ImageIcon size={18} color={colors.mutedForeground} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="message your crew"
              placeholderTextColor={colors.mutedForeground}
              style={[styles.input, { width: "100%" }]}
              multiline
            />
          </View>
          <Pressable onPress={handleSend} style={[styles.sendButton, !draft.trim() && { opacity: 0.4 }]} disabled={!draft.trim()}>
            <Send size={16} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  notFound: { color: colors.mutedForeground, textAlign: "center", marginTop: 100 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1, marginHorizontal: spacing.md },
  headerTitle: { fontFamily: fonts.display.medium, fontSize: fontSize.md, color: colors.foreground, textTransform: "lowercase" },
  headerSubtitle: { fontFamily: fonts.body.regular, fontSize: 11, color: colors.mutedForeground },
  pinnedBar: {
    backgroundColor: colors.primaryTint10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pinnedLabel: {
    fontFamily: fonts.body.bold,
    fontSize: 10,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  pinnedText: { fontFamily: fonts.body.regular, fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  messageList: { padding: spacing.lg, flexGrow: 1, justifyContent: "flex-end" },
  startersWrap: { gap: spacing.sm, paddingVertical: spacing.xl },
  startersTitle: { fontFamily: fonts.display.medium, fontSize: fontSize.md, color: colors.foreground, marginBottom: spacing.sm },
  starterChip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  starterText: { fontFamily: fonts.body.regular, fontSize: fontSize.sm, color: colors.foreground },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  composerIcon: { paddingBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontFamily: fonts.body.regular,
    fontSize: fontSize.sm,
    color: colors.foreground,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
