import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CREWS, type Crew } from "@/data/crews";
import { MESSAGES, type Message } from "@/data/messages";
import { MEMBERS } from "@/data/members";

export interface Profile {
  displayName: string;
  birthdate: string; // ISO date, e.g. "2001-04-12"
  city: string;
  photoUri: string | null;
  favoriteArtists: string[];
  genres: string[];
  instagram: string;
  crewPreference: string | null;
}

const EMPTY_PROFILE: Profile = {
  displayName: "",
  birthdate: "",
  city: "",
  photoUri: null,
  favoriteArtists: [],
  genres: [],
  instagram: "",
  crewPreference: null,
};

export interface FindCrewAnswers {
  days: string[];
  solo: boolean;
  crewPreference: string | null;
  excitedArtists: string[];
}

interface AppStateValue {
  onboarded: boolean;
  profile: Profile;
  crews: Crew[];
  messagesByCrew: Record<string, Message[]>;
  completeOnboarding: (profile: Profile) => void;
  sendMessage: (crewId: string, text: string) => void;
  /** Simulates the matching algorithm: builds (or reuses) a crew for this festival. */
  joinCrewForFestival: (festivalId: string, festivalName: string, dateLabel: string, answers: FindCrewAnswers) => Crew;
  getCrew: (crewId: string) => Crew | undefined;
  addArchivePhoto: (crewId: string, photoUri: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

// Seed crews in data/crews.ts use "<festival-id>-26" as their id (e.g.
// "iii-points-26"). Matching must derive the same id, or matching into a
// festival that already has a seeded crew creates a second, disconnected
// crew instead of joining the existing one.
export function crewIdForFestival(festivalId: string): string {
  return `${festivalId}-26`;
}

let messageCounter = 1000;

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [crews, setCrews] = useState<Crew[]>(CREWS);
  const [messagesByCrew, setMessagesByCrew] = useState<Record<string, Message[]>>(() => {
    const grouped: Record<string, Message[]> = {};
    for (const m of MESSAGES) {
      (grouped[m.crewId] ??= []).push(m);
    }
    return grouped;
  });

  const completeOnboarding = useCallback((p: Profile) => {
    setProfile(p);
    setOnboarded(true);
  }, []);

  const sendMessage = useCallback((crewId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessagesByCrew((prev) => {
      const next = { ...prev };
      const existing = next[crewId] ?? [];
      next[crewId] = [...existing, { id: `local-${messageCounter++}`, crewId, authorId: "you", text: trimmed, minutesAgo: 0 }];
      return next;
    });
  }, []);

  const joinCrewForFestival = useCallback(
    (festivalId: string, festivalName: string, dateLabel: string, answers: FindCrewAnswers): Crew => {
      const crewId = crewIdForFestival(festivalId);
      const existing = crews.find((c) => c.id === crewId);
      if (existing) return existing;

      // Mock "matching": pick 3-4 sample members as this festival's crew.
      const shuffled = [...MEMBERS].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, 3 + (answers.solo ? 1 : 0)).map((m) => m.id);

      const newCrew: Crew = {
        id: crewId,
        name: `${festivalName} '26`,
        eventName: festivalName,
        eventDateLabel: dateLabel,
        memberIds: picked,
        pinnedPlan: "no meetup plan pinned yet — start the conversation in chat",
        archivePhotos: [],
      };

      setCrews((prev) => [newCrew, ...prev]);
      setMessagesByCrew((prev) => ({ ...prev, [newCrew.id]: [] }));
      return newCrew;
    },
    [crews]
  );

  const getCrew = useCallback((crewId: string) => crews.find((c) => c.id === crewId), [crews]);

  const addArchivePhoto = useCallback((crewId: string, photoUri: string) => {
    setCrews((prev) => prev.map((c) => (c.id === crewId ? { ...c, archivePhotos: [photoUri, ...c.archivePhotos] } : c)));
  }, []);

  const value = useMemo(
    () => ({
      onboarded,
      profile,
      crews,
      messagesByCrew,
      completeOnboarding,
      sendMessage,
      joinCrewForFestival,
      getCrew,
      addArchivePhoto,
    }),
    [onboarded, profile, crews, messagesByCrew, completeOnboarding, sendMessage, joinCrewForFestival, getCrew, addArchivePhoto]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
