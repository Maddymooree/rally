// Prototype sample crews the demo user has already been matched into, so
// "my crews" / "chats" / "archives" have something to show without
// forcing a fresh onboarding run every time.

export interface Crew {
  id: string;
  name: string;
  eventName: string;
  eventDateLabel: string;
  memberIds: string[];
  pinnedPlan: string;
  archivePhotos: string[];
}

export const CREWS: Crew[] = [
  {
    id: "iii-points-26",
    name: "iii points '26",
    eventName: "iii points",
    eventDateLabel: "oct 16-17",
    memberIds: ["jaylen-k", "maya-p", "sam-a", "elena-l"],
    pinnedPlan: "meeting at the mana wynwood entrance 6:45pm friday — look for the blue rally pin on insta stories",
    archivePhotos: [
      "https://picsum.photos/seed/rally-archive-1/600/600",
      "https://picsum.photos/seed/rally-archive-2/600/600",
      "https://picsum.photos/seed/rally-archive-3/600/600",
      "https://picsum.photos/seed/rally-archive-4/600/600",
    ],
  },
  {
    id: "edc-orlando-26",
    name: "edc orlando '26",
    eventName: "edc orlando",
    eventDateLabel: "nov 6-8",
    memberIds: ["tai-r", "devon-w", "jaylen-k"],
    pinnedPlan: "camping at the rally section, site 114 — DM elena for the gate code",
    archivePhotos: [
      "https://picsum.photos/seed/rally-archive-5/600/600",
      "https://picsum.photos/seed/rally-archive-6/600/600",
    ],
  },
];
